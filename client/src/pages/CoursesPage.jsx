import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Link, Navigate } from "react-router-dom"
import { Icon_Plus } from "../assets/Icons/"
import COM_Side_Bar from "../components/COM_Side_Bar"
import axios from "axios"

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [open, setOpen] = useState(true)
  const { ready, user } = useContext(UserContext)

  if (!ready) {
    return "Cargando..."
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />
  }

  useEffect(() => {
    axios.get("/cursos").then(({ data }) => {
      setCourses(data)
    })
  }, [])

  return (
    <div className={`${open ? "ml-72" : "ml-20"} pt-6`}>
      <COM_Side_Bar open={open} setOpen={setOpen} />

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
