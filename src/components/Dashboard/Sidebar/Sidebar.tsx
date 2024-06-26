import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { MessagePreview } from '../canvas-utils/types';
import SidebarHeader from './SidebarHeader';
import Content from './ContentSection';
import SecondaryButton from '../../common/SecondaryButton';

interface SidebarProps {
    isVisible: boolean;
    onClose: () => void;
    selectedMessage: MessagePreview | null;
    onUpdateMessage: (message: MessagePreview) => void;
    onDeleteMessage: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose, selectedMessage, onUpdateMessage, onDeleteMessage }) => {
    const [headerText, setHeaderText] = useState<string>('');
    const [bodyText, setBodyText] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | undefined>('');

    useEffect(() => {
        if (selectedMessage && selectedMessage.headerText) {
            setHeaderText(selectedMessage.headerText);
            setBodyText(selectedMessage.bodyText ?? "");
            setImageUrl(selectedMessage.imageUrl);
        }
    }, [selectedMessage]);

    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeaderText(e.target.value);
    };

    const handleBodyTextChange =  (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBodyText(e.target.value);
    };

    const handleUploadClick = (url: string) => {
        setImageUrl(url);
    }

    const onSave = () => {
        if (selectedMessage) {
            onUpdateMessage({ ...selectedMessage, imageUrl: imageUrl, bodyText: bodyText, headerText: headerText});
        }
    }

    const onDelete = () => {
        const id: number | undefined= selectedMessage?.id;
        onClose();
        if (id) {
            onDeleteMessage(id);
        }
    }

    return (
        <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
            <SidebarHeader text='Edit Message' onClose={onClose} />
            {selectedMessage && (
                <div>
                    <label>
                        Main Heading:
                        <input
                            type="text"
                            value={headerText}
                            onChange={handleHeaderChange}
                        />
                    </label>
                </div>
            )}
            <Content message={bodyText} handleUploadClick={handleUploadClick} handleMessageChange={handleBodyTextChange}/>
            <SecondaryButton text='Save' onClick={onSave}/>
            <SecondaryButton text='Delete' onClick={onDelete}/>
        </div>
    );
};

export default Sidebar;
