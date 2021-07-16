import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import addRecipeToCookbook from "./helper_functions/addRecipeToCookbook";

const RecipeSearchDisplay = ({
  recipeList,
  newRecipe,
  setNewRecipe,
  recipeListPage,
  sessionToken,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },

    media: {
      height: "100%",
      paddingTop: "56.25%",
    },
  }));

  const classes = useStyles();

  const handleAddNewRecipe = (e) => {
    //Extract the recipe object from the clicked card
    let clickedCard = e.target.closest(".MuiCard-root");
    let recipeName = clickedCard.getAttribute("data-recipe-name");
    let recipeObject = recipeList.find(
      (object) => object.recipe.label === recipeName
    );

    console.log(recipeObject);

    addRecipeToCookbook(recipeObject, setNewRecipe, sessionToken);

    e.target.innerText = "ADDED TO COOKBOOK!";
  };

  return (
    <Container maxWidth="lg">
      <h2>Recipe Display</h2>
      <Grid container spacing={3}>
        {recipeList.slice(0, 9).map((recipeObject, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} xl={3}>
              <Card
                style={{
                  color: "#476040",
                }}
              >
                <Card data-recipe-name={recipeObject.recipe.label}>
                  <CardContent>
                    <Typography>{recipeObject.recipe.label}</Typography>
                  </CardContent>
                  <CardMedia
                    className={classes.media}
                    image={recipeObject.recipe.image}
                    title={recipeObject.recipe.label}
                  />
                  <CardContent>
                    <Typography variant="body2" component="p">
                      <Link
                        style={{
                          color: "#b55139",
                        }}
                        href={recipeObject.recipe.url}
                        target="blank"
                      >
                        {" "}
                        Go to Recipe from {recipeObject.recipe.source}
                      </Link>
                    </Typography>
                    <Button
                      style={{
                        background: "#ed8733",
                        color: "white",
                      }}
                      size="small"
                      onClick={handleAddNewRecipe}
                    >
                      {" "}
                      Add To Cookbook
                    </Button>
                  </CardContent>
                </Card>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default RecipeSearchDisplay;
