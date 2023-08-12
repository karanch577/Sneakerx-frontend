import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        appliedCoupon: null
    },
    reducers: {
        addToCart: (state, actions) => {
            let isUpdated = false
            let newCartValue = [];

            // check if the product already exist, then increase the count else add it

            const updatedCart = state.cartItems.map(item => {
                if(item.product?._id === actions.payload?.product?._id && item?.size === actions.payload?.size) {
                    item.count += 1 
                    isUpdated = true
                }
                return item
            })
            newCartValue = [...updatedCart]

            if(isUpdated) {
                state.cartItems = newCartValue 
            } else {
                newCartValue.push(actions.payload)   
                state.cartItems = newCartValue 
            }
        },
        updateCart: (state, actions) => {
            const updatedCart = state.cartItems.map(item => {
                if(actions.payload?.productId === item.product?._id) {
                    item = {...item, [actions.payload.property]: Number(actions.payload.value)}
                }
                return item;
            })

            state.cartItems = updatedCart;
        },
        deleteFromCart: (state, actions) => {
            const updatedCart = state.cartItems.filter(item => item.product._id !== actions.payload.productId)

            state.cartItems = updatedCart;
        },
        addCoupon: (state, actions) => {
            state.appliedCoupon = actions.payload
        }
    }
})

export const { addToCart, updateCart, deleteFromCart, addCoupon } = cartSlice.actions

export default cartSlice.reducer