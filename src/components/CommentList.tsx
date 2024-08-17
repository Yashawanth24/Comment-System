import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  startAfter,
  increment,
  doc,
  updateDoc,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  text: string;
  user: {
    name: string;
    profilePic: string;
  };
  fileUrl: string | null;
  createdAt: {
    toDate: () => Date;
  };
  reactions: number; 
}

const CommentList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [sortOption, setSortOption] = useState<"latest" | "popularity">("latest");

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      orderBy(sortOption === "latest" ? "createdAt" : "reactions", "desc"),
      limit(8)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments: Comment[] = [];
      snapshot.forEach((doc) =>
        fetchedComments.push({ id: doc.id, ...doc.data() } as Comment)
      );
      setComments(fetchedComments);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    });

    return () => unsubscribe();
  }, [sortOption]);

  const loadMore = () => {
    if (!lastVisible) return;

    const q = query(
      collection(db, "comments"),
      orderBy(sortOption === "latest" ? "createdAt" : "reactions", "desc"),
      startAfter(lastVisible),
      limit(8)
    );

    onSnapshot(q, (snapshot) => {
      const newComments: Comment[] = [];
      snapshot.forEach((doc) => newComments.push({ id: doc.id, ...doc.data() } as Comment));
      setComments((prev) => [...prev, ...newComments]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    });
  };

  const handleReaction = async (commentId: string) => {
    const commentRef = doc(db, "comments", commentId);
    await updateDoc(commentRef, {
      reactions: increment(1), 
    });
  };

  return (
    <div className="space-y-4">
      <select
        onChange={(e) => setSortOption(e.target.value as "latest" | "popularity")}
        value={sortOption}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mb-4"
      >
        <option value="latest">Latest</option>
        <option value="popularity">Popularity</option>
      </select>

      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <img
              src={comment.user.profilePic}
              alt={comment.user.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <p className="font-medium text-gray-900">{comment.user.name}</p>
          </div>
          <div
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
          {comment.fileUrl && (
            <img
              src={comment.fileUrl}
              alt="attachment"
              className="max-w-40 h-30 rounded-lg"
            />
          )}
          <p className="text-gray-500 text-sm">
            {formatDistanceToNow(comment.createdAt.toDate())} ago
          </p>
          <div className="flex items-center mt-2">
            <button
              onClick={() => handleReaction(comment.id)}
              className="mr-2 text-blue-500 hover:text-blue-700"
            >
              👍 {comment.reactions} 
            </button>
          </div>
        </div>
      ))}

      {lastVisible && (
        <button
          onClick={loadMore}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CommentList;
