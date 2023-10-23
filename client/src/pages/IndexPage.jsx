import axios from "axios"
import { useEffect, useState } from "react"
import head from "../assets/Pencils.png"
import Footer from "../components/Navigation/Footer"

export default function IndexPage() {
  const [totalTutores, setTotalTutores] = useState(0)
  const [totalCursos, setTotalCursos] = useState(0)
  const [totalAlumnos, setTotalAlumnos] = useState(0)

  useEffect(() => {
    axios
      .get("/cuenta")
      .then((response) => {
        setTotalTutores(response.data.tutorCount)
        setTotalCursos(response.data.totalCursos)
        setTotalAlumnos(response.data.studentCount)
      })
      .catch((error) => {
        console.error("Error fetching counts:", error)
      })
  }, [])

  return (
    <div className="container mx-auto">
      <section className="bg-maincolor">
        <div className="relative h-1/2">
          <img src={head} className="w-full h-full object-cover object-center" alt="Background" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center backdrop-blur-sm p-2 md:p-5">
            <h1 className="text-2xl md:text-4xl lg:text-6xl text-white" style={{ textShadow: "#161523 1px 0 10px" }}>
              ¡Bienvenidos a TutorConnect!
            </h1>
            <p className="lg:text-xl text-gray-100" style={{ textShadow: "#161523 1px 0 10px" }}>
              De alumnos para alumnos.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <div className="grid grid-cols-3 justify-between w-11/12 my-6 max-w-7xl text-center">
          <div className="bg-white rounded-lg p-4 flex-1 mr-4 flex flex-col items-center border shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{totalTutores}</h2>
            <p className="sm:text-lg">Tutores registrados</p>
          </div>
          <div className="bg-white rounded-lg p-4 flex-1 mr-4 flex flex-col items-center border shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{totalCursos}</h2>
            <p className="sm:text-lg">Cursos disponibles</p>
          </div>
          <div className="bg-white rounded-lg p-4 flex-1 flex flex-col items-center border shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{totalAlumnos}</h2>
            <p className="sm:text-lg">Alumnos registrados</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 my-10 w-11/12 flex flex-col items-center justify-center max-w-screen-md  border shadow-md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Sobre nosotros</h2>
          <p className="text-base md:text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem cum inventore obcaecati
            facere! Non optio ullam labore delectus minima dolorem atque suscipit nihil? Impedit
            minima, debitis recusandae harum explicabo ipsum. Libero, iusto, consequatur rerum,
            quidem eum nam veniam omnis placeat voluptas itaque at dolor? Debitis temporibus quas
            repellat adipisci. Exercitationem pariatur fugiat minima praesentium earum delectus
            dicta animi quos laborum incidunt necessitatibus, voluptate deleniti et eaque quo
            reiciendis unde itaque modi! Iusto natus fugit odio expedita aut eligendi ullam corporis
            incidunt temporibus saepe ratione pariatur consectetur, at perferendis, rem velit esse,
            debitis nihil iste aperiam vero dolorem? Adipisci, error voluptatem?
          </p>
        </div>
      </section>

      <Footer/>
    </div>
  )
}
