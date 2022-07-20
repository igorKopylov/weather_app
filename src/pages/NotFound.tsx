import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    width: calc(100vw - 50px);
    margin: 0 auto;
    text-align: center;
`

const Emoji = styled.span`
    font-size: 80px;
`

const Title = styled.h1`
    font-size: 50px;
    margin-top: 10px;
`;

const Tip = styled.p`
    opacity: 0.6;
    margin-top: 10px;
    font-size: 28px;
`;

const Button = styled.button`
    display: flex;
    justify-content: space-between;
    width: 300px;
    height: 60px;
    border: 1px solid #838383;
    border-radius: 30px;
    background-color: #fff;
    margin: 60px auto;
    font-size: 20px;
    transition: .2s;
    cursor: pointer;
    
    p {
        margin: auto 80px;
        margin-left: 0;
    }

    svg {
        margin: auto 30px;
        margin-right: 0;
        transition: .2s;
    }

    &:hover {
        background-color: #0c0c0c;
        color: #fff;

        svg {
            transform: translateX(-7px);

            path {
                fill: #fff;
                transition: .2s;
            }
        }
    }
`

const NotFound: React.FC = () => {

    return (
        <Wrapper>
            <Emoji>😕</Emoji>
            <Title>
                Oops, this page does not exist...
            </Title>
            <Tip>
                But you can always back to home
            </Tip>
            <Link to='/'>
                <Button>
                    <svg width='30' height='30' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="1" id="_1">
                        <path fill='#1e1e1e' d="M353,450a15,15,0,0,1-10.61-4.39L157.5,260.71a15,15,0,0,1,0-21.21L342.39,54.6a15,15,0,1,1,21.22,21.21L189.32,250.1,363.61,424.39A15,15,0,0,1,353,450Z" />
                    </g></svg>
                    <p>Back to home</p>
                </Button>
            </Link>
        </Wrapper>
    )
}

export default NotFound