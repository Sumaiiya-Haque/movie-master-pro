import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const MoviesByGenre = () => {
  const [movies, setMovies] = useState([]);
  const [groupedMovies, setGroupedMovies] = useState({});

  useEffect(() => {
    fetch("https://movie-master-pro-server-two.vercel.app/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);

        // Group by genre dynamically
        const grouped = data.reduce((acc, movie) => {
          const genre = movie.genre || "Unknown";
          if (!acc[genre]) acc[genre] = [];
          acc[genre].push(movie);
          return acc;
        }, {});
        setGroupedMovies(grouped);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen   py-16 px-6 flex flex-col items-center text-center">
      <h2 className="text-4xl font-extrabold text-yellow-400 mb-16 drop-shadow-lg tracking-wide">
        🎬 Movies by Genre
      </h2>

      <div className="w-full max-w-7xl space-y-20">
        {Object.entries(groupedMovies).map(([genre, movies]) => (
          <section key={genre} className="flex flex-col items-center">
            {/* Genre Title */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-3 h-10 bg-yellow-400 rounded"></div>
              <h3 className="text-3xl font-bold text-yellow-300 tracking-wide drop-shadow-md">
                {genre.toUpperCase()}
              </h3>
              <div className="w-3 h-10 bg-yellow-400 rounded"></div>
            </div>

            {/* Movies Grid Centered */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center place-items-center">
              {movies.map((movie) => (
                <div
                  key={movie.title}
                  className="bg-gray-800 border border-yellow-500/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-yellow-400/30 hover:-translate-y-2 transition-all duration-300 w-64"
                >
                  <div className="relative">
                    <img
                      src={
                        movie.posterUrl ||
                        "https://via.placeholder.com/300x400?text=No+Image"
                      }
                      alt={movie.title}
                      className="w-full h-72 object-cover"
                    />
                    <span className="absolute bottom-2 right-2 bg-yellow-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
                      ⭐ {movie.rating}
                    </span>
                  </div>

                  <div className="p-4 text-left">
                    <h4 className="text-lg font-bold text-yellow-300 mb-1 truncate">
                      {movie.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      📅 {movie.releaseYear}
                    </p>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                      {movie.plotSummary}
                    </p>
                    <Link
                      to={`/movie-details/${movie._id}`}
                      className="block text-center mt-3 w-full bg-gray-800 hover:bg-gray-900 text-yellow-300 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MoviesByGenre;
