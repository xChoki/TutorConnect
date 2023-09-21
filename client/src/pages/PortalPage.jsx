import { useState } from "react"
import SideBar from "../components/SideBar" // Asegúrate de importar correctamente el componente del sidebar
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function PortalPage() {
  const { ready, auth } = useAuth()
  const [open, setOpen] = useState(true)

  if (!ready) {
    return "Cargando..."
  }

  if (ready && !auth) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="grid grid-cols-[auto,1fr]">
      <SideBar open={open} setOpen={setOpen} />

      <section className={`${open ? "ml-72" : "ml-20"} p-7 font-semibold`}>
        <span> Hola {auth.userName}!</span>
      </section>
    </div>
  )
}
