import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get the current user's ID
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.error("No such user document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle the mouse movement to move the image in all four directions
  const handleMouseMove = (e) => {
    const image = document.getElementById("profileImage");
    const box = document.getElementById("imageBox");

    // Get mouse position relative to the box
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const boxRect = box.getBoundingClientRect();

    // Calculate the center of the box
    const boxCenterX = boxRect.left + boxRect.width / 2;
    const boxCenterY = boxRect.top + boxRect.height / 2;

    // Calculate the offset between mouse position and the center of the box
    const deltaX = (mouseX - boxCenterX) / boxRect.width; // Normalize based on box width
    const deltaY = (mouseY - boxCenterY) / boxRect.height; // Normalize based on box height

    // Set the movement intensity (tweak for more or less effect)
    const movementX = deltaX * 50;  // Adjust intensity here (more = faster movement)
    const movementY = deltaY * 50;  // Adjust intensity here (more = faster movement)

    // Apply the translation to the image
    image.style.transform = `translate(${movementX}px, ${movementY}px)`; // Move the image
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found!</div>;
  }

  const profileUrl = `https://your-app-url.com/profile/${auth.currentUser.uid}`; // Customize this URL

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt.seconds * 1000).toLocaleDateString()}</p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Your Profile QR Code:</h3>
          <div className="mt-4">
            <QRCodeCanvas value={profileUrl} size={256} />
          </div>
        </div>

        <div
          id="imageBox" // Image container
          className="image-container"
          onMouseMove={handleMouseMove} // Track mouse movement
          style={{ height: "300px", width: "300px", position: "relative", overflow: "hidden" }}
        >
          <div
            id="profileImage"
            className="profileImage"
            style={{
              position: "center",
              top: "50%",
              left: "50%",
              right: "50%",
              bottom: "50%",
              width: "200px", // Adjust image size
              height: "200px",
              backgroundImage: `url("https://via.placeholder.com/200")`, // Replace with user profile image URL
              backgroundSize: "cover",
              transform: "translate(-50%, -50%)", // Center the image
              transition: "transform 0.1s ease-out", // Smooth transition for movement
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
