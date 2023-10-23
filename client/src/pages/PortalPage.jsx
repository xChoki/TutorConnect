import SideBar from "../components/Navigation/SideBar"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { validateRoles } from "../scripts/ValidateRoles"
import { useSidebarState } from "../hooks/useSidebarState"
import { useEffect } from "react"
import { Toaster, toast } from "sonner"

export default function PortalPage() {
  const { auth } = useAuth()
  const [open, setOpen] = useSidebarState()

  const allowedRoles = [2003, 5001]
  const ValidateResult = validateRoles({ allowedRoles })

  useEffect(() => {
    if (sessionStorage.getItem("showloginmsg") == "1") {
      toast.success(`Bienvenido ${auth.userName}!`)
      sessionStorage.removeItem("showloginmsg")
    }
  }, [])

  return (
    <div className="grid grid-cols-[auto,1fr]">
      <SideBar open={open} setOpen={setOpen} />

      <Toaster position="top-center" />
      
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
