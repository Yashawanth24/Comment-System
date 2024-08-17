import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login: React.FC = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <button
        onClick={signInWithGoogle}
        className="bg-white text-gray-700 py-3 px-6 rounded-md flex items-center shadow-md hover:bg-gray-100 transition-colors"
      >
        <img
          src="https://pngimg.com/uploads/google/google_PNG19635.png"
          alt="Google logo"
          className="w-6 h-6 mr-3"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
