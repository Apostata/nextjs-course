import { FC } from 'react';
import classes from './starting-page.module.css';

const StartingPageContent:FC =() =>{
  // Show Link to Login page if NOT auth

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );
}

export default StartingPageContent;
