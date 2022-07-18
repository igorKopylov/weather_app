import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectWeather } from '../../redux/slices/weather/slice';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: 0;
    
    &:not(:last-child) {
        margin-right: 160px;

    @media (max-width: 1400px) {
        margin-right: 120px;
    }

    @media (max-width: 1205px) {
        margin-right: 200px;
    }
    }
`;

const Time = styled.p`
    font-size: 32px;
    color: rgba(52, 58, 64, 0.8);
`;

const Icon = styled('img') <{ iconUrl: string }>`
    margin-top: 15px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${props => props.iconUrl.includes('n@2x.png') ? '#031551' : '#91b1fa'};
`;

const Temp = styled.p` 
    font-size: 32px;
    margin-top: 26px;
    color: #343A40;
`;

const Sup = styled.sup`
    opacity: 0.8;
    font-size: 20px;
    margin-left: 4px;
`

type ForecastProps = {
    time: string;
    iconUrl: string;
    temp: number;
    halfDay: string;
};

const Forecast: React.FC<ForecastProps> = ({ time, iconUrl, temp, halfDay }) => {
    const { isCelsius } = useSelector(selectWeather)
    return (
        <Wrapper>
            <Time>{time}:00<Sup>{halfDay}</Sup></Time>
            <Icon iconUrl={iconUrl} src={iconUrl} alt='icon' />
            <Temp>{temp} °{isCelsius ? 'C' : 'F'}</Temp>
        </Wrapper>
    )
};

export default Forecast