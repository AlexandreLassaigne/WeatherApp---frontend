import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    value : {
        firstName : null,
        lastName : null,
        token : null
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        login: (state, action) => {
            state.value.firstName = action.payload.firstName,
            state.value.lastName = action.payload.lastName,
            state.value.token = action.payload.token
        },
        logout: (state) => {
            state.value.firstName = null,
            state.value.lastName = null,
            state.value.token = null
        },
        updateFirstName : (state, action) => {
            state.value.firstName = action.payload
        },
        updateLastName : (state, action) => {
            state.value.lastName = action.payload
        },
    }
})

export const {login, logout, updateFirstName, updateLastName} = userSlice.actions;
export default userSlice.reducer