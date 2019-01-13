import React,{createContext,useState,useEffect} from 'react';
import secrets from '../secret'
import Recipe from './Recipe';
import AOS from 'aos'

import 'aos/dist/aos.css'
import './app.css'

export const DataCtx = createContext(null);
 
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
            <DataCtx.Provider value={[data,setData]}>
            {data ? <Recipe /> : <p className="recipes_none">Recipes Will Appear here!</p>}
            </DataCtx.Provider>
        </div>
    )
};

export default App;