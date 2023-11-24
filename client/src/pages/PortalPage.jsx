import SideBar from '../components/Navigation/SideBar'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { validateRoles } from '../scripts/ValidateRoles'
import { useSidebarState } from '../hooks/useSidebarState'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

import axios from 'axios'
import StudentChartsSection from '../components/Students/StudentChartsSection'
import { Icon_Eye } from '../assets/Icons'

export default function PortalPage() {
  const { auth } = useAuth()
  const [open, setOpen] = useSidebarState()
  const [courses, setCourses] = useState([])

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
    // Check if userRoles exist and if Admin, Tutor, or Teacher roles are present
    let endpoint
    if (
      !(
        auth.userRoles &&
        (auth.userRoles.Admin === 5001 ||
          auth.userRoles.Tutor === 2002 ||
          auth.userRoles.Teacher === 2003)
      )
    ) {
      // Fetch courses for non-Admin, non-Tutor, non-Teacher users
      endpoint = '/student/courses/registered'
    } else {
      endpoint = '/courses'
    }
    axios
      .get(endpoint)
      .then(({ data }) => {
        setCourses(data)
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setCourses([])
        } else {
          console.error('An error occurred:', error)
        }
      })
  }, [auth])

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
    <div className={`${open ? 'ml-72' : 'ml-20'}`}>
      <SideBar open={open} setOpen={setOpen} />

      <Toaster position='top-center' />

      <section className={`flex-1`}>
        <div className='text-center my-5'>
          <span className='font-semibold text-3xl'> ¡Hola {auth.userName}!</span>
        </div>

        <div className='text-center my-10'>
          <h2 className='font-semibold text-3xl'> Tus cursos </h2>
        </div>
        <section className='flex flex-wrap justify-center mb-20'>
          {courses?.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className='w-full mb-2 px-4 flex justify-center'>
                <Link
                  to={'/portal/cursos/' + course._id}
                  className='flex jutify-between p-4 border rounded-md w-full justify-between max-w-4xl hover:bg-gray-50 hover:cursor-pointer'
                >
                  <span className='font-semibold'>{course.courseName}</span>
                  <Icon_Eye />
                </Link>
              </div>
            ))
          ) : ValidateRoles ? (
            <section className='m-10'>
              <Link
                className='font-semibold inline-block py-16 px-20 rounded-lg text-lg border hover:bg-gray-100'
                to='/portal/cursos/nuevo'
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <div className='text-center'>
                  <span className='pl-2'>No tienes cursos creados.</span>
                  <p>Presiona aquí para crear uno.</p>
                </div>
              </Link>
            </section>
          ) : (
            <section className='m-10'>
              <Link
                className='font-semibold inline-block py-16 px-20 rounded-lg text-lg border hover:bg-gray-100'
                to='/portal/cursos/registrar'
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <div className='text-center'>
                  <span className='pl-2'>No estás registrado en ningún curso.</span>
                  <p>Presiona aquí para registrarte en uno.</p>
                </div>
              </Link>
            </section>
          )}
        </section>

        {!ValidateRoles && <StudentChartsSection />}

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
