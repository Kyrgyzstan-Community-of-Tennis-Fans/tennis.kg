import { categorySlice } from '@/features/category/categorySlice';
import { ratingsSlice } from '@/features/ratings/ratingsSlice';
import { usersSlice } from '@/features/users/usersSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CarouselReducer } from '@/features/carousel/CarouselSlice';
import { partnerReducer } from '@/features/partners/partnerSlice';
import { ratingMembersReducer } from '@/features/mainRatingMembers/ratingMembersSlice';
import { newsReducer } from '@/features/news/newsSlice';
import { footersReducer } from '@/features/footers/footersSlice';

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
  ratings: ratingsSlice.reducer,
  ratingMembers: ratingMembersReducer,
  footers: footersReducer,
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
