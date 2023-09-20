import { useState } from "react"
import { NavLink, Navigate, useParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import {
  Icon_Alumnos,
  Icon_Cursos,
  Icon_Home,
  Icon_Logout,
  Icon_Mensajes,
  Arrow_Control,
} from "../assets/Icons"

import axios from "axios"

export default function SideBar({ open, setOpen }) {
  const [redirect, setRedirect] = useState(null)
  const { ready, auth, setAuth } = useAuth()

  let { subpage } = useParams()

  if (subpage === undefined) {
    subpage = "portal"
  }

  if (!ready) {
    return "Cargando..."
  }

  if (ready && !auth) {
    return <Navigate to={"/login"} />
  }

  function link_Classes(type = null) {
    let classes =
      "flex items-center p-2 my-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"

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
      default:
        break
    }

    return classes
  }

  async function logout() {
    var result = window.confirm("¿Seguro que desea cerrar sesión?")
    if (result === true) {
      await axios.post("/logout")
      setRedirect("/")
      setAuth(null)
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

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

                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 flex-1 ml-3 `}
                >
                  Inicio
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/portal/alumnos"}
                className={link_Classes("alumnos")}
              >
                <Icon_Alumnos />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 flex-1 ml-3`}
                >
                  Alumnos
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/portal/cursos"} className={link_Classes("cursos")}>
                <Icon_Cursos />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 flex-1 ml-3 `}
                >
                  Cursos
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/portal/mensajes"}
                className={link_Classes("mensajes")}
              >
                <Icon_Mensajes />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 flex-1 ml-3 `}
                >
                  Mensajes
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={logout} className={link_Classes("logout")}>
                <Icon_Logout />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 flex-1 ml-3 `}
                >
                  Cerrar sesión
                </span>
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </>
  )
}
