const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function pegaPokemon(pokemon) {
    return `
        <span id="voltar">Clique aqui para voltar</span>
        <h1 class="name">${pokemon.name}</h1>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        // Adicione o ouvinte de evento `click` à tag `li`
        pokemons.forEach(pokemon => {
            const li = document.getElementById(pokemon.number)
            li.addEventListener('click', () => {
                loadPokemonUnic(pokemon)
            })
        })
    })
}

function loadPokemonUnic(pokemon){
    auxHtml = pokemonList.innerHTML;
    pokemonList.innerHTML = pegaPokemon(pokemon)

    const volta = document.getElementById('voltar');
    volta.addEventListener('click', () => {
        pokemonList.innerHTML = '';
        loadPokemonItens(offset, limit)
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})