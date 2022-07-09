import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import search from '../assets/Search.svg';
import { selectSearch, setInputValue, setSearchValue } from '../redux/slices/search/slice';
import { useAppDispatch } from '../redux/store';
import debounce from 'lodash.debounce';
import { selectWeather } from '../redux/slices/weather/slice';

const Wrapper = styled.div`
    display: flex;
    width: 603px;
    height: 40px;
    margin-top: 30px;
    margin-right: 216px;
`;

const InputWrapper = styled.div`
    display: flex;
    width: 530px;
    height: 100%;
    border-radius: 5px 0px 0px 5px;
    background-color: #fff;
`;

const Svg = styled.svg`
    opacity: 0.7;
    margin: 6px 10px 6px 5px;
    transition: .2s;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`

const Input = styled.input`
    width: 480px;
    height: 30px;
    color: #4e4e4e;
    margin: 5px 20px;
    font-size: 19px;

    &::placeholder {
        color: #6a6a6a;
    }
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 73px;
    height: 40px;
    background-color: #EB6F4C;
    border-radius: 0px 5px 5px 0;
    cursor: pointer;
    transition: .3s;

    &:hover {
        background-color: #e74113;
    }
`;



const Search: React.FC = () => {
    const { inputValue } = useSelector(selectSearch);
    const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch();

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputValue(event.target.value))
    };

    const onClickSearch = () => {
        if (inputValue) {
            dispatch(setSearchValue(inputValue))
            dispatch(setInputValue(''))
        }
    }

    const onClickClear = () => {
        if (inputValue) {
            dispatch(setInputValue(''))
            inputRef.current?.focus()
        }
    }

    return (
        <Wrapper>
            <InputWrapper>
                <Input ref={inputRef} value={inputValue} onChange={onChangeInput} placeholder='Enter location...' />
                {
                    inputValue && <Svg onClick={() => onClickClear()} height="28" viewBox="0 0 48 48" width="28" xmlns="http://www.w3.org/2000/svg">
                        <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
                        <path d="M0 0h48v48H0z" fill="none" /></Svg>
                }
            </InputWrapper>
            <Button onClick={() => onClickSearch()}>
                <img src={search} alt='search' />
            </Button>
        </Wrapper>
    )
}

export default Search