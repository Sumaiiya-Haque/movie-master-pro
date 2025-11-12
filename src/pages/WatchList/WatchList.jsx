
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
      <h1 className="text-3xl font-bold mb-4">My Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {watchlist.map((movie) => (
          <div key={movie.id} className="border rounded-lg p-3 shadow">
            <img src={movie.posterUrl} alt={movie.title} className="rounded mb-2" />
            <h2 className="font-semibold">{movie.title}</h2>
            <button
              onClick={() => handleRemove(movie.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
