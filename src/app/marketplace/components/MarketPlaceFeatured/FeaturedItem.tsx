import React from 'react';
import styled from 'styled-components';

import Stars from '../../../genericComponents/Stars';
import { Resource } from '../../../../types/Resource';
import { NavLink } from 'react-router-dom';
import { Column } from '../../../genericComponents/Layout';
import Button from '../../../genericComponents/Button';
import theme from '../../../../theme';
import { useStorage } from 'hook/useStorage';

const Bitmap = require('../../../../assets/images/sprites/Bitmap.png');

const ItemContainer = styled.div`
  background: ${props => props.theme.color.softYellow};
  border-radius: 6px;
  max-width: 70%;
  margin-bottom: 30px;
  display: flex;
  padding: 30px;
  position: relative;
  min-height: 150px;
`;

const DetailsSection = styled(Column)`
  margin-right: 20px;
`;

const DetailsTitle = styled.h3`
  color: ${props => props.theme.color.darkBlue};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.1px;
  line-height: 32px;
  margin-bottom: 15px;
  max-width: 450px;
`;

const DetailsContent = styled.p`
  color: ${props => props.theme.color.darkBlue};
  font-size: 16px;
  letter-spacing: 0.1px;
  line-height: 24px;
  width: 310px;
  text-align: justify;
`;

const ReviewsFooter = styled.div`
  display: flex;
  margin: 0px 20px 10px -5px;
  bottom: 20px;
`;

const Footer = styled(Column)``;

const Reviews = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

const TagsSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  flex-wrap: wrap;
  height: fit-content;
`;

const Tag = styled.div`
  background: ${props => props.theme.color.softPurple};
  border-radius: 6px;
  padding: 6px 10px;
  height: 30px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const Image = styled.img`
  position: absolute;
  right: -350px;
  top: 10px;
  height: 210px;
  width: 310px;
  object-fit: contain;
`;

const CustomLink = styled(NavLink)`
  color: ${props => props.theme.color.darkBlue};
`;

const Range = styled.p`
  color: ${props => props.theme.color.darkBlue};
  font-size: 16px;
  letter-spacing: 0.1px;
`;

const AddToLocker: any = styled(Button)`
  position: absolute;
  right: 15px;
  top: 15px;
`;

interface FeaturedItemProps {
  item: Resource;
  onLockerButtonPress: Function;
}

const FeaturedItem = (props: FeaturedItemProps) => {
  const { item, onLockerButtonPress } = props;

  const url = useStorage(`resources/${item.picture_name}`);

  return (
    <ItemContainer>
      <AddToLocker
        onClick={() => {
          onLockerButtonPress(item.id, !!item.onLocker);
        }}
        backgroundColor={theme.color.darkBlue}
        color={theme.color.white}
      >
        {item.onLocker ? 'Remove from locker' : 'Add to Locker'}
      </AddToLocker>
      <DetailsSection>
        <DetailsTitle>
          <CustomLink to={`/product-page/${item.id}`}>{item.name}</CustomLink>
        </DetailsTitle>
        <DetailsContent>{item.description || 'No description'}</DetailsContent>
        <Footer>
          <ReviewsFooter>
            <Stars color="yellow" numberOfStars={item.rating || 0} />
            <Reviews>{item.reviewsCount || 0} Reviews</Reviews>
          </ReviewsFooter>
          <Range>
            ${item.price_from} - ${item.price_to}{' '}
          </Range>
        </Footer>
      </DetailsSection>
      <TagsSection>
        {item.tags
          ? item.tags.map((tagitem, index) => <Tag>{tagitem}</Tag>)
          : 'no tag'}
      </TagsSection>
      {url !== '' ? <Image src={url} /> : <Image src={Bitmap} />}
    </ItemContainer>
  );
};

export default FeaturedItem;
