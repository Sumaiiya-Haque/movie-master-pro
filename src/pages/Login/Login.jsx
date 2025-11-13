import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase/firebase.config";
import Loading from "../Loading/Loading";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const { signIn,loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);

   if(loading){
    return <Loading></Loading>
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        navigate(location.state || "/");
        toast.success("Login Successfully");
      })
      .catch((e) => toast.error(e.message));
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        navigate(location.state || "/");
        toast.success("Login Successfully");
      })
      .catch((e) => toast.error(e.message));
  };
 

  return (
    <div className="min-h-screen flex items-center justify-center  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-8">
          Login Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-200 font-medium mb-1">Email</label>
            <input
              ref={emailRef}
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
          </div>

          <div className="text-sm text-right">
            <button
              type="button"
              className="text-yellow-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Login
          </button>

          <p className="text-center text-gray-400 font-medium mt-2">— or —</p>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold shadow-md transition"
          >
            <FcGoogle size={20} /> Continue With Google
          </button>

          <p className="text-center text-gray-300 mt-4 font-medium">
            Don't Have an Account?{" "}
            <Link to="/register" className="text-yellow-400 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;





