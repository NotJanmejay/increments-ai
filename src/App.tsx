import TeacherAdmin from "./page/teacherAdmin"
import StudentChatbot from "./page/studentChatbot"
import { Routes, Route } from "react-router-dom"

function Home() {
  return <p>Hello Darkness, My Old Friend</p>
}

function App() {
  return <Routes>
    <Route Component={Home} path="/" />
    <Route Component={TeacherAdmin} path="/teacher" />
    <Route Component={StudentChatbot} path="/student" />
  </Routes>
}

export default App
