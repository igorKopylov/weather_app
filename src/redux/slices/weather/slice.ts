import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { DateTime } from "luxon";
import { RootState } from "../../store";
import weatherSliceState, { currentWeatherType, fetchForeCastOptions, fetchWeatherOptions, Forecast } from "./types";

export const fetchWeather = createAsyncThunk(
    'weather/fetchweahterStatus',
    async (options: fetchWeatherOptions) => {
        const { city, isCelsius, zone } = options
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : 'London'}&appid=c4896daa6305d6a7957041f7de285a7a&units=${isCelsius ? 'metric' : 'imperial'}`
        const { data } = await axios.get(url)
        // const date = new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleString('en', { weekday: 'long', hour: '2-digit', minute: '2-digit' })
        const date = DateTime.now().setZone(`${zone}`).toFormat('cccc h:mm a')
        return {
            lon: data.coord.lon,
            lat: data.coord.lat,
            location: data.name,
            date: date,
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
            visibility: 10000,
            pressure: data.main.pressure,
        }
    }
)

export const fetchForecast = createAsyncThunk(
    'weather/fetchForecastStatus',
    async (options: fetchForeCastOptions) => {
        const { lat, lon, isCelsius } = options
        const url = `https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&lat=37&appid=c4896daa6305d6a7957041f7de285a7a&units=${isCelsius ? 'metric' : 'imperial'}`
        const { data } = await axios.get(url);
        console.log(DateTime.fromSeconds(1657468800).setZone(data.timezone).toFormat('cccc'))
        return data
    }
)

export const fetchNextDay = createAsyncThunk(
    'weather/fethNextDayStatus',
    async () => {
        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=London&appid=c4896daa6305d6a7957041f7de285a7a&units=metric')
        return {
            data
        }
    }
)

const initialState: weatherSliceState = {
    currentWeather: {
        lat: 51.509865,
        lon: -0.118092,
        location: 'London',
        date: 'Sunday 07:09',
        temp: 12,
        description: 'clear sky',
        humidity: 50,
        windSpeed: 1.03,
        visibility: 10000,
        pressure: 1031,
    },
    forecast: { timezone: 'America/London', hourly: [] },
    ForecastNextDay: {
        day: 'wednesday',
        temp: 19,
        description: 'clear sky',
        windSpeed: 5,
        humidity: 57
    },
    status: 'loading',
    forecastStatus: 'loading',
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
        builder.addCase(fetchForecast.fulfilled, (state, action: PayloadAction<Forecast>) => {
            state.forecast = action.payload
            state.forecastStatus = 'fulfilled'
        })
        builder.addCase(fetchForecast.pending, (state) => {
            state.forecastStatus = 'loading'
        })
    }
});

export const { setIsCelsius } = weatherSlice.actions

export const selectWeather = (state: RootState) => state.weatherSlice;

export default weatherSlice.reducer