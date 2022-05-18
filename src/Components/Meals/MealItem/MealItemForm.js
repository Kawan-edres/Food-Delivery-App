import { useRef , useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const[amountIsValid,setAmountIsValid]=useState(true); //tanha bo error message henawmana ka amnawe agar empty bw yan la<1 >5 awa error messagey pe bdain 
  
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value; //alwasy is string and this is coming from input in the input componnet 
    const enterdAmountNumber = +enteredAmount; //cast string number
    //form validation
    if (
      enteredAmount.trim().length === 0 ||
      enterdAmountNumber < 1 ||
      enterdAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enterdAmountNumber); //la parentawa wary dagrin 
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: 1,
          max: 5,
          step: "1",
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
