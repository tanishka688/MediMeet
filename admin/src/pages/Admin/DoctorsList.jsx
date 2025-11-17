import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Doctors</h1>

      <div className="flex flex-wrap gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="w-56 bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer group hover:shadow-md transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="w-full h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
                style={{ aspectRatio: '4 / 3' }}
              />
            </div>

            {/* Info */}
            <div className="p-5">
              <p className="text-gray-900 text-lg font-semibold truncate">{item.name}</p>
              <p className="text-gray-600 text-sm mt-1 truncate">{item.speciality}</p>

              {/* Availability toggle */}
              <label className="mt-4 flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                />
                <span className="text-gray-700 font-medium">Available</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
