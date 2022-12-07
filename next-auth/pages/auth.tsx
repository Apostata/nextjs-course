import { FC, useState } from 'react';
import AuthForm from '../components/auth/auth-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const AuthPage:FC =() =>{
  const router = useRouter()
  const { data, status } = useSession()
  const [isFirstRender, setIsFirstRender] = useState(true)
 
  if(status === 'loading'){
    return <p>Loading...</p>
  }
  if(!data){
    return <AuthForm setIsFirstRender={()=>setIsFirstRender(false)}/>;
  }
  if(data && isFirstRender){
    router.replace('/')
  }
  
}

export default AuthPage;
