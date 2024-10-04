import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentLogin from '../components/StudentLogin'; // Adjust path as necessary
import ChatPage from '../components/ChatPage'; // Import the new ChatPage component

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<StudentLogin />} />
                    <Route path="/chat" element={<ChatPage />} /> {/* Route to ChatPage */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
