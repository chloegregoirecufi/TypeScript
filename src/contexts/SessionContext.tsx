import { ReactElement, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { STORAGE_KEY } from "../constants/AppConstant";

//on va définir le type d'objet context
interface SessionContextType {
    inSession: boolean;
    setInSession: (inSession:boolean) => void;
}

//création du context
const SessionContext = createContext<SessionContextType | null>(null);

//propriété du composant 
interface SessionContextProviderProps {
    children : ReactNode;
}

//création du composant context
const SessionContextProvider = ({children}: SessionContextProviderProps):ReactElement  => {
    const [inSession, setInSession] = useState<boolean>(false);
    const {setUserInfo} = useAuthContext();


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
},[setUserInfo, inSession]);

//définition des propriétés du context
const valueContext : SessionContextType = {
    inSession,
    setInSession
}

return <SessionContext.Provider value={valueContext}>{children}</SessionContext.Provider>
};

//méthode pour récup le context
const useSessionContext = ():SessionContextType => {
    const context = useContext(SessionContext);
    if(!context){
        throw new Error('useSessionContext doit être utilisé dans un SesioContextProvider');
    }
    return context;
};

export {SessionContext, SessionContextProvider, useSessionContext};