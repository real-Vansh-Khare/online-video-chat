"use client";

import axios from 'axios';
import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation';
import xlog from '@/utils/logger';
import API from '@/lib/api';

const SignupForm = () => {
  const router = useRouter();

  const handleSignupFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    xlog(handleSignupFormSubmit, "function called")
    const formData = new FormData(e.target as HTMLFormElement);
    const [ email, username, password ] = [ formData.get("semail"), formData.get("susername",), formData.get("spassword") ];
    const data = { email, username, password };
    xlog(data, "data is");
    try {
      const res = await axios.post(API.SIGNUP, data);
      if(res.data.data.signup_success) {
        // todo: display a toast signup success
        xlog(res); 
        router.push("/login");
      }
    } catch (err) {
      xlog(err);
    }
  };

  return (
    <form className="flex flex-col w- p-8 text-gray-700 text-xl" onSubmit={(e) => handleSignupFormSubmit(e)}>
        <label htmlFor="semail" className="mt-4">Email address</label>
        <input type="email" name="semail" id="semail" placeholder="Enter email" className="text-black mt-1 p-1 border-purple-700 focus:outline-none focus:border-b-2"></input>
        <label htmlFor="susername" className="mt-4">Username</label>
        <input type="text" name="susername" id="susername" placeholder="Enter username" className="text-black mt-1 p-1 border-purple-700 focus:outline-none focus:border-b-2"></input>
        <label htmlFor="spassword" className="mt-4">Password</label>
        <input type="password" name="spassword" id="spassword" placeholder="Enter password" className="text-black mt-1 p-1 border-purple-700 focus:outline-none focus:border-b-2"></input>
        <button className="mt-8 p-4 bg-purple-800 text-white rounded-full font-bold" type='submit'>Submit</button>
    </form>
  )
}

export default SignupForm;