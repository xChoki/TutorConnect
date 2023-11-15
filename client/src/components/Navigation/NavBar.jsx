import { Link } from "react-router-dom"
import Icon_User from "../../assets/Icons"
import useAuth from "../../hooks/useAuth"
import logo1 from "../../assets/logo1.png"

export default function NavBar() {
  const { auth } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b-gray-200">
      <nav className="bg-gray-100 border-gray-200">
        <div className="container mx-auto">
          <div className="flex justify-between items-center p-2">
            <Link to="/" className="items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                <img src={logo1} width={150} height={150}/>
              </span>
            </Link>
  
            <Link
              to={auth ? "/portal" : "/login"}
              className="flex px-3 rounded-lg border border-gray-200 py-1 items-center bg-gray-50 hover:border-slate-400"
            >
              {!!auth && (
                <section className="pl-10 pr-5 text-right">
                  <p className="md:text-lg">{auth.userName}</p>
                  <p className="text-sm">Ver portal</p>
                </section>
              )}
              <Icon_User></Icon_User>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
