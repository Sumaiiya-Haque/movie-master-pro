import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "../../pages/Loading/Loading";
import { Link } from "react-router";

const RecentlyAdded = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/movies") 
      .then((res) => res.json())
      .then((data) => {
        
        const recent6 = data
          .sort((a, b) => b.year - a.year)
          .slice(0, 6);
        setMovies(recent6);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <section className="text-yellow-400 py-20 px-6">
     <motion.h2
        className="text-4xl lg:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎬 Recently Added
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {movies.map((movie, index) => (
          <motion.div
            key={index}
            className="bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="relative">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-lg font-semibold text-gray-100 dark:text-gray-100">
                  {movie.title}
                </h3>
                    <Link
                to={`/movie-details/${movie._id}`}
                className="block text-left mt-3    text-yellow-300 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md"
              >
                View Details →
              </Link>
                <p className="text-sm text-gray-300 dark:text-gray-400">{movie.year}</p>
              </div>
            
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyAdded;





// import React from "react";
// import { motion } from "framer-motion";

// const recentMovies = [
//   { title: "Oppenheimer", year: 2023, poster: "https://i.ibb.co/ZGQ1bxX/oppenheimer.jpg" },
//   { title: "Barbie", year: 2023, poster: "https://i.ibb.co/znHGVjc/barbie.jpg" },
//   { title: "The Creator", year: 2023, poster: "https://i.ibb.co/QpNkgFv/creator.jpg" },
//   { title: "Dune", year: 2021, poster: "https://i.ibb.co/ZYCHs6B/dune.jpg" },
//   { title: "Joker", year: 2019, poster: "https://i.ibb.co/FVhQjTh/joker.jpg" },
//   { title: "Spider-Man: No Way Home", year: 2021, poster: "https://i.ibb.co/ThPzWk2/spiderman.jpg" },
// ];

// const RecentlyAdded = () => {
//   return (
//     <section className="bg-gray-900 text-yellow-400 py-20 px-6">
//       <motion.h2
//         className="text-4xl lg:text-5xl font-bold text-center mb-12"
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         🆕 Recently Added
//       </motion.h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {recentMovies.map((movie, index) => (
//           <motion.div
//             key={index}
//             className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1, duration: 0.6 }}
//           >
//             <div className="relative">
//               <img
//                 src={movie.poster}
//                 alt={movie.title}
//                 className="w-full h-64 object-cover"
//               />
//               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
//                 <h3 className="text-lg font-semibold">{movie.title}</h3>
//                 <p className="text-sm text-gray-300">{movie.year}</p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default RecentlyAdded;

