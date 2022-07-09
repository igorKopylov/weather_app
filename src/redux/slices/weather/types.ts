export type currentWeatherType = {
    lat: number;
    lon: number;
    location: string;
    date: string;
    temp: number;
    description: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    pressure: number;
}

export type ForecastHourly = {
    weather: { icon: string }[]
    dt: number;
    temp: number;
}

export type ForecastNextDay = {
    day: string;
    temp: number;
    description: string;
    humidity: number;
    windSpeed: number;
}

export type Forecast = {
    timezone: string;
    hourly: ForecastHourly[]
}

export type fetchForeCastOptions = {
    lat: number,
    lon: number,
    isCelsius: boolean
}

export type fetchWeatherOptions = {
    city: string;
    isCelsius: boolean;
    zone: string;
}

export default interface weatherSliceState {
    currentWeather: currentWeatherType;
    forecast: Forecast;
    ForecastNextDay: ForecastNextDay
    status: 'loading' | 'fulfilled' | 'rejected';
    forecastStatus: 'loading' | 'fulfilled' | 'rejected';
    isCelsius: boolean;
}