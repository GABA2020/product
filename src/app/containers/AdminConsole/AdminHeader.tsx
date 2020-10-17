import React from 'react';
import { Menu, MenuItem, MenuItemProps } from 'semantic-ui-react';

export enum AdminHeaderTabs {
  RESOURCES,
  PROGRAMS,
}

export interface AdminHeaderProps {
  tab: AdminHeaderTabs;
  onTabClicked: (tab: AdminHeaderTabs) => void;
}
export const AdminHeader = (props: AdminHeaderProps) => {
  const onItemClicked = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps,
  ) => {
    if (data.index != null) {
      props.onTabClicked(data.index as AdminHeaderTabs);
    }
  };

  return (
    <Menu>
      <MenuItem
        index={AdminHeaderTabs.RESOURCES.valueOf()}
        active={props.tab === AdminHeaderTabs.RESOURCES}
        onClick={onItemClicked}
      >
        Resources
      </MenuItem>
      <MenuItem
        index={AdminHeaderTabs.PROGRAMS.valueOf()}
        active={props.tab === AdminHeaderTabs.PROGRAMS}
        onClick={onItemClicked}
      >
        Programs
      </MenuItem>
    </Menu>
  );
};
