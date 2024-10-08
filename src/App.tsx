import TeacherAdmin from "./page/teacherAdmin"
import StudentChatbot from "./page/studentChatbot"
import LogIn from "./page/LogIn"
// import StudentLogin from "./page/StudentLogin"
import { Routes, Route } from "react-router-dom"

function Home() {
  return <p>Hello Darkness, My Old Friend</p>
}

function App() {
  return <Routes>
    <Route Component={Home} path="/" />
    <Route Component={TeacherAdmin} path="/teacher" />
    <Route Component={StudentChatbot} path="/student" />
    <Route Component={LogIn} path="/login" />
    {/* <Route Component={StudentLogin} path="/login" /> */}
  </Routes>
}

export default App
