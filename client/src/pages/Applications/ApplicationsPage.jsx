import { useEffect, useState } from "react"
import SideBar from "../../components/Navigation/SideBar"
import axios from "axios"

import ApplicationsCard from "../../components/Cards/ApplicationsCard"
import { useSidebarState } from "../../hooks/useSidebarState"

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [open, setOpen] = useSidebarState()

  useEffect(() => {
    axios.get("/applications").then(({ data }) => {
      setApplications(data)
    })
  }, [])

  const inProcessApplications = applications.filter(
    (application) => application.applicationState === "En proceso"
  )
  const notInProcessApplications = applications.filter(
    (application) => application.applicationState !== "En proceso"
  )

  return (
    <div className={`${open ? "ml-72" : "ml-20"} pt-6`}>
      <SideBar open={open} setOpen={setOpen} />

      <h1 className="text-5xl p-4">Postulaciones</h1>

      <h2 className="text-4xl p-4">Pendientes</h2>

      <section className="flex flex-wrap lg-mx-1">
        {inProcessApplications.length > 0 ? (
          inProcessApplications.map((application) => (
            <div key={application._id} className="w-96 h-60 p-4 mb-20 mx-5">
              <ApplicationsCard application={application} />
            </div>
          ))
        ) : (
          <p className="p-4 mb-10 mx-5">No hay más aplicaciones pendientes.</p>
        )}
      </section>

      <hr />

      <h2 className="text-4xl p-4">Revisadas</h2>

      <section className="flex flex-wrap lg-mx-1">
        {notInProcessApplications.length > 0 ? (
          notInProcessApplications.map((application) => (
            <div key={application._id} className="w-96 h-60 p-4 mb-20 mx-5">
              <ApplicationsCard application={application} />
            </div>
          ))
        ) : (
          <p className="p-4 mb-10 mx-5">No hay aplicaciones revisadas.</p>
        )}
      </section>
    </div>
  )
}
