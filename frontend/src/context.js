import React, { Component, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import AUTH_SERVICE from './services/auth';

export const MyContext = createContext();

class MyProvider extends Component {
  state = {
    formOrder: {
      productList: [],
      combo: [],
      status: '',
      userId: '',
      totalPrice: '',
      tableId: ''
    },
    formLogin: {
      email: '',
      password: ''
    },
    isLoggedIn: false
  };

  handleLoginInput = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      formLogin: {
        ...prevState.formLogin,
        [name]: value
      }
    }));
  };

  handleOrderSubmit = e => {
    e.preventDefault();
    const {
      productList,
      combo,
      status,
      userId,
      totalPrice,
      tableId
    } = this.state.formOrder;
    AUTH_SERVICE.createOrder({
      productList,
      combo,
      status,
      userId,
      totalPrice,
      tableId
    })
      .then(({ data }) => {
        this.setState(prevState => ({
          ...prevState,
          formOrder: {
            productList: [],
            combo: [],
            status: '',
            userId: '',
            totalPrice: '',
            tableId: ''
          }
        }));
        alert(':)');
        this.props.history.push('/');
      })
      .catch(() => {
        alert(':(, chaleee');
      });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state.formLogin;
    AUTH_SERVICE.login({ email, password })
      .then(({ data }) => {
        this.setState(prevState => ({
          ...prevState,
          formLogin: {
            email: '',
            password: ''
          },
          loggedUser: data.user,
          isLoggedIn: true
        }));
        this.props.history.push('/menu');
      })
      .catch(() => {
        alert('Your password or email was wrong');
      });
  };

  handleLogout = () => {
    AUTH_SERVICE.logOut()
      .then(response => {
        window.localStorage.clear();
        this.setState({ isLoggedIn: false });
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      state,
      handleOrderSubmit,
      handleLoginInput,
      handleLoginSubmit,
      handleFile,
      handleLogout
    } = this;
    return (
      <MyContext.Provider
        value={{
          state,
          handleOrderSubmit,
          handleLoginInput,
          handleLoginSubmit,
          handleFile,
          handleLogout
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default withRouter(MyProvider);
