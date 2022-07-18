import React, { useEffect } from 'react';
import styled from 'styled-components'

import Forecast from '../components/Forecast';
import TableDailyData from '../components/TableDailyData';

import Current from '../components/Current';
import TableCurrentData from '../components/TableCurrentData';
import TableCurrentDataSkeleton from '../components/TableCurrentData/Skeleton';

import LocationError from '../components/Errors/LocationError';
import NetworkError from '../components/Errors/NetworkError';

import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { fetchDaily, fetchForecastHourly, fetchWeather, selectWeather } from '../redux/slices/weather/slice';
import { selectSearch } from '../redux/slices/search/slice';

import ForecastSkeleton from '../components/Forecast/Skeleton';
import CurrentSkeleton from '../components/Current/Skeleton'
import { DateTime } from 'luxon';
import { ThreeDots } from 'react-loader-spinner';
import { ForecastHourlyObj } from '../redux/slices/weather/types';

const ContentTop = styled.div`
    display: flex;
    margin-bottom: 116px;

    @media (max-width: 1205px) {
        flex-direction: column;
        width: 800px;
        margin: 0 auto;
        margin-bottom: 116px;
        width: 1100px;
    }
`;

const ContentTopForecast = styled.div`
    display: flex;
    align-items: center;    
    margin: 0 auto;
    
    &:not(:last-child) {
        margin-right: 160px;
    }; 

    /* @media (max-width: 1205px) {
        overflow: auto;
    } */
`

const ForecastSkeletonStyle = styled.div`
    &:not(:last-child) {
        margin-right: 160px;
    }
`;

const ContentFiveDays = styled.div`
    width: 1300px;
    border: 2px solid #000;
    border-radius: 50px;
    margin: 100px auto;
`;

const TableSkeletonWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 178px;
    background-color: #343A40;

    div {
        width: 120px;
        height: 110px;
        margin-top: 25px;

        &:not(:last-child) {
            margin-right: 176px; 
        }
        &:first-child {
            margin-left: 125px
        }
    }
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

const Home: React.FC = () => {
    const { currentWeather, forecastHourly, forecastDaily, isCelsius, errorMessage, status } = useSelector(selectWeather);
    const dispatch = useAppDispatch();
    const { searchValue } = useSelector(selectSearch);

    useEffect(() => {
        dispatch(fetchWeather({
            city: searchValue,
            isCelsius,
            zone: forecastHourly.timezone
        }))
    }, [searchValue, isCelsius, forecastHourly.timezone]);

    useEffect(() => {
        dispatch(fetchForecastHourly({
            lon: currentWeather.lon,
            lat: currentWeather.lat,
            isCelsius
        }))
    }, [searchValue, isCelsius, currentWeather.lat, currentWeather.lon]);

    useEffect(() => {
        dispatch(fetchDaily({
            lon: currentWeather.lon,
            lat: currentWeather.lat,
            isCelsius
        }))
    }, [isCelsius, currentWeather.lat, currentWeather.lon]);

    return (
        <div>
            {
                status === 'fulfilled' && (
                    <>
                        <ContentTop>
                            <Current />
                            <ContentTopForecast>
                                {
                                    forecastHourly.hourly.map((obj: ForecastHourlyObj, i: number) => {
                                        const time = DateTime.fromSeconds(obj.dt).setZone(forecastHourly.timezone).toFormat('h')
                                        const halfDay = DateTime.fromSeconds(obj.dt).setZone(forecastHourly.timezone).toFormat('a')
                                        const formattedHalfDay = halfDay.includes('PM') ? 'pm' : 'am'
                                        const iconUrl = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`
                                        return <Forecast key={i} time={time} halfDay={formattedHalfDay} iconUrl={iconUrl} temp={Math.round(obj.temp)} />
                                    })
                                }
                            </ContentTopForecast>

                            {/* {
                    status === 'loading' && [...new Array(4)].map((_, i) => <ForecastSkeletonStyle key={i}><ForecastSkeleton /></ForecastSkeletonStyle>)
                } */}

                        </ContentTop>
                        <TableCurrentData />
                        {
                            <ContentFiveDays>
                                {
                                    forecastDaily.map((obj, i) => {
                                        const day = DateTime.fromSeconds(obj.dt).setZone(forecastHourly.timezone).toFormat('cccc')
                                        return (
                                            <TableDailyData
                                                key={i}
                                                day={day}
                                                description={obj.weather[0].description}
                                                humidity={obj.humidity}
                                                windSpeed={Math.round(obj.wind_speed)}
                                                temp={Math.round(obj.temp.day)}
                                            />
                                        )
                                    })
                                }
                            </ContentFiveDays>
                        }
                    </>
                )
            }
            {
                status === 'loading' && (
                    <>
                        <ContentTop>
                            <CurrentSkeleton />
                            <ContentTopForecast>
                                {
                                    [...new Array(4)].map((_, i) => <ForecastSkeletonStyle key={i}><ForecastSkeleton /></ForecastSkeletonStyle>)
                                }
                            </ContentTopForecast>

                        </ContentTop>
                        <TableSkeletonWrapper>
                            <Time>Now</Time>
                            {
                                [...new Array(5)].map((_, i) => <div key={i}><TableCurrentDataSkeleton /></div>)
                            }
                        </TableSkeletonWrapper>
                        <div style={{ display: 'flex', alignItems: 'end', width: '200px', margin: '90px auto' }}>
                            <h1 style={{ margin: '0px 5px 9px 0px', fontSize: '50px' }}>Loading</h1>
                            <ThreeDots width='60' height='50' color='grey' />
                        </div>
                    </>
                )
            }
            {status === 'rejected' && (
                <>
                    {
                        errorMessage === 'city not found' ? <LocationError /> : <NetworkError />
                    }
                </>
            )}
        </div>
    )
}

export default Home
