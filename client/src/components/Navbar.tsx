import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import TeacherLogo from "../assets/whitelogo-on-secondary.png";
import StudentLogo from "../assets/blacklogo-on-lightgreen.png";

export default function Navbar() {
  const location = useLocation();
  const breadCrumbs = location.pathname.split("/");
  const page = breadCrumbs[breadCrumbs.length - 1];
  const navigate = useNavigate();

  // Check if the path starts with '/student'
  const isStudentPath = location.pathname.startsWith("/student");

  return (
    <nav id={isStudentPath ? "student-navbar" : "teacher-navbar"}>
      <img
        src={isStudentPath ? StudentLogo : TeacherLogo}
        alt="Increment Logo"
        id="increment-logo"
        onClick={() => (window.location.href = "/")}
        style={{ cursor: "pointer" }}
      />
      <div className="nav-contents">
        {page === "student" ? (
          <p
            onClick={() => {
              navigate("/teacher");
            }}
          >
            Teacher Admin
            <FaArrowRight />
          </p>
        ) : (
          <p onClick={() => (window.location.href = "/student")}>
            Chatbot <FaArrowRight />
          </p>
        )}
      </div>
    </nav>
  );
}
