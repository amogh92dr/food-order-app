import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import CartItem from "../CartItem/CartItem";
import Modal from "../../UI/Modal/Modal";
import classes from "./Cart.module.css";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);

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
  };

  return (
    <Modal showCart={props.showCart} hideCart={props.hideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
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
    </Modal>
  );
};
export default Cart;
