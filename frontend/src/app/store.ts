import { categorySlice } from '@/features/category/categorySlice';
import { usersSlice } from '@/features/users/usersSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CarouselReducer } from '@/features/carousel/CarouselSlice';
import { partnerReducer } from '@/features/partners/partnerSlice';
import { newsReducer } from '@/features/news/newsSlice';

const usersPersistConfig = {
  key: 'tennis:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersSlice.reducer),
  carousel: CarouselReducer,
  partners: partnerReducer,
  news: newsReducer,
  category: categorySlice.reducer,
  news: newsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
