import {useState} from 'react';

export default function Navbar(){
    const [activeSection,setActiveSection] = useState('catchSection');

    return(
        <nav>
            <div className="pokemon-gym">
                <a href="#catch" id='catchSection' onClick={(event)=>setActiveSection(event.target.id)} className={activeSection === 'catchSection'?"nav-link active":"nav-link"}>Catch Pokémon</a>
                <a href="#filter" id='filterSection' onClick={(event)=>setActiveSection(event.target.id)} className={activeSection === 'filterSection'?"nav-link active":"nav-link"}>Filter Pokémon</a>
                <a href="#roster" id='rosterSection' onClick={(event)=>setActiveSection(event.target.id)} className={activeSection === 'rosterSection'?"nav-link active":"nav-link"}>Pokémon Roster</a>
            </div>
        </nav>
    )
}