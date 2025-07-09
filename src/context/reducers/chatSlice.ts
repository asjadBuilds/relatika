import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name:'chat',
    initialState:{value:{}},
    reducers:{
        setChatDetails:(state,action: PayloadAction<any>)=>{
            state.value=action.payload
        },
        
    }
})
export const {setChatDetails} = chatSlice.actions;
export default chatSlice.reducer;