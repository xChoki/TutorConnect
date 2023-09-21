import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth()
  const location = useLocation()

  // Check if auth and userRoles are available
  const userRoles = auth?.userRoles

  // Check if userRoles is an object and not empty
  const hasRolesObject =
    userRoles &&
    typeof userRoles === "object" &&
    Object.keys(userRoles).length > 0

  // Check if the user has at least one of the required roles
  const hasRequiredRole =
    hasRolesObject &&
    Object.values(userRoles).some((role) => allowedRoles.includes(role))

  // console.log("Datos usuario: " + auth.userName + " " + auth.userEmail)
  // console.log("Roles permitidos: " + allowedRoles)
  // console.log("Tiene roles: " + hasRolesObject)
  // console.log("Tiene los roles requeridos: " + hasRequiredRole)

  return hasRequiredRole ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
