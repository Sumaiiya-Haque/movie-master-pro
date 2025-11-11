import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
        <p>Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.photoURL || "https://i.ibb.co/7bQQYkX/default-avatar.png"}
          alt="user avatar"
          className="w-24 h-24 rounded-full border-2 border-yellow-400"
        />
        <p>
          <strong>Name:</strong> {user.displayName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
