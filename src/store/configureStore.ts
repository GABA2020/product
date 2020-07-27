import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { createReducer } from './reducers';
import { Reducer } from 'redux';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth', 'storage'],
  };

  const createPersistedReducer: (injectedReducers?: {
    [key: string]: Reducer;
  }) => Reducer = (injectedReducers = {}) => {
    return persistReducer(persistConfig, createReducer(injectedReducers));
  };

  const enhancers = [
    createInjectorsEnhancer({
      createReducer: createPersistedReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createPersistedReducer(),
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      ...middlewares,
    ],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });

  const persistor = persistStore(store);
  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return { store, persistor };
}
