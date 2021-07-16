import React from "react";
import { Button } from "../materialuiexports";

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
        <Button variant="outlined" onClick={handleClickPrevious}>
          Previous Page
        </Button>
      ) : (
        <></>
      )}
      <Button variant="outlined" onClick={handleClickNext}>
        View More Recipes
      </Button>
    </>
  );
};

export default RecipeSearchPageButtons;
