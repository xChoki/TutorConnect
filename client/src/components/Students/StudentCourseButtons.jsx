import { useNavigate } from "react-router-dom"

export default function StudentCourseButtons({ registerStudent }) {
  const navigate = useNavigate()

  return (
    <div className="mt-20 flex gap-5">
      <button
        onClick={() => registerStudent()}
        className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Ingresar
      </button>
      <button
        onClick={() => navigate("/portal/cursos/registrar")}
        className="mx-2 text-black hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Cancelar
      </button>
    </div>
  )
}
