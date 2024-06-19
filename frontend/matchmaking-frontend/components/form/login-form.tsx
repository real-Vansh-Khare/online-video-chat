"use client";

import React, { useRef } from 'react'

const LoginForm: React.FC = () => {

  const formRef = useRef(null);

  const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('lusername');
    const email = formData.get('lpassword');

    // now the post request etc.
  };

  return (
    <form className="flex flex-col w- p-8 text-gray-700 text-xl" onSubmit={(e) => handleLoginFormSubmit(e)} ref={formRef}>
        <label htmlFor="lusername" className="mt-4">Username</label>
        <input type="text" name="lusername" id="lusername" placeholder="Enter username" className="text-black mt-1 p-1 border-purple-700 focus:outline-none focus:border-b-2"></input>
        <label htmlFor="lpassword" className="mt-4">Password</label>
        <input type="password" name="lpassword" id="lpassword" placeholder="Enter password" className="text-black mt-1 p-1 border-purple-700 focus:outline-none focus:border-b-2"></input>
        <button className="mt-8 px-4 py-2 bg-purple-800 text-white rounded-full font-bold" type='submit'>Log in</button>
    </form>
  )
}

export default LoginForm;