import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: "navbar",
    initialState: {
        mobileScreen: false
    },
    reducers: {
        showMobileNav: (state) => {
            state.mobileScreen = true;
        },
        hideMobileNav: (state) => {
            state.mobileScreen = false;
        }
    }
})

export const { showMobileNav, hideMobileNav } = navbarSlice.actions

export default navbarSlice.reducer