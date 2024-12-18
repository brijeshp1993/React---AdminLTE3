import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../const/const';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASEURL}/users`);
      var data=response.data;
      console.log(data);
      var user;
      data.forEach(x => {
        if (x.email.toLowerCase() == credentials.email && x.password == credentials.password) {
          user= x;
        }
      });
      console.log('NULL nothing found');
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const registerUser= createAsyncThunk('auth/registeruser',async(userData,{rejectWithValue})=>{
  try {
    const response = await axios.post(`${BASEURL}/users`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})


  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      isLoading: false,
      error: null,
      isRegister:false
    },
    reducers: {
      logout: (state) => {
        state.user = null;
      },
      registerError:(state,action)=>{
        state.error ={message:action.payload}
      },
      clearError: (state) => {
        state.error = null;
      },
      clearUser: (state) => {
        state.user = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
        
          state.isLoading = false;
          if(action.payload==null){
            state.error ="email or password not exits. Please correct and login again!"  
          }
          state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
      //Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isRegister=false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegister=true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isRegister=true;
      });
    },
  });
  

export const { logout,registerError,clearError,clearUser } = authSlice.actions;
export default authSlice.reducer;