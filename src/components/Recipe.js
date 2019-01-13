import React, {useContext} from 'react';
import { DataCtx } from './App';

const Recipe = () => {
    let [data] = useContext(DataCtx);
    return (
        <div className="recipe_container" id="recipe_container">
                {data.hits.map((hit, index) => {
                    return( 
                    <div key={index} className="recipe" data-aos-delay="50" data-aos-duration="5000" data-aos="fade-in">
                    <h4 className="recipe_name"> {hit.recipe.label}</h4>
                    <img className="recipe_image" src={hit.recipe.image} alt={hit.recipe.label}/>
                    <p className="recipe_diet">Diet: {hit.recipe.dietLabels[0]}</p>
                    <p className="recipe_calories">Calories {Math.round(hit.recipe.calories)} </p>
                    <a className="recipe_link" target="_blank" href={hit.recipe.url}>Visit</a>
                    </div>
                    )
                })}
            </div> 
    )
}        

export default Recipe;