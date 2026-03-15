import React from "react";
import modelImg from "../../assets/model.webp";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <p className="text-uppercase small fw-semibold text-pink mb-2">
                Experience The Best Beauty Service
              </p>
              <h1 className="display-5 fw-bold mb-3">
                Where Women Want To Look
                <br />
                Their Very Best
              </h1>
              <p className="text-muted mb-4">
                Step into our beauty studio for a luxurious makeover that
                enhances your natural glow. From skincare to styling, we have
                everything you need.
              </p>
              <div className="d-flex flex-wrap align-items-center gap-3">
                <a href="#home-services" className="btn btn-pink rounded-pill px-4">
                  Browse Services
                </a>
                <a href="/book" className="btn btn-outline-pink rounded-pill px-4">
                  Book Appointment
                </a>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0 text-center">
              <div className="hero-card shadow-lg">
                <img
                  src={modelImg}
                  alt="Beauty model"
                  className="img-fluid rounded-4 hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section id="home-services" className="py-5 bg-white">
        <div className="container">
          <h2 className="h4 fw-bold mb-3 text-center">Featured Services</h2>
          <p className="text-muted text-center mb-4">
            Explore our most popular beauty services, specially curated to give you a stunning look.
          </p>
          <div className="row g-4">
            {[
              {
                title: "Hair Styling",
                desc: "Trendy cuts, blowouts and styling for every occasion.",
              },
              {
                title: "Facial Treatment",
                desc: "Deep cleansing facials that restore your natural glow.",
              },
              {
                title: "Makeup",
                desc: "From soft glam to full bridal looks crafted just for you.",
              },
              {
                title: "Nail Care",
                desc: "Manicure, pedicure and nail art with premium products.",
              },
            ].map((service) => (
              <div className="col-md-3 col-sm-6" key={service.title}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="ratio ratio-4x3 bg-soft-pink rounded-top" />
                  <div className="card-body">
                    <h5 className="card-title h6">{service.title}</h5>
                    <p className="card-text small text-muted">{service.desc}</p>
                    <button className="btn btn-outline-pink btn-sm rounded-pill">
                      View Service
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-5 bg-light-pink">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h2 className="h4 fw-bold mb-3">Why Choose Our Salon</h2>
              <p className="text-muted mb-3">
                We focus on quality, comfort and care to make every visit memorable.
              </p>
              <ul className="list-unstyled small">
                <li className="mb-2">• Professional stylists with years of experience</li>
                <li className="mb-2">• Premium, dermatologically-tested products</li>
                <li className="mb-2">• Hygienic and relaxing environment</li>
                <li className="mb-2">• Transparent and affordable pricing</li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="stat-card text-center p-3 rounded-4 bg-white shadow-sm">
                    <h3 className="h4 text-pink mb-1">1000+</h3>
                    <p className="small mb-0 text-muted">Happy Clients</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-card text-center p-3 rounded-4 bg-white shadow-sm">
                    <h3 className="h4 text-pink mb-1">4.9★</h3>
                    <p className="small mb-0 text-muted">Average Rating</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="stat-card text-center p-3 rounded-4 bg-white shadow-sm">
                    <p className="small mb-0 text-muted">
                      “Best place for bridal makeovers and pampering sessions.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular products preview */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h2 className="h4 fw-bold mb-0">Popular Beauty Products</h2>
            <span className="small text-muted">Skincare • Haircare • Makeup</span>
          </div>
          <div className="row g-4">
            {[1, 2, 3].map((id) => (
              <div className="col-md-4" key={id}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="ratio ratio-4x3 bg-soft-pink rounded-top" />
                  <div className="card-body">
                    <h6 className="card-title">Glow Boost Serum</h6>
                    <p className="small text-muted mb-1">Radiance • Hydration • Smooth texture</p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span className="fw-bold text-pink">$24.00</span>
                      <button className="btn btn-outline-pink btn-sm rounded-pill">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light-pink">
        <div className="container">
          <h2 className="h4 fw-bold mb-4 text-center">Customer Testimonials</h2>
          <div className="row g-4">
            {[
              {
                name: "Aisha",
                text: "Amazing bridal makeup! I felt like a princess on my big day.",
              },
              {
                name: "Riya",
                text: "Loved the facial and hair spa. The staff is very friendly.",
              },
              {
                name: "Neha",
                text: "Clean environment, quality products and great service every time.",
              },
            ].map((review) => (
              <div className="col-md-4" key={review.name}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="mb-2 text-pink">★★★★★</div>
                    <p className="small text-muted mb-3">“{review.text}”</p>
                    <p className="mb-0 fw-semibold small">{review.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & after + offers */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <h2 className="h4 fw-bold mb-3">Before &amp; After Gallery</h2>
              <p className="text-muted small mb-3">
                Real transformations from our clients after hair styling, facials and makeup.
              </p>
              <div className="row g-3">
                {[1, 2, 3, 4].map((i) => (
                  <div className="col-6" key={i}>
                    <div className="ratio ratio-4x3 bg-soft-pink rounded-4" />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <h2 className="h4 fw-bold mb-3">Special Offers</h2>
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  <h6 className="mb-1">Bridal Package</h6>
                  <p className="small text-muted mb-1">
                    Full bridal makeup + hair styling + pre-bridal skin ritual.
                  </p>
                  <p className="small mb-2">
                    <span className="text-pink fw-bold">Save 20%</span> on advance booking.
                  </p>
                </div>
              </div>
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="mb-1">Festival Glam Offer</h6>
                  <p className="small text-muted mb-1">
                    Party makeup + hair styling combo at a special price.
                  </p>
                  <p className="small mb-0">
                    Available during major festivals and celebrations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

