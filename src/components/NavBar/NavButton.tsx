import React from 'react'
import Button from '../common/Button'
import './NavButton.css';

interface NavButtonProps {
    label: React.ReactNode;
    onClick: () => void;
    className: string;
    isSelected: boolean;
}


const NavButton: React.FC<NavButtonProps> = ({label, onClick, className, isSelected}) => {
    return (
        <Button label={label} onClick={onClick} className={`nav-button ${className} ${isSelected? 'selected' : ''}`}/>
    );
};


export default NavButton;