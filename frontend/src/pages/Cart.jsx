import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    total,
    totalItems,
    couponCode,
    applyCoupon,
  } = useCart();
  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponMessage, setCouponMessage] = useState("");
  const navigate = useNavigate();

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    setCouponMessage(result.message);
  };

  const handleProceed = () => {
    if (totalItems > 0) {
      navigate("/checkout");
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <h1 className="h3 fw-bold mb-3">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="alert alert-light border small" role="alert">
            Your cart is empty.{" "}
            <Link to="/products" className="text-pink fw-semibold">
              Browse products
            </Link>
            .
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center justify-content-between py-3 border-bottom small"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="cart-img-placeholder bg-soft-pink rounded-4" />
                        <div>
                          <p className="mb-1 fw-semibold">{item.name}</p>
                          <p className="mb-1 text-muted">${item.price.toFixed(2)}</p>
                          <button
                            type="button"
                            className="btn btn-link p-0 small text-danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="input-group input-group-sm mb-1" style={{ width: "110px" }}>
                          <button
                            className="btn btn-outline-pink"
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input
                            className="form-control text-center"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, Number(e.target.value) || 1)
                            }
                          />
                          <button
                            className="btn btn-outline-pink"
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="mb-0 fw-semibold text-pink">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body small">
                  <h2 className="h6 fw-bold mb-3">Apply Coupon</h2>
                  <div className="input-group input-group-sm mb-2">
                    <input
                      className="form-control"
                      placeholder="Enter coupon (e.g. BEAUTY10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-pink"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p className="small mb-0 text-muted">{couponMessage}</p>
                  )}
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body small">
                  <h2 className="h6 fw-bold mb-3">Order Summary</h2>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Items ({totalItems})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Discount</span>
                    <span className="text-success">- ${discount.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Total</span>
                    <span className="text-pink">${total.toFixed(2)}</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-pink w-100 rounded-pill"
                    disabled={totalItems === 0}
                    onClick={handleProceed}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;

