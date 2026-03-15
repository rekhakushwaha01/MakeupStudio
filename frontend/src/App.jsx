import React from "react";
import { Link, NavLink, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Products from "./pages/Products.jsx";
import Contact from "./pages/Contact.jsx";
import BookNow from "./pages/BookNow.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payment from "./pages/Payment.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import Login from "./pages/Login.jsx";
import { useCart } from "./context/CartContext.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const App = () => {
  const { totalItems, toast, dismissToast } = useCart();
  const { user, logout } = useAuth();

  return (
    <div className="app bg-light-pink min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-pink" to="/">
            Beauty Parlor
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <NavLink end className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/services">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              {user && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">
                      Contact
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/cart">
                      <span role="img" aria-label="cart">
                        🛒
                      </span>{" "}
                      <span className="badge bg-pink-badge ms-1">{totalItems}</span>
                    </NavLink>
                  </li>
                  <li className="nav-item ms-lg-3">
                    <Link className="btn btn-pink rounded-pill px-4" to="/book">
                      Book Now
                    </Link>
                  </li>
                </>
              )}
              {!user && (
                <li className="nav-item ms-lg-3">
                  <Link className="btn btn-outline-pink rounded-pill px-4" to="/login">
                    Sign In
                  </Link>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-link nav-link px-2"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/book"
            element={user ? <BookNow /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </div>

      {toast.visible && (
        <div className="cart-toast position-fixed bottom-0 end-0 p-3">
          <div className="toast show text-white bg-pink shadow">
            <div className="toast-body d-flex align-items-center justify-content-between gap-3 small">
              <span>{toast.message}</span>
              <button
                type="button"
                className="btn-close btn-close-white btn-sm"
                onClick={dismissToast}
              ></button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-4 bg-white border-top mt-auto">
        <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2">
          <p className="mb-0 small text-muted">
            © {new Date().getFullYear()} Beauty Parlor. All rights reserved.
          </p>
          <div className="d-flex gap-3 small">
            <a href="#" className="text-muted text-decoration-none">
              Privacy Policy
            </a>
            <a href="#" className="text-muted text-decoration-none">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

