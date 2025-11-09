import React from "react";
import { Link } from "react-router";

const movies = [
  {
    title: "Inception",
    genre: "Sci-Fi",
    releaseYear: 2010,
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt",
    rating: 8.8,
    duration: 148,
    plotSummary: "A thief who steals corporate secrets through dream-sharing technology...",
    posterUrl: "https://i.ibb.co/example.jpg",
    language: "English",
    country: "USA",
    addedBy: "user@example.com",
  },
  {
    title: "Interstellar",
    genre: "Adventure",
    releaseYear: 2014,
    director: "Christopher Nolan",
    cast: "Matthew McConaughey, Anne Hathaway",
    rating: 8.6,
    duration: 169,
    plotSummary: "A team travels through a wormhole in search of a new home for humanity...",
    posterUrl: "https://i.ibb.co/2j9N9bM/interstellar.jpg",
    language: "English",
    country: "USA",
    addedBy: "user2@example.com",
  },
];

const AllMovies = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white py-10 px-5">
      <h1 className="text-3xl font-bold text-center my-8">🎬 All Movies</h1>

      {/* Movies Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            {/* Poster */}
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>

              <p className="text-gray-400 text-sm mt-1">
                Genre: <span className="text-gray-200">{movie.genre}</span>
              </p>

              <p className="text-gray-400 text-sm">
                Release Year: <span className="text-gray-200">{movie.releaseYear}</span>
              </p>

              <p className="text-yellow-400 mt-2 font-medium">
                ⭐ Rating: {movie.rating}
              </p>

              {/* Details Button */}
              <div className="mt-4 text-center">
                <Link
                  to={`/movie-details/${movie.title}`}
                  className="inline-block bg-yellow-400 w-full hover:bg-orange-400 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;




