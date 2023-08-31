import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Icon_Cancel } from "../assets/Icons"

export default function PortalFormPage() {
    const [course_name, setCourse_name] = useState('')
    const [course_description, setCourse_description] = useState('')
    const [course_extrainfo, setCourse_extrainfo] = useState('')
    const [course_neurodiv, setCourse_neurodiv] = useState('')

    function handleCbClick(ev) {
        setCourse_neurodiv(ev.target.checked)
        console.log(ev.target.checked)
    }

    async function addCourse(ev) {
        ev.preventDefault()
        const { data: courseData } =
            await axios.post('/cursos', {
                course_name, course_description, course_extrainfo, course_neurodiv
            })
    }

    return (
        <>
            <div className="text-center mb-10">
                <Link className="inline-flex py-16 px-20 rounded-lg text-lg border hover:bg-gray-100" to={'/portal/cursos'}>
                    <Icon_Cancel />
                    <span className="pl-2">Cancelar</span>
                </Link>
            </div>

            <form onSubmit={addCourse}>
                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="course_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del curso</label>
                    <input
                        type="text"
                        id="course_name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder=""
                        required
                        value={course_name}
                        onChange={ev => setCourse_name(ev.target.value)} />
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="course_description" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Descripción del curso</label>
                    <textarea
                        id="course_description"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Describe tu curso..."
                        required
                        value={course_description}
                        onChange={ev => setCourse_description(ev.target.value)}></textarea>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="course_extrainfo" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Información extra (opcional)</label>
                    <textarea
                        id="course_extrainfo"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Deja un comentario..."
                        value={course_extrainfo}
                        onChange={ev => setCourse_extrainfo(ev.target.value)}></textarea>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <input
                        id="course_neurodiv"
                        type="checkbox"
                        name="course_neurodiv"
                        onChange={handleCbClick}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label
                        htmlFor="course_neurodiv"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Estoy capacitado para alumnos neurodivergentes.</label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear curso</button>
            </form>

        </>
    )
}