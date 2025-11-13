import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { auth } from "../../firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Loading from "../Loading/Loading";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const { createUser, setUser,loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);


    if(loading){
    return <Loading></Loading>
  }

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUpperCase) return setPasswordError("Password must contain at least one uppercase letter!");
    if (!hasLowerCase) return setPasswordError("Password must contain at least one lowercase letter!");
    if (!isLengthValid) return setPasswordError("Password must be at least 6 characters long!");
    setPasswordError("");

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, { displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Successfully Signed Up!");
            navigate("/");
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((e) => toast.error(e.message));
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Successfully Signed Up with Google!");
        navigate("/");
      })
      .catch((e) => toast.error(e.message));
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-gray-200 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-1">Photo URL</label>
            <input
              type="url"
              name="photo"
              placeholder="Enter photo URL"
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-200 font-medium mb-1">Password</label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute  right-3 translate-y-1/2 cursor-pointer text-gray-300"
            >
              {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
            </span>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Register
          </button>

          <p className="text-center text-gray-400 font-medium mt-2">— or —</p>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold shadow-md transition"
          >
            <FcGoogle size={20} /> Continue With Google
          </button>

          <p className="text-center text-gray-300 mt-4 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;





