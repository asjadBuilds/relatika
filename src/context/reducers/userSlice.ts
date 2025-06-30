import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{value:{}},
    reducers:{
        setUser:(state,userDetails:any)=>{
            state.value=userDetails.payload
        }
    }
})
export const {setUser} = userSlice.actions;
export default userSlice.reducer;