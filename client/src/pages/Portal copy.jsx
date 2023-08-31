import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom"



import { Icon_Alumnos, Icon_Cursos, Icon_Home, Icon_Logout, Icon_Mensajes, Arrow_Control } from "../assets/Icons";
import axios from "axios";


export default function PortalPage() {
    const [redirect, setRedirect] = useState(null)
    const { ready, user, setUser } = useContext(UserContext)
    const [open, setOpen] = useState(true);

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
/** 
    function linkClasses(type = null) {
        let classes = 'flex items-center p-2 py-5 my-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group'
        if (type === subpage) {
            classes += ' bg-gray-200'
        }
        return classes
    }
*/
    function link_Classes(type = null) {
        let classes = 'flex items-center p-2 my-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group'
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
        <div className="flex">

            <aside className={`${open ? "w-72" : "w-20"} duration-300 p-5 pt-8 h-screen bg-gray-50 dark:bg-gray-800 relative`}>
            
                
                <div className="flex gap-x-4 items-center">
                    <Link className={link_Classes()}>
                        <Arrow_Control 
                            open={open} // Pasamos el estado open como prop
                            onClick={() => setOpen(!open)}
                        />
                    </Link>
                </div>
                
                <ul className="pt-6 py-5">
                   
                        <li>
                            <Link to={'/portal'} className={link_Classes('portal')}>
                                <Icon_Home/>

                                <span className={`${!open && 'hidden'} origin-left duration-200 flex-1 ml-3 `}>Inicio</span>
                            </Link>
                        </li> 

                        <li>
                            <Link to={'/portal/alumnos'} className={link_Classes('alumnos')}>
                                <Icon_Alumnos />
                                <span className={`${!open && 'hidden'} origin-left duration-200 flex-1 ml-3`}>Alumnos</span>
                            </Link>
                        </li>

                        <li>
                            <Link to={'/portal/cursos'} className={link_Classes('cursos')}>
                                <Icon_Cursos />
                                <span className={`${!open && 'hidden'} origin-left duration-200 flex-1 ml-3 `}>Cursos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/portal/mensajes'} className={link_Classes('mensajes')}>
                                <Icon_Mensajes />
                                <span className={`${!open && 'hidden'} origin-left duration-200 flex-1 ml-3 `}>Mensajes</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={logout} className={link_Classes('logout')}>
                                <Icon_Logout />
                                <span className={`${!open && 'hidden'} origin-left duration-200 flex-1 ml-3 `}>Cerrar sesión</span>
                            </Link>
                        </li>
                </ul>


            </aside>


                <section className="">
                    {subpage === 'portal' && (
                        <div className="p-7  font-semibold flex-1 h-screen ">
                            <span> Hola {user.name}!</span>
                        </div>
                    )}
                </section>

            </div>
    )
}

