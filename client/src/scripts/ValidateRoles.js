import useAuth from "../hooks/useAuth"

export function validateRoles({ allowedRoles }) {
  const { auth } = useAuth()

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

  return hasRequiredRole
}
