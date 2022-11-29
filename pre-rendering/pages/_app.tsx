import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
})

function MyApp({ Component, pageProps }) {
  return <QueryClientProvider client={queryClient}><Component {...pageProps} /></QueryClientProvider>
}

export default MyApp
