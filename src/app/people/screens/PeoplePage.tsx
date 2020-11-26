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
import Button from 'app/genericComponents/Button';

const CardsContainer = styled(Column)`
  align-items: center;
  margin-left: 30px;
  width: 60%;
`;
const LoadMoreButton = styled(Button)`
  align-self: center;
  margin-bottom: 30px;
`;
const CardContainer = styled.div`
  background: ${props => props.theme.color.softYellow};
  border-radius: 6px;
  margin-bottom: 30px;
  display: flex;
  padding: 30px;
  position: relative;
  width: 100%;
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

  const [filteredData, setFilteredData] = useState<null | any>(null);
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(5);
  const [limitPosible, setLimitPosible] = useState(0);

  useEffect(() => {
    const userFiltered = userResponse?.user_account?.filter(filterUser) || [];
    setLimitPosible(userFiltered.length);
    const userFilteredLimited = userFiltered.slice(0, limit);
    setUsers(userFilteredLimited);
  }, [userResponse, filteredData, limit]);

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
  // console.log('connected', userResponse, userError);

  function filterUser(user) {
    if (user.email === emailSender) return false;
    if (!user.verified) return false;
    if (
      filteredData?.school_year &&
      filteredData?.school_year !== user.FSdata?.school_year
    )
      return false;
    if (
      filteredData?.medical_school &&
      filteredData?.medical_school !== user.FSdata?.medical_school
    )
      return false;
    if (
      filteredData?.specialty &&
      !user.FSdata?.specialties.includes(filteredData?.specialty)
    )
      return false;
    if (
      filteredData?.MCAScore &&
      (filteredData?.MCAScore[0] > user.FSdata?.mcat ||
        filteredData?.MCAScore[1] < user.FSdata?.mcat)
    )
      return false;
    if (
      filteredData?.stepOneScore &&
      (filteredData?.stepOneScore[0] > user.FSdata?.step_1 ||
        filteredData?.stepOneScore[1] < user.FSdata?.step_1)
    )
      return false;
    if (
      filteredData?.stepTwoScore &&
      (filteredData?.stepTwoScore[0] > user.FSdata?.step_2 ||
        filteredData?.stepTwoScore[1] < user.FSdata?.step_2)
    )
      return false;
    if (
      filteredData?.stepThreeScore &&
      (filteredData?.stepThreeScore[0] > user.FSdata?.step_3 ||
        filteredData?.stepThreeScore[1] < user.FSdata?.step_3)
    )
      return false;
    return true;
  }

  return (
    <GenericContainer justify="center">
      <SideFilters
        onPressFilter={f => {
          setFilteredData(f);
          setLimit(5);
        }}
      />
      <CardsContainer>
        {loadinUsers ? (
          Array.from({ length: 4 }).map(() => <UserCardSkeleton />)
        ) : users.length ? (
          users.map((user: any) => (
            <UserCard
              email={user.email}
              name={user.FSdata.name}
              username={user.username}
              school={user.FSdata.medical_school || 'None'}
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
          ))
        ) : (
          <CardContainer>
            Nothing here
          </CardContainer>
        )}
        {!loadingConnect && limitPosible > limit && (
          <LoadMoreButton onClick={() => setLimit(l => l + 5)}>
            Load More
          </LoadMoreButton>
        )}
      </CardsContainer>
    </GenericContainer>
  );
};

export default PeoplePageScreen;
