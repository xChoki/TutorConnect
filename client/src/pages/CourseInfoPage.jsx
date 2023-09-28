import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import SideBar from "../components/SideBar"

import { validateRoles } from "../scripts/ValidateRoles"

import { Accordion } from "flowbite-react"
import { Icon_Record } from "../assets/Icons"

export default function CourseInfoPage() {
  const [open, setOpen] = useState(true)

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

  const allowedRoles = [2002, 2003, 5001]

  const ValidateResult = validateRoles({ allowedRoles })
  //console.log("resultado: " + ValidateResult)

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
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {course_name}
            </h5>
            <hr className="h-px my-8 bg-gray-200 border-0" />
            <p className="font-normal text-gray-700">{course_description}</p>

            {course_extrainfo && <p>{course_extrainfo}</p>}

            <p>
              Este curso {course_neurodiv ? "" : "no"} cuenta con
              disponibilidad para tratar con personas neurodivergentes.
            </p>

            <Accordion className="mt-20">
              <Accordion.Panel>
                <Accordion.Title className="flex items-center">
                  <Icon_Record className="mr-2" />
                  <span className="text-lg">Grabaciones</span>
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500">AAAAAAAAAAAAa</p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Tareas</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500">aaaa</p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Material</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500">aaaaaaaaa</p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </section>
        </div>
      </div>
    </>
  )
}
