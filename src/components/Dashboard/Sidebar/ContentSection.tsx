import React, { useState } from "react";
import SectionHeading from "./SectionHeading";
import './ContentSection.css'
import SecondaryButton from "../../common/SecondaryButton";
import InfoBanner from "../../common/InfoBanner";
import InfoCard from "../../common/InfoCard";
import Dropdown from "../../common/Dropdown";
import { ReactComponent as PhotoFrameIcon } from "../../../assests/icons/photoframe.svg";
import MessageCard from "./MessageCard";

export interface ContentSectionProps {
    handleUploadClick: (url: string) => void;
    handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    message: string;
}

export const Content: React.FC<ContentSectionProps> = ({message, handleUploadClick, handleMessageChange}) => {
    const [dropdownValue, setDropdownValue] = useState('Image');
    
    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDropdownValue(event.target.value);
    };
    
    const handleAddVariable = () => {
        alert('Add Variable button clicked!');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const url = URL.createObjectURL(file);
          handleUploadClick(url);
        //   setImageUrl(url);
        }
    };

    return (
        <div className="content-container">
            <SectionHeading text='Content'/>
            <InfoCard headingText="Header" displayToggle cardIcon={<PhotoFrameIcon/>}>
                <div className="dropdown">
                <Dropdown 
                    options={['Image']} 
                    value={dropdownValue} 
                    onChange={handleDropdownChange}
                />
                <p>Image size recommendation: 800 x 418 pixel.</p>
                </div>
                {/* <SecondaryButton text="UPLOAD IMAGE" onClick={handleFileChange} /> */}
                <input className="secondary-button" type="file" onChange={handleFileChange} />
                <InfoBanner 
                    heading="Image header tips"
                    content="Images can enrich the message experience and help maintain engagement. Use eye-catching images that summarize the message (eg discounts, gifts etc.)"
                    learnMoreLink="#"
                    learnMoreText="Learn More"
                />
            </InfoCard>
            <MessageCard 
                headingText="Body message"
                isRequired={true}
                message={message}
                onMessageChange={handleMessageChange}
                onAddVariable={handleAddVariable}
            />
        </div>
    );
};

export default Content;