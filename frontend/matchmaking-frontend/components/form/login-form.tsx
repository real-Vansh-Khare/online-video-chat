"use client";

import xlog from '@/utils/logger';
import axios from 'axios';
import React, { useRef } from 'react'
import { useRouter } from 'next/navigation';
import API from '@/lib/api';

const LoginForm: React.FC = () => {

  const formRef = useRef(null);
  const router = useRouter();

  const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('lusername');
    const password = formData.get('lpassword');

    const data = {username, password};

    // now the post request etc.
    const res = await axios.post(API.LOGIN, data);
    if(res.data.data.login_success) {
      localStorage.setItem('stu_mingle_access_token', res.data.data.token);
      router.push("/connect");
    }
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