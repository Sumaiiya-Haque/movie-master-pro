import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 Fetch API Data
  useEffect(() => {
    fetch("http://localhost:3000/movies") // ← আপনার API URL
      .then((res) => res.json())
      .then((data) => setFeaturedMovies(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Auto-slide প্রতি 5 সেকেন্ডে
  useEffect(() => {
    if (featuredMovies.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [featuredMovies]);

  if (featuredMovies.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  const movie = featuredMovies[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Sliding Animation */}
      <AnimatePresence initial={false}>
        <motion.img
          key={movie._id || movie.title}
          src={movie.posterUrl}
          alt={movie.title}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
      </AnimatePresence>

      {/* Hero Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 text-white">
        <motion.h1
          key={movie.title}
          className="text-5xl md:text-6xl font-extrabold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {movie.title}
        </motion.h1>

        <motion.p
          key={movie.plotSummary}
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {movie.plotSummary}
        </motion.p>

        <div className="mt-4 text-yellow-400 font-semibold">
          🎬 {movie.genre} | ⭐ {movie.rating} | ⏱ {movie.duration} min
        </div>

        <Link
          to="/all-movies"
          className="mt-6 px-6 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition"
        >
          Explore Now →
        </Link>
      </div>

      {/* Bottom Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {featuredMovies.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              currentIndex === idx ? "bg-yellow-400 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;







// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router";

// const Banner = () => {
//   const [featuredMovies, setFeaturedMovies] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // 🔹 Fetch API Data
//   useEffect(() => {
//     fetch("http://localhost:3000/movies") // ← এখানে আপনার API লিংক দিন
//       .then((res) => res.json())
//       .then((data) => setFeaturedMovies(data))
//       .catch((err) => console.error("Error fetching movies:", err));
//   }, []);

//   // 🔹 Auto-slide প্রতি 5 সেকেন্ডে
//   useEffect(() => {
//     if (featuredMovies.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
//       }, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [featuredMovies]);

//   if (featuredMovies.length === 0) {
//     return (
//       <div className="h-screen flex justify-center items-center text-white text-2xl">
//         Loading...
//       </div>
//     );
//   }

//   const movie = featuredMovies[currentIndex];

//   return (
//     <section className="relative h-screen w-full overflow-hidden">
//       {/* Background Image with Transition */}
//       <AnimatePresence>
//         <motion.img
//           key={movie._id || movie.title}
//           src={movie.posterUrl}
//           alt={movie.title}
//           initial={{ opacity: 0, scale: 1.05 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ duration: 1.5 }}
//           className="absolute inset-0 w-full h-full object-cover brightness-50"
//         />
//       </AnimatePresence>

//       {/* Overlay Text */}
//       <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 text-white">
//         <motion.h1
//           className="text-5xl md:text-6xl font-extrabold"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           {movie.title}
//         </motion.h1>

//         <motion.p
//           className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           {movie.plotSummary}
//         </motion.p>

//         <div className="mt-4 text-yellow-400 font-semibold">
//           🎬 {movie.genre} | ⭐ {movie.rating} | ⏱ {movie.duration} min
//         </div>

//         <Link
//           to="/all-movies"
//           className="mt-6 px-6 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition"
//         >
//           Explore Now →
//         </Link>
//       </div>

//       {/* Bottom Dots Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
//         {featuredMovies.map((_, idx) => (
//           <div
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
//               currentIndex === idx ? "bg-yellow-400 scale-125" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Banner;

