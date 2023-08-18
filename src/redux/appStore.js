import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navSlice.js";
import userReducer from "./userSlice.js";
import cartReducer from "./cartSlice.js";
import searchReducer from "./searchSlice.js";

const appStore = configureStore({
    reducer: {
        navbar: navbarReducer,
        user: userReducer,
        cart: cartReducer,
        search: searchReducer
    }
})

export default appStore;