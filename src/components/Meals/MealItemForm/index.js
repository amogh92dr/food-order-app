import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";
const MealItemForm = (props) => {
  const [amountisvalid, setAmountIsValid] = useState(true);
  const inputAmountRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputAmountRef.current.value;
    const intEnteredAmount = parseInt(enteredAmount);

    if (
      enteredAmount.trim().length === 0 ||
      intEnteredAmount < 1 ||
      intEnteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddtoCart(intEnteredAmount);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputAmountRef}
        label="Amount"
        input={{
          id: `amount_${Math.random()}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add </button>
      {!amountisvalid && <p>Enter correct value: Natural number less than 5</p>}
    </form>
  );
};
export default MealItemForm;
