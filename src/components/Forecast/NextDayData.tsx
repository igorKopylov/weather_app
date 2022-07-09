import React from 'react'
import styled from 'styled-components'

const Table = styled.table`
    margin: 324px auto;
    margin-top: 85px;
    border-collapse: collapse;
`;

const TrTop = styled.tr`
    font-size: 24px;
    color: rgba(52, 58, 64, 0.8);
    height: 37px;
    border-bottom: 1px solid #343A40;
`;

const TrBottom = styled.tr`
    font-size: 18px;
    color: #343A40;
    padding: 30px 0 31px 0;
    height: 75px;
    border-bottom: 1px solid #343A40;
`

const Th = styled.th`
    text-align: center;
`;

const Td = styled.td`
    text-align: center;
`;

const NextDayData = () => {
    return (
        <Table>
            <tbody>
                <TrTop>
                    <Th style={{ paddingRight: '282px' }}>DAY</Th>
                    <Th style={{ paddingRight: '125px' }}>DESCRIPTION</Th>
                    <Th style={{ paddingRight: '120px' }}>HUMIDITY</Th>
                    <Th style={{ paddingRight: '96px' }}>WIND</Th>
                    <Th>TEMPERATURE</Th>
                </TrTop>
            </tbody>
            <tfoot>
                <TrBottom>
                    <Td style={{ paddingRight: '282px', paddingLeft: '9px' }}>Monday</Td>
                    <Td style={{ paddingRight: '125px' }}>9%</Td>
                    <Td style={{ paddingRight: '120px' }}>57%</Td>
                    <Td style={{ paddingRight: '96px' }}>5 mph</Td>
                    <Td>19°</Td>
                </TrBottom>
            </tfoot>
        </Table>
    )
}

export default NextDayData