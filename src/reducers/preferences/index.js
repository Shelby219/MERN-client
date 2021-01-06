import { createAction, createReducer } from "@reduxjs/toolkit";

const updatePreferences = createAction("updatePreferences");

const initialState = { vegetarian: true,
                       vegan: false,
                       glutenFree: false,
                       dairyFree: false,
                       veryHealthy: false,
                       cheap: false,
                       veryPopular: false,
                       sustainable: false};


//update initial state (null here) to new state, data collected from component.
const userPreferences = createReducer(initialState, (builder) => {
  builder.addCase(updatePreferences, (state, action) => {
    state.preferences = action.payload;
    console.log("updated pref")
    console.log(action.payload)
  });
});

export default userPreferences;
