import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import {
  Container as GenericContainer,
  Column,
} from '../../genericComponents/Layout';
import { USERS_QUERY_PG, CONNECTED_USERS } from '../../../service/queries';
import { PaymentMethodComponent, CheckoutForm, SubscriptionComponent } from '../components'


import {
  CONNECT_TO_USER,
  DISCONNECT_TO_USER,
} from '../../../service/mutations';
import { Context } from 'app/globalContext/GlobalContext';
import { GApageView } from 'app';
import { Button } from 'app/genericComponents';
const BlueHero = require('../../../assets/images/sprites/blueHero.jpg');

const HeaderContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  background: url('${BlueHero}');
  background-size: 100% 250px;
  background-repeat: repeat-x;
  background-color: white;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 100%;
  color: white;
  .modal-video-body {
    margin-top: -300px;
  }
  margin-bottom: 30px;

  ${props => props.theme.rules.narrowWidth}
`;

const Title = styled.div`
  margin: 30px;
  width: 500px;
`;

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
  background: ${props => props.theme.color.white};
  border-radius: 6px;
  color: blue;
  display: flex;
  margin: 30px;
  padding: 10px;
  position: relative;
  width: 50%;
`;

export default function PaymentScreen() {
  const {
    state: { user },
  } = useContext(Context);
  const emailSender = user.email;
  const {
    loading: loadingConnect,
    data: connectResponse,
    refetch: fetchConnect,
  } = useQuery(CONNECTED_USERS, { variables: { email: emailSender } });
  const {
    data: userResponse,
    loading: loadingUsers,
  } = useQuery(USERS_QUERY_PG);

  const [connectToUser] = useMutation(CONNECT_TO_USER);
  const [disconnectToUser] = useMutation(DISCONNECT_TO_USER);

  const [filteredData, setFilteredData] = useState(null);
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(5);
  const [limitPosible, setLimitPosible] = useState(0);
  const [selectedMembership, setSelectedMembership] = useState('GABABronze');

  const handleConnectButtonPress = (
    email,
    emailSender,
    onConnect,
  ) => {
    console.log(email)
  };

  useEffect(() => {
    GApageView('Payment');
  }, []);

  return (
    <div>
      <HeaderContainer>
        <ContentContainer>
          <Grid.Column>
            <Title>
              <h4>Checkout</h4>
              <h1>
                {' '}
                Confirm your GABA<br />
                membership and checkout
              </h1>
            </Title>
          </Grid.Column>
        </ContentContainer>
      </HeaderContainer>
      <ContentContainer>
        <CardContainer>
          <PaymentMethodComponent />
        </CardContainer>
        <CardContainer>
          <SubscriptionComponent />
        </CardContainer>
      </ContentContainer>
    </div>
  );
};


