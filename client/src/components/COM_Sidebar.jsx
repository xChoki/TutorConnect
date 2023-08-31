/*

    ESTE ARCHIVO NO ESTÁ EN USO, DA PROBLEMAS POR LO QUE SE MOVIÓ A PortalPage,
    Más adelante se trabaja con esto

*/

import { Link, Navigate, useParams } from "react-router-dom";
import { Icon_Alumnos, Icon_Cursos, Icon_Home, Icon_Logout, Icon_Mensajes } from "../assets/Icons";
import axios from "axios";
import { useState } from "react";

export default function COM_Sidebar() {
    const [redirect, setRedirect] = useState(null) 

    let { subpage } = useParams()

    //console.log(subpage)

    if(subpage === undefined){
        subpage = 'portal'
    }

    function linkClasses(type = null) {
        let classes = 'flex items-center p-2 py-5 my-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group'
        if (type === subpage) {
            classes += ' bg-gray-200'
        }
        return classes
    }

    async function logout(){
        await axios.post('/logout')
        setRedirect('/login')
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 pt-32 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to={'/portal'} className={linkClasses('inicio')}>
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
    )
}