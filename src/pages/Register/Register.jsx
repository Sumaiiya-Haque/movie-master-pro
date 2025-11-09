import React, {  useContext,  useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { FaEye, FaGoogle } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { auth } from "../../firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);

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

     
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Successfully Signed Up!");
            navigate("/");
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((e) => {
        toast.error(e.message);
      });
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
    <div className="min-h-screen flex flex-col items-center py-8 sm:pt-8 sm:mx-0 mx-5">
      <h2 className="text-3xl font-extrabold text-green-700 mb-8 pt-5 text-center">
        Sign Up Your Account
      </h2>

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form onSubmit={handleSignup} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input type="text" name="name" className="input" placeholder="Name" required />

            <label className="label">Photo URL</label>
            <input type="url" name="photo" className="input" placeholder="Photo URL" required />

            <label className="label">Email</label>
            <input type="email" name="email" className="input" placeholder="Email" required />

            <div className="relative">
              <label className="label">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password"
                required
              />
              <span onClick={() => setShow(!show)} className="absolute top-8 right-8 cursor-pointer z-50">
                {show ? <FaEye size={15} /> : <IoEyeOff size={15} />}
              </span>
            </div>

            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

            <button type="submit" className="btn sm:mr-4 mr-2 bg-green-200 mt-5">
              Register
            </button>

            <p className="text-center text-gray-500 font-medium ">— or —</p>

            <button onClick={handleGoogleSignIn} type="button" className="btn bg-green-200 sm:mr-4 mr-2 "><FcGoogle size={20}></FcGoogle>
              Continue With Google
            </button>

            <p className="font-semibold text-center pt-3">
              Already Have an Account?{" "}
              <Link className="text-green-600 cursor-pointer" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;