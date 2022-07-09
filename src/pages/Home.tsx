import React, { useEffect } from 'react';
import Header from '../components/Header';
import styled from 'styled-components'
import Forecast from '../components/forecast/Forecast';
import { useAppDispatch } from '../redux/store';
import { fetchForecast, selectWeather } from '../redux/slices/weather/slice';
import { useSelector } from 'react-redux';
import { selectSearch, setInputValue, setSearchValue } from '../redux/slices/search/slice';
import Current from '../components/current/Current';
import Skeleton from '../components/forecast/Skeleton';
import TableCurrentData from '../components/current/TableCurrentData';
import NextDayData from '../components/forecast/NextDayData';

const Content = styled.div`

`;

const ContentTop = styled.div`
    display: flex;
    margin-bottom: 116px;
`

const ContentForeCast = styled.div`
    display: flex;
    align-items: center;
    width: 920px;
`;

const ForecastSkeleton = styled.div`
    &:not(:last-child) {
        margin-right: 160px;
    }
`

const Home: React.FC = () => {
    const { currentWeather, forecast, isCelsius, forecastStatus } = useSelector(selectWeather);
    const dispatch = useAppDispatch();
    const { inputValue, searchValue } = useSelector(selectSearch);
    const forecastHourly = forecast.hourly.slice(1, 5);

    const onPressEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (inputValue) {
            if (event.key === 'Enter') {
                dispatch(setSearchValue(inputValue))
                dispatch(setInputValue(''))
            }
        }
    };

    useEffect(() => {
        dispatch(fetchForecast({
            lon: currentWeather.lon,
            lat: currentWeather.lat,
            isCelsius
        }))
    }, [searchValue, currentWeather, isCelsius]);

    return (
        <div onKeyPress={event => onPressEnter(event)}>
            <Header />
            <Content>
                <ContentTop>
                    <Current />
                    {
                        forecastStatus === 'fulfilled' && forecastHourly.map((obj, i: number) => {
                            const time = currentWeather.date.split(' ')[1].slice(0, -3)
                            const halfDay = currentWeather.date.includes('PM') ? 'pm' : 'am'
                            const iconUrl = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`
                            return <Forecast key={i} time={(Number(time) + (i + 1))} halfDay={halfDay} iconUrl={iconUrl} temp={Math.round(obj.temp)} />
                        })
                    }
                    {
                        forecastStatus === 'loading' && [...new Array(4)].map((_, i) => <ForecastSkeleton key={i}><Skeleton /></ForecastSkeleton>)
                    }
                </ContentTop>
                <TableCurrentData />
                <NextDayData />
            </Content>
        </div>
    )
}

export default Home
