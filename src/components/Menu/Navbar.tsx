import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_IMAGE } from '../../constants/ApiConstant'
import LinkButton from '../Button/LinkButton'
import { IoMdLogOut } from "react-icons/io";
import { useAuthContext } from '../../contexts/AuthContext';

const Navbar:React.FC = () => {
    //on recupère la méthode singOut depuis le context
    const {signOut} = useAuthContext();
    //on recuềre le hook de navigation
    const navigate = useNavigate();

    //méthode pour déconnecter
    const handleLogout = () => {
        signOut();
        navigate('/');
    }

  return (
    <nav className='bg-brown'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <Link to="/" className='flex items-center space-x-3 rtl:space-x-reverse'>
                <img src={`${API_IMAGE}/logo.png`} alt="Logo Todolist" className='h-8' />
                <span className='text-2xl font-semibold whitespace-nowrap text-white'>Todolist</span>
            </Link>
            <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                {/*TODO: appeller composant linkButton */}
                <LinkButton to="/" label='Accueil' />
                <LinkButton to="/add-note" label='ajouter une note' />
                <IoMdLogOut onClick={()=>handleLogout()} className='h-10 w-10 text-yellow hover:text-yellow_hover'/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar