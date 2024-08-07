import React, { useState } from "react";
import { auth, db } from "../Firebase/Firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/nav";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        navigate("/study", { replace: true });
      } else {
        console.log("No such document!");
        setError("User data not found");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("If your email is registered with us, you will receive a password reset email shortly.");
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorCode.substr(5, errorCode.length - 1));
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="form-container sign-in-container bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <form onSubmit={handleLogin} className="flex flex-col items-center">
            <h1 className="font-bold text-3xl mb-6">Sign in</h1>
            <div className="flex items-center justify-center mb-4">
              <h2 className="mr-2">Don't Have an Account?</h2>
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="underline text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                Join Here
              </button>
            </div>

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
            <a href="#" className="text-gray-700 text-lg mb-4" onClick={handlePasswordReset}>
              Forgot your password?
            </a>
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
                "Sign In"
              )}
            </button>
            {error && <div className="error-message text-red-500 mt-4">{error}</div>}
            {message && <div className="message text-green-500 mt-4">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
