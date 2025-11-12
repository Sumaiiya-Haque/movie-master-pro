import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Set theme on mount/change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-yellow-500 dark:text-yellow-400"
          >
            🎬 MovieMaster
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 font-semibold items-center text-gray-800 dark:text-gray-200">
            <li>
              <Link to="/" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-movies" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                All Movies
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/my-collections" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                    My Collection
                  </Link>
                </li>
                <li>
                  <Link to="/add-movie" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                    Add Movie
                  </Link>
                </li>
                <li>
              <Link to="/watch-list" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                WatchList
              </Link>
            </li>
              </>
            )}
            <li>
              <Link to="/movies-by-genres" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                Movies By Genres
              </Link>
            </li>
            

            {/* Theme Toggle */}
            <li>
              <input
                type="checkbox"
                className="toggle toggle-warning"
                defaultChecked={theme === "dark"}
                onChange={(e) => handleTheme(e.target.checked)}
              />
            </li>
          </ul>

          {/* Auth/Profile Section */}
          {/* Auth/Profile Section */}
<div className="flex items-center gap-4" ref={dropdownRef}>
  {user ? (
    <>
      {/* Profile Dropdown */}
      <ProfileDropdown
        user={user}
        handleLogout={handleLogout}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-4 py-1 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="px-4 py-1 border border-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="px-4 py-1 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-400 transition"
      >
        Register
      </Link>
    </>
  )}
</div>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-800 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-3 text-gray-800 dark:text-gray-200">
            <Link to="/" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <Link to="/all-movies" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              All Movies
            </Link>
            {user && (
              <>
                <Link to="/my-collections" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                  My Collection
                </Link>
                <Link to="/add-movie" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                  Add Movie
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                  Register
                </Link>
              </>
            )}
            <li>
              <input
                type="checkbox"
                className="toggle toggle-warning mt-2"
                defaultChecked={theme === "dark"}
                onChange={(e) => handleTheme(e.target.checked)}
              />
            </li>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;





// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Link } from "react-router";
// import { AuthContext } from "../../providers/AuthProvider";
// import ProfileDropdown from "./ProfileDropdown";

// const Navbar = () => {
//   // const [isOpen, setIsOpen] = useState(false);
//   const { user, logOut } = useContext(AuthContext);
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//     const [isOpen, setIsOpen] = useState(false);

//   // const toggleDropdown = () => setIsOpen(!isOpen);
//   const closeDropdown = () => setIsOpen(false);

//   // ✅ Theme setup
//   useEffect(() => {
//     document.querySelector("html").setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const handleTheme = (checked) => {
//     setTheme(checked ? "dark" : "light");
//   };

//   const handleLogout = () => {
//     logOut()
//       .then(() => console.log("User logged out"))
//       .catch((error) => console.error(error));
//   };

//   // ✅ Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md text-white shadow-md">
//         <div className="flex justify-between items-center px-6 py-4">
//           {/* ✅ Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-2xl font-bold text-yellow-400"
//           >
//             🎬 MovieMaster
//           </Link>

//           {/* ✅ Menu Links */}
//           <ul className="hidden md:flex gap-8 font-semibold items-center">
//             <li>
//               <Link to="/" className="hover:text-yellow-400 transition">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/all-movies" className="hover:text-yellow-400 transition">
//                 All Movies
//               </Link>
//             </li>

//             {user && (
//               <>
//                 <li>
//                   <Link
//                     to="/my-collections"
//                     className="hover:text-yellow-400 transition"
//                   >
//                     My Collection
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/add-movie"
//                     className="hover:text-yellow-400 transition"
//                   >
//                     Add Movie
//                   </Link>
//                 </li>
//               </>
//             )}

//             <li>
//               <Link
//                 to="/movies-by-genres"
//                 className="hover:text-yellow-400 transition"
//               >
//                 Movies By Genres
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/watch-list"
//                 className="hover:text-yellow-400 transition"
//               >
//                 WatchList
//               </Link>
//             </li>

//             {/* ✅ Theme Toggle */}
//             <div className="navbar flex items-center">
//               <input
//                 onChange={(e) => handleTheme(e.target.checked)}
//                 type="checkbox"
//                 defaultChecked={localStorage.getItem("theme") === "dark"}
//                 className="toggle toggle-warning"
//               />
//             </div>
//           </ul>

//           {/* ✅ Auth / Profile Section */}
//           <div className="flex items-center gap-4" ref={dropdownRef}>
//             {user ? (
//               <>
//               <ProfileDropdown
//                 user={user}
//                 handleLogout={handleLogout}
//                 isDropdownOpen={isDropdownOpen}
//                 setIsDropdownOpen={setIsDropdownOpen}
//               />
//                 <button
//             onClick={() => {
//               handleLogout();
//               closeDropdown();
//             }}
//             className=" text-left px-4 py-3 hover:bg-red-500 hover:text-white transition-all"
//           >
//              Logout
//           </button>
//                 </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-1 border border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-1 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* ✅ Mobile Menu Button */}
//           <button
//             className="md:hidden text-2xl"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             ☰
//           </button>
//         </div>

//         {/* ✅ Mobile Dropdown */}
//         {isOpen && (
//           <div className="md:hidden bg-black border-t border-gray-700 p-4 flex flex-col gap-3">
//             <Link to="/" className="hover:text-yellow-400">
//               Home
//             </Link>
//             <Link to="/all-movies" className="hover:text-yellow-400">
//               All Movies
//             </Link>

//             {user && (
//               <>
//                 <Link to="/my-collections" className="hover:text-yellow-400">
//                   My Collection
//                 </Link>
//                 <Link to="/add-movie" className="hover:text-yellow-400">
//                   Add Movie
//                 </Link>
                
//               </> 
//             )}

//             {!user && (
//               <>
//                 <Link to="/login" className="hover:text-yellow-400">
//                   Login
//                 </Link>
//                 <Link to="/register" className="hover:text-yellow-400">
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* Spacer for Fixed Navbar */}
//       <div className="h-20"></div>
//     </>
//   );
// };

// export default Navbar;







