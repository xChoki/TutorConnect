import { Route, Routes } from "react-router-dom"
import axios from "axios"

import IndexPage from "./pages/IndexPage"
import Layout from "./components/Layout"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PortalPage from "./pages/PortalPage"
import CoursesPage from "./pages/CoursesPage"
import CoursesFormPage from "./pages/CoursesFormPage"
import CourseInfoPage from "./pages/CourseInfoPage"
import RequireAuth from "./components/RequireAuth"

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          {/* Protected routes
           * Tutores, alumnos, profesores y administradores */}
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/portal/cursos" element={<CoursesPage />} />
        
          {/* Protected routes
           * Tutores y administradores */}
          <Route path="/portal/cursos/nuevo" element={<CoursesFormPage />} />
          <Route path="/portal/cursos/:id" element={<CourseInfoPage />} />
          <Route
            path="/portal/cursos/editar/:id"
            element={<CoursesFormPage />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
