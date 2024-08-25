import React from 'react'
import { handleLogin } from '../functions/server-actions'

const LoginPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  // const [error, setError] = React.useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    handleLogin({ email, password })

    setLoading(false)

  }

  return (
    <div className='w-full h-full flex items-center flex-col justify-center space-y-4 max-w-sm mx-auto'>
      <div className='text-center'>
        <h3 className='text-3xl font-bold leading-normal'>Login</h3>
        <p className='text-sm font-medium opacity-80'>
          Login to your account to access the content.
        </p>
      </div>

      <form className='w-full space-y-5' onSubmit={handleSubmit}>
        <div className='space-y-1.5'>
          <label className='text-sm font-medium'>Email</label>
          <input type='email' 
          className='bg-neutral-100 dark:bg-neutral-800 rounded-md border border-white/5 focus:outline-none text-sm font-medium  px-2 py-2 w-full' 
          placeholder='harsh@lizmotors.com'
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='space-y-1.5'>
          <label className='text-sm font-medium'>Password</label>
          <input type={showPassword ? 'text' : 'password'}
          className='bg-neutral-100 dark:bg-neutral-800 rounded-md border border-white/5 focus:outline-none text-sm font-medium  px-2 py-2 w-full' 
          placeholder='********'
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='space-y-1.5 flex items-center justify-between'>
          <div className='flex items-center'>
            <input type='checkbox' className='rounded-md border border-white/5 focus:outline-none' onChange={() => setShowPassword(!showPassword)}/>
            <label className='text-sm font-medium ml-2'>Show Password</label>
          </div>
        </div>
        <div className='space-y-1.5'>
          <button disabled={loading} type='submit' className='bg-emerald-600 rounded-md text-white text-sm font-medium px-2 py-2 w-full'>
            Login
          </button>
        </div>
        <div className='space-y-1.5'>
          <p className='text-sm font-medium text-center opacity-80'>
            Employee registration here. <a href='/register' className='text-emerald-500 font-medium'>Register</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage