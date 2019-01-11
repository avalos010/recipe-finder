import React,{useContext,useState,useEffect} from 'react';
import secrets from '../secret'

import './app.css'
 
const App = () => {
    const [data, setData] = useState(null);
    const [term, setTerm] = useState('');

    useEffect(() => {
        document.title = 'Recipe Finder'
    });

    const fetchData = async() => {
        const result = await fetch(`https://api.edamam.com/search?q=${term}&app_id=${secrets.appId}&app_key=${secrets.appKey}&to=25`);
        const json = await result.json();
        setData(json)
    }

    const handleInputChange = (e) => {
        setTerm(e.target.value)
    }

    return (
        <div className="container">
            <h1 className="title">Recipe Finder</h1>
            <div className="input_container">
            <input class="term_input" value={term} onChange={handleInputChange}/>
            <button className="btn_search" onClick={fetchData}>Find Recipe!</button>
            </div>

            <div className="recipe_container">
                {data ? data.hits.map((hit, index) => {
                    return( 
                    <div key={index} className="recipe">
                    <h4 className="recipe_name">{hit.recipe.label}</h4>
                    <img className="recipe_image" src={hit.recipe.image} alt={hit.recipe.label}/>
                    <p className="recipe_diet">Diet: {hit.recipe.dietLabels[0]}</p>
                    <p className="recipe_calories">Calories {Math.round(hit.recipe.calories)} </p>
                    </div>
                    )
                }) : <p className="recipes_none">Recipes Will Appear here!</p>}
            </div>

        </div>
    )
};

export default App;