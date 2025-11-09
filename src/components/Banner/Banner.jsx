import { useEffect, useState } from "react";
import { motion} from "framer-motion";

const Banner = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
    // Demo placeholder — replace with fetch("your_api/featuredMovies")
    setFeaturedMovies([
      {
        _id: 1,
        title: "The Great War",
        year: 2021,
        genre: "Drama, Action",
        duration: "128 min",
        image: "https://i.ibb.co/jf8w5ZC/war-movie-bg.jpg",
      },
      {
        _id: 2,
        title: "Love & Shadows",
        year: 2022,
        genre: "Romance, Drama",
        duration: "120 min",
        image: "https://i.ibb.co/8KsnCXz/romance-movie-bg.jpg",
      },
    ]);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Carousel */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <img
          src={featuredMovies[0]?.image}
          alt={featuredMovies[0]?.title}
          className="w-full h-full object-cover brightness-50"
        />
      </motion.div>

      {/* Hero Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 text-white">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Unlimited <span className="text-yellow-400">Movies</span>,<br />
          TV Shows & More.
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Watch anywhere. Cancel anytime. Experience cinema at home.
        </motion.p>

        <Link
          to="/movies"
          className="mt-6 px-6 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition"
        >
          Explore Now →
        </Link>
      </div>
    </section>
  );
};
export default Banner;