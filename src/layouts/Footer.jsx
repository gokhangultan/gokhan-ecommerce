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
    <div>
      <div className="w-[full] px-[50px] sm:px-[195px] py-[50px] flex flex-col sm:flex-row justify-between  gap-3 bg-[#FAFAFA]">
        <Link to="/">
          <h3 className="font-bold text-2xl leading-8 text-[#252B42]">
            PortaKal
          </h3>
        </Link>
        <div className="flex gap-3">
          <a href="" target="_blank">
            <button className="hover:text-white hover:bg-gray-300 rounded-full p-2">
              <FontAwesomeIcon
                icon={faFacebook}
                size="lg"
                style={{ color: "#23A6F0" }}
              />
            </button>
          </a>
          <a href="" target="_blank">
            <button className="hover:text-white hover:bg-gray-300 rounded-full p-2">
              <FontAwesomeIcon
                icon={faInstagram}
                size="lg"
                style={{ color: "#23A6F0" }}
              />
            </button>
          </a>
          <a href="" target="_blank">
            <button className="hover:text-white hover:bg-gray-300 rounded-full p-2">
              <FontAwesomeIcon
                icon={faTwitter}
                size="lg"
                style={{ color: "#23A6F0" }}
              />
            </button>
          </a>
        </div>
      </div>
      <div className="w-[full] px-[50px] sm:px-[195px] py-5">
        <div className="flex flex-col gap-5  sm:flex-row justify-between flex-wrap">
          <div className="flex flex-col gap-3">
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
          <div className="flex flex-col gap-3">
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
          <div className="flex flex-col gap-3">
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
          <div className="flex flex-col gap-3">
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
          <div className="flex flex-col gap-3">
            <h5 className="footer-title">Get In Touch</h5>
            <form onSubmit={handleSubmit} className="flex flex-row ">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={handleInputChange}
                className="pl-2 py-3 rounded-md border-1 border-[#E6E6E6] text-gray-500 bg-[#F9F9F9]"
              />
              <button
                type="submit"
                className="bg-[#23A6F0] text-[#E6E6E6] rounded-md border-1 w-[117px] h-[58px] hover:bg-white hover:primary-text hover:border-[#23A6F0]"
              >
                Subscribe
              </button>
            </form>
            <p className="secondary-text  text-xs leading-7">
              Lore imp sum dolor Amit
            </p>
          </div>
        </div>
      </div>
      <div className="w-[full] px-[50px] sm:px-[195px] py-4 bg-[#FAFAFA]">
        <h6 className="font-bold leading-6 text-sm secondary-text  collection-text ">
          Made With Love By Gokhan Gultan All Right Reserved{" "}
        </h6>
      </div>
    </div>
  );
}
