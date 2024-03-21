import { ReactElement, ReactNode, createContext, useContext, useState } from "react";
import { STORAGE_KEY } from "../constants/AppConstant";

//definition des propriétés de l'utilisateur
interface UserInfo {
    userId: string;
    name: string;
    email: string;
}

//definition du type de l'objet context
interface AuthContextType extends Partial<UserInfo> {
    setUserInfo: (UserInfo: UserInfo) => void;
    signIn: (UserInfo: UserInfo) => void;
    signOut: () => void;
}

//création du context(par défaut user no connect)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//définition des propriétés du composant
interface AuthContextProviderProps {
    children: ReactNode;
}

//creation du composant contexte
const AuthContextProvider = ({children}: AuthContextProviderProps):ReactElement => {
    //on déclare notre state de l'utilisateur
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

    //méthode pour connecter l'utilisateur
    const signIn = (user: UserInfo):void =>{
        setUserInfo(user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }

    //méthode pour déconnecter
    const signOut = ():void=>{
        setUserInfo(undefined);
        localStorage.removeItem(STORAGE_KEY);
    }

    //definition des propriétés du contexte
    const contextValue: AuthContextType = {
        signIn,
        signOut,
        setUserInfo,
        ...userInfo || {}
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
};

//méthode pour récupérer le context
const useAuthContext = ():AuthContextType => {
    
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuthContext doit être utilisé dans un AuthContextProvider');
    }
    return context;
}

//export les proprietes du context
export{AuthContext, AuthContextProvider, useAuthContext};

