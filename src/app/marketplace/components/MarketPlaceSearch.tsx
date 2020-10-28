import React from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';

const GlyphIcon = require('../../../assets/images/sprites/Glyph@2x.png');
const SquareIcon = require('../../../assets/images/sprites/Square@2x.png');
const DotCircleIcon = require('../../../assets/images/sprites/DotCircle@2x.png');
const ShapesIcon = require('../../../assets/images/sprites/Shapes@2x.png');
const HalfCircleIcon = require('../../../assets/images/sprites/HalfColouredCircle@2x.png');

const SearchContainer = styled(Grid)`
  background: ${props => props.theme.color.darkBlue};
  padding-top: 50px !important;
  padding-bottom: 50px !important;
`;

const SearchTitle = styled.h3`
  color: ${props => props.theme.color.white};
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
  padding-left: 15px;
  border-radius: 5px 0 0 5px;
`

const SearchButton = styled.button`
  background: ${props => props.theme.color.gabaYellow};
  border-radius: 0px 6px 6px 0px;
  height: 48px;
  width: 110px;
  color: ${props => props.theme.color.darkBlue};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1px;
  line-height: 24px;
  text-align: center;
  border: none;
  outline: none;
`

const VerticalDivider = styled.div`
  border: 1.5px solid ${props => props.theme.color.white};
  height: 50px;
  width: 1px;
  background-color: ${props => props.theme.color.white};
  margin-left: 50%;
`

const DividerLabel = styled.h3`
  color: ${props => props.theme.color.white};
  font-size: 16px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.07px;
  line-height: 32px;
  width: 40px;
  margin-left: 44%;
`

const CategoryLabel = styled.p`
  color: ${props => props.theme.color.white};
  font-size: 16px;
  font-weight: 500;
  height: 24px;
  letter-spacing: 0.1px;
  line-height: 24px;
  width: 100px;
  margin-top: 10px;
  margin-left: -33px;
  text-align: center;
`

const CategoriesTitle = styled(SearchTitle)`
  margin-bottom: 23px !important;
  margin-left: 75px !important;
`

const Category = styled(Grid.Column)`
  padding: 0 !important;
  cursor: pointer;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const categories = [{
  name: 'Free',
  id: 'free',
  icon: GlyphIcon
},{
  name: 'Pre-Med',
  id: 'pre-med',
  icon: SquareIcon
},{
  name: 'Step One',
  id: 'step-one',
  icon: DotCircleIcon
},{
  name: 'Step Two',
  id: 'step-two',
  icon: ShapesIcon
},{
  name: 'Step Three',
  id: 'step-three',
  icon: HalfCircleIcon
}]

interface MarketPlaceSearchProps {
  searchField: string;
  setSearchField: Function;
  handleSearch: Function;
  handleFilterByCategory: Function;
}

const MarketPlaceSearch = (props: MarketPlaceSearchProps) => {
  const {
    searchField,
    setSearchField,
    handleSearch,
    handleFilterByCategory
  } = props;

  return (
    <SearchContainer centered>
      <Grid.Row centered columns={3}>
        <Grid.Column width={6}>
            <SearchTitle>Search for Resources</SearchTitle>
          <InputContainer>
            <SearchInput onChange={({ target: { value }}) => setSearchField(value)} value={searchField} type="text"/>
            <SearchButton onClick={() => handleSearch()}> Search </SearchButton>
          </InputContainer>
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
              {
                categories.map(category => (
                  <Category floated="right" onClick={() => handleFilterByCategory(category.id)}>
                    <img src={category.icon}/>
                    <CategoryLabel>{category.name}</CategoryLabel>
                  </Category>
                ))
              }
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </SearchContainer>
)}

export default MarketPlaceSearch;