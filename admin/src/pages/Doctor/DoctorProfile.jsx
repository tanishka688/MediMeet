import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {
        headers: { dToken }
      })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) getProfileData()
  }, [dToken])

  if (!profileData) return null

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 flex flex-col md:flex-row items-center p-8">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img src={profileData.image} alt="Doctor" className="w-full h-full object-cover" />
          </div>
          <div className="md:ml-8 text-center md:text-left mt-4 md:mt-0 text-white">
            <h1 className="text-3xl font-bold">{profileData.name}</h1>
            <p className="text-lg">{profileData.degree} - {profileData.speciality}</p>
            <div className="flex items-center justify-center md:justify-start mt-2 gap-2">
              <span className={`w-3 h-3 rounded-full ${profileData.available ? 'bg-green-400' : 'bg-red-400'}`}></span>
              <span>{profileData.available ? 'Available' : 'Not Available'}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* About */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              {isEdit ? (
                <textarea
                  value={profileData.about}
                  onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-blue-500 resize-none"
                />
              ) : (
                <p className="text-gray-700">{profileData.about || 'No information provided.'}</p>
              )}
            </div>
          </div>

          {/* Fee and Address */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Appointment Fee</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 font-bold text-xl flex items-center">
                {currency}
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                    className="ml-2 w-24 text-xl bg-transparent border-b-2 border-green-400 focus:outline-none"
                  />
                ) : (
                  <span className="ml-2">{profileData.fees}</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Address</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1 text-gray-700">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      value={profileData.address.line1}
                      onChange={(e) =>
                        setProfileData(prev => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value }
                        }))
                      }
                      className="w-full border-b border-blue-300 focus:outline-none focus:border-blue-500 pb-1"
                      placeholder="Line 1"
                    />
                    <input
                      type="text"
                      value={profileData.address.line2}
                      onChange={(e) =>
                        setProfileData(prev => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value }
                        }))
                      }
                      className="w-full border-b border-blue-300 focus:outline-none focus:border-blue-500 pb-1"
                      placeholder="Line 2"
                    />
                  </>
                ) : (
                  <>
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={profileData.available}
              disabled={!isEdit}
              onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
              className="w-5 h-5"
            />
            <label className="text-gray-700 font-medium">Available for appointments</label>
          </div>

          {/* Buttons */}
          <div className="flex justify-center pt-4">
            {isEdit ? (
              <div className="flex gap-4">
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
