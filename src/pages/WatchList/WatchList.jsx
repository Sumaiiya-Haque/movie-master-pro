import React, { useEffect, useState } from "react";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedList);
  }, []);

  const handleRemove = (id) => {
    const updated = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-center text-gray-500">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-80 w-full overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-full w-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-32">
                <h2 className="font-semibold text-lg mb-2 truncate">{movie.title}</h2>
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="mt-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;

