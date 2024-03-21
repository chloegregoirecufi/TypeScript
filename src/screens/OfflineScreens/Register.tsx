import React, { SyntheticEvent, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/Input/CustomInput';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import SubmitButton from '../../components/Button/SubmitButton';
import axios from 'axios';
import { API_ROOT } from '../../constants/ApiConstant';

const Register:React.FC = () => {
  //on déclare nos states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [ password, setPassword]= useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //on recupère la méthode signIn du context d'auth
  const {signIn} = useAuthContext();
  //on recupère le hook de navigation
  const navigate = useNavigate();
  

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    axios.post(`${API_ROOT}/register`, {name, email, password}).then((response) => {
      if(response.data.email){
        const user = {
          userId: response.data.id,
          email: response.data.email,
          name: response.data.name,
        };

        try{
          signIn(user);
          setIsLoading(false);
          navigate('/');
        } catch (error) {
          setIsLoading(false);
          console.log(`erreur lors de la création de la session: ${error}`)
        }
      }
    }).catch((error)=>{
      console.log(`Erreur lors de l'enregistrement: ${error}`);
      setIsLoading(false);
    })
  }


  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-brown_dark'>
      <h1 className='text-white font-bold text-4xl pb-5'>Enregistrez vous !</h1>
        <form onSubmit={handleSubmit} className='w-[80%] md:w-[50%] lg:w-[40%]'>
          {/*Input name*/}
          <CustomInput
          state={name}
          label='Mon Nom'
          callable={(e) => setName(e.target.value)}
          type='text'
          />
          {/*Input email*/}
          <CustomInput
          state={email}
          label='Mon email'
          callable={(e) => setEmail(e.target.value)}
          type='email'
          />
          {/*Input password*/}
          <CustomInput
          state={password}
          label='Mon mdp'
          callable={(e) => setPassword(e.target.value)}
          type='password'
          />
          <Link to='/' className='text-white hover:text-yellow_hover'>Déjà inscrit ? Connectez vous</Link>
          <div className='flex items-center justify-center pt-5'>
          {isLoading ? <ButtonLoader /> : <SubmitButton label="S'inscrire"/>}
          </div>
        </form>
      </div>
  )
}

export default Register