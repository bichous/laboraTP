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

  let buttonsMenu;
  let productList;

  const getAllProducts = () => {
    return PRODUCT_SERVICE.allProducts();
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
  }, []);

  if (inicialProducts === undefined) {
    return null;
  } else {
    buttonsMenu = inicialProducts.map((e, i) => (
      <Button key={i} marginLeft="2vw" size="lg">
        {e.name} <br />
        S/. {e.price}.00
      </Button>
    ));
  }

  const addingItems = (arr, product) => {
    productList = arr.push(product);
    setOrder(productList);
  };

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
            <Button variantColor="green">Desayuno</Button>
            <Button variantColor="green">Comida/Cena</Button>
          </Flex>
          <Flex w="100vw" h="100vh">
            <Flex
              w="60vw"
              h="20vh"
              marginTop="4vh"
              wrap="wrap"
              justify="space-around"
            >
              {buttonsMenu}
            </Flex>
            <Flex w="35vw" h="80vh" justify="center" alignItems="center">
              <h1>Aqui va la orden</h1>
            </Flex>
          </Flex>
        </>
      )}
    </MyContext.Consumer>
  );
}

export default Menu;
