import { ComponentType, ElementType, PropsWithChildren, ReactNode } from 'react';
import { Interface } from 'readline';
import classes from './logistics-item.module.css';

interface Props extends PropsWithChildren{
  icon: ComponentType
}

function LogisticsItem(props: Props) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
