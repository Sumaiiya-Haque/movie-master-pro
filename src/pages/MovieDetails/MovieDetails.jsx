import React, { useContext } from "react";
import { useParams, Link } from "react-router";
import { AuthContext } from "../../providers/AuthProvider"; 

const sampleMovies = [
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

const MovieDetails = () => {
  const { title } = useParams(); 
  const { user } = useContext(AuthContext);

  const movie = sampleMovies.find(
    (m) => m.title.toLowerCase() === title.toLowerCase()
  );

  if (!movie) {
    return (
      <div className="text-center text-red-500 mt-10">
        <h2>❌ Movie not found!</h2>
        <Link to="/all-movies" className="text-blue-500 underline">
          Back to All Movies
        </Link>
      </div>
    );
  }

  const isOwner = user?.email === movie.addedBy;

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 text-white p-6 mt-30 rounded-2xl shadow-lg">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-96 object-cover rounded-xl mb-5"
      />
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-300 mb-3">{movie.plotSummary}</p>

      <div className="grid grid-cols-2 gap-3 text-gray-200">
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Release Year:</strong> {movie.releaseYear}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
        <p><strong>Duration:</strong> {movie.duration} mins</p>
        <p><strong>Language:</strong> {movie.language}</p>
        <p><strong>Country:</strong> {movie.country}</p>
        <p><strong>Added By:</strong> {movie.addedBy}</p>
      </div>

      {/* Owner-only buttons */}
      {isOwner && (
        <div className="flex gap-4 mt-6">
          <Link
            to={`/edit/${movie.title}`}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            ✏️ Edit
          </Link>
          <button
            onClick={() => alert("Delete function yet to implement")}
            className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700"
          >
            🗑️ Delete
          </button>
        </div>
      )}

      <div className="mt-6">
        <Link
          to="/all-movies"
          className="text-blue-400 hover:underline text-sm"
        >
          ← Back to All Movies
        </Link>
      </div>
    </div>
  );
};

export default MovieDetails;
