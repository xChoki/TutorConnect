import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { validateRoles } from "../scripts/ValidateRoles"

export default function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth()
  const location = useLocation()

  const ValidateResult = validateRoles({ allowedRoles })
  // console.log("resultado: " + ValidateResult)
  // console.log("Datos usuario: " + auth.userName + " " + auth.userEmail)
  // console.log("Roles permitidos: " + allowedRoles)
  // console.log("Tiene roles: " + hasRolesObject)
  // console.log("Tiene los roles requeridos: " + hasRequiredRole)

  return ValidateResult ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
