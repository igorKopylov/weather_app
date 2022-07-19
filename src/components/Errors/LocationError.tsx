import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { selectSearch } from '../../redux/slices/search/slice';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100vw - 20px);
    margin: 180px auto;
    text-align: center;
`;

const Emoji = styled.span`
    font-size: 80px;
    margin-bottom: 10px;
`;

const Title = styled.h1`
    font-weight: 600;
    letter-spacing: 7px;
    font-size: 60px;
    margin-bottom: 10px;
`;

const Tip = styled.p`
    font-size: 48px;
    opacity: 0.8;
`;

const LocationError = () => {
    const { searchValue } = useSelector(selectSearch)
    return (
        <Wrapper>
            <Emoji>😕</Emoji>
            <Title>"{searchValue}" not found</Title>
            <Tip>Try to enter location again</Tip>
        </Wrapper>
    )
}

export default LocationError