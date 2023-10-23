import { Link } from "react-router-dom"
import { Icon_Alert } from "../../assets/Icons"
import Datepicker from "tailwind-datepicker-react"

const options = {
  title: "Fecha de nacimiento",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Limpiar",
  maxDate: new Date("2050-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-white",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-gray-200",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2023-01-01"),
  language: "es",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
}

export default function RegisterForm({
  registerUser,
  nameValidation,
  emailValidation,
  passwordValidation,
  passwordVerifyValidation,
  handleChange,
  show,
  handleClose,
}) {
  return (
    <form className="space-y-6" onSubmit={registerUser}>
      <h5 className="text-xl font-medium text-gray-900">Regístrate</h5>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Nombre completo
        </label>
        <input
          type="name"
          name="name"
          id="name"
          className={`border ${nameValidation.border} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          placeholder="Roberto Ortiz"
          value={nameValidation.value}
          onChange={(ev) => nameValidation.setValue(ev.target.value)}
          onFocus={() => nameValidation.setFocused(true)}
          onBlur={() => nameValidation.setFocused(false)}
          required
        />
      </div>
      {nameValidation.hasError && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
          role="alert"
        >
          <Icon_Alert />
          <span className="sr-only">Info</span>
          <ul className="list-disc pl-2">
            <li>Debe tener una longitud mínima de 3 caracteres.</li>
            <li>Solo se permiten espacios y letras.</li>
          </ul>
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Tu correo
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={`border ${emailValidation.border} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          placeholder="correo@tutorconnect.cl"
          value={emailValidation.value}
          onChange={(ev) => emailValidation.setValue(ev.target.value)}
          onFocus={() => emailValidation.setFocused(true)}
          onBlur={() => emailValidation.setFocused(false)}
          required
        />
      </div>
      {emailValidation.hasError && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
          role="alert"
        >
          <Icon_Alert />
          <span className="sr-only">Info</span>
          <ul className="list-disc pl-2">
            <li>Correo no válido.</li>
          </ul>
        </div>
      )}

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Tu contraseña
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••••"
          className={`border ${passwordValidation.border} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          value={passwordValidation.value}
          onChange={(ev) => passwordValidation.setValue(ev.target.value)}
          onFocus={() => passwordValidation.setFocused(true)}
          onBlur={() => passwordValidation.setFocused(false)}
          required
        />
      </div>
      {passwordValidation.hasError && (
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

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirma tu contraseña
        </label>
        <input
          type="password"
          name="password_verify"
          id="password_verify"
          placeholder="••••••••••"
          className={`border ${passwordVerifyValidation.border} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
          value={passwordVerifyValidation.value}
          onChange={(ev) => passwordVerifyValidation.setValue(ev.target.value)}
          onFocus={() => passwordVerifyValidation.setFocused(true)}
          onBlur={() => passwordVerifyValidation.setFocused(false)}
          required
        />
      </div>
      {passwordVerifyValidation.hasError && (
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

      <div>
        <label
          htmlFor="date"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Tu fecha de nacimiento
        </label>
        <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
      </div>

      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Registrar
      </button>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        ¿Ya tienes cuenta?{" "}
        <Link to={"/login"} className="text-blue-700 hover:underline dark:text-blue-500">
          Ingresa aquí
        </Link>
      </div>
    </form>
  )
}
