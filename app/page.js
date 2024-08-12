"use clinet";

import "../pages/styles/homepage.css";
// import InteractiveLink from './components/InteractiveLink'; // Import the Client Component
import Link from "next/link";
import React from "react";

export default function HomePage() {
  /*
  const handleScroll = (e) => {
    e.preventDefault();
    const target = document.querySelector("#tea");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };*/
  return (
    <div>
      {/* Header Section */}
      <div className="landing">
        <div className="header">
          <h1 className="logo">Boba Broskis</h1>
          <div className="options">
            <div >
              <Link href="#tea">
                <h3 className="menu">↓ Menu ↓</h3>
              </Link>
            </div>

            <Link href="/chatbox">
              <button className="chat">Chat with Us</button>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="hero">
          <div className="slogan">
            <p>Grab a Broski</p>
            <p>Cause You're Gonna</p>
            <p>Wanna Share!</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div id="tea" className="tea">
        <h1>Menu</h1>
        <p>
          We offer a wide range of delicious boba tea flavors. Explore our menu
          and find your favorite drink! Have questions? Chat with our AI
          employee!
        </p>
        <div className="teaSelections">
          <div className="milk-tea">
            <h2>Milk Teas</h2>
          </div>
          <div className="tea-latte">
            <h2>Tea Lattes</h2>
          </div>
          <div className="slush-serie">
            <h2>Slush Series</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
