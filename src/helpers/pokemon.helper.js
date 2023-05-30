export function filterPokemonByName(list, pokemonName) {
  if (!pokemonName || pokemonName === 'ALL') {
    return list;
  }
  return list.filter((element) => element.name === pokemonName);
}

export function filterPokemonByType(list, pokemonType) {
  if (!pokemonType || pokemonType === 'ALL') {
    return list;
  }
  const newArr = list.filter((ele) => {
    return ele.type.includes(pokemonType);
  });

  return newArr;
}

export function filterPokemonByWeakness(list, pokemonWeakness) {
  if (!pokemonWeakness || pokemonWeakness === 'ALL') {
    return list;
  }
  const newArr = list.filter((ele) => {
    return ele.weaknesses.includes(pokemonWeakness);
  });

  return newArr;
}

export function getListOf(list, prop) {
  if (!prop) {
    return prop;
  }

  const totalValuesArr = list.map((element) => {
    return element[prop];
  });

  //Create some way to track what has already been seen
  const uniqueValues = [];

  //Iterate over the array
  for (let i = 0; i < totalValuesArr.length; i++) {
    //Determine if each element has been repeated
    if (!uniqueValues.includes(totalValuesArr[i])) {
      uniqueValues.push(totalValuesArr[i]);
    }
  }

  return uniqueValues;
}
