import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const categories = ["All", "Skincare", "Haircare", "Makeup", "Beauty tools"];

const products = [
  {
    id: 1,
    name: "HydraGlow Face Wash",
    price: 14,
    rating: 4.6,
    category: "Skincare",
  },
  {
    id: 2,
    name: "Silky Shine Hair Serum",
    price: 18,
    rating: 4.7,
    category: "Haircare",
  },
  {
    id: 3,
    name: "Longwear Matte Lipstick",
    price: 12,
    rating: 4.8,
    category: "Makeup",
  },
  {
    id: 4,
    name: "Ultra Soft Makeup Brush Kit",
    price: 22,
    rating: 4.5,
    category: "Beauty tools",
  },
];

const Products = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [quantities, setQuantities] = useState(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, Number(value) || 1);
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const handleAddToCart = (product) => {
    addToCart(product, quantities[product.id] || 1);
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="py-5">
      <div className="container">
        <h1 className="h3 fw-bold mb-3">Beauty Products</h1>
        <p className="text-muted small mb-4">
          Shop our handpicked selection of skincare, haircare and makeup essentials used by our
          salon experts.
        </p>

        <section className="mb-4">
          <div className="d-flex flex-wrap gap-2 mb-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm rounded-pill ${
                  activeCategory === cat ? "btn-pink" : "btn-outline-pink"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-5">
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-md-3 col-sm-6" key={product.id}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="ratio ratio-4x3 bg-soft-pink rounded-top" />
                  <div className="card-body d-flex flex-column small">
                    <p className="small text-muted mb-1">{product.category}</p>
                    <h2 className="h6 card-title mb-1">{product.name}</h2>
                    <p className="small text-muted mb-2">Rating: {product.rating}★</p>
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <span className="fw-bold text-pink">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="input-group input-group-sm" style={{ width: "110px" }}>
                        <button
                          type="button"
                          className="btn btn-outline-pink"
                          onClick={() =>
                            handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          className="form-control text-center"
                          value={quantities[product.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(product.id, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-outline-pink"
                          onClick={() =>
                            handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="btn btn-pink btn-sm rounded-pill mt-auto"
                      type="button"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Products;

