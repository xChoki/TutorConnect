import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import ReactECharts from 'echarts-for-react'

export default function TutorChartMeanByCourse() {
  const { auth } = useAuth()

  const [gradesMeanByCourse, setGradesMeanByCourse] = useState([])
  useEffect(() => {
    axios
      .get('/cuenta/tutor/gradesmeanpercourse/' + auth.id)
      .then((response) => {
        setGradesMeanByCourse(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [auth])

  const [chartOptions, setChartOptions] = useState({
    title: {
      text: 'Promedio de notas por curso',
      subtext: '',
      x: 'center',
      y: 'top',
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
        name: 'Promedio de notas',
        type: 'bar',
        data: [],
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
  })

  useEffect(() => {
    // Check if there is data to display
    if (gradesMeanByCourse && gradesMeanByCourse.length > 0) {
      const courseNames = gradesMeanByCourse.map((course) => course.courseName)
      const averageScores = gradesMeanByCourse.map((course) => course.averageScore)

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xAxis: {
          type: 'category',
          data: courseNames,
        },
        series: [
          {
            name: 'Average Score',
            type: 'bar',
            data: averageScores,
          },
        ],
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
      }))
    }
  }, [gradesMeanByCourse])

  let timer

  useEffect(() => {
    return () => clearTimeout(timer)
  })

  const loadingOption = {
    text: 'Cargando datos...',
    color: '#4413c2',
    textColor: '#270240',
    maskColor: 'rgba(194, 88, 86, 0.3)',
    zlevel: 0,
  }

  function onChartReady(echarts) {
    timer = setTimeout(function () {
      echarts.hideLoading()
    }, 3000)
  }

  return (
    <ReactECharts
      option={chartOptions}
      onChartReady={onChartReady}
      loadingOption={loadingOption}
      className='w-full h-full'
    />
  )
}
