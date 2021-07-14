import React from 'react';
import {useRef, useState, useEffect} from 'react';
import RecipeSearchDisplay from './RecipeSearchDisplay';
import IngredientsListDisplay from './IngredientsListDisplay';
import RecipeSearchPageButtons from './RecipeSearchPageButtons';
//material-ui imports
import { TextField, AddCircleOutlineTwoToneIcon, Button} from '../materialuiexports';

//Edamam API Info
// Application ID
// 9c141499
// Application Key
// d64c51d6958faa1ca82627551b9e8824
// Link for documentation:
// https://developer.edamam.com/edamam-docs-recipe-api



const RecipeSearch = ({newRecipe, setNewRecipe, sessionToken} ) => {
    const baseUrl = `https://api.edamam.com/api/recipes/v2`;
    const appId = `9c141499`;
    const appKey = `d64c51d6958faa1ca82627551b9e8824`;
    const fields = `&field=label&field=image&field=source&field=url&field=ingredientLines&field=ingredients&field=cuisineType`
    const currentFetchUrl = useRef('');
    const nextFetchUrl = useRef('');
    const previousFetchUrls = useRef([]);
    const recipeListPage = useRef(0);

    const ingredientInput = useRef('');
    const ingredientListArray = useRef([]);
    const ingredientListString = useRef('');
    const [recipeFetchToggle, setRecipeFetchToggle] = useState(false);
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() =>{
        if (recipeFetchToggle) {
            recipeQuery()
        }
    },[recipeFetchToggle])


    const recipeQuery = async () => {
            try {
                
                let results = await fetch (currentFetchUrl.current);
                let jsonData = await results.json(); 
                let recipes = await jsonData.hits;
                setRecipeList(await recipes);
                console.log(jsonData)
                
                nextFetchUrl.current = await jsonData['_links']['next']['href']

                setRecipeFetchToggle(false)
            } catch (err) {
                console.log(`Error: ${err}`)
            }
    }

    const addIngredientToList = () => {
        ingredientListArray.current = [...ingredientListArray.current, ingredientInput.current];
        ingredientListString.current = ingredientListArray.current.join();
        currentFetchUrl.current = `${baseUrl}?type=public&q=${ingredientListString.current}&app_id=${appId}&app_key=${appKey}${fields}`;
        recipeListPage.current = 1;
        console.log(`page: ${recipeListPage.current}`)
        setRecipeFetchToggle(true);
    }

    const removeIngredientFromList = () => {
        currentFetchUrl.current = `${baseUrl}?type=public&q=${ingredientListString.current}&app_id=${appId}&app_key=${appKey}${fields}`;
        setRecipeFetchToggle(true)
    }

    const handleSubmitAddIngredient = (e) => {
        e.preventDefault();
        addIngredientToList();
        let inputField = document.getElementById('ingredient-input');
        inputField.value = '';
    }

    const handleIngredientInput = (e) => {
        ingredientInput.current = e.target.value;
    }

    return (
        <>

        <h2>Search By Ingredient</h2>
        <form onSubmit={handleSubmitAddIngredient}>

            <TextField
                id="ingredient-input"
                label="Add an Ingredient"
                variant="outlined" 
                onChange={handleIngredientInput}
            />
            <br/>
            <Button
                type="submit"
                variant="contained"
                size="medium"
                style={{
                    backgroundColor:"#476040",
                    color: "white",
                    margin: 20,
                }}
                // className={classes.button}
                startIcon={<AddCircleOutlineTwoToneIcon />}
            > Add Ingredient
            </Button>
        </form>
        <IngredientsListDisplay
            ingredientListArray={ingredientListArray}
            ingredientListString={ingredientListString}
            removeIngredientFromList={removeIngredientFromList}
            />

        {recipeList.length>0
            ?   <>
                <div>
                    <RecipeSearchPageButtons
                        recipeListPage={recipeListPage}
                        currentFetchUrl={currentFetchUrl}
                        nextFetchUrl={nextFetchUrl}
                        previousFetchUrls={previousFetchUrls}
                        setRecipeFetchToggle={setRecipeFetchToggle}
                    /> 
                </div>
                <div>
                    <RecipeSearchDisplay
                        recipeList={recipeList}
                        newRecipe={newRecipe}
                        setNewRecipe={setNewRecipe}
                        recipeListPage={recipeListPage}
                        sessionToken={sessionToken}
                    />
                </div>
                </>
            :   ingredientListArray.current.length === 0
            ?   "Add an ingredient to find recipes"
            :   "No recipes found"
        }

        </>
    )
}

export default RecipeSearch