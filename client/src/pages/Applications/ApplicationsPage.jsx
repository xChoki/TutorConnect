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

  // console.log(applications)

  function getApplicationStateColor(applicationState) {
    switch (applicationState) {
      case "En proceso":
        return "bg-yellow-400"
      case "Aceptada":
        return "bg-green-400"
      case "Rechazada":
        return "bg-red-400"
      default:
        return "bg-gray-400" // Default color for other states
    }
  }

  function getTextColor(applicationState) {
    switch (applicationState) {
      case "En proceso":
        return "text-white" // Black text
      case "Aceptada":
        return "text-white"
      case "Rechazada":
        return "text-white" // White text
      default:
        return "text-gray-700" // Default text styles for other states
    }
  }

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

                  <div
                    className={`absolute top-4 right-4 rounded-full ${getApplicationStateColor(
                      application.applicationState
                    )}`}
                  >
                    <span
                      className={`block p-3 w-full h-full text-center text-sm font-bold ${getTextColor(
                        application.applicationState
                      )}`}
                    >
                      {application.applicationState}
                    </span>
                  </div>

                  <section className="px-6 py-4">
                    <span className="font-bold text-xl mb-2">
                      <span>{application.applicationStudentInfo?.studentName}</span>
                    </span>
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
