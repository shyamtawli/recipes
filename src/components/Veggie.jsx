import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'

function Veggie() {
  const [veggie, setVeggie] = useState([]);

    useEffect(()=> {
        getVeggie();
    },[]);

    const getVeggie = async () => {

        const check = localStorage.getItem('veggie');

        if(check) {
            setVeggie(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=26c853e27c0c4c1ba033aae9e3e6d1da&number=9&tags=vegetarian`);
            const data = await api.json();

            localStorage.setItem('veggie', JSON.stringify(data.recipes));

            setVeggie(data.recipes);
        }
        
    }

  return (
    <div>
      <div>
        <Wrapper>
            <h3>Our Vegetarian Picks</h3>
            <Splide options={{
                perPage:3,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '2.5rem'
            }}>
                {veggie.map((recipe) => {                            
                    return (
                       <SplideSlide key={recipe.id}>
                           <Card>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt="" />
                                <Gradient />
                           </Card>                            
                       </SplideSlide>                            
                    )
                })}
            </Splide>
        </Wrapper>
    </div>
    </div>
  )
}


const Wrapper = styled.div`
    margin: 4rem 0rem;
`

const Card = styled.div`
    min-height: 12rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    
    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        height: 40%;
        font-size: 1rem;
        font-weight: 600;
        display: flex; 
        align-items: center;
        justify-content: center;
    }
`
const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`


export default Veggie