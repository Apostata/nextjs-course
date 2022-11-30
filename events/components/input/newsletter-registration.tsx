import classes from './newsletter-registration.module.css';
import{postNewsletterUserAddMutation} from '../../helpers/fetch-utils'
import { FormEvent, useCallback, useRef } from 'react';
const NewsletterRegistration = () => {
  const emailRef = useRef<HTMLInputElement>()

  const onSuccess = useCallback((data:any)=>{
    console.log(data?.data)
  },[])

  const {signUp, isSuccess, data} = postNewsletterUserAddMutation(onSuccess)
  const registrationHandler = (event:FormEvent) => {
    event.preventDefault();
    signUp(emailRef.current.value)
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
