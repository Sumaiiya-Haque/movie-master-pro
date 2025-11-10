import React, { useEffect, useState } from "react";
import { FaFilm, FaUsers, FaStar, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";


const statsData = [
  { title: "Total Movies", valueKey: "movies", color: "text-yellow-400", icon: <FaFilm /> },
  { title: "Total Users", valueKey: "users", color: "text-green-400", icon: <FaUsers /> },
  { title: "Average Rating", valueKey: "averageRating", color: "text-orange-400", icon: <FaStar /> },
  { title: "Total Watch Hours", valueKey: "watchHours", color: "text-blue-400", icon: <FaClock /> },
];

const Statistics = () => {
  const [stats, setStats] = useState({ movies: 0, users: 0 });

  useEffect(() => {
    // 🔹 এখানে আপনি API কল দিতে পারেন
    // উদাহরণ: fetch("/api/statistics")
    setTimeout(() => {
      setStats({ movies: 120, users: 45 ,watchHours:2000, averageRating:7.7});
    }, 500);
  }, []);

  return (
    <section className="text-center py-16 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-yellow-400 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold mb-12 tracking-wide"
      >
        📊 Platform Statistics
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {statsData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.08, rotate: 1 }}
            className="bg-gradient-to-br from-blue-500 to-gray-900 p-8 rounded-2xl shadow-2xl border border-yellow-700 flex justify-center items-center flex-col "
          >
            <div className={`text-5xl ${item.color} mx-auto mb-4`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className={`text-5xl font-extrabold ${item.color}`}>
              {stats[item.valueKey]}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
