import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardMedia, Card, CardContent, Typography, Grid, Container, Link } from '../materialuiexports';



const RecipeSearchDisplay = ({recipeList, newRecipe, setNewRecipe}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345
        },
        media: {
            height: "100%",
            paddingTop: '56.25%'
        }
    }))
    
    const classes = useStyles();

    const handleAddNewRecipe = (e) => {
        // console.log('new recipe button clicked');
        setNewRecipe(newRecipe=>true);
        // console.log(e.target.closest('.MuiCard-root'));
    }

    // console.log("recipe display fired")
    return (
        <Container maxWidth="lg">
            <h2>Recipe Display</h2>
            <Grid container spacing={3}>
                {recipeList.slice(0,10).map((recipeObject, index) => {
                    return (
                        <Grid key={index} item xs={6} md={4} xl={3} >
                        <Card>
                            <CardContent>
                                <Typography>
                                {recipeObject.recipe.label}
                                </Typography>
                            </CardContent>
                            <CardMedia
                                className={classes.media}
                                image={recipeObject.recipe.image}
                                title={recipeObject.recipe.label}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Link
                                        href={recipeObject.recipe.url}
                                        target='blank'
                                        > Go to Recipe from {recipeObject.recipe.source}
                                    </Link>
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"  
                                    onClick={handleAddNewRecipe}
                                > Add To Cookbook
                                </Button>
                            </CardContent>
                        </Card>
                        </Grid>
                        )
                    })}
            </Grid>
        </Container>

    )
}

export default RecipeSearchDisplay;