import { Fragment } from "react";
import MealsSummary from "../MealSummary";
import AvailableMeals from "../AvailableMeals";

const Meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};
export default Meals;
