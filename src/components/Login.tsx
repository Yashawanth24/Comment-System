import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login: React.FC = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        onClick={signInWithGoogle}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
