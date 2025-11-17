import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className="flex justify-between items-center px-12 py-8 min-h-[100px] bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 border-b border-gray-300 shadow-md backdrop-blur-md">
      <div className="flex items-center gap-8">
        <img 
          onClick={() => navigate('/')} 
          className="w-48 cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-sm" 
          src={assets.admin_logo} 
          alt="App Logo" 
        />
        <div className="relative">
          <p className="px-6 py-2.5 rounded-full text-base font-medium text-gray-700 bg-gradient-to-r from-gray-200 to-gray-300 border border-gray-400 shadow hover:shadow-md transition-all duration-300">
            {aToken ? 'Admin' : 'Doctor'}
          </p>
          <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-green-400 rounded-full animate-ping shadow-sm"></div>
          <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-green-500 rounded-full shadow-md"></div>
        </div>
      </div>
      <button 
        onClick={logout} 
        className="bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold px-10 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
