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
let morePokemon = 0;


async function loadPokemon() {
    //   let url = 'https://pokeapi.co/api/v2/pokemon?limit=400&offset=0';
    //   let response = await fetch(url);
    //   allPokemon = await response.json();
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

    <div onclick="fullScreen()" id="pokedex">
<div class="headDivider">
<h3 id="pokemonName">${allPokemon[i]['name'].charAt(0).toUpperCase() + allPokemon[i]['name'].slice(1)}</h3>
<span class="id" id="ID">#${allPokemon[i]['id']}</span>
</div>
<img id="image" src="${allPokemon[i]['sprites']['other']['home']['front_default']}"></img><br>
<div class="footerSpan">
<span><b>Height</b>&nbsp:&nbsp${allPokemon[i]['height']/10}&nbspmtr.</span><br>
<span><b>Weight</b>&nbsp:&nbsp${allPokemon[i]['weight']/10}&nbspkg</span><br>
<span><b>Experience</b>&nbsp:&nbsp ${allPokemon[i]['base_experience']}&nbspxp</span><br>
<span><b>Type</b>&nbsp:&nbsp ${allPokemon[i]['types'][0]['type']['name']}</span>
</div>
</div>
`;
    countPokemons();
}

function countPokemons() {
    document.getElementById('counter').innerHTML = allPokemon.length - 1;
}

function fullScreen() {

    console.log('test');
}


function loadMorePokemon() {
    start = end;
    end += 20;
    loadPokemon();

}

function startPokemon() {
    document.getElementById('parent').classList.remove('d-none');
    document.getElementById('start').classList.add('d-none');
    document.getElementById('loadButton').classList.remove('d-none');
    document.getElementById('counting').classList.remove('d-none');
    document.getElementById('backToTop').classList.remove('d-none');

}

function scrollBackToTop() {
    document.getElementById('backToTop').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollYButton() {
    if (window.scrollY > 500) {
        document.getElementById('scrollToTop').classList.remove('d-none');
    } else {
        document.getElementById('scrollToTop').classList.add('d-none');

    }
}