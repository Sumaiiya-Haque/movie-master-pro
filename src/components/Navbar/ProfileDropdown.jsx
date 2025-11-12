import { useState } from "react";
import { Link } from "react-router";

const ProfileDropdown = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left">
      {/* Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 focus:outline-none"
      >
        <img
          src={
            user?.photoURL ||
            "https://i.ibb.co/7bQQYkX/default-avatar.png"
          }
          alt="user avatar"
          className={`w-8 h-8 rounded-full border-2 border-yellow-400 transition-all duration-300 ${
            isOpen ? "ring-2 ring-yellow-400" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-44 bg-gray-900 text-white rounded-2xl 
                     shadow-xl overflow-hidden border border-gray-700 backdrop-blur-md 
                     animate-fadeIn z-50"
        >
          <Link
            to="/my-profile"
            onClick={closeDropdown}
            className="block px-4 py-3 hover:bg-yellow-400 hover:text-black transition-all"
          >
            🧑 My Profile
          </Link>

          <Link
            to=""
            onClick={closeDropdown}
            className="block px-4 py-3 hover:bg-yellow-400 hover:text-black transition-all"
          >
            ⚙️ Settings
          </Link>

          <button
            onClick={() => {
              handleLogout();
              closeDropdown();
            }}
            className="w-full text-left px-2 py-3 hover:bg-red-500 hover:text-white transition-all"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
