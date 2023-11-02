import { useEffect, useState } from "react"
import SideBar from "../../components/Navigation/SideBar"
import { useSidebarState } from "../../hooks/useSidebarState"
import ReactEcharts from "echarts-for-react"
import axios from "axios"

export default function ApplicationsGraphPage() {
  const [open, setOpen] = useSidebarState()

  const [totalTutores, setTotalTutores] = useState(0)
  const [totalAlumnos, setTotalAlumnos] = useState(0)

  useEffect(() => {
    axios
      .get("/cuenta")
      .then((response) => {
        setTotalTutores(response.data.tutorCount)
        setTotalAlumnos(response.data.studentCount)
      })
      .catch((error) => {
        console.error("Error fetching counts:", error)
      })

    document.title = "TutorConnect"
  }, [])

  const option_solicitudes = {
    xAxis: {
      type: "category",
      data: ["En proceso", "Aceptadas", "Rechazadas"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [3, 5, 2],
        type: "bar",
      },
    ],
  }

  const option_cursos = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [1, 2, 0, 0, 5, 3, 0],
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  }

  const option_usuarios = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Distribución de roles",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: totalTutores, name: "Tutores" },
          { value: totalAlumnos, name: "Alumnos" },
        ],
      },
    ],
  }

  return (
    <div className={`${open ? "ml-72" : "ml-20"} pt-6`}>
      <SideBar open={open} setOpen={setOpen} />

      <section className="m-10 container mx-auto">
        <h1 className="text-4xl md:text-5xl">Gráficos</h1>

        <div className="max-w-7xl my-5">
          <h2 className="text-2xl mb-2"> Cantidad de solicitudes </h2>
          <ReactEcharts option={option_solicitudes} />
        </div>
        <div className="max-w-7xl my-5">
          <h2 className="text-2xl mb-2"> Cantidad de cursos inscritos semanalmente </h2>
          <ReactEcharts option={option_cursos} />
        </div>
        <div className="max-w-7xl my-5">
          <h2 className="text-2xl mb-2"> Distribución de usuarios </h2>
          <ReactEcharts option={option_usuarios} />
        </div>
      </section>
    </div>
  )
}
