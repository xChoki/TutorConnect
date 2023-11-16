export default function ApplicationButtons({
  applicationData,
  handleApplication,
  setOpenCommentModal,
}) {
  return (
    <div className="flex mt-20">
      {applicationData.applicationState === "En proceso" && (
        <button
          type="button"
          onClick={() => {
            handleApplication(
              "Aceptada",
              applicationData._id,
              applicationData.applicationStudentInfo.studentId,
              ""
            )
          }}
          className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Aceptar
        </button>
      )}

      {applicationData.applicationState === "Rechazada" ? (
        <></>
      ) : (
        <button
          type="button"
          onClick={() => {
            setOpenCommentModal(true)
          }}
          className="mx-2 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          <span className="pl-2">Rechazar</span>
        </button>
      )}
    </div>
  )
}
