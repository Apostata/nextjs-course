import { AppProps } from 'next/app';
import { FC } from 'react';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import {QueryClient, QueryClientProvider} from 'react-query'
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:3,
      refetchOnWindowFocus:false
    }
  }
})

const MyApp :FC =({ Component, pageProps }:AppProps) =>{
  return (
    <SessionProvider session={pageProps.session}>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
