import SideBar from "../../components/SideBar"
import { Link } from "react-router-dom"
import { useSidebarState } from "../../hooks/useSidebarState"

export default function ApplicationsDetailsPage() {
  const [open, setOpen] = useSidebarState()

  return (
    <div className="grid grid-cols-[auto,1fr]">
      <SideBar open={open} setOpen={setOpen} />

      <section className={`${open ? "ml-72" : "ml-20"} p-7 font-semibold`}>
        <div className="mb-16">
          <div className="px-4 sm:px-0">
            <h3 className="text-4xl font-semibold leading-7 text-gray-900">
              Tutoría
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              FAQ de tutores.
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-lg font-medium leading-6 text-gray-900">
                  ¿Qué es ser tutor?
                </dt>
                <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Información
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-lg font-medium leading-6 text-gray-900">
                  Más info.
                </dt>
                <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  ...
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-lg font-medium leading-6 text-gray-900">
                  ¿Que necesito para postular?
                </dt>
                <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  ...
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-lg font-medium leading-6 text-gray-900">
                  ¿Cuánto tiempo tarda la postulación?
                </dt>
                <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  ...
                </dd>
              </div>
            </dl>
          </div>
        </div>

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
      </section>
    </div>
  )
}
