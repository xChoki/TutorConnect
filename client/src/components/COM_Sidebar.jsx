import { Link } from "react-router-dom";
import { Icon_Alumnos, Icon_Cursos, Icon_Hamburger, Icon_Mensajes } from "../assets/Icons";

export default function COM_Sidebar() {
    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 pt-32 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to={'/'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <Icon_Alumnos />
                            <span className="flex-1 ml-3 whitespace-nowrap">Alumnos</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <Icon_Cursos />
                            <span className="flex-1 ml-3 whitespace-nowrap">Cursos</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <Icon_Mensajes />
                            <span className="flex-1 ml-3 whitespace-nowrap">Mensajes</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}