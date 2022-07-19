import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectWeather } from '../../redux/slices/weather/slice';
import Sun from '../../assets/Sun.svg';
import Moon from '../../assets/Moon.svg'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    &:not(:last-child) {
        margin-right: 160px;

    @media (max-width: 1400px) {
        margin-right: 120px;
    }

    @media (max-width: 1205px) {
        margin-right: 100px;
    }

    @media (max-width: 400px) {
        margin-right: 0;
    }
}
`;

const Time = styled.p`
    font-size: 32px;
    color: rgba(52, 58, 64, 0.8);
`;

const Icon = styled('img') <{ iconName: string }>`
    margin-top: 15px;
    width: ${props => props.iconName.includes('01') ? '70px' : '100px'};
    height: ${props => props.iconName.includes('01') ? '70px' : '100px'};
    padding: ${props => props.iconName.includes('01') ? '15px' : null};
    border-radius: 50%;
    background-color: ${props => props.iconName.includes('n') ? '#031551' : '#91b1fa'};
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
    iconName: string;
    temp: number;
    halfDay: string;
};

const Forecast: React.FC<ForecastProps> = ({ time, iconName, temp, halfDay }) => {
    const { isCelsius } = useSelector(selectWeather)

    let iconUrl
    if (iconName === '01d') {
        iconUrl = Sun
    }
    if (iconName === '01n') {
        iconUrl = Moon
    } if (iconName !== '01d' && iconName !== '01n') {
        iconUrl = `https://openweathermap.org/img/wn/${iconName}@2x.png`
    }

    return (
        <Wrapper>
            <Time>{time}:00<Sup>{halfDay}</Sup></Time>
            <Icon iconName={iconName} src={iconUrl} alt='icon' />
            <Temp>{temp} °{isCelsius ? 'C' : 'F'}</Temp>
        </Wrapper>
    )
};

export default Forecast