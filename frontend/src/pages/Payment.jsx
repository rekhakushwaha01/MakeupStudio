import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const Payment = () => {
  const { total, customerInfo, cartItems, clearCart, setLastOrder } = useCart();
  const [method, setMethod] = useState("upi");
  const navigate = useNavigate();

  if (!customerInfo || cartItems.length === 0) {
    navigate("/products");
  }

  const handlePlaceOrder = () => {
    const orderId = `BP-${Date.now().toString().slice(-6)}`;
    const order = {
      orderId,
      customer: customerInfo,
      items: cartItems,
      total,
      method,
      createdAt: new Date().toISOString(),
    };
    setLastOrder(order);
    clearCart();
    navigate("/payment-success");
  };

  return (
    <main className="py-5">
      <div className="container">
        <h1 className="h3 fw-bold mb-3">Payment</h1>
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body small">
                <h2 className="h6 fw-bold mb-3">Select Payment Method</h2>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="upi"
                    name="payment"
                    value="upi"
                    checked={method === "upi"}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="upi">
                    UPI (Google Pay / PhonePe / Paytm)
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={method === "card"}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="card">
                    Debit / Credit Card
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="netbanking"
                    name="payment"
                    value="netbanking"
                    checked={method === "netbanking"}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="netbanking">
                    Net Banking
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="wallet"
                    name="payment"
                    value="wallet"
                    checked={method === "wallet"}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="wallet">
                    Wallets
                  </label>
                </div>
                <p className="small text-muted mb-3">
                  This is a demo payment gateway screen. On a real site you would redirect to a
                  secure payment provider.
                </p>
                <button
                  type="button"
                  className="btn btn-pink rounded-pill px-4"
                  onClick={handlePlaceOrder}
                >
                  Place Order &amp; Pay
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body small">
                <h2 className="h6 fw-bold mb-3">Order Summary</h2>
                <p className="mb-2">
                  <strong>{customerInfo?.name}</strong>
                  <br />
                  <span className="text-muted">{customerInfo?.address}</span>
                </p>
                <hr />
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total to Pay</span>
                  <span className="text-pink">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;

