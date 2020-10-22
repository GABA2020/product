import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

const SearchContainer = styled(Grid)`
  background: rgb(242, 248, 255);
  padding-top: 50px !important;
  padding-bottom: 50px !important;
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
  width: 110px;
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
  background-color: rgba(0, 101, 242, 0.44);
  margin-left: 50%;
`

const DividerLabel = styled.h3`
  color: rgb(0, 101, 242);
  font-size: 16px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.07px;
  line-height: 32px;
  width: 40px;
  margin-left: 44%;
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
  width: 55px;
  margin-top: 10px;
  margin-left: -10px;
  text-align: center;
`

const CategoriesTitle = styled(SearchTitle)`
  margin-bottom: 23px !important;
  margin-left: 75px !important;
`

const MarketPlaceSearch = () => (
  <SearchContainer centered>
    <Grid.Row centered columns={3}>
      <Grid.Column width={6}>
        <Grid.Row>
          <SearchTitle>Search for Resources</SearchTitle>
          <SearchInput type="text"/>
          <SearchButton> Search </SearchButton>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column centered width={2}>
        <VerticalDivider />
          <DividerLabel>OR</DividerLabel>
        <VerticalDivider />
      </Grid.Column>
      <Grid.Column>
        <Grid>
          <Grid.Row>
            <CategoriesTitle>Browse Categories</CategoriesTitle>
          </Grid.Row>
          <Grid.Row columns={16}>
            <Grid.Column floated="right">
              <Square/>
              <CategoryLabel>Label</CategoryLabel>
            </Grid.Column>
            <Grid.Column floated="right">
              <Square/>
              <CategoryLabel>Label</CategoryLabel>
            </Grid.Column>
            <Grid.Column floated="right">
              <Square/>
              <CategoryLabel>Label</CategoryLabel>
            </Grid.Column>
            <Grid.Column floated="right">
              <Square/>
              <CategoryLabel>Label</CategoryLabel>
            </Grid.Column>
            <Grid.Column floated="right">
              <Square/>
              <CategoryLabel>Label</CategoryLabel>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  </SearchContainer>
)

export default MarketPlaceSearch;