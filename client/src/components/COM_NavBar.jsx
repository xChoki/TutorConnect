import { Link } from 'react-router-dom'
import Icon_User, { Icon_Hamburger } from '../assets/Icons'
import { useContext } from 'react'
import { UserContext } from '../UserContext'

const COM_NavBar = () => {

    const { user } = useContext(UserContext)

    return (
        <header className='sticky top-0 z-50 border-b-gray-200'>
            <nav className="bg-gray-50 border-gray-200">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    
                    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span className="sr-only">Abrir sidebar</span>
                        <Icon_Hamburger />
                    </button>

                    <Link to="/" className="items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">TutorConnect</span>
                    </Link>
                    
                    <Link to={user ? '/account' : '/login'} className="flex px-6 rounded-lg border border-gray-200 py-1 items-center bg-gray-50 hover:border-slate-400">
                        {!!user && (
                            <section className="pl-10 pr-5 text-right">
                                <p className="text-lg">
                                    {user.name}
                                </p>
                                <p className='text-sm'>
                                    Ver perfil
                                </p>
                            </section>
                        )}
                        <Icon_User></Icon_User>
                    </Link>

                </div>
            </nav>

        </header>
    )
}

export default COM_NavBar;