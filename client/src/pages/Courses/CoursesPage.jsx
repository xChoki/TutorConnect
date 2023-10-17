import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon_Plus } from "../../assets/Icons/"
import SideBar from "../../components/SideBar"
import axios from "axios"

import { Toaster, toast } from "sonner"

import useWindowDimensions from "../../hooks/useWindowDimensions"

import { validateRoles } from "../../scripts/ValidateRoles"

import CoursesCard from "../../components/Cards/CoursesCard"
import { useSidebarState } from "../../hooks/useSidebarState"

export default function CoursesPage() {
  const [courses, setCourses] = useState([])

  const [open, setOpen] = useSidebarState()
  
  const { width } = useWindowDimensions()

  useEffect(() => {
    axios.get("/cursos").then(({ data }) => {
      setCourses(data)
      // console.log(courses)
    })
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem("showeditmsg") == "1") {
      toast.success("El curso ha sido editado correctamente.")
      sessionStorage.removeItem("showeditmsg")
    }
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem("showcreatemsg") == "1") {
      toast.success("El curso ha sido creado correctamente.")
      sessionStorage.removeItem("showcreatemsg")
    }
  }, [])

  const allowedRoles = [2002, 2003, 5001]

  const ValidateResult = validateRoles({ allowedRoles })
  //console.log("resultado: " + ValidateResult)

  return (
    <div className={`${open ? "ml-72" : "ml-20"}`}>
      <SideBar open={open} setOpen={setOpen} />

      <Toaster position="top-center" />

      {ValidateResult && (
        <section className="m-10">
          <Link
            className="inline-block py-16 px-20 rounded-lg text-lg border hover:bg-gray-100"
            to="/portal/cursos/nuevo"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="text-center flex">
              <Icon_Plus />
              <span className="pl-2">Agregar curso</span>
            </div>
          </Link>
        </section>
      )}

      {/* {console.log(courses)} */}
      <section className="flex flex-wrap lg-mx-1">
        {courses?.length > 0 &&
          courses?.map((course) => (
            <div key={course._id} className="w-96 h-60 mb-20 mx-5">
              <CoursesCard width={width} course={course} />
            </div>
          ))}
      </section>
    </div>
  )
}
