import { useEffect, useState } from "react"
import SideBar from "../../components/Navigation/SideBar"
import useAuth from "../../hooks/useAuth"
import { useSidebarState } from "../../hooks/useSidebarState"
import ConfigInput from "../../components/Configuration/ConfigInput"
import axios from "axios"
import { Toaster, toast } from "sonner"
import Modal from "../../components/Modal"
import { useNavigate } from "react-router-dom"

export default function ConfigurationPage() {
  const [open, setOpen] = useSidebarState()
  const { auth, setAuth } = useAuth()
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()

  const [inputState, setInputState] = useState({
    userName: false,
    userEmail: false,
    userPassword: false,
  })

  const [editedValues, setEditedValues] = useState({
    userName: auth.userName,
    userEmail: auth.userEmail,
    userPassword: "",
  })

  useEffect(() => {
    if (sessionStorage.getItem("shownameupdatemsg") == "1") {
      toast.success(`Nombre actualizado correctamente a ${auth.userName}!`)
      sessionStorage.removeItem("shownameupdatemsg")
    }

    if (sessionStorage.getItem("showemailupdatemsg") == "1") {
      toast.success(`Nombre actualizado correctamente a ${auth.userEmail}!`)
      sessionStorage.removeItem("showemailupdatemsg")
    }

    if (sessionStorage.getItem("showpasswordupdatemsg") == "1") {
      toast.success(`Contraseña actualizada correctamente para usuario ${auth.userEmail}!`)
      sessionStorage.removeItem("showpasswordupdatemsg")
    }

    document.title = "TutorConect | Portal"
  }, [])

  const toggleEdit = (field) => {
    setInputState({ ...inputState, [field]: !inputState[field] })
  }

  const handleValueChange = (field, value) => {
    setEditedValues({ ...editedValues, [field]: value })
  }

  function handleNameEdit(userData, type) {
    const sendNameUserData = {
      userNewName: userData,
    }
    const sendEmailUserData = {
      userNewEmail: userData,
    }

    switch (type) {
      case "userName":
        console.log("Updating name with: ", userData)
        try {
          sessionStorage.setItem("shownameupdatemsg", "1")
          axios.put("/user/update-username/" + auth.id, sendNameUserData)
          window.location.reload()
        } catch (error) {
          console.error(error)
        }
        break
      case "userEmail":
        console.log("Updating email with: ", userData)
        try {
          sessionStorage.setItem("showemailupdatemsg", "1")
          axios.put("/user/update-email/" + auth.id, sendEmailUserData)
          window.location.reload()
        } catch (error) {
          console.error(error)
        }
        break
    }
  }

  function handlePasswordEdit(userPassword, userNewPassword, userPasswordValidation) {
    if (userNewPassword !== userPasswordValidation) {
      alert("Hubo un error en la validación de contraseñas, no son iguales")
      return
    }

    const passwordData = {
      userPassword: userPassword,
      userNewPassword: userNewPassword,
    }

    try {
      sessionStorage.setItem("showpasswordupdatemsg", "1")
      axios.put("/user/update-password/" + auth.id, passwordData)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  async function logout() {
    // var result = window.confirm("¿Seguro que desea cerrar sesión?")
    // if (result === true) {
    await axios.post("/logout")
    setOpenModal(true)
    navigate("/")
    setAuth(null)
    // }
  }

  function handleDeactivate(){
    try {
      axios.put("/user/deactivate/" + auth.id)
      logout()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={`${open ? "ml-72" : "ml-20"} pt-6`}>
      <SideBar open={open} setOpen={setOpen} />

      <Toaster position="top-center" />

      <h1 className="text-2xl md:text-4xl p-4 mb-4 text-center">Configuración</h1>

      <hr />

      <section className="grid lg-mx-1 divide-y gap-y-10 mt-4 container mx-auto">
        <ConfigInput
          type={"text"}
          name={"userName"}
          id={"userName"}
          labelText={"Tu nombre:"}
          editedValue={editedValues.userName}
          value={auth.userName}
          inputState={inputState.userName}
          handleValueChange={handleValueChange}
          toggleEdit={toggleEdit}
          handleNameEdit={handleNameEdit}
        />

        <ConfigInput
          type={"text"}
          name={"userEmail"}
          id={"userEmail"}
          labelText={"Tu correo:"}
          editedValue={editedValues.userEmail}
          value={auth.userEmail}
          inputState={inputState.userEmail}
          handleValueChange={handleValueChange}
          toggleEdit={toggleEdit}
          handleNameEdit={handleNameEdit}
        />

        <ConfigInput
          type={"password"}
          name={"userPassword"}
          id={"userPassword"}
          labelText={"Tu contraseña:"}
          editedValue={editedValues.userPassword}
          value={auth.userPassword}
          inputState={inputState.userPassword}
          handleValueChange={handleValueChange}
          toggleEdit={toggleEdit}
          handleNameEdit={handleNameEdit}
          handlePasswordEdit={handlePasswordEdit}
        />

        <div className="ml-4 mt-2 w-full lg:w-1/2">
          <label htmlFor="userName" className="mt-3">
            Desactivar cuenta
          </label>
          <div className="flex items-center">
            <button
              onClick={() => setOpenModal(true)}
              className="border border-red-600 rounded-md p-3 text-red-600 mt-3 hover:bg-red-500 hover:text-white"
            >
              Desactivar cuenta
            </button>
          </div>
        </div>
      </section>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        cancel={true}
        modalMargin={open ? "72" : "20"}
      >
        <div className="flex flex-col items-center justify-center text-center h-full">
          <div className="mx-auto my-4 w-full h-full">
            <h3>¿Seguro que deseas desactivar tu cuenta?</h3>
            <p className="text-sm text-gray-500 mt-2">
              Esto es una acción irreversible, y tendrás que contactarte con nosotros directamente para reactivar tu cuenta.
            </p>
          </div>

          <div className="gap-4 mt-7">
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={() => {
                setOpenModal(false)
                handleDeactivate()
              }}
            >
              Desactivar cuenta
            </button>
          </div>
        </div>
      </Modal>

    </div>
  )
}
