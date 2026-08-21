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
            <p className="reg-p">Now, Ash, as your Pokédex fills up, you cannot just scroll through hundreds of entries blindly looking for one partner. To stay organized, you must learn to Filter your Pokémon by specific traits, like choosing to view only 'Fire-types' when you need an advantage against Grass-types, or isolating 'Kanto region' Pokémon. Think of filtering as a net that catches only the exact group you want to see while hiding the rest.</p>
            <p className="reg-p">Once you have filtered your list, you need to Sort them so they appear in a helpful order. You can arrange your Pokémon from 'Highest to Lowest Level' to see your strongest fighters instantly, or sort them 'Alphabetically' to find Bulbasaur ahead of Squirtle. Sorting does not change who is in your collection; it simply rearranges them in a neat line so you can make quick decisions before a big Gym battle.</p>         
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