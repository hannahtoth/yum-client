import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const RecipeSearchDisplay = ({recipeList}) => {

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

    console.log("recipe display fired")
    return (
        <>
        <h2>Recipe Display</h2>
        <Grid container spacing={3}>
            {recipeList.slice(0,8).map((recipeObject, index) => {
                console.log(recipeObject.recipe.image)
                return (
                    <Grid key={index} item xs={6} md={3} >
                    <Card>
                        <CardContent>
                            <Typography>
                            {recipeObject.recipe.label}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            className={classes.media}
                            // component="img"
                            image={recipeObject.recipe.image}
                            title={recipeObject.recipe.label}
                        />
                    </Card>
                    </Grid>
                    )
                })}
        </Grid>

        </>
    )
}

export default RecipeSearchDisplay;