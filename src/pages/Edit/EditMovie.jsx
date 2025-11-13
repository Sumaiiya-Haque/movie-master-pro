import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router";

const EditMovie = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const movie = data?.result || data;

  const [movieData, setMovieData] = useState({
    title: movie?.title || "",
    genre: movie?.genre || "",
    releaseYear: movie?.releaseYear || "",
    director: movie?.director || "",
    cast: movie?.cast || "",
    rating: movie?.rating || "",
    duration: movie?.duration || "",
    plotSummary: movie?.plotSummary || "",
    posterUrl: movie?.posterUrl || "",
    language: movie?.language || "",
    country: movie?.country || "",
    addedBy: movie?.addedBy || user?.email || "",
  });

  useEffect(() => {
    if (movie) {
      setMovieData({
        title: movie.title || "",
        genre: movie.genre || "",
        releaseYear: movie.releaseYear || "",
        director: movie.director || "",
        cast: movie.cast || "",
        rating: movie.rating || "",
        duration: movie.duration || "",
        plotSummary: movie.plotSummary || "",
        posterUrl: movie.posterUrl || "",
        language: movie.language || "",
        country: movie.country || "",
        addedBy: movie.addedBy || user?.email || "",
      });
    }
  }, [movie, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://movie-master-pro-server-two.vercel.app/movies/${movie._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(movieData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Update response:", data);
        toast.success("✅ Movie updated successfully!");
        navigate("/my-collections"); //
      })
      .catch((err) => {
        console.error(err);
        toast.error(" Update failed!");
      });
  };

  return (
    <section className="max-w-2xl mx-auto mt-8 mb-12 p-6 bg-gray-800 text-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
        🎥 Edit Movie
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movieData.title}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Genre */}
        <input
          type="text"
          name="genre"
          placeholder="Genre (e.g. Sci-Fi)"
          value={movieData.genre}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Release Year */}
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={movieData.releaseYear}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Director */}
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movieData.director}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Cast */}
        <input
          type="text"
          name="cast"
          placeholder="Cast (comma-separated)"
          value={movieData.cast}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Rating */}
        <input
          type="number"
          name="rating"
          placeholder="Rating (e.g. 8.8)"
          step="0.1"
          value={movieData.rating}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Duration */}
        <input
          type="number"
          name="duration"
          placeholder="Duration (in minutes)"
          value={movieData.duration}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Plot Summary */}
        <textarea
          name="plotSummary"
          placeholder="Plot Summary..."
          value={movieData.plotSummary}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
          rows="4"
        ></textarea>

        {/* Poster URL */}
        <input
          type="text"
          name="posterUrl"
          placeholder="Poster Image URL"
          value={movieData.posterUrl}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Language */}
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={movieData.language}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Country */}
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={movieData.country}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Added By (read-only) */}
        <input
          type="email"
          name="addedBy"
          placeholder="Added by (email)"
          value={movieData.addedBy}
          readOnly
          className="w-full p-3 rounded-lg bg-gray-600 border border-gray-500 text-gray-300 cursor-not-allowed"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors cursor-pointer"
        >
          💾 Update Movie
        </button>
      </form>
    </section>
  );
};

export default EditMovie;
