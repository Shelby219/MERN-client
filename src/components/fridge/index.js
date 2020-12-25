import React from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import styles from "../styles/loginSignup.module.css";
import api from "../../config/api";
import AutocompleteIngredients from "../ingredientAutocomplete";
import Logo from "../logo";

const Fridge = () => {
  return <div>
        <Logo />It's a fridge!
        <AutocompleteIngredients /></div>;
};

export default Fridge;
