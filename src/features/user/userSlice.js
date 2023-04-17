import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
}; 

const userSlice = createSlice({
  name: "user",
  initialState,
  // reducer function are used to update specific parts or slices of the 
  // application's state. In this case, there are two reducer functions that modify
  // the user slice of the application. In other components or files, an action creator
  // is used to pass an object with properties that have values which will update the state 
  // of the user slice. These functions are set for changing the state when the user logs in 
  // and signs out.  
  reducers : {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;  
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },

    setSignOutState: (state) => {
      state.name = null;
      state.email = null;
      state.photo = null;
    }
  }
})

// these are selector functions that are used in conjuction with the 
// useSelector hook to access the current state of an app's slice. 
// The properties being retuned here are user's data points.  
export const {setUserLoginDetails, setSignOutState} = userSlice.actions;
export const selectUserName = state => state.user.name;
export const selectUserEmail = state => state.user.email;
export const selectUserPhoto = state => state.user.photo;
export default userSlice.reducer;