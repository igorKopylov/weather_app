import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
    font-size: 50px;
`

const NotFound: React.FC = () => {

    return (
        <div>
            <Title>
                Not Found
            </Title>
        </div>
    )
}

export default NotFound