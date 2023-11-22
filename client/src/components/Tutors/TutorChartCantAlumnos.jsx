import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'

export default function TutorChartCantAlumnos() {
  const { auth } = useAuth()

  const [cantAlumnosPorCurso, setCantAlumnosPorCurso] = useState(0)
  useEffect(() => {
    axios
      .get('/cuenta/tutor/studentcountpercourse/' + auth.id)
      .then((response) => {
        setCantAlumnosPorCurso(response.data)
      })
      .catch((error) => {
        console.error('Error fetching counts:', error)
      })
  }, [auth])

  const [chartCantAlumnosOptions, setChartCantAlumnosOptions] = useState({
    // Initial options for the chart
    title: {
      text: 'Cantidad de alumnos por curso',
      subtext: '',
      x: 'center',
      y: 'top',
    },
    grid: {
      top: '15%', // Adjust the top margin to make space for the legend
    },
    tooltip: {
      trigger: 'item',
    },
  })

  useEffect(() => {
    // Find the selected course progress data
    if (cantAlumnosPorCurso) {
      // Extract progress data for the selected course
      const cuentaData = cantAlumnosPorCurso?.map((cuenta) => ({
        name: cuenta.courseName,
        value: cuenta.studentCount || 0, // Use student count as the value for pie chart
      }))

      // Update the chart options with the new data
      setChartCantAlumnosOptions((prevOptions) => ({
        ...prevOptions,
        legend: {
          show: true,
          orient: 'vertical',
          left: 'left',
          top: 'middle',
          data: cuentaData.map((item) => item.name),
          formatter: function (name) {
            // Truncate the legend name to a specific length
            const maxLength = 10 // Adjust this value as needed
            return name.length > maxLength ? name.substring(0, maxLength) + '...' : name
          },
        },
        series: [
          {
            name: 'Cantidad de alumnos',
            type: 'pie',
            data: cuentaData.map((item) => ({
              name: item.name,
              value: item.value,
            })),
          },
        ],
        toolbox: {
          feature: {
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
    <ReactECharts
      option={chartCantAlumnosOptions}
      onChartReady={onChartReadyCantAlumnos}
      loadingOption={loadingOptionCantAlumnos}
      className='w-full h-full'
    />
  )
}
