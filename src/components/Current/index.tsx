import React, { lazy, Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectSearch } from '../../redux/slices/search/slice';
import { selectWeather } from '../../redux/slices/weather/slice';
import { useAppDispatch } from '../../redux/store';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 140px 0 105px;
    width: 235px;
    height: 205px;

    @media (max-width: 1275px) {
            margin: 0 100px 0 70px;
    }

    @media (max-width: 1205px) {
        margin: auto;
    }
`;

const CurrentDate = styled.p`
    font-size: 18px;
    color: rgba(52, 58, 64, 0.9);
    margin: 12px 0 14px 0;
`;

const CurrentTemp = styled.h1`
    color: #343A40;
    font-size: 96px;
    font-weight: 500;
`;

const Current: React.FC = () => {
    const { currentWeather, isCelsius } = useSelector(selectWeather);
    const dispatch = useAppDispatch();

    return (
        <Wrapper>
            <h1 style={{ color: '#343A40' }}>
                {currentWeather.location}
            </h1>
            <CurrentDate>
                {currentWeather.date}
            </CurrentDate>
            <CurrentTemp>
                {currentWeather.temp} °{isCelsius ? 'C' : 'F'}
            </CurrentTemp>
        </Wrapper >
    )
}

export default Current