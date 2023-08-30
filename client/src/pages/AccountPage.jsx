import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate } from "react-router-dom"
import COM_Sidebar from "../components/COM_Sidebar"

import { Button } from 'flowbite-react';

export default function AccountPage() {
    const { ready, user } = useContext(UserContext)

    if (!ready) {
        return 'Cargando...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    return (
        <>
            <COM_Sidebar></COM_Sidebar>
            <div className="p-4 sm:ml-64">
                <p>página para {user?.name}</p>
            </div>
        </>
    )
}