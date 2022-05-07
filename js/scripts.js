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
//emptied static array to be filled by api
let pokemonList = [];
//added in api
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
/* added an alert pop-up in case credentials were not met. pokemon.push to add pokemon*/
function add(pokemon) {
  if (typeof pokemon === 'object' && 'name' in pokemon) {
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
  button.addEventListener('click', function(event) {
    showDetails(pokemon);
  });
}
//added loadlist to fetch api and iterate through pokemonList
//only wanted to fetch name and url unless clicked, more details will show
//loads full list of pokemon with console.log(pokemon)
function loadList() {
  function showLoadingMessage() {
    console.log('Loading, please wait...');
  };
  return fetch(apiUrl).then(function (response) {
    return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
}

//added loadDetails function. this connects with showDetails function below with addEventListener
function loadDetails(item) {
  function showLoadingMessage() {
    console.log('Loading, please wait...');
  };
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
  }

/*Shows pokemon name in console when button is clicked (showDetails above in function button)*/
function showDetails(item) {
  loadDetails(item).then(function () {
    console.log(item);
  });
}

//returns all funcitons when called
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
}
})()

//loops through array of pokemon list
//added loadlist in iteration
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
