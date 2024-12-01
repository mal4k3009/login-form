import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import UserProfile from "./UserProfile";

function App() {
  const [currentView, setCurrentView] = useState("login"); // 'signup', 'profile'

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {currentView === "login" && (
        <>
          <Login setCurrentView={setCurrentView} />
          <p className="mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => setCurrentView("signup")}
              className="text-blue-500 underline"
            >
              Sign up here
            </button>
          </p>
        </>
      )}
      {currentView === "signup" && (
        <>
          <Signup setCurrentView={setCurrentView} />
          <p className="mt-4">
            Already have an account?{" "}
            <button
              onClick={() => setCurrentView("login")}
              className="text-blue-500 underline"
            >
              Log in here
            </button>
          </p>
        </>
      )}
      {currentView === "profile" && <UserProfile />}
    </div>
  );
}

export default App;
