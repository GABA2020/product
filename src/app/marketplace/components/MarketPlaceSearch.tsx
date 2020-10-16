import React from 'react';
import { Grid, Input, Button } from 'semantic-ui-react'
import styled from 'styled-components';

const SearchContainer = styled.div`
  padding: 50px 165px !important;
  background: rgb(242, 248, 255);
  display: flex;
  justify-content: space-between;
`;

const SearchTitle = styled.h3`
  color: rgb(0, 101, 242);
  font-size: 24px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.1px;
  line-height: 32px;
  width: 460px;
  margin-bottom: 42px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(props: { margin?: string }) => props.margin || 'auto'};
`

const Row = styled.div`
  display: flex;
  justify-content:${(props: { justify?: string}) => props.justify || 'flex-start'};
`

const SearchInput = styled.input`
  height: 48px;
  width: 350px;
  border: none;
  outline: none;
`

const SearchButton = styled.button`
  background: rgb(0, 101, 242);
  border-radius: 0px 6px 6px 0px;
  height: 48px;
  width: 125px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1px;
  line-height: 24px;
  text-align: center;
  border: none;
  outline: none;
`

const VerticalDivider = styled.div`
  border: 1.5px solid rgba(0, 101, 242, 0.44);
  height: 50px;
  width: 1px;
`

const DividerLabel = styled.h3`
  color: rgb(0, 101, 242);
  font-size: 16px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.07px;
  line-height: 32px;
  width: 40px;
  margin-left: -10px;
`

const Category = styled.div`
  align-items: center;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

const Square = styled.div`
  width: 32px;
  height: 32px;
  background-color: rgb(0, 101, 242);
`

const CategoryLabel = styled.p`
  color: rgb(0, 101, 242);
  font-size: 16px;
  font-weight: 500;
  height: 24px;
  letter-spacing: 0.1px;
  line-height: 24px;
  text-align: center;
  width: 55px;
  margin-top: 10px;
`

const MarketPlaceSearch = () => (
  <SearchContainer>
    <Column>
      <SearchTitle>Search for Resources</SearchTitle>
      <Row>
        <SearchInput type="text"/>
        <SearchButton> Search </SearchButton>
      </Row>
    </Column>
    <Column margin="46px 75px 0 46px">
      <VerticalDivider />
       <DividerLabel>OR</DividerLabel>
      <VerticalDivider />
    </Column>
    <Column>
      <SearchTitle>Browse Categories</SearchTitle>
      <Row justify="space-between">
        <Category>
          <Square/>
          <CategoryLabel>Label</CategoryLabel>
        </Category>
        <Category>
          <Square/>
          <CategoryLabel>Label</CategoryLabel>
        </Category>
        <Category>
          <Square/>
          <CategoryLabel>Label</CategoryLabel>
        </Category>
        <Category>
          <Square/>
          <CategoryLabel>Label</CategoryLabel>
        </Category>
        <Category>
          <Square/>
          <CategoryLabel>Label</CategoryLabel>
        </Category>
      </Row>
    </Column>
  </SearchContainer>
)

export default MarketPlaceSearch;