import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitted(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (form.phone.replace(/\D/g, "").length < 8) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = "Please enter at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <main className="py-5">
      <div className="container">
        <h1 className="h3 fw-bold mb-3">Contact Us</h1>

        <section className="mb-4">
          <h2 className="h5 fw-bold mb-2">Salon Information</h2>
          <p className="small text-muted mb-1">
            <strong>Address:</strong> 123 Beauty Street, Glamour City
          </p>
          <p className="small text-muted mb-1">
            <strong>Phone:</strong> +91 98765 43210
          </p>
          <p className="small text-muted mb-1">
            <strong>Email:</strong> hello@beautyparlor.com
          </p>
        </section>

        <section className="row g-4 mb-4">
          <div className="col-md-6">
            <h2 className="h5 fw-bold mb-2">Send Us a Message</h2>
            <form className="small" onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  rows="4"
                  placeholder="Tell us how we can help you"
                  value={form.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <div className="invalid-feedback">{errors.message}</div>
                )}
              </div>
              <button type="submit" className="btn btn-pink rounded-pill px-4">
                Submit
              </button>
              {submitted && (
                <div className="alert alert-success small mt-3 mb-0" role="alert">
                  Thank you for contacting us. We will get back to you soon.
                </div>
              )}
            </form>
          </div>

          <div className="col-md-6">
            <h2 className="h5 fw-bold mb-2">Visit Our Salon</h2>
            <div className="ratio ratio-16x9 bg-soft-pink rounded-4 mb-3 d-flex align-items-center justify-content-center">
              <span className="small text-muted">Google Map Embed (placeholder)</span>
            </div>
            <h3 className="h6 fw-bold mb-2">Business Hours</h3>
            <p className="small text-muted mb-1">Monday – Friday: 9:00 AM – 8:00 PM</p>
            <p className="small text-muted mb-1">Saturday – Sunday: 10:00 AM – 6:00 PM</p>

            <h3 className="h6 fw-bold mt-3 mb-2">Connect with Us</h3>
            <div className="d-flex gap-2 small">
              <a href="#" className="btn btn-outline-pink btn-sm rounded-pill">
                Instagram
              </a>
              <a href="#" className="btn btn-outline-pink btn-sm rounded-pill">
                Facebook
              </a>
              <a href="#" className="btn btn-outline-pink btn-sm rounded-pill">
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;

