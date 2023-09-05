//// Connect/test js file to HTML
//console.log('Testing');
//
//// Using getElementById()
//const h1s = document.getElementById('h1');
//console.log(h1s);
//
//// Using getElementsByClassName()
//const students = document.getElementsByClassName('student');
//console.log(students);
//
//// Using getElementById()
//const instructors = document.getElementById('instructors');
//console.log(instructors);
//
//// Using querySelector (ES6 Modern Approach)
//const h1sQuery = document.querySelector('#instructors');
//console.log(h1sQuery);
//
//// Using innerText property: Changes the text
//if (students && students.length >= 3) {
//    students[1].innerText = 'oackland';
//    students[2].innerText = 'this is DOM Manipulation';
//}
//
//// Using innerHTML property: Allows you to write HTML code
//const dylansDiv = document.getElementsByClassName('dylans-div')[0];
//if (dylansDiv) {
//    dylansDiv.innerHTML = '<p>I was created from JS</p>';
//}
//
//// Using createElement()
//const newBtn = document.createElement('button');
//newBtn.innerText = 'Thieves';
//document.body.append(newBtn);
//
//// Add event listener for newBtn
//newBtn.addEventListener("click", () => {
//    if (newBtn.className === '') {
//        newBtn.className = 'purple';
//    } else if (newBtn.className === 'purple') {
//        newBtn.className = 'green';
//    } else {
//        newBtn.className = '';
//    }
//});
//
//// Create a second button and append to a specific div
//const secondBtn = document.createElement('button');
//secondBtn.innerText = 'I\'m Second';
//if (dylansDiv) {
//    dylansDiv.append(secondBtn);
//}
//
//// Adding addEventListener() to new button to add text every time it's clicked
//secondBtn.addEventListener('click', () => {
//    const pTag = document.createElement('p');
//    pTag.innerText = 'YEEEEER';
//    if (dylansDiv) {
//        dylansDiv.append(pTag);
//    }
////});
////// grabbing form data with .addEventListener()
////const formEl = document.query.querySelector('form')
////formEl.addEventListener('submin', (event) => {
////    event.preventDefault()
////    const pokeName = formEl[0].value
////    pokeData(pokeName)
////})
//
//document.addEventListener("DOMContentLoaded", () => {
//    const form = document.getElementById("pokemonForm");
//    const pokemonImageDiv = document.getElementById("pokemonImageDiv");
//    const pokemonStats = document.getElementById("pokemonStats");
//    const toggleShinyButton = document.getElementById("toggleShiny");
//    let currentPokemon = null;
//
//    form.addEventListener("submit", async (e) => {
//        e.preventDefault();
//        const pokemonName = document.getElementById("pokemonInput").value;
//
//        try {
//            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
//            currentPokemon = response.data;
//
//            // Show Pokemon info
//            const spriteUrl = currentPokemon.sprites.front_default;
//            pokemonImageDiv.innerHTML = `<img src="${spriteUrl}" id="pokemonSprite">`;
//            pokemonStats.innerHTML = `
//                <p>HP: ${currentPokemon.stats[0].base_stat}</p>
//                <p>Attack: ${currentPokemon.stats[1].base_stat}</p>
//                <p>Defense: ${currentPokemon.stats[2].base_stat}</p>
//            `;
//        } catch (error) {
//            console.error(`An error occurred: ${error}`);
//            pokemonStats.innerHTML = '<p>An error occurred while fetching data</p>';
//        }
//    });
//
//    toggleShinyButton.addEventListener("click", () => {
//        if (currentPokemon) {
//            const spriteElement = document.getElementById("pokemonSprite");
//            spriteElement.src = spriteElement.src === currentPokemon.sprites.front_default ? currentPokemon.sprites.front_shiny : currentPokemon.sprites.front_default;
//        }
//    });
//});

/* This is homework*/

document.addEventListener("DOMContentLoaded", function () {
    let isShiny = false;
    const pokemonForm = document.getElementById("pokemonForm");
    const pokemonImageDiv = document.getElementById("pokemonImageDiv");
    const pokemonStats = document.getElementById("pokemonStats");
    const toggleShinyBtn = document.getElementById("toggleShiny");

    const fetchPokemonInfo = async (pokemonName) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (response.ok) {
                const pokemon = await response.json();

                const imageUrl = isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;
                pokemonImageDiv.innerHTML = `<img src="${imageUrl}" alt="${pokemonName}" />`;
                const statsHtml = `
                <ul>
                    <li>HP: ${pokemon.stats[0].base_stat}</li>
                    <li>Attack: ${pokemon.stats[1].base_stat}</li>
                    <li>Defense: ${pokemon.stats[2].base_stat}</li>
                    <li>Special Attack: ${pokemon.stats[3].base_stat}</li>
                    <li>Special Defense: ${pokemon.stats[4].base_stat}</li>
                    <li>Speed: ${pokemon.stats[5].base_stat}</li>
                </ul>
                `;
                pokemonStats.innerHTML = statsHtml;
            } else {
                console.error(`Failed to fetch data: ${response.status}`);
            }
        } catch (error) {
            console.error(`An error occurred: ${error}`);
        }
    };

    pokemonForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const pokemonName = document.getElementById("pokemonInput").value;
        fetchPokemonInfo(pokemonName);
    });

    toggleShinyBtn.addEventListener("click", function () {
        isShiny = !isShiny;
        const currentPokemon = document.getElementById("pokemonInput").value;
        if (currentPokemon) {
            fetchPokemonInfo(currentPokemon);
        }
    });
});
