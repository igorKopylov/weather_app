import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectSearch } from '../../redux/slices/search/slice';
import { fetchForecast, selectWeather } from '../../redux/slices/weather/slice';
import { useAppDispatch } from '../../redux/store';
import Skeleton from './Skeleton'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 110px;
    
    &:not(:last-child) {
        margin-right: 160px;
    }
`;

const Time = styled.p`
    font-size: 32px;
    color: rgba(52, 58, 64, 0.8);
`;

const Icon = styled.img`
    margin-top: 15px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #91b1fa;
`;

const Temp = styled.p`
    font-size: 32px;
    margin-top: 26px;
    color: #343A40;
`;

type ForecastProps = {
    date: string;
    iconUrl: string;
    temp: number;
}

const Forecast: React.FC<ForecastProps> = ({ date, iconUrl, temp }) => {
    const { searchValue } = useSelector(selectSearch)
    const { currentWeather, forecast, isCelsius } = useSelector(selectWeather)
    const dispatch = useAppDispatch()

    return (
        <Container>
            <Time>{date}</Time>
            <Icon src={iconUrl} alt='icon' />
            <Temp>{temp} °{isCelsius ? 'C' : 'F'}</Temp>
            <Skeleton />
        </Container>
    )
};

export default Forecast