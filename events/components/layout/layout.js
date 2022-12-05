import { Fragment } from 'react';
import MainHeader from './main-header';
import { useNotificationContext } from '../../store/notification_context';
import Notification from '../notification/notification';

function Layout(props) {
  const { notification } = useNotificationContext()
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && <Notification  {...notification} />}
    </Fragment>
  );
}

export default Layout;
