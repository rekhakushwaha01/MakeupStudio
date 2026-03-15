import React from "react";

const About = () => {
  return (
    <main className="py-5">
      <div className="container">
        <h1 className="h3 fw-bold mb-3">About Our Salon</h1>
        <p className="text-muted mb-4">
          Beauty Parlor is a modern makeup and wellness studio dedicated to enhancing your
          natural beauty with professional care, premium products and a warm atmosphere.
        </p>

        <section className="mb-5">
          <h2 className="h5 fw-bold mb-2">Our Story</h2>
          <p className="small text-muted">
            Started in 2018 as a small neighborhood salon, we have grown into a trusted beauty
            destination for brides, working professionals and students. Over the years, our team
            has upgraded skills with advanced training in hair, skin and makeup to bring you the
            latest trends with safe techniques.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="h5 fw-bold mb-2">Mission &amp; Vision</h2>
          <ul className="small text-muted">
            <li>Deliver high-quality, hygienic and personalized beauty services.</li>
            <li>Use dermatologically-tested products that care for your skin and hair.</li>
            <li>Create a relaxing space where every client feels confident and pampered.</li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="h5 fw-bold mb-3">Meet Our Team</h2>
          <div className="row g-4">
            {[
              {
                name: "Priya Sharma",
                role: "Senior Hair Stylist",
                experience: "8+ years in creative cuts, coloring and styling.",
              },
              {
                name: "Radhika Mehta",
                role: "Bridal Makeup Artist",
                experience: "Specialist in HD, airbrush and bridal looks.",
              },
              {
                name: "Ananya Rao",
                role: "Skin Care Specialist",
                experience: "Certified in facials, peels and skin therapies.",
              },
            ].map((member) => (
              <div className="col-md-4" key={member.name}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="ratio ratio-4x3 bg-soft-pink rounded-top" />
                  <div className="card-body">
                    <h5 className="h6 mb-1">{member.name}</h5>
                    <p className="small text-pink mb-1">{member.role}</p>
                    <p className="small text-muted mb-0">{member.experience}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5">
          <h2 className="h5 fw-bold mb-2">Certifications &amp; Achievements</h2>
          <ul className="small text-muted">
            <li>Certified by leading academies in hair, skin and makeup.</li>
            <li>Regular participation in beauty workshops and masterclasses.</li>
            <li>Trusted by hundreds of brides for their big-day transformations.</li>
          </ul>
        </section>

        <section>
          <h2 className="h5 fw-bold mb-2">Salon Environment</h2>
          <p className="small text-muted mb-3">
            Our studio is designed with soft colors, comfortable seating and strict hygiene
            standards to ensure you feel relaxed and safe from the moment you walk in.
          </p>
          <div className="row g-3">
            {[1, 2, 3].map((i) => (
              <div className="col-md-4" key={i}>
                <div className="ratio ratio-4x3 bg-soft-pink rounded-4" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;

