import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../providers/AuthProvider";

const AllMovies = () => {
  const { user } = useContext(AuthContext);

  // States
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  // Fetch movies from server
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://movie-master-pro-server-two.vercel.app/movies");
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Apply filters (front-end)
  useEffect(() => {
    let temp = [...movies];

    if (searchTerm) {
      temp = temp.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genre) {
      temp = temp.filter(movie => movie.genre === genre);
    }

    if (minRating) {
      temp = temp.filter(movie => movie.rating >= parseFloat(minRating));
    }

    if (maxRating) {
      temp = temp.filter(movie => movie.rating <= parseFloat(maxRating));
    }

    setFilteredMovies(temp);
  }, [movies, searchTerm, genre, minRating, maxRating]);

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
    <div className="all-movies-container p-4">
      {/* Filters */}
      <div className="filters flex flex-col sm:flex-row gap-4 mb-6">
        {/* <input
          type="text"
          placeholder="Filter by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded text-gray-600 flex-1"
        /> */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2 rounded text-gray-600 flex-1"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Crime">Crime</option>
          <option value="Romance">Romance</option>
        </select>
        <input
          type="number"
          placeholder="Min Rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="number"
          placeholder="Max Rating"
          value={maxRating}
          onChange={(e) => setMaxRating(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>

      {/* Movies list */}
      <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-10 drop-shadow">
        🎬 Explore All Movies
      </h1>

      {filteredMovies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie._id || movie.id}
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
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {movie.title}
                </h2>
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






