import AddStudentComponent from "../components/addStudent";
import StudentManager from "../components/studentManager";
import UploadDocument from "../components/uploadDocument";
import AddTeacherPersona from "../components/addTeacherPersona";
import TeacherPersonaManager from "../components/TeacherPersonaManager";
import "../styles/TeacherAdmin.css";
import React from "react";
import Navbar from "../components/Navbar";
import { HOST } from "../../config";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

function TeacherAdmin() {
  const [currentSection, setCurrentSection] =
    React.useState<string>("add-student");
  const [students, setStudents] = React.useState<any>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (localStorage.getItem("window") == "upload-documents") {
      setCurrentSection("upload-documents");
    } else if (localStorage.getItem("window") == "add-student") {
      setCurrentSection("add-student");
    } else if (localStorage.getItem("window") == "student-manager") {
      setCurrentSection("student-manager");
    } else if (localStorage.getItem("window") == "teacher-persona") {
      setCurrentSection("teacher-persona");
    } else if (localStorage.getItem("window") == "teacher-persona-manager") {
      setCurrentSection("teacher-persona-manager");
    }

    fetch(`${HOST}/v1/students/all/`)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const mobileNavbarVariant = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <main id="teacher-page">
      <Navbar />
      <div className="menu-btn" onClick={() => setIsMobileMenuOpen((p) => !p)}>
        {isMobileMenuOpen ? (
          <RxCross2 size={20} />
        ) : (
          <GiHamburgerMenu size={20} />
        )}
      </div>
      <motion.div
        id="student-chatbot-mobile-helper"
        animate={isMobileMenuOpen ? "visible" : "hidden"}
        key="animate-on-toggle"
        initial={false}
        variants={mobileNavbarVariant}
      >
        <h1>Increments AI</h1>
        <p
          className={currentSection === "add-student" ? "selected" : ""}
          onClick={() => {
            localStorage.setItem("window", "add-student");
            setCurrentSection("add-student");
            setIsMobileMenuOpen(false);
          }}
        >
          Add Students
        </p>
        <p
          className={currentSection === "upload-documents" ? "selected" : ""}
          onClick={() => {
            localStorage.setItem("window", "upload-documents");
            setCurrentSection("upload-documents");
            setIsMobileMenuOpen(false);
          }}
        >
          Upload Documents
        </p>
        <p
          className={currentSection === "student-manager" ? "selected" : ""}
          onClick={() => {
            localStorage.setItem("window", "student-manager");
            setCurrentSection("student-manager");
            setIsMobileMenuOpen(false);
          }}
        >
          Student Manager
        </p>
        <p
          className={currentSection === "teacher-persona" ? "selected" : ""}
          onClick={() => {
            localStorage.setItem("window", "teacher-persona");
            setCurrentSection("teacher-persona");
            setIsMobileMenuOpen(false);
          }}
        >
          Add Teacher Persona
        </p>
        <p
          className={
            currentSection === "teacher-persona-manager" ? "selected" : ""
          }
          onClick={() => {
            localStorage.setItem("window", "teacher-persona-manager");
            setCurrentSection("teacher-persona-manager");
            setIsMobileMenuOpen(false);
          }}
        >
          Teacher Persona Manager
        </p>
        <button onClick={() => (window.location.href = "/student")}>
          Chatbot <FaArrowRight />
        </button>
      </motion.div>
      <section className="teacher-admin-container">
        <div id="left-pane">
          <h1>Teacher Portal</h1>
          <p
            className={currentSection === "add-student" ? "selected" : ""}
            onClick={() => {
              localStorage.setItem("window", "add-student");
              setCurrentSection("add-student");
            }}
          >
            Add Students
          </p>
          <p
            className={currentSection === "upload-documents" ? "selected" : ""}
            onClick={() => {
              localStorage.setItem("window", "upload-documents");
              setCurrentSection("upload-documents");
            }}
          >
            Upload Documents
          </p>
          <p
            className={currentSection === "student-manager" ? "selected" : ""}
            onClick={() => {
              localStorage.setItem("window", "student-manager");
              setCurrentSection("student-manager");
            }}
          >
            Student Manager
          </p>
          <p
            className={currentSection === "teacher-persona" ? "selected" : ""}
            onClick={() => {
              localStorage.setItem("window", "teacher-persona");
              setCurrentSection("teacher-persona");
            }}
          >
            Add Teacher Persona
          </p>
          <p
            className={
              currentSection === "teacher-persona-manager" ? "selected" : ""
            }
            onClick={() => {
              localStorage.setItem("window", "teacher-persona-manager");
              setCurrentSection("teacher-persona-manager");
            }}
          >
            Teacher Persona Manager
          </p>
        </div>
        <div id="right-pane">
          {currentSection === "add-student" && (
            <AddStudentComponent setStudents={setStudents} />
          )}
          {currentSection === "upload-documents" && <UploadDocument />}
          {currentSection === "student-manager" && (
            <StudentManager students={students} setStudents={setStudents} />
          )}
          {currentSection === "teacher-persona" && <AddTeacherPersona />}
          {currentSection === "teacher-persona-manager" && (
            <TeacherPersonaManager />
          )}
        </div>
      </section>
    </main>
  );
}

export default TeacherAdmin;
