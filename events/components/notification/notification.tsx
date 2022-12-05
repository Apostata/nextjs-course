import { useContext } from 'react';

import classes from './notification.module.css';
import {INotification, useNotificationContext} from '../../store/notification_context'


function Notification(props:INotification) {
const {hideNotification, } = useNotificationContext()

  const { title, message, status='pending' } = props;
  const statusClasses = classes[status];
  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} 
		onClick={hideNotification}
	>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;