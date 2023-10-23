import { Icon_Alert } from "../../assets/Icons";

export default function ApplicationStateAlert({
    applicationData
}) {
  return (
    <>
      {applicationData.applicationState === "Aceptada" && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <Icon_Alert />
          <span className="sr-only">Info</span>
          <ul className="list-disc pl-3">
            <li>
              La solicitud actualmente se encuentra <span className="font-medium">Aceptada</span>.
            </li>
            <li>
              Revisada el{" "}
              {new Date(applicationData.applicationReviewer?.reviewerDate).toLocaleDateString(
                "es-CL",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              )}{" "}
              por {applicationData.applicationReviewer?.reviewerName}
            </li>
          </ul>
        </div>
      )}

      {applicationData.applicationState === "Rechazada" && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <Icon_Alert />
          <span className="sr-only">Info</span>
          <ul className="list-disc pl-3">
            <li>
              La solicitud actualmente se encuentra <span className="font-medium">rechazada</span>.
            </li>
            <li>
              Revisada el{" "}
              {new Date(applicationData.applicationReviewer?.reviewerDate).toLocaleDateString(
                "es-CL",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              )}{" "}
              por {applicationData.applicationReviewer?.reviewerName}
            </li>
          </ul>
        </div>
      )}
      {applicationData.applicationState === "En proceso" && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <Icon_Alert />
          <span className="sr-only">Info</span>
          <div>
            La solicitud actualmente se encuentra <span className="font-medium">en proceso</span>.
          </div>
        </div>
      )}
    </>
  )
}
