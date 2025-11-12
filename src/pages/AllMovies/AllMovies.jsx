import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../providers/AuthProvider";

const AllMovies = () => {
  const { user } = useContext(AuthContext);

  // Filter states
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  // Fetch movies from server with filters
  const fetchMovies = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:3000/movies?`;
      if (genre) url += `genre=${genre}&`;
      if (minRating) url += `min=${minRating}&`;
      if (maxRating) url += `max=${maxRating}&`;

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMovies();
  }, []);

  // Watchlist handler
  const handleAddToWatchlist = (movie) => {
    const storedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    const movieData = {
      id: movie._id || movie.id,
      title: movie.title,
      poster: movie.posterUrl,
    };

    const exists = storedList.find((item) => item.id === movieData.id);

    if (!exists) {
      storedList.push(movieData);
      localStorage.setItem("watchlist", JSON.stringify(storedList));
      toast("🎉 Added to Watchlist!");
    } else {
      toast("⚠️ Already in Watchlist!");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-10 px-5">
      {/* 1️⃣ Hero / Title */}
      <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-10 drop-shadow">
        🎬 Explore All Movies
      </h1>

      {/* 2️⃣ Filter Section */}
      <div className="mb-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
        <input
          type="text"
          placeholder="Genre (Sci-Fi,Action)"
          className="border px-3 py-2 rounded-lg w-60"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Rating"
          className="border px-3 py-2 rounded-lg w-32"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Rating"
          className="border px-3 py-2 rounded-lg w-32"
          value={maxRating}
          onChange={(e) => setMaxRating(e.target.value)}
        />
        <button
          onClick={fetchMovies}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-lg transition-all"
        >
          Filter
        </button>
      </div>

      {/* 3️⃣ Movies Grid */}
      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white border border-yellow-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
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
                <p className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs px-3 py-1 rounded-lg shadow-md">
                  ⭐ {movie.rating}
                </p>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{movie.title}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  🎭 Genre: <span className="font-medium">{movie.genre}</span>
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  📅 Year: <span className="font-medium">{movie.releaseYear}</span>
                </p>

                {user && (
                  <button
                    onClick={() => handleAddToWatchlist(movie)}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg transition-all duration-200 shadow-md mb-2"
                  >
                    + Add to Watchlist
                  </button>
                )}

                <Link
                  to={`/movie-details/${movie._id}`}
                  className="block text-center w-full bg-gray-800 hover:bg-gray-900 text-yellow-300 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMovies;























