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
    <form className="space-y-6" onSubmit={(e) => handleSignupFormSubmit(e)}>
      <div>
              <label htmlFor="semail" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="semail"
                  name="semail"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="susername" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="susername"
                  name="susername"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
                <label htmlFor="spassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              <div className="mt-2">
                <input
                  id="spassword"
                  name="spassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
    </form>
  )
}

export default SignupForm;