import React from "react";
import { Link, useParams } from "react-router-dom";
import { Icon_Plus } from "../assets/Icons/";
import { Icon_Cancel } from "../assets/Icons";
import PortalFormPage from "./PortalFormPage";

export default function CoursesPage() {
    const { action } = useParams()
    
    return (
        <>
            {action !== 'nuevo' && (
                <div className="text-center">
                    <Link className="inline-flex py-16 px-20 w-max rounded-lg text-lg border hover:bg-gray-100" to={'/portal/cursos/nuevo'}>
                        <Icon_Plus />
                        <span className="pl-2">Agregar curso</span>
                    </Link>
                </div>

            )}
            {action === 'nuevo' && (
                <PortalFormPage />
            )}
        </>
    );
}
