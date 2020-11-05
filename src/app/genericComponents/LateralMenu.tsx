import React, { useContext, useState } from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import { Context } from 'app/globalContext/GlobalContext';
import { NavLink } from 'react-router-dom';

export function LateralMenu({ children }) {
  const {
    state: { showMenu },
    dispatch: { changeShowMenu },
  } = useContext(Context);

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        inverted
        vertical
        visible={showMenu}
        onHide={() => changeShowMenu(false)}
        width="thin"
      >
        <Menu.Item onClick={() => changeShowMenu(false)} as={NavLink} to="/">
          Home
        </Menu.Item>
        <Menu.Item
          onClick={() => changeShowMenu(false)}
          as={NavLink}
          to="/marketplace"
        >
          Marketplace
        </Menu.Item>
        <Menu.Item
          onClick={() => changeShowMenu(false)}
          as={NavLink} 
          to='/people'>
          People
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher dimmed={showMenu}>{children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
