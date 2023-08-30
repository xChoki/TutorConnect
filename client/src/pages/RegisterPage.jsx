
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function RegisterPage() {

    // Variables de formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('¡Registro exitoso!');
        } catch (e) {
            alert('El registro a fallado, por favor intentalo más tarde.');
        }
    }

    return (
        <div className="mt-32 grow flex items-center justify-around">

            <div className=" mb-64">
                <h1 className="text-4xl text-center mb-4">Regístrate</h1>

                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email"
                        placeholder="mail@mail.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password"
                        placeholder="contraseña"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="buttonLogin mt-2 bg-gray-800 hover:bg-bestColor7 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300">Registrar</button>
                    <div className="text-center py-2 text-gray-500">
                        ¿Ya tienes cuenta? <Link className="underline text-black" to={'/login'}>Ingresa aquí</Link>
                    </div>
                </form>
            </div>

        </div>
    );
}