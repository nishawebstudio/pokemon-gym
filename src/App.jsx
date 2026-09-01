import './App.css';
import pokemonData from './data/pokemonData';
import {useState , useEffect} from 'react';

import PokemonCard from './components/PokemonCard';
import CatchPokemon from './components/CatchPokemon';
import FilterPokemon from './components/FilterPokemon';
import Navbar from './components/Navbar';

export default function App(){

    const [pokedex, setPokedex] = useState([]);
    const [appSearchTerm, setAppSearchTerm] = useState("");
    const [appSortOption,setAppSortOption] = useState("asc-name");
    const [selectedPokemonId,setSelectedPokemonId] = useState(null);
    const [scrollSpy,setScrollSPy] = useState("catch");

    const pokemonRoster = pokedex.length;
    const pokemonTrained = pokedex.filter(pokemon => pokemon.level === 100).length;
    const pokemonUntrained = pokedex.filter(pokemon => pokemon.level < 100).length;
    
    const getPokemon = async () => {
        const response = await fetch('http://localhost:5000/api/pokemon');
        const data = await response.json();
        setPokedex(data);
    }

    useEffect(() => {
        getPokemon();
    },[]);

    useEffect(() => {
        if(selectedPokemonId != null){
            const currentPokemonEditing = pokedex.find(pokemon => pokemon._id === selectedPokemonId)
            document.title = `Editing Pokémon ${currentPokemonEditing.name}`;
        }
        return (()=>document.title = `Ash's Pokémon Gym`);
    },[selectedPokemonId]);
    
    // function getId(entries) {
    //     const intersectingEntries = entries.filter(entry => entry.isIntersecting).toSorted((a,b)=>a.boundingClientRect.top - b.boundingClientRect.top)
    //     if(intersectingEntries.length > 0){
    //         const activeSection = intersectingEntries[0].target.id;
    //         setScrollSPy(activeSection);
    //     }
    // }
    // useEffect(()=>{
    //     const observer = new IntersectionObserver(getId, {
    //         threshold: 0.5
    //     });
    //     observer.observe(document.querySelector('#catch'));
    //     observer.observe(document.querySelector('#filter'));
    //     observer.observe(document.querySelector('#roster'));

    //     return () => observer.disconnect();
    // },[]);

    const catchPokemon = async (newPokemon) => {
        console.log('Catching Pokémon');
        await fetch('http://localhost:5000/api/pokemon', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newPokemon)
        });
        getPokemon();
    }

    function setSelectedPokemon(currentPokemonId){
        setSelectedPokemonId(currentPokemonId);
    }

    const releasePokemon = async (releasingPokemonId) => {
        await fetch(`http://localhost:5000/api/pokemon/${releasingPokemonId}`, {
            method: 'DELETE'
        })
        getPokemon();
    }

    const evolvePokemon = async (updatedPokemon) => {

        await fetch(`http://localhost:5000/api/pokemon/${selectedPokemonId}`, {
            method: 'PUT',
            headers: {
               'Content-Type':'application/json'
            },
            body: JSON.stringify(updatedPokemon) 
        });
        setSelectedPokemonId(null);
        getPokemon();
    }

    const trainPokemon = async (trainedPokemonId) => {
        await fetch(`http://localhost:5000/api/pokemon/train/${trainedPokemonId}`, {
            method:'PUT'
        });
        getPokemon();
    }

    function cancelEditing(){
        setSelectedPokemon(null);
    }


    function filterPokemon(searchTerm,sortOption){
         console.log(`Search Term ${searchTerm} and Sort Option ${sortOption}`);
         setAppSearchTerm(searchTerm.toLowerCase());
         setAppSortOption(sortOption);
    }

    const filteredData = pokedex.filter(pokemon => pokemon.name.toLowerCase().includes(appSearchTerm)).toSorted((a,b)=>{
            if(appSortOption === 'asc-level'){
                return a.level - b.level;
            }else if(appSortOption === 'desc-level'){
                return b.level - a.level;
            }else if(appSortOption === 'asc-name'){
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            }else{
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            }
        });

    return (
        <>
            <Navbar/>
            <header className='header'>
                <div className="pokemon-gym">
                    <h1>Ash's Pokémon GYM</h1>
                    <div className="stats-div">
                        <div className="stats-container">
                            <h4 className="stat-title">
                                Pokémon Captured
                            </h4>
                            <p className="stat-count bg-yellow">
                                {pokemonRoster}   
                            </p>
                        </div>
                        <div className="stats-container">
                            <h4 className="stat-title">
                                Trained Pokémon
                            </h4>
                            <p className="stat-count bg-blue">
                                {pokemonTrained}   
                            </p>
                        </div>
                        <div className="stats-container">
                            <h4 className="stat-title">
                                Untrained Pokémon
                            </h4>
                            <p className="stat-count bg-cyan">
                                {pokemonUntrained}   
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            <section className="pokemon-gym">
                <div className="flex-container">
                    <div id="catch">
                        <CatchPokemon onCatchPokemon={catchPokemon}/>      
                    </div>    
                    <div id="filter">
                        <FilterPokemon onFilteringPokemon = {filterPokemon}/> 
                    </div>    
                </div>
            </section>
            <section id="roster">
                <div className="pokemon-gym">
                    <h2>Pokémon Roster</h2>
                    <p className="reg-p">Your active Pokémon Roster holds up to six Pokémon and forms the core of your battle strategy. Choose a balanced mix of types, while extra Pokémon are safely stored at the lab until you swap them into your roster.</p>
                    <div className="pokemon-roster">
                        {
                            filteredData.map(
                                (pokemon, index) =>
                                    <PokemonCard onCancelEditing={cancelEditing} onSetSelectedPokemon={setSelectedPokemon} onReleasePokemon={releasePokemon} onEvolvePokemon={evolvePokemon} onTrainingPokemon={trainPokemon} key={pokemon._id} sNo={index + 1} {...pokemon} selectedPokemonId={selectedPokemonId} />
                            )
                        }
                    </div>
                </div>
            </section>

        </>
    );
}