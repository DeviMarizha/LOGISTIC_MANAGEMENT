import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { FaInstagramSquare } from 'react-icons/fa';


function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <h3>FAQ</h3>
        <ul>
          <li>
            <Link to="/faq">How do I sign up for TPort?</Link>
          </li>
          <li>
            <Link to="/faq">Is TPort suitable for all types of businesses?</Link>
          </li>
          <li>
            <Link to="/faq">How do I track my shipments with TPort?</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>About Us</h3>
        <ul>
          <li>
            <Link to="/about">Our Story</Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Follow Us</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/">
              <BsFacebook /> TPort
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <FaInstagramSquare /> TPort
            </a>
          </li>
          <li>
            <a href="https://x.com/">
              <BsTwitter /> TPort
            </a>
          </li>
          
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
