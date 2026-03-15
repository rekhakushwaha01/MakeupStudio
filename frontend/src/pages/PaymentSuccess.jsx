import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const PaymentSuccess = () => {
  const { lastOrder } = useCart();
  const navigate = useNavigate();

  if (!lastOrder) {
    navigate("/");
  }

  return (
    <main className="py-5 bg-light-pink">
      <div className="container">
        <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: "540px" }}>
          <div className="card-body text-center small">
            <h1 className="h4 fw-bold mb-2 text-pink">Payment Successful</h1>
            <p className="text-muted mb-3">
              Thank you for your order! Your beauty products will be processed soon.
            </p>
            <p className="mb-1">
              <strong>Order ID:</strong> {lastOrder?.orderId}
            </p>
            <p className="mb-3">
              <strong>Total Paid:</strong> ${lastOrder?.total.toFixed(2)}
            </p>
            <hr />
            <h2 className="h6 fw-bold mb-2">Order Details</h2>
            <ul className="list-unstyled text-start mb-3">
              {lastOrder?.items.map((item) => (
                <li key={item.id} className="d-flex justify-content-between mb-1">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="small text-muted mb-4">
              A confirmation message can be sent via email / SMS in a real application.
            </p>
            <Link to="/products" className="btn btn-pink rounded-pill px-4 me-2">
              Continue Shopping
            </Link>
            <button
              type="button"
              className="btn btn-outline-pink rounded-pill px-4"
              onClick={() => navigate("/")}
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;

