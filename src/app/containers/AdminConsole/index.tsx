import React, { Fragment, useState } from 'react';
import {
  useFirestoreVerification,
  useFirestoreMcat,
  useFirestoreStep1,
  useFirestoreStep2,
  useFirestoreStep3,
} from '../../../hook/useFirestore';
import { AdminVerifyProfileModal } from '../../components/Modal/AdminVerifyProfileModal';
import { useSelector } from 'react-redux';
import { authSelector } from 'redux/Auth/selectors';
import { db } from '../../../helpers/firebase.module';
import 'semantic-ui-css/semantic.min.css';
import { AdminMenu, AdminMenuItems } from './AdminMenu';
import gql from 'graphql-tag';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { ResourceRow } from './ResourceRow';
import { CreateResourceModal } from './CreateResourceModal';
import { constants } from 'crypto';
import { Context } from 'app/globalContext/GlobalContext';
import { AdminResourcesTab } from './AdminResourcesTab';
import { AdminProgramsTab } from './AdminProgramsTab';
import { UNVALIDATE_USERS } from '../../../service/queries';

const GET_RESOURCES = gql`
  query Resources($limit: Int, $offset: Int, $categories: [String]) {
    resources(limit: $limit, offset: $offset, categories: $categories) {
      id
      name
      description
      link
      categories
      picture_name
      rating
    }
  }
`;

export const AdminConsole = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState('');
  const [emails, setEmail] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState(
    AdminMenuItems.RESOURCES,
  );
  const [resources, setResources] = useState<any[]>([]);

  var { loading, error, data, fetchMore } = useQuery(GET_RESOURCES, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setResources([...data.resources]);
    },
  });

  const itemsPerPage = 10;

  // const { isAuth, email } = useSelector(authSelector);
  const {
    state: { isAuth, user },
  } = React.useContext(Context);
  const email = user?.email;

  const {
    loading: loadingUnvalidated,
    data: unvalidatedResponse,
    error: unvalidatedError,
    refetch: fetchUnvalidated,
  } = useQuery(UNVALIDATE_USERS);

  //const { docs } = useFirestoreVerification('member_data') as any;

  const { mcat } = useFirestoreMcat('member_data') as any;
  const { step1 } = useFirestoreStep1('member_data') as any;
  const { step2 } = useFirestoreStep2('member_data') as any;
  const { step3 } = useFirestoreStep3('member_data') as any;

  if (error) return <p>An error occured!</p>;

  const adminList = [
    'candice.blacknall@gogaba.co',
    'snmunoz@gmail.com',
    'aleoo7100@gmail.com',
  ];

  const onMenuItemClicked = (menuItem: AdminMenuItems) => {
    setActiveMenuItem(menuItem);
  };
  //console.log(unvalidatedError,loadingUnvalidated, unvalidatedResponse )

  return (
    <>
      <AdminMenu
        activeItem={activeMenuItem}
        onItemClicked={onMenuItemClicked}
      />
      {adminList.includes(email as any) && activeMenuItem === AdminMenuItems.RESOURCES && <AdminResourcesTab />}
      {adminList.includes(email as any) && activeMenuItem === AdminMenuItems.PROGRAMS && <AdminProgramsTab />}
      <section className="container">
        <section className="row">
          <section className="col">
            {unvalidatedResponse &&
              adminList.includes(email as any) &&
              unvalidatedResponse.user_account.map(doc => (
                <>
                  <div className="" key={doc.id}>
                    <p>Name : {`${doc.name} ${doc.last_name}`}</p>
                    <p>Email: {doc.email}</p>
                    <p>Medical School: {doc.medical_school}</p>
                    <p>Year: {doc.school_year}</p>
                    <button
                      onClick={() => {
                        setSelectedImg(doc.verification_file);
                        setName(`${doc.name} ${doc.last_name}`);
                        setEmail(doc.email);
                      }}
                      className="btn btn-success"
                    >
                      School Verification
                    </button>
                  </div>
                  <br />
                </>
              ))}
            {mcat &&
              adminList.includes(email as any) &&
              mcat.map(doc => (
                <>
                  <div className="" key={doc.id}>
                    <p className="card-title">Name : {doc.name}</p>
                    <p className="card-text">Email: {doc.email}</p>
                    <p className="card-text">
                      MCAT Document: {doc.mcat_document_name}
                    </p>
                    <button
                      onClick={() => {
                        db.collection('member_data').doc(doc.id).set(
                          {
                            mcat_review_requested: false,
                          },
                          { merge: true },
                        );
                      }}
                      className="btn btn-success"
                    >
                      Test Verification
                    </button>
                  </div>
                  <br />
                </>
              ))}
            {step1 &&
              adminList.includes(email as any) &&
              step1.map(doc => (
                <>
                  <div className="tile is-child box" key={doc.id}>
                    <p>Name : {doc.name}</p>
                    <p>Email: {doc.email}</p>
                    <p>Step 1 Document: {doc.step_1_document_name}</p>
                  </div>
                  <button
                    onClick={() => {
                      db.collection('member_data').doc(doc.id).set(
                        {
                          step_1_review_requested: false,
                        },
                        { merge: true },
                      );
                    }}
                    className="btn btn-success"
                  >
                    Test Verification
                  </button>
                  <br />
                </>
              ))}
            {step2 &&
              adminList.includes(email as any) &&
              step2.map(doc => (
                <>
                  <div className="tile is-child box" key={doc.id}>
                    <p>Name : {doc.name}</p>
                    <p>Email: {doc.email}</p>
                    <p>Step 2 Document: {doc.step_2_document_name}</p>
                    <button
                      onClick={() => {
                        db.collection('member_data').doc(doc.id).set(
                          {
                            step_2_review_requested: false,
                          },
                          { merge: true },
                        );
                      }}
                      className="btn btn-success"
                    >
                      Test Verification
                    </button>
                  </div>
                  <br />
                </>
              ))}
            {step3 &&
              adminList.includes(email as any) &&
              step3.map(doc => (
                <>
                  <div className="tile is-child box" key={doc.id}>
                    <p>Name : {doc.name}</p>
                    <p>Email: {doc.email}</p>
                    <p>Step 3 Document: {doc.step_3_document_name}</p>
                    <button
                      onClick={() => {
                        db.collection('member_data').doc(doc.id).set(
                          {
                            step_3_review_requested: false,
                          },
                          { merge: true },
                        );
                      }}
                      className="btn btn-success"
                    >
                      Test Verification
                    </button>
                  </div>
                  <br />
                </>
              ))}
          </section>
          <section className="col">
            {selectedImg && (
              <AdminVerifyProfileModal
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
                name={name}
                email={emails}
                refetch={fetchUnvalidated}
              />
            )}
          </section>
        </section>
      </section>
    </>
  );
};
