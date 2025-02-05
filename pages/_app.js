import "../styles/globals.css";
import Head from "next/head";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import bookmarks from "../reducers/bookmarks";
import history from "../reducers/history";

const store = configureStore({
  reducer: { user, bookmarks, history },
});
function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Weather App</title>
        <meta
          name="description"
          content="Weather app is a web application that lets you see the weather in cities and bookmark your favorite cities"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
