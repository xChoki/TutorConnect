import { Outlet } from "react-router-dom"
import NavBar from "./Navigation/NavBar"

export default function Layout() {
  return (
    <>
      {/* NavBar */}
      <NavBar/>
      
      <Outlet />
      
      {/* Filler */}

      {/* Footer */}
    </>
  )
}
