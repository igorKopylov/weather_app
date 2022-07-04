import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store";
import searchSliceState from "./types";


const initialState: searchSliceState = {
    inputValue: '',
    searchValue: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        }
    }
});

export const selectSearch = (state: RootState) => state.searchSlice

export const { setInputValue, setSearchValue } = searchSlice.actions;

export default searchSlice.reducer