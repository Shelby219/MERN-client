import React, { useState } from "react";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import styles from "./auto.module.css";
import ingredients from "../../data/ingredients.json";
import pantry from "../../data/pantry.json";

import {
  addFridgeItem,
  addPantryItem,
  setFridge,
  setPantry,
} from "../../services/ingredientServices";
import { getUsername } from "../../services/authServices";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import Button from "@material-ui/core/Button";

function AutocompleteIngredients({
  actions,
  fridgeIngredients,
  pantryIngredients,
  type,
  username,
}) {


  //removes selected ingredient from list of ingredients to add

  const filteredFridge = fridgeIngredients
    ? ingredients.filter(
        (ingredient) => !fridgeIngredients.includes(ingredient.name)
      )
    : ingredients;

  const filteredPantry = pantryIngredients
    ? pantry.filter(
        (ingredient) => !pantryIngredients.includes(ingredient.name)
      )
    : pantry;
  const filteredList = type === "fridge" ? filteredFridge : filteredPantry;

  let history = useHistory();

  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState(null);

  function handleAddFridge(event) {
    console.log(values);
    const newValues = values.map((i) => i.name);
    console.log(newValues.join(", "));

    addFridgeItem(getUsername(), { item: newValues })
      .then((r) => {
        console.log(r);
        actions.addToFridge(r.fridgeIngredients);
        setFridge(r.fridgeIngredients);
        history.push("/ingredients/" + getUsername() + "/fridge");
        toast.success(" New Fridge Ingredient Added!");
      })
      .catch((error) => {
        console.log("errors");
        console.log(error.response);
        toast.error("Oh no error!");
        if (error.response && error.response.status === 401)
          setErrors("Error adding to your Fridge");
        else
          setErrors(
            "There may be a problem with the server. Please try again after a few moments."
          );
      });
  }

  function handleAddPantry(event) {
    console.log(values);
    const newValues = values.map((i) => i.name);
    console.log(newValues.join(", "));
    addPantryItem(getUsername(), { item: newValues })
      .then((r) => {
        console.log(r);
        actions.addToPantry(r.pantryIngredients);
        setPantry(r.pantryIngredients);
        history.push("/ingredients/" + getUsername() + "/pantry");
        toast.success(" New pantry Ingredient Added!");
      })
      .catch((error) => {
        console.log("errors");
        console.log(error.response);
        toast.error("Oh no error!");
        if (error.response && error.response.status === 401)
          setErrors("Error adding to your pantry");
        else
          setErrors(
            "There may be a problem with the server. Please try again after a few moments."
          );
      });
  }

  return (
    // autocomplete list
    <div class={styles.autoComplete}>
      {errors && <div>{errors}</div>}
      <Autocomplete
        multiple
        id="tags-standard"
        // options={ingredientsList}
        options={filteredList}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions="true"
        // defaultValue={[filteredList[13]]}
        onChange={(event, value) => setValues(value)}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
              label="Add Ingredients"
              placeholder="Ingredients"
            />
          );
        }}
      />
      <Button
        class={styles.button}
        onClick={type === "fridge" ? handleAddFridge : handleAddPantry}
      >
        {" "}
        Add Ingredients
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.userLoggedIn.username,
  fridgeIngredients: state.userIngredients.fridgeIngredients,
  pantryIngredients: state.userIngredients.pantryIngredients,
  error: state.errorsMessages,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    addToFridge: (newIngredients) =>
      dispatch({ type: "fridgeIngredients", payload: newIngredients }),
    addToPantry: (newIngredients) =>
      dispatch({ type: "pantryIngredients", payload: newIngredients }),
    changeError: (error) => dispatch({ type: "error", payload: error }),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteIngredients);
