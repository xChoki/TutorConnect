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

// Variable de entorno
axios.defaults.baseURL = import.meta.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

const ROLES = {
  'User': 2001,
  'Tutor': 2002,
  'Teacher': 2003,
  'Admin': 5001
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          {/* Protected routes
           * Tutores, alumnos, profesores y administradores */}
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/portal/cursos" element={<CoursesPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Tutor, ROLES.Teacher, ROLES.Admin]} />}>
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
