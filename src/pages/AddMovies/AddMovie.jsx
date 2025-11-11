import React, { useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router"; // ✅ এটি যোগ করুন

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ navigate hook
  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    rating: "",
    duration: "",
    plotSummary: "",
    posterUrl: "",
    language: "",
    country: "",
    addedBy: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(movieData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("✅ Successfully added Movie!");
        navigate("/my-collection"); // ✅ Redirect to My Collection
      })
      .catch((err) => {
        console.log(err);
        toast.error("❌ Failed to add movie");
      });
  };

  return (
    <section className="max-w-2xl mx-auto mt-12 p-6 bg-gray-800 text-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">🎥 Add a New Movie</h2>

       <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movieData.title} 
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
          required
        />

         {/* Genre */}
         <input
          type="text"
          name="genre"
          placeholder="Genre (e.g. Sci-Fi)"
          value={movieData.genre}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
          required
        />

        {/* Release Year */}
       <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={movieData.releaseYear}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />


      <input
          type="text"
          name="director"
          placeholder="Director"
          value={movieData.director}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

         {/* Cast */}
       <input
          type="text"
          name="cast"
          placeholder="Cast (comma-separated)"
          value={movieData.cast}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

         {/* Rating */}
         <input
          type="number"
          name="rating"
          placeholder="Rating (e.g. 8.8)"
          step="0.1"
          value={movieData.rating}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Duration */}
       <input
          type="number"
          name="duration"
          placeholder="Duration (in minutes)"
          value={movieData.duration}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

         {/* Plot Summary */}
         <textarea
          name="plotSummary"
          placeholder="Plot Summary..."
          value={movieData.plotSummary}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
          rows="4"
        ></textarea>

         {/* Poster URL */}
         <input
          type="text"
          name="posterUrl"
          placeholder="Poster Image URL"
          value={movieData.posterUrl}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

         {/* Language */}
         <input
          type="text"
          name="language"
          placeholder="Language"
          value={movieData.language}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

         {/* Country */}
       <input
          type="text"
          name="country"
          placeholder="Country"
          value={movieData.country}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

         {/* Added By */}
         <input
          type="email"
          name="addedBy"
          placeholder="Added by (email)"
          value={movieData.addedBy}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors cursor-pointer"
        >
          ➕ Add Movie
        </button>
      </form>
    </section>
  );
};

export default AddMovie;






// import React, { use, useState } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import { toast } from "react-toastify";

// const AddMovie = () => {
//     const {user} = use(AuthContext)
//     console.log(user)
//   const [movieData, setMovieData] = useState({
//     title: "",
//     genre: "",
//     releaseYear: "",
//     director: "",
//     cast: "",
//     rating: "",
//     duration: "",
//     plotSummary: "",
//     posterUrl: "",
//     language: "",
//     country: "",
//     addedBy:user.email,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMovieData({ ...movieData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted Movie:", movieData);
//    fetch('http://localhost:3000/movies',{
//     method:'POST',
//     headers:{
//         'content-type':"application/json",
//     },
//     body:JSON.stringify(movieData),
//    }).then(res=>res.json()).then(data=>{
//     console.log(data)
//     toast.success("Successfully added Movie")
//    }).catch(err=>{
//     console.log(err)
//    })
//   };

//   return (
//     <section className="max-w-2xl mx-auto mt-12 p-6 bg-gray-800 text-white rounded-2xl shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">🎥 Add a New Movie</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Title */}
//         <input
//           type="text"
//           name="title"
//           placeholder="Movie Title"
//           value={movieData.title}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
//           required
//         />

//         {/* Genre */}
//         <input
//           type="text"
//           name="genre"
//           placeholder="Genre (e.g. Sci-Fi)"
//           value={movieData.genre}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//           required
//         />

//         {/* Release Year */}
//         <input
//           type="number"
//           name="releaseYear"
//           placeholder="Release Year"
//           value={movieData.releaseYear}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//         />

//         {/* Director */}
//         <input
//           type="text"
//           name="director"
//           placeholder="Director"
//           value={movieData.director}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//         />

//         {/* Cast */}
//         <input
//           type="text"
//           name="cast"
//           placeholder="Cast (comma-separated)"
//           value={movieData.cast}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//         />

//         {/* Rating */}
//         <input
//           type="number"
//           name="rating"
//           placeholder="Rating (e.g. 8.8)"
//           step="0.1"
//           value={movieData.rating}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//         />

//         {/* Duration */}
//         <input
//           type="number"
//           name="duration"
//           placeholder="Duration (in minutes)"
//           value={movieData.duration}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//         />

//         {/* Plot Summary */}
//         <textarea
//           name="plotSummary"
//           placeholder="Plot Summary..."
//           value={movieData.plotSummary}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//           rows="4"
//         ></textarea>

//         {/* Poster URL */}
//         <input
//           type="text"
//           name="posterUrl"
//           placeholder="Poster Image URL"
//           value={movieData.posterUrl}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//         />

//         {/* Language */}
//         <input
//           type="text"
//           name="language"
//           placeholder="Language"
//           value={movieData.language}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//         />

//         {/* Country */}
//         <input
//           type="text"
//           name="country"
//           placeholder="Country"
//           value={movieData.country}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//         />

//         {/* Added By */}
//         <input
//           type="email"
//           name="addedBy"
//           placeholder="Added by (email)"
//           value={movieData.addedBy}
//           onChange={handleChange}
//           className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
//         />

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors cursor-pointer"
//         >
//           ➕ Add Movie
//         </button>
//       </form>
//     </section>
//   );
// };

// export default AddMovie;
