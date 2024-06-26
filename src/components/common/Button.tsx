import React from 'react';
import './Button.css';


interface ButtonProps {
    label: React.ReactNode;
    onClick: () => void;
    className?: string;
}


const Button: React.FC<ButtonProps> = ({label, onClick, className}) =>{
    return (
    <button className={`base-button ${className}`} onClick={onClick}>
        {label}
    </button>
    );
};

export default Button;