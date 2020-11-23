import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';

import {
  Container as GenericContainer,
  Column,
} from '../../genericComponents/Layout';
import UserCard from '../components/UserCard';
import UserCardSkeleton from '../components/UserCardSkeleton';
import SideFilters from '../components/SideFilters';
import { USERS_QUERY_PG, CONNECTED_USERS } from '../../../service/queries';
import { useSelector } from 'react-redux';

import {
  CONNECT_TO_USER,
  DISCONNECT_TO_USER,
} from '../../../service/mutations';
import { Context } from 'app/globalContext/GlobalContext';
import { GApageView } from 'app';

const CardsContainer = styled(Column)`
  align-items: center;
  margin-left: 30px;
  width: 60%;
`;

const PeoplePageScreen = () => {
  const {
    state: { user },
  } = useContext(Context);
  const emailSender = user.email;
  const {
    loading: loadingConnect,
    data: connectResponse,
    error: connectError,
    refetch: fetchConnect,
  } = useQuery(CONNECTED_USERS, { variables: { email: emailSender } });
  const {
    data: userResponse,
    loading: loadinUsers,
    error: userError,
  } = useQuery(USERS_QUERY_PG);

  const [connectToUser] = useMutation(CONNECT_TO_USER);
  const [disconnectToUser] = useMutation(DISCONNECT_TO_USER);

  const [filteredData, setFilteredData] = useState([]);
  const [users, setUsers] = useState([]);

  const handleConnectButtonPress = async (
    email: string,
    emailSender: string,
    onConnect: boolean,
  ) => {
    try {
      if (onConnect) {
        //console.log('conectFunc', email, emailSender, onConnect);
        await disconnectToUser({
          variables: {
            reciver_email: email,
            sender_email: emailSender,
          },
        });
      } else {
        //console.log('conectFunc', email, emailSender, onConnect);
        await connectToUser({
          variables: {
            reciver_email: email,
            sender_email: emailSender,
          },
        });
      }
      fetchConnect();
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  useEffect(() => {
    GApageView('People');
  }, []);

  //console.log('errors', connectError, userError);
  console.log('connected', userResponse, userError);

  return (
    <GenericContainer justify="center">
      <SideFilters />
      <CardsContainer>
        {loadinUsers
          ? Array.from({ length: 4 }).map(() => <UserCardSkeleton />)
          : userResponse &&
            !loadingConnect &&
            userResponse.user_account
              .filter(
                user => user.email !== emailSender && user.verified !== false,
              )
              .map((user: any) => (
                <UserCard
                  email={user.email}
                  name={user.FSdata.name}
                  username={user.username}
                  school={user.FSdata.medicalSchool || 'None'}
                  year={user.FSdata.school_year || 0}
                  specialties={user.FSdata.specialties || null}
                  mcat={user.FSdata.mcat || 0}
                  step_1={user.FSdata.step_1 || '?'}
                  step_2={user.FSdata.step_2 || '?'}
                  step_3={user.FSdata.step_3 || '?'}
                  onConnect={
                    connectResponse.connectedUsers.filter(
                      conusr => user.email === conusr.email,
                    ).length > 0
                  }
                  handleConnectButtonPress={handleConnectButtonPress}
                />
              ))}
      </CardsContainer>
    </GenericContainer>
  );
};

export default PeoplePageScreen;
