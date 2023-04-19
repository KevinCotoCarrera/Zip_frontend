'use client';
import React from 'react';
import { useFormik } from 'formik';
import axios from "axios";
import { SignupSchema } from './schema/sign-up.schema';
import * as bcrypt from 'bcryptjs'
export default function SignupForm() {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL
  const salt = bcrypt.genSaltSync(10)
  const {values,errors, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit:async (values: any) => {
      const username = values.username
      const password = values.password
      const hashedPassword = bcrypt.hashSync(password, salt)
      const user = {
        username: username,
        password: hashedPassword
      }
      console.log(user)
      console.log(serverURL)
      axios({
        method: 'POST',
        url: `${serverURL}/auth/signup`,
        data: user
      })
        .then(function (res) {
           console.log(res)
           alert('Successfully signed up!');  
        })
        .catch(function (res) {
           console.log(res)
      });
    },
    validationSchema: SignupSchema,
  });
  console.log(errors)
  return (
    <div className='h-screen flex justify-center items-center bg-emerald-300'>

    <form className='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
      <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2' 
        htmlFor="username">Username</label>
      <input
        className={`shadow appearance-none border
        rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
        focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-400': ''}`}
        id="username"
        name="username"
        type="username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
      />
      {errors.username ? <p className='text-gray-300 text-xs'>{errors.username}</p> : ''}
      </div>
      <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor="password">Password</label>
      <input
        className="shadow appearance-none border
        rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
        focus:outline-none focus:shadow-outline"
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      />
      {errors.password ? <p className='text-gray-300 text-xs'>{errors.password}</p> : ''}
      </div>
      <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor="password">Confirm Password</label>
      <input
        className="shadow appearance-none border
        rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
        focus:outline-none focus:shadow-outline"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.confirmPassword}
      />
      {errors.confirmPassword ? <p className='text-gray-300 text-xs'>{errors.confirmPassword}</p> : ''}
      </div>
      <button className="bg-emerald-400 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign up
      </button>
    </form>
    </div>
  );
};