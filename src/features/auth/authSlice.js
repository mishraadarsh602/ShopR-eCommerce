import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import {createUser,checkUser} from "./authAPI";

const initialState = {
    loggedInUser:null,
    status:"idle",
    error:null
}
//action userdata 
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;

  }
);

//action checkuser 
export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (loginInfo) => {
      const response = await checkUser(loginInfo);
      return response;
    }
  );

export const authReducer = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
   
      state.value += 1;
    },
   
  },
  extraReducers: (builder) => {
    builder
   
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;

      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
  },
});

//action creators
// export const { increment } = productSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authReducer.reducer;