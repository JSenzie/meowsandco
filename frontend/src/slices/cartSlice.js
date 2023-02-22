import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const url = "/api/products/"

let cartItems = []
let shippingAddress = {}

if (localStorage.getItem("cartItems")) {
  cartItems = JSON.parse(localStorage.getItem("cartItems"))
}

if (localStorage.getItem("shippingAddress")) {
  shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"))
}

const initialState = {
  cartItems: cartItems,
  loading: false,
  error: [],
  shippingAddress: shippingAddress,
}

export const addItem = createAsyncThunk("cart/addItem", async (id, thunkAPI) => {
  try {
    const { data } = await axios.get(url + id)
    const state = thunkAPI.getState()
    const existItem = state.cartList.cartItems.find((x) => x.product === data._id)

    if (existItem) {
      return thunkAPI.rejectWithValue({ message: "Item is already in cart" })
    } else {
      const formattedData = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
      }
      if (localStorage.getItem("cartItems")) {
        const localCart = JSON.parse(localStorage.getItem("cartItems"))
        localCart.push(formattedData)
        localStorage.setItem("cartItems", JSON.stringify(localCart))
      } else {
        const arrayStr = []
        arrayStr.push(formattedData)
        const strItem = JSON.stringify(arrayStr)
        localStorage.setItem("cartItems", strItem)
      }

      return formattedData
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem(state, action) {
      state.cartItems = action.payload
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload
    },
    clearCart(state) {
      state.cartItems = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItem.pending, (state) => {
        state.loading = true
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false
        state.cartItems.push(action.payload)
        state.error = []
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { removeItem, saveShippingAddress, clearCart } = cartSlice.actions
