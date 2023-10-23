import { Link } from "react-router-dom"
import PencilsImage from "../../assets/Pencils.png"

export default function ApplicationsCard(props) {
  // console.log(course)
  const { application } = props

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

  return (
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
          <p className="text-gray-700 text-base">
            {application.applicationReviewer?.reviewerDate
              ? "Revisada el: " + new Date(application.applicationReviewer?.reviewerDate).toLocaleDateString(
                  "es-CL",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )
              : "Pendiente"}
          </p>
        </section>

        <section className="px-6 pt-4 pb-2">
          <span
            to={"/portal/cursos/" + application._id}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            Ver postulación
          </span>
        </section>
      </div>
    </Link>
  )
}
