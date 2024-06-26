import React from 'react';
import './Dropdown.css';

interface DropdownProps {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange, value }) => {
  return (
    <div className="dropdown">
      <select value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
