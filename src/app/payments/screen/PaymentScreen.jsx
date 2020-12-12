import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
  useQuery,
  useMutation,
  useSubscription,
  gql
} from '@apollo/client';

import { Grid } from 'semantic-ui-react';
import {
  CONNECT_TO_USER,
  DISCONNECT_TO_USER,
} from '../../../service/mutations';
import { Context } from 'app/globalContext/GlobalContext';
import { GApageView } from 'app';

import {
  Container as GenericContainer,
  Column,
} from '../../genericComponents/Layout';
import { USERS_QUERY_PG, CONNECTED_USERS } from '../../../service/queries';
import {
  PaymentMethodComponent,
  SelectSubscriptionComponent,
  SubscriptionComponent
} from '../components'

import { Modal } from 'react-bootstrap';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HJAVwAR6Zl0WfNDjMxkYeZcYFSyhiLzdRHv80GaUi00FE3ToUmpgA65xFhi7gFbtsgYE30ctGx7AmH4YY7tUugU00CdTfsMQD');
// const stripePromise = loadStripe('sk_test_51HJAVwAR6Zl0WfNDSoWGXMU14oLfItr9ZOEjWDvnDc9CyeRT9QuUwS7Wz4nwPjswlHkbj1dGvPSvIxmgWu5grtar00upfKvtZJ')

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
  justify-content:space-between;
  width: 100%;
  padding-left:50px;
  padding-right:50px;
  color: white;
  .modal-video-body {
    margin-top: -300px;
  }
  margin-bottom: 30px;
`;

const Title = styled.div`
  margin: 30px;
  width: 500px;
`;

const CardContainer = styled.div`
  background: ${props => props.theme.color.white};
  color: #0065f2;
  display: flex;
  margin: 30px;
  padding: 10px;
  position: relative;
  width: 40%;
`;

const PaymentCardContainer = styled.div`
  background: ${props => props.theme.color.white};
  color: #0065f2;
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

  const { loading:loadingMembership,
    error:errorMembership, 
    data:dataMembership } = useSubscription(
    gql`
      subscription getUserMembershipType($userEmail: String!) {
      user_account(
        where: {email: {_eq: $userEmail}}
      ) {
        email
        membership_type
        due_date
      }
    }`,{
      variables: { userEmail: 'idsilva@uc.cl' },
    });
  const [connectToUser] = useMutation(CONNECT_TO_USER);
  const [disconnectToUser] = useMutation(DISCONNECT_TO_USER);

  const [filteredData, setFilteredData] = useState(null);
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(5);
  const [isCheckout, setIsCheckout] = useState(false);
  const [limitPosible, setLimitPosible] = useState(0);
  const [selectedMembership, setSelectedMembership] = useState({});
  const [showCheckout, setShowCheckout] = useState(false)


  useEffect(() => {
    GApageView('Payment');
  }, []);

  const selectMembershipHandler = (value) => {
    const membership = getMembershipByCode(value)
    setSelectedMembership(membership)
    setIsCheckout(true)

  }

  const getMembershipByCode = (code) => {
    let membership = { code }
    switch (code) {
      case 'GABABronze':
        membership.name = 'Bronze';
        membership.annualPrice = 9 * 12;
        break;
      case 'GABASilver':
        membership.name = 'Silver';
        membership.annualPrice = 20 * 12;
        break;
      case 'PreMed':
        membership.name = 'PreMed';
        membership.annualPrice = 30 * 12;
        break;
      default:
        membership.name = 'Free';
        membership.annualPrice = 0;
        break;
    }
    return membership;
  };

  const cancelPaymentClickHandler = () => {
    setIsCheckout(false)
  }

  return (
    <div>
      <HeaderContainer>
        <ContentContainer>
          <Grid.Column>
            <Title>
              <h4>Checkout</h4>
              {loadingMembership?'Loading Membership':dataMembership.user_account[0].membership_type}
              <h1>
                Confirm your GABA<br />
                membership and checkout
              </h1>
            </Title>
          </Grid.Column>
        </ContentContainer>
      </HeaderContainer>
      {isCheckout ? (<ContentContainer>
        <PaymentCardContainer>
          <Elements stripe={stripePromise} >
            <PaymentMethodComponent
              cancelPaymentClickHandler={cancelPaymentClickHandler}
              selectedMembership={selectedMembership} />
          </Elements>
        </PaymentCardContainer>
        <CardContainer>
          <SubscriptionComponent membership={selectedMembership} />
        </CardContainer>
      </ContentContainer>) : (<SelectSubscriptionComponent selectMembershipHandler={selectMembershipHandler} />)}
    </div>
  );
};


