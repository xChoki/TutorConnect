import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { Icon_Cancel } from "../../assets/Icons"
import SideBar from "../../components/SideBar"

export default function CoursesFormPage() {
  const [open, setOpen] = useState(true)

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
    console.log(ev.target.checked)
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
        setRedirect(true)
        await axios.put("/cursos", {
          id,
          ...courseData,
        })
      } else {
        // new place
        setRedirect(true)
        await axios.post("/cursos", courseData)
      }
    } catch (error) {
      alert("Ha ocurrido un error, por favor intente nuevamente. " + error)
    }
  }

  // Function to handle course deletion
  async function deleteCourse() {
    try {
      if (id) {
        var result = window.confirm(
          `¿Seguro que desea eliminar el curso ${courseName}?`
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

  if (redirect) {
    return <Navigate to={"/portal/cursos"} />
  }

  return (
    <>
      <div className="grid grid-cols-[auto,1fr]">
        <SideBar open={open} setOpen={setOpen} />

        <section className={`${open ? "ml-72" : "ml-20"} `}>
          <div className="m-10">
            <Link
              className="inline-flex py-16 px-20 rounded-lg text-lg border hover:bg-gray-100"
              to={"/portal/cursos"}
            >
              <Icon_Cancel />
              <span className="pl-2">Cancelar</span>
            </Link>
          </div>

          <form onSubmit={saveCourse} className="max-w-7xl px-10 justify-center">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="courseName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre del curso
              </label>
              <input
                type="text"
                id="courseName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder=""
                required
                value={courseName}
                onChange={(ev) => setCourseName(ev.target.value)}
              />
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="courseDescription"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
              >
                Descripción del curso
              </label>
              <textarea
                id="courseDescription"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Describe tu curso..."
                required
                value={courseDescription}
                onChange={(ev) => setCourseDescription(ev.target.value)}
              ></textarea>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="courseExtrainfo"
                className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
              >
                Información extra (opcional)
              </label>
              <textarea
                id="courseExtrainfo"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Deja un comentario..."
                value={courseExtrainfo}
                onChange={(ev) => setCourseExtrainfo(ev.target.value)}
              ></textarea>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                id="courseNeurodiv"
                type="checkbox"
                name="courseNeurodiv"
                onChange={handleCbClick}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={!!courseNeurodiv}
              />
              <label
                htmlFor="courseNeurodiv"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Estoy capacitado para alumnos neurodivergentes.
              </label>
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
                onClick={deleteCourse}
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
