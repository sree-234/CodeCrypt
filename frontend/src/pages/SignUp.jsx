import React, { useState } from "react";
import { auth, db } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/nav";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: name,
        email,
      });

      console.log("User created and data stored in Firestore!");
      navigate("/study", { replace: true });
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="form-container sign-up-container bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <form onSubmit={handleSignUp} className="flex flex-col items-center">
            <h1 className="font-bold text-3xl mb-6">Sign Up</h1>
            <div className="flex items-center justify-center mb-4">
              <h2 className="mr-2">Already have an Account?</h2>
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="underline text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                Sign in
              </button>
            </div>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-200 border border-gray-300 rounded p-3 my-2 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-200 border border-gray-300 rounded p-3 my-2 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-200 border border-gray-300 rounded p-3 my-2 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-full border border-red-500 bg-red-500 text-white font-bold py-3 px-12 uppercase tracking-wider transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none mt-4"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                "Sign Up"
              )}
            </button>
            {error && <div className="error-message text-red-500 mt-4">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
