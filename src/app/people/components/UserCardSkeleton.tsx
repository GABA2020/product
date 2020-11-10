import React from 'react';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';

import { Column, Row } from '../../genericComponents/Layout';

const CardContainer = styled.div`
  background: ${props => props.theme.color.softYellow};
  border-radius: 6px;
  margin-bottom: 30px;
  display: flex;
  padding: 30px;
  position: relative;
  min-width: 550px;
  width: 100%;
`;

const UserName = styled.h3`
  color: ${props => props.theme.color.darkBlue};
  font-size: 24px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.1px;
  line-height: 32px;
`

const UserSchool = styled.h3`
  color: ${props => props.theme.color.darkBlue};
  font-size: 12px;
  font-weight: bold;
  height: 32px;
  letter-spacing: -0.1px;
  margin-top: 0;
`

const InfoContainer = styled(Column)`
  margin-left: 20px;
`

const Location = styled.p`
  position: absolute;
  right: 30px;
`

const ConnectButton = styled.div`
  position: absolute;
  right: 20px;
  top: 60px;
`

const UserCard = () => {
  return (
    <CardContainer>
      <ContentLoader width="130">
        <circle cx="50" cy="50" width="50" r="50" />
      </ContentLoader>
      <InfoContainer>
        <UserName>
        <ContentLoader>
          <rect rx="3" ry="3" width="150" height="25" /> 
        </ContentLoader>
        </UserName>
        <UserSchool>
          <ContentLoader>
            <rect rx="3" ry="3" width="88" height="12" /> 
          </ContentLoader>
        </UserSchool>
        <Row style={{height: 70}}>
          <ContentLoader width="130" height="50">
            <rect rx="3" ry="3" width="100" height="35" /> 
          </ContentLoader>
          <ContentLoader width="120">
            <rect rx="3" ry="3" width="100" height="35" /> 
          </ContentLoader>
        </Row>
      </InfoContainer>
      <Location>
        <ContentLoader style={{position: 'absolute', left: -90}}>
          <rect width="100" x="0" y="0" height="20"/> 
        </ContentLoader>
      </Location>
      <ConnectButton>
        <ContentLoader style={{position: 'absolute', left: -90}}>
          <rect width="100" rx="5" ry="5" x="0" y="0" height="35"/> 
        </ContentLoader>
      </ConnectButton>
    </CardContainer>
)}

export default UserCard;