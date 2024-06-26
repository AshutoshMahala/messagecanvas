import React from "react";
import './SectionHeading.css';


export interface SectionHeadingProps {
    text: string;
    className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({text, className = ''}) => {
    return (
      <div className="section-heading">
        <span className={`section-heading-text ${className}`}>{text}</span>
      </div>
    );
};
  
export default SectionHeading;