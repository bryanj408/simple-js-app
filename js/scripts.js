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
let pokemonRepository = (function() {

let pokemonList =
  [{name: "Eevee", height: 5, type: ["-water", " fire", " bolt"]},
  {name: "Weedle", height: 6, type: ["-drill", " fire"]},
  {name: "Squirtle", height: 7, type: ["-water", " strength"]}];

function add(pokemon) {
  pokemonList.push(pokemon);
}

function getAll() {
  return pokemonList;
}

return {
  add: add,
  getAll: getAll
}
})()

pokemonRepository.getAll().forEach(function(array) {
document.write(array.name + '(height: ' + array.height + ') ' + array.type + '<br>');
});
