import { useEffect, useState } from "react"
import { Icon_Alert, Icon_Edit } from "../../assets/Icons"
import { validatePassword } from "../../scripts/ValidateLoginRegisterForm"

export default function ConfigInput({
  type,
  name,
  id,
  labelText,
  editedValue,
  value,
  inputState,
  handleValueChange,
  toggleEdit,
  handleNameEdit,
  handlePasswordEdit,
}) {
  const [password, setPassword] = useState("")
  const [passwordValidation, setPasswordValidation] = useState("")
  const [newPasswordError, setNewPasswordError] = useState(false)
  const [passwordValidationError, setPasswordValidationError] = useState(false)

  function handlePasswordValidation(userPassword) {
    if (!validatePassword(userPassword)) {
      setNewPasswordError(true)
    } else {
      setNewPasswordError(false)
    }
  }

  useEffect(() => {
    if (password !== passwordValidation) {
      setPasswordValidationError(true)
    } else {
      setPasswordValidationError(false)
    }
  }, [passwordValidation])

  function handleReset() {
    setPassword("")
    setPasswordValidation("")
    setNewPasswordError(false)
    setPasswordValidationError(false)
    editedValue = ""
  }
  return (
    <div className="ml-4 mt-2 w-full lg:w-1/2">
      <label htmlFor={name}>{labelText}</label>
      <div className={`${!inputState && "flex"} items-center`}>
        {inputState ? (
          <input
            type={type}
            name={name}
            id={name === "userPassword" ? id + "Actual" : id}
            value={editedValue}
            onChange={(ev) => handleValueChange(name, ev.target.value)}
            autoComplete="false"
          />
        ) : (
          <input type="text" name={name} id={id} value={value} autoComplete="false" disabled />
        )}

        {inputState && name === "userPassword" && (
          <>
            <label htmlFor={name}>Nueva contraseña: </label>
            <input
              type="password"
              name={name}
              id={id + "Edit"}
              value={password} // Set the value attribute to password
              onChange={(ev) => {
                handlePasswordValidation(ev.target.value)
                setPassword(ev.target.value)
              }}
              autoComplete="false"
            />
            {newPasswordError && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                role="alert"
              >
                <Icon_Alert />
                <span className="sr-only">Info</span>
                <ul className="list-disc pl-2">
                  <li>Debe tener una longitud mínima de 6 caracteres.</li>
                  <li>Debe contener al menos una mayúscula.</li>
                  <li>Debe contener al menos un caracter especial.</li>
                </ul>
              </div>
            )}
            <label htmlFor={name}>Repetir contraseña: </label>
            <input
              type="password"
              name={name}
              id={id + "Verification"}
              value={passwordValidation}
              onChange={(ev) => {
                setPasswordValidation(ev.target.value)
              }}
              autoComplete="false"
            />
            {passwordValidationError && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                role="alert"
              >
                <Icon_Alert />
                <span className="sr-only">Info</span>
                <ul className="list-disc pl-2">
                  <li>Las contraseñas no son similares.</li>
                </ul>
              </div>
            )}
          </>
        )}

        {inputState ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                name === "userName" || name === "userEmail"
                  ? handleNameEdit(editedValue, name)
                  : handlePasswordEdit(editedValue, password, passwordValidation)
              }}
              className="w-auto h-10 p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto text-center"
            >
              Aceptar
            </button>
            <button
              onClick={() => {
                handleReset()
                toggleEdit(name)
              }}
              className="w-auto h-10 p-2 rounded-md hover:bg-gray-200 hover:cursor-pointer items-center justify-center"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <span
            onClick={() => toggleEdit(name)}
            className="ml-2 w-10 h-10 p-2 rounded-md hover:bg-gray-200 hover:cursor-pointer items-center justify-center"
          >
            <Icon_Edit />
          </span>
        )}
      </div>
    </div>
  )
}
