import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { Icon_Cancel } from "../../assets/Icons"
import SideBar from "../../components/Navigation/SideBar"
import { useSidebarState } from "../../hooks/useSidebarState"
import ApplicationForm from "../../components/Applications/ApplicationForm"

export default function ApplicationsFormPage() {
  const [open, setOpen] = useSidebarState()

  /* ----------------------------------- 
    Form section */

  // Form variables
  const [applicationDescription, setApplicationDescription] = useState("")
  const [applicationExtraInfo, setCourseExtrainfo] = useState("")

  const [addedGradesFile, setAddedGradesFile] = useState([])
  const [gradesFileName, setGradesFileName] = useState("")

  const [addedRegularFile, setAddedRegularFile] = useState([])
  const [regularFileName, setRegularFileName] = useState("")

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
      setAddedGradesFile(data.applicationGradesFile)
      setAddedRegularFile(data.applicationRegualarFile)
    })
  }, [id])

  // Functions to add or update a new aplication by using the form
  async function saveApplication(ev) {
    ev.preventDefault()

    const applicationData = new FormData()
    // const applicationDataFile = new FormData()

    // applicationData.append('addedGradesFile', addedGradesFile)
    applicationData.append("applicationGradesFile", addedGradesFile)
    applicationData.append("applicationRegularFile", addedRegularFile)
    applicationData.append("applicationExtraInfo", applicationExtraInfo)
    applicationData.append("applicationDescription", applicationDescription)

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
          headers: { "Content-Type": "multipart/form-data" },
        })
        // await axios.post("/applications/file", applicationDataFile, {
        //   headers: { "Content-Type": "multipart/form-data" },
        // })
      }
    } catch (error) {
      alert("Ha ocurrido un error, por favor intente nuevamente. " + error)
    }
  }

  // Function to handle course deletion
  async function deleteApplication() {
    try {
      if (id) {
        var result = window.confirm("¿Seguro que desea eliminar la solicitud?")
        if (result === true) {
          await axios.delete("/cursos/" + id)
          setRedirect(true)
        }
      }
    } catch (error) {
      alert("Ha ocurrido un error al eliminar el curso. " + error)
    }
  }

  function uploadGradesFileChange(e) {
    setAddedGradesFile(e.target.files[0])
    if (addedGradesFile) {
      setGradesFileName(e.target.files[0].name)
      // console.log(e.target.files[0].name)
    }
  }
  function uploadRegularFileChange(e) {
    setAddedRegularFile(e.target.files[0])
    if (addedRegularFile) {
      setRegularFileName(e.target.files[0].name)
      // console.log(e.target.files[0].name)
    }
  }

  if (redirect) {
    return <Navigate to={"/portal/solicitudes/detalles"} />
  }

  return (
    <>
      <div className="grid grid-cols-[auto,1fr] container mx-auto">
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

          <ApplicationForm
            saveApplication={saveApplication}
            applicationDescription={applicationDescription}
            setApplicationDescription={setApplicationDescription}
            uploadGradesFileChange={uploadGradesFileChange}
            uploadRegularFileChange={uploadRegularFileChange}
            gradesFileName={gradesFileName}
            regularFileName={regularFileName}
            applicationExtraInfo={applicationExtraInfo}
            setCourseExtrainfo={setCourseExtrainfo}
            id={id}
            deleteApplication={deleteApplication}
          />
        </section>
      </div>
    </>
  )
}
