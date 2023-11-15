import { Route, Routes } from "react-router-dom"
import axios from "axios"

import IndexPage from "./pages/IndexPage"
import Layout from "./components/Layout"
import PortalPage from "./pages/PortalPage"

import LoginPage from "./pages/LoginRegister/LoginPage"
import RegisterPage from "./pages/LoginRegister/RegisterPage"

import CoursesPage from "./pages/Courses/CoursesPage"
import CoursesFormPage from "./pages/Courses/CoursesFormPage"
import CourseInfoPage from "./pages/Courses/CourseInfoPage"

import ApplicationsPage from "./pages/Applications/ApplicationsPage"
import ApplicationsFormPage from "./pages/Applications/ApplicationsFormPage"
import ApplicationsInfoPage from "./pages/Applications/ApplicationsInfoPage"

import RequireAuth from "./components/RequireAuth"
import ApplicationsDetailsPage from "./pages/Applications/ApplicationsDetailsPage"
import StudentsCoursePage from "./pages/Students/StudentsCoursePage"

import ConfigurationPage from "./pages/Configuration/ConfigurationPage"
import GraphPage from "./pages/Charts/GraphPage"

// Variable de entorno
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

const ROLES = {
  User: 2001,
  Tutor: 2002,
  Teacher: 2003,
  Admin: 5001,
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
          <Route path="/portal/cursos/registrar" element={<StudentsCoursePage />} />
          <Route path="/portal/cursos/:id" element={<CourseInfoPage />} />
          <Route path="/configuracion" element={<ConfigurationPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Tutor, ROLES.Teacher, ROLES.Admin]} />}>
          {/* Protected routes
           * Tutores y administradores */}
          <Route path="/portal/cursos/nuevo" element={<CoursesFormPage />} />
          <Route path="/portal/cursos/:id" element={<CourseInfoPage />} />
          <Route path="/portal/cursos/editar/:id" element={<CoursesFormPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Admin, ROLES.User]} />}>
          {/* Protected routes
           * Estudiantes, Profesores y administradores */}
          <Route path="/portal/solicitudes/detalles" element={<ApplicationsDetailsPage />} />
          <Route path="/portal/solicitudes/nuevo" element={<ApplicationsFormPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Teacher, ROLES.Admin]} />}>
          {/* Protected routes
           * Profesores y administradores */}
          <Route path="/portal/solicitudes" element={<ApplicationsPage />} />
          <Route path="/portal/solicitudes/:id" element={<ApplicationsInfoPage />} />
          <Route path="/portal/graficos" element={<GraphPage />} />
        </Route>
        <Route path="/*" element={<IndexPage />} />
      </Route>
    </Routes>
  )
}

export default App
