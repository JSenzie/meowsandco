import { configureStore, combineReducers } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { productSlice } from "./slices/productSlice"
import { cartSlice } from "./slices/cartSlice"
import { userSlice } from "./slices/userSlice"
import { orderSlice } from "./slices/orderSlice"

const reducer = combineReducers({
  productList: productSlice.reducer,
  cartList: cartSlice.reducer,
  userLogin: userSlice.reducer,
  orders: orderSlice.reducer,
})

export const initialState = {}

const middleware = [thunk]

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: middleware,
})

export default store
