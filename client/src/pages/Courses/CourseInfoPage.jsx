import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import SideBar from "../../components/SideBar"

import { validateRoles } from "../../scripts/ValidateRoles"

import { Accordion } from "flowbite-react"
import { Icon_Upload, Icon_UploadCloud } from "../../assets/Icons"
import Modal from "../../components/Modal"

export default function CourseInfoPage() {
  const [open, setOpen] = useState(true)

  const { id } = useParams()

  const [course_name, setCourse_name] = useState("")
  const [course_description, setCourse_description] = useState("")
  const [course_extrainfo, setCourse_extrainfo] = useState("")
  const [course_neurodiv, setCourse_neurodiv] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [addedFiles, setAddedFiles] = useState([])
  const [uploadedFile, setUploadedFile] = useState(false)
  const [fileName, setFileName] = useState("")
  const [fileDiff, setFileDiff] = useState("")

  useEffect(() => {
    if (!id) {
      return
    }

    axios.get("/cursos/" + id).then((response) => {
      const { data } = response
      setCourse_name(data.course_name)
      setCourse_description(data.course_description)
      setCourse_extrainfo(data.course_extrainfo)
      setCourse_neurodiv(data.course_neurodiv)
    })
  }, [id])

  const allowedRoles = [2002, 2003, 5001]

  const ValidateResult = validateRoles({ allowedRoles })
  //console.log("resultado: " + ValidateResult)

  function uploadFileChange(e) {
    setAddedFiles(e.target.files[0])
    if (addedFiles) {
      setFileName(e.target.files[0].name)
      console.log(e.target.files[0].name)
    }
  }

  async function uploadFile() {
    
    try {
      if (!addedFiles){
        alert("Por favor, seleccione un archivo para subir")
        return
      }

      const formData = new FormData()
      formData.append("file", addedFiles)

      let endpoint = ""
      switch (fileDiff) {
        case "vid":
          endpoint = "/upload/video/" + id
          break
        case "mat":
          endpoint = "/upload/material/" + id
          break
        case "hom":
          endpoint = "/upload/homework/" + id
          break
      }

      await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setUploadedFile(true)

      // alert("File uploaded successfully.")
    } catch (error) {
      console.error("Error subiendo el archivo:", error)
      alert("Error subiendo el archivo.")
    }
  }

  return (
    <>
      <div className="grid grid-cols-[auto,1fr]">
        <SideBar open={open} setOpen={setOpen} />

        <div className={`${open ? "ml-72" : "ml-20"} p-10`}>
          <section className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
            {ValidateResult && (
              <aside className="float-right">
                <Link
                  to={"/portal/cursos/editar/" + id}
                  className="px-3 border rounded-lg border-gray-200 py-1 items-center bg-gray-50"
                >
                  Editar
                </Link>
              </aside>
            )}

            <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              {course_name}
            </h2>
            <hr className="h-px my-8 bg-gray-200 border-0" />
            <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Información del curso
            </h2>
            <p className="font-normal text-gray-700">{course_description}</p>

            <hr className="w-48 h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10" />

            {course_extrainfo && (
              <div className="">
                <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                  Información extra del curso
                </h2>
                <p> {course_extrainfo} </p>
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10" />
              </div>
            )}

            <p>
              Este curso {course_neurodiv ? "" : "no"} cuenta con disponibilidad
              para tratar con personas neurodivergentes.{" "}
              <Link to={"/"} className="text-blue-500">
                Saber más.
              </Link>
            </p>

            <Accordion className="mt-20">
              <Accordion.Panel>
                <Accordion.Title className="flex items-center">
                  <span className="text-lg">Grabaciones</span>
                </Accordion.Title>
                <Accordion.Content>
                  {ValidateResult && (
                    <>
                      <div
                        onClick={() => {
                          // console.log("Subiendo grabación")
                          setOpenModal(true)
                          setFileDiff("vid")
                        }}
                        className="p-5 text-gray-500 flex justify-between hover:bg-gray-200 hover:cursor-pointer"
                      >
                        Subir grabación <Icon_Upload />
                      </div>
                      <hr className="h-px bg-gray-200 border-0" />
                    </>
                  )}
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="flex items-center">
                  <span className="text-lg">Tareas</span>
                </Accordion.Title>
                <Accordion.Content>
                  {ValidateResult && (
                    <>
                      <div
                        onClick={() => {
                          // console.log("Subiendo tarea")
                          setOpenModal(true)
                          setFileDiff("hom")
                        }}
                        className="p-5 text-gray-500 flex justify-between hover:bg-gray-200 hover:cursor-pointer"
                      >
                        Subir tarea <Icon_Upload />
                      </div>
                      <hr className="h-px bg-gray-200 border-0" />
                    </>
                  )}
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="flex items-center">
                  <span className="text-lg">Material</span>
                </Accordion.Title>
                <Accordion.Content>
                  {ValidateResult && (
                    <>
                      <div
                        onClick={() => {
                          // console.log("Subiendo material")
                          setOpenModal(true)
                          setFileDiff("mat")
                        }}
                        className="p-5 text-gray-500 flex justify-between hover:bg-gray-200 hover:cursor-pointer"
                      >
                        Subir material <Icon_Upload />
                      </div>
                      <hr className="h-px bg-gray-200 border-0" />
                    </>
                  )}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </section>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        cancel={true}
        modalMargin={open ? "72" : "20"}
      >
        {uploadedFile ? (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="mx-auto my-4 w-full h-full">
              <h3>¡Archivo subido exitosamente!</h3>
              <p className="text-sm text-gray-500 mt-2">
                Presiona continuar para cerrar este menú.
              </p>
            </div>

            <div className="gap-4 mt-7">
              <button
                className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                onClick={() => {
                  setOpenModal(false)
                  setUploadedFile(false)
                  setFileName("")
                  setAddedFiles([])
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="mx-auto my-4 w-full h-full">
              <label className="flex flex-col justify-center items-center w-full h-full px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <div className="flex items-center space-x-2">
                  <Icon_UploadCloud />
                  <span className="font-medium text-gray-600">
                    Arrastra tus archivos, o{" "}
                    <span className="text-blue-600 underline">súbelos.</span>
                  </span>
                </div>
                <input
                  type="file"
                  name="file_upload"
                  className="hidden"
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

              <button
                className="mx-2 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={uploadFile}
              >
                Subir
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
