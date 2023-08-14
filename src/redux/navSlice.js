import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: "navbar",
    initialState: {
        mobileScreen: false,
        categoryList: []
    },
    reducers: {
        showMobileNav: (state) => {
            state.mobileScreen = true;
        },
        hideMobileNav: (state) => {
            state.mobileScreen = false;
        },
        addCategoryList: (state, action) => {
            state.categoryList = action.payload
        }
    }
})

export const { showMobileNav, hideMobileNav, addCategoryList } = navbarSlice.actions

export default navbarSlice.reducer