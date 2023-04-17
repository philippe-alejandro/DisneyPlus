import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import movieReducer from '../features/movie/movieSlice';

export default configureStore({
  reducer: {
    // your reducers here
    user: userReducer,
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // options go here
      serializableCheck: false,
  }),
});