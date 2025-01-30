import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : []
}

export const bookmarksSlice = createSlice ({
    name : 'bookmarks',
    initialState,
    reducers : {
        addBookmark : (state, action) => {
            state.value.push(action.payload)
        },

        removeBookmark : (state, action) => {
            state.value.filter(bookmark => bookmark.name !== action.payload.name)
        }
    }
})

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer