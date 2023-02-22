import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const loginUrl = "/api/users/login/"
const registerUrl = "/api/users/register/"

let userInfo = {}

if (localStorage.getItem("userInfo")) {
  userInfo = JSON.parse(localStorage.getItem("userInfo"))
}

const initialState = {
  userInfo: userInfo,
  loading: false,
  error: [],
  userDetails: {},
  success: null,
}

export const userLoginUser = createAsyncThunk("users/userLoginUser", async (args, thunkAPI) => {
  const { email, password } = args

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(loginUrl, { username: email.toLowerCase(), password: password }, config)
    localStorage.setItem("userInfo", JSON.stringify(data))
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "Email or password were not correct" })
  }
})

export const userRegister = createAsyncThunk("users/userRegister", async (args, thunkAPI) => {
  const { name, email, password } = args

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(registerUrl, { name: name, email: email.toLowerCase(), password: password }, config)
    localStorage.setItem("userInfo", JSON.stringify(data))
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "Failed to register user. Email might already be in use." })
  }
})

export const getUserDetails = createAsyncThunk("users/getUserDetails", async (id, thunkAPI) => {
  try {
    const {
      userLogin: { userInfo },
    } = thunkAPI.getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}/`, config)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "Failed" })
  }
})

export const userUpdate = createAsyncThunk("users/userUpdate", async (user, thunkAPI) => {
  try {
    const {
      userLogin: { userInfo },
    } = thunkAPI.getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put("/api/users/profile/update/", user, config)
    localStorage.setItem("userInfo", JSON.stringify(data))
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "Failed to update user" })
  }
})

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userLogout(state) {
      state.userInfo = {}
      state.loading = false
      state.error = []
      state.userDetails = {}
    },

    userProfileReset(state) {
      state.loading = false
      state.error = []
      state.userDetails = {}
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(userLoginUser.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        state.error = []
      })
      .addCase(userLoginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        state.error = []
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false
        state.userDetails = action.payload
        state.error = []
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(userUpdate.pending, (state) => {
        state.loading = true
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.userInfo = action.payload
        state.success = true
        state.error = []
        state.loading = false
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { userLogout, userProfileReset } = userSlice.actions
