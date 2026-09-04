import { useState } from "react";

export default function EvolvePokemon({name, level, type, evolution, region, onEvolvePokemon, onCancelEditing}){
    const [evolvedName,setEvolvedName] = useState(name);
    const [evolvedType,setEvolvedType] = useState(type.join(','));
    const [evolvedLevel,setEvolvedLevel] = useState(level);
    const [evolvedEvolution,setEvolvedEvolution] = useState(evolution.join(','));
    const [evolvedRegion,setEvolvedRegion] = useState(region);

    function handleSubmission(event){
        event.preventDefault();
        const evolvedPokemon = {
            name:evolvedName,type:evolvedType.split(',').map(type => type.trim()),level:Number(evolvedLevel),evolution:evolvedEvolution.split(',').map(evolved => evolved.trim()),region:evolvedRegion
        };
        console.log(evolvedPokemon);
        onEvolvePokemon(evolvedPokemon);
    }

    return (
        <form onSubmit={handleSubmission}>
            <input value={evolvedName} type="text" onChange={(event)=>setEvolvedName(event.target.value )} placeholder='Pokémon Name'/>
            <input value={evolvedLevel} type="number" onChange={(event)=>setEvolvedLevel(event.target.value )} placeholder='Pokémon Level'/>
            <input value={evolvedType} type="text" onChange={(event)=>setEvolvedType(event.target.value )} placeholder='Pokémon Type. Separated by commas (,)'/>
            <input value={evolvedEvolution} type="text" onChange={(event)=>setEvolvedEvolution(event.target.value )} placeholder='Pokémon Type. Separated by commas (,)'/>
            <select value={evolvedRegion} onChange={(event)=>setEvolvedRegion(event.target.value)}>
                <option value="-1">Select Region</option>
                <option value="Kanto">Kanto</option>
                <option value="Orange Islands">Orange Islands</option>
                <option value="Johto">Johto</option>
                <option value="Hoenn">Hoenn</option>
                <option value="Sinnoh">Sinnoh</option>
                <option value="Unova">Unova</option>
                <option value="Kalos">Kalos</option>
                <option value="Alola">Alola</option>
                <option value="Galar">Galar</option>
            </select>
            <div className="btn-group">
                <input type="submit" value="Evolve Pokémon" className='btn bg-blue'/>
                <input type="button" value="Cancel" className="btn bg-red" onClick={()=> onCancelEditing()}/>    
            </div>
        </form>
    )
}