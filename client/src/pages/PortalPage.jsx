import  { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import COM_Side_Bar from "../components/COM_Side_Bar"; // Asegúrate de importar correctamente el componente del sidebar

export default function MainComponent() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(true);

  return (
    <div className="grid grid-cols-[auto,1fr]">
      <COM_Side_Bar open={open} setOpen={setOpen} />

      <section
        className={`${
          open ? "ml-72" : "ml-20"
        } p-7 font-semibold`}
      >
        <span> Hola {user.name}!</span>
      </section>
    </div>
  );
}
