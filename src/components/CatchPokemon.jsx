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
            <p className='reg-p'>If you want to become a Pokémon Master, you cannot just throw Poké Balls blindly like you did with that Spearow. First, you must find a wild Pokémon in the tall grass or forests and use your partner, Pikachu, to weaken it in battle. Use precise attacks to tire the wild Pokémon out, but be careful not to let it faint, or the opportunity is lost.</p>
            <p className='reg-p'>Once your target is weak and low on energy, take steady aim and toss your Poké Ball directly at it. Watch the ball closely as it wiggles on the ground, and wait patiently for the center light to click and seal the capture.</p>
            <p className='reg-p'>Most importantly, a true Trainer focuses on friendship rather than just force. The moment your new companion emerges from the ball, show it immediate respect and kindness to begin building a lifelong bond.</p>
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