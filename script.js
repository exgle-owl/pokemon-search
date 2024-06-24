const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const pokemonNameSpan = document.getElementById('pokemon-name')
const pokemonIdSpan = document.getElementById('pokemon-id')
const weightSpan = document.getElementById('weight')
const heightSpan = document.getElementById('height')
const typesSpan = document.getElementById('types')
const spriteContainer = document.getElementById('sprite-container')
const hpSpan = document.getElementById('hp')
const attackSpan = document.getElementById('attack')
const defenseSpan = document.getElementById('defense')
const specialAttackSpan = document.getElementById('special-attack')
const specialDefenseSpan = document.getElementById('special-defense')
const speedSpan = document.getElementById('speed')
const statSpans = [hpSpan, attackSpan, defenseSpan, specialAttackSpan, specialDefenseSpan, speedSpan]

const getPokemon = async idOrName => {
  try {
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${idOrName}`
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (error) {
    alert('Pokemon not found')
  }
}

const displayPokemon = ({ name, id, weight, height, stats, types, sprites }) => {
  typesSpan.innerHTML = ''
  pokemonNameSpan.textContent = name.charAt(0).toUpperCase() + name.slice(1)
  pokemonIdSpan.textContent = `#${id}`
  weightSpan.textContent = `Weight: ${weight}`
  heightSpan.textContent = `Height: ${height}`
  stats.forEach(({ base_stat }, i) => {
    statSpans[i].textContent = base_stat
  });
  types.forEach(({ type }) => {
    typesSpan.innerHTML += `<span id="type">${type.name.toUpperCase()}</span>`
  })
  spriteContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="${name}">`
}

searchButton.addEventListener('click', async e => {
  e.preventDefault()
  if (!searchInput.value) {
    return
  }

  const pokemon = await getPokemon(searchInput.value.toLowerCase())
  displayPokemon(pokemon)
})
