import React from 'react'
import { Link } from 'react-router-dom'

interface LinkButtonProps {
    to:string,
    label:string
}

const LinkButton:React.FC<LinkButtonProps> = ({to, label}) => {
  return (
    <Link to={to} className='py-2 px-3 m-2 rounded bg-yellow hover:bg-yellow_hover text-black font-bold'>
    {label}
    </Link>
)
}

export default LinkButton