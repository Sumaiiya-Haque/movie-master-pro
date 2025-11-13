import React, { useEffect, useState } from "react";
import { FaFilm, FaUsers, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import Loading from "../../pages/Loading/Loading";

const statsData = [
  {
    title: "Total Movies",
    valueKey: "movies",
    color: "text-yellow-500",
    icon: <FaFilm />,
  },
  {
    title: "Total Users",
    valueKey: "users",
    color: "text-green-500",
    icon: <FaUsers />,
  },
  {
    title: "Total Watch Hours",
    valueKey: "watchHours",
    color: "text-blue-500",
    icon: <FaClock />,
  },
];

const Statistics = () => {
  const [stats, setStats] = useState({
    movies: 0,
    users: 0,
    watchHours: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "https://movie-master-pro-server-two.vercel.app/movies"
        );
        const data = await res.json();

        const totalMovies = data.length;
        const uniqueUsers = new Set(data.map((movie) => movie.addedBy)).size;
        const totalHours =
          data.reduce((sum, m) => sum + (m.duration || 0), 0) / 60;

        setStats({
          movies: totalMovies,
          users: uniqueUsers,
          watchHours: totalHours.toFixed(1),
        });
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="text-center py-16 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold mb-12 tracking-wide text-yellow-400"
      >
        📊 Platform Statistics
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {statsData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.08, rotate: 1 }}
            className="bg-gradient-to-tr from-gray-100 via-yellow-50 to-yellow-200
                       rounded-3xl shadow-2xl border border-yellow-300
                       flex flex-col justify-center items-center p-8
                       text-gray-900 hover:shadow-3xl transition-all duration-300"
          >
            <div className={`text-6xl mb-4 ${item.color} animate-bounce`}>
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 drop-shadow-lg text-gray-800">
              {item.title}
            </h3>
            <p
              className={`text-5xl font-extrabold ${item.color} drop-shadow-sm`}
            >
              {stats[item.valueKey]}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
