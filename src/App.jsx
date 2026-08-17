import './App.css';

export default function App(){
    return (
        <>
            <div className='header'>
                <h1>Ash's Pokémon GYM</h1>
                <div className="stats-div">
                    <div className="stats-container">
                        <h4 className="stat-title">
                            Pokémon Captured
                        </h4>
                        <p className="stat-count bg-yellow">
                            1   
                        </p>
                    </div>
                    <div className="stats-container">
                        <h4 className="stat-title">
                            Trained Pokémon
                        </h4>
                        <p className="stat-count bg-blue">
                            0   
                        </p>
                    </div>
                    <div className="stats-container">
                        <h4 className="stat-title">
                            Untrained Pokémon
                        </h4>
                        <p className="stat-count bg-cyan">
                            1   
                        </p>
                    </div>
                </div>
            </div>

            <div className="pokemon-gym">
                <h2>Catch Pokémon</h2>
                <form action="">
                    <input type="text" placeholder='Pokémon Name'/>
                    <input type="number" placeholder='Pokémon Level'/>
                    <input type="text" placeholder='Pokémon Type. Separated by commas (,)'/>
                    <input type="submit" value="Catch Pokémon" className='btn bg-blue'/>
                </form>
                <h2>Pokémon Roster</h2>
                <div className="pokemon-roster">
                    <div className="pokemon-card">
                        <h3 className='pokemon-title'><span className='sNo'>1</span>Pikachu</h3>
                        <div className="pokemon-stats-div">
                            <div className='pokemon-stat-container'>
                                <p className='stat-name'>Level:</p>
                                <p className='pokemon-level'>51</p>
                            </div>
                            <div className='pokemon-stat-container'>
                                <p className='stat-name'>Type:</p>
                                <p className='pokemon-type'>Electric</p>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button className="btn bg-orange">Edit</button>
                            <button className="btn bg-green">Train</button>
                            <button className="btn bg-red">Release</button>
                        </div>
                    </div>
                    <div className="pokemon-card">
                        <h3 className='pokemon-title'><span className='sNo'>2</span>Charmander</h3>
                        <div className="pokemon-stats-div">
                            <div className='pokemon-stat-container'>
                                <p className='stat-name'>Level:</p>
                                <p className='pokemon-level'>1</p>
                            </div>
                            <div className='pokemon-stat-container'>
                                <p className='stat-name'>Type:</p>
                                <p className='pokemon-type'>Fire</p>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button className="btn bg-orange">Edit</button>
                            <button className="btn bg-green">Train</button>
                            <button className="btn bg-red">Release</button>
                        </div>
                    </div>
                    <div className="pokemon-card">
                        <h3 className='pokemon-title'><span className='sNo'>3</span>Froakie</h3>
                        <div className="pokemon-stats-div">
                            <div className='pokemon-stat-container'>
                                <p className='stat-name'>Level:</p>
                                <p className='pokemon-level'>1</p>
                            </div>
                            <div className='pokemon-stat-container'>
                                <p className='stat-name'>Type:</p>
                                <p className='pokemon-type'>Water</p>
                            </div>
                        </div>
                        <div className="btn-group">
                            <button className="btn bg-orange">Edit</button>
                            <button className="btn bg-green">Train</button>
                            <button className="btn bg-red">Release</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}