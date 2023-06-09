import { useState, useEffect } from 'react';
import { filterPokemonByName, filterPokemonByType, getListOf, filterPokemonByWeakness } from '../helpers/pokemon.helper';
import '../App.css';

export default function HomePage() {
  const pokemonTypeArr = [
    'Normal', 'Fire', 'Water', 'Grass', 'Electric',
    'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
    'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy'
  ]
  pokemonTypeArr.sort();

  // state variables
  const [list, setList] = useState([]);
  const [searchName, setSearchName] = useState('ALL');
  const [searchType, setSearchType] = useState('ALL');
  const [searchWeakness, setSearchWeakness] = useState('ALL');

  async function getPokemonData() {
    try {
      const response = await fetch(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`);
      const pokemonData = await response.json();
      setList(pokemonData.pokemon);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPokemonData();
  }, []);

  //Derived State
  const filterByName = filterPokemonByName(list, searchName);
  const pokemonNameList = getListOf(list, 'name');
  const filterByType = filterPokemonByType(list, searchType);
  const filterByWeakness = filterPokemonByWeakness(list, searchWeakness);

  let searchList = [...filterByName];

  if(searchType !== 'ALL' && searchName === 'ALL' && searchWeakness === 'ALL') {
    searchList = [...filterByType];
  } else if (searchWeakness !== 'ALL' && searchName === 'ALL' && searchType === 'ALL') {
    searchList = [...filterByWeakness];
  } else if (searchName === 'ALL' && searchType !== 'ALL' && searchWeakness !== 'ALL') {
    const newFilterByType = filterPokemonByType(list, searchType);
    searchList = [...filterPokemonByWeakness(newFilterByType, searchWeakness)];
  } 

  return (
    <div className='container'>
      <h1>Pokedex</h1>
      <div className='selector-section'>
        <div className="name-selector">
          <label htmlFor="pokemonNameSelector">Pick a Pokemon: </label>
          <select 
            name='pokemonNameSelector'
            id='pokemonNameSelector'
            value={searchName}
            onChange={(ev) => {
              setSearchName(ev.target.value)
            }}
          >
            <option value="ALL">ALL</option>
            {
              pokemonNameList.map((pokemon, index) => {
                return (
                  <option value={pokemon} key={pokemon + index}>
                    {pokemon}
                  </option>
                )
            })}
          </select>
        </div>
        <div className="type-selector">
          <label htmlFor="pokemoTypeSelector">Pick a Type: </label>
          <select 
            name='pokemonTypeSelector'
            id='pokemonTypeSelector'
            value={searchType}
            onChange={(ev) => {
              setSearchType(ev.target.value)
            }}
          >
            <option value="ALL">ALL</option>
            {
              pokemonTypeArr.map((type, index) => {
                return (
                  <option value={type} key={type + index}>
                    {type}
                  </option>
                )
            })}
          </select>
        </div>
        <div className="weakness-selector">
          <label htmlFor="pokemoTypeSelector">Pick a Weakness: </label>
          <select 
            name='pokemonWeaknessSelector'
            id='pokemonWeaknessSelector'
            value={searchWeakness}
            onChange={(ev) => {
              setSearchWeakness(ev.target.value)
            }}
          >
            <option value="ALL">ALL</option>
            {
              pokemonTypeArr.map((type, index) => {
                return (
                  <option value={type} key={type + index}>
                    {type}
                  </option>
                )
            })}
          </select>
        </div>
      </div>
      <ul>
        { searchList.length? 
            searchList.map((item, index) => {
              return (
                <li key={item.id}>
                  <h2>{item.num} {item.name}</h2>
                  <img src={item.img} alt="" />
                  <div className="pokemonInfo">
                    <div className="pokemonTypeContainer">
                      <h3>Type:</h3>
                      {item.type.map((ele, index) => {
                        return (<p key={ele + index}>{ele}</p>);
                      })}
                    </div>
                    <div className="pokemonWeaknessContainer">
                      <h3>Weaknesses:</h3>
                      {item.weaknesses.map((ele, index) => {
                        return (<p key={ele + index}>{ele}</p>);
                      })}
                    </div>
                  </div>
                </li>
            )}) :
          <li>
            <h2>Results not found</h2>
          </li>
        }
      </ul>
    </div>
  );
}
