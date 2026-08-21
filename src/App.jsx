import './App.css';
import pokemonData from './data/pokemonData';
import {useState , useEffect} from 'react';

import PokemonCard from './components/PokemonCard';
import CatchPokemon from './components/CatchPokemon';
import FilterPokemon from './components/FilterPokemon';
import Navbar from './components/Navbar';

export default function App(){
    const [pokedex,setPokedex] = useState(()=>{
        return JSON.parse(localStorage.getItem('pokedex')) || pokemonData;
    });
    // let [filteredData,setFilteredData] = useState([...pokedex]);
    const [appSearchTerm,setAppSearchTerm] = useState("");
    const [appSortOption,setAppSortOption] = useState("asc-name");
    const [selectedPokemonId,setSelectedPokemonId] = useState(null);
    const [scrollSpy,setScrollSPy] = useState("catch");

    const pokemonRoster = pokedex.length;
    const pokemonTrained = pokedex.filter(pokemon => pokemon.level === 100).length;
    const pokemonUntrained = pokedex.filter(pokemon => pokemon.level < 100).length;
    useEffect(() => 
        {
            localStorage.setItem('pokedex',JSON.stringify(pokedex));
            console.log(`Effect ran`);
        },[pokedex]
    );
    useEffect(() => {
        if(selectedPokemonId != null){
            const currentPokemonEditing = pokedex.find(pokemon => pokemon.id === selectedPokemonId)
            document.title = `Editing Pokémon ${currentPokemonEditing.name}`;
        }
        return (()=>document.title = `Ash's Pokémon Gym`);
    },[selectedPokemonId]);
    
    function getId(entries) {
        // console.log(entries);
        const intersectingEntries = entries.filter(entry => entry.isIntersecting).toSorted((a,b)=>a.boundingClientRect.top - b.boundingClientRect.top)
        if(intersectingEntries.length > 0){
            const activeSection = intersectingEntries[0].target.id;
            console.log(activeSection);
            setScrollSPy(activeSection);
        }
    }
    useEffect(()=>{
        const observer = new IntersectionObserver(getId, {
            threshold: 0.5
        });
        observer.observe(document.querySelector('#catch'));
        observer.observe(document.querySelector('#filter'));
        observer.observe(document.querySelector('#roster'));

        return () => observer.disconnect();
    },[]);

    function catchPokemon(newPokemon){
        console.log('Catching Pokémon');
        const newId = Math.max(...pokedex.map(pokemon => pokemon.id)) + 1;
        setPokedex(currentData => {
            return([...currentData,{id:newId,...newPokemon}])
        });
    }

    function setSelectedPokemon(currentPokemonId){
        setSelectedPokemonId(currentPokemonId);
    }

    function releasePokemon(releasingPokemonId){
        setPokedex(currentData => currentData.filter(pokemon => pokemon.id !== releasingPokemonId));
    }

    function evolvePokemon(updatedPokemon){
        setPokedex(currentData => currentData.map(pokemon => {
            if(pokemon.id === selectedPokemonId){
                return({
                    id:pokemon.id,
                    ...updatedPokemon
                })
            }else{
                return pokemon;
            }
        }));
        setSelectedPokemonId(null);
    }

    function trainPokemon(trainedPokemonId){
        setPokedex(currentData => currentData.map(pokemon => {
            if(pokemon.id === trainedPokemonId){
                return({
                    ...pokemon,
                    level: pokemon.level + 33 >= 100? 100: pokemon.level + 33
                })
            }else{
                return pokemon;
            }
        }))
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
            <Navbar activeSection={scrollSpy}/>
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

            <section id="catch">
                <div className="pokemon-gym">
                    <CatchPokemon onCatchPokemon={catchPokemon}/>      
                </div>    
            </section>
            <section id="filter">
                <div className="pokemon-gym">
                    <FilterPokemon onFilteringPokemon = {filterPokemon}/> 
                </div>    
            </section>
            <section id="roster">
                <div className="pokemon-gym">
                    <h2>Pokémon Roster</h2>
                    <p className="reg-p">Listen, Ash, a Trainer is only as ready as their Pokémon Roster. Your roster is the active team of up to six Pokémon that you carry with you on your belt at all times. These are the only partners you can call upon instantly for a surprise rival challenge or a formal Gym battle, making your roster the core strategy of your entire journey.</p>
                    <p className="reg-p">Managing this roster requires careful balance and tough choices, Ash. You must select a diverse mix of types, like pairing Pikachu’s electricity with a Water-type and a Flying-type, so you are never left helpless against a type disadvantage. Any extra Pokémon you catch beyond your active six are automatically transferred to my lab's storage system, waiting safely until you visit a Pokémon Center to swap them into your roster.</p>
                    <div className="pokemon-roster">
                        {
                            filteredData.map((pokemon,index)=> <PokemonCard onCancelEditing = {cancelEditing} onSetSelectedPokemon={setSelectedPokemon} onReleasePokemon={releasePokemon} onEvolvePokemon={evolvePokemon} onTrainingPokemon={trainPokemon} key={pokemon.id} sNo={index+1} {...pokemon} selectedPokemonId={selectedPokemonId}/>)
                        }
                    </div>
                </div>
            </section>

        </>
    );
}