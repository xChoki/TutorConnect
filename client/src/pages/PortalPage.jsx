import SideBar from '../components/Navigation/SideBar'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { validateRoles } from '../scripts/ValidateRoles'
import { useSidebarState } from '../hooks/useSidebarState'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

import axios from 'axios'
import CoursesCard from '../components/Cards/CoursesCard'
import useWindowDimensions from '../hooks/useWindowDimensions'
import StudentChartsSection from '../components/Students/StudentChartsSection'

export default function PortalPage() {
  const { auth } = useAuth()
  const [open, setOpen] = useSidebarState()
  const [courses, setCourses] = useState([])
  const { width } = useWindowDimensions()

  const allowedRoles = [2002, 2003, 5001]
  const ValidateRoles = validateRoles({ allowedRoles })

  useEffect(() => {
    if (sessionStorage.getItem('showloginmsg') == '1') {
      toast.success(`Bienvenido ${auth.userName}!`)
      sessionStorage.removeItem('showloginmsg')
    }

    document.title = 'TutorConect | Portal'
  }, [])

  useEffect(() => {
    axios.get('/student/courses').then(({ data }) => {
      setCourses(data)
    })
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('showapplicationsmsg') == '1') {
      toast.success('Aplicación enviada exitosamente')
      sessionStorage.removeItem('showapplicationsmsg')
    }
  }, [])

  const coursesStudentIsIn = []

  // Check if the student is in any of the courses
  courses.forEach((course) => {
    const courseStudents = course.courseStudents
    const isUserInCourse = courseStudents.some((student) => student.student_id === auth.id)

    if (isUserInCourse) {
      coursesStudentIsIn.push(course._id) // Push the course ID to the array
    }
  })

  return (
    <div className='grid grid-cols-[auto,1fr] container mx-auto'>
      <SideBar open={open} setOpen={setOpen} />

      <Toaster position='top-center' />

      <section className={`${open ? 'ml-72' : 'ml-20'} p-7`}>
        <div className='text-center my-5'>
          <span className='font-semibold text-3xl'> ¡Hola {auth.userName}!</span>
        </div>

        <div className='text-center my-10'>
          <h2 className='font-semibold text-3xl'> Tus cursos </h2>
        </div>

        <section className='flex flex-wrap lg-mx-1 ml-5 justify-center'>
          {courses?.length > 0 &&
            courses
              .filter((course) => !coursesStudentIsIn.includes(course._id))
              .map((course) => (
                <div key={course._id} className='w-96 h-60 mb-20 mx-5'>
                  <CoursesCard width={width} course={course} />
                </div>
              ))}
        </section>

        <hr className='my-10' />

        {!validateRoles && <StudentChartsSection />}

        {!ValidateRoles && (
          <section className='m-10'>
            <Link
              className='font-semibold inline-block py-16 px-20 rounded-lg text-lg border hover:bg-gray-100'
              to='/portal/solicitudes/detalles'
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className='text-center'>
                <span className='pl-2'>¿Deseas ser tutor?</span>
                <p>Presiona aquí para saber más y postular.</p>
              </div>
            </Link>
          </section>
        )}
      </section>
    </div>
  )
}
