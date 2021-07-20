import React from "react";
import { Button , IconButton} from "../materialuiexports";
import { NavigateBefore, NavigateNext} from '@material-ui/icons';

const RecipeSearchPageButtons = ({
  recipeListPage,
  currentFetchUrl,
  nextFetchUrl,
  previousFetchUrls,
  setRecipeFetchToggle,
}) => {
  const handleClickNext = (e) => {
    e.preventDefault();
    recipeListPage.current++;
    previousFetchUrls.current = [
      ...previousFetchUrls.current,
      currentFetchUrl.current,
    ];
    currentFetchUrl.current = nextFetchUrl.current;
    console.log(`page: ${recipeListPage.current}`);
    console.log(previousFetchUrls.current);
    setRecipeFetchToggle(true);
  };

  const handleClickPrevious = (e) => {
    e.preventDefault();
    recipeListPage.current--;
    currentFetchUrl.current =
      previousFetchUrls.current[recipeListPage.current - 1];
    previousFetchUrls.current.pop();
    console.log(previousFetchUrls.current);
    console.log(`page: ${recipeListPage.current}`);
    setRecipeFetchToggle(true);
  };

  return (
    <>
      {recipeListPage.current > 1 ? (
        <IconButton
        style={{
            color: '#b55139',
            margin: 20,
          }}
          size='small'
    
        onClick={handleClickPrevious}>
            <NavigateBefore /> 
          Previous Page
        </IconButton>
      ) : (
        <></>
      )}
      <IconButton 
      style={{
        color: '#b55139',
        margin: 20,
      }}
      size='small'
          onClick={handleClickNext}>
          
        View More Recipes
        <NavigateNext />
      </IconButton>
    </>
  );
};

export default RecipeSearchPageButtons;
