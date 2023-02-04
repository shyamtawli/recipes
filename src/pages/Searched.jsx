import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom';
import styled from 'styled-components';

function Searched() {

    let param = useParams();
    const [searchedRecipe, setSearchedRecipe] = useState([]);

    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=26c853e27c0c4c1ba033aae9e3e6d1da&query=${name}`)
        const recipe = await data.json();
        setSearchedRecipe(recipe.results);
    }

    useEffect(()=>{
        getSearched(param.search);
    },[param.search]);

  return (
    <Grid>
        {searchedRecipe.map((item) => {
            return(
                <Card key={item.id}>
                    <Link to={'/recipe/'+item.id}>
                        <img src={item.image} alt={item.title} />
                        <h5>{item.title}</h5>
                    </Link>
                </Card>
            )
        })}
    </Grid>
  )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    grid-gap: 1.5rem;

`

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }

    a {
        text-decoration:none;
    }

    h5 {
        text-align: center;
        padding: 1rem;
        color: black;
    }
`

export default Searched