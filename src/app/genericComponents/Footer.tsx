import React from 'react';
import { gabaMidnight, twitter, In, icon_send_mail } from 'assets/images';

export default function Footer () {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-logo">
            <img src={gabaMidnight} alt="" width="42px" height="20px" />
          </div>
          {/* <div className="footer-nav">
            <div className="nav-item">
              <h4 className="nav-title">Footer Column 1</h4>
              <ul className="nav-list">
                <li>First page</li>
                <li>Second page</li>
                <li>Third page</li>
                <li>Forth page</li>
              </ul>
            </div>
            <div className="nav-item">
              <h4 className="nav-title">Footer Column 2</h4>
              <ul className="nav-list">
                <li>First page</li>
                <li>Second page</li>
                <li>Third page</li>
                <li>Forth page</li>
              </ul>
            </div>
            <div className="nav-item">
              <h4 className="nav-title">Footer Column 3</h4>
              <ul className="nav-list">
                <li>First page</li>
                <li>Second page</li>
                <li>Third page</li>
                <li>Forth page</li>
              </ul>
            </div>
          </div> */}
          <div className="form-send-email">
            <form>
              <h4 className="nav-title">Join GABA</h4>
              <div className="input-group">
                <input
                  placeholder="Enter your email address"
                  className="form-control"
                  type="text"
                />
                <button className="submit-search">
                  <span className="icons-email">
                    <img src={icon_send_mail} alt="" />
                  </span>
                </button>
              </div>

              <p className="join-our-newsletter">
                Join our newsletter to stay up to date on features and releases
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-left">
            <p className="GABA-All-rig">© 2020 GABA. All rights reserved.</p>
            <a href="#" className="privacy-policy">
              Privacy Policy.
            </a>
            <a href="#" className="term">
              Terms of Service
            </a>
          </div>
          <div className="footer-bottom-right">
            <a className="link-twitter" href="https://twitter.com/goGABAco">
              <img className="img-twitter" src={twitter} alt="img" />
            </a>
            <a className="link-In" href="https://www.linkedin.com/company/gogabaco/">
              <img className="img-In" src={In} alt="img" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
