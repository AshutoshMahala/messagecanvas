import React from 'react';
import './MessageCard.css';
import InfoBanner from '../../common/InfoBanner';
import {ReactComponent as InfoIcon} from '../../../assests/icons/info.svg';
import {ReactComponent as TTIcon} from '../../../assests/icons/TT.svg';

interface MessageCardProps {
  headingText: string;
  isRequired: boolean;
  message?: string;
  onMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddVariable: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ headingText, isRequired, message = '', onMessageChange, onAddVariable }) => {
  return (
    <div className="message-card">
      <div className="header">
        <div className="header-title">
          <span role="img" aria-label="text"><TTIcon/></span> {headingText}
          {isRequired && <span className="required-badge">REQUIRED</span>}
          <span className="info-icon" role="img" aria-label="info"><InfoIcon/></span>
        </div>
      </div>
      <textarea
        className="message-textarea"
        value={message}
        onChange={onMessageChange}
        maxLength={1024}
      />
      <div className="add-variable-section">
        <button className="add-variable-button" onClick={onAddVariable}>ADD VARIABLE</button>
        <span className="message-length">{message.length}/1024</span>
      </div>
      <InfoBanner 
        heading="What are variables?"
        content="Variables are dynamic content that help personalize your campaign, for example: customer names or coupon codes."
        learnMoreLink="#"
        learnMoreText="Learn More"
      />
    </div>
  );
};

export default MessageCard;
