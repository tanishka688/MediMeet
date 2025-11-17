import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className="min-h-screen w-72 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 border-r border-gray-200 shadow-md px-8 pt-10 text-gray-700">
      {aToken && (
        <ul className="space-y-8">
          <h2 className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-6 px-2 select-none">
            Admin Panel
          </h2>

          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-6 py-4 px-4 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:translate-x-2 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-100 to-blue-200 border-l-4 border-blue-500 shadow text-blue-700 font-semibold'
                  : 'text-gray-600 hover:shadow-sm'
              }`
            }
          >
            <img
              className="w-6 group-hover:scale-110 transition-transform duration-200"
              src={assets.home_icon}
              alt="Dashboard Icon"
            />
            <p className="font-medium group-hover:text-blue-600 transition-colors duration-200">Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-6 py-4 px-4 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:translate-x-2 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-100 to-blue-200 border-l-4 border-blue-500 shadow text-blue-700 font-semibold'
                  : 'text-gray-600 hover:shadow-sm'
              }`
            }
          >
            <img
              className="w-6 group-hover:scale-110 transition-transform duration-200"
              src={assets.appointment_icon}
              alt="Appointments Icon"
            />
            <p className="font-medium group-hover:text-blue-600 transition-colors duration-200">Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-6 py-4 px-4 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:translate-x-2 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-100 to-blue-200 border-l-4 border-blue-500 shadow text-blue-700 font-semibold'
                  : 'text-gray-600 hover:shadow-sm'
              }`
            }
          >
            <img
              className="w-6 group-hover:scale-110 transition-transform duration-200"
              src={assets.add_icon}
              alt="Add Doctor Icon"
            />
            <p className="font-medium group-hover:text-blue-600 transition-colors duration-200">Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-6 py-4 px-4 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:translate-x-2 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-100 to-blue-200 border-l-4 border-blue-500 shadow text-blue-700 font-semibold'
                  : 'text-gray-600 hover:shadow-sm'
              }`
            }
          >
            <img
              className="w-6 group-hover:scale-110 transition-transform duration-200"
              src={assets.people_icon}
              alt="Doctors List Icon"
            />
            <p className="font-medium group-hover:text-blue-600 transition-colors duration-200">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="space-y-8">
          <h2 className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-6 px-2 select-none">
            Doctor Panel
          </h2>

          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-6 py-4 px-4 rounded-lg transition-all duration-300 hover:bg-teal-50 hover:translate-x-2 group ${
                isActive
                  ? 'bg-gradient-to-r from-teal-100 to-teal-200 border-l-4 border-teal-500 shadow text-teal-700 font-semibold'
                  : 'text-gray-600 hover:shadow-sm'
              }`
            }
          >
            <img
              className="w-6 group-hover:scale-110 transition-transform duration-200"
              src={assets.home_icon}
              alt="Dashboard Icon"
            />
            <p className="font-medium group-hover:text-teal-600 transition-colors duration-200">Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-6 py-4 px-4 rounded-lg transition-all duration-300 hover:bg-teal-50 hover:translate-x-2 group ${
                isActive
                  ? 'bg-gradient-to-r from-teal-100 to-teal-200 border-l-4 border-teal-500 shadow text-teal-700 font-semibold'
                  : 'text-gray-600 hover:shadow-sm'
              }`
            }
          >
            <img
              className="w-6 group-hover:scale-110 transition-transform duration-200"
              src={assets.appointment_icon}
              alt="Appointments Icon"
            />
            <p className="font-medium group-hover:text-teal-600 transition-colors duration-200">Appointments</p>
          </NavLink>

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-6 py-4 px-4 rounded-lg transition-all duration-300 hover:bg-teal-50 hover:translate-x-2 group ${
                isActive
                  ? 'bg-gradient-to-r from-teal-100 to-teal-200 border-l-4 border-teal-500 shadow text-teal-700 font-semibold'
                  : 'text-gray-600 hover:shadow-sm'
              }`
            }
          >
            <img
              className="w-6 group-hover:scale-110 transition-transform duration-200"
              src={assets.people_icon}
              alt="Profile Icon"
            />
            <p className="font-medium group-hover:text-teal-600 transition-colors duration-200">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
