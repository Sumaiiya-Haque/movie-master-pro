import React, { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");   // genre filter
  const [minRating, setMinRating] = useState(""); // min rating
  const [maxRating, setMaxRating] = useState(""); // max rating

  // fetch movies from server
  const fetchMovies = () => {
    let url = `http://localhost:3000/movies?`;

    if (genre) url += `genre=${genre}&`;
    if (minRating) url += `min=${minRating}&`;
    if (maxRating) url += `max=${maxRating}&`;

    fetch(url)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));
  };

  // call fetch on component mount and when filters change
  useEffect(() => {
    fetchMovies();
  }, [genre, minRating, maxRating]);

  return (
    <div>
      {/* Filters */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Genre (Sci-Fi,Action)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Rating"
          value={maxRating}
          onChange={(e) => setMaxRating(e.target.value)}
        />
        <button onClick={fetchMovies}>Filter</button>
      </div>

      {/* Movies List */}
      <div>
        {movies.map((movie) => (
          <div key={movie._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h3>{movie.title}</h3>
            <p>Genre: {movie.genre}</p>
            <p>Rating: {movie.rating}</p>
            <p>Year: {movie.releaseYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
