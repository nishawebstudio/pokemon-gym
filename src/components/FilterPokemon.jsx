import { useState } from "react"

export default function FilterPokemon({onFilteringPokemon}){

    const [searchTerm,setSearchTerm] = useState("");
    const [sortOption,setSortOption] = useState("asc-name");
    function handleSearch(event) {
        if (event.target.id === "searching") {
            setSearchTerm(event.target.value);
            onFilteringPokemon(event.target.value, sortOption);
        } else {
            setSortOption(event.target.value);
            onFilteringPokemon(searchTerm, event.target.value);
        }
    }
    return (
        <>
            <h2>Filter and Sort Pokémon</h2>
            <p className="reg-p">Filter Pokémon by traits like type or region, then sort them by name or level to organize your team without changing your collection. This makes choosing Pokémon for Gym battles quick and easy.</p>         
            <div className="filters-div">
                <input type="search" id="searching" value={searchTerm} placeholder="Enter Pokémon Name" onChange={handleSearch}/>
                <select id="sorting" value={sortOption} onChange={handleSearch}>
                    <option value="asc-name">Name A ⬇ Z</option>
                    <option value="desc-name">Name Z ⬇ A</option>
                    <option value="asc-level">Level A ⬇ Z</option>
                    <option value="desc-level">Name Z ⬇ A</option>
                </select>
            </div>
        </>
    )
}