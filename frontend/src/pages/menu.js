import React, { useEffect, useState } from 'react';
import { MyContext } from '../context';
import {
  Flex,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Input,
  Icon,
  Button
} from '@chakra-ui/core';
import Form from '../components/Form';
import PRODUCT_SERVICE from '../services/product';

function Menu() {
  const [inicialProducts, setProducts] = useState([]);
  const [inicialOrder, setOrder] = useState([]);
  const [cliked, setCliked] = useState(false);

  let buttonsMenu;
  let productList = [];

  const getAllProducts = () => {
    return PRODUCT_SERVICE.allProducts();
  };

  const getRestDayProducts = async () => {
    const response = await PRODUCT_SERVICE.allProducts();
    const restDayProducts = response.data.products.filter(
      element => element.menu === 'Rest Day' && !element.extra
    );
    setProducts(restDayProducts);
  };

  const getBreakfastProducts = async () => {
    const response = await PRODUCT_SERVICE.allProducts();
    const breakfastProducts = response.data.products.filter(
      element => element.menu === 'Breakfast'
    );
    setProducts(breakfastProducts);
    console.log(inicialProducts);
  };

  const settingOrder = (arr1, arr2) => {
    let newOrder = [];
    arr1.map(product => {
      if (arr2.includes(product._id)) {
        newOrder.push(product);
        setOrder(newOrder);
      }
    });
  };

  // useEffect(() => {
  //   return settingOrder(inicialOrder, productList);
  // }, [inicialOrder]);

  const hanldeClick = e => {
    const {
      target: { value, id }
    } = e;

    if (!productList.includes(value)) {
      productList.push(value);
      console.log(productList);
    } else {
      const index = productList.indexOf(value);
      productList.splice(index, 1);
      console.log(productList);
    }
  };

  useEffect(() => {
    getAllProducts()
      .then(response => {
        const breakfastProducts = response.data.products.filter(
          element => element.menu === 'Breakfast'
        );
        setProducts(breakfastProducts);
      })
      .catch(err => console.log(err));

    settingOrder(inicialOrder, productList);
  }, [inicialOrder]);

  if (inicialProducts === undefined) {
    return null;
  } else {
    buttonsMenu = inicialProducts.map((e, i) => (
      <Button
        onClick={hanldeClick}
        value={e._id}
        id={i}
        key={i}
        marginLeft="2vw"
        size="lg"
      >
        {e.name} <br />
        S/. {e.price}
      </Button>
    ));
  }

  return (
    <MyContext.Consumer>
      {context => (
        <>
          <Flex
            w="25vw"
            h="6vh"
            justify="space-between"
            marginLeft="3vw"
            marginTop=".5vh"
          >
            <Button variantColor="green" onClick={getBreakfastProducts}>
              Desayuno
            </Button>
            <Button variantColor="green" onClick={getRestDayProducts}>
              Comida/Cena
            </Button>
          </Flex>
          <Flex w="100vw" h="100vh">
            <Flex
              w="60vw"
              h="40vh"
              marginTop="4vh"
              wrap="wrap"
              justify="space-around"
            >
              {buttonsMenu}
            </Flex>
            <Flex w="35vw" h="80vh" justify="center" alignItems="center">
              <h1>Aqui va la orden</h1>
              <Button onClick={settingOrder(inicialOrder, productList)}>
                Order
              </Button>
            </Flex>
          </Flex>
        </>
      )}
    </MyContext.Consumer>
  );
}

export default Menu;
