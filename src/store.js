import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createTransform } from 'redux-persist';
import authReducer from './AuthSlice';
import { encryptData, decryptData } from './utilities/encryptionUtils';

// Define a custom transform for encrypting and decrypting the persisted state
const encryptTransform = createTransform(
  (inboundState) => {
    return encryptData(inboundState);
  },
  (outboundState) => {
    return decryptData(outboundState);
  },
  { whitelist: ['auth'] }
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptTransform],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };


// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './AuthSlice';

// const store = configureStore({
//     reducer:{
//         auth: authReducer,
//     }
// })

// export default store;