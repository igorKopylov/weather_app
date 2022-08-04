import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { _ActionCreatorWithPreparedPayload } from "@reduxjs/toolkit/dist/createAction";
import axios from "axios";
import { DateTime } from "luxon";
import { RootState } from "../../store";
import weatherSliceState, { CurrentWeatherType, FetchDailyOptions, fetchHourlyOptions, fetchWeatherOptions, ForecastDaily, ForecastHourly } from "./types";



export const fetchCurrentWeather = createAsyncThunk<CurrentWeatherType, fetchWeatherOptions, { rejectValue: string | null }>(
    'weather/fetchCurrentWeatherStatus',
    async (options, thunkApi) => {
        const { city, isCelsius, zone } = options
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : 'London'}&appid=c4896daa6305d6a7957041f7de285a7a&units=${isCelsius ? 'metric' : 'imperial'}`
        try {
            const { data } = await axios.get(url)
            const date = DateTime.now().setZone(`${zone}`).toFormat('cccc h:mm a')
            const formattedData = {
                lon: data.coord.lon,
                lat: data.coord.lat,
                location: data.name,
                date: date,
                temp: Math.round(data.main.temp),
                description: data.weather[0].description,
                windSpeed: Math.round(data.wind.speed),
                humidity: data.main.humidity,
                visibility: 10000,
                pressure: data.main.pressure
            }
            return formattedData as CurrentWeatherType
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data.message)
        }
    }
)

export const fetchHourly = createAsyncThunk(
    'weather/fetchHourlyStatusssssssss',
    async (options: fetchHourlyOptions) => {
        const { lat, lon, isCelsius } = options
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=c4896daa6305d6a7957041f7de285a7a&units=${isCelsius ? 'metric' : 'imperial'}`
        const { data } = await axios.get(url);
        const formattedData = {
            timezone: data.timezone,
            hourly: data.hourly.slice(1, 5)
        }
        return formattedData as ForecastHourly
    }
)

export const fetchDaily = createAsyncThunk(
    'weather/fethDailyStatus',
    async (options: FetchDailyOptions) => {
        const { lat, lon, isCelsius } = options
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=c4896daa6305d6a7957041f7de285a7a&units=${isCelsius ? 'metric' : 'imperial'}`
        const { data } = await axios.get(url)
        return data.daily.slice(1, 5) as ForecastDaily[]
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
    errorMessage: null,
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
        builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
            state.currentWeather = action.payload
            state.status = 'fulfilled'
        })
        builder.addCase(fetchCurrentWeather.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchHourly.fulfilled, (state, action) => {
            state.forecastHourly = action.payload
        })
        builder.addCase(fetchDaily.fulfilled, (state, action) => {
            state.forecastDaily = action.payload
        })
        builder.addMatcher(action => action.type.endsWith('rejected'), (state, action: PayloadAction<string>) => {
            state.status = 'rejected'
            state.errorMessage = action.payload;
        })
    }
});

export const { setIsCelsius } = weatherSlice.actions

export const selectWeather = (state: RootState) => state.weatherSlice;

export default weatherSlice.reducer