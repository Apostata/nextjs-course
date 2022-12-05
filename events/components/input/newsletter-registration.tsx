import classes from './newsletter-registration.module.css';
import{postNewsletterUserAddMutation} from '../../helpers/fetch-utils'
import { FormEvent, useCallback, useRef } from 'react';
import { useNotificationContext } from '../../store/notification_context';

const NewsletterRegistration = () => {
  const {showNotification} = useNotificationContext()

  const emailRef = useRef<HTMLInputElement>()

  const onError = useCallback((e:Error)=>{
    showNotification({title:'SignUp', status:'error', message:e.message})
  },[showNotification])

  const onSuccess = useCallback(()=>{
    showNotification({title:'SignUp', status:'success', message:`${emailRef.current.value} as registered succesfuly!`})
  },[showNotification])

  const {signUp, isSuccess, data} = postNewsletterUserAddMutation(onSuccess, onError)
  const registrationHandler = (event:FormEvent) => {
    event.preventDefault();
    showNotification({title:'SignUp', status:'pending', message:`registering ${emailRef.current.value} ...`})
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
