import "./App.css"
import { Route, Routes } from "react-router-dom"
import { UserContextProvider } from "./UserContext"
import axios from "axios"

import IndexPage from "./pages/IndexPage"
import Layout from "./components/COM_Layout"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PortalPage from "./pages/PortalPage"
import CoursesPage from "./pages/CoursesPage"
import CoursesFormPage from "./pages/CoursesFormPage"
import CourseInfoPage from "./pages/CourseInfoPage"

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/portal/cursos" element={<CoursesPage />} />
          <Route path="/portal/cursos/nuevo" element={<CoursesFormPage />} />
          <Route path="/portal/cursos/:id" element={<CourseInfoPage />} />
          <Route path="/portal/cursos/editar/:id" element={<CoursesFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
