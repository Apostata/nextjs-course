import Layout from '../components/layout/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';
import Head from 'next/head'
import Notification from '../components/notification/notification';
import { NotificationContextProvider } from '../store/notification_context';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
})

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <title>Next Events</title>
            <meta name='description' content='NextJS Events' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
