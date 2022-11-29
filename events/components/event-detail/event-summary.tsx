import { PropsWithChildren } from 'react';
import classes from './event-summary.module.css';

interface Props extends PropsWithChildren{
  title:string
}

function EventSummary(props: Props) {
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;