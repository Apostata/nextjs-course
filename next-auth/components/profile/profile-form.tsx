import { FC, FormEvent, useRef } from 'react';
import classes from './profile-form.module.css';
import {updatePassReactQuery} from '../../fetch_utils'

const ProfileForm :FC= () => {
  const oldPassRef =useRef<HTMLInputElement>()
  const newPassRef =useRef<HTMLInputElement>()

  const {changePassword ,error, isLoading, isSuccess, data} = updatePassReactQuery()

  const onSubmit = (e:FormEvent) =>{
    e.preventDefault()
    changePassword({
      oldPassword:oldPassRef.current.value, 
      newPassword:newPassRef.current.value,
    })
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPassRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
