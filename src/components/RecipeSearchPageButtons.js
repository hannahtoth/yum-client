import React from 'react';
import { Button } from '../materialuiexports';

const RecipeSearchPageButtons = ({
    recipeListPage, 
    currentFetchUrl,
    nextFetchUrl,
    previousFetchUrls,
    setRecipeFetchToggle
    }) => {

        const handleClickNext = (e) => {
            e.preventDefault()
            previousFetchUrls.current = [...previousFetchUrls.current, currentFetchUrl.current];
            currentFetchUrl.current = nextFetchUrl.current;
            recipeListPage.current++;
            console.log(`page: ${recipeListPage.current}`)
            setRecipeFetchToggle(true)
        }

        const handleClickPrevious = (e) => {
            e.preventDefault()

            currentFetchUrl.current = previousFetchUrls.current[recipeListPage.current-2];
            previousFetchUrls.current = previousFetchUrls.current.filter((element, index) => index < previousFetchUrls.current.length - 1);
            recipeListPage.current--;
            console.log(`page: ${recipeListPage.current}`)
            setRecipeFetchToggle(true)

        }

    return (
        <>
        {recipeListPage.current > 1 ? 
            <Button variant="outlined" onClick={handleClickPrevious}>Previous Page</Button> 
            : <></>
        }
        <Button variant="outlined" onClick={handleClickNext}>View More Recipes</Button>
        </>
    )
}

export default RecipeSearchPageButtons;