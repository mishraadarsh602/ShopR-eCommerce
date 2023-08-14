import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { addOrder } from "./orderAPI";

const initialState = {
   status:'idle',
   orders:[],
   currentOrder:null,
}
//action userdata 
export const addOrderAsync = createAsyncThunk(
  'order/addOrder',
  async (order) => {
    const response = await addOrder(order);
    // console.log(item)
    return response.data;

  }
);

export const orderReducer = createSlice({
  name: 'order',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
   resetOrder: (state) => {
      state.currentOrder = null;
      // console.log("order reseted")
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;

      })
  },
});

//action creators
export const { resetOrder } = orderReducer.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export default orderReducer.reducer;



