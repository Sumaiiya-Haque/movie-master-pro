import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   if (!user?.email) return;

  //   fetch("https://movie-master-pro-server-two.vercel.app/movies")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const myMovies = data.filter((movie) => movie.addedBy === user.email);
  //       setMovies(myMovies);
  //     })
  //     .catch((err) => console.error(err));
  // }, [user]);


  useEffect(() => {
  if (!user?.email) return;

  fetch(`https://movie-master-pro-server-two.vercel.app/my-collections?email=${user.email}`)
    .then((res) => res.json())
    .then((data) => setMovies(data))
    .catch((err) => console.error(err));
}, [user]);






  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://movie-master-pro-server-two.vercel.app/movies/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your movie has been deleted.", "success");
            setMovies(movies.filter((m) => m._id !== id));
          })
          .catch((err) => {
            console.error(err);
            toast.error("Delete failed!");
          });
      }
    });
  };

  return (
    <section className="min-h-screen w-full  text-white p-8">
      <h2 className="text-4xl font-extrabold text-yellow-400 mb-16 drop-shadow-lg tracking-wide">
        🎬 My Collections
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-400">
          You haven’t added any movies yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="h-80 w-full overflow-hidden">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-52">
                <div>
                  <h3 className="text-xl font-semibold mb-1 truncate">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 mb-2">{movie.genre}</p>
                </div>
                <div className="flex justify-between gap-2">
                  <Link
                    to={`/edit-details/${movie._id}`}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded font-semibold text-center transition-colors duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="flex-1 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded font-semibold transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
                <Link
                  to={`/movie-details/${movie._id}`}
                  className="mt-3 inline-block bg-yellow-400 hover:bg-orange-400 text-white px-4 py-2 rounded-lg font-medium text-center w-full transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyCollection;
