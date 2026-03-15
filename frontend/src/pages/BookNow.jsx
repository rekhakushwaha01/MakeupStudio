import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const timeSlots = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM"];

const BookNow = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    service: "Facial",
    stylist: "Any available stylist",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccessMsg("");
  };

  const handleTimeSelect = (slot) => {
    setForm((prev) => ({ ...prev, time: slot }));
    setErrors((prev) => ({ ...prev, time: "" }));
    setSuccessMsg("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.service) newErrors.service = "Please choose a service.";
    if (!form.stylist) newErrors.stylist = "Please choose a stylist.";
    if (!form.date) newErrors.date = "Please select a date.";
    if (!form.time) newErrors.time = "Please select a time slot.";
    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (form.phone.replace(/\D/g, "").length < 8) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!user) {
      alert("Please sign in to book an appointment.");
      return;
    }

    try {
      // For demo we send service name as serviceId; backend stores string
      const res = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          serviceId: form.service,
          date: form.date,
          timeSlot: form.time,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Booking failed", data);
        alert(data.error || "Failed to book appointment.");
        return;
      }
      console.log("Booking created", data);
      setSuccessMsg(
        `Your appointment for ${form.service} with ${form.stylist} on ${form.date} at ${form.time} has been booked.`
      );
    } catch (err) {
      console.error("Error booking appointment", err);
      alert("Something went wrong while booking. Please try again.");
    }
  };

  return (
    <main className="py-5 bg-light-pink">
      <div className="container">
        <h1 className="h3 fw-bold mb-3">Book an Appointment</h1>
        <p className="text-muted small mb-4">
          Follow the simple steps below to schedule your beauty session with us.
        </p>

        <section className="mb-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body small">
                    <h2 className="h5 fw-bold mb-3">1. Choose Service</h2>
                    <select
                      className={`form-select mb-1 ${errors.service ? "is-invalid" : ""}`}
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="Facial">Facial</option>
                      <option value="Haircut">Haircut</option>
                      <option value="Bridal makeup">Bridal makeup</option>
                      <option value="Party makeup">Party makeup</option>
                      <option value="Manicure / Pedicure">Manicure / Pedicure</option>
                    </select>
                    {errors.service && (
                      <div className="invalid-feedback mb-2">{errors.service}</div>
                    )}

                    <h2 className="h5 fw-bold mb-3 mt-3">2. Choose Stylist</h2>
                    <select
                      className={`form-select mb-1 ${errors.stylist ? "is-invalid" : ""}`}
                      name="stylist"
                      value={form.stylist}
                      onChange={handleChange}
                    >
                      <option value="Any available stylist">Any available stylist</option>
                      <option value="Priya - Hair Specialist">Priya - Hair Specialist</option>
                      <option value="Radhika - Makeup Artist">Radhika - Makeup Artist</option>
                      <option value="Ananya - Skin Expert">Ananya - Skin Expert</option>
                    </select>
                    {errors.stylist && (
                      <div className="invalid-feedback mb-2">{errors.stylist}</div>
                    )}

                    <h2 className="h5 fw-bold mb-3 mt-3">3. Select Date &amp; Time</h2>
                    <div className="mb-2">
                      <input
                        type="date"
                        name="date"
                        className={`form-control mb-2 ${errors.date ? "is-invalid" : ""}`}
                        value={form.date}
                        onChange={handleChange}
                      />
                      {errors.date && (
                        <div className="invalid-feedback mb-2 d-block">{errors.date}</div>
                      )}
                      <div className="d-flex flex-wrap gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            className={`btn btn-sm rounded-pill ${
                              form.time === slot ? "btn-pink" : "btn-outline-pink"
                            }`}
                            onClick={() => handleTimeSelect(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      {errors.time && (
                        <div className="text-danger mt-2">{errors.time}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body small">
                    <h2 className="h5 fw-bold mb-3">4. Your Details</h2>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        name="name"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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

                    <h2 className="h5 fw-bold mb-3">5. Confirm Appointment</h2>
                    <p className="text-muted small mb-3">
                      Review your selected service, stylist, date and time before confirming.
                    </p>

                    <button type="submit" className="btn btn-pink rounded-pill px-4 mb-3">
                      Confirm Booking
                    </button>

                    {successMsg && (
                      <div className="alert alert-success small mb-0" role="alert">
                        {successMsg}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default BookNow;

