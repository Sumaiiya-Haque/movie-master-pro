import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((error) => console.error(error));
  };

    // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-yellow-400"
          >
            🎬 MovieMaster
          </Link>

          {/* Menu Links */}
          <ul className="hidden md:flex gap-8 font-semibold">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-movies"
                className="hover:text-yellow-400 transition"
              >
                All Movies
              </Link>
            </li>

            {user && (
              <>
                <li>
                  <Link
                    to="/my-collections"
                    className="hover:text-yellow-400 transition"
                  >
                    My Collection
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-movie"
                    className="hover:text-yellow-400 transition"
                  >
                    Add Movie
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/movies-by-genres"
                className="hover:text-yellow-400 transition"
              >
                Movies By Genres
              </Link>
            </li>
          </ul>

          {/* Search */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search movies..."
              className="px-3 py-1 rounded-full text-black focus:outline-none"
            />
          </div>

          {/* Auth / Profile */}
          <div className="flex items-center gap-4">
            {user ? (
              <>

                   {/* Dropdown */}
              {/* {isDropdownOpen && (
                <div className="absolute right-0 bg-gray-800 rounded-lg mt-2 py-2 w-40 shadow-lg">
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 hover:bg-gray-700"
                    
                  >
                    My Profile
                  </Link>
                </div>
              )} */}
           
          
                {/* Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-yellow-400 px-4 py-1 rounded-full text-black font-semibold">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/7bQQYkX/default-avatar.png"
                      }
                      alt="user avatar"
                      className="w-6 h-6 rounded-full border border-black"
                    />
                    {user.displayName || "Profile"}
                  </button>

                  <div className="absolute hidden group-hover:block right-0 bg-gray-800 rounded-lg mt-2 py-2 w-40 shadow-lg">
                    <Link
                       onClick={() => setIsDropdownOpen(false)}
                      to="/my-profile"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      My Profile
                    </Link>
                  </div>
                </div>
                

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 border border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 border border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-black border-t border-gray-700 p-4 flex flex-col gap-3">
            <Link to="/" className="hover:text-yellow-400">
              Home
            </Link>
            <Link to="/all-movies" className="hover:text-yellow-400">
              All Movies
            </Link>

            {user && (
              <>
                <Link to="/my-collections" className="hover:text-yellow-400">
                  My Collection
                </Link>
                <Link to="/add-movie" className="hover:text-yellow-400">
                  Add Movie
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" className="hover:text-yellow-400">
                  Login
                </Link>
                <Link to="/register" className="hover:text-yellow-400">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Spacer for Fixed Navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;



