import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommend: null,
  newDisney: null,
  original: null,
  trending: null,
}; 

// createSlice is an API built on top of Redux, which helps to reduce
// the amount of code needed to write a Redux logic. This creates a slice
// of the Redux state including its initial state, reducers, and action creators.
// Slices defined a portion of the global state and the logic for updating that 
// portion. By creating a slice, we can encapsulate the reducer logic for that portion
// and reuse it throughout the application. 
const movieSlice = createSlice({
  name: "movie",
  initialState,
  // reducers are pure functions that define how the state of an application
  // should change in response to an action. They take the current state and an 
  // action object as arguments and return a new state object that reflects the change. 
  reducers : {
    setMovies: (state, action) => {
      state.recommend = action.payload.recommend;
      state.newDisney = action.payload.newDisney;
      state.original = action.payload.original;
      state.trending = action.payload.trending;
    }
  }
})

// these are selector functions that take in the state object and return 
// a specific property from the 'movie' slice of the state.
export const { setMovies } = movieSlice.actions;
export const selectRecommend = state => state.movie.recommend;
export const selectNewDisney = state => state.movie.newDisney;
export const selectOriginal = state => state.movie.original;
export const selectTrending = state => state.movie.trending;
export default movieSlice.reducer;
