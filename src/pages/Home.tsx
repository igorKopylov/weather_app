import React, { useEffect } from 'react';
import Header from '../components/Header';
import styled from 'styled-components'
import Forecast from '../components/forecast/Forecast';
import { useAppDispatch } from '../redux/store';
import { fetchDaily, fetchForecastHourly, selectWeather } from '../redux/slices/weather/slice';
import { useSelector } from 'react-redux';
import { selectSearch, setInputValue, setSearchValue } from '../redux/slices/search/slice';
import Current from '../components/current/Current';
import Skeleton from '../components/forecast/Skeleton';
import TableCurrentData from '../components/current/TableCurrentData';
import TableDailyData from '../components/forecast/TableDailyData';
import { DateTime } from 'luxon';

const ContentTop = styled.div`
    display: flex;
    margin-bottom: 116px;
`;

const ForecastSkeleton = styled.div`
    &:not(:last-child) {
        margin-right: 160px;
    }
`;

const ContentFiveDays = styled.div`
    width: 1300px;
    border: 2px solid #000;
    border-radius: 50px;
    margin: 100px auto;
`

const Home: React.FC = () => {
    const { currentWeather, forecastHourly, forecastDaily, isCelsius, forecastStatus } = useSelector(selectWeather);
    const dispatch = useAppDispatch();
    const { inputValue, searchValue } = useSelector(selectSearch);

    const onPressEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (inputValue) {
            if (event.key === 'Enter') {
                dispatch(setSearchValue(inputValue))
                dispatch(setInputValue(''))
            }
        }
    };

    useEffect(() => {
        dispatch(fetchForecastHourly({
            lon: currentWeather.lon,
            lat: currentWeather.lat,
            isCelsius
        }))
    }, [searchValue, currentWeather, isCelsius]);

    useEffect(() => {
        dispatch(fetchDaily({
            lon: currentWeather.lon,
            lat: currentWeather.lat
        }))
    }, [currentWeather.lat, currentWeather.lon]);

    return (
        <div onKeyPress={event => onPressEnter(event)}>
            <Header />
            <ContentTop>
                <Current />
                {
                    forecastStatus === 'fulfilled' && forecastHourly.hourly.map((obj: any, i: number) => {
                        const time = DateTime.fromSeconds(obj.dt).setZone(forecastHourly.timezone).toFormat('h')
                        const halfDay = DateTime.fromSeconds(obj.dt).setZone(forecastHourly.timezone).toFormat('a')
                        const formattedHalfDay = halfDay.includes('PM') ? 'pm' : 'am'
                        const iconUrl = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`
                        return <Forecast key={i} time={time} halfDay={formattedHalfDay} iconUrl={iconUrl} temp={Math.round(obj.temp)} />
                    })
                }
                {
                    forecastStatus === 'loading' && [...new Array(4)].map((_, i) => <ForecastSkeleton key={i}><Skeleton /></ForecastSkeleton>)
                }
            </ContentTop>
            <TableCurrentData />
            <ContentFiveDays>
                {
                    forecastDaily.map((obj, i) => {
                        const day = DateTime.fromSeconds(obj.dt).setZone(forecastHourly.timezone).toFormat('cccc')
                        return <TableDailyData
                            key={i}
                            day={day}
                            description={obj.weather[0].description}
                            humidity={obj.humidity}
                            windSpeed={Math.round(obj.wind_speed)}
                            temp={Math.round(obj.temp.day)}
                        />
                    })
                }
            </ContentFiveDays>
        </div>
    )
}

export default Home
