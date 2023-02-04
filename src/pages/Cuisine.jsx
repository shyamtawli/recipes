import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, sync } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

function Cuisine() {

    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=26c853e27c0c4c1ba033aae9e3e6d1da&cuisine=${name}`)
        const recipe = await data.json();
        setCuisine(recipe.results);
    }

    useEffect(() => {
        getCuisine(params.type);
    },[params.type]);

  return (
    <Grid>
        {cuisine.map((item) => {
            return(
                <Card key={item.id}>
                    <img src={item.image} alt="" />
                    <h5>{item.title}</h5>
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

    h6 {
        text-align: center;
        padding: 1rem;
    }
`

export default Cuisine