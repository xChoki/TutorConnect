import { Outlet } from "react-router-dom"
import COM_NavBar from "./COM_NavBar"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import COM_Side_Bar from "./COM_Side_Bar"

export default function Layout() {
  const { user } = useContext(UserContext)

  return (
    <>
      {/* NavBar */}
      <COM_NavBar></COM_NavBar>
      
      <Outlet />
      
      {/* Filler */}

      {/* Footer */}
    </>
  )
}
