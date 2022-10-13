import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import '../styles/DefaultLayout.css'
import NextNProgress from "nextjs-progressbar";
import { QueryClientProvider, QueryClient } from 'react-query';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

// create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextNProgress
        color="#FFA500"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      {/* <QueryClientProvider client={queryClient}> */}
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      {/* </QueryClientProvider> */}
    </SessionProvider>
  )
}

export default MyApp
