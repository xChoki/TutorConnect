import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg border shadow-md m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <Link to="/" className="hover:underline">
            TutorConnect
          </Link>
        </span>

        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0 gap-1.5 md:gap-3">
          <li>
            <Link href="#" className="hover:underline">
              Sobre nosotros
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Política de privacidad
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Contáctanos
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
