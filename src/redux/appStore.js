import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navSlice.js"
import userReducer from "./userSlice.js";
import cartReducer from "./cartSlice.js"

const appStore = configureStore({
    reducer: {
        navbar: navbarReducer,
        user: userReducer,
        cart: cartReducer
    }
})

export default appStore;