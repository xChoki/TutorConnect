import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { Icon_Cancel } from "../../assets/Icons"
import SideBar from "../../components/SideBar"
import CourseForm from "../../components/Courses/CourseForm"
import { useSidebarState } from "../../hooks/useSidebarState"

export default function CoursesFormPage() {
  const [open, setOpen] = useSidebarState()

  /* ----------------------------------- 
    Form section */

  // Form variables
  const [courseName, setCourseName] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [courseExtrainfo, setCourseExtrainfo] = useState("")
  const [courseNeurodiv, setCourseNeurodiv] = useState(false)

  // Redirection
  const [redirect, setRedirect] = useState(false)

  // Function to handle neurodiv checkbox
  function handleCbClick(ev) {
    setCourseNeurodiv(ev.target.checked)
    // console.log(ev.target.checked)
  }

  /* ----------------------------------- 
    Editing form section */

  const { id } = useParams() // Course id

  // Retrieving data from the course with corresponding id
  useEffect(() => {
    if (!id) {
      return
    }

    axios.get("/cursos/" + id).then((response) => {
      const { data } = response
      setCourseName(data.courseName)
      setCourseDescription(data.courseDescription)
      setCourseExtrainfo(data.courseExtrainfo)
      setCourseNeurodiv(data.courseNeurodiv)
    })
  }, [id])

  // Functions to add or update a new course by using the form
  async function saveCourse(ev) {
    ev.preventDefault()

    const courseData = {
      courseName,
      courseDescription,
      courseExtrainfo,
      courseNeurodiv,
    }

    try {
      if (id) {
        // update
        sessionStorage.setItem("showeditmsg", "1")

        setRedirect(true)
        await axios.put("/cursos", {
          id,
          ...courseData,
        })
      } else {
        // new place
        sessionStorage.setItem("showcreatemsg", "1")

        setRedirect(true)
        await axios.post("/cursos", courseData)
      }
    } catch (error) {
      alert("Ha ocurrido un error.")
      // toast.error('Ha ocurrido un error, verifica la información.')
    }
  }

  // Function to handle course deletion
  async function deleteCourse() {
    try {
      if (id) {
        var result = window.confirm(`¿Seguro que desea eliminar el curso ${courseName}?`)
        if (result === true) {
          await axios.delete("/cursos/" + id)
          setRedirect(true)
        }
      }
    } catch (error) {
      alert("Ha ocurrido un error al eliminar el curso. " + error)
    }
  }

  if (redirect) {
    return <Navigate to={"/portal/cursos"} />
  }

  return (
    <>
      <div className="grid grid-cols-[auto,1fr]">
        <SideBar open={open} setOpen={setOpen} />

        <section className={`${open ? "ml-72" : "ml-20"} `}>
          <section className="m-10">
            <Link
              className="inline-block py-16 px-20 rounded-lg text-lg border hover:bg-gray-100"
              to="/portal/cursos"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="text-center flex">
                <Icon_Cancel />
                <span className="pl-2">Cancelar</span>
              </div>
            </Link>
          </section>

          <CourseForm
            courseName={courseName}
            courseDescription={courseDescription}
            courseExtrainfo={courseExtrainfo}
            courseNeurodiv={courseNeurodiv}
            id={id}
            saveCourse={saveCourse}
            deleteCourse={deleteCourse}
            handleCbClick={handleCbClick}
            setCourseName={setCourseName}
            setCourseDescription={setCourseDescription}
            setCourseExtrainfo={setCourseExtrainfo}
          />
        </section>
      </div>
    </>
  )
}
