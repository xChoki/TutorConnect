import { useState } from "react"
import SideBar from "../components/SideBar" // Asegúrate de importar correctamente el componente del sidebar
import { Link, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { validateRoles } from "../scripts/ValidateRoles"

export default function PortalPage() {
  const { ready, auth } = useAuth()
  const [open, setOpen] = useState(true)

  if (!ready) {
    return "Cargando..."
  }

  if (ready && !auth) {
    return <Navigate to={"/login"} />
  }

  const allowedRoles = [2003, 5001]
  const ValidateResult = validateRoles({ allowedRoles })

  return (
    <div className="grid grid-cols-[auto,1fr]">
      <SideBar open={open} setOpen={setOpen} />

      <section className={`${open ? "ml-72" : "ml-20"} p-7 font-semibold`}>
        {!ValidateResult && (
          <section className="m-10">
            <Link
              className="inline-block py-16 px-20 rounded-lg text-lg border hover:bg-gray-100"
              to="/portal/solicitudes/detalles"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="text-center">
                <span className="pl-2">¿Deseas ser tutor?</span>
                <p>Presiona aquí para saber más y postular.</p>
              </div>
            </Link>
          </section>
        )}
        <span> Hola {auth.userName}!</span>
      </section>
    </div>
  )
}
