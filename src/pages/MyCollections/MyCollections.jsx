import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link} from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyCollection = () => {
  const { user } = useContext(AuthContext);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
       
        const myMovies = data.filter(
          (movie) => movie.addedBy === user.email
        );
        setMovies(myMovies);
      })
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
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
     
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/movies/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Delete response:", data);

            Swal.fire({
              title: "Deleted!",
              text: "Your movie has been deleted.",
              icon: "success"
            });
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
    <section className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-bold text-center mb-6">🎞 My Collection</h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-400">
          You haven’t added any movies yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="rounded-md mb-3 w-full h-64 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
              <p className="text-gray-400">{movie.genre}</p>
              <div className="flex justify-between mt-3">
                <Link
                  to={`/edit-details/${movie._id}`}
                  className="bg-yellow-500 px-15 py-1 rounded hover:bg-yellow-400 text-black font-semibold"
                >
                  Edit
                </Link>
                <button
                  onClick={()=>handleDelete(movie._id)}
                  className="bg-red-500 px-15 py-1 rounded hover:bg-red-400 text-white font-semibold"
                >
                  Delete
                </button>
                
              </div>
              <div className="mt-4 text-center">
                              <Link
                                to={`/movie-details/${movie._id}`}
                                className="inline-block bg-yellow-400 w-full hover:bg-orange-400 text-white px-4 py-2 rounded-lg font-medium transition"
                              >
                              View  Details
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

