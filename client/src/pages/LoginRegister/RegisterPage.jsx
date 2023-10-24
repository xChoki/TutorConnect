import { useEffect, useState } from "react"
import axios from "axios"

import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../scripts/ValidateLoginRegisterForm"
import { useValidationRegisterForm } from "../../hooks/useValidationRegisterForm"
import RegisterForm from "../../components/LoginRegister/RegisterForm"
import { Navigate } from "react-router-dom"

export default function RegisterPage() {
  const [redirect, setRedirect] = useState(false)
  // Variables de formulario
  const [userDate, setUserDate] = useState("")

  const nameValidation = useValidationRegisterForm("", validateName)
  const emailValidation = useValidationRegisterForm("", validateEmail)
  const passwordValidation = useValidationRegisterForm("", validatePassword)
  const passwordVerifyValidation = useValidationRegisterForm(
    "",
    (value) => value === passwordValidation.value
  )

  async function registerUser(ev) {
    ev.preventDefault()
    const userData = {
      userName: nameValidation.value,
      userEmail: emailValidation.value,
      userPassword: passwordValidation.value,
      userDate,
    }

    try {
      await axios.post("/register", userData)
      sessionStorage.setItem("showregistermsg", "1")
      setRedirect(true)
    } catch (e) {
      alert("El registro a fallado, por favor intentalo más tarde." + e) + console.error(e)
    }
  }

  const [show, setShow] = useState(false)
  const handleChange = (selectedDate) => {
    setUserDate(selectedDate)
  }
  const handleClose = (state) => {
    setShow(state)
  }

  if (redirect) {
    <Navigate to="/login" />
  }

  useEffect(() => {
    document.title = "TutorConnect | Register"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center -mt-16">
      <div className="w-full max-w-sm p-4 bg-white md:border md:border-gray-200 rounded-lg md:shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <RegisterForm
          registerUser={registerUser}
          nameValidation={nameValidation}
          emailValidation={emailValidation}
          passwordValidation={passwordValidation}
          passwordVerifyValidation={passwordVerifyValidation}
          handleChange={handleChange}
          show={show}
          handleClose={handleClose}
        />
      </div>
    </div>
  )
}
