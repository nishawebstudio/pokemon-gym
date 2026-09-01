import { useState } from "react";

export default function CatchPokemon({onCatchPokemon}){
    const [name,setName] = useState("");
    const [type,setType] = useState("");
    const [level,setLevel] = useState(1);
    const [evolution,setEvolution] = useState("");
    

    function handleSubmission(event){
        event.preventDefault();
        const evolutionChain = evolution.split(',').map(eChain => eChain.trim());
        const newPokemon = {
            name,type:type.split(',').map(type => type.trim()),level, evolution:evolutionChain
        };
        onCatchPokemon(newPokemon);
        setName("");
        setLevel(1);
        setType("");
        setEvolution("");
    }

    return (
        <>
            <h2>Catch Pokémon</h2>
            <p className='reg-p'>Find a wild Pokémon, weaken it with Pikachu without knocking it out, then aim and throw your Poké Ball. Once captured, treat your new companion with kindness and respect.</p>
            <form onSubmit={handleSubmission}>
                <input value={name} type="text" onChange={(event)=>setName(event.target.value )} placeholder='Pokémon Name'/>
                <input value={level} type="number" onChange={(event)=>setLevel(event.target.value )} placeholder='Pokémon Level'/>
                <input value={type} type="text" onChange={(event)=>setType(event.target.value )} placeholder='Pokémon Type. Separated by commas (,)'/>
                <input value={evolution} type="text" onChange={(event)=>setEvolution(event.target.value )} placeholder='Pokémon Evolution. Separated by commas (,)'/>
                <input type="submit" value="Catch Pokémon" className='btn bg-blue'/>
            </form>
        </>
    )
}