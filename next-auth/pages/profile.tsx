import { FC, useEffect, useState } from 'react';
import UserProfile from '../components/profile/user-profile';
import { useSession, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';

const ProfilePage: FC = ()=> {
  // const [counter, setCounter] = useState<number>(5)
  // const { data, status } = useSession()
  
  // useEffect(()=>{
  //   let interval:NodeJS.Timer;
  //    if(counter < 1){
  //       clearInterval(interval)
  //       window.location.href='/auth'
  //     }
  //   if(status === 'unauthenticated' && counter === 5){
  //     interval = setInterval(()=>{
  //       setCounter((prevCoutner)=>prevCoutner - 1)
  //     }, 1000)

  //   }
  // },[status, counter])

  // if(status === 'loading' && (!session && !data)){
  //   return <p style={{display:'flex', justifyContent:'center', alignContent:'center'}}>Loading...</p>
  // }

  // if(status === 'unauthenticated'){
  //   return <p>Unauthenticated!, redirecting in {counter} secs</p>
  // }

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
