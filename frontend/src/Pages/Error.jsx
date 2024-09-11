import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className='flex justify-center   items-center flex-col' style={{ height:"100vh" }}>
    <img src='/Error.png' alt='error'  />
    <p className='font-bold my-7 text-red-800 text-2xl'> Oops! page Not Found</p>
    <Link to={"/"} className='btn btn-primary'> Back To Home</Link>
    </div>
  )
}
