import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectWeather } from '../../redux/slices/weather/slice';

const Wrapper = styled.div`
    position: relative;
    width: 100%; 
    height: 178px;
    background-color: #343A40;
`;

const Time = styled.h1`
    position: absolute;
    color: #fff;
    top: 22px;
    left: 25px;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 2px;
`;

const Table = styled.table`
    width: 1300px;
    margin: auto;
    padding-top: 54px;
    border-radius: #000;
`

const Tr = styled.tr`
    text-align: center;
`

const Td = styled.td`
    color: #fff;
    font-size: 22px;
    font-weight: 500;
    &:not(:last-child) {
        padding-right: 176px; 
    }
`

const Th = styled.th`
    color: rgba(255, 255, 255, 0.8);
    font-size: 23px;
    padding-bottom: 15px;
    &:not(:last-child) {
        padding-right: 176px; 
    }
    
`

const TableCurrentData: React.FC = () => {
    const { currentWeather } = useSelector(selectWeather)

    return (
        <Wrapper>
            <Time>Now</Time>
            <Table>
                <tbody>
                    <Tr>
                        <Th>Description</Th>
                        <Th>Humidity</Th>
                        <Th>Wind Speed</Th>
                        <Th>Visibility</Th>
                        <Th>Pressure</Th>
                    </Tr>
                </tbody>
                <tfoot>
                    <Tr>
                        <Td>{currentWeather.description}</Td>
                        <Td>{currentWeather.humidity}%</Td>
                        <Td>{currentWeather.windSpeed} mph</Td>
                        <Td>{currentWeather.visibility} km</Td>
                        <Td>{currentWeather.pressure} hPa</Td>
                    </Tr>
                </tfoot>
            </Table>
        </Wrapper>
    )
}

export default TableCurrentData