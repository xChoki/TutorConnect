import { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'

import ReactECharts from 'echarts-for-react'

export default function TutorChartMeanByHomework() {
  const { auth } = useAuth()

  const [courseMeanByHomework, setCourseMeanByHomework] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [chartCourseName, setChartCourseName] = useState('Sin seleccionar')

  useEffect(() => {
    axios
      .get('/cuenta/tutor/gradesmean/' + auth.id)
      .then((response) => {
        setCourseMeanByHomework(response.data)
      })
      .catch((error) => {
        console.error('Error fetching counts:', error)
      })
  }, [selectedCourse])

  const [chartCourseMeanByHomework, setChartCourseMeanByHomework] = useState({
    // Initial options for the chart
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

    if (courseMeanByHomework) {
      const selectedCourseData = courseMeanByHomework.find(
        (course) => course.courseName === chartCourseName
      )

      // Extract progress data for the selected course
      const cuentaData = selectedCourseData?.homeworks.map((homework) => ({
        name: homework.fileName.split('____').pop(),
        value: homework.averageScore || 0,
      }))

      // Update the chart options with the new data
      setChartCourseMeanByHomework((prevOptions) => ({
        ...prevOptions,
        xAxis: {
          type: 'category',
          data: cuentaData.map((item) => item.name),
        },
        series: [
          {
            name: 'Promedio de notas',
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
  }, [selectedCourse])

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
    <div className='border rounded-md my-10 shadow-md'>
      <div className='p-4'>
        <h2 className='text-3xl font-semibold mb-10 text-center'>
          Rendimiento de cursos por tarea
        </h2>
        <hr className='mb-5' />
        <div className='md:flex divide-x justify-center'>
          <div className={`md:w-1/2 mb-4 md:mb-0 ${selectedCourse && 'pr-4'} max-w-xs`}>
            <h3 className='text-lg font-semibold mb-2'>Selecciona tu curso:</h3>
            {courseMeanByHomework && courseMeanByHomework?.length > 0 && (
              <ul
                className={`${
                  window.innerWidth < 768
                    ? 'flex gap-2 overflow-x-hidden'
                    : 'flex-col overflow-y-auto'
                } text-left`}
              >
                {courseMeanByHomework.map((course) => (
                  <li
                    key={course.courseName}
                    className={`cursor-pointer hover:bg-gray-200 rounded-md p-2 flex items-center ${
                      selectedCourse === course.courseId && 'font-bold'
                    }`}
                    onClick={() => {
                      setSelectedCourse(course.courseId)
                      setChartCourseName(course.courseName)
                    }}
                  >
                    {course.courseName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className='md:w-1/2 pl-4'>
            <h3 className='text-center text-xl font-semibold'>{chartCourseName}</h3>
            <ReactECharts
              option={chartCourseMeanByHomework}
              onChartReady={onChartReady}
              loadingOption={loadingOption}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
