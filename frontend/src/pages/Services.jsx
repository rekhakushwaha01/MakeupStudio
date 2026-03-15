import React from "react";
import { Link } from "react-router-dom";
import { services } from "../data/services.js";

const Services = () => {
  return (
    <main className="py-5">
      <div className="container">
        <h1 className="h3 fw-bold mb-3">Our Services</h1>
        <p className="text-muted small mb-4">
          Choose from a wide range of professional beauty services designed to pamper you from
          head to toe.
        </p>

        <section className="mb-5">
          <div className="row g-4">
            {services.map((service) => (
              <div className="col-md-4" key={service.id}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h2 className="h6 fw-bold mb-2">{service.name}</h2>
                    <ul className="small text-muted mb-3">
                      {service.treatments.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <Link
                      className="btn btn-outline-pink btn-sm rounded-pill"
                      to={`/services/${service.id}`}
                    >
                      View Details
                    </Link>
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

export default Services;

