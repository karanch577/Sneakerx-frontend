import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        orders: [],
        isOrderCancelled: false
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
        },
        cancelOrder: (state) => {
            state.isOrderCancelled = !state.isOrderCancelled
        }
    }
})

export const { setUser, removeUser, setOrders, cancelOrder } = userSlice.actions

export default userSlice.reducer