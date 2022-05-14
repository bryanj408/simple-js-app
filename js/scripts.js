//console.log() writes in the console in the inspector tab
//alert() creates a pop-up
//document.write() actually writes on the page
//&&(and)  ||(or)

/*created IFFE function to protect it from outside global variables*/
let pokemonRepository = (function() {
//emptied static array to be filled by api
let pokemonList = [];
//added in api (external data)
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let modalContainer = document.querySelector('#modal-container');

// added an alert pop-up in case credentials were not met. pokemon.push to add pokemon
add = (pokemon) => pokemonList.push(pokemon);

getAll = () => pokemonList;

//created button elements and selectors. created event listener to react when button clicked
function addListItem(pokemon) {
  let list = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  listItem.appendChild(button);
  list.appendChild(listItem);
  addEvent(button, pokemon);
}

function addEvent(button, pokemon) {
  button.addEventListener('click', function () {
    showDetails(pokemon);
  }) ;
}

//added loadDetails function. this connects with showDetails function below with addEventListener
function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
  }

//added loadlist to fetch api and iterate through pokemonList
//only wanted to fetch name and url unless clicked, more details will show
//loads full list of pokemon with console.log(pokemon)
function loadList(pokemon) {
  return fetch(apiUrl).then(function (response) {
    return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
}

//Actually showing the modal
function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
}
//Shows pokemon name in console when button is clicked (showDetails above in function button)

function showModal(pokemon) {
  //clear all existing modal content
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  //add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = pokemon.name;

  let contentElement = document.createElement('p');
  contentElement.innerHTML = 'Height: ' + pokemon.height;

  let typeElement = document.createElement('p');
  pokemon.types.forEach((type, index) => {
     if (index === pokemon.types.length - 1) {
       typeElement.innerText += type.type.name;
     } else {
       typeElement.innerText += type.type.name + ", ";
     }
   })

  let imageElement = document.createElement('img');
  imageElement.classList.add('modal-image');
  imageElement.src = pokemon.imageUrl;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(imageElement);
  modal.appendChild(typeElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
}
//let dialogPromiseReject; setting up later by showDialog
//selects the modal-container and hides "is visible"

function hideModal() {
  modalContainer.classList.remove('is-visible');
}


  //keydown is predefined event listener
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

//listenes for when user clicks outside of box
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer)  {
    hideModal();
  }
});



//returns all funcitons when called
    return {
      add,
      getAll,
      addListItem,
      loadList,
      loadDetails,
      showDetails,
      addEvent
    }
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  })
})













//loops through array of pokemon list
//added loadlist in iteration





/*document.querySelector('#show-dialog').addEventListener('click', () => {
showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
    alert('confirmed!');
  }, () => {
    alert('not confirmed');
  });
});*/


/*document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});
})();*/




/*
//adding validation for email and password for forms for UI
function validateForm() {
  let isValidEmail = validateEmail();
  let isValidPAssword = validatePassword();
  return isValidEmail && isValidPAssword;
}

//validating email with error messages and @ sign
function validateEmail() {
  let value = emailInput.value;

  if (!value) {
    showErrorMessage(emailInput, 'Email is a required field');
    return false;
  }

  if (value.indexOf('@') === -1) {
    shpwErrorMessage(emailInput, 'You must enter a valid email address');
    return false;
  }

  showErrorMessage(emailInput, null);
  return true;
}


function validatePassword() {
  let value = passwordInput.value;
  if (!value) {
    showErrorMessage(passwordInput, 'Password is a required field');
    return false;
  }

  if (value.length < 8) {
    showErrorMessage(passwordInput, 'The password needs to be at least 8 cahracters long.');
    return false;
  }

  showErrorMessage(passwordInput, null);
  return true;
}


function showErrorMessage(input, message) {
  let container = input.parentElement; //the .input-wrapper

  //remove an existing error
  let error = container.querySelector('.error-message');
  if (error) {
    container.removeChild(error);
  }

  //now add the error if the message isn't empty
  if (message) {
    let error = document.createElement('div');
    error.classList.add('error-message');
    error.innerText = message;
    container.appendChild(error);
  }
}

emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input' validatePassword);
*/
