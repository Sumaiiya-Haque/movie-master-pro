import React, { use, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const { signIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("Login Successfully");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("Login Successfully");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        toast.success("Check your Email to reset Password");
        setTimeout(() => {
          window.open("https://mail.google.com", "_blank");
        }, 2000);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className=" min-h-[90vh] sm:min-h-screen flex flex-col items-center pt-8 sm:mx-0 mx-5">
      {/* Page Title */}
      <h2 className="text-3xl font-extrabold text-green-700 mb-8 pt-5 text-center">
          Login Your Account
        </h2>
     

      {/* Login Card */}
      <div className="card bg-base-100 w-full max-w-sm  shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />
            <div className="relative">
              {/* password */}
              <label className="label">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password"
              />

              <span
                onClick={() => setShow(!show)}
                className="absolute top-8 right-8 cursor-pointer z-50"
              >
                {show ? (
                  <FaEye size={15}></FaEye>
                ) : (
                  <IoEyeOff size={15}></IoEyeOff>
                )}
              </span>
            </div>

            <div className="text-sm mt-1">
              <a
                onClick={handleForgetPassword}
                className="link link-hover text-blue-600"
              >
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn bg-green-200 ml-1 sm:mr-4 mr-2  mt-3">
              Login
            </button>
           <p className="text-center text-gray-500 font-medium ">— or —</p>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn bg-green-200  sm:mr-4 mr-2  ml-1"
              // disabled={!!passwordError}
            >
              <FcGoogle size={20} /> Continue With Google
            </button>

            <p className="font-semibold text-center pt-3">
              Don't Have an Account?{" "}
              <Link className="text-green-600 cursor-pointer" to="/register">
                Sign Up
              </Link>{" "}
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;