import { Button } from 'app/genericComponents';
import React from 'react';
import styled from 'styled-components';

const GlyphIcon = require('../../../assets/images/sprites/Glyph@2x.png');
const SquareIcon = require('../../../assets/images/sprites/Square@2x.png');
const DotCircleIcon = require('../../../assets/images/sprites/DotCircle@2x.png');
const ShapesIcon = require('../../../assets/images/sprites/Shapes@2x.png');
const HalfCircleIcon = require('../../../assets/images/sprites/HalfColouredCircle@2x.png');

const categories = [{
  name: 'Free',
  id: 'free',
  icon: GlyphIcon
}, {
  name: 'Pre-Med',
  id: 'pre-med',
  icon: SquareIcon
}, {
  name: 'Step One',
  id: 'step-one',
  icon: DotCircleIcon
}, {
  name: 'Step Two',
  id: 'step-two',
  icon: ShapesIcon
}, {
  name: 'Step Three',
  id: 'step-three',
  icon: HalfCircleIcon
}]

const Container = styled.div`
  background: ${props => props.theme.color.darkBlue};
  padding-top: 50px !important;
  padding-bottom: 100px !important;
  display: flex;
  flex-direction: column;
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
  border: none;
  outline: none;
  padding-left: 15px;
  border-radius: 5px 0 0 5px;
  width: 100%;
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
  margin-left: 22%;
`

const CategoryLabel = styled.p`
  color: ${props => props.theme.color.white};
  font-size: 13px;
  font-weight: 500;
  height: 24px;
  letter-spacing: 0.1px;
  line-height: 24px;
  margin-top: 10px;
  text-align: center;
`

const CategoriesTitle = styled(SearchTitle)`
  padding-left: 70px;
`

const Category = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30px;

  &:first-child {
    margin-left: 70px;
  }
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-self: center;
  ${({ theme }) => theme.rules.narrowWidth}
  margin: auto;
  padding-left: 70px;
  position: relative;
`

const Search = styled.div`
  display: flex;
  flex-direction: column;
`

const DividerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: -50px;
`

const CategoriesRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const ClearFiltersButton = styled(Button)`
  background-color: ${props => props.theme.color.gabaYellow};
  color: ${props => props.theme.color.darkBlue};
  position: absolute;
  bottom: -60px;
  right: 370px;
`

const CategoryThumbnail: any = styled.img`
  ${(props: any) => props.active ? `
    box-shadow: 0 0 20px 0px #FFFFFF;
  `: ''}
`

interface MarketPlaceSearchProps {
  searchField: string;
  setSearchField: Function;
  handleSearch: Function;
  handleFilterByCategory: Function;
  handleClearFilters: Function;
  activeCategory: string;
}

const MarketPlaceSearch = (props: MarketPlaceSearchProps) => {
  const {
    searchField,
    setSearchField,
    handleSearch,
    handleFilterByCategory,
    handleClearFilters,
    activeCategory
  } = props;

  return (
    <Container>
      <ContentContainer>
        <Search>
          <SearchTitle>Search for Resources</SearchTitle>
          <InputContainer>
            <SearchInput onChange={({ target: { value } }) => setSearchField(value)} value={searchField} type="text" />
            <SearchButton onClick={() => handleSearch()}> Search </SearchButton>
          </InputContainer>
        </Search>
        <DividerContainer>
          <VerticalDivider />
          <DividerLabel>OR</DividerLabel>
          <VerticalDivider />
        </DividerContainer>
        <CategoriesContainer>
          <CategoriesTitle>Browse Categories</CategoriesTitle>
          <CategoriesRow>
            {
              categories.map((category, index) => (
                <Category key={index} onClick={() => handleFilterByCategory(category.id)}>
                  <CategoryThumbnail active={activeCategory === category.id} width="25" src={category.icon} />
                  <CategoryLabel>{category.name}</CategoryLabel>
                </Category>
              ))
            }
          </CategoriesRow>
        </CategoriesContainer>
        <ClearFiltersButton onClick={() => handleClearFilters()}>
          Clear Filters
        </ClearFiltersButton>
      </ContentContainer>
    </Container>
  )
}

export default MarketPlaceSearch;
