import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function Search() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandle = (e) => {
        e.preventDefault();
        navigate("/searched/"+input);
    }


  return (
    <FormStyle onSubmit={submitHandle}>
        <div>
            <FaSearch />
            <input onChange={(e) => setInput(e.target.value)} type="text" value={input}/>
        </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
    margin: 0rem 10rem;
    div {
        width: 100%;
        position: relative;

    }

    input {
        color: white;
        border: none;
        width: 100%;
        background: linear-gradient(35deg, #494949, #313131);
        border-radius: 0.5rem;
        font-size: 1rem;
        padding: 0.5rem 2rem;
        outline: none;
    }

    svg {
        color: wheat;
        position:absolute;
        top: 25%;
        left: 2%;
        color: white;
    }
`

export default Search