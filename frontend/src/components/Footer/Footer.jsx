import React from "react";
import "./footer.css";
import githubIcon from "./img/github-brands.svg";
import linkedinIcon from "./img/linkedin-brands.svg";
import twitterIcon from "./img/twitter-brands.svg";

function Footer() {
  return (
    <div>
      <footer className="footer">
        <hr style={{ marginBottom: "7px" }} />
        <h2>Made with 💗 by Rishabh</h2>
        <div className="icons">
          <a
            href="https://github.com/rishverse"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icon" src={githubIcon} alt="githubIcon" />
          </a>
          <a
            href="https://www.linkedin.com/in/rishverse/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icon" src={linkedinIcon} alt="linkedinIcon" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icon" src={twitterIcon} alt="twitterIcon" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
