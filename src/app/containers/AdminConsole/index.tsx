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
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Link, Redirect, Route, Router, Switch } from 'react-router-dom';
import { history } from 'utils/history';
import RoutesTypes from '../../../types/Routes';
import { Resources } from './Resources';
import { Programs } from './Programs';

// Auth Route
const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={RoutesTypes.SIGN_IN} />
        )
      }
    />
  );
};

export const AdminConsole = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(null);
  const [emails, setEmail] = useState(null);
  const [activeItem, setActiveItem] = useState('resources');

  const adminList = ['candice.blacknall@gogaba.co'];

  const { isAuth, email } = useSelector(authSelector);

  const { docs } = useFirestoreVerification('member_data') as any;

  const { mcat } = useFirestoreMcat('member_data') as any;
  const { step1 } = useFirestoreStep1('member_data') as any;
  const { step2 } = useFirestoreStep2('member_data') as any;
  const { step3 } = useFirestoreStep3('member_data') as any;

  const handleItemClick = (e, data) => {
    const { name } = data;
    setActiveItem(name);
  };

  return (
    <>
      <section>
        <Menu>
          <Link to={RoutesTypes.RESOURCES}>
            <Menu.Item
              name="resources"
              active={activeItem === 'resources'}
              onClick={handleItemClick}
            >
              Resources
            </Menu.Item>
          </Link>
          <Link to={RoutesTypes.PROGRAMS}>
            <Menu.Item
              name="programs"
              active={activeItem === 'programs'}
              onClick={handleItemClick}
            >
              Programs
            </Menu.Item>
          </Link>
        </Menu>
        <Router history={history}>
          <Switch>
            <AuthRoute
              isAuth={isAuth}
              exact
              path={RoutesTypes.PRODUCT}
              component={Resources}
            />
            <AuthRoute
              isAuth={isAuth}
              exact
              path={RoutesTypes.USER}
              component={Programs}
            />
          </Switch>
        </Router>
      </section>
      <section className="container">
        <section className="row">
          <section className="col">
            {docs &&
              adminList.includes(email as any) &&
              docs.map(doc => (
                <>
                  <div className="" key={doc.id}>
                    <p>Name : {doc.name}</p>
                    <p>Email: {doc.email}</p>
                    <p>Medical School: {doc.medicalSchool}</p>
                    <p>Year: {doc.student_status}</p>
                    <button
                      onClick={() => {
                        setSelectedImg(doc.schoolVerification);
                        setName(doc.firstName);
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
              />
            )}
          </section>
        </section>
      </section>
    </>
  );
};
