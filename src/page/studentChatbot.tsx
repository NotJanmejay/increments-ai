import "../styles/studentChatbot.css"

function EmptyState() {
    return <><h1>Welcome to Kumar Bot</h1>
        <p style={{ opacity: "70%" }}>Kumar Bot is an experienced virtual teacher with over a decade of expertise in guiding students through their school curriculum.
            Adopting a supportive and engaging teaching style, Kumar Bot tailors responses based on each student's level of understanding.
            <br /><br />
            Through thoughtful questioning and gradual hints, Kumar Bot encourages learners to think critically and arrive at their own answers,
            only providing direct solutions when necessary. Whether addressing foundational concepts or advanced topics, Kumar Bot's explanations
            are clear, concise, and aligned with the student's educational needs.</p>
    </>
}

export default function StudentChatbot() {

    return <main style={{ height: "100vh" }}>
        <nav id="chatbot-nav">
            <div>Kumar Bot</div>
            <div>MSBC AI Team</div>
        </nav>
        <section id="chatbot-container">
            <EmptyState />
            <input type="text" id="chat-input" placeholder="Send a message" />
        </section>
    </main>
}