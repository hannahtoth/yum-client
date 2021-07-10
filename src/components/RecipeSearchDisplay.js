import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';



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