import React from 'react';
import { Menu, MenuItem, MenuItemProps } from 'semantic-ui-react';

export enum AdminMenuItems {
  RESOURCES,
  PROGRAMS,
}

export interface AdminMenuProps {
  activeItem: AdminMenuItems;
  onItemClicked: (tab: AdminMenuItems) => void;
}
export const AdminMenu = (props: AdminMenuProps) => {
  const onItemClicked = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps,
  ) => {
    if (data.index != null) {
      props.onItemClicked(data.index as AdminMenuItems);
    }
  };

  return (
    <Menu>
      <MenuItem
        index={AdminMenuItems.RESOURCES.valueOf()}
        active={props.activeItem === AdminMenuItems.RESOURCES}
        onClick={onItemClicked}
      >
        Resources
      </MenuItem>
      <MenuItem
        index={AdminMenuItems.PROGRAMS.valueOf()}
        active={props.activeItem === AdminMenuItems.PROGRAMS}
        onClick={onItemClicked}
      >
        Programs
      </MenuItem>
    </Menu>
  );
};
