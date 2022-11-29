import Layout from '../components/layout/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';
import Head from 'next/head'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
})

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name='description' content='NextJS Events' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
