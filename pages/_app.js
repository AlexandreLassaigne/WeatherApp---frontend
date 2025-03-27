import "../styles/globals.css";
import Head from "next/head";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import user from "../reducers/user";
import bookmarks from "../reducers/bookmarks";
import history from "../reducers/history";
import city from "../reducers/city"

const reducers = combineReducers({user, bookmarks, history, city})

const persistConfig = { key : "Weatherapp", storage}
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false}),
});
const persistor = persistStore(store)


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Head>
        <title>WeatherApp</title>
        <meta
          name="description"
          content="Weather app is a web application that lets you see the weather in cities and bookmark your favorite cities"
        />
      </Head>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
