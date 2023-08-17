import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, signOut } from "./authAPI";

const initialState = {
  loggedInUser: null,  // use to store id/role for user authentication
  status: "idle",
  error: null
}
//action userdata 
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    console.log(response.data);
    return response.data;


  }
);

//action checkuser 
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
//rejectWithValue is used to throw error in action and this will be handled by  action.payload
  async (loginInfo, { rejectWithValue }) => {
    try {
      console.log("loginInfo",loginInfo)
      const response = await checkUser(loginInfo);
      console.log("response.data.id", response.data);
      return response.data;

    }
    catch (err) {
      console.log(err)
     return rejectWithValue(err)
    }
  }
);



//action userdata 
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    return response.data;

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
        // state.error = action.error;
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })


  },
});

//action creators
// export const { increment } = productSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authReducer.reducer;
