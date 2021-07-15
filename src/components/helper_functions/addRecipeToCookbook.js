
        const addRecipeToCookbook = async (recipeObject, setNewRecipe) => {
            
            let {label, image, source, url, ingredientLines} = recipeObject.recipe;
            let ingredientListString = ingredientLines.join(', ').substring(0,254);
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
                            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI2MjI1MzgxLCJleHAiOjE2MjYzOTgxODF9.vQWtFnoe3nxrSHCMXePZGnD7xwRtWvZBQeynoVP4uLE`
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