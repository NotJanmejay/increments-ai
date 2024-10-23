import TeacherAdmin from "./page/teacherAdmin";
import StudentChatbot from "./page/studentChatbot";
import { Routes, Route, Link } from "react-router-dom";
import Logo from "./assets/logo-on-green.png";
import "./App.css";

function Home() {
  return (
    <div className="home-container">
      <img src={Logo} alt="increments-logo" />
      <h1>Welcome</h1>
      <p>to the future of learning</p>
      <div className="button-container">
        <Link to="/teacher">
          <button className="nav-button">Teacher</button>
        </Link>
        <Link to="/student">
          <button className="nav-button">Student</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<TeacherAdmin />} path="/teacher" />
        <Route element={<StudentChatbot />} path="/student" />
        <Route element={<p>404, Page not Found</p>} path="*" />
      </Routes>
    </>
  );
}

export default App;
