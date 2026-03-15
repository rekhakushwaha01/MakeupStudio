import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    login(email);
    navigate("/");
  };

  return (
    <main className="py-5 bg-light-pink">
      <div className="container" style={{ maxWidth: "480px" }}>
        <div className="card border-0 shadow-sm">
          <div className="card-body small">
            <h1 className="h4 fw-bold mb-3 text-center">Sign In</h1>
            <p className="text-muted text-center mb-4">
              Sign in to book appointments, manage your cart and view orders.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
              <button type="submit" className="btn btn-pink w-100 rounded-pill">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

