import React, { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState(""); 
  const [minRating, setMinRating] = useState(""); 
  const [maxRating, setMaxRating] = useState(""); 

 
  const fetchMovies = () => {
    let url = `https://movie-master-pro-server-two.vercel.app/movies?`;

    if (genre) url += `genre=${genre}&`;
    if (minRating) url += `min=${minRating}&`;
    if (maxRating) url += `max=${maxRating}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  };


  useEffect(() => {
    fetchMovies();
  }, [genre, minRating, maxRating]);

  return (
    <div>
      
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

     
      <div>
        {movies.map((movie) => (
          <div
            key={movie._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
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
