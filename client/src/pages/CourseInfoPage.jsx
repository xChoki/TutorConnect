import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import COM_Side_Bar from "../components/COM_Side_Bar"

export default function CourseInfoPage() {
  const { id } = useParams()

  const [course_name, setCourse_name] = useState("")
  const [course_description, setCourse_description] = useState("")
  const [course_extrainfo, setCourse_extrainfo] = useState("")
  const [course_neurodiv, setCourse_neurodiv] = useState(false)

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

  return (
    <>
      <div className="flex ml-72 mt-5 h-screen">
        <COM_Side_Bar />

        <section className="flex p-4 justify-between w-full">
          <p>Página de curso {course_name}</p>
          <aside className="float-right">
            <Link
              to={"/portal/cursos/editar/" + id}
              className="px-3 border rounded-lg border-gray-200 py-1 items-center bg-gray-50 hover:border-slate-400"
            >
              Editar
            </Link>
          </aside>
        </section>
      </div>
    </>
  )
}
