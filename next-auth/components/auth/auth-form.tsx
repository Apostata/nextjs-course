import { Dispatch, FC, FormEvent, SetStateAction, useRef, useState } from 'react';
import classes from './auth-form.module.css';
import {signUpReactQuery} from '../../fetch_utils'
import { Signup } from '../../models/signup_model';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

interface Props{
  setIsFirstRender: () => void
}

const AuthForm:FC<Props> = ({setIsFirstRender}:Props)=> {
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

  const router = useRouter()
  const {signUp, error, isLoading, isSuccess, data} = signUpReactQuery()
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }


  const onSubmit = async (event:FormEvent) =>{
    setIsFirstRender()
    event.preventDefault()

    const data : Signup= {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    if(isLogin){
      // return console.log(data)
      const result = await signIn('credentials',{
        redirect:false,
        ...data
      })

      if(result.ok){
         router.replace('/profile')
      }
    }else{
      return signUp(data)
    }
  
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
