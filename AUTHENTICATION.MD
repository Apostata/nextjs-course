# Authentication no Next.js

## Serverside Sessions
Guarda uma identificação unica e envia para o cliente, usando essa identificação o cliente requisitar dados que necessitam de permissão

## Auth Tokens (usaremos esse)
Cria, mas não guarda um token de permissão e envia para o cliente, o cliente usa o token para requistar os dados que necessitam de permissão.

Trabalhando com SPAs(Single Page Applications) usaremos o token, pq não precisaremos estar em conxão constante com o server, portanto o cliente deve enviar a informção que prove sua identidade.

### JWT (Json web token)
JWT são compostos por 3 partes de informação:
isuser data - Custom data - Secret singin key = criando uma string

## Next auth
Usando o `next-auth`, vamos criar uma rota `[...nextauth].ts`, especifica para a lib:

O vamos usar o `CredentialProcider` que é para authenticar por email e senha ou customizado. 

```ts
import { MongoClient } from 'mongodb';
import { connectToDb, readAllFromDb, readOneFromDb } from './../../../core/db';
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials';
import CredentialProvider from "next-auth/providers/credentials";
import { verifyPassword } from '../../../core/encript';
const {env} = process

export default NextAuth({
	secret: env.SECRET,
	session:{
		strategy:'jwt'
	},
	providers:[
		CredentialProvider({
			name:'Credentials',
			credentials:{
				email:{ label:'email', type:'email'},
				password:{label:'password', type:'password'},
			},
			async authorize(credentials, req) {
				const user = await readOneFromDb('users',{email:credentials.email})
				if(!(user instanceof Error)){
					const isValidPass = await verifyPassword(credentials.password, user.password)
					if(isValidPass){
						const {_id, ...newUser} = user
						return {id:_id.toString(), ...newUser}
					}
					throw new Error("invalid credentials!");
					
				}
				throw new Error("invalid user!");
			},
		})
	]
});

```
authenticação no front, chamar a função `signIn` da lib `next-auth/react` e a função do `signUp` neste caso é customizada, usando o `react-query`

```tsx
import { FC, FormEvent, useRef, useState } from 'react';
import classes from './auth-form.module.css';
import {signUpReactQuery} from '../../fetch_utils'
import { Signup } from '../../models/signup_model';
import { signIn } from 'next-auth/react'

const AuthForm:FC = ()=> {
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

  const {signUp, error, isLoading, isSuccess, data} = signUpReactQuery()
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }


  const onSubmit = async (event:FormEvent) =>{
    event.preventDefault()

    const data : Signup= {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    if(isLogin){
      const result = await signIn('credentials',{
        redirect:false,
        ...data
      })
      return result
    }
    return signUp(data)
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

```

## Protected Routes
### Frontend
```tsx
import { FC, useEffect, useState } from 'react';
import UserProfile from '../components/profile/user-profile';
import { useSession } from 'next-auth/react';

const ProfilePage: FC = ()=> {
  const [counter, setCounter] = useState<number>(5)
  const { status } = useSession()

  useEffect(()=>{
    let interval:NodeJS.Timer;
     if(counter < 1){
        clearInterval(interval)
        window.location.href='/auth'
      }
    if(status === 'unauthenticated' && counter === 5){
      interval = setInterval(()=>{
        setCounter((prevCoutner)=>prevCoutner - 1)
      }, 1000)

    }
  },[status, counter])

  if(status === 'loading'){
    return <p style={{display:'flex', justifyContent:'center', alignContent:'center'}}>Loading...</p>
  }

  if(status === 'unauthenticated'){
    return <p>Unauthenticated!, redirecting in {counter} secs</p>
  }

  return <UserProfile />;
}

export default ProfilePage;

```

### Backend
#### getServerSideProps
```tsx
import { FC, useEffect, useState } from 'react';
import UserProfile from '../components/profile/user-profile';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';

const ProfilePage: FC = ()=> {
//   const [counter, setCounter] = useState<number>(5)
//   const { data, status } = useSession()
  
//   useEffect(()=>{
//     let interval:NodeJS.Timer;
//      if(counter < 1){
//         clearInterval(interval)
//         window.location.href='/auth'
//       }
//     if(status === 'unauthenticated' && counter === 5){
//       interval = setInterval(()=>{
//         setCounter((prevCoutner)=>prevCoutner - 1)
//       }, 1000)

//     }
//   },[status, counter])

//   if(status === 'loading' && !session){
//     return <p style={{display:'flex', justifyContent:'center', alignContent:'center'}}>Loading...</p>
//   }

//   if(status === 'unauthenticated'){
//     return <p>Unauthenticated!, redirecting in {counter} secs</p>
//   }

  return <UserProfile />;
}

export default ProfilePage;

export const getServerSideProps :GetServerSideProps =async (context) =>{
  const session =  await getSession({req: context.req});
  if(!session){
    return {
      redirect:{
        destination: '/auth',
        permanent:false // aqui podemos criar um readirecionamento 301
      }
    }
  } else{
    return {props:{
      session
    }}
  }
}

```

##### redirect after login (Frontend)
```tsx
import { FC, FormEvent, useRef, useState } from 'react';
import classes from './auth-form.module.css';
import {signUpReactQuery} from '../../fetch_utils'
import { Signup } from '../../models/signup_model';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

const AuthForm:FC = ()=> {
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

  const router = useRouter()
  const {signUp, error, isLoading, isSuccess, data} = signUpReactQuery()
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }


  const onSubmit = async (event:FormEvent) =>{
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

      if(!result.error){
        router.replace('/profile')
        return;
      }
    }
    return signUp(data)
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

```

#### Prodtect authPage (Frontend):


#### middlewares (meio estranho)
usando `middleware.ts`, criado na raiz do projeto

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("next-auth.session-token");
  const isAuthenticated = !!authCookie?.value
  const {pathname} = req.nextUrl;

  if (pathname.startsWith("/profile")) {
    if (!isAuthenticated) {
      req.nextUrl.pathname = "/auth";
      return NextResponse.redirect(req.nextUrl);
    }
  }

  return NextResponse.next();
}

```

### SessionProvider
Quando já temos alguma página validada via server (getServerSideProps), podemos passar para o `_app.tsx` a session, para não obrigar o programa a fazer uma requisição para ver esta authenticado ou não, neste casso basta pegar a session de `pageProps`

```tsx

import { AppProps } from 'next/app';
import { FC } from 'react';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import {QueryClient, QueryClientProvider} from 'react-query'
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:3,
      refetchOnWindowFocus:false
    }
  }
})

const MyApp :FC =({ Component, pageProps }:AppProps) =>{
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;

```

## Protecting API Routes
```ts
import { hashPassword } from '../../../core/encript';
import { readOneFromDb, updateInDb } from '../../../core/db';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { verifyPassword } from '../../../core/encript';
import { hash } from 'bcryptjs';

const changePassword = async(req:NextApiRequest, res:NextApiResponse) =>{
	const session = await getSession({req:req})
	if(!session){
		return res.status(401).json({message:'You shall not pass!'})
	}

	const {email} = session.user
	const {oldPassword, newPassword} = req.body

	if(!oldPassword || !newPassword){
		return res.status(422).json({message:'current and new passwords must be defined!'})
	}

	const dbUser = await readOneFromDb('users',{email:email})
	if(!(dbUser instanceof Error)){
		const isValidOldPassword = verifyPassword(oldPassword, dbUser.password)

		if(!isValidOldPassword){
			return res.status(403).json({message:'Invalid credentials!'})
		}
		const hashPassword = await hash(newPassword, 12)
		const result = await updateInDb('users', {password:hashPassword}, {email:email})

		if(!(result instanceof Error)){
			return res.status(200).json({message:'Password updated!'})
		}
		return res.status(500).json({message:result})
	}
	return res.status(404).json({message:dbUser})
}

const handler:NextApiHandler = (req, res)=>{
	const methods = {
		PATCH: ()=> changePassword(req, res)
	}

	return methods?.[req.method]()
}

export default handler

```