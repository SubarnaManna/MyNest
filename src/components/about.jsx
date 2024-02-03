import React from "react";
import "../style/about.css";
// import Fullview from "../components/pgfullview";

const About = () => {
  return (
    <>
      <div className="about-page-info">
        <div className="our-mission"data-aos="fade-up-right">
          <h2>Our Mission</h2>
          <p>
            At PGConnect, we are committed to simplifying the process of finding
            and managing Paying Guest accommodations. Our mission is to bridge
            the gap between PG seekers and PG owners, providing a seamless and
            secure platform for hassle-free living.
          </p>
        </div>
        <div className="our-mission" data-aos="fade-up-left">
          <h2>Solving a Common Dilemma</h2>
          <p>
            Finding a comfortable, safe, and affordable PG accommodation can be
            challenging. Likewise, PG owners face difficulties in managing their
            properties efficiently. PGConnect aims to resolve these issues by
            offering an innovative solution.
          </p>
        </div>
        <div className="our-mission"data-aos="fade-up-right">
          <h2>Key Features</h2>
          <ul>
            <li>
              <span>Search & Discover:</span> Easily search for PG
              accommodations based on your preferences, location, and budget.
            </li>
            <li>
              <span>Reviews & Ratings:</span> Read reviews from previous tenants
              to make informed decisions.
            </li>
            <li>
              <span>PG Owners:</span> List your properties and manage inquiries,
              bookings, and payments effortlessly.
            </li>
          </ul>
        </div>
        <div className="our-mission"data-aos="fade-up-left">
          <h2>Who Can Benefit?</h2>
          <ul>
            <li>
              <span>Students:</span> Find convenient and budget-friendly PG
              accommodations near your college or university.
            </li>
            <li>
              <span>Working Professionals:</span> Discover comfortable options
              close to your workplace, with easy communication with PG owners.
            </li>
            <li>
              <span>PG Owners:</span> List your properties and manage inquiries,
              bookings effortlessly.
            </li>
          </ul>
        </div>
        <div className="our-mission" data-aos="fade-up-right">
          <h2>Our Technology Stack</h2>
          <ul>
            <li>
              <span>Frontend:</span> React.js
            </li>
            <li>
              <span>Backend:</span> Node.js and Express
            </li>
            <li>
              <span>Database:</span> Firebase
            </li>
            <li>
              <span>Authentication:</span> Firebase
            </li>
            <li>
              <span>Hosting</span> Netify
            </li>
          </ul>
        </div>
        <div className="our-mission">
          <h2>Future Plans</h2>
          <p>
            We are committed to enhancing PGConnect further. In the future, we
            plan to introduce additional features, expand to more cities, and
            build a community of satisfied users.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
