import { createSlice } from "@reduxjs/toolkit";

const initialState:{userId:number,jwtToken:string,userName:string}={
    userId:0,
    jwtToken:"",
    userName:""
}

const userDetailsSlice=createSlice({
    name:'userDetails',
    initialState,
    reducers:{
        setUserId:(state,action)=>{
            state.userId=action.payload
        },
        setJwt:(state,action)=>{
            state.jwtToken=action.payload
        },
        setUserName:(state,action)=>{
            state.userName=action.payload
        },
        logOutUser:(state)=>{
            state.userId=0,
            state.jwtToken="",
            state.userName=""
        }
    }
})


export const {setUserId,logOutUser,setJwt,setUserName}=userDetailsSlice.actions;
export default userDetailsSlice.reducer;
