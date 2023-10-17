import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SideBar from "../../components/SideBar"
import { Icon_Alert, Icon_Download } from "../../assets/Icons"
import { useSidebarState } from "../../hooks/useSidebarState"

export default function ApplicationsInfoPage() {
  const [open, setOpen] = useSidebarState()
  const [applicationData, setAplicationData] = useState([])

  const { id } = useParams()

  useEffect(() => {
    if (!id) {
      return
    }

    axios.get("/applications/" + id).then((response) => {
      const { data } = response
      setAplicationData(data)
    })
  }, [id])

  // console.log(applicationData.applicationStudentInfo?.studentId)

  async function handleApplication(applicationState, applicationId, applicationStudentId) {
    try {
      const data = { applicationState, applicationId, applicationStudentId }
      await axios.put("/applications/", data)
      window.location.reload()
    } catch (error) {
      console.error("Error actualizando la solicitud: ", error)
      throw error
    }
  }

  function downloadFile(fileName) {
    const endpoint = `/upload/${fileName}`

    fetch(endpoint)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(url)
      })
      .catch((error) => {
        console.error("Error downloading the file:", error)
      })
  }

  return (
    <>
      <div className="grid grid-cols-[auto,1fr]">
        <SideBar open={open} setOpen={setOpen} />

        <div className={`${open ? "ml-72" : "ml-20"} p-10`}>
          <section className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              <span>{applicationData.studentInfo?.studentName}</span>
            </h2>
            <hr className="h-px my-8 bg-gray-200 border-0" />

            <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Información de la solicitud
            </h2>
            <p className="font-normal text-gray-700">{applicationData.applicationDescription}</p>

            <hr className="h-px my-8 bg-gray-200 border-0" />
            <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Información extra de la solicitud
            </h2>
            <p className="font-normal text-gray-700">{applicationData.applicationExtraInfo}</p>

            <hr className="h-px my-8 bg-gray-200 border-0" />
            <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">Documento notas</h2>
            <div className="flex items-center p-5 text-gray-500 hover:bg-gray-200 hover:cursor-pointer">
              <div
                onClick={() => {
                  downloadFile(applicationData.applicationFiles?.fileName)
                }}
                className="flex-grow"
              >
                <span>{applicationData.applicationFiles?.fileName}</span>
              </div>
              <div className="flex">
                <div
                  className="hover:bg-gray-400 hover:text-white rounded-lg"
                  onClick={() => {
                    downloadFile(applicationData.applicationFiles?.fileName)
                  }}
                >
                  <Icon_Download margin="2" />
                </div>
              </div>
            </div>

            {applicationData.applicationState === "Aceptada" && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                role="alert"
              >
                <Icon_Alert />
                <span className="sr-only">Info</span>
                <div>
                  La solicitud actualmente se encuentra{" "}
                  <span className="font-medium">Aceptada</span>.
                </div>
              </div>
            )}
            {applicationData.applicationState === "Rechazada" && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <Icon_Alert />
                <span className="sr-only">Info</span>
                <div>
                  La solicitud actualmente se encuentra{" "}
                  <span className="font-medium">rechazada</span>.
                </div>
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
                  La solicitud actualmente se encuentra{" "}
                  <span className="font-medium">en proceso</span>.
                </div>
              </div>
            )}

            <div className="flex mt-20">
              {applicationData.applicationState === "En proceso" ||
                (applicationData.applicationState === "Rechazada" && (
                  <button
                    type="button"
                    onClick={() => {
                      handleApplication(
                        "Aceptada",
                        applicationData._id,
                        applicationData.applicationStudentInfo.studentId
                      )
                    }}
                    className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Aceptar
                  </button>
                ))}

              <button
                type="button"
                onClick={() => {
                  handleApplication(
                    "Rechazada",
                    applicationData._id,
                    applicationData.applicationStudentInfo.studentId
                  )
                }}
                className="mx-2 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                <span className="pl-2">Rechazar</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
