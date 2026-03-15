import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { services } from "../data/services.js";

const demoVideoUrl =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const service = services.find((s) => s.id === serviceId);
  const navigate = useNavigate();

  if (!service) {
    return (
      <main className="py-5">
        <div className="container">
          <p className="small text-muted mb-3">Service not found.</p>
          <button
            type="button"
            className="btn btn-outline-pink btn-sm rounded-pill"
            onClick={() => navigate("/services")}
          >
            Back to Services
          </button>
        </div>
      </main>
    );
  }

  const galleryItems = [1, 2, 3, 4, 5, 6];
  const [activeImage, setActiveImage] = useState(galleryItems[0]);

  return (
    <main className="py-5 bg-light-pink">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="small text-muted mb-1">
              <Link to="/services" className="text-pink text-decoration-none">
                Services
              </Link>{" "}
              / {service.name}
            </p>
            <h1 className="h3 fw-bold mb-1">{service.name}</h1>
            <p className="small text-muted mb-0">{service.description}</p>
          </div>
          <Link to="/book" className="btn btn-pink rounded-pill">
            Book Now
          </Link>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-lg-7">
            <div className="service-gallery-preview mb-3 rounded-4 bg-soft-pink d-flex align-items-center justify-content-center">
              <span className="small text-muted">Demo preview {activeImage}</span>
            </div>
            <div className="row g-2">
              {galleryItems.map((item) => (
                <div className="col-4 col-md-2" key={item}>
                  <button
                    type="button"
                    className={`service-gallery-thumb rounded-3 w-100 ${
                      activeImage === item ? "active" : ""
                    }`}
                    onClick={() => setActiveImage(item)}
                  >
                    <span className="small">Img {item}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body small">
                <h2 className="h6 fw-bold mb-2">Service Information</h2>
                <p className="mb-1">
                  <strong>Duration:</strong> {service.duration}
                </p>
                <p className="mb-1">
                  <strong>Price range:</strong> {service.priceRange}
                </p>
                <p className="mb-2">
                  <strong>Benefits:</strong>
                </p>
                <ul className="small text-muted mb-0">
                  {service.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body small">
                <h2 className="h6 fw-bold mb-2">Available Treatments</h2>
                <ul className="small text-muted mb-0">
                  {service.treatments.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-4">
          <h2 className="h5 fw-bold mb-2">Demo Video</h2>
          <div className="ratio ratio-16x9 rounded-4 overflow-hidden bg-soft-pink">
            <video controls className="w-100 h-100">
              <source src={demoVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className="mb-4">
          <h2 className="h5 fw-bold mb-2">Before &amp; After</h2>
          <div className="row g-3">
            {[1, 2, 3].map((pair) => (
              <div className="col-md-4" key={pair}>
                <div className="row g-2">
                  <div className="col-6">
                    <div className="ratio ratio-4x3 rounded-4 bg-soft-pink d-flex align-items-center justify-content-center">
                      <span className="small text-muted">Before</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="ratio ratio-4x3 rounded-4 bg-soft-pink d-flex align-items-center justify-content-center">
                      <span className="small text-muted">After</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <h2 className="h5 fw-bold mb-2">Customer Reviews</h2>
          <div className="row g-3">
            {service.reviews.map((review) => (
              <div className="col-md-4" key={review.name}>
                <div className="card border-0 shadow-sm h-100 small">
                  <div className="card-body">
                    <p className="text-pink mb-1">
                      {"★".repeat(Math.round(review.rating))}{" "}
                      <span className="text-muted">{review.rating.toFixed(1)}</span>
                    </p>
                    <p className="text-muted mb-2">“{review.feedback}”</p>
                    <p className="fw-semibold mb-0">{review.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link to="/book" className="btn btn-pink rounded-pill px-4">
            Book This Service
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetails;

