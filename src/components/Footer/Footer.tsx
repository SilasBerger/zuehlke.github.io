import './Footer.scss';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import logo from '../../assets/images/logo/logo-zuehlke-big.png'
import {IconName} from '@fortawesome/fontawesome-svg-core';

const Footer = () => {

  const corpPageLinks = [
    {href: "https://www.zuehlke.com/en/our-expertise", text: "Our Expertise"},
    {href: "https://www.zuehlke.com/en/our-projects", text: "Our Projects"},
    {href: "https://www.zuehlke.com/en/insights", text: "Our Insights"},
    {href: "https://www.zuehlke.com/en/about-us", text: "About us"},
    {href: "https://www.zuehlke.com/en/careers", text: "Careers"},
    {href: "https://www.zuehlke.com/en/legal-notice", text: "Legal"},
    {href: "https://www.zuehlke.com/en/privacy-policy", text: "Terms of Use & Data Privacy"}
  ] as { href: string, text: string }[];

  const contactLinks = [
    {href: "https://www.linkedin.com/company/zuehlkegroup/", iconName: "linkedin"},
    {href: "https://www.facebook.com/zuehlke.group", iconName: "facebook-square"},
    {href: "https://twitter.com/zuehlke_group", iconName: "twitter-square"},
    {href: "https://github.com/Zuehlke", iconName: "github"},
    {href: "https://www.instagram.com/zuehlkegroup/?hl=en", iconName: "instagram"},
    {href: "https://www.youtube.com/channel/UCDglr0_rdf7cIakhluxAeBA", iconName: "youtube"}
  ] as { href: string, iconName: IconName }[];

  const createCorpPageLink = (link: { href: string, text: string }) => {
    return (
      <li>
        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
          {link.text}
        </a>
      </li>
    );
  };

  const createContactLink = (link: { href: string, iconName: IconName }) => {
    return (
      <div key={link.href} className="cell">
        <a href={link.href} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={["fab", link.iconName]}/>
        </a>
      </div>
    );
  };

  return (
    <div className="Footer">
      <div className="content">
        <div className="logo">
          <a href="https://www.zuehlke.com/en" target="_blank" rel="noreferrer">
            <img src={logo} alt="Zuehlke logo"/>
          </a>
        </div>

        <div className="links-container">
          <ul className="links-list">
            {corpPageLinks.map((link) => createCorpPageLink(link))}
          </ul>
        </div>

        <div className="contact-block">
          <div className="label">Stay in touch</div>
          <div className="contact-links-container">
            {contactLinks.map((link) => createContactLink(link))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
