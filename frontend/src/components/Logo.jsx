import React from 'react'
import { Link } from 'react-router-dom'
import logoimg from '../assets/logo.jpg'

const Logo = () => {
  return (
    <>
        <img src={logoimg} alt='logo' className='w-14'/>
    </>
  )
}

export default Logo