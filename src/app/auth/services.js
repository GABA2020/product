import { GET_USER_ACCOUNT, GET_USER_DATA } from 'service/queries';
import { db } from '../../helpers/firebase.module';

export async function getUser(graphQLClient,email="",username="") {
  let userAccount = {};
  let userDataHasura = {};
  await graphQLClient
    .query({
      query: GET_USER_ACCOUNT,
      variables: { email, username }
    })
    .then(r => (userAccount = r?.data?.user_account[0]))
    .catch(e => console.log('GET_USER_ACCOUNT', e));
  await graphQLClient
    .query({
      query: GET_USER_DATA,
      variables: { email: userAccount?.email||"" }
    })
    .then(r => (userDataHasura = r.data?.user))
    .catch(e => console.log('GET_USER_DATA', e));
  const memberRef = await db
    .collection('member_data')
    .doc(userAccount?.email || '_')
    .get()
  const userFirestore = memberRef.data();
  
  return({ userFirestore, userAccount, userDataHasura });
}