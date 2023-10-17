import axios from "axios"
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Modal from "../../components/Modal"
import { Toaster, toast } from "sonner"

export default function LoginPage() {
  // VARIABLES
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(false)

  const { setAuth } = useAuth()

  async function LoginSubmit(ev) {
    ev.preventDefault()
    try {
      const response = await axios.post("/login", { userEmail, userPassword })

      if (!response.data && !response.data.userEmail) {
        toast.error("Usuario o contraseña erróneos.")
        setStatus(false)
        return
      }

      // Assuming the server sends a user object in the response
      setAuth(response.data)
      setStatus(true)
      toast.success("Sesión iniciada correctamente.")
      setRedirect(true)
      //console.log(response.data)
      // setOpen(true)
    } catch (e) {
      // alert("El inicio de sesión ha fallado, intentelo nuevamente." + e)
      toast.error("Usuario o contraseña erróneos.")
    }
  }

  if (redirect) {
    return <Navigate to={"/portal"} />
  }

  return (
    <>
      <Toaster position="top-center" />
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

          {status && (
            <Modal open={open} onClose={() => setOpen(false)} cancel={true} modalMargin={0}>
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="mx-auto my-4 w-full h-full">
                  <h3>¡Sesión iniciada correctamente!</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Presiona continuar para redireccionar a tu portal.
                  </p>
                </div>

                <div className="gap-4 mt-7">
                  <button
                    className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={() => {
                      setOpen(false)
                      setRedirect(true)
                    }}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  )
}
