// b/ChatPage.tsx

import React, { useState } from 'react';
import './ChatPage.css'; // Create this CSS file for styles

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState('');

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { sender: 'user', text: input }]);
            setInput('');
            // Simulate a bot response
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: 'This is a bot response.' }]);
            }, 1000);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-window">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSend} className="chat-input-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="chat-input"
                        required
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
