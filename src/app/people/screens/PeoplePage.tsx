import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { Container as GenericContainer, Column } from '../../genericComponents/Layout';
import UserCard from '../components/UserCard';
import SideFilters from '../components/SideFilters';
import { USERS_QUERY } from '../../../service/queries'

const CardsContainer = styled(Column)`
  align-items: center;
  margin-left: 30px;
  width: 60%;
`;

const MarketPlaceScreen = () => {
  const {data, loading} = useQuery(USERS_QUERY);
  const [filteredData, setFilteredData] = useState([]);
  const [users, setUsers] = useState([]);

  if (loading) return null;
  
  return (
  <GenericContainer justify="center">
    <SideFilters />
    <CardsContainer>
      {
        data && data.users.filter(user => user.name)
          .slice(0, 10)
          .map((user: any) => (
            <UserCard
              name={user.name}
              school={user.medicalSchool || 'None'}
              year={user.year_in_program || 0}
            />
        ))
      }
    </CardsContainer>
  </GenericContainer>
)};

export default MarketPlaceScreen;