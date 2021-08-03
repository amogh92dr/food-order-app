import Card from "../../UI/Card";
import MealItem from "../MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://food-order-ce575-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("failed to Load.. :( ");
      }
      const responseBody = await response.json();
      const mealsArray = [];
      for (const key in responseBody) {
        mealsArray.push({
          id: key,
          name: responseBody[key].name,
          description: responseBody[key].description,
          price: responseBody[key].price,
          key: key,
        });
      }
      setMeals(mealsArray);
      setIsLoading(false);
    };

    fetchMeals().catch((e) => {
      setIsLoading(false);
      setIsError(e.message);
    });
  }, []);
  console.log("meals", meals);
  if (isLoading) {
    return (
      <Card>
        <p className={classes.mealLoading}> Loading...</p>
      </Card>
    );
  }
  if (isError) {
    return (
      <Card>
        <p className={classes.mealLoading}> {isError}</p>
      </Card>
    );
  }
  const meallist =
    meals &&
    meals.map((meal) => (
      <MealItem
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        key={meal.id}
      />
    ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meallist}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
