import "../styles/studentChatbot.css";
import { GoPaperAirplane } from "react-icons/go";
import React, { Key, KeyboardEvent, ChangeEvent } from "react";
import { CgSpinner } from "react-icons/cg";
import Navbar from "../components/Navbar";
import RenderMarkdown from "../components/RenderMarkdown";
import { MathJaxContext } from "better-react-mathjax";

interface Message {
  id: Key | null | undefined;
  role: "User" | "AI" | "System";
  content?: string; // Make content optional for the loading state
}

function EmptyState() {
  return (
    <div className="empty-state">
      <h1>Welcome to Increments</h1>
      <p style={{ marginTop: "1rem" }}>
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
  const [_, setLoading] = React.useState<boolean>(false);
  const [prompt, setPrompt] = React.useState<string>("");
  const [personas, setPersonas] = React.useState<any>([]);
  const [selectedPersona, setSelectedPersona] = React.useState<any>({});
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    fetch("http://localhost:8000/api/teachers/all")
      .then((res) => res.json())
      .then((data) => {
        setPersonas(data);
      });
  }, []);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  ``;
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

    setLoading(true);
    const loadingMessage: Message = {
      id: Math.random(),
      role: "AI", // Placeholder AI message for the loading spinner
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    fetch("http://localhost:8000/api/students/query/", {
      method: "POST",
      body: JSON.stringify({
        messages: messages.slice(0, messages.length - 1),
        prompt: prompt,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const LLMResponse: Message = {
          id: Math.random(),
          role: "AI",
          content: data.response,
        };
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.role === "AI" && !msg.content ? LLMResponse : msg
          )
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //@ts-ignore
  const handleSwitchPersona = (p) => {
    setSelectedPersona(p);
    const systemPrompt: Message = {
      id: Math.random(),
      role: "System",
      content: p.prompt,
    };
    const greetingMessage: Message = {
      id: Math.random(),
      role: "AI",
      content: p.greetings,
    };
    setMessages([systemPrompt, greetingMessage]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <main className="chatbot-page">
      <Navbar />
      <section id="chatbot-container" ref={chatContainerRef}>
        {Object.keys(selectedPersona).length === 0 && <EmptyState />}
        <MathJaxContext config={{ loader: { load: ["input/asciimath"] } }}>
          {messages.map(
            (message) =>
              message.role !== "System" && (
                <div
                  key={message.id}
                  style={{
                    fontSize: "15px",
                  }}
                >
                  {message.role === "AI" ? (
                    <div className="ai-message">
                      <div className="persona-selector">
                        {selectedPersona.subject[0]}
                      </div>
                      <div className="ai-message-content">
                        {message.content ? (
                          <RenderMarkdown>{message.content}</RenderMarkdown>
                        ) : (
                          <CgSpinner className="loader" />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="user-message">{message.content}</div>
                  )}
                </div>
              )
          )}
        </MathJaxContext>

        <form id="chat-input-form" action="">
          <input
            name="prompt"
            type="text"
            id="chat-input"
            placeholder={
              Object.keys(selectedPersona).length === 0
                ? "Please select a persona first"
                : "Send a message"
            }
            value={prompt as any}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                Object.keys(selectedPersona).length !== 0
              ) {
                handleSubmit(e);
                setPrompt("");
              }
            }}
            disabled={Object.keys(selectedPersona).length === 0} // Disable when no persona is selected
            style={{
              cursor:
                Object.keys(selectedPersona).length === 0
                  ? "not-allowed"
                  : "text",
            }}
          />
          <div className="persona-container" style={{ marginRight: "20px" }}>
            {personas.map((p: any) => (
              <div
                key={p.subject}
                title={p.subject}
                className={`persona-selector static ${
                  selectedPersona.subject === p.subject ? "selected" : ""
                }`}
                onClick={() => handleSwitchPersona(p)}
              >
                {p.subject[0]}
              </div>
            ))}
          </div>
          <GoPaperAirplane id="send-icon" />
        </form>
      </section>
    </main>
  );
}
