import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFD700",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/movies/${movie._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your movie has been deleted.",
              icon: "success",
            });
            navigate("/my-collections");
          })
          .catch((err) => {
            console.error(err);
            toast.error("Delete failed!");
          });
      }
    });
  };

  const isOwner = user?.email === movie.addedBy;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto mb-20 text-white p-6 mt-10 rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Movie Image */}
        <div className="md:w-1/3 shrink-0">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-auto md:h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="md:w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3 text-yellow-400">{movie.title}</h1>
            <p className="text-gray-500 mb-4">{movie.plotSummary}</p>

            <div className="grid grid-cols-2 gap-3 text-gray-500">
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
          </div>

          {/* Owner Actions */}
          {isOwner && (
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <Link
                to={`/edit-details/${movie._id}`}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-5 py-2 rounded-lg font-semibold transition shadow"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-semibold transition shadow"
              >
                Delete Movie
              </button>
            </div>
          )}

          <div className="mt-6">
            <Link
              to="/all-movies"
              className="text-yellow-400 hover:underline text-sm"
            >
              ← Back to All Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

