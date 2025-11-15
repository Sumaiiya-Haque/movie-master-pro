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
    <div className="p-6 ">
     
      <h2 className="text-4xl text-center font-extrabold text-yellow-400 mb-16 drop-shadow-lg tracking-wide">
        🎬 My Watchlist
      </h2>
      {watchlist.length === 0 ? (
        <p className="text-center text-gray-500">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="border border-yellow-400 rounded-lg  overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
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

