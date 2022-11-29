import Link from 'next/link';
import { PropsWithChildren } from 'react';

import classes from './button.module.css';
interface Props extends PropsWithChildren{
  link?: string,
  onClick?: ()=>void
}

function Button(props: Props) {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
