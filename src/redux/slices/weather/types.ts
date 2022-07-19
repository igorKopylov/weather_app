export type CurrentWeatherType = {
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
};

export type HourlyObj = {
    weather: { icon: string }[]
    dt: number;
    temp: number;
};

export type ForecastDaily = {
    dt: number;
    weather: { description: string }[];
    temp: { day: number };
    humidity: number;
    wind_speed: number;
};

export type ForecastHourly = {
    timezone: string;
    hourly: HourlyObj[]
};

export type fetchHourlyOptions = {
    lat: number;
    lon: number;
    isCelsius: boolean
};

export type FetchDailyOptions = {
    lat: number;
    lon: number;
    isCelsius: boolean
};

export type fetchWeatherOptions = {
    city: string;
    isCelsius: boolean;
    zone: string;
};

export default interface weatherSliceState {
    currentWeather: CurrentWeatherType;
    forecastHourly: ForecastHourly;
    forecastDaily: ForecastDaily[];
    status: 'loading' | 'fulfilled' | 'rejected';
    errorMessage: string | null;
    isCelsius: boolean;
}