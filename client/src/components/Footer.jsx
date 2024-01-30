import React from 'react';
import './footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope">&nbsp;&nbsp;sales@blooddonationwebsite.com</i>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone">&nbsp;&nbsp;+91 9751791203</i>
            </div>
          </div>
          <div className="social-media-links">
            <a href="#" className="social-link"><i className="fab fa-github"></i></a>
            <a href="#" className="social-link"><i className="fab fa-whatsapp"></i></a>
            <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-link"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
        <p className="footer-text">&copy; 2023 Blood Donation App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
