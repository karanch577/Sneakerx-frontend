import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        orders: []
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = null
        },
        setOrders: (state, action) => {
            state.orders = action.payload
        }
    }
})

export const { setUser, removeUser, setOrders } = userSlice.actions

export default userSlice.reducer