import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom"

import { Icon_Alumnos, Icon_Cursos, Icon_Home, Icon_Logout, Icon_Mensajes } from "../assets/Icons";
import axios from "axios";

export default function PortalPage() {
    const [redirect, setRedirect] = useState(null)
    const { ready, user, setUser } = useContext(UserContext)

    let { subpage } = useParams()

    if (subpage === undefined) {
        subpage = 'portal'
    }

    if (!ready) {
        return 'Cargando...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    function linkClasses(type = null) {
        let classes = 'flex items-center p-2 py-5 my-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group'
        if (type === subpage) {
            classes += ' bg-gray-200'
        }
        return classes
    }

    async function logout() {
        var result = confirm("¿Seguro que desea cerrar sesión?");
        if (result == true) {
            await axios.post('/logout')
            setRedirect('/')
            setUser(null)
        } else {
            return
        }
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    //const {subpage} = useParams()


    return (
        <>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 pt-32 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to={'/portal'} className={linkClasses('portal')}>
                                <Icon_Home />
                                <span className="flex-1 ml-3 whitespace-nowrap">Inicio</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/portal/alumnos'} className={linkClasses('alumnos')}>
                                <Icon_Alumnos />
                                <span className="flex-1 ml-3 whitespace-nowrap">Alumnos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/portal/cursos'} className={linkClasses('cursos')}>
                                <Icon_Cursos />
                                <span className="flex-1 ml-3 whitespace-nowrap">Cursos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/portal/mensajes'} className={linkClasses('mensajes')}>
                                <Icon_Mensajes />
                                <span className="flex-1 ml-3 whitespace-nowrap">Mensajes</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={logout} className={linkClasses('logout')}>
                                <Icon_Logout />
                                <span className="flex-1 ml-3 whitespace-nowrap">Cerrar sesión</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <section className="p-4 sm:ml-64">
                {subpage === 'portal' && (
                    <div className="">
                        <span> Hola {user.name}!</span>
                    </div>
                )}
            </section>
        </>
    )
}