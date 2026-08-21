import EvolvePokemon from "./EvolvePokemon";
export default function PokemonCard({sNo, id, name, level, type,evolution,onSetSelectedPokemon,onReleasePokemon,onEvolvePokemon,onTrainingPokemon, selectedPokemonId, onCancelEditing}){

    const myNameIs = evolution.includes(name)
        ? level >= 100
            ? evolution[evolution.length - 1]
            : level >= 50
                ? evolution[1]
                : evolution[0]
        : name;
    return (
        <div className="pokemon-card">
            <h3 className='pokemon-title'><span className='sNo'>{sNo}</span>{myNameIs}</h3>
            <div className="pokemon-stats-div">
                <div className='pokemon-stat-container'>
                    <p className='stat-name'>Level:</p>
                    <p className='pokemon-level'>{level}</p>
                </div>
                <div className='pokemon-stat-container'>
                    <p className='stat-name'>Type:</p>
                    <p className='pokemon-type'>{type.join(', ')}</p>
                </div>
            </div>
            {selectedPokemonId === id && <EvolvePokemon name={myNameIs} level={level} type={type} evolution={evolution} onEvolvePokemon={onEvolvePokemon} onCancelEditing={onCancelEditing}/>}
            <div className="btn-group">
                <button className="btn bg-orange" onClick={()=>onSetSelectedPokemon(id)}>Edit</button>
                <button className={level >= 100?"btn bg-green disabled":"btn bg-green"} onClick={()=>onTrainingPokemon(id)} disabled = {level >= 100?true:false}>{level >= 100?"Fully Trained":"Train"}</button>
                <button className="btn bg-red" onClick={()=>onReleasePokemon(id)}>Release</button>
            </div>
        </div>
        // console.log(evolutionNames)
    )
}