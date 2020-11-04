import React, { Fragment, useState } from 'react';
import {
  Table,
  Search,
  Button,
  Pagination,
  PaginationProps,
  SearchProps,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { CreateProgramModal } from '../CreateProgramModal';
import { ResourceRow } from '../ResourceRow';

const GET_PROGRAMS = gql`
  query Programs($limit: Int, $offset: Int, $specialities: [String]) {
    programs(limit: $limit, offset: $offset, specialities: $specialities) {
      id
      name
      description
      link
      specialities
      state
      picture_name
      rating
    }
  }
`;

export const AdminProgramsTab = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [programs, setPrograms] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const itemsPerPage = 10;

  var { loading, error, data, fetchMore } = useQuery(GET_PROGRAMS, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setPrograms([...data.programs]);
    },
  });

  const fetch = (offset: number) =>
    fetchMore({
      variables: {
        limit: itemsPerPage,
        offset: offset,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        setPrograms([...fetchMoreResult.programs]);
        return {
          data: fetchMoreResult.programs,
        };
      },
    });

  const onSearchChange = (e, data: SearchProps) => {
    if (data.value) {
      const searchResults = [
        ...programs.filter(program =>
          (program.name as string).includes(data.value as string),
        ),
      ];
      console.log(searchResults);
      setSearchValue(data.value as string);
      setSearchResults([...searchResults]);
    } else {
      setSearchValue('');
      setSearchResults([...programs]);
    }
  };

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
          setPrograms([...fetchMoreResult.programs]);
          return {
            data: fetchMoreResult.programs,
          };
        },
      });
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Search open={false} onSearchChange={onSearchChange} />
        <CreateProgramModal
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
              content="Create A New Program"
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
            <Table.HeaderCell>Rating</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {searchValue && searchResults
            ? searchResults.map(program => <ResourceRow resource={program} />)
            : programs &&
              programs.map(program => <ResourceRow resource={program} />)}
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
  );
};
