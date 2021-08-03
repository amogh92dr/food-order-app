import React, { useContext, useState } from "react";
import CartContext from "../../../store/cart-context";
import CartItem from "../CartItem/CartItem";
import Modal from "../../UI/Modal/Modal";
import classes from "./Cart.module.css";
import Checkout from "../Checkout";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item, index) => (
        <CartItem
          key={`${item.id}${index}`}
          price={item.price}
          name={item.name}
          quantity={item.quantity}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const closeButtonHandler = () => {
    props.hideCart();
  };
  const OrderButtonhandler = () => {
    console.log("Your Items have been Ordered");
    setIsCheckout(true);
  };
  const submitButtonHandler = async (userData) => {
    console.log(userData);
    setIsSubmitting(true);
    await fetch(
      "https://food-order-ce575-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        contentType: "application/json",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearItems();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={closeButtonHandler}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={classes.button} onClick={OrderButtonhandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitButtonHandler} onCancel={props.hideCart} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>Your Order is On the Way</p>;
  const didSubmitModalContent = <p>Yayy! Order Sent Successfully!</p>;
  return (
    <Modal showCart={props.showCart} hideCart={props.hideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
