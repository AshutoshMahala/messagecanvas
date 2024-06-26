// import React, { useState } from 'react';
// import DashboardHeader from './DashboardHeader';
// import Canvas from './Canvas';
// import Sidebar from './Sidebar/Sidebar';
// import { MessagePreview } from './canvas-utils/types';
// import './Dashboard.css';

// const Dashboard: React.FC = () => {
//     const [isSidebarVisible, setSidebarVisible] = useState(false);
//     const [selectedMessage, setSelectedMessage] = useState<MessagePreview | null>(null);
//     const [messagePreviews, setMessagePreviews] = useState<MessagePreview[]>([]);

//     const handleCardSelect = (message: MessagePreview) => {
//         setSelectedMessage(message);
//         setSidebarVisible(true);
//     };

//     const handleSidebarClose = () => {
//         setSidebarVisible(false);
//         setSelectedMessage(null);
//     };

//     const handleUpdateMessage = (updatedMessage: MessagePreview) => {
//         setMessagePreviews((prev) =>
//             prev.map((message) =>
//                 message.id === updatedMessage.id ? updatedMessage : message
//             )
//         );
//         if (selectedMessage && selectedMessage.id === updatedMessage.id) {
//             setSelectedMessage(updatedMessage);
//         }
//     };

//     const handleDeleteMessagePreview = (id: number) => {
//         setMessagePreviews(prevPreviews => prevPreviews.filter(preview => preview.id !== id));
//     };

//     return (
//         <div className="dash-container">
//             <DashboardHeader />
//             <div className="dashboard-content">
//                 <Canvas onCardSelect={handleCardSelect} messagePreviews={messagePreviews} setMessagePreviews={setMessagePreviews}/>
//                 <Sidebar
//                     isVisible={isSidebarVisible}
//                     onClose={handleSidebarClose}
//                     selectedMessage={selectedMessage}
//                     onUpdateMessage={handleUpdateMessage}
//                     onDeleteMessage={handleDeleteMessagePreview}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import Canvas from './Canvas';
import Sidebar from './Sidebar/Sidebar';
import axios from '../../mockApi';
import { MessagePreview } from './canvas-utils/types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<MessagePreview | null>(null);
    const [messagePreviews, setMessagePreviews] = useState<MessagePreview[]>([]);

    useEffect(() => {
        // Fetch initial messages
        axios.get('/api/messages').then(response => {
            setMessagePreviews(response.data);
        });
    }, []);

    const handleCardSelect = (message: MessagePreview) => {
        setSelectedMessage(message);
        setSidebarVisible(true);
    };

    const handleSidebarClose = () => {
        setSidebarVisible(false);
        setSelectedMessage(null);
    };

    const handleUpdateMessage = (updatedMessage: MessagePreview) => {
        axios.put(`/api/messages/${updatedMessage.id}`, updatedMessage).then(response => {
            setMessagePreviews((prev) =>
                prev.map((message) =>
                    message.id === updatedMessage.id ? response.data : message
                )
            );
            if (selectedMessage && selectedMessage.id === updatedMessage.id) {
                setSelectedMessage(response.data);
            }
        });
    };

    const handleAddMessage = () => {
        const newMessage: MessagePreview = {
            id: Date.now(),
            x: Math.random() * (window.innerWidth - 220),
            y: Math.random() * (window.innerHeight - 170),
            width: 304,
            height: 422,
            headerText: 'New Message',
            bodyText: `We have an exciting offer. Are you interested in hearing more?`,
            imageUrl: 'https://via.placeholder.com/200',
            footerText: 'Reply "STOP" to opt out',
            contactUsText: 'Talk to a styling expert'
        };
        axios.post('/api/messages', newMessage).then(response => {
            setMessagePreviews((prev) => [...prev, response.data]);
        });
    };

    const handleDeleteMessagePreview = (id: number) => {
        axios.delete(`/api/messages/${id}`).then(() => {
            setMessagePreviews(prevPreviews => prevPreviews.filter(preview => preview.id !== id));
        });
    };

    return (
        <div className="dash-container">
            <DashboardHeader />
            <div className="dashboard-content">
                <Canvas onCardSelect={handleCardSelect} messagePreviews={messagePreviews} setMessagePreviews={setMessagePreviews} handleAddMessage={handleAddMessage}/>
                <Sidebar
                    isVisible={isSidebarVisible}
                    onClose={handleSidebarClose}
                    selectedMessage={selectedMessage}
                    onUpdateMessage={handleUpdateMessage}
                    onDeleteMessage={handleDeleteMessagePreview}
                />
            </div>
        </div>
    );
};

export default Dashboard;
