import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { Icon_Plus } from "../assets/Icons/"
import SideBar from "../components/SideBar"
import axios from "axios"

import useAuth from "../hooks/useAuth"

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [open, setOpen] = useState(true)
  const { ready, auth } = useAuth()

  useEffect(() => {
    axios.get("/cursos").then(({ data }) => {
      if (Array.isArray(data)) {
        setCourses(data)
      } else {
        console.error("API response is not an array:", data)
      }
    })
  }, [])

  if (!ready) {
    return "Cargando..."
  }

  if (ready && !auth) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className={`${open ? "ml-72" : "ml-20"} pt-6`}>
      <SideBar open={open} setOpen={setOpen} />

      <section className="m-10">
        <Link
          className="inline-flex py-16 px-20 rounded-lg text-lg border hover:bg-gray-100"
          to={"/portal/cursos/nuevo"}
        >
          <Icon_Plus />
          <span className="pl-2">Agregar curso</span>
        </Link>
      </section>

      <section className={`flex grid-cols-3 gap-4 px-5`}>
        {courses.length > 0 &&
          courses.map((course) => (
            <Link
              key={course._id}
              to={"/portal/cursos/" + course._id}
              className="bg-white border rounded-lg border-gray-200 py-7 px-7 max-w-md"
            >
              <p>
                <span className="font-medium">Nombre de tutor: </span>
                {course.course_tutor_name}
              </p>
              <p>
                <span className="font-medium">Nombre de curso: </span>
                {course.course_name}
              </p>
              <p>
                <span className="font-medium">
                  Capacitación estudiantes neurodivergentes:{" "}
                </span>
                {course.course_neurodiv ? "Si" : "No"}
              </p>
              <p
                to={"/portal/cursos/" + course._id}
                className="mt-2 inline-block text-blue-500 hover:underline"
              >
                Ver detalles
              </p>
            </Link>
          ))}
      </section>
    </div>
  )
}
