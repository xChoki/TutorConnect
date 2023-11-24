import { useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'

import ReactECharts from 'echarts-for-react'

export default function StudentChartsSection() {
  const { auth } = useAuth()
  const [studentProgressData, setStudentProgressData] = useState([])

  useEffect(() => {
    axios.get('/student/course/progress/' + auth.id).then((response) => {
      setStudentProgressData(response.data)
    })
  }, [auth.id])

  const [selectedCourse, setSelectedCourse] = useState(
    studentProgressData.length > 0 ? studentProgressData[0].courseId : ''
  )
  const [chartCourseName, setChartCourseName] = useState('Sin seleccionar')

  const [chartOptions, setChartOptions] = useState({
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
    const selectedCourseData = studentProgressData.find(
      (course) => course.courseId === selectedCourse
    )

    if (selectedCourseData) {
      // Extract progress data for the selected course
      const progressData = selectedCourseData.progress.map((progress) => ({
        name: progress.progressFile.fileName.split('____').pop(),
        value: progress.progressScore || 0, // Use progress score as the Y-axis value
      }))

      // Update the chart options with the new data
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xAxis: {
          type: 'category',
          data: progressData.map((item) => item.name),
        },
        series: [
          {
            name: 'Progress Score',
            type: 'line',
            data: progressData,
          },
        ],
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
      }))
    }
  }, [selectedCourse, studentProgressData])

  return (
    <>
      <section className='w-full mx-auto bg-gray-50 shadow-md overflow-hidden'>
        <div className='p-4'>
          <h2 className='text-3xl font-semibold mb-10 text-center'>Mi rendimiento</h2>
          <hr className='mb-5' />
          <div className='md:flex divide-x justify-center'>
            <div className={`md:w-1/2 mb-4 md:mb-0 ${selectedCourse && 'pr-4'} max-w-xs`}>
              <h3 className='text-lg font-semibold mb-2'>Selecciona tu curso:</h3>
              {studentProgressData && studentProgressData?.length > 0 && (
                <ul
                  className={`${
                    window.innerWidth < 768
                      ? 'flex gap-2 overflow-x-hidden'
                      : 'flex-col overflow-y-auto'
                  } text-left`}
                >
                  {studentProgressData.map((course) => (
                    <li
                      key={course.courseId}
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
              {/* <h3 className='text-lg font-semibold mb-2'>Datos</h3> */}
              <h3 className='text-center text-xl font-semibold'>{chartCourseName}</h3>
              <ReactECharts option={chartOptions} />
              {/* Add other content based on the selected course */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
