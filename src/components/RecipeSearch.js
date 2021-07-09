import React from 'react';
import {useRef, useState} from 'react';
import RecipeSearchDisplay from './RecipeSearchDisplay';
//material-ui imports
import { CardMedia, TextField } from '@material-ui/core'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import Button from '@material-ui/core/Button';

// Application ID
// 9c141499
// Application Key
// d64c51d6958faa1ca82627551b9e8824
// Link for documentation:
// https://developer.edamam.com/edamam-docs-recipe-api



const RecipeSearch = () => {
    const baseUrl = `https://api.edamam.com/api/recipes/v2`;
    const appId = `9c141499`;
    const appKey = `d64c51d6958faa1ca82627551b9e8824`;

    const ingredientInput = useRef('');
    const ingredientListArray = useRef([]);
    const ingredientListString = useRef('');

    const [recipeList, setRecipeList] = useState([]);

    const recipeQuery = async () => {
        addIngredientToList()
        let results = await fetch (`${baseUrl}?type=public&q=${ingredientListString.current}&app_id=${appId}&app_key=${appKey}`);
        let jsonData = await results.json();
        let recipes = await jsonData.hits;
        setRecipeList(await recipes)
        console.log(jsonData)
    }

    const addIngredientToList = () => {
        ingredientListArray.current = [...ingredientListArray.current, ingredientInput.current]
        ingredientListString.current = ingredientListArray.current.join()
        console.log(ingredientListArray.current)
        console.log(ingredientListString.current)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        recipeQuery()
        console.log('submitted');
    }

    const handleIngredientInput = (e) => {
        ingredientInput.current = e.target.value;
    }

    return (
        <>
        <h2>TESTING</h2>
        <form onSubmit={handleSubmit}>
            <TextField
                id="outlined-basic"
                label="Add an Ingredient"
                variant="outlined" 
                onChange={handleIngredientInput}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                // className={classes.button}
                startIcon={<AddCircleOutlineTwoToneIcon />}
            > Add Ingredient
            </Button>
        </form>
        {recipeList.length>0
        ? <RecipeSearchDisplay recipeList={recipeList}/>
        : ingredientListArray.current.length === 0
        ? "Add an ingredient to find recipes"
        : "No recipes found"
        }

        </>
    )
}

export default RecipeSearch