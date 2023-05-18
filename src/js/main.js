const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";
const searchInput = document.querySelector(`input[name="searchbar"]`);
const radioBtns = document.querySelectorAll(`input[name="keyword"]`);
const resultCardsDisplay = document.querySelector(".result-cards");

function handleRadioBtns(radioBtns) {
  let searchBy;
  for (const radioBtn of radioBtns) {
    if (radioBtn.checked) {
      searchBy = radioBtn.value;
      return searchBy;
    }
  }
}

function capitalizeFirstLetter(query) {
  const words = query.split(" ");
  // for (let i = 0; i < words.length; i++) {
  //   words[i] = words[i][0].toUpperCase() + keywords[i].substr(1);
  // }
  // return words.join(" ");
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

async function searchByCountry(query) {
  const capitalizedQuery = capitalizeFirstLetter(query);
  const responseCountry = await fetch(
    `${baseEndpoint}/search?query={${capitalizedQuery}}&per_page=200`
  );
  const unfilteredData = await responseCountry.json();
  const dataCountry = [];
  for (const breweryData of unfilteredData) {
    if (breweryData.country === capitalizedQuery) {
      dataCountry.push(breweryData);
    }
  }
  return dataCountry;
}

async function searchByAny(query) {
  const responseAny = await fetch(
    `${baseEndpoint}/search?query={${query}}&per_page=200`
  );
  const dataAny = await responseAny.json();
  return dataAny;
}

export async function searchByNameOrCity(query, keyword) {
  const responseNameOrCity = await fetch(
    `${baseEndpoint}?by_${keyword}=${query}&per_page=200`
  );
  const dataNameOrCity = await responseNameOrCity.json();
  return dataNameOrCity;
}

async function handleKeywords(query) {
  const keyword = handleRadioBtns(radioBtns);
  if (keyword === "country") {
    return searchByCountry(query);
  } else if (keyword === "any") {
    return searchByAny(query);
  } else return searchByNameOrCity(query, keyword);
}

function handleQuerySubmit(event) {
  event.preventDefault();
  const query = searchInput.value;
  if (!query) return;
  fetchData(query);
}

async function fetchData(query) {
  const breweriesData = await handleKeywords(query);
  console.log(breweriesData);
  if (!(breweriesData.length > 0)) {
    resultCardsDisplay.innerHTML = `<h3 class="no-match">SORRY, NO BREWERY MATCHES YOUR SEARCH!</h3>`;
    return;
  } else {
    displayBreweryListInfo(breweriesData);
  }
}

function displayBreweryListInfo(breweriesData) {
  console.log("creating HTML for all breweries found...");
  const html = breweriesData.map(
    ({ name, city, country }) =>
      `<a href="result.html?brewery=${name}" target="_blank">
        <div class="single-card">
          <h2>${name}<span>/</span></h2>
          <h2>${city}<span>/</span></h2>
          <h2>${country}</h2> 
        </div>
      </a>`
  );
  resultCardsDisplay.innerHTML = html.join(``);
}

function searchWithEnter(searchInput) {
  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleQuerySubmit(event);
      }
    });
  }
}

searchWithEnter(searchInput);
