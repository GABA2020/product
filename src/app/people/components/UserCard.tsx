import React from 'react';
import styled from 'styled-components';
import { Image } from 'semantic-ui-react';

import { Column, Row } from '../../genericComponents/Layout';
import Button from '../../genericComponents/Button';

const GlyphIcon = require('../../../assets/images/sprites/mcat-icon.svg');
const DotCircleIcon = require('../../../assets/images/sprites/step-one-icon.svg');
const ShapesIcon = require('../../../assets/images/sprites/step-two-icon.svg');
const MoonIcon = require('../../../assets/images/sprites/step-three-icon.png');

const categories = [
  {
    name: 'MCAT',
    id: 'mcat',
    icon: GlyphIcon,
  },
  {
    name: 'Step One',
    id: 'step_one',
    icon: DotCircleIcon,
  },
  {
    name: 'Step Two',
    id: 'step_two',
    icon: ShapesIcon,
  },
  {
    name: 'Step Three',
    id: 'step_three',
    icon: MoonIcon,
  },
];

const CardContainer = styled.div`
  background: ${props => props.theme.color.softYellow};
  border-radius: 6px;
  margin-bottom: 30px;
  display: flex;
  padding: 30px;
  position: relative;
  width: 100%;
`;

const UserName = styled.h3`
  color: ${props => props.theme.color.darkBlue};
  font-size: 24px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.1px;
  line-height: 32px;
`;

const UserSchool = styled.h3`
  color: ${props => props.theme.color.darkBlue};
  font-size: 12px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.1px;
  margin-top: 0;
`;

const InfoContainer = styled(Column)`
  margin-left: 20px;
`;

const CategoriesRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Category = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const CategoryLabel = styled.p`
  color: ${props => props.theme.color.darkBlue};
  font-size: 13px;
  font-weight: 500;
  height: 24px;
  letter-spacing: 0.1px;
  margin-top: 10px;
  text-align: center;
  margin-left: 10px;
  margin-top: 5px;
`;

const Tag = styled.div`
  color: ${props => props.theme.color.darkBlue};
  font-size: 12px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.1px;
  margin-bottom: 15px;
  background-color: ${props => props.theme.color.softPurple};
  padding: 5px 10px;
  text-align: center;
  border-radius: 5px;
  margin-right: 10px;
`;

const Location = styled.p`
  position: absolute;
  right: 30px;
`;

const TagsContainer = styled(Row)``;

const Avatar = styled(Image)`
  height: 120px !important;
`;

const ConnectButton = styled(Button)`
  position: absolute;
  right: 20px;
  top: 60px;
  background: ${props => props.theme.color.darkBlue};
  color: ${props => props.theme.color.white};
`;

interface UserCardProps {
  name: string;
  school?: string;
  year?: number | string;
  specialties?: string[];
  mcat: number;
  step_1: number;
  step_2: number;
  step_3: number | string;
  onConnect: boolean;
  handleConnectButtonPress: Function;
}

const UserCard = (props: UserCardProps) => {
  const {
    name,
    school,
    year,
    specialties,
    mcat,
    step_1,
    step_2,
    step_3,
    onConnect,
    handleConnectButtonPress,
  } = props;
  return (
    <CardContainer>
      <Avatar
        src="https://i.pinimg.com/originals/fc/0c/77/fc0c7762eae4affd716151ef68be93b6.png"
        size="small"
        circular
      />
      <InfoContainer>
        <UserName>{name}</UserName>
        <UserSchool>{school}</UserSchool>
        <TagsContainer>
          {specialties ? (
            specialties.map((tagitem, index) => <Tag>{tagitem}</Tag>)
          ) : (
            <Tag>No Specialty</Tag>
          )}
          <Tag>{year} Student</Tag>
        </TagsContainer>
        <CategoriesRow>
          {categories.map(category => (
            <Category>
              <img width="15" src={category.icon} />
              <CategoryLabel>
                {category.name} Score:{' '}
                <b>{props[category.id] ? props[category.id] : '?'}</b>
              </CategoryLabel>
            </Category>
          ))}
        </CategoriesRow>
      </InfoContainer>
      <Location>San Francisco</Location>
      {onConnect ? (
        <ConnectButton>Disconnect</ConnectButton>
      ) : (
        <ConnectButton>Connect</ConnectButton>
      )}
    </CardContainer>
  );
};

export default UserCard;
