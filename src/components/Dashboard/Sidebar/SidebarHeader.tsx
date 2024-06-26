import React from "react";
import './SidebarHeader.css';
import CloseButton from "../../common/CloseButton";


export interface SidebarProps {
    text: string;
    onClose: () => void;
}

const SidebarHeader: React.FC<SidebarProps> = ({text, onClose}) => {
    return (
      <div className="sidebar-header">
        <span className='sidebar-header-text'>{text}</span>
        <div className='header-spacer' />
        <CloseButton onClick={onClose} className='close-sidebar-button'/>
      </div>
    );
};
  
export default SidebarHeader;