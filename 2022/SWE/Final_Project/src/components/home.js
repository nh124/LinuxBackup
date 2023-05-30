import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/lp.css";

export default function LandingPage() {
  const [user, setUser] = useState("");
  
  const getCurrUser = () => {
    fetch("/user").then((response) =>
      response.json().then((data) => {
        setUser(data);
      })
    );
  };
  const logout = () => {
    fetch("/logout").then((response) =>
      response.json().then(() => {
        window.location.href = "/";
        // console.log("Hi");
      })
    );
  };
  const chatRoom = () => {
    window.location.href = "/comments";
  };
  const restaurant = () => {
    window.location.href = "/restaurant";
  };
  useEffect(() => {
    getCurrUser();
  }, []);

  return (
    <body>
      <section id="header">
        <div className="header container">
          <div className="nav-bar">
            <div className="brand">
              <a href="#home">
                <h1>
                  <span>C</span>ampus <span>C</span>onnect
                </h1>
              </a>
            </div>
            <div className="nav-list">
              <div className="hamburger">
                <div className="bar"></div>
              </div>
              <ul>
                <li>
                  <a href="#home" data-after="Home">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" data-after="About">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" data-after="Service">
                    Facilities
                  </a>
                </li>
                <li>
                  <a href="#contact" data-after="Contact">
                    Contact
                  </a>
                </li>
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
                <li>
                  <a onClick={chatRoom}>ChatRoom</a>
                </li>
                <li>
                  <a onClick={restaurant}>Restaurant</a>
                </li>
                <li>
                  <a href="#projects" data-after="Projects">
                    <i className="fa-solid fa-user"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="home">
        <div className="hero container">
          <div>
            <h1>
              Welcome <span></span>
            </h1>
            <h1>
              {user} <span></span>
            </h1>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="about container">
          <div className="col-right">
            <h1 className="section-title">
              About <span>Us</span>
            </h1>
            <h2>Make the most out of your campus!</h2>
            <p>
              Campus Connect is a hub where students can interact with their
              Campus! It allows people to view nearby restaurants, chat with
              peers in their major, and share their profile with fellow
              students. Campus Connect allows students, new and old, to better
              connect with their classmates and find a good lunch within walking
              distance of their classes.
            </p>
          </div>
        </div>
      </section>
      <section id="services">
        <div className="services container">
          <div className="service-top">
            <h1 className="section-title">
              What<span> we </span>offer
            </h1>
            <p>
              What we offer, we offer to help student grow and become successful
              in their career of choice. We string to offer the best service
              possible.
            </p>
          </div>
          <div className="service-bottom">
            <div className="service-item">
              <h2>Chat</h2>
              <p>
                Have a nice chat with you peers to learn as must as possible
                about major.
              </p>
            </div>
            <div className="service-item">
              <h2>Restaurant</h2>
              <p>
                Have access to the most popular restaurants around you. Offers
                you good navigation, reviews, and great item selection with
                ease.
              </p>
            </div>
            <div className="service-item">
              <h2>Facility Location</h2>
              <p>
                Have access to all your facilities at your dedicated university.
                Access to location navigation, transportation, hours of
                operation and more.
              </p>
            </div>
            <div className="service-item">
              <h2>Web Design</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corporis debitis rerum, magni voluptatem sed architecto placeat
                beatae tenetur officia quod
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="contact container">
          <div>
            <h1 className="section-title">
              <span>contributors</span>
            </h1>
          </div>
          <div className="contact-items">
            <div className="contact-item">
              <div className="icon">
                <img src="https://img.icons8.com/bubbles/100/000000/new-post.png" />
              </div>
              <div className="contact-info">
                <h1>Eliza Schuh</h1>
                <h2>info@gmail.com</h2>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">
                <img src="https://img.icons8.com/bubbles/100/000000/new-post.png" />
              </div>
              <div className="contact-info">
                <h1>Nur Haque</h1>
                <h2>info@gmail.com</h2>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">
                <img src="https://img.icons8.com/bubbles/100/000000/new-post.png" />
              </div>
              <div className="contact-info">
                <h1>Anish Ganga</h1>
                <h2>info@gmail.com</h2>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">
                <img src="https://img.icons8.com/bubbles/100/000000/new-post.png" />
              </div>
              <div className="contact-info">
                <h2>Alina Nemira</h2>
                <h2>info@gmail.com</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

// rfce
