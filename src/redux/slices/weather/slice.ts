import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../store"
import weatherSliceState, { currentWeatherType, fetchForeCastOptions, fetchWeatherOptions } from "./types"

export const fetchWeather = createAsyncThunk(
    'weather/fetchweahterStatus',
    async (options: fetchWeatherOptions) => {
        const { city, isCelsius } = options

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : 'London'}&appid=c4896daa6305d6a7957041f7de285a7a&units=${isCelsius ? 'metric' : 'imperial'}`
        const { data } = await axios.get(url)
        const date = new Date(data.dt * 1000).toLocaleString('en', { weekday: 'long', hour: '2-digit', minute: '2-digit' })
        return {
            lon: data.coord.lon,
            lat: data.coord.lat,
            location: data.name,
            date,
            temp: Math.round(data.main.temp)
        }
    }
)

export const fetchForecast = createAsyncThunk(
    'weather/fetchForecastStatus',
    async (options: fetchForeCastOptions) => {
        const { lat, lon, isCelsius } = options
        const url = `https://api.openweathermap.org/data/2.5/onecall?lon=${lat}&lat=${lon}&lat=37&appid=c4896daa6305d6a7957041f7de285a7a&units=${isCelsius ? 'metric' : 'imperial'}`
        const { data } = await axios.get(url)
        return data.hourly.slice(1, 5)
    }
)

const initialState: weatherSliceState = {
    currentWeather: { lat: -74, lon: 40, location: 'London', date: 'Sunday 07:09', temp: 12 },
    forecast: [],
    status: 'loading',
    isCelsius: true
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setIsCelsius(state) {
            state.isCelsius = !state.isCelsius
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.fulfilled, (state, action: PayloadAction<currentWeatherType>) => {
            state.currentWeather = action.payload
            state.status = 'fulfilled'
        })
        builder.addCase(fetchWeather.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchWeather.rejected, (state) => {
            state.status = 'rejected'
        })
        builder.addCase(fetchForecast.fulfilled, (state, action) => {
            state.forecast = action.payload
        })
    }
});

export const { setIsCelsius } = weatherSlice.actions

export const selectWeather = (state: RootState) => state.weatherSlice;

export default weatherSlice.reducer