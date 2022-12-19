import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import React from "react";
import {addToCart} from "../../../Context/action";
import {CartContext} from "../../../Context/CartContext";
import {useContext} from "react";

const MealItemForm = ({temp, item}) => {
  const amountInputRef = React.useRef();
  const [amountIsValid, setAmountIsValid] = React.useState(true)
  const {dispatch} = useContext(CartContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredamount = amountInputRef.current.value
    const enteredamountNumber = +enteredamount;

    if(enteredamount.trim().length === 0 || enteredamountNumber < 1 || enteredamountNumber > 5){
      setAmountIsValid(false)
      return;
    }

    const data = {
      id: temp,
      name: item.name,
      amount: enteredamountNumber,
      price: item.price,
    }

    dispatch(addToCart(data))
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref = {amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + temp,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;