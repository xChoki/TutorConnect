import { useEffect, useState } from "react"
import SideBar from "../../components/Navigation/SideBar"
import { useSidebarState } from "../../hooks/useSidebarState"
import axios from "axios"
import CoursesCard from "../../components/Cards/CoursesCard"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import useAuth from "../../hooks/useAuth"

export default function StudentsCoursePage() {
  const [open, setOpen] = useSidebarState()
  const [courses, setCourses] = useState([])
  const { width } = useWindowDimensions()

  const { auth } = useAuth()

  useEffect(() => {
    axios.get("/student/courses").then(({ data }) => {
      setCourses(data)
    })
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
    <div className={`${open ? "ml-72" : "ml-20"} container mx-auto`}>
      <SideBar open={open} setOpen={setOpen} />
      <section className="m-10">
        <section className="flex flex-wrap lg-mx-1">
          {courses?.length > 0 &&
            courses
              .filter((course) => !coursesStudentIsIn.includes(course._id))
              .map((course) => (
                <div key={course._id} className="w-96 h-60 mb-20 mx-5">
                  <CoursesCard width={width} course={course} />
                </div>
              ))}
        </section>
      </section>
    </div>
  )
}
