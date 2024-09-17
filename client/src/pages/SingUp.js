import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)

const Navigater=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('https://newblogbackendproject.vercel.app/api/auth/signup', {
        method: 'POST', // Corrected: Added HTTP method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is ok
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    
      }

      const data = await res.json();
      console.log(data);
      setLoading(false)
      setError(false)
      Navigater("/signin ")

    } catch (error) {
  setLoading(false)
  setError(true)
  console.log(error)
    }
  };

  return (
    <div className='flex justify-start items-center flex-col mt-40'>
      <h1 className='text-2xl font-bold my-10'>Signup</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input
          id='username'
          className='bg-gray-100 w-80 py-2 rounded-lg px-2 my-2'
          onChange={handleChange}
          placeholder='Username'
          type='text'
        />
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
        <p>{error && error.message || "something went wrong"}</p>
      </form>
      <div className='mt-4'>
        <p>
          Have an account? <Link className='text-blue-600' to='/signin'> Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
