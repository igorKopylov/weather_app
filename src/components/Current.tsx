import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectSearch } from '../redux/slices/search/slice';
import { fetchWeather, selectWeather } from '../redux/slices/weather/slice';
import { useAppDispatch } from '../redux/store';

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    height: 177px;
    margin: 112px 140px 116px 105px;
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
    const { status, currentWeather } = useSelector(selectWeather);
    const { searchValue } = useSelector(selectSearch);
    const { isCelsius } = useSelector(selectWeather)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchWeather({
            city: searchValue,
            isCelsius
        }))
    }, [searchValue, isCelsius]);

    return (
        <Container>
            {
                status === 'fulfilled' && (
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
                status === 'loading' && <h1>Loading...</h1>
            }
        </Container>
    )
}

export default Current