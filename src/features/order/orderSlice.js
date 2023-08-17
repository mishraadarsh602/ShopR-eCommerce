import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchAllOrders, updateOrder, } from "./orderAPI";

const initialState = {
   status:'idle',
   orders:[],
   currentOrder:null,
   totalOrders:0
}
//action userdata 
export const addOrderAsync = createAsyncThunk(
  'order/addOrder',
  
  async (order) => {
    const response = await addOrder(order);
    console.log("response order orderslice",response.data)
    return response.data;

  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort,pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    // console.log(item)
    return response.data;

  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
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
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;

      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
       const index = state.orders.findIndex(order => order.id === action.payload.id);
        state.orders[index] = action.payload;
      })
  },
});

//action creators
export const { resetOrder } = orderReducer.actions;

export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export default orderReducer.reducer;



