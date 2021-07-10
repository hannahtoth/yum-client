import React from 'react';
import {useRef, useState, useEffect} from 'react';
import RecipeSearchDisplay from './RecipeSearchDisplay';
import IngredientsListDisplay from './IngredientsListDisplay';
//material-ui imports
import { TextField } from '@material-ui/core'
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';


// Application ID
// 9c141499
// Application Key
// d64c51d6958faa1ca82627551b9e8824
// Link for documentation:
// https://developer.edamam.com/edamam-docs-recipe-api

const RecipeSearchDisplayPages = ({recipeListPageCurr, recipeListPageTotal, handlePageChange}) => {
    return (
        <Pagination
            count={recipeListPageTotal}
            page={recipeListPageCurr}
            color="primary"
            onChange={handlePageChange}
            boundaryCount={1}
        />
    )
}

const RecipeSearch = () => {
    const baseUrl = `https://api.edamam.com/api/recipes/v2`;
    const appId = `9c141499`;
    const appKey = `d64c51d6958faa1ca82627551b9e8824`;

    const ingredientInput = useRef('');
    const ingredientListArray = useRef([]);
    const ingredientListString = useRef('');
    const [recipeFetchToggle, setRecipeFetchToggle] = useState(false);

    const [recipeJson, setRecipeJson] = useState(null);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeListPageCurr, setRecipeListPageCurr] = useState(null);
    const [recipeListPageTotal, setRecipeListPageTotal] = useState(null);

    const handlePageChange = (event, value) => {
        console.log(event, value);
        setRecipeListPageCurr(value);
        setRecipeFetchToggle(true);
        
    }

    useEffect(() =>{
        if (recipeFetchToggle) {
            recipeQuery()
        }
    },[recipeFetchToggle, recipeListPageCurr])


    const recipeQuery = async () => {
            let fetchUrl = `${baseUrl}?type=public&q=${ingredientListString.current}&app_id=${appId}&app_key=${appKey}`


            
            if (recipeListPageCurr !== null && recipeListPageCurr > 1) {
                console.log(recipeJson['_links']['next']['href'])
                fetchUrl = recipeJson['_links']['next']['href'] ;
            }
            try {
                
                let results = await fetch (fetchUrl);
                let jsonData = await results.json();
                let recipes = await jsonData.hits;
                setRecipeList(await recipes);
                setRecipeJson(await jsonData);
                // console.log(jsonData)
                let totalPages = jsonData.count
                setRecipeListPageTotal(Math.ceil(totalPages/10))
                setRecipeFetchToggle(false)
            } catch (err) {
                console.log(`Error: ${err}`)
            }


    }

    const addIngredientToList = () => {
        ingredientListArray.current = [...ingredientListArray.current, ingredientInput.current]
        ingredientListString.current = ingredientListArray.current.join()
        console.log(ingredientListArray.current)
        console.log(ingredientListString.current)
        setRecipeFetchToggle(true)
    }

    const removeIngredientFromList = () => {
        setRecipeFetchToggle(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addIngredientToList();
        let inputField = document.getElementById('ingredient-input');
        inputField.value = '';
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
                id="ingredient-input"
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
        <IngredientsListDisplay
            ingredientListArray={ingredientListArray}
            ingredientListString={ingredientListString}
            removeIngredientFromList={removeIngredientFromList}
            />

        {recipeList.length>0
            ?   <>
                <RecipeSearchDisplayPages
                    recipeListPageCurr={recipeListPageCurr}
                    recipeListPageTotal={recipeListPageTotal}
                    handlePageChange={handlePageChange}
                /> 
                <RecipeSearchDisplay recipeList={recipeList}/>
                </>
            :   ingredientListArray.current.length === 0
            ?   "Add an ingredient to find recipes"
            :   "No recipes found"
        }

        </>
    )
}

export default RecipeSearch