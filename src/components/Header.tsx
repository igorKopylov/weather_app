import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { selectWeather, setIsCelsius } from '../redux/slices/weather/slice';
import { useAppDispatch } from '../redux/store';
import Search from './Search';

const StyledHeader = styled.header`
    width: 100%;
    height: 100px;
    background-color: #343A40;
    margin-bottom: 112px;
`;

const Container = styled.div`
    display: flex;
    margin-left: 105px;
    width: 1230px;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #fff;
    font-size: 20px;
    margin-right: 130px;
    margin-top: 31px;
`;

const BtnToggle = styled.button`
    width: 170px;
    height: 40px;
    background-color: #fff;
    font-size: 18px;
    font-weight: 300;
    margin-top: 30px;
    transition: .3s;
    border-radius: 5px;

    &:hover {
        background-color: #b7b7b7;
    }
`;

const BtnCelsius = styled('span') <{ isCelsius: boolean }>`
   font-weight: ${props => props.isCelsius ? 500 : 300};
   color: #141414;
`;

const BtnF = styled('span') <{ isCelsius: boolean }>`
    font-weight: ${props => props.isCelsius ? 300 : 500};
    color: #343A40;
`;

const Header: React.FC = () => {
    const { isCelsius } = useSelector(selectWeather);
    const dispatch = useAppDispatch()

    return (
        <StyledHeader>
            <Container>
                <HeaderLeft>
                    <img width={35} height={19} src={logo} alt='sun' />
                    WeatherApp
                </HeaderLeft>
                <Search />
                <BtnToggle onClick={() => dispatch(setIsCelsius())}>
                    <BtnCelsius isCelsius={isCelsius}>°C</BtnCelsius> / <BtnF isCelsius={isCelsius}>°F</BtnF>
                </BtnToggle>
            </Container>
        </StyledHeader>
    );
};

export default Header