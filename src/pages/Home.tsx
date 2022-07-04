import React, { useEffect } from 'react';
import Header from '../components/Header';
import styled from 'styled-components'
import Forecast from '../components/Forecast/Forecast';
import { useAppDispatch } from '../redux/store';
import { fetchForecast, selectWeather } from '../redux/slices/weather/slice';
import { useSelector } from 'react-redux';
import { selectSearch, setInputValue, setSearchValue } from '../redux/slices/search/slice';
import Current from '../components/Current';

const Content = styled.div`
    display: flex;
    align-items: center;
`;

const Home: React.FC = () => {
    const { searchValue } = useSelector(selectSearch);
    const { currentWeather, forecast, isCelsius } = useSelector(selectWeather)
    const dispatch = useAppDispatch();
    const { inputValue } = useSelector(selectSearch);
    const icon = `https://openweathermap.org/img/wn/09n@2x.png`;

    const onPressEnter = (event: any) => {
        if (event.key === 'Enter') {
            dispatch(setSearchValue(inputValue))
            dispatch(setInputValue(''))
        }
    };

    useEffect(() => {
        dispatch(fetchForecast({
            lon: currentWeather.lon,
            lat: currentWeather.lat,
            isCelsius
        }))
    }, [searchValue, isCelsius]);

    return (
        <div onKeyPress={event => onPressEnter(event)}>
            <Header />
            <Content>
                <Current />
                {
                    forecast.map((obj, i) => {
                        const date = new Date(obj.dt * 1000).toLocaleString('en', { hour: '2-digit' })
                        const iconUrl = `https://openweathermap.org/img/wn/${obj.weather[0].icon.slice(0, -1) + 'd'}@2x.png`
                        return <Forecast key={i} date={date} iconUrl={iconUrl} temp={Math.round(obj.temp)} />
                    })
                }
            </Content>
        </div>
    )
}

export default Home
