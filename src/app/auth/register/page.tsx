"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const register = () => {
  const [formData, setformData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('');
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await (await res).json();
      if(!data.success){
        setError(data.message || "Something went wrong");
      }
      else{
        alert("Registration Successful");
        setformData({
          username: '',
          email: '',
          password: ''
        });
        router
      }
    } catch (error) {
      console.log("Registration Error:", error);
      setError("An error occurred during registration.");
    }

  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-200 text-black'>
      <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-8'>
        <h1 className='text-2xl font-bold text-center mb-6'>Register Yourself</h1>
        <form action="" onSubmit={handleSubmit} className='space-y-4'>

          <div>
            <label htmlFor="" className='block mb-1 font-medium'>Username</label>
            <input type="text"
              placeholder='Enter your username'
              onChange={handleChange}
              name='username'
              value={formData.username}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none'
            />
          </div>

          <div>
            <label htmlFor="" className='block mb-1 font-medium'>Email</label>
            <input type="email"
              placeholder='Enter your Email'
              name='email'
              onChange={handleChange}
              value={formData.email}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none'
            />
          </div>
          <div>
            <label htmlFor="" className='block mb-1 font-medium'>Password</label>
            <input type="password"
              placeholder='Enter your Password'
              name='password'
              onChange={handleChange}
              value={formData.password}
              className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none'
            />
          </div>

          <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition'>
            Submit
          </button>
          <p className='text-center text-gray-500'>Already have an account? <a href="/auth/login" className="text-blue-500 hover:underline ">Login</a></p>
        </form>
      </div>
    </div>
  )
}

export default register
