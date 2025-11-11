import React, { useContext } from "react";
import { useParams, Link, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider"; 
import { toast } from "react-toastify";



const MovieDetails = () => {
  const data = useLoaderData()
  const navigate = useNavigate()
  // const id = useParams()
  const movie = data.result;
  console.log(movie)

  // 🗑 Delete handler
const handleDelete = () => {
  if (window.confirm("Are you sure you want to delete this movie?")) {
    fetch(`http://localhost:3000/movies/${movie._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Delete response:", data);
        toast.success("🗑 Movie deleted successfully!");
        navigate("/my-collections"); // Delete এর পর redirect
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ Delete failed!");
      });
  }
};


  const { user } = useContext(AuthContext);



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
            to={`/edit-details/${movie._id}`}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            ✏️ Edit
          </Link>
        <button
  type="button"
  onClick={handleDelete}
  className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-500 transition-colors cursor-pointer mt-3"
>
  🗑 Delete Movie
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
