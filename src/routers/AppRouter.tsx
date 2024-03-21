import React, { useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { useSessionContext } from '../contexts/SessionContext'
import { RouterProvider } from 'react-router-dom'
import OnlineRouter from './OnlineRouter'
import OfflineRouter from './OfflineRouter'
import { STORAGE_KEY } from '../constants/AppConstant'

const AppRouter: React.FC = () => {
    //recupération de l'état de la session depuis le contexte
    const {inSession, setInSession} = useSessionContext()
    //recuperation des info users
    const {setUserInfo, userId} = useAuthContext();

    //méthode pour recup les info de user
    const getUserInfo = async () => {
    const userString = localStorage.getItem(STORAGE_KEY);
    if(userString){
        const user = JSON.parse(userString);
        setUserInfo(user);
        setInSession(true);
    }else{
        setInSession(false);
    }
};

//appel de la méthode pour recup les infos
useEffect(()=>{
  getUserInfo();
},[setUserInfo, inSession, userId]);    
    
  return (
    <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />
  )
}

export default AppRouter