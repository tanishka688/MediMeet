import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
        if (data.success) {
          setAToken(data.token);
          localStorage.setItem('aToken', data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
        if (data.success) {
          setDToken(data.token);
          localStorage.setItem('dToken', data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white max-w-xl w-full rounded-2xl border-2 border-gray-300 shadow-lg p-12 space-y-8"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 text-center tracking-tight">
          <span className="text-indigo-600">{state}</span> Login
        </h2>

        <div className="space-y-4">
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border-2 border-gray-300 rounded-lg px-5 py-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border-2 border-gray-300 rounded-lg px-5 py-3 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold text-xl py-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-700 text-lg">
          {state === 'Admin' ? (
            <>
              Doctor Login?{' '}
              <span
                onClick={() => setState('Doctor')}
                className="text-indigo-600 cursor-pointer underline font-semibold"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                onClick={() => setState('Admin')}
                className="text-indigo-600 cursor-pointer underline font-semibold"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default Login
