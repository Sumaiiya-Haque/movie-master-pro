import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "../../pages/Loading/Loading";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://movie-master-pro-server-two.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        const top5 = data.sort((a, b) => b.rating - a.rating).slice(0, 5);
        setMovies(top5);
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
        🏆 Top Rated Movies
      </motion.h2>
      {/* <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        🏆 Top Rated Movies
      </h2> */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="rounded-xl mb-3 h-64 w-full object-cover"
            />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {movie.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {movie.genre}
            </p>
            <p className="text-yellow-500 font-bold mt-1">⭐ {movie.rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedMovies;


