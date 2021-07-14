import React, { useState, useEffect, Fragment } from 'react';

const RecipeIndex = (props) => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    fetch('http://localhost:3000/cookbook/getall', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI2MTI2NjE5LCJleHAiOjE2MjYyOTk0MTl9.AQzFq8VPjueCJHEvC0xFp8hN48QggXcs0aRZ2tcGSOs`,
      }),
    })
      .then((res) => res.json())
      .then((jsonData) => {
        setRecipes(jsonData);
        console.log(jsonData);
      })
      .catch((err) => console.log(err));
  };

  const fetchHelper = (e) => {
    e.preventDefault();
    console.log('fetch recipes started');
    fetchRecipes();
  };
  return (
    <Fragment>
      <h1>Testing</h1>
      <button onClick={fetchHelper}>fetchTest</button>
      {recipes.map((recipe) => {
        return (
          <Fragment>
            <h1> {recipe.recipeName} </h1>
            <p>{recipe.ingredients}</p>
            <p>{recipe.notes}</p>
            <a href={recipe.url} target="blank" alt="">
              {recipe.source}
            </a>
            <img src={recipe.image} alt="" width="400px"></img>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default RecipeIndex;
