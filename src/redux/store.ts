import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import searchSlice from './slices/search/slice';
import weatherSlice from './slices/weather/slice'

const store = configureStore({
    reducer: {
        searchSlice,
        weatherSlice
    }
});

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store