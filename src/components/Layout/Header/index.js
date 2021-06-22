import React from "react";
import mealsImg from "../../../assets/meals.jpg";
import HeaderCartButton from "../HeaderCartButton";
import classes from "./Header.module.css";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton showCart={props.showCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="Delicious food table" />
      </div>
    </React.Fragment>
  );
};

export default Header;
