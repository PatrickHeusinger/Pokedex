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

/*---------------------------------------------fetch--api--------------------------------------------*/

async function loadPokemon() {
    for (let i = start; i < end; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        allPokemon[i] = await response.json();

        renderPokemonCards(i);

    }
    console.log(allPokemon);
}

/*--------------------------------------------render--cards---------------------------------------------*/

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
/*--------------------------------------------counter-------------------------------------------------*/

function countPokemons() {
    document.getElementById('counter').innerHTML = allPokemon.length - 1;
}
/*-------------------------------------------fullscreen------------------------------------------------*/

function fullScreen() {

    console.log('test');
}
/*-------------------------------------------load--more--cards------------------------------------------*/

function loadMorePokemon() {
    start = end;
    end += 20;
    loadPokemon();

}
/*-------------------------------------------hide--startscreen-----------------------------------------*/

function startPokemon() {
    openApp('parent', 'd-none');
    closeStartScreen('start', 'd-none');
    showLoadButton('loadButton', 'd-none');
    showCounter('counting', 'd-none');
    helpBackToTop('backToTop', 'd-none');
}

function openApp(id, className) {
    document.getElementById(id).classList.remove(className);
}

function closeStartScreen(id, className) {
    document.getElementById(id).classList.add(className);
}

function showLoadButton(id, className) {
    document.getElementById(id).classList.remove(className);
}

function showCounter(id, className) {
    document.getElementById(id).classList.remove(className);
}

function helpBackToTop(id, className) {
    document.getElementById(id).classList.remove(className);
}
/*--------------------------------------------------------------scroll--functions-----------------------------------------*/

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