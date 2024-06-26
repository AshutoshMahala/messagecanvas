import React, { useState } from 'react';
import './ToggleButton.css';

const ToggleButton: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={`toggle-button ${isOn ? 'on' : 'off'}`} onClick={toggle}>
      <div className="toggle-thumb" />
    </div>
  );
};

export default ToggleButton;
