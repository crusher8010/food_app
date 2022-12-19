import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from "react";
import { CartContext } from '../../Context/CartContext';
import CartItem from './CartItem';
import { removeFromCart, addToCart, checkout } from '../../Context/action';

const Cart = (props) => {
  const { state, dispatch } = useContext(CartContext)

  const temp = state.reduce((a, c) => {
    return a + c.price * c.amount;
  }, 0)

  const totalAmount = `$${temp.toFixed(2)}`;
  const hasItems = state.length > 0;
  
  const cartItemAddHandler = (item) => {
    dispatch(addToCart({...item,amount:1}))
  }

  const cartItemRemoveHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {state.map((item) => (
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button onClick={() => dispatch(checkout())} className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;