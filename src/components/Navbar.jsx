export default function Navbar({activeSection}){
    return(
        <nav>
            <div className="pokemon-gym">
                <a href="#catch" className={activeSection === 'catch'?"nav-link active":"nav-link"}>Catch Pokémon</a>
                <a href="#filter" className={activeSection === 'filter'?"nav-link active":"nav-link"}>Filter Pokémon</a>
                <a href="#roster" className={activeSection === 'roster'?"nav-link active":"nav-link"}>Pokémon Roster</a>
            </div>
        </nav>
    )
}