import React,{useContext,useState,useEffect} from 'react';
import secrets from '../secret'
import AOS from 'aos'

import 'aos/dist/aos.css'
import './app.css'
 
const App = () => {
    const [data, setData] = useState(null);
    const [term, setTerm] = useState('');

    useEffect(() => {
        document.title = 'Recipe-Finder'
        AOS.init()
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
            <div className="input_container">
            <h1 className="title">Recipe Finder</h1>
            <input className="term_input" value={term} onChange={handleInputChange}/>
            <a className="btn_search" href={term ? '#recipe_container' : null} onClick={fetchData}>Search</a>
            </div>

            <div className="recipe_container" id="recipe_container">
                {data ? data.hits.map((hit, index) => {
                    return( 
                    <div key={index} className="recipe" data-aos-delay="50" data-aos-duration="5000" data-aos="fade-down-left">
                    <h4 className="recipe_name"> {hit.recipe.label}</h4>
                    <img className="recipe_image" src={hit.recipe.image} alt={hit.recipe.label}/>
                    <p className="recipe_diet">Diet: {hit.recipe.dietLabels[0]}</p>
                    <p className="recipe_calories">Calories {Math.round(hit.recipe.calories)} </p>
                    <a className="recipe_link" target="_blank" href={hit.recipe.url}>Visit</a>
                    </div>
                    )
                }) : <p className="recipes_none">Recipes Will Appear here!</p>}
            </div>

        </div>
    )
};

export default App;