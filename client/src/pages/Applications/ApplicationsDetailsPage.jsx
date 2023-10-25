import SideBar from "../../components/Navigation/SideBar"
import { Link } from "react-router-dom"
import { useSidebarState } from "../../hooks/useSidebarState"
import { useEffect, useState } from "react"
import axios from "axios"
import useAuth from "../../hooks/useAuth"
// import ApplicationsCard from "../../components/Cards/ApplicationsCard"

export default function ApplicationsDetailsPage() {
  const [open, setOpen] = useSidebarState()
  const [applications, setApplications] = useState([])
  const { auth } = useAuth()

  // console.log(auth)

  useEffect(() => {
    axios.get("/student/" + auth.id).then(({ data }) => {
      setApplications(data)
    })
  }, [auth.id])

  const INFO_TEXT = [
    {
      PREGUNTA: "¿Qué es ser tutor?",
      RESPUESTA:
        "Forma parte de tu comunidad educativa generando un impacto positivo, ven a formar parte del equipo de tutores que ayudarán a los alumnos a mejorar su rendimiento académico.",
    },
    {
      PREGUNTA: "¿Qué necesito para postular?",
      RESPUESTA: [
        "Certificado académico de notas que acredite haber aprobado la asignatura con nota igual o superior a 6,5.",
        "Certificado de alumno regular de la institución.",
        "Ser ético y responsable.",
        "Haber cursado por lo menos 4 semestres académicos.",
        "Ganas de enseñar.",
        "Computador y conexión a internet.",
        "Dominio adecuado del contenido.",
      ],
    },
    {
      PREGUNTA: "¿Cuánto tiempo tarda la postulación?",
      RESPUESTA:
        "El tiempo de respuesta va a depender de las etapas adicionales que se requieran, el tiempo mínimo de espera es de 7 días hábiles.",
    },
    {
      PREGUNTA: "¿Hay remuneración?",
      RESPUESTA: "Por el momento no hay remuneración para los tutores.",
    },
    {
      PREGUNTA: "¿Cómo te contactaremos? ",
      RESPUESTA: "Por correo electrónico registrado en tu cuenta.",
    },
  ]

  return (
    <div className="grid grid-cols-[auto,1fr]">
      <SideBar open={open} setOpen={setOpen} />

      <section className={`${open ? "ml-72" : "ml-20"} p-7 font-semibold`}>
        <div className="mb-16">
          <div className="px-4 sm:px-0">
            <h3 className="text-4xl font-semibold leading-7 text-gray-900">Tutoría</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">FAQ de tutores.</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {INFO_TEXT &&
                INFO_TEXT.map((INFO_TEXT) => (
                  <div
                    key={INFO_TEXT.PREGUNTA}
                    className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                  >
                    <dt className="text-lg font-medium leading-6 text-gray-900">
                      {INFO_TEXT.PREGUNTA}
                    </dt>
                    <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {Array.isArray(INFO_TEXT.RESPUESTA) ? (
                        <ul className="list-disc">
                          {INFO_TEXT.RESPUESTA.map((listItem, index) => (
                            <li key={index}>{listItem}</li>
                          ))}
                        </ul>
                      ) : (
                        INFO_TEXT.RESPUESTA
                      )}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>

        {/* {console.log(applications)} */}

        {!applications ? (
          <Link
            className="inline-block py-16 px-20 rounded-lg text-lg border hover:bg-gray-100"
            to="/portal/solicitudes/nuevo"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="text-center">
              <span className="pl-2">¿Te interesa?</span>
              <p>Presiona aquí para generar tu solicitud.</p>
            </div>
          </Link>
        ) : (
          <>
            <hr />
            <p className="pt-5">
              Ya tienes una postulación pendiente, te contactaremos a la brevedad.
            </p>
          </>
        )}
      </section>
    </div>
  )
}
