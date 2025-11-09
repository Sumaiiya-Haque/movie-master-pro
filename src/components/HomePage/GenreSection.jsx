import React from "react";
import { motion } from "framer-motion";

const genres = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Thriller", "Romance", "Adventure", "Fantasy", "Mystery"];

const GenreSection = () => {
  return (
    <section className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-yellow-400 py-20 px-6">
      {/* Section Heading */}
      <motion.h2
        className="text-4xl lg:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎬 Browse by Genre
      </motion.h2>

      {/* Genre Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {genres.map((genre, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1, backgroundColor: "#FACC15", color: "#000" }}
            className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg font-semibold transition-colors duration-300 border-gray-700 border"
          >
            {genre}
          </motion.button>
        ))}
      </motion.div>

      {/* Optional subtitle */}
      <motion.p
        className="text-gray-400 text-center mt-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Explore movies across different genres and discover your next favorite film. From thrilling action to heartwarming romance, MovieMaster Pro has it all.
      </motion.p>
    </section>
  );
};

export default GenreSection;

