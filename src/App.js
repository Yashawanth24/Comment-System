// src/App.js
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase"
import Login from "./components/Login";
import CommentBox from "./components/CommentBox";
import CommentList from "./components/CommentList";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <>
          <CommentBox user={user} />
          <CommentList />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
