import { useState} from "react"

export default function FilterPokemon({onFilteringPokemon,ref}){

    

    const [searchTerm,setSearchTerm] = useState("");
    const [sortOption,setSortOption] = useState("asc-name");
    const [region,setRegion] = useState("");
    function handleSearch(event) {
        if (event.target.id === "searching") {
            setSearchTerm(event.target.value);
            onFilteringPokemon(event.target.value, sortOption, region);
        } else if (event.target.id === "regioning") {
            setRegion(event.target.value);
            onFilteringPokemon(searchTerm, sortOption, event.target.value);
        } else {
            setSortOption(event.target.value);
            onFilteringPokemon(searchTerm, event.target.value, region);
        }
    }
    return (
        <>
            <h2>Filter and Sort Pokémon</h2>
            <p className="reg-p">Filter Pokémon by traits like type or region, then sort them by name or level to organize your team without changing your collection. This makes choosing Pokémon for Gym battles quick and easy.</p>         
            <div className="filters-div">
                <input type="search" id="searching" value={searchTerm} placeholder="Enter Pokémon Name" onChange={handleSearch} ref={ref}/>
                <select id="sorting" value={sortOption} onChange={handleSearch}>
                    <option value="asc-name">Name A ⬇ Z</option>
                    <option value="desc-name">Name Z ⬇ A</option>
                    <option value="asc-level">Level A ⬇ Z</option>
                    <option value="desc-level">Name Z ⬇ A</option>
                </select>
                <select id="regioning" value={region} onChange={handleSearch}>
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
            </div>
            
        </>
    )
}