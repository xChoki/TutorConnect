import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SideBar from "../../components/Navigation/SideBar"
import { useSidebarState } from "../../hooks/useSidebarState"
import ApplicationStateAlert from "../../components/Applications/ApplicationStateAlert"
import { Icon_Download } from "../../assets/Icons"
import ApplicationButtons from "../../components/Applications/ApplicationButtons"

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

        <div className={`${open ? "ml-72" : "ml-20"} p-6`}>
          <section className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              <span>{applicationData.applicationStudentInfo?.studentName}</span>
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
                <span>{applicationData.applicationFiles?.fileName.split("____").pop()}</span>
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

            <ApplicationStateAlert applicationData={applicationData} />

            <ApplicationButtons
              applicationData={applicationData}
              handleApplication={handleApplication}
            />
          </section>
        </div>
      </div>
    </>
  )
}
