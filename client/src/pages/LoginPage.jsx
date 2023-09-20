import axios from "axios"
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function LoginPage() {
  // VARIABLES
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  const { setAuth } = useAuth()

  async function LoginSubmit(ev) {
    ev.preventDefault()
    try {
      const response = await axios.post("/login", { userEmail, userPassword })

      if (response.data && response.data.userEmail) {
        // Assuming the server sends a user object in the response
        setAuth(response.data)
        console.log(response.data)
        setRedirect(true)
      } else {
        alert(
          "El inicio de sesión ha fallado. Por favor, verifique sus credenciales."
        )
      }
    } catch (e) {
      alert("El inicio de sesión ha fallado, intentelo nuevamente." + e)
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="mt-32 grow flex items-center justify-around">
      <div className=" mb-64">
        <h1 className="text-4xl text-center mb-16">Inicio de sesión</h1>

        <form className="" onSubmit={LoginSubmit}>
          <input
            type="email"
            placeholder="mail@mail.com"
            value={userEmail}
            onChange={(ev) => setUserEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={userPassword}
            onChange={(ev) => setUserPassword(ev.target.value)}
          />
          <button className="buttonLogin mt-2 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300">
            Iniciar sesión
          </button>
          <div className="text-center py-2 text-gray-500">
            ¿No tienes cuenta aún?{" "}
            <Link className="underline text-black" to={"/register"}>
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
