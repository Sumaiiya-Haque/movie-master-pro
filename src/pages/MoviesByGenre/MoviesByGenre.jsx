import React, { useEffect, useState } from "react";

const MoviesByGenre = () => {
  const [movies, setMovies] = useState([]);
  const [groupedMovies, setGroupedMovies] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/movies")
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
    <div className="p-8 bg-gray-950 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">🎬 Movies by Genre</h2>

      {Object.entries(groupedMovies).map(([genre, movies]) => (
        <section key={genre} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-yellow-400 border-b border-gray-700 pb-2">
            {genre}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.title}
                className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2">{movie.title}</h4>
                  <p className="text-sm text-gray-400">⭐ {movie.rating} | {movie.releaseYear}</p>
                  <p className="text-sm mt-2 line-clamp-2">{movie.plotSummary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MoviesByGenre;
