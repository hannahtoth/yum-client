const addRecipeToCookbook = async (recipeObject, setNewRecipe, sessionToken) => {
            
    let {label, image, source, url, ingredientLines} = recipeObject.recipe;
    let ingredientListString = ingredientLines.join(', ');
    try {
        let results = await fetch('http://localhost:3000/cookbook/create', {
                method: 'POST',
                body: JSON.stringify({
                    cookbook: {
                        recipeName : label,
                        image : image, 
                        source : source,
                        url : url,
                        ingredients : ingredientListString
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`
                })
            })
        let jsonData = await results.json()
        console.log(jsonData)
        setNewRecipe(newRecipe=>true);  
    } catch (error) {
        console.log(`Error: ${error}`)
    }
    
}

export default addRecipeToCookbook