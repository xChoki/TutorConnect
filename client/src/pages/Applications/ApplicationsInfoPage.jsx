import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SideBar from "../../components/SideBar"
import { Icon_Download } from "../../assets/Icons"

export default function ApplicationsInfoPage() {
  const [open, setOpen] = useState(true)
  const [applicationData, setAplicationData] = useState([])

  const { id } = useParams()

  useEffect(() => {
    if (!id) {
      return
    }

    axios.get("/applications/" + id).then((response) => {
      const { data } = response
      setAplicationData(data)
      //   console.log(data)
    })
  }, [id])

  async function downloadFile(fileName) {
    try {
      const endpoint = `/upload/${fileName}`

      // Create a hidden anchor element for download
      const link = document.createElement("a")
      link.href = endpoint
      link.download = fileName

      // Trigger a click event on the anchor element
      link.click()

      // You can add additional logic here after successfully triggering the download
    } catch (error) {
      console.error("Error downloading the file:", error)
      // You can handle the error as needed
    }
  }

  return (
    <>
      <div className="grid grid-cols-[auto,1fr]">
        <SideBar open={open} setOpen={setOpen} />

        <div className={`${open ? "ml-72" : "ml-20"} p-10`}>
          <section className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              {applicationData.applicationStudentInfo?.map((studentInfo) => (
                <span key={studentInfo._id}>{studentInfo.studentName}</span>
              ))}
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

            <div className="flex mt-20">
              <button
                type="button"
                className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Aceptar
              </button>

              <button
                type="button"
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
