import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db, storage } from "../firebase"; 
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

interface User {
  displayName: string;
  photoURL: string;
}

interface CommentBoxProps {
  user: User;
}

const CommentBox: React.FC<CommentBoxProps> = ({ user }) => {
  const [comment, setComment] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl: string | null = null;
      if (file) {
        const storageRef = ref(storage, `comments/${uuidv4()}`);
        await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "comments"), {
        text: comment,
        user: {
          name: user.displayName,
          profilePic: user.photoURL,
        },
        fileUrl,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setComment("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md text-center">
      <ReactQuill
        value={comment}
        onChange={setComment}
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "link"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        }}
        className="mb-4 py-6 "
        style={{ height: "200px", marginBottom: "1rem" }}
        placeholder="Leave your comment Here"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        accept="image/*"
        className="mb-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded-md  hover:bg-blue-600 "
        
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentBox;
