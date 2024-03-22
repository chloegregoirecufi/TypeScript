import React from 'react'
import LinkButton from '../Button/LinkButton'

const EmptyNote:React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center '>
        <h1 className='text-white font-bold text-3xl py-3'>Aucune note disponible</h1>
        <LinkButton to="/add-note" label='Ajouter notre première note'/>
    </div>
  )
}

export default EmptyNote