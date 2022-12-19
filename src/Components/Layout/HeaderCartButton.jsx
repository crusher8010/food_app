import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import {useContext, useEffect, useState} from "react";
import { CartContext } from "../../Context/CartContext";

const HeaderCartButton = (props) => {
    const [btnHighlighted, setBtnHighlighted] = useState(false)
    const {state} = useContext(CartContext);

    const numberOfCartItems = state.reduce((curr, item) => {
        return curr + item.amount;
    },0)

    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump:''}`;

    useEffect(() => {
        if(state.length === 0){
            return;
        }
        setBtnHighlighted(true);

        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        },300)

        return () => {
            clearTimeout(timer)
        }
    }, [state])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;