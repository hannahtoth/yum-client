import React, {useState,useEffect} from 'react';
import RecipeSearch from './RecipeSearch';

const AppLoggedIn = () => {
    //Trying to figure out how to set this data and pass to other components
    const [userRecipeList, setUserRecipeList] = useState('');

    return(
        <RecipeSearch />

    )
}

export default AppLoggedIn