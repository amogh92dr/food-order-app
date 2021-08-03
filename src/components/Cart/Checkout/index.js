import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
const isEmpty = (val) => val.trim() === "";
const is5Chars = (val) => val.trim().length === 5;
const Checkout = (props) => {
  const [isFormValid, setisFormValid] = useState({
    nameValid: true,
    streetValid: true,
    postalValid: true,
    cityValid: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const nameValid = !isEmpty(nameInputRef.current.value);
    const streetValid = !isEmpty(streetInputRef.current.value);
    const postalValid = is5Chars(postalInputRef.current.value);
    const cityValid = !isEmpty(cityInputRef.current.value);
    setisFormValid({
      nameValid: nameValid,
      streetValid: streetValid,
      postalValid: postalValid,
      cityValid: cityValid,
    });
    if (!(nameValid && streetValid && postalValid && cityValid)) return;
    props.onConfirm({
      name: nameInputRef.current.value,
      street: streetInputRef.current.value,
      postal: postalInputRef.current.value,
      city: cityInputRef.current.value,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          isFormValid.nameValid ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!isFormValid.nameValid && <p>Please Enter a Valid Name</p>}
      </div>
      <div
        className={`${classes.control} ${
          isFormValid.streetValid ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!isFormValid.streetValid && <p>Please Enter a Valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          isFormValid.postalValid ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!isFormValid.postalValid && <p>Please Enter a Valid postal</p>}
      </div>
      <div
        className={`${classes.control} ${
          isFormValid.cityValid ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!isFormValid.cityValid && <p>Please Enter a Valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
