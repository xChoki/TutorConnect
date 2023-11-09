import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import SideBar from "../../components/Navigation/SideBar"

import ReactPlayer from "react-player"

import { validateRoles } from "../../scripts/ValidateRoles"

import { Icon_UploadCloud } from "../../assets/Icons"
import Modal from "../../components/Modal"
import CourseInfo from "../../components/Courses/CourseInfo"
import CourseFilesAccordion from "../../components/Courses/CourseFilesAccordion"
import { useSidebarState } from "../../hooks/useSidebarState"
import useAuth from "../../hooks/useAuth"
import StudentCourseButtons from "../../components/Students/StudentCourseButtons"

export default function CourseInfoPage() {
  const [open, setOpen] = useSidebarState()

  const { auth } = useAuth()

  const { id } = useParams()

  const [courseName, setCourseName] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [courseExtrainfo, setCourseExtrainfo] = useState("")
  const [courseNeurodiv, setCourseNeurodiv] = useState(false)
  const [videoFiles, setVideoFiles] = useState([])
  const [homeworkFiles, setHomeworkFiles] = useState([])
  const [materialFiles, setMaterialFiles] = useState([])
  const [tutorId, setTutorId] = useState([])
  const [students, setStudents] = useState([])

  const [openModalUpload, setOpenModalUpload] = useState(false)
  const [openModalVideo, setOpenModalVideo] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)

  const [addedFiles, setAddedFiles] = useState([])
  const [uploadedFile, setUploadedFile] = useState(false)
  const [fileName, setFileName] = useState("")
  const [fileDiff, setFileDiff] = useState("")

  const [selectedVideo, setSelectedVideo] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (!id) {
      return
    }

    axios.get("/courses/" + id).then((response) => {
      const { data } = response
      setCourseName(data.courseName)
      setCourseDescription(data.courseDescription)
      setCourseExtrainfo(data.courseExtrainfo)
      setCourseNeurodiv(data.courseNeurodiv)
      setVideoFiles(data.videoFiles)
      setMaterialFiles(data.materialFiles)
      setHomeworkFiles(data.homeworkFiles)
      setStudents(data.courseStudents)
      setTutorId(data.courseTutorId)
    })
  }, [id])

  const allowedRoles = [2002, 2003, 5001]

  const ValidateRoles = validateRoles({ allowedRoles })
  //console.log("resultado: " + ValidateRoles)

  function uploadFileChange(e) {
    setAddedFiles(e.target.files[0])
    if (addedFiles) {
      setFileName(e.target.files[0].name)
      // console.log(e.target.files[0].name)
    }
  }

  async function uploadFile() {
    try {
      if (!addedFiles) {
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

  function selectedVideoInfo(selectedFileName) {
    if (selectedFileName != "") {
      setSelectedVideo(import.meta.env.VITE_API_URL_VIDEOFILES + selectedFileName)
    } else {
      setSelectedVideo("")
    }
    // console.log(selectedVideo)
  }

  function getAcceptedFiles() {
    switch (fileDiff) {
      case "vid":
        return "video/*"
      case "mat":
        return ".doc, .docx, .xls, .xlsx, .txt, .pdf"
      case "hom":
        return ".doc, .docx, .xls, .xlsx, .txt"
    }
  }

  async function deleteFile(fileName, fileType) {
    console.log(fileName + " " + fileType)
    try {
      const endpoint = `upload/file/${fileType}/${id}/${fileName}`
      console.log(endpoint)
      await axios.delete(endpoint)

      window.location.reload()
    } catch (error) {
      console.error("Error deleting the file:", error)
      // You can handle the error as needed
    }
  }

  async function registerStudent() {
    try {
      sessionStorage.setItem("showregistercoursemsg", "1")
      navigate("/portal/cursos")
      await axios.put("/student/course/register/" + id)
    } catch (error) {
      console.error(`Error registering user into course ${id}`)
    }
  }

  // Check if student is registered in the course or not
  // const isUserInCourse = students && students.includes(auth.id)
  const isUserInCourse = students.some(student => student.student_id === auth.id);

  const isUserCourseTutor = auth && tutorId.includes(auth.id)

  return (
    <>
      <div className="grid grid-cols-[auto,1fr] container mx-auto">
        <SideBar open={open} setOpen={setOpen} />

        <div className={`${open ? "ml-72" : "ml-20"} p-10`}>
          <section className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
            {ValidateRoles && (
              <aside className="float-right">
                <Link
                  to={"/portal/cursos/editar/" + id}
                  className="px-3 border rounded-lg border-gray-200 py-1 items-center bg-gray-50"
                >
                  Editar
                </Link>
              </aside>
            )}

            <CourseInfo
              courseName={courseName}
              courseDescription={courseDescription}
              courseExtrainfo={courseExtrainfo}
              courseNeurodiv={courseNeurodiv}
            />

            {(isUserInCourse || isUserCourseTutor) ? (
              <CourseFilesAccordion
                ValidateRoles={ValidateRoles}
                videoFiles={videoFiles}
                homeworkFiles={homeworkFiles}
                materialFiles={materialFiles}
                setOpenModalUpload={setOpenModalUpload}
                setOpenModalVideo={setOpenModalVideo}
                setOpenModalDelete={setOpenModalDelete}
                setFileDiff={setFileDiff}
                fileDiff={fileDiff}
                setFileName={setFileName}
                selectedVideoInfo={selectedVideoInfo}
              />
            ) : (
              <StudentCourseButtons registerStudent={registerStudent} />
            )}
          </section>
        </div>
      </div>

      <Modal
        open={openModalUpload}
        onClose={() => {
          setOpenModalUpload(false)
          if (fileName !== "") {
            window.location.reload()
          }
        }}
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
                  setOpenModalUpload(false)
                  setUploadedFile(false)
                  setFileName("")
                  setAddedFiles([])
                  window.location.reload()
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
                  <span className="font-medium text-gray-600">Presiona para subir tu archivo</span>
                </div>
                <input
                  type="file"
                  name="file_upload"
                  className="hidden"
                  accept={getAcceptedFiles()}
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

      <Modal
        open={openModalVideo}
        onClose={() => {
          setOpenModalVideo(false)
          selectedVideoInfo("")
        }}
        cancel={true}
        modalMargin={open ? "72" : "20"}
      >
        <>
          <ReactPlayer
            url={selectedVideo}
            controls
            width="100%" // Set the width to 100% to fill the modal
            height="100%" // Set the height to 100% to fill the modal
            playing // AutoPlay
            onEnded={() => setOpenModalVideo(false)}
          />
        </>
      </Modal>

      <Modal
        open={openModalDelete}
        onClose={() => {
          setOpenModalDelete(false)
          selectedVideoInfo("")
        }}
        cancel={true}
        modalMargin={open ? "72" : "20"}
      >
        <div className="flex flex-col items-center justify-center text-center h-full">
          <div className="mx-auto my-4 w-full h-full">
            <h3>¿Seguro que deseas eliminar el archivo?</h3>
            <p className="text-sm text-gray-500 mt-2">
              La eliminación de este archivo es permantente.
            </p>
          </div>

          <div className="gap-4 mt-7">
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={() => {
                setOpenModalDelete(false)
                deleteFile(fileName, fileDiff)
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
