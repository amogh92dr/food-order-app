import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/cartProvider";
function App() {
  const [isCartShown, toggleCart] = useState(false);
  const showCartHandler = () => {
    toggleCart(true);
  };
  const hideCartHandler = () => {
    toggleCart(false);
  };
  return (
    <CartProvider>
      {isCartShown && (
        <Cart showCart={showCartHandler} hideCart={hideCartHandler} />
      )}
      <Header showCart={showCartHandler} />
      <Meals />
    </CartProvider>
  );
}

export default App;
