import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navSlice.js"

const appStore = configureStore({
    reducer: {
        navbar: navbarReducer,
    }
})

export default appStore;