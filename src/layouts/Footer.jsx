import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email subscribed:", email);
  };
  return (
    <div className="container">
      <div className=" flex flex-col sm:flex-row justify-between ">
        <Link to="/">
          <h3 className="logo-text">PortaKal</h3>
        </Link>
        <div className="flex gap-2 items-center">
          <button className="button-main">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </button>

          <a href="" target="_blank">
            <button className="button-main">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </button>
          </a>
          <a href="" target="_blank">
            <button className="button-main">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </button>
          </a>
        </div>
      </div>
      <div className="my-5">
        <div className="flex flex-col gap-3 sm:flex-row justify-between flex-wrap">
          <div className="flex flex-col gap-1">
            <h5 className="footer-title">Company Info</h5>
            <Link to="/about" className="footer-link">
              About us
            </Link>
            <Link to="" className="footer-link">
              Carrier
            </Link>
            <Link to="" className="footer-link">
              We are hiring
            </Link>
            <Link to="" className="footer-link">
              Blog
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="footer-title">Legal</h5>
            <Link to="/about" className="footer-link">
              About us
            </Link>
            <Link to="" className="footer-link">
              Carrier
            </Link>
            <Link to="" className="footer-link">
              We are hiring
            </Link>
            <Link to="" className="footer-link">
              Blog
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="footer-title">Features</h5>
            <Link to="" className="footer-link">
              Business Marketing
            </Link>
            <Link to="" className="footer-link">
              User Analytic
            </Link>
            <Link to="" className="footer-link">
              Live Chat
            </Link>
            <Link to="" className="footer-link">
              Unlimited Support
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="footer-title">Resources</h5>
            <Link to="" className="footer-link">
              IOS & Android
            </Link>
            <Link to="" className="footer-link">
              Watch a Demo
            </Link>
            <Link to="" className="footer-link">
              Customers
            </Link>
            <Link to="" className="footer-link">
              API
            </Link>
          </div>
          <div className="flex flex-col gap-1 justify-between">
            <h5 className="footer-title">Get In Touch</h5>
            <form
              onSubmit={handleSubmit}
              className="flex flex-row justify-center items-center "
            >
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={handleInputChange}
                className="header-button hover:bg-transparent outline-none border-2"
              />
              <button type="submit" className="button-main bg-primaryColor">
                Subscribe
              </button>
            </form>
            <p className="secondary-text  text-xs leading-7">
              Lore imp sum dolor Amit
            </p>
          </div>
        </div>
      </div>
      <div className="my-5">
        <h6 className="font-bold leading-6 text-sm secondary-text  collection-text ">
          Made With Love By Gokhan Gultan All Right Reserved{" "}
        </h6>
      </div>
    </div>
  );
}
