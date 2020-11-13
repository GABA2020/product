import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';

import {
  Container as GenericContainer,
  Column,
} from '../../genericComponents/Layout';
import UserCard from '../components/UserCard';
import UserCardSkeleton from '../components/UserCardSkeleton';
import SideFilters from '../components/SideFilters';
import { USERS_QUERY, CONNECTED_USERS } from '../../../service/queries';
import { useSelector } from 'react-redux';

import { CONNECT_TO_USER } from '../../../service/mutations';

const CardsContainer = styled(Column)`
  align-items: center;
  margin-left: 30px;
  width: 60%;
`;

const PeoplePageScreen = () => {
  const emailSender = useSelector((state: any) => state.auth.email);
  const {
    loading: loadingConnect,
    data: connectResponse,
    refetch: fetchConnect,
  } = useQuery(CONNECTED_USERS, { variables: { emailSender } });
  const { data: userResponse, loading: loadinUsers } = useQuery(USERS_QUERY);

  const [connectToUser] = useMutation(CONNECT_TO_USER);

  const [filteredData, setFilteredData] = useState([]);
  const [users, setUsers] = useState([]);

  const getConnectedUsers = (users, connectedList) => {
    return users.map(user => {
      const index = connectedList.findIndex(
        connectedContact => connectedContact === user.mail,
      );
      console.log('index', index);
      if (index > -1) return { ...user, onConnect: true };
      return user;
    });
  };

  const handleConnectButtonPress = async (
    email: string,
    onConnect: boolean,
  ) => {
    try {
      if (onConnect) {
      } else {
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
    // console.log("efect", userResponse, loadinUsers);
    // if (!loadinUsers && userResponse) {
    //   console.log("efect post", userResponse, loadinUsers);
    //   setUsers(userResponse.users);
    //   console.log('users State', users);
    // }
    // console.log("efect2", connectResponse, loadingConnect);
    if (!loadingConnect && connectResponse) {
      console.log('users State2', users);

      setUsers(
        getConnectedUsers(userResponse.users, connectResponse.connectedUsers),
      );
    }
  }, [connectResponse, loadingConnect, userResponse, loadinUsers]);

  return (
    <GenericContainer justify="center">
      <SideFilters />
      <CardsContainer>
        {loadinUsers && loadingConnect
          ? Array.from({ length: 4 }).map(() => <UserCardSkeleton />)
          : userResponse &&
            userResponse.users
              .filter(user => user.email !== emailSender)
              .map((user: any) => (
                <UserCard
                  name={user.name}
                  school={user.medicalSchool || 'None'}
                  year={user.school_year || 0}
                  specialties={user.specialties || null}
                  mcat={user.mcat || 0}
                  step_1={user.step_1 || '?'}
                  step_2={user.step_2 || '?'}
                  step_3={user.step_3 || '?'}
                  onConnect={user.onConnect}
                  handleConnectButtonPress={handleConnectButtonPress}
                />
              ))}
      </CardsContainer>
    </GenericContainer>
  );
};

export default PeoplePageScreen;
