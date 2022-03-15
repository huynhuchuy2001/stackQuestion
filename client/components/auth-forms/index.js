import React, { useState,useEffect } from 'react'
import Head from 'next/head'

import { Logo } from '../icons'
import LoginForm from './login-form'
import SignUpForm from './signup-form'
import ForgotForm from './forgot-form'
import Authenticate from './forgot-form/authenticate'
import Verify from './forgot-form/verifyCode'

import styles from './auth-forms.module.css'

const AuthForms = ({ screen = 'signup' }) => {
  const [form, setForm] = useState('')
  useEffect(() =>{
    setForm(screen)
  },[screen])
  return (
    <div className={styles.authModal}>
      <Head>
        <title>{form === 'login' ? 'Log In' : form ==='signup' ? 'Sign Up' : 'Forgot password'} - Stack Question</title>
      </Head>

      <Logo className={styles.logo} />

      {form === 'login' 
      ? <LoginForm /> 
      : form === 'signup' 
      ? <SignUpForm  /> 
      : form === 'forgot'
      ? <ForgotForm />
      : form === 'verify'
      ? <Verify/>
      :<Authenticate /> 
      }

      {form === 'login' ? (<>
        <p className={styles.authSwichMessage}>
          Don’t have an account?{' '}
          <a onClick={() => setForm('signup')}>Sign up</a>
        </p>
        <p className="">
        Don’t remember password?{' '}
        <a onClick={() => setForm('forgot')}>Forgot password</a>
      </p>
      </>
      ) : (
        <p className={styles.authSwichMessage}>
          Already have an account?{' '}
          <a onClick={() => setForm('login')}>Log in</a>
        </p>
      )}
    </div>
  )
}

export default AuthForms
