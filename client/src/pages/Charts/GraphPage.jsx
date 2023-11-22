import { useEffect, useState } from 'react'
import SideBar from '../../components/Navigation/SideBar'
import { useSidebarState } from '../../hooks/useSidebarState'
import ReactECharts from 'echarts-for-react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'

export default function GraphPage() {
  const [open, setOpen] = useSidebarState()

  const { auth } = useAuth()

  const [cantAlumnosPorCurso, setCantAlumnosPorCurso] = useState(0)
  
  /**
   * Count of students per course
   */

  useEffect(() => {
    axios
      .get('/cuenta/tutor/studentcountpercourse/' + auth.id)
      .then((response) => {
        setCantAlumnosPorCurso(response.data)
      })
      .catch((error) => {
        console.error('Error fetching counts:', error)
      })

    document.title = 'TutorConnect | Gráficos'
  }, [auth])

  const [chartCantAlumnosOptions, setChartCantAlumnosOptions] = useState({
    // Initial options for the chart
    title: {
      text: 'Cantidad de alumnos por curso',
      subtext: '',
      x: 'center',
    },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Progress Score',
        type: 'line',
        data: [],
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  })

  useEffect(() => {
    // Find the selected course progress data

    if (cantAlumnosPorCurso) {
      // Extract progress data for the selected course
      const cuentaData = cantAlumnosPorCurso?.map((cuenta) => ({
        name: cuenta.courseName,
        value: cuenta.studentCount || 0, // Use progress score as the Y-axis value
      }))

      // Update the chart options with the new data
      setChartCantAlumnosOptions((prevOptions) => ({
        ...prevOptions,
        xAxis: {
          type: 'category',
          data: cuentaData.map((item) => item.name),
        },
        series: [
          {
            name: 'Cantidad de alumnos',
            type: 'line',
            data: cuentaData,
          },
        ],
        toolbox: {
          feature: {
            dataView: { readOnly: true },
            saveAsImage: {},
          },
        },
      }))
    }
  }, [cantAlumnosPorCurso])

  let timer

  useEffect(() => {
    return () => clearTimeout(timer)
  })

  const loadingOptionCantAlumnos = {
    text: 'Cargando datos...',
    color: '#4413c2',
    textColor: '#270240',
    maskColor: 'rgba(194, 88, 86, 0.3)',
    zlevel: 0,
  }

  function onChartReadyCantAlumnos(echarts) {
    timer = setTimeout(function () {
      echarts.hideLoading()
    }, 3000)
  }

  return (
    <div className={`${open ? 'ml-72' : 'ml-20'} pt-6`}>
      <SideBar open={open} setOpen={setOpen} />

      <section className='m-10 container mx-auto'>
        <h1 className='text-4xl md:text-4xl text-center'>Gráficos</h1>
        <div className='border rounded-md my-10 shadow-md'>
          <ReactECharts
            option={chartCantAlumnosOptions}
            onChartReady={onChartReadyCantAlumnos}
            loadingOption={loadingOptionCantAlumnos}
            className='p-5'
          />
        </div>
      </section>
    </div>
  )
}
