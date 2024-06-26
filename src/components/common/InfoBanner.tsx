import React from 'react';
import './InfoBanner.css';
import {ReactComponent as BulbIcon} from '../../assests/icons/bulb.svg'

interface InfoBannerProps {
  heading: string;
  content: string;
  learnMoreLink: string;
  learnMoreText: string;
}

const InfoBanner: React.FC<InfoBannerProps> = ({ heading, content, learnMoreLink, learnMoreText }) => {
  return (
    <div className="info-banner">
      <div className="icon">
        <BulbIcon/>
      </div>
      <div className="text">
        <p><strong>{heading}</strong></p>
        <p>{content}</p>
        <a href={learnMoreLink} className="learn-more">{learnMoreText}</a>
      </div>
      <div className="close-button">
        <span role="img" aria-label="close">✖</span>
      </div>
    </div>
  );
};

export default InfoBanner;
