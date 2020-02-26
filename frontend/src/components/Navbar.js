import React from 'react';
import { MyContext } from '../context';
import { NavLink } from 'react-router-dom';
import { Flex } from '@chakra-ui/core';

const styles = {
  style: {
    padding: '20px'
  },
  activeStyle: {
    color: 'white'
  }
};

export default function Navbar(props) {
  return (
    <MyContext.Consumer>
      {context => (
        <Flex
          w="100vw"
          h="10vh"
          bg="gray.500"
          align="center"
          justify="flex-end"
        >
          {!context.state.isLoggedIn && (
            <>
              <NavLink {...styles} exact to="/">
                Login
              </NavLink>
            </>
          )}
          {context.state.isLoggedIn && (
            <>
              <NavLink {...styles} exact to="/menu">
                Menu
              </NavLink>
              <span onClick={() => context.handleLogout()}>
                <button style={styles.style}>Logout</button>
              </span>
            </>
          )}
        </Flex>
      )}
    </MyContext.Consumer>
  );
}
