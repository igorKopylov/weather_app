import React from "react"
import ContentLoader from "react-content-loader"
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%; 
    height: 178px;
    background-color: #343A40;
`;

const MyLoader = () => (
    <Wrapper>
        <ContentLoader
            speed={2}
            width={120}
            height={120}
            viewBox="0 0 120 127"
            backgroundColor="#aaaaaa"
            foregroundColor="#d1d1d1"
        >
            <rect x="232" y="358" rx="0" ry="0" width="0" height="10" />
            <rect x="12" y="391" rx="0" ry="0" width="1" height="0" />
            <rect x="19" y="391" rx="0" ry="0" width="3" height="0" />
            <rect x="24" y="391" rx="0" ry="0" width="3" height="0" />
            <rect x="78" y="22" rx="0" ry="0" width="1" height="1" />
            <rect x="204" y="456" rx="0" ry="0" width="1" height="1" />
            <rect x="179" y="79" rx="0" ry="0" width="0" height="17" />
            <rect x="5" y="60" rx="7" ry="7" width="110" height="27" />
            <rect x="0" y="0" rx="7" ry="7" width="120" height="30" />
        </ContentLoader>
    </Wrapper>
)

export default MyLoader