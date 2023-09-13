import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon_Plus } from "../assets/Icons/"
import COM_Side_Bar from "../components/COM_Side_Bar"
import axios from "axios"


export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [open, setOpen] = useState(true);

  useEffect(() => {
    axios.get("/cursos").then(({ data }) => {
      setCourses(data)
    })
  }, [])
  return (
    <div className="grid grid-cols-[auto,1fr]">
      <COM_Side_Bar open={open} setOpen={setOpen} />
  
      <section
        className={`${
          open ? "ml-72" : "ml-20"
        } `}
      >
        <Link
          className="inline-flex py-16 px-20 w-max rounded-lg text-lg border hover:bg-gray-100"
          to={"/portal/cursos/nuevo"}
        >
          <Icon_Plus />
          <span className="pl-2">Agregar curso</span>
        </Link>
      </section>
  
      <section
        className={`${
          open ? "ml-72" : "ml-20"
        } grid grid-cols-1 gap-4`}
      >
        {courses.length > 0 &&
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-white border rounded-lg border-gray-200 py-7 px-7"
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
              <Link
                to={"/portal/cursos/" + course._id}
                className="mt-2 inline-block text-blue-500 hover:underline"
              >
                Ver detalles
              </Link>
            </div>
          ))}
      </section>
    </div>
  );
  
}
