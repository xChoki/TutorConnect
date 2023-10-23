import { useEffect, useState } from "react"
import SideBar from "../../components/Navigation/SideBar"
import { useSidebarState } from "../../hooks/useSidebarState"
import axios from "axios"
import CoursesCard from "../../components/Cards/CoursesCard"
import useWindowDimensions from "../../hooks/useWindowDimensions"

export default function StudentsCoursePage() {
  const [open, setOpen] = useSidebarState()
  const [courses, setCourses] = useState([])
  const { width } = useWindowDimensions()

  useEffect(() => {
    axios.get("/student/cursos").then(({ data }) => {
      setCourses(data)
    })
  }, [])

  return (
    <div className={`${open ? "ml-72" : "ml-20"}`}>
      <SideBar open={open} setOpen={setOpen} />
      <section className="m-10">
        <section className="flex flex-wrap lg-mx-1">
          {courses?.length > 0 &&
            courses?.map((course) => (
              <div key={course._id} className="w-96 h-60 mb-20 mx-5">
                <CoursesCard width={width} course={course} />
              </div>
            ))}
        </section>
      </section>
    </div>
  )
}
