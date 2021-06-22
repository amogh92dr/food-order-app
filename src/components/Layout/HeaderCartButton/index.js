import classes from "./HeaderCartButton.module.css";
import CartIcon from "../../Cart/CartIcon";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";
const HeaderCartButton = (props) => {
  const showCartHandler = () => {
    props.showCart();
  };
  const cartCtx = useContext(CartContext);
  const [isbuttonHighlighted, setButtonHighLighted] = useState(false);
  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) return;
    else setButtonHighLighted(true);
    const timer = setTimeout(() => {
      setButtonHighLighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const buttonClass = `${classes.button} ${
    isbuttonHighlighted ? classes.bump : ""
  }`;
  return (
    <button className={buttonClass} onClick={showCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>
        {cartCtx.items.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0)}
      </span>
    </button>
  );
};
export default HeaderCartButton;
