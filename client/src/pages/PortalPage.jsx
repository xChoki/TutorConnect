import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import {  Navigate, useParams } from "react-router-dom"



//import { Icon_Alumnos, Icon_Cursos, Icon_Home, Icon_Logout, Icon_Mensajes, Arrow_Control } from "../assets/Icons";
//import axios from "axios";
import COM_Side_Bar from "../components/COM_Side_Bar";
import CoursesPage from "../pages/CoursesPage";



export default function PortalPage() {
    const [redirect, setRedirect] = useState(null)
    const { ready, user, setUser } = useContext(UserContext)
 
    //const [open, setOpen] = useState(true);

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
    
    if (redirect) {
        return <Navigate to={redirect} />
    }

    //const {subpage} = useParams()

    

    return (
        <div className="flex">

                <COM_Side_Bar />

                <>
                    {subpage === 'portal' && (
                        <section className="p-4 flex-1 h-screen ">
                            <span> Hola {user.name}!</span>
                        </section>
                    )}
                    {subpage === 'cursos' && (
                        <section className="p-4 flex-1 h-screen ">
                            <CoursesPage/>
                        </section>
                    )}
                </>
                

            </div>
    )
}

