export type currentWeatherType = {
    lat: number;
    lon: number;
    location: string;
    date: string;
    temp: number;
}

export type Forecast = {
    weather: { icon: string }[]
    dt: number;
    iconUrl: string;
    temp: number;
}

export type fetchForeCastOptions = {
    lat: number,
    lon: number,
    isCelsius: boolean
}

export type fetchWeatherOptions = {
    city: string;
    isCelsius: boolean
}

export default interface weatherSliceState {
    currentWeather: currentWeatherType;
    forecast: Forecast[]
    status: 'loading' | 'fulfilled' | 'rejected';
    isCelsius: boolean;
}