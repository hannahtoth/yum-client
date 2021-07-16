import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  CardMedia,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Link,
} from "../materialuiexports";

const RecipeIndex = (props) => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    fetch("http://localhost:3000/cookbook/getall", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((jsonData) => {
        setRecipes(jsonData);
        console.log(jsonData);
      })
      .catch((err) => console.log(err));
  };
  //Fetch recipes
  const fetchHelper = (e) => {
    e.preventDefault();
    console.log("fetch recipes started");
    fetchRecipes();
  };
  //Delete recipe
  const deleteRecipe = async (recipeId) => {
    try {
      let response = await fetch(
        `http://localhost:3000/cookbook/delete/${recipeId}`,
        {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.sessionToken}`,
          }),
        }
      );
      let jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHelper = (e) => {
    e.preventDefault();
    console.log("recipe deleted");
    console.log(e.target);
    let clickedButton = e.target.closest("button");
    let recipeToRemove = clickedButton.getAttribute("recipeid-data");
    console.log(recipeToRemove);

    deleteRecipe(recipeToRemove);
    fetchRecipes();
  };
  return (
    <Fragment>
      <h1>Cook Book</h1>
      <Button
        onClick={fetchHelper}
        variant="contained"
        size="medium"
        style={{
          backgroundColor: "#476040",
          color: "white",
          margin: 20,
        }}
      >
        Load my cookbook
      </Button>
      {recipes.map((recipe) => {
        return (
          <Fragment>
            <h1> {recipe.recipeName} </h1>
            <p>{recipe.ingredients}</p>
            <p>{recipe.notes}</p>
            <a href={recipe.url} target="blank" alt="">
              {recipe.source}
            </a>
            <img src={recipe.image} alt="" width="400px"></img>
            <Button
              onClick={deleteHelper}
              recipeid-data={recipe.id}
              variant="contained"
              color="primary"
            >
              Remove Recipe
            </Button>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default RecipeIndex;
