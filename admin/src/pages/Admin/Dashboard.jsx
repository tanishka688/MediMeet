import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return (
    dashData && (
      <div className="flex-1 p-8 bg-gray-50 min-h-[calc(100vh-4rem)] overflow-auto">
        {/* Summary Cards */}
        <div className="flex flex-wrap gap-6">
          {[
            { label: 'Doctors', count: dashData.doctors, icon: assets.doctor_icon },
            { label: 'Appointments', count: dashData.appointments, icon: assets.appointments_icon },
            { label: 'Patients', count: dashData.patients, icon: assets.patients_icon }
          ].map(({ label, count, icon }) => (
            <div
              key={label}
              className="flex items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer min-w-[180px]"
            >
              <img className="w-16" src={icon} alt={`${label} icon`} />
              <div>
                <p className="text-2xl font-semibold text-gray-700">{count}</p>
                <p className="text-gray-400 uppercase tracking-wide">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Bookings Section */}
        <section className="bg-white rounded-xl shadow-sm mt-12 border border-gray-200 max-w-4xl mx-auto">
          <header className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
            <img src={assets.list_icon} alt="List icon" className="w-6 h-6" />
            <h2 className="text-lg font-semibold text-gray-800">Latest Bookings</h2>
          </header>

          <div className="divide-y divide-gray-200">
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors cursor-default"
              >
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium truncate">{item.docData.name}</p>
                  <p className="text-gray-600 text-sm">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                <div className="min-w-[80px] text-right">
                  {item.cancelled ? (
                    <p className="text-red-500 text-xs font-semibold uppercase">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-600 text-xs font-semibold uppercase">Completed</p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel Appointment"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  )
}

export default Dashboard
