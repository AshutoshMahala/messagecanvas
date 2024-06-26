import React from 'react';
import './InfoCard.css';
import ToggleButton from './ToggleButton';
import {ReactComponent as InfoIcon} from '../../assests/icons/info.svg';

interface InfoCardProps {
  headingText: string;
  displayToggle?: boolean;
  children?: React.ReactNode;
  cardIcon?: React.ReactNode;
  infoIconText?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ cardIcon, headingText, infoIconText, children, displayToggle = false }) => {
    return (
    <div className="info-card">
      <div className="header">
        <div className="header-title">
          {cardIcon && <span role="img" aria-label="image">{cardIcon}</span>} {headingText}
          <span className="info-icon" role="img" aria-label="info"><InfoIcon/></span>
        </div>
        {displayToggle && <ToggleButton />}
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
