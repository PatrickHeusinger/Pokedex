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
    document.getElementById('pokemons').innerHTML += /*html*/ `

    <div onclick="fullScreen(${i})" id="pokedex">
<div class="headDivider">
<h3 id="pokemonName">${allPokemon[i]['name']}</h3>
<span class="id" id="ID">#${allPokemon[i]['id']}</span>
</div>
<img id="image" src="${allPokemon[i]['sprites']['other']['home']['front_default']}"><br>
<div class="footerSpan">
<span><b>Height</b>&nbsp:&nbsp${allPokemon[i]['height']/10}&nbspmtr.</span><br>
<span><b>Weight</b>&nbsp:&nbsp${allPokemon[i]['weight']/10}&nbspkg</span><br>
<span><b>Experience</b>&nbsp:&nbsp ${allPokemon[i]['base_experience']}&nbspxp</span><br>
<span><b>Type</b>&nbsp:&nbsp ${allPokemon[i]['types'][0]['type']['name']}</span>
</div>
</div>
`;
    removeClass('backToTop', 'd-none');
    countPokemons();

}
/*--------------------------------------------counter-------------------------------------------------*/

function countPokemons() {
    document.getElementById('counter').innerHTML = allPokemon.length - 1;
}
/*-------------------------------------------fullscreen------------------------------------------------*/

function fullScreen(i) {

    let showFullScreen = document.getElementById('fullScreen');
    showFullScreen.innerHTML = '';
    showFullScreen.innerHTML = /*html*/ `
    <div onclick="closeFullScreen(${i})" id="pokedex">
    <div class="headDivider">
    <h3 id="pokemonName">${allPokemon[i]['name']}</h3>
    <span class="id" id="ID">#${allPokemon[i]['id']}</span>
    </div>
    <img id="image" src="${allPokemon[i]['sprites']['other']['home']['front_default']}"><br>
    <div class="footerSpan">
    <span><b>Height</b>&nbsp:&nbsp${allPokemon[i]['height']/10}&nbspmtr.</span><br>
    <span><b>Weight</b>&nbsp:&nbsp${allPokemon[i]['weight']/10}&nbspkg</span><br>
    <span><b>Experience</b>&nbsp:&nbsp ${allPokemon[i]['base_experience']}&nbspxp</span><br>
    <span><b>Type</b>&nbsp:&nbsp ${allPokemon[i]['types'][0]['type']['name']}</span>
    </div>
    </div>
    `;

    addClass('parent', 'd-none');
    addClass('loadButton', 'd-none');
    addClass('backToTop', 'd-none');
    removeClass('fullScreen', 'd-none'); /*------------button remove class d-none to scroll back ! important*/
    console.log('test');
}

function closeFullScreen() {
    let closeFullScreen = document.getElementById('fullScreen');
    closeFullScreen.innerHTML = '';
    removeClass('parent', 'd-none');
    removeClass('loadButton', 'd-none');
    addClass('fullScreen', 'd-none');
    removeClass('backToTop', 'd-none');
    renderPokemonCards(i);
}

/*-------------------------------------------load--more--cards------------------------------------------*/

function loadMorePokemon() {
    start = end;
    end += 20;
    loadPokemon();

}
/*-------------------------------------------hide--startscreen-----------------------------------------*/

function startPokemon() {
    removeClass('parent', 'd-none');
    addClass('start', 'd-none');
    removeClass('loadButton', 'd-none');
    removeClass('counting', 'd-none');
    removeClass('backToTop', 'd-none');
}

/*--------------------------------------------------------------scroll--functions-----------------------------------------*/

function scrollBackToTop() {
    document.getElementById('backToTop').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollYButton() {
    if (window.scrollY > 500) {
        removeClass('scrollToTop', 'd-none');
    } else {
        addClass('scrollToTop', 'd-none');
    }
}

/*-----------------------------------remove--and--add--class----------------------------------------------------------*/

function removeClass(id, className) {
    document.getElementById(id).classList.remove(className);
}

function addClass(id, className) {
    document.getElementById(id).classList.add(className);
}