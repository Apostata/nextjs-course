import { AppProps } from 'next/app';
import { FC } from 'react';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

const MyApp :FC =({ Component, pageProps }:AppProps) =>{
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
