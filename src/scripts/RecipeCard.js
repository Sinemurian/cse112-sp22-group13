import { searchForKey } from './searchKey.js';
import { markFav, unFav } from './FavoriteRecipe.js';
import { deleteRecipe } from './deleteRecipe.js';

class RecipeCard extends HTMLElement {
  constructor () {
    // Part 1 Expose - TODO
    super();
    this.attachShadow({ mode: 'open' });
    // You'll want to attach the shadow DOM here
  }

  get data () {
    return this.shadowRoot;
  }

  /**
   * @param {any} data
   */
  set data (data) {
    // Here's the root element that you'll want to attach all of your other elements to
    const parsed = JSON.parse(data);
    console.log(parsed);
    const recipeCard = document.createElement('article');
    recipeCard.classList.add('recipe-card');

    // Attach grid container to root (article aka recipe card)
    const recipeContainer = document.createElement('div');
    recipeContainer.classList.add('recipe-grid-container');
    recipeCard.appendChild(recipeContainer);

    // 1st column = img of recipe; attach to container
    const imgGrid = document.createElement('div');
    imgGrid.classList.add('recipe-grid-img');
    const img1 = document.createElement('img');
    img1.src = parsed.image;
    imgGrid.appendChild(img1);
    recipeContainer.appendChild(imgGrid);

    // 2nd column = recipe ovewview; attach to container
    const recipeOverview = document.createElement('div');
    recipeOverview.classList.add('recipe-grid-overview');
    recipeContainer.appendChild(recipeOverview);

    // attach title to recipe overview
    const recipeTitle = document.createElement('p');
    recipeTitle.classList.add('recipe-title');
    recipeTitle.innerText = searchForKey(parsed, 'title');
    recipeOverview.appendChild(recipeTitle);

    // attach serving to recipe overview
    const recipeServing = document.createElement('p');
    recipeServing.classList.add('recipe-serving');
    recipeServing.innerHTML = "Sevings: " + searchForKey(parsed, 'servings');
    recipeOverview.appendChild(recipeServing);

    // attach time to recipe overview
    const recipeTime = document.createElement('p');
    recipeTime.classList.add('recipe-time');
    recipeTime.innerHTML = "Time: " + searchForKey(parsed, 'readyInMinutes') + " minutes";
    recipeOverview.appendChild(recipeTime);

    // attach company to recipe overview
    const recipeOrg = document.createElement('p');
    recipeOrg.classList.add('recipe-org');
    recipeOrg.innerHTML = "By " + searchForKey(parsed, 'sourceName');
    recipeOverview.appendChild(recipeOrg);

    // const favoriteButton = document.createElement('button');
    const favorite = document.createElement('img');
    favorite.classList.add("recipe-favorite");
    const favmap = new Map(JSON.parse(localStorage['2']));
    if (favmap.get(parsed.id) === true) {
      favorite.src = '../recipe_list/img/heartFull.png';
      favorite.id = 'favoriteIcon';
      favorite.alt = 'full';
    } else {
      favorite.src = '../recipe_list/img/heartEmpty.png';
      favorite.id = 'favoriteIcon';
      favorite.alt = 'empty';
    }

    // When clicked, edit start and edit respective boolean in favmap
    favorite.addEventListener('click', (e) => {
      e.stopPropagation();
      if (favorite.alt === 'empty') {
        console.log('favorited');
        favorite.src = '../recipe_list/img/heartFull.png';
        favorite.alt = 'full';
        // Call to favorite recipe here. data is the variable that holds the string representation of our recipe.
        // parsed holds the JSON.parse(data) which is the actual JSON object for this recipe
        markFav(parsed.id);
      } else {
        console.log('unfavorited');
        favorite.src = '../recipe_list/img/heartEmpty.png';
        favorite.alt = 'empty';
        // Call to unfavorite recipe here
        unFav(parsed.id);
      };
    });

    recipeOverview.appendChild(favorite);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteBtn');
    deleteButton.addEventListener('click', function (e) {
      e.stopPropagation();
      document.getElementById(parsed.id).classList.add('deleted');
      deleteRecipe(parsed.id)});
    recipeOverview.appendChild(deleteButton);

    // attach tag to tagList, tagList to recipe overview
    /* const tagList = document.createElement('ul');
    tagList.classList.add('recipe-tags');
    tagList.innerText = 'Tags: ';
    const tag = document.createElement('li');
    tag.classList.add('tags');
    tagList.appendChild(tag);
    recipeOverview.appendChild(tagList);
    */

    const styleElem = document.createElement('style');
    styleElem.innerHTML = `
    .recipe-card {
      padding-top: 2rem;
    }
    
    .recipe-grid-container {
        display: flex;
        background-color: white;
        padding: 1%;
        border: white;
        border-top: 3px solid  black;
        border-bottom: 3px solid  black;
    }

    .recipe-grid-img {
        float: left;
        width: 50%;
    }

    .recipe-grid-img img {
        height: 100%;
        width: 90%;
        padding: 0;
        margin: 0;
    }

    .recipe-grid-overview {
        float: left;
        width: 50%;
        text-align: left;
        color: black;
        font-size: 2.8vw;
        line-height: 0.7;
    }
    
    .recipe-title {
        font-size: 3.8vw;
        padding:0;
        margin: 0.2rem 0;
        font-weight: 600;
        line-height:1.5;
    }
    
    .recipe-favorite {
        padding: 0.3rem 0 0.3rem 0;
        height: 30px;
        width: 30px;
    }
    .deleteBtn {
      font-size: 1rem;
      font-weight: 900;
      color: whitesmoke;
      position: relative;
      border-radius: 10px 10px 10px 10px;
      left: 50px;
      padding: 0.5rem 1rem 0.5rem 1rem;
      outline: none;
      cursor: pointer;
      background-color: #FF8303;;
    }
    `;

    this.shadowRoot.append(styleElem, recipeCard);
  }
}

/*********************************************************************/
/** *                       Helper Functions:                       ***/
/** *          Below are some functions I used when making          ***/
/** *     the solution, feel free to use them or not, up to you     ***/
/*********************************************************************/
/**
   * Extract the URL from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the URL of
   * @returns {String} If found, it returns the URL as a string, otherwise null
   */
export function getUrl (data) {
  if (data.url) return data.url;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] === 'Article') return data['@graph'][i]['@id'];
    }
  };
  return null;
}

/**
   * Similar to getUrl(), this function extracts the organizations name from the
   * schema JSON object. It's not in a standard location so this function helps.
   * @param {Object} data Raw recipe JSON to find the org string of
   * @returns {String} If found, it retuns the name of the org as a string, otherwise null
   */
export function getOrganization (data) {
  if (data.publisher?.name) return data.publisher?.name;
  if (data['@graph']) {
    for (let i = 0; i < data['@graph'].length; i++) {
      if (data['@graph'][i]['@type'] === 'Organization') {
        return data['@graph'][i].name;
      }
    }
  };
  return null;
}

/**
   * Converts ISO 8061 time strings to regular english time strings.
   * Not perfect but it works for this lab
   * @param {String} time time string to format
   * @return {String} formatted time string
   */
export function convertTime (time) {
  let timeStr = '';

  // Remove the 'PT'
  time = time.slice(2);

  const timeArr = time.split('');
  if (time.includes('H')) {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] === 'H') return `${timeStr} hr`;
      timeStr += timeArr[i];
    }
  } else {
    for (let i = 0; i < timeArr.length; i++) {
      if (timeArr[i] === 'M') return `${timeStr} min`;
      timeStr += timeArr[i];
    }
  }

  return '';
}

/**
   * Takes in a list of ingredients raw from imported data and returns a neatly
   * formatted comma separated list.
   * @param {Array} ingredientArr The raw unprocessed array of ingredients from the
   *                              imported data
   * @return {String} the string comma separate list of ingredients from the array
   */
export function createIngredientList (ingredientArr) {
  let finalIngredientList = '';

  /**
     * Removes the quantity and measurement from an ingredient string.
     * This isn't perfect, it makes the assumption that there will always be a quantity
     * (sometimes there isn't, so this would fail on something like '2 apples' or 'Some olive oil').
     * For the purposes of this lab you don't have to worry about those cases.
     * @param {String} ingredient the raw ingredient string you'd like to process
     * @return {String} the ingredient without the measurement & quantity
     * (e.g. '1 cup flour' returns 'flour')
     */
  function _removeQtyAndMeasurement (ingredient) {
    return ingredient.split(' ').splice(2).join(' ');
  }

  ingredientArr.forEach(ingredient => {
    ingredient = _removeQtyAndMeasurement(ingredient);
    finalIngredientList += `${ingredient}, `;
  });

  // The .slice(0,-2) here gets ride of the extra ', ' added to the last ingredient
  return finalIngredientList.slice(0, -2);
}

// Define the Class so you can use it as a custom element.
// This is critical, leave this here and don't touch it
customElements.define('recipe-card', RecipeCard);
