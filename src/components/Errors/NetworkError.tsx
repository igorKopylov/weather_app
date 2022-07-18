import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 900px;
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

const NetworkError = () => {
    return (
        <Wrapper>
            <Emoji>😕</Emoji>
            <Title>Failed to get weather data</Title>
            <Tip>Check your internet connection</Tip>
        </Wrapper>
    )
}

export default NetworkError