import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signInStart,signInFail,signSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const SignIn = () => {

  const [formData,setFormData]=useState({})
const {loading,error}=useSelector((state)=>state.user)
  const Navigate=useNavigate()
  const dispatch=useDispatch()

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      dispatch(signSuccess())
      const res=await fetch('/api/auth/signin',{
        method: 'POST',
            headers: {
             'Content-Type': 'application/json',
              },
              body:JSON.stringify(formData)

      })
      const data=await res.json()
      if(!res.ok){
       dispatch(signInFail(data.message))
      }else{
        Navigate("/UserHome")
        dispatch(signSuccess(data))
      }
 
     
    } catch (error) {
    dispatch(signInFail(error))
    }

  }
  return (
    <div className='flex justify-start items-center flex-col mt-40'>
      <h1 className='text-2xl font-bold my-10'>Signup</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
       
        <input
          id='email'
          className='bg-gray-100 w-80 py-2 rounded-lg my-4 px-2'
          onChange={handleChange}
          placeholder='Email'
          type='text'
        />
        <input
          id='password'
          className='bg-gray-100 w-80 py-2 rounded-lg px-2'
          onChange={handleChange}
          placeholder='Password'
          type='password' // Change to type='password' to mask input
        />
        <button type='submit' className='mt-10 bg-gray-600 text-white py-3 rounded-xl'>
         {loading ? "Loading...":"Sign up"}
        </button>
        <p>{error ? error || "something went wrong":""}</p>
      </form>
      <div className='mt-4'>
        <p>
        don't have an account? <Link className='text-blue-600' to='/signup'> Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
