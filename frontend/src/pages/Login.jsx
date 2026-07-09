import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

    
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg text-white font-semibold">
            Login
          </button>
        </form>

        <div className="my-4 flex items-center justify-center text-gray-400">
          <span>or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black p-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Continue with Google
        </button>

        <p className="text-gray-400 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Signup
          </Link>
        </p>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}