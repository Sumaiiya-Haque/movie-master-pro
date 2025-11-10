import React from "react";
import { Link, useLoaderData } from "react-router";


const AllMovies = () => {
  const movies = useLoaderData();
  
  return (
    <div className="min-h-screen bg-gray-800 text-white py-10 px-5">
      <h1 className="text-3xl font-bold text-center my-8">🎬 All Movies</h1>

      {/* Movies Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className=
            "bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
            
          >
          
            {/* <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-64 object-cover"
            /> */}

            <img
  src={movie.posterUrl || "https://via.placeholder.com/300x400?text=No+Image"}
  alt={movie.title}
  className="w-full h-64 object-cover"
/>

            
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

              
              <div className="mt-4 text-center">
                <Link
                  to={`/movie-details/${movie._id}`}
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
