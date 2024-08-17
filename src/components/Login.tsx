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
        className="bg-white text-gray-700 py-2 px-4 rounded-md flex items-center hover:bg-gray-200"
      >
        <img
          src="https://pngimg.com/uploads/google/google_PNG19635.png"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
