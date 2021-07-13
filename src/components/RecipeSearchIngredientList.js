import React from 'react';

//material-ui imports
import { Chip } from '../materialuiexports';

const RecipeSearchIngredientList = ({ingredientListArray, ingredientListString, removeIngredientFromList}) => {

    const handleDelete = (e) => {
        console.log("you clicked delete")
        //Get ingredient to remove
        let clickAncestor = e.target.closest('.MuiChip-root');
        let ingredientToRemove = clickAncestor.getAttribute('ingredient') ;

        //Update ingredient lists
        ingredientListArray.current = ingredientListArray.current.filter((ingredient) => {
            return ingredient !== ingredientToRemove
        })
        ingredientListString.current = ingredientListArray.current.join();

        //Refetch and re-render
        removeIngredientFromList()

        console.log(ingredientListArray.current)
    }
    return (
        ingredientListArray.current.map((ingredient, index) => {
            return (
                <Chip
                    key={index}
                    ingredient={ingredient}
                    label={ingredient}
                    onDelete={handleDelete}
                    color="primary"
                    variant="outlined"
                />
            )
        })

    )
}

export default RecipeSearchIngredientList