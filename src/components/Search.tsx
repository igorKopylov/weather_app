import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import search from '../assets/Search.svg';
import { selectSearch, setInputValue, setSearchValue } from '../redux/slices/search/slice';
import { useAppDispatch } from '../redux/store';
import debounce from 'lodash.debounce';
import { selectWeather } from '../redux/slices/weather/slice';

const Container = styled.div`
    display: flex;
    width: 603px;
    height: 40px;
    margin-top: 30px;
    margin-right: 216px;
`;

const InputWrapper = styled.div`
    width: 530px;
    height: 100%;
    border-radius: 5px 0px 0px 5px;
    background-color: #fff;
`;

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
    const dispatch = useAppDispatch();

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputValue(event.target.value))
    };

    const onClickSearch = () => {
        dispatch(setSearchValue(inputValue))
        dispatch(setInputValue(''))
    }

    return (
        <Container>
            <InputWrapper>
                <Input value={inputValue} onChange={onChangeInput} placeholder='enter location...' />
            </InputWrapper>
            <Button onClick={() => onClickSearch()}>
                <img src={search} alt='search' />
            </Button>
        </Container>
    )
}

export default Search