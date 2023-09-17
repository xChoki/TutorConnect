import { Link } from 'react-router-dom';
import Icon_User from '../assets/Icons';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const COM_NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="sticky top-0 z-50 border-b-gray-200">
      <nav className="bg-gray-100 border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-2">
          <Link to="/" className="items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              TutorConnect
            </span>
          </Link>

          <Link
            to={user ? '/portal' : '/login'}
            className="flex px-3 rounded-lg border border-gray-200 py-1 items-center bg-gray-50 hover:border-slate-400"
          >
            {!!user && (
              <section className="pl-10 pr-5 text-right">
                <p className="text-lg">{user.name}</p>
                <p className="text-sm">Ver portal</p>
              </section>
            )}
            <Icon_User></Icon_User>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default COM_NavBar;
