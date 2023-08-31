import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"

export default function LoginPage() {
    // VARIABLES
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [redirect, setRedirect] = useState(false)

    const { setUser } = useContext(UserContext)

    async function LoginSubmit(ev) {
        ev.preventDefault()
        try {
            const { data } = await axios.post('/login', { email, password })
            setUser(data)
            setRedirect(true)
        } catch (e) {
            alert('El inicio de sesión ha fallado, intentelo nuevamente.')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-32 grow flex items-center justify-around">

            <div className=" mb-64">
                <h1 className="text-4xl text-center mb-16">Inicio de sesión</h1>

                <form className="" onSubmit={LoginSubmit}>
                    <input type="email"
                        placeholder="mail@mail.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="buttonLogin mt-2 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300">Iniciar sesión</button>
                    <div className="text-center py-2 text-gray-500">
                        ¿No tienes cuenta aún? <Link className="underline text-black" to={'/register'}>Regístrate aquí</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}