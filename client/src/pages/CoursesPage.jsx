import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { Icon_Plus } from "../assets/Icons/"
import SideBar from "../components/SideBar"
import axios from "axios"

import useAuth from "../hooks/useAuth"

import PencilsImage from "../assets/Pencils.png"
import { validateRoles } from "../scripts/ValidateRoles"

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

  const allowedRoles = [2002, 2003, 5001]

  const ValidateResult = validateRoles({ allowedRoles })
  //console.log("resultado: " + ValidateResult)

  return (
    <div className={`${open ? "ml-72" : "ml-20"} pt-6`}>
      <SideBar open={open} setOpen={setOpen} />

      {ValidateResult ? (
        <section className="m-10">
          <Link
            className="inline-flex py-16 px-20 rounded-lg text-lg border hover:bg-gray-100"
            to={"/portal/cursos/nuevo"}
          >
            <Icon_Plus />
            <span className="pl-2">Agregar curso</span>
          </Link>
        </section>
      ) : (
        false
      )}

      <section className="flex flex-wrap gap-4 px-5">
        {courses.length > 0 &&
          courses.map((course) => (
            <div
              key={course._id}
              className="w-100 h-60 p-4 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-20"
            >
              <Link to={"/portal/cursos/" + course._id}>
                <div className="max-w-xl rounded overflow-hidden shadow-lg relative">
                  <img
                    className="w-full h-1/2"
                    src={PencilsImage}
                    alt="Background image of some pencils with a yellow background"
                  />

                  {course.course_neurodiv ? (
                    <div className="absolute left-0 top-0 h-16 w-16">
                      <p className="absolute transform -rotate-45 bg-gray-600 text-center text-white font-semibold py-1 left-[-34px] top-[32px] w-[170px]">
                        Neurodivergente
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}

                  <section className="px-6 py-4">
                    <span className="font-bold text-xl mb-2">
                      {course.course_name}
                    </span>
                    <p className="text-gray-700 text-base">
                      {course.course_description}
                    </p>
                  </section>

                  <section className="px-6 pt-4 pb-2">
                    <span
                      to={"/portal/cursos/" + course._id}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      Ver detalles
                    </span>
                  </section>
                </div>
              </Link>
            </div>
          ))}
      </section>
    </div>
  )
}
