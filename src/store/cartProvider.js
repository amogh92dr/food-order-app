import CartContext from "./cart-context";
import React, { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.item.quantity * action.item.price;
      let updatedItems = [...state.items];
      const existingItemIndex = updatedItems.findIndex(
        (item) => item.id === action.item.id
      );
      const existingItem = updatedItems[existingItemIndex];
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + action.item.quantity,
        };
        updatedItems[existingItemIndex] = updatedItem;
      } else updatedItems = state.items.concat(action.item);
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE":
      const itemstoUpdate = [...state.items];
      const itemtoRemoveIndex = itemstoUpdate.findIndex(
        (item) => item.id === action.id
      );
      const itemToUpdate = itemstoUpdate[itemtoRemoveIndex];
      if (itemToUpdate) {
        if (itemToUpdate.quantity > 1)
          itemToUpdate.quantity = itemToUpdate.quantity - 1;
        else {
          itemstoUpdate.splice(itemtoRemoveIndex, 1);
        }
        const amountAfterRemoval = state.totalAmount - itemToUpdate.price;
        return {
          items: itemstoUpdate,
          totalAmount: amountAfterRemoval,
        };
      } else {
        console.log("Oops Somethings Wrong");
        return defaultCartState;
      }
    case "CLEAR":
      return {
        items: [],
        totalAmount: 0,
      };
    default:
      return defaultCartState;
  }
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearItemsCarthandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemCartHandler,
    clearItems: clearItemsCarthandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
