import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { DateTime } from "luxon";
import { RootState } from "../../store";
import weatherSliceState, { CurrentWeatherType, FetchDailyOptions, fetchForecastHourlyOptions, fetchWeatherOptions, ForecastDaily, ForecastHourly } from "./types";

export const fetchWeather = createAsyncThunk(
    'weather/fetchweahterStatus',
    async (options: fetchWeatherOptions) => {
        const { city, isCelsius, zone } = options
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : 'London'}&appid=c4896daa6305d6a7957041f7de285a7a&units=${isCelsius ? 'metric' : 'imperial'}`
        const { data } = await axios.get(url)
        const date = DateTime.now().setZone(`${zone}`).toFormat('cccc h:mm a')
        return {
            lon: data.coord.lon,
            lat: data.coord.lat,
            location: data.name,
            date: date,
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            windSpeed: Math.round(data.wind.speed),
            humidity: data.main.humidity,
            visibility: 10000,
            pressure: data.main.pressure,
        }
    }
)

export const fetchForecastHourly = createAsyncThunk(
    'weather/fetchForecastHourlyStatus',
    async (options: fetchForecastHourlyOptions) => {
        const { lat, lon, isCelsius } = options
        const url = `https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&lat=37&appid=c4896daa6305d6a7957041f7de285a7a&units=${isCelsius ? 'metric' : 'imperial'}`
        const { data } = await axios.get(url);
        return {
            timezone: data.timezone,
            hourly: data.hourly.slice(1, 5)
        }
    }
)

export const fetchDaily = createAsyncThunk(
    'weather/fethDailyStatus',
    async (options: FetchDailyOptions) => {
        const { lat, lon } = options
        const url = `https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&exclude=minutely,hourly&appid=c4896daa6305d6a7957041f7de285a7a&units=metric`
        const { data } = await axios.get(url)
        return data.daily.slice(1, 6)
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
    forecastHourly: { timezone: 'America/London', hourly: [] },
    forecastDaily: [],
    status: 'loading',
    forecastStatus: 'loading',
    forecastDailyStatus: 'loading',
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
        builder.addCase(fetchWeather.fulfilled, (state, action: PayloadAction<CurrentWeatherType>) => {
            state.currentWeather = action.payload
            state.status = 'fulfilled'
        })
        builder.addCase(fetchWeather.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchWeather.rejected, (state) => {
            state.status = 'rejected'
        })
        builder.addCase(fetchForecastHourly.fulfilled, (state, action: PayloadAction<ForecastHourly>) => {
            state.forecastHourly = action.payload
            state.forecastStatus = 'fulfilled'
        })
        builder.addCase(fetchForecastHourly.pending, (state) => {
            state.forecastStatus = 'loading'
        })
        builder.addCase(fetchDaily.fulfilled, (state, action: PayloadAction<ForecastDaily[]>) => {
            state.forecastDaily = action.payload
            state.forecastDailyStatus = 'fulfilled'
        })
    }
});

export const { setIsCelsius } = weatherSlice.actions

export const selectWeather = (state: RootState) => state.weatherSlice;

export default weatherSlice.reducer