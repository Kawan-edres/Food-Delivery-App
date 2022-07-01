import React, { Fragment, useContext,useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

import CartContext from "../../Context/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting,setIsSubmiting]=useState(false);
  const [didSubmit,setDidSubmit]=useState(false);
  const cartCtx = useContext(CartContext);
  

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const onSubmitHandler =  (userData) => {
    setIsSubmiting(true);
     fetch("https://react-http-17b03-default-rtdb.firebaseio.com/orders.json",{
      method:"POST",
      body:JSON.stringify({
        user:userData,
        orderedItem:cartCtx.items,
      })
    });
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();

  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent=
  
  <Fragment>
   {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} onConfirm={onSubmitHandler} />}
      {!isCheckout && modalActions}


  </Fragment>
  const isSubmitingModalContent=<p>Sending OrderData...</p>
  const didSubmitModalContent= <Fragment>
    <p>Order Placed Successfully</p> 
    <button className={classes.button} onClick={props.onClose}>Close</button>
  </Fragment> 
  return (
    <Modal onClose={props.onClose}>
    {!isSubmiting&& !didSubmit   && cartModalContent }
    {isSubmiting && isSubmitingModalContent}
    {!isSubmiting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;