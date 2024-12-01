import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

function Login({ setCurrentView }) { // Receive setCurrentView as a prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCurrentView("profile"); // Navigate to profile after login
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle login with Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      setCurrentView("profile"); // Navigate to profile after Google login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md max-w-sm w-full"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-4 py-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-4 py-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
        <div className="text-center my-4">OR</div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
}

export default Login;
