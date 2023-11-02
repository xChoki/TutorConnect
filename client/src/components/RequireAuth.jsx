import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { validateRoles } from "../scripts/ValidateRoles"

export default function RequireAuth({ allowedRoles }) {
  const { auth, ready } = useAuth()
  const location = useLocation()
  
  const ValidateRoles = validateRoles({ allowedRoles })
  
  // console.log("resultado: " + ValidateRoles)
  // console.log("Datos usuario: " + auth.userName + " " + auth.userEmail)
  // console.log("Roles permitidos: " + allowedRoles)
  // console.log("Tiene roles: " + hasRolesObject)
  // console.log("Tiene los roles requeridos: " + hasRequiredRole)
  if (ready) {
    return ValidateRoles ? (
      <Outlet />
    ) : auth?.user ? (
      <Navigate to="/" />
    ) : (
      <>
      {/* {console.log("usuario no logeado")} */}
      <Navigate to="/login" state={{ from: location }} replace />
      </>
    )
  }
}
