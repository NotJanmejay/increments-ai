import React, { useState } from 'react';
import '../styles/LoginStyle.css';

const StudentLogin: React.FC = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Logging in with:', credentials);
        alert('Login successful!');
    };

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div>
            {/* Header Section */}
            <header id="login-header">
                <div className="msbc-ai">MSBC AI Division</div>
            </header>

            {/* Login Form Section */}
            <div className="login-container" >
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Student Login</h2>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="options-container">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleCheckboxChange}
                            />
                            Remember me
                        </label>
                        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
