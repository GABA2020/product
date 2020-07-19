import React from 'react';

export const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-front">
          <div className="wrap-footer-logo">
            <div className="footer-logo">
              <p>
                <span>Gaba</span>
              </p>
            </div>
          </div>
          {/*end wrap-footer-logo*/}
          <div className="footer-navigation">
            <h4 className="footer-title">Footer Column 1</h4>
            <ul className="footer-nav-list">
              <li>
                <a href="#">First page</a>
              </li>
              <li>
                <a href="#">Second page</a>
              </li>
              <li>
                <a href="#">Third</a>
              </li>
              <li>
                <a href="#">Fourth</a>
              </li>
            </ul>
          </div>
          {/*end footer-navigation*/}
          <div className="footer-navigation">
            <h4 className="footer-title">Footer Column 2</h4>
            <ul className="footer-nav-list">
              <li>
                <a href="#">Fifth page</a>
              </li>
              <li>
                <a href="#">Sixth page</a>
              </li>
              <li>
                <a href="#">Eighth</a>
              </li>
            </ul>
          </div>
          {/*end footer-navigation*/}
          <div className="footer-navigation">
            <h4 className="footer-title">Footer Column 3</h4>
            <ul className="footer-nav-list">
              <li>
                <a href="#">First page</a>
              </li>
              <li>
                <a href="#">Second page</a>
              </li>
              <li>
                <a href="#">Third</a>
              </li>
            </ul>
          </div>
          {/*end footer-navigation*/}
          <div className="footer-join">
            <h4 className="footer-title">Join GABA</h4>
            <div className="form-join">
              <form action="/" method="post">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email address"
                  />
                  <button className="submit-search">
                    <span className="icons-submit-email">&nbsp;</span>
                  </button>
                </div>
              </form>
            </div>
            <p className="paragraph-join">
              Join our newsletter to stay up to date on features and releases
            </p>
          </div>
          {/*end footer-join*/}
        </div>
        {/*end footer-front*/}
        <div className="footer-bellow">
          <p className="copyright">© 2020 GABA. All rights reserved.</p>
          <ul className="footer-link">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
          <ul className="footer-social">
            <li>
              <a href="#" target="_blank">
                <span className="icons-facebook">&nbsp;</span>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <span className="icons-linkedin">&nbsp;</span>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <span className="icons-twitter">&nbsp;</span>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <span className="icons-pinterest">&nbsp;</span>
              </a>
            </li>
          </ul>
        </div>
        {/*end footer-bellow*/}
      </div>
    </footer>
  );
};
