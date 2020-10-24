import React, { useState } from 'react';
import { Menu, Segment, Sidebar } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'redux/User/selectors';
import { actions as userActions } from 'redux/User/slice';

export function LateralMenu({ children }) {
  const { showMenu } = useSelector(userSelector);
  const dispatch = useDispatch();

  return (
      <Sidebar.Pushable >
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          inverted
          vertical
          visible={showMenu}
          onHide={() => dispatch(userActions.showMenu())}
          width="thin"
        >
          <Menu.Item as="a">Home</Menu.Item>
          <Menu.Item as="a">Marketplace</Menu.Item>
        </Sidebar>
        <Sidebar.Pusher dimmed={showMenu}>{children}</Sidebar.Pusher>
      </Sidebar.Pushable>
  );
}
