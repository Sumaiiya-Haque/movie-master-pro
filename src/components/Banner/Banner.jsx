

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import Loading from "../../pages/Loading/Loading";

const Banner = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://movie-master-pro-server-two.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => setFeaturedMovies(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (featuredMovies.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
      }, 5000); // 5 seconds for smoother transition
      return () => clearInterval(interval);
    }
  }, [featuredMovies]);

  if (!featuredMovies.length) return <Loading />;

  const movie = featuredMovies[currentIndex];

  const handlePrev = () => {
    setCurrentIndex(
      currentIndex === 0 ? featuredMovies.length - 1 : currentIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % featuredMovies.length);
  };

  return (
 <section className=" w-full h-[80vh] md:h-[90vh] overflow-hidden select-none">
  {/* Background Image */}
  <AnimatePresence initial={false}>
    <motion.img
      key={movie._id || movie.title}
      src={movie.posterUrl}
      alt={movie.title}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 w-full h-full object-cover"
    />
  </AnimatePresence>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

  {/* Movie Info Card */}
  <div className="absolute bottom-12 md:bottom-20 left-4 md:left-16 text-white max-w-xl space-y-4">
    <motion.h1
      key={movie.title}
      className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-wide drop-shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {movie.title}
    </motion.h1>

    <motion.p
      key={movie.plotSummary}
      className="text-gray-300 text-sm md:text-lg line-clamp-4 drop-shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {movie.plotSummary}
    </motion.p>

    <div className="flex flex-wrap gap-3 mt-2 text-yellow-400 font-semibold text-sm md:text-base">
      <span>🎬 {movie.genre}</span>
      <span>⭐ {movie.rating}</span>
      <span>⏱ {movie.duration} min</span>
    </div>

    <Link
      to="/all-movies"
      className="inline-block mt-4 px-6 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all shadow-lg"
    >
      See All Movies →
    </Link>
  </div>

  {/* Dots & Arrows */}
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
    {featuredMovies.map((_, idx) => (
      <motion.div
        key={idx}
        onClick={() => setCurrentIndex(idx)}
        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
          currentIndex === idx
            ? "bg-yellow-400 scale-125"
            : "bg-gray-500 hover:bg-yellow-400"
        }`}
        whileHover={{ scale: 1.3 }}
      />
    ))}
  </div>

  <button
    onClick={handlePrev}
    className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all shadow-lg"
  >
    &#8592;
  </button>
  <button
    onClick={handleNext}
    className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all shadow-lg"
  >
    &#8594;
  </button>
</section>

  );
};

export default Banner;







