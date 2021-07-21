import React, { useState, useEffect, Fragment, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CardMedia,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Link,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ExpandMoreIcon,
} from '../materialuiexports';
import { flexbox } from '@material-ui/system';

const RecipeIndex = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(false);

  const fetchRecipes = () => {
    fetch('http://localhost:3000/cookbook/getall', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((jsonData) => {
        jsonData.sort((a, b) => {
          return a.id - b.id;
        });
        setRecipes(jsonData);
        console.log(jsonData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRecipes();
  }, [renderTrigger, props.newRecipe]);

  //Fetch recipes
  const fetchHelper = (e) => {
    e.preventDefault();
    console.log('fetch recipes started');
    setRenderTrigger((renderTrigger) => !renderTrigger);
  };

  //Delete recipe
  const deleteRecipe = async (recipeId) => {
    try {
      let response = await fetch(
        `http://localhost:3000/cookbook/delete/${recipeId}`,
        {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.sessionToken}`,
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
    console.log('recipe deleted');
    console.log(e.target);
    let clickedButton = e.target.closest('button');
    let recipeToRemove = clickedButton.getAttribute('recipeid-data');
    console.log(recipeToRemove);

    deleteRecipe(recipeToRemove);
    fetchRecipes();
  };

  //Save Notes
  const saveNotes = async (recipeId, updatedNotes) => {
    try {
      let response = await fetch(
        `http://localhost:3000/cookbook/update/${recipeId}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            cookbook: {
              notes: updatedNotes,
            },
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.sessionToken}`,
          }),
        }
      );
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const handleSaveNotes = async (e) => {
    e.preventDefault();
    let recipeId = e.target[2].getAttribute('recipeid-data');
    let updatedNotes = e.target[0].value;
    await saveNotes(recipeId, updatedNotes);
    fetchRecipes();

    e.target[2].innerText = 'Notes saved!';
  };

  const handleEditNotes = (e) => {
    let parentNode  = e.target.closest("form");
    let button = parentNode.querySelector("#save-button");
    button.innerText = "SAVE NOTES";
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      height: "100%"
    },
    media: {
      height: '100%',
      paddingTop: '56.25%',
    },
    notes: {
      margin: '15px 0px 1px 0px',
      '& .MuiTextField-root': {
        width: '100%',
      },
    },

    accHeading: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    cardCustom:{
      alignSelf:"stretch"
    }

  }));

  const classes = useStyles();

  return (
    <Container maxWidth="lg" style={{marginBottom:"70px"}}>
      <h1>Cook Book</h1>
      <p>Search for ingredients and add recipes above!</p>
      <Grid container spacing={3}>
        {recipes.map((recipe) => {
          return (
            <Grid item key={`cb-${recipe.id}`} xs={12} sm={6} md={4} xl={3}>
              <Card className={classes.cardCustom}>
                <CardContent>
                  <Typography>{recipe.recipeName}</Typography>
                </CardContent>
                <CardMedia
                  className={classes.media}
                  image={recipe.image}
                  title={recipe.recipeName}
                />
                <CardContent>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.accHeading}>
                        View Ingredients
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{recipe.ingredients}</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <br />
                  <a href={recipe.url} target="blank" alt="">
                    View Full Recipe at {recipe.source}
                  </a>

                  <form
                    onSubmit={handleSaveNotes}
                    className={classes.notes}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      onChange={handleEditNotes}
                      id="outlined-multiline-static"
                      label="Notes"
                      multiline
                      rows={4}
                      placeholder="Enter Your Notes"
                      defaultValue={recipe.notes}
                      variant="outlined"
                    />

                    <Button
                      style={{margin:"8px"}}
                      id="save-button"
                      type="submit"
                      recipeid-data={recipe.id}
                      variant="outlined"
                      color="primary"
                    >
                      Save Notes
                    </Button>
                  </form>
                </CardContent>

                <Button
                  style={{marginBottom: "5px"}}
                  onClick={deleteHelper}
                  recipeid-data={recipe.id}
                  variant="contained"
                  color="primary"
                >
                  Remove Recipe
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default RecipeIndex;
