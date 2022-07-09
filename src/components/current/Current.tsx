import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectSearch } from '../../redux/slices/search/slice';
import { fetchWeather, selectWeather } from '../../redux/slices/weather/slice';
import { useAppDispatch } from '../../redux/store';
import { ThreeDots } from 'react-loader-spinner';
import SkeletonCurrentDate from './SkeletonCurrentDate';
import TableCurrentData from './TableCurrentData';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 140px 0 105px;
    width: 235px;
    height: 205px;
`;

const CurrentTime = styled.p`
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
    const { status, currentWeather, forecast } = useSelector(selectWeather);
    const { searchValue } = useSelector(selectSearch);
    const { isCelsius } = useSelector(selectWeather)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchWeather({
            city: searchValue,
            isCelsius,
            zone: forecast.timezone
        }))
    }, [searchValue, isCelsius, forecast.timezone]);

    return (
        <Container>
            {
                status === 'fulfilled' && currentWeather.date !== 'Invalid DateTime' && (
                    <>
                        <h1 style={{ color: '#343A40' }}>
                            {currentWeather.location}
                        </h1>
                        <CurrentTime>
                            {currentWeather.date}
                        </CurrentTime>
                        <CurrentTemp>
                            {currentWeather.temp} °{isCelsius ? 'C' : 'F'}
                        </CurrentTemp>
                    </>
                )
            }
            {
                status === 'fulfilled' && currentWeather.date === 'Invalid DateTime' && (
                    <>
                        <h1 style={{ color: '#343A40' }}>
                            {currentWeather.location}
                        </h1>
                        <CurrentTime>
                            <SkeletonCurrentDate />
                        </CurrentTime>
                        <CurrentTemp>
                            {currentWeather.temp} °{isCelsius ? 'C' : 'F'}
                        </CurrentTemp>
                    </>
                )
            }
            {
                status === 'loading' && currentWeather.date !== 'Invalid DateTime' && (
                    <div style={{ display: 'flex', alignItems: 'end' }}>
                        <h1 style={{ marginBottom: '9px', marginRight: '8px' }}>Loading</h1>
                        <ThreeDots width='35' height='35' color='grey' />
                    </div>
                )
            }
        </Container >
    )
}

export default Current