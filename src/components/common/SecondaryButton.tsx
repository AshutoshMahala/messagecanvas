import React from 'react';
import './SecondaryButton.css';

interface SecondaryButtonProps {
  text: string;
  onClick: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, onClick }) => {
  return (
    <button className="secondary-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default SecondaryButton;
