import "../styles/studentChatbot.css";
import { GoPaperAirplane } from "react-icons/go";
import React, { Key, KeyboardEvent, ChangeEvent } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaUser, FaRobot } from "react-icons/fa";

interface Message {
    id: Key | null | undefined;
    role: "User" | "AI";
    content: String;
}

function EmptyState() {
    return (
        <div>
            <h1>Welcome to Increments</h1>
            <p style={{ opacity: "70%", marginTop: "10px" }}>
                Increments is an experienced virtual teacher with over a decade of
                expertise in guiding students through their school curriculum. Adopting
                a supportive and engaging teaching style, Increments tailors responses
                based on each student's level of understanding.
                <br />
                <br />
                Through thoughtful questioning and gradual hints, Increments encourages
                learners to think critically and arrive at their own answers, only
                providing direct solutions when necessary. Whether addressing
                foundational concepts or advanced topics, Increments's explanations are
                clear, concise, and aligned with the student's educational needs.
            </p>
        </div>
    );
}

export default function StudentChatbot() {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [loading, isLoading] = React.useState<Boolean>(false);
    const [prompt, setPrompt] = React.useState<String>("");
    const [personas, setPersonas] = React.useState<any>([
        { subject: "Maths" },
        { subject: "Economics" },
    ]);
    const [selectedPersona, setSelectedPersona] = React.useState<any>({});

    const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const userMessage: Message = {
            id: Math.random(),
            role: "User",
            content: prompt,
        };
        if (prompt.trim()) {
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setPrompt("");
        }
        isLoading(true);

        setTimeout(() => {
            const AiMessage: Message = {
                id: Math.random(),
                role: "AI",
                content: "I'm Increments, How may I help you?",
            };
            setMessages((prevMessages) => [...prevMessages, AiMessage]);
            isLoading(false);
        }, 1000);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    return (
        <main style={{ height: "90vh" }}>
            <nav id="chatbot-nav" style={{ marginBottom: "5vh" }}>
                <div style={{ fontWeight: 700 }}>Increments</div>
                <div>MSBC AI Team</div>
            </nav>
            <section id="chatbot-container">
                {Object.keys(selectedPersona).length == 0 && <EmptyState />}
                {messages.map((message) => (
                    <div key={message.id}>
                        {message.role === "User" ? "User: " : "AI: "}
                        {message.content}
                    </div>
                ))}
                {loading && <CgSpinner className="loader" />}

                <form id="chat-input-form" action="">
                    <input
                        name="prompt"
                        type="text"
                        id="chat-input"
                        placeholder="Send a message"
                        value={prompt as any}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                handleSubmit(e);
                                setPrompt("");
                            }
                        }}
                    />
                    <div className="persona-container" style={{ marginRight: "20px" }}>
                        {personas.map((p: any) => (
                            <div
                                key={p.subject}
                                className={`persona-selector ${selectedPersona.subject === p.subject ? "selected" : ""
                                    }`}
                                onClick={() => setSelectedPersona(p)}
                            >
                                {p.subject[0]}
                            </div>
                        ))}
                    </div>
                    <GoPaperAirplane style={{ opacity: "60%", cursor: "pointer" }} />
                </form>
            </section>
        </main>
    );
}
