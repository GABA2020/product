import React from 'react';
import { Table } from 'semantic-ui-react';

export type Resource = {
  id: string;
  name: string;
  description: string;
  rating: string;
};

export interface ResourceRowProps {
  resource: Resource;
}

export const ResourceRow = (props: ResourceRowProps) => {
  const resource = props.resource;
  return (
    <Table.Row>
      <Table.Cell>{resource.name}</Table.Cell>
      <Table.Cell>{resource.description}</Table.Cell>
      <Table.Cell>{resource.rating}</Table.Cell>
      <Table.Cell>Edit</Table.Cell>
      <Table.Cell>Delete</Table.Cell>
    </Table.Row>
  );
};
