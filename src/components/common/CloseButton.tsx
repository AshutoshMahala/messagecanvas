import React from "react";
import Button from "./Button";
import {ReactComponent as XIcon} from '../../assests/icons/x-button.svg'
import './CloseButton.css'

interface CloseButtonProps {
    onClick: () => void;
    className?: string;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = '' }) => {
    return (
        <Button label={<XIcon/>} className={`close-button ${className}`} onClick={onClick}/>
    );
};

export default CloseButton;