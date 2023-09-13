import React, { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom"

import COM_Side_Bar from "../components/COM_Side_Bar"

export default function PortalPage() {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setUser } = useContext(UserContext)

  let { subpage } = useParams()

  if (subpage === undefined) {
    subpage = "portal"
  }

  if (!ready) {
    return "Cargando..."
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <>
      <div className="ml-72 mt-5 h-screen">
        <COM_Side_Bar />

        <section className="flex p-4 flex-1">
          <span> Hola {user.name}!</span>
        </section>
      </div>
    </>
  )
}
