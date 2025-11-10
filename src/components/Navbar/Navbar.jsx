import React, { use, useState, } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const { user, logOut } = use(AuthContext);
// { user, handleLogout }
     const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => console.error(error));
  };

  return (
    <nav className="flex justify-between backdrop-blur-md items-center px-6 py-4 bg-black/70 text-white fixed w-full z-50 ">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-yellow-400">
        <span role="img" aria-label="movie">🎬</span> MovieMaster
      </Link>

      {/* Menu Links */}
      <ul className="hidden md:flex gap-8 font-semibold">
        <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
        <li><Link to="/all-movies" className="hover:text-yellow-400">All Movies</Link></li>
        <li><Link to="/my-collections" className="hover:text-yellow-400">My Collection</Link></li>
        <li><Link to="/add-movie" className="hover:text-yellow-400">Add Movie</Link></li>
      </ul>

      {/* Search bar (optional) */}
      <div className="hidden md:block">
        <input
          type="text"
          placeholder="Search movies..."
          className="px-3 py-1 rounded-full text-black focus:outline-none"
        />
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative group">
            <button className="bg-yellow-400 px-4 py-1 rounded-full text-black font-semibold">
              {user.displayName || "Profile"}
            </button>
            <div className="absolute hidden group-hover:block right-0 bg-gray-800 rounded-lg mt-2 py-2 w-40">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">My Profile</Link>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-left hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="px-4 py-1 border border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition">
              Login
            </Link>
            <Link to="/register" className="px-4 py-1 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 bg-black w-full p-4 flex flex-col gap-3 md:hidden">
          
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/all-movies" className="hover:text-yellow-400">All Movies</Link>
          <Link to="/my-collections" className="hover:text-yellow-400">My Collection</Link>
          <Link to="/add-movie" className="hover:text-yellow-400">Add Movie</Link>
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};





export default Navbar;
