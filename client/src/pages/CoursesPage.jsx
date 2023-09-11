import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon_Plus } from "../assets/Icons/"
import COM_Side_Bar from "../components/COM_Side_Bar"
import axios from "axios"

export default function CoursesPage() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios.get("/cursos").then(({ data }) => {
      setCourses(data)
    })
  }, [])

  return (
    <>
      <div className="ml-72 mt-5 h-screen">
        <COM_Side_Bar />

        <section className="text-center">
          <Link
            className="inline-flex py-16 px-20 w-max rounded-lg text-lg border hover:bg-gray-100"
            to={"/portal/cursos/nuevo"}
          >
            <Icon_Plus />
            <span className="pl-2">Agregar curso</span>
          </Link>
        </section>

        <section className="mt-10 ml-2">
          {courses.length > 0 &&
            courses.map((courses) => (
              <Link
                to={"/portal/cursos/" + courses._id}
                className="bg-gray-300 border rounded-lg border-gray-200"
                key={courses._id}
              >
                <p>
                  <span className="font-medium">Nombre de tutor: </span>
                  {courses.course_tutor_name}
                </p>
                <p>
                  <span className="font-medium">Nombre de curso: </span>
                  {courses.course_name}
                </p>
                <p>
                  <span className="font-medium">
                    Capacitación estudiantes neurodivergentes:{" "}
                  </span>
                  {courses.course_neurodiv ? "Si" : "No"}
                </p>
              </Link>
            ))}
        </section>
      </div>
    </>
  )
}
