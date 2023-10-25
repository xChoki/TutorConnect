import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SideBar from "../../components/Navigation/SideBar"
import { useSidebarState } from "../../hooks/useSidebarState"
import ApplicationStateAlert from "../../components/Applications/ApplicationStateAlert"
// import { Icon_Download } from "../../assets/Icons"
import ApplicationButtons from "../../components/Applications/ApplicationButtons"
import Modal from "../../components/Modal"
import FileViewer from "../../components/FileViewer"

export default function ApplicationsInfoPage() {
  const [open, setOpen] = useSidebarState()
  const [applicationData, setAplicationData] = useState([])

  const [openFileModal, setOpenFileModal] = useState(false)
  const [fileUrl, setFileUrl] = useState(false)

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

  // function downloadFile(fileName) {
  //   const endpoint = `http://localhost:4000/applications/${fileName}`

  //   fetch(endpoint, {
  //     method: "GET",
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob)
  //       const link = document.createElement("a")
  //       link.href = url
  //       link.download = fileName
  //       link.click()
  //       window.URL.revokeObjectURL(url)
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading the file:", error)
  //     })
  // }

  function showFileModal(fileUrlParam) {
    setFileUrl(fileUrlParam)
    console.log(fileUrl)
    setOpenFileModal(true)
  }

  return (
    <>
      <div className="grid grid-cols-[auto,1fr]">
        <SideBar open={open} setOpen={setOpen} />

        <div className={`${open ? "ml-72" : "ml-20"} p-6`}>
          <section className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              <span>{applicationData.applicationStudentInfo?.studentName}</span>
            </h2>
            <hr className="h-px my-8 bg-gray-200 border-0" />

            <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Información de la solicitud
            </h2>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-lg font-medium leading-6 text-gray-900">
                  <p>Descripción de la aplicación:</p>
                </dt>
                <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData.applicationDescription}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-lg font-medium leading-6 text-gray-900">
                  <p>Correo estudiante:</p>
                </dt>
                <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData.applicationStudentInfo?.studentEmail}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-lg font-medium leading-6 text-gray-900">
                  <p>Fecha de nacimiento del estudiante:</p>
                </dt>
                <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData.applicationStudentInfo?.studentDateofBirth}
                </dd>
              </div>
            </dl>

            <hr className="h-px my-8 bg-gray-200 border-0" />
            <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Información extra de la solicitud
            </h2>
            <p className="font-normal text-gray-700">{applicationData.applicationExtraInfo}</p>

            <hr className="h-px my-8 bg-gray-200 border-0" />
            <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">Documentos</h2>
            <div className="flex items-center p-5 text-gray-500 hover:bg-gray-200 hover:cursor-pointer">
              <div
                onClick={() => {
                  showFileModal(
                    import.meta.env.VITE_API_FILE_URL +
                      "applications" +
                      "/" +
                      applicationData.applicationGradesFile?.fileName
                  )
                }}
                className="flex-grow"
              >
                <span>
                  Notas: {applicationData.applicationGradesFile?.fileName.split("____").pop()}
                </span>
              </div>
              {/* <div className="flex">
                <div
                  className="hover:bg-gray-400 hover:text-white rounded-lg"
                  onClick={() => {
                    downloadFile(applicationData.applicationGradesFile?.fileName)
                  }}
                >
                  <Icon_Download margin="2" />
                </div>
              </div> */}
            </div>
            <div className="flex items-center p-5 text-gray-500 hover:bg-gray-200 hover:cursor-pointer">
              <div
                onClick={() => {
                  showFileModal(
                    import.meta.env.VITE_API_FILE_URL +
                      "applications" +
                      "/" +
                      applicationData.applicationRegularFile?.fileName
                  )
                }}
                className="flex-grow"
              >
                <span>
                  Alumno regular:{" "}
                  {applicationData.applicationRegularFile?.fileName.split("____").pop()}
                </span>
              </div>
              {/* <div className="flex">
                <div
                  className="hover:bg-gray-400 hover:text-white rounded-lg"
                  onClick={() => {
                    downloadFile(applicationData.applicationRegularFile?.fileName)
                  }}
                >
                  <Icon_Download margin="2" />
                </div>
              </div> */}
            </div>

            <ApplicationStateAlert applicationData={applicationData} />

            <ApplicationButtons
              applicationData={applicationData}
              handleApplication={handleApplication}
            />
          </section>
        </div>
      </div>

      <Modal
        open={openFileModal}
        onClose={() => setOpenFileModal(false)}
        cancel={true}
        modalMargin={open ? "72" : "20"}
      >
        <div className="flex flex-col items-center justify-center text-center h-full">
          <div className="mx-auto my-4 w-full h-full">
            <h3>Archivo de postulación</h3>
            <FileViewer fileUrl={fileUrl ? fileUrl : null} />
          </div>

          <div className="gap-4 mt-7">
            <button
              className="focus:outline-none text-white bg-gray-400 hover:bg-gray-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={() => {
                setOpenFileModal(false)
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
