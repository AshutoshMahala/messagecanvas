import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MessagePreview } from './components/Dashboard/canvas-utils/types';

// Initialize the mock adapter
const mock = new MockAdapter(axios);

const logRequest = (type: string, url: string, data?: any) => {
    console.log(`[Mock ${type} Request] URL: ${url}`, data ? `Data: ${JSON.stringify(data)}` : '');
};

// Sample data for MessagePreviews
const messagePreviews: MessagePreview[] = [
  {
    id: 1,
    x: 400,
    y: 150,
    width: 304,
    height: 422,
    headerText: 'Message 1',
    bodyText: 'This is the first message.',
    imageUrl: 'https://via.placeholder.com/200',
    footerText: 'Reply "STOP" to opt out',
    contactUsText: 'Talk to a styling expert'
  },
  {
    id: 2,
    x: 800,
    y: 350,
    width: 304,
    height: 422,
    headerText: 'Message Example',
    bodyText: 'We have an exciting offer. Are you interested in hearing more?',
    imageUrl: 'https://via.placeholder.com/200',
    footerText: 'Reply "STOP" to opt out',
    contactUsText: 'Talk to a styling expert'
  },
];

// Mock GET request to fetch all messages
mock.onGet('/api/messages').reply((config) => {
    logRequest('GET', config.url!);
    return [200, messagePreviews];
});

// Mock POST request to add a new message
mock.onPost('/api/messages').reply((config) => {
    const newMessage = JSON.parse(config.data) as MessagePreview;
    newMessage.id = Date.now();
    messagePreviews.push(newMessage);
    logRequest('POST', config.url!, newMessage);
    return [200, newMessage];
});

// Mock PUT request to update an existing message
mock.onPut(/\/api\/messages\/\d+/).reply((config) => {
    const updatedMessage = JSON.parse(config.data) as MessagePreview;
    const index = messagePreviews.findIndex(m => m.id === updatedMessage.id);
    if (index !== -1) {
        messagePreviews[index] = updatedMessage;
        logRequest('PUT', config.url!, updatedMessage);
        return [200, updatedMessage];
    }
    return [404];
});

// Mock DELETE request to delete a message
mock.onDelete(/\/api\/messages\/\d+/).reply((config) => {
    const id = parseInt(config.url!.split('/').pop()!, 10);
    const index = messagePreviews.findIndex(m => m.id === id);
    if (index !== -1) {
        messagePreviews.splice(index, 1);
        logRequest('DELETE', config.url!);
        return [200];
    }
    return [404];
});

export default axios;
