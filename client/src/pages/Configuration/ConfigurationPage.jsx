import { useState } from "react"
import SideBar from "../../components/Navigation/SideBar"
import useAuth from "../../hooks/useAuth"
import { useSidebarState } from "../../hooks/useSidebarState"
import ConfigInput from "../../components/Configuration/ConfigInput"

export default function ConfigurationPage() {
  const [open, setOpen] = useSidebarState()
  const { auth } = useAuth()

  const [inputState, setInputState] = useState({
    userName: false,
    userEmail: false,
    userPassword: false,
  })

  const [editedValues, setEditedValues] = useState({
    userName: auth.userName,
    userEmail: auth.userEmail,
    userPassword: "••••••••", // Initialize this with an empty string, or you can use the actual user password if you have it
  })

  //   console.log(auth)

  const toggleEdit = (field) => {
    setInputState({ ...inputState, [field]: !inputState[field] })
  }

  const handleValueChange = (field, value) => {
    setEditedValues({ ...editedValues, [field]: value })
  }

  return (
    <div className={`${open ? "ml-72" : "ml-20"} pt-6`}>
      <SideBar open={open} setOpen={setOpen} />

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
        />

        <div className="ml-4 mt-2 w-full lg:w-1/2">
          <label htmlFor="userName" className="mt-3">
            Desactivar cuenta
          </label>
          <div className="flex items-center">
            <button
              onClick={() => alert("desactivar cuenta")}
              className="border border-red-600 rounded-md p-3 text-red-600 mt-3 hover:bg-red-500 hover:text-white"
            >
              Desactivar cuenta
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
