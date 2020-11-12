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
import {
  Table,
  Search,
  Button,
  Pagination,
  PaginationProps,
  SearchProps,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { AdminMenu, AdminMenuItems } from './AdminMenu';
import gql from 'graphql-tag';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { ResourceRow } from './ResourceRow';
import { CreateResourceModal } from './Resources';
import { constants } from 'crypto';
import { Context } from 'app/globalContext/GlobalContext';

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
  const [name, setName] = useState(null);
  const [emails, setEmail] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(
    AdminMenuItems.RESOURCES,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resources, setResources] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  var { loading, error, data, fetchMore } = useQuery(GET_RESOURCES, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setResources([...data.resources]);
    },
  });

  const itemsPerPage = 10;


  // const { isAuth, email } = useSelector(authSelector);
  const { state: { isAuth, user } } = React.useContext(Context);
  const email = user?.email;
  

  const { docs } = useFirestoreVerification('member_data') as any;

  const { mcat } = useFirestoreMcat('member_data') as any;
  const { step1 } = useFirestoreStep1('member_data') as any;
  const { step2 } = useFirestoreStep2('member_data') as any;
  const { step3 } = useFirestoreStep3('member_data') as any;

  if (error) return <p>An error occured!</p>;

  const adminList = ['candice.blacknall@gogaba.co', 'snmunoz@gmail.com', 'aleoo7100@gmail.com'];

  const onMenuItemClicked = (menuItem: AdminMenuItems) => {
    setActiveMenuItem(menuItem);
  };

  const fetch = (offset: number) =>
    fetchMore({
      variables: {
        limit: itemsPerPage,
        offset: offset,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        setResources([...fetchMoreResult.resources]);
        return {
          data: fetchMoreResult.resources,
        };
      },
    });

  const onPageChange = async (event, data: PaginationProps) => {
    if (data.activePage) {
      const offset = ((data.activePage as number) - 1) * itemsPerPage;
      fetchMore({
        variables: {
          limit: itemsPerPage,
          offset: offset,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setCurrentPage(data.activePage as number);
          setResources([...fetchMoreResult.resources]);
          return {
            data: fetchMoreResult.resources,
          };
        },
      });
    }
  };

  const onSearchChange = (e, data: SearchProps) => {
    if (data.value) {
      const searchResults = [
        ...resources.filter(resource =>
          (resource.name as string).includes(data.value as string),
        ),
      ];
      console.log(searchResults);
      setSearchValue(data.value as string);
      setSearchResults([...searchResults]);
    } else {
      setSearchValue('');
      setSearchResults([...resources]);
    }
  };
  // fetchMore({
  //   variables: {
  //     cursor: cursor,
  //   },
  //   updateQuery: (previousResult, { fetchMoreResult }) => {
  //     const previousEntry = previousResult.entry;
  //     const newProducts = fetchMoreResult.allProducts;
  //     return {
  //       cursor: fetchMoreResult.cursor,
  //       entry: {
  //         allProducts: [...previousEntry.entry.allProducts, ...newProducts],
  //       },
  //     };

  return (
    <>
      <AdminMenu
        activeItem={activeMenuItem}
        onItemClicked={onMenuItemClicked}
      />
      {activeMenuItem === AdminMenuItems.RESOURCES && (
        <>
          <div style={{ display: 'flex' }}>
            <Search open={false} onSearchChange={onSearchChange} />
            <CreateResourceModal
              onClose={async () => {
                const offset = ((currentPage as number) - 1) * itemsPerPage;
                await fetch(offset);
                setCreateModalOpen(false);
              }}
              onOpen={() => setCreateModalOpen(true)}
              open={createModalOpen}
              trigger={
                <Button
                  style={{ 'margin-left': 20 }}
                  content="Create A New Resource"
                  icon="add"
                  labelPosition="left"
                />
              }
            />
          </div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Raiting</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {searchValue && searchResults
                ? searchResults.map(resource => (
                    <ResourceRow resource={resource} />
                  ))
                : resources &&
                  resources.map(resource => (
                    <ResourceRow resource={resource} />
                  ))}
            </Table.Body>
            <Table.Footer>
              <Table.HeaderCell colSpan="5">
                <Pagination
                  floated="right"
                  defaultActivePage={currentPage}
                  totalPages={10}
                  onPageChange={onPageChange}
                />
              </Table.HeaderCell>
            </Table.Footer>
          </Table>
        </>
      )}
      {activeMenuItem === AdminMenuItems.PROGRAMS && <div>Fast</div>}
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
