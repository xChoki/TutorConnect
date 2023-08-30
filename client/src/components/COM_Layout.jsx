import { Outlet } from "react-router-dom";
import COM_NavBar from "./COM_NavBar";

export default function Layout() {

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