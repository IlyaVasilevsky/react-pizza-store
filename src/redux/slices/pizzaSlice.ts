import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type PizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};

export const fetchPizza = createAsyncThunk<Pizza[], PizzaParams>('pizza/fetchPizzaStatus', async (params) => {
  const {category, sortBy, order, search, currentPage} = params
  const { data } =  await axios.get<Pizza[]>(`https://63bef57b585bedcb36bbc728.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
  return data
})

type Pizza = {
  id: string,
  title: string, 
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaSliceState {
  items: Pizza[] ;
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING 
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
})

export const selectPizzaData = (state: RootState) => state.pizza

export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer