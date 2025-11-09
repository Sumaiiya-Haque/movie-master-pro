import React from "react";
import { motion } from "framer-motion";

const AboutPlatform = () => {
  return (
    <section className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-yellow-400 py-20 px-6">
      {/* Heading */}
      <motion.h2
        className="text-4xl lg:text-5xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎥 About MovieMaster Pro
      </motion.h2>

      {/* Description */}
      <motion.p
        className="max-w-3xl mx-auto text-gray-300 text-lg text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        MovieMaster Pro is an all-in-one online platform where you can explore your favorite movies, rate them, and share reviews. Browse the latest releases, discover top-rated titles, and filter content across multiple genres for a personalized movie experience.
      </motion.p>

      {/* Features Cards */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto">
        {[
          { title: "⭐ User Ratings", description: "Rate movies and see what others think." },
          { title: "🎞️ Movie Uploads", description: "Stay updated with the latest releases." },
          { title: "💬 Reviews", description: "Share your thoughts and read reviews." },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-yellow-50 h-[160px] p-6 rounded-2xl shadow-lg flex-1 flex justify-center items-center flex-col text-center hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutPlatform;

