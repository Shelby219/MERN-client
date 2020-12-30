import React, {useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import appstyles from "../../app.module.css";
import {getAllPantryIngredients } from '../../services/ingredientServices'
import {getUsername} from '../../services/authServices'
import ItemHandler from "./itemHandler";
import Logo from "../logo";
import Ingredients from "../ingredient";
import NoIngredients from "../noIngredientsPage";


import useStyles from "../styles/makeStyles.js";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";



const Pantry = ({actions, pantryIngredients}) => {

  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
  getAllPantryIngredients(getUsername()).then((r) => {
              console.log(r)
              actions.addToFridge(r.pantryIngredients)
              history.push("/ingredients/"+getUsername()+"/pantry")
          }).catch((error) => {
            //console.log("errors")
            console.log(error)
              // if (error.response && error.response.status === 401)
              //  actions.changeError("Error getting pantry ingredients")
              // else   
              //  actions.changeError("There may be a problem with the server. Please try again after a few moments.")
          })    
  },[])

var pageDisplay;
    if (pantryIngredients === []) {
         pageDisplay = <NoIngredients type="fridge"/>
    } else {
         pageDisplay = <Ingredients ingredients={pantryIngredients}/>
    }

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid container item xs={12} spacing={0}>
          <Logo />
          <Grid item xs={12} spacing={2}>
            <h1 class={appstyles.headings}>My Pantry Staples</h1>
          </Grid>
          <Grid item xs={12} spacing={2}>
            <div class={appstyles.layoutContent}>
            <Grid container spacing={1} wrap="wrap" alignItems="center" justify="center">
              <ItemHandler />
                 {pageDisplay}
               </Grid>
              </div>
          </Grid>
        </Grid> 
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pantryIngredients: state.userIngredients.pantryIngredients,
  error: state.errorsMessages
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    addToFridge: ( newIngredients ) =>
      dispatch({ type: "pantryIngredients", payload: newIngredients }),
    changeError: ( error ) =>
      dispatch({ type: "error", payload: error }),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pantry);
