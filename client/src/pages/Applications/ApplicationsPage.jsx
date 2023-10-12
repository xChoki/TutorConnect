import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import SideBar from "../../components/SideBar"
import axios from "axios"

import useAuth from "../../hooks/useAuth"

import PencilsImage from "../../assets/Pencils.png"

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [open, setOpen] = useState(true)
  const { ready, auth } = useAuth()

  useEffect(() => {
    axios.get("/applications").then(({ data }) => {
      setApplications(data)
    })
  }, [])

  console.log(applications)

  if (!ready) {
    return "Cargando..."
  }

  if (ready && !auth) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className={`${open ? "ml-72" : "ml-20"} pt-6`}>
      <SideBar open={open} setOpen={setOpen} />
      <h1 className="text-5xl p-4">Postulaciones</h1>
      <section className="flex flex-wrap lg-mx-1">
        {applications?.length > 0 &&
          applications.map((application) => (
            <div key={application._id} className="w-96 h-60 p-4 mb-20 mx-5">
              <Link to={"/portal/solicitudes/" + application._id}>
                <div className="max-w-xl rounded overflow-hidden shadow-lg relative">
                  <img
                    className="w-full h-1/2"
                    src={PencilsImage}
                    alt="Background image of some pencils with a yellow background"
                  />

                  <section className="px-6 py-4">
                    <span className="font-bold text-xl mb-2">
                    {application.applicationStudentInfo.map((studentInfo) => (
                        <span key={studentInfo._id}>{studentInfo.studentName}</span>
                      ))}
                    </span>
                    {/* <p className="text-gray-700 text-base">
                      {applications.courseDescription?.length < 28
                        ? applications.courseDescription
                        : width > 500
                        ? applications.courseDescription.slice(0, 28) + "..."
                        : applications.courseDescription.slice(0, 15) + "..."}
                    </p> */}
                  </section>

                  <section className="px-6 pt-4 pb-2">
                    <span
                      to={"/portal/cursos/" + applications._id}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      Ver postulación
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
