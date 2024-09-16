import React from 'react'
import { Link } from 'react-router-dom'

 const header = () => {
  return (
    <div>
        <div className='w-full px-10 h-12 flex items-center justify-between bg-slate-300 '>
          <Link to="/">  <h1>Auth App</h1></Link>
            <ul className='flex gap-6 '>
                <Link to="/"><li>Home</li></Link>
                <Link to="/about"><li>About</li></Link>
           <Link to="/signup"> <li>Sign In</li></Link>
            </ul>
        </div>
    </div>
  )
}
export default header