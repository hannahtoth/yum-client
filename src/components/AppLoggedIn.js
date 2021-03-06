import React, { useState, useEffect } from "react";
import RecipeSearch from "./RecipeSearch";
import RecipeIndex from "./RecipeIndex";

const AppLoggedIn = (props) => {
  const [newRecipe, setNewRecipe] = useState(false);

  useEffect(() => {
    if (newRecipe) {
      //console.log(`Add New Recipe Triggered`);
      //Do the things if new recipe is set to true on state change.
    }
    setNewRecipe(false);
  }, [newRecipe]);

  return (
    <>
      <RecipeSearch
        newRecipe={newRecipe}
        setNewRecipe={setNewRecipe}
        sessionToken={props.sessionToken}
      />

      <RecipeIndex newRecipe={newRecipe} sessionToken={props.sessionToken} />
    </>
  );
};

export default AppLoggedIn;
