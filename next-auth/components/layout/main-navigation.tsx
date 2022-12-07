import Link from 'next/link';
import { FC, SyntheticEvent } from 'react';

import classes from './main-navigation.module.css';
import { useSession, signOut } from 'next-auth/react';

const MainNavigation: FC =()=> {
  const {data:session, status} = useSession()
  
  const onLogout = (event:SyntheticEvent)=>{
    event.preventDefault()
    signOut()
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
          <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
         {(!session && status==='unauthenticated') && <li>
            <Link href='/auth'>Login</Link>
          </li>}
          { session && <li>
              <Link href='/profile'>Profile</Link>
            </li>
          }
          {session && <li>
            <button onClick={onLogout}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
