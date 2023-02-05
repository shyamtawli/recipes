import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

function Recipe() {

    const params = useParams();

    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=26c853e27c0c4c1ba033aae9e3e6d1da`)
        const detailData = await data.json();

        setDetails(detailData);

    };

    useEffect(() => {
        fetchDetails();
    }, [params.id]);

  return (
    <DetailWrapper>
        <div className='title-img'>
            <h3>{details.title}</h3>
            <img src={details.image} alt="" />
        </div>
        <Info>
            <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
            <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
            
            {activeTab === 'instructions' && (
                <div className='info-section'>
                    <h5 dangerouslySetInnerHTML={{__html: details.summary}}></h5>
                    <h5 dangerouslySetInnerHTML={{__html: details.instructions}}></h5>
                </div>
            )}

            {activeTab === 'ingredients' && (
                <ul>
                    {details.extendedIngredients.map((ingredient) => 
                        <h5><li key={ingredient.id}>{ingredient.original}</li></h5>
                    )}
                </ul>
            )}
        </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
    display: flex;
    margin-top: 2.5rem;
    margin-bottom: 3rem;

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    .title-img {
        width: 45%;
    }

    img {
        width: 85%;
    }

    h3, h5 {
        margin-bottom: 1rem;
    }


`
const Info = styled.div`
    width: 50%;
`

const Button = styled.button`
    border: 2px solid black;
    background: white;
    color: #313131;
    margin-right: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem; 
    font-weight: 600;
`

export default Recipe