import { useEffect, useState } from "react"
import { NavLink, Navigate, useParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import { validateRoles } from "../scripts/ValidateRoles"
import useWindowDimensions from "../hooks/useWindowDimensions"

import {
  Icon_Alumnos,
  Icon_Cursos,
  Icon_Home,
  Icon_Logout,
  Icon_Mensajes,
  Arrow_Control,
  Icon_Letter,
} from "../assets/Icons"

import axios from "axios"
import Modal from "./Modal"

export default function SideBar({ open, setOpen }) {
  const [redirect, setRedirect] = useState(null)
  const { setAuth } = useAuth()

  const [openModal, setOpenModal] = useState(false)

  const { width } = useWindowDimensions()

  let { subpage } = useParams()

  const [windowWidth, setWindowWidth] = useState(width)

  useEffect(() => {
    setWindowWidth(width)
    if (width < 1000) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [width])

  // useEffect(() => {
  //   function handleResize() {
  //     setOpen(window.innerWidth >= 1000)
  //   }

  //   window.addEventListener("resize", handleResize)

  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [])

  if (subpage === undefined) {
    subpage = "portal"
  }

  function link_Classes(type = null) {
    let classes =
      "flex items-center p-2 my-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"

    // Detecting the application id to later verify it for later className usage
    const path = window.location.pathname
    const match = path.match(/\/portal\/solicitudes\/(\w+)/)
    const id = match ? match[1] : ""

    switch (type) {
      case subpage:
        if (window.location.pathname === "/portal") {
          classes += " bg-gray-200"
        }
        break
      case "cursos":
        if (window.location.pathname === "/portal/cursos") {
          classes += " bg-gray-200"
        }
        break
      case "alumnos":
        if (window.location.pathname === "/portal/alumnos") {
          classes += " bg-gray-200"
        }
        break
      case "mensajes":
        if (window.location.pathname === "/portal/mensajes") {
          classes += " bg-gray-200"
        }
        break
      case "solicitudes":
        if (
          window.location.pathname === "/portal/solicitudes" ||
          window.location.pathname === "/portal/solicitudes/detalles" ||
          window.location.pathname === "/portal/solicitudes/nuevo" ||
          window.location.pathname === "/portal/solicitudes/" + id
        ) {
          classes += " bg-gray-200"
        }
        break
      default:
        break
    }

    return classes
  }

  async function logout() {
    // var result = window.confirm("¿Seguro que desea cerrar sesión?")
    // if (result === true) {
    await axios.post("/logout")
    setOpenModal(true)
    setRedirect("/")
    setAuth(null)
    // }
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  let allowedRoles = [2002, 2003, 5001]
  const ValidateResultTeaAdmTut = validateRoles({ allowedRoles })
  allowedRoles = [2003, 5001]
  const ValidateResultTeaAdm = validateRoles({ allowedRoles })

  return (
    <>
      <div style={{ position: "relative", zIndex: 1 }}>
        <aside
          className={`${
            open ? "w-72" : "w-20"
          } h-full sticky top-0 duration-300 p-5 pt-32 bg-gray-50 dark:bg-gray-800`}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 0,
          }}
        >
          <div className="flex gap-x-4 items-center">
            <NavLink className={link_Classes()}>
              <Arrow_Control open={open} onClick={() => setOpen(!open)} />
            </NavLink>
          </div>

          <ul className="pt-6 py-5">
            <li>
              <NavLink to={"/portal"} className={link_Classes("portal")}>
                <Icon_Home />

                <span className={`${!open && "hidden"} origin-left duration-200 flex-1 ml-3 `}>
                  Inicio
                </span>
              </NavLink>
            </li>

            {ValidateResultTeaAdmTut && (
              <li>
                <NavLink to={"/portal/alumnos"} className={link_Classes("alumnos")}>
                  <Icon_Alumnos />
                  <span className={`${!open && "hidden"} origin-left duration-200 flex-1 ml-3`}>
                    Alumnos
                  </span>
                </NavLink>
              </li>
            )}

            {ValidateResultTeaAdm && (
              <li>
                <NavLink to={"/portal/solicitudes"} className={link_Classes("solicitudes")}>
                  <Icon_Letter />
                  <span className={`${!open && "hidden"} origin-left duration-200 flex-1 ml-3`}>
                    Solicitudes
                  </span>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to={"/portal/cursos"} className={link_Classes("cursos")}>
                <Icon_Cursos />
                <span className={`${!open && "hidden"} origin-left duration-200 flex-1 ml-3 `}>
                  Cursos
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/portal/mensajes"} className={link_Classes("mensajes")}>
                <Icon_Mensajes />
                <span className={`${!open && "hidden"} origin-left duration-200 flex-1 ml-3 `}>
                  Mensajes
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setOpenModal(true)} className={link_Classes("logout")}>
                <Icon_Logout />
                <span className={`${!open && "hidden"} origin-left duration-200 flex-1 ml-3 `}>
                  Cerrar sesión
                </span>
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        cancel={true}
        modalMargin={open ? "72" : "20"}
      >
        <div className="flex flex-col items-center justify-center text-center h-full">
          <div className="mx-auto my-4 w-full h-full">
            <h3>¿Seguro que deseas cerrar sesión?</h3>
            <p className="text-sm text-gray-500 mt-2">
              Deberás ingresar tus datos nuevamente la siguiente vez que desees entrar.
            </p>
          </div>

          <div className="gap-4 mt-7">
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={() => {
                setOpenModal(false)
                logout()
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
