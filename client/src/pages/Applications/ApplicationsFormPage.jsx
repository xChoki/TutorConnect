import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { Icon_Cancel, Icon_UploadCloud } from "../../assets/Icons"
import SideBar from "../../components/SideBar"

export default function ApplicationsFormPage() {
  const [open, setOpen] = useState(true)

  /* ----------------------------------- 
    Form section */

  // Form variables
  const [applicationDescription, setApplicationDescription] = useState("")
  const [applicationExtraInfo, setCourseExtrainfo] = useState("")

  const [addedFiles, setAddedFiles] = useState([])
  const [fileName, setFileName] = useState("")

  // Redirection
  const [redirect, setRedirect] = useState(false)

  /* ----------------------------------- 
    Editing form section */

  const { id } = useParams() // Course id

  // Retrieving data from the course with corresponding id
  useEffect(() => {
    if (!id) {
      return
    }

    axios.get("/applications/" + id).then((response) => {
      const { data } = response
      setApplicationDescription(data.applicationDescription)
      setCourseExtrainfo(data.applicationExtraInfo)
      setAddedFiles(data.applicationFiles)
    })
  }, [id])

  // Functions to add or update a new aplication by using the form
  async function saveApplication(ev) {
    ev.preventDefault()

    const applicationData = new FormData()
    const applicationDataFile = new FormData()

    // applicationData.append('addedFiles', addedFiles)
    applicationData.append('file', addedFiles)
    applicationData.append('applicationExtraInfo', applicationExtraInfo)
    applicationData.append('applicationDescription', applicationDescription)

    try {
      if (id) {
        // update
        setRedirect(true)
        await axios.put("/applications", {
          id,
          ...applicationData,
        })
      } else {
        // new application
        setRedirect(true)
        await axios.post("/applications", applicationData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        await axios.post("/applications/file", applicationDataFile, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
      }
    } catch (error) {
      alert("Ha ocurrido un error, por favor intente nuevamente. " + error)
    }
  }

  // Function to handle course deletion
  async function deleteApplication() {
    try {
      if (id) {
        var result = window.confirm(
          "¿Seguro que desea eliminar la solicitud?"
        )
        if (result === true) {
          await axios.delete("/cursos/" + id)
          setRedirect(true)
        }
      }
    } catch (error) {
      alert("Ha ocurrido un error al eliminar el curso. " + error)
    }
  }

  function uploadFileChange(e) {
    setAddedFiles(e.target.files[0])
    if (addedFiles) {
      setFileName(e.target.files[0].name)
      // console.log(e.target.files[0].name)
    }
  }

  if (redirect) {
    return <Navigate to={"/portal/solicitudes/detalles"} />
  }

  return (
    <>
      <div className="grid grid-cols-[auto,1fr]">
        <SideBar open={open} setOpen={setOpen} />

        <section className={`${open ? "ml-72" : "ml-20"} `}>
          <div className="m-10">
            <Link
              className="inline-block py-16 px-20 rounded-lg text-lg border hover:bg-gray-100"
              to="/portal/solicitudes/detalles"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="text-center flex">
                <Icon_Cancel />
                <span className="pl-2">Cancelar</span>
              </div>
            </Link>
          </div>

          <form
            onSubmit={saveApplication}
            className="max-w-7xl px-10 justify-center"
          >
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="applicationDescription"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
              >
                Descripción de tí
              </label>
              <textarea
                id="applicationDescription"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Haz una descripción de tí, háblanos de tus motivaciones, tu historia, o lo que desees."
                required
                value={applicationDescription}
                onChange={(ev) => setApplicationDescription(ev.target.value)}
              ></textarea>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <div className="mx-auto my-4 w-full h-full">
                <label className="flex flex-col justify-center items-center w-full h-full px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <div className="flex items-center space-x-2">
                    <Icon_UploadCloud />
                    <span className="font-medium text-gray-600">
                      Presiona para subir tus reporte de notas.
                    </span>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PDF de hasta 1MB
                  </p>
                  <input
                    type="file"
                    name="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={uploadFileChange}
                  />
                </label>

                {fileName && (
                  <>
                    <p className="text-sm text-gray-500 mt-2">
                      Se está subiendo el archivo {fileName}.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="applicationExtraInfo"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
              >
                Información extra (opcional)
              </label>
              <textarea
                id="applicationExtraInfo"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Deja un comentario..."
                value={applicationExtraInfo}
                onChange={(ev) => setCourseExtrainfo(ev.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Enviar
            </button>

            {id && (
              <button
                type="button"
                onClick={deleteApplication}
                className="mx-2 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                <span className="pl-2">Eliminar Curso</span>
              </button>
            )}
          </form>
        </section>
      </div>
    </>
  )
}
