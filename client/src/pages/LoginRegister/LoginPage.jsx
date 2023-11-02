import axios from "axios"
import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Modal from "../../components/Modal"
import { Toaster, toast } from "sonner"

export default function LoginPage() {
  // VARIABLES
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  // const [rememberUser, setRememberUser] = useState(false)

  const [redirect, setRedirect] = useState(false)

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(false)

  const { setAuth } = useAuth()

  async function LoginSubmit(ev) {
    ev.preventDefault()
    try {
      const response = await axios.post("/login", { userEmail, userPassword })

      if (!response.data && !response.data.userEmail) {
        // toast.error("Usuario o contraseña erróneos.")
        setStatus(false)
        return
      }

      sessionStorage.setItem("showloginmsg", "1")
      setAuth(response.data)
      setStatus(true)
      setRedirect(true)
      //console.log(response.data)
      // setOpen(true)
    } catch (e) {
      // alert("El inicio de sesión ha fallado, intentelo nuevamente." + e)
      toast.error("Usuario o contraseña erróneos.")
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("showregistermsg") == "1") {
      toast.success("Registro exitoso, puedes iniciar sesión.")
      sessionStorage.removeItem("showregistermsg")
    }
    document.title = "TutorConnect | Login"
  }, [])

  // function handleCbClick(ev) {
  //   setRememberUser(ev.target.checked)
  //   // console.log(ev.target.checked)
  // }

  if (redirect) {
    return <Navigate to={"/portal"} />
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center -mt-20">
        <div className="w-full max-w-sm p-4 bg-white md:border md:border-gray-200 rounded-lg md:shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={LoginSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Inicio de sesión</h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tu correo
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="correo@tutorconnect.cl"
                value={userEmail}
                onChange={(ev) => setUserEmail(ev.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tu contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={userPassword}
                onChange={(ev) => setUserPassword(ev.target.value)}
                required
              />
            </div>
            {/* <div className="flex items-start">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    onChange={handleCbClick}
                    checked={!!rememberUser}
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Recuérdame
                </label>
              </div>
              <a
                href="#"
                className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div> */}
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Iniciar sesión
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              ¿No tienes cuenta aún?{" "}
              <Link to={"/register"} className="text-blue-700 hover:underline dark:text-blue-500">
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
