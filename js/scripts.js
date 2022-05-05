//console.log() writes in the console in the inspector tab
//alert() creates a pop-up
//document.write() actually writes on the page
//&&(and)  ||(or)

/*
for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
  if (pokemonList[i].height <= 5) {
    document.write(" -This is a small pokemon" + "<br>");
  } else if (pokemonList[i].height === 6) {
    document.write(" -This is an average pokemon" + "<br>");
  } else if (pokemonList[i].height >= 7 ) {
    document.write(" -Wow, that's big!" + "<br>");
  }
}

//Added 3 pokemon in pokemonList and added arrays to each type
let pokemonList = [{name: "Eevee", height: 5, type: ["water", " fire", " bolt"]},
{name: " Weedle", height: 6, type: ["drill", " fire"]},
{name: " Squirtle", height: 7, type: ["water", " strength"]}];
*/

/*created IFFE function to protect it from outside global variables*/
let pokemonRepository = (function() {

let pokemonList = [
  {
    name: "Eevee",
    height: 5,
    type: ["-water", " fire", " bolt"]
  },
  {
    name: "Weedle",
    height: 6,
    type: ["-drill", " fire"]
  },
  {
    name: "Squirtle",
    height: 7,
    type: ["-water", " strength"]
  }
];

/* added an alert pop-up in case credentials were not met. pokemon.push to add pokemon*/
function add(pokemon) {
  if (pokemon.name && pokemon.height && pokemon.type) {
    pokemonList.push(pokemon);
} else {
  alert("Pokemon cannot be added to the list. Please try again");
}
}

function getAll() {
  return pokemonList;
}

/*created button elements and selectors. created event listener to react when button clicked*/
function addListItem(pokemon) {
  let pokemonlist = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  listItem.appendChild(button);
  pokemonlist.appendChild(listItem);
  button.addEventListener('click', showDetails);
}

/*Shows pokemon name in console when button is clicked (showDeatils above in function button)*/
function showDetails(pokemon) {
  console.log(pokemon.target.innerText);
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem
}
})()

/*loops through array of pokemon list*/
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
