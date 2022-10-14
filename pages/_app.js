import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import '../styles/DefaultLayout.css'
import NextNProgress from "nextjs-progressbar";
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import Router from 'next/router';

function MyApp({ Component, pageProps }) {

  Router.events.on("routeChangeError", (err, url, { shallow }) => {
    console.log("Navigating to: " + "url: " + url, {cancelled: err.cancelled} )
});

  return (
    <SessionProvider session={pageProps.session}>
      {/* <NextNProgress
        color="#FFA500"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      // showOnShallow={true}
      /> */}
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
