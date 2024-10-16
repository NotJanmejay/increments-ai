import AddStudentComponent from "../components/addStudent";
import StudentManager from "../components/studentManager";
import UploadDocument from "../components/uploadDocument";
import AddTeacherPersona from "../components/addTeacherPersona";
import TeacherPersonaManager from "../components/TeacherPersonaManager";
import "../styles/TeacherAdmin.css";
import React from "react";
import Navbar from "../components/Navbar";

function TeacherAdmin() {
  const [currentSection, setCurrentSection] =
    React.useState<string>("add-student");
  const [students, setStudents] = React.useState<any>([]);

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

    fetch("http://localhost:8000/api/students/all")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <main id="teacher-page">
      <Navbar />
      <section className="teacher-admin-container">
        <div id="left-pane">
          <h1>Teacher Portal</h1>
          <p
            onClick={() => {
              localStorage.setItem("window", "add-student");
              setCurrentSection("add-student");
            }}
          >
            Add Students
          </p>
          <p
            onClick={() => {
              localStorage.setItem("window", "upload-documents");
              setCurrentSection("upload-documents");
            }}
          >
            Upload Documents
          </p>
          <p
            onClick={() => {
              localStorage.setItem("window", "student-manager");
              setCurrentSection("student-manager");
            }}
          >
            Student Manager
          </p>
          <p
            onClick={() => {
              localStorage.setItem("window", "teacher-persona");
              setCurrentSection("teacher-persona");
            }}
          >
            Add Teacher Persona
          </p>
          <p
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
