import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        searchResult: []
    },
    reducers: {
        addSearchResult: (state, actions) => {
            state.searchResult = actions.payload
        }
    }
})

export const { addSearchResult } = searchSlice.actions

export default searchSlice.reducer