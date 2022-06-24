async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}




let start = 1;
let end = 21;
let allPokemon = [];


async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=400&offset=0';
    let response = await fetch(url);
    allPokemon = await response.json();
    for (let i = start; i < end; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        allPokemon[i] = await response.json();

        renderPokemonCards(i);
    }
    console.log(allPokemon);
}



function renderPokemonCards(i) {
    document.getElementById('pokemons').innerHTML += `

    <div id="pokedex">
<div class="headDivider">
<h3 id="pokemonName">${allPokemon[i]['name'].charAt(0).toUpperCase() + allPokemon[i]['name'].slice(1)}</h3>
<span class="id" id="ID">#&nbsp${allPokemon[i]['id']}</span>
</div>

<img id="image" src="${allPokemon[i]['sprites']['other']['home']['front_default']}"></img><br>
<div class="footerSpan">
<span><b>Height</b>&nbsp:&nbsp${allPokemon[i]['height']/ 10}&nbspmtr.</span><br>
<span><b>Weight</b>&nbsp:&nbsp${allPokemon[i]['weight']/10}&nbspkg</span><br>
<span><b>Experience</b>&nbsp:&nbsp ${allPokemon[i]['base_experience']}</span>
</div>
</div>
`;
}

function startPokemon() {
    document.getElementById('parent').classList.remove('d-none');
    document.getElementById('start').classList.add('d-none');
}

function scrollTop() {
    document.getElementById('parent').scrollIntoView({
        behavior: 'smooth'
    });
}