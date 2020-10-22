/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'semantic-ui-css/semantic.min.css'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import * as serviceWorker from 'serviceWorker';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ThemeProvider } from 'styled-components';

import 'sanitize.css/sanitize.css';

// Initialize languages
import './locales/i18n';

import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';
import theme from './theme'

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const { store, persistor } = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <Component />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);

const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./app', './locales/i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    const App = require('./app').App;
    render(App);
  });
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
