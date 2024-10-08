import AddStudentComponent from "../components/addStudent"
import StudentManager from "../components/studentManager"
import UploadDocument from "../components/uploadDocument"
import AddTeacherPersona from "../components/addTeacherPersona"
import "../styles/TeacherAdmin.css"
import React from 'react'

function TeacherAdmin() {
  const [currentSection, setCurrentSection] = React.useState<String>("add-student")
  const [students, setStudents] = React.useState<any>([])

  React.useEffect(() => {
    fetch("http://localhost:8000/api/students/all").then(res => res.json()).then(data => setStudents(data))
  }, [])

  return (
    <main>
      <nav id="teacher-nav">
        <span className='msbc-ai'>MSBC AI Division</span>
        <div>Dashboard</div>
        <div>Personas</div>
      </nav>
      <section>
        <div id="left-pane">
          <h1>Teacher Portal</h1>
          <p onClick={() => setCurrentSection("add-student")}>Add Students</p>
          <p onClick={() => setCurrentSection("upload-documents")}>Upload Documents</p>
          <p onClick={() => setCurrentSection("student-manager")}>Student Manager</p>
          <p onClick={() => setCurrentSection("teacher-persona")}>Add Teacher Persona</p>
        </div>
        <div id="right-pane">
          {
            currentSection == "add-student" && <AddStudentComponent setStudents={setStudents} />
          }
          {
            currentSection == "upload-documents" && <UploadDocument />
          }
          {
            currentSection == "student-manager" && <StudentManager setStudents={setStudents} students={students} />
          }
          {
            currentSection == "teacher-persona" && <AddTeacherPersona />
          }


        </div>
      </section>
    </main>
  )
}

export default TeacherAdmin;
