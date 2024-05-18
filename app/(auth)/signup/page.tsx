'use client'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'
import { signup } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'

export default function SignUp() {

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleButton = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { success, message } = await signup(name, lastname, email, phone, password, confirmPassword);

      if (success) {
        router.push('/dashboard');
        toast.success(message);

      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error();
    }
  }

  return (
    <main className="bg-white dark:bg-slate-900">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Create your Account ✨</h1>
              {/* Form */}
              <form onSubmit={handleButton}>
                <div className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name<span className="text-rose-500">*</span></label>
                    <input id="name" className="form-input w-full" type="text" value={name} onChange={e => setName(e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Lastname<span className="text-rose-500">*</span></label>
                    <input id="name" className="form-input w-full" type="text" value={lastname} onChange={e => setLastname(e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address<span className="text-rose-500">*</span></label>
                    <input id="email" className="form-input w-full" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Phone number<span className="text-rose-500">*</span></label>
                    <input id="email" className="form-input w-full" type="number" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" className="form-input w-full" type="password" autoComplete="on" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Confirm Password</label>
                    <input id="confirmPassword" className="form-input w-full" type="password" autoComplete="on" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                  </div>

                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-sm ml-2">Email me about product news.</span>
                    </label>
                  </div>
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap">Sign Up</button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  Have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="/signin">Sign In</Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        <AuthImage />

      </div>

    </main>
  )
}
