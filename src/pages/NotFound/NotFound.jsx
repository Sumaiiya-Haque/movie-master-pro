import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <h1 className="text-8xl font-extrabold mb-6 animate-bounce text-yellow-400 drop-shadow-lg">404</h1>
      <p className="text-2xl md:text-3xl mb-8 text-center">Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-full font-bold shadow-lg hover:bg-yellow-300 transition duration-300 transform hover:-translate-y-1 hover:scale-105"
      >
        Go Back Home
      </Link>
      <div className="mt-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="Lost in space"
          className="w-64 md:w-96 animate-pulse opacity-80"
        />
      </div>
    </div>
  );
};

export default NotFound;

