import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params, thunkAPI) => {
  const {category, sortBy, order, search, currentPage} = params
  const { data } =  await axios.get(`https://63bef57b585bedcb36bbc728.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
  return data
})

const initialState = {
  items: [],
  status: 'loading' 
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = 'error'
      state.items = []
    })
  }
})

export const selectPizzaData = (state) => state.pizza

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer