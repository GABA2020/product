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
import { CreateResourceModal } from '../CreateResourceModal';
import { ResourceRow } from '../ResourceRow';

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

export const AdminResourcesTab = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resources, setResources] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const itemsPerPage = 10;

  var { loading, error, data, fetchMore } = useQuery(GET_RESOURCES, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setResources([...data.resources]);
    },
  });

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

  return (
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
            <Table.HeaderCell>Rating</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {searchValue && searchResults
            ? searchResults.map(resource => <ResourceRow resource={resource} />)
            : resources &&
              resources.map(resource => <ResourceRow resource={resource} />)}
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
