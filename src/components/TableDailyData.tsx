import { NumberingSystem } from 'luxon';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import ArrowBack from '../../assets/ArrowBack.svg'
import { selectWeather } from '../redux/slices/weather/slice';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 85px;
    margin-bottom: 124px;
`;

const Table = styled('table')`
    margin: 0 auto;
    border-collapse: collapse;
`;

const TrTop = styled.tr`
    font-size: 24px;
    color: rgba(52, 58, 64, 0.8);
    height: 37px;
    border-bottom: 1px solid #343A40;
`;

const TrBottom = styled.tr`
    font-size: 18px;
    color: #343A40;
    padding: 30px 0 31px 0;
    height: 75px;
    border-bottom: 1px solid #343A40;
`;
const Th = styled.th`
    text-align: center;
`;

const Td = styled.td`
    text-align: center;
`;

type TableDailyDataProps = {
    day: string;
    description: string;
    humidity: number;
    windSpeed: number;
    temp: number
}

const TableDailyData: React.FC<TableDailyDataProps> = ({ day, description, humidity, windSpeed, temp }) => {
    const { isCelsius } = useSelector(selectWeather)
    return (
        <Wrapper>
            <Table>
                <tbody>
                    <TrTop>
                        <Th style={{ paddingRight: '282px' }}>DAY</Th>
                        <Th style={{ paddingRight: '125px' }}>DESCRIPTION</Th>
                        <Th style={{ paddingRight: '120px' }}>HUMIDITY</Th>
                        <Th style={{ paddingRight: '96px' }}>WIND</Th>
                        <Th>TEMPERATURE</Th>
                    </TrTop>
                </tbody>
                <tfoot>
                    <TrBottom>
                        <Td style={{ paddingRight: '282px', paddingLeft: '9px' }}>{day}</Td>
                        <Td style={{ paddingRight: '125px' }}>{description}</Td>
                        <Td style={{ paddingRight: '120px' }}>{humidity}%</Td>
                        <Td style={{ paddingRight: '96px' }}>{windSpeed} mph</Td>
                        <Td>{temp} °{isCelsius ? 'C' : 'F'}</Td>
                    </TrBottom>
                </tfoot>
            </Table>
        </Wrapper>
    )
}

export default TableDailyData