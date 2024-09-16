import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:false
};

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false
            state.error=false
         },
         signInFail:(state,action)=>{
            state.loading=false
            state.error=action.payload
         }
    }
})

export const {signInStart,signSuccess,signInFail}=userSlice.actions;
export default userSlice.reducer