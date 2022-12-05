import { FC, Fragment, PropsWithChildren } from 'react';

import MainNavigation from './main-navigation';

const Layout:FC<PropsWithChildren> = ({children})=> {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;
