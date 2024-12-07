import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Réinitialiser les erreurs

    try {
      const response = await axios.post("https://meuble-backend.onrender.com/user/signin", {
        email,
        password,
      });

      // Enregistrer le token JWT dans le localStorage (ou dans un contexte global)
      localStorage.setItem("authToken", response.data.token);

      alert("Login successful!");
      navigate("/Dashboard"); // Rediriger après connexion
    } catch (error) {
      console.error("Login error:", error.response.data.message);
      setErrorMessage(error.response.data.message || "An error occurred during login.");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="card shadow-sm rounded-3 p-4">
              <h3 className="text-center mb-4">Log In</h3>
              <form onSubmit={handleSubmit}>
                {/* Champ email */}
                <div className="form-group mb-3">
                  <label htmlFor="email" className="text-muted">Enter your email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Champ mot de passe */}
                <div className="form-group mb-4">
                  <label htmlFor="password" className="text-muted">Enter your password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Afficher un message d'erreur */}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                {/* Bouton de connexion */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mt-3"
                >
                  Log in
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="text-muted">Don't have an account?</p>
                <Link to="/signup" className="btn btn-secondary btn-sm px-4 py-2">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </>
  );
}

export default Login;
