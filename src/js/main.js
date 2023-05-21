const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";
const searchInput = document.querySelector(`input[name="searchbar"]`);
const radioBtns = document.querySelectorAll(`input[name="keyword"]`);
const resultCardsDisplay = document.querySelector(".result-cards");

function handleRadioBtns() {
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
  const keyword = handleRadioBtns();
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
  const resultsPerPage = 10;
  console.log(breweriesData);
  if (!(breweriesData.length > 0)) {
    resultCardsDisplay.innerHTML = `<h3 class="no-match">SORRY, NO BREWERY MATCHES YOUR SEARCH!</h3>`;
    return;
  } else {
    displayBreweryListInfo(breweriesData);
  }
  if (breweriesData.length > resultsPerPage) {
    navigateResultPages(breweriesData, resultsPerPage);
  }
}

function displayBreweryListInfo(breweriesData, resultPageNumber = 0) {
  const totalResults = breweriesData.length;
  let resultsPerPage = 10;
  const numberOfSteps = Math.floor(totalResults / resultsPerPage);
  const pagesBehind = resultPageNumber * resultsPerPage;
  const pagesToShow = totalResults - pagesBehind;
  if (totalResults - pagesBehind < resultsPerPage) {
    resultsPerPage = totalResults - pagesBehind;
  }
  console.log(
    `totalResults: ${totalResults}, resultsPerPage: ${resultsPerPage}, numberOfStep: ${numberOfSteps}`
  );
  console.log("creating HTML for all breweries found...");
  const htmlPagination = `
  <div class="pagination" data-resultPageNumber="${resultPageNumber}">
    <span>Showing ${1 + pagesBehind} - ${
    totalResults > resultsPerPage ? resultsPerPage + pagesBehind : totalResults
  } of ${totalResults}</span>
    <label for="back">
    <button type="button" id="back" class="back" ${
      pagesBehind ? `disabled:false` : `disabled`
    }><<</button>
    </label>
    <label for="forward">
    <button type="button" id="forward" class="forward" ${
      pagesToShow > resultsPerPage ? `disabled:false` : `disabled`
    }>>></button>
    </label>
  </div>`;
  resultCardsDisplay.innerHTML = htmlPagination;

  //ali z indeksiranjem (map dela samo na array - daj objekt v array z oglatimi oklepaji) ali pa slice s korakom resultsPerPage

  let cards = [];
  for (
    let i = 0 + pagesBehind;
    pagesToShow > resultsPerPage
      ? i < resultsPerPage + pagesBehind
      : i < pagesToShow + pagesBehind;
    i++
  ) {
    const htmlResultCards = [breweriesData[i]].map(
      ({ name, city, country }) =>
        `<a href="result.html?brewery=${name}" target="_blank">
        <div class="single-card">
          <h2>${name}<span>/</span></h2>
          <h2>${city}<span>/</span></h2>
          <h2>${country}</h2>
        </div>
      </a>`
    );
    cards.push(htmlResultCards);
    console.log(cards);
  }

  resultCardsDisplay.insertAdjacentHTML("beforeend", cards.join(``));

  // varianta brez vmesnega koraka
  // resultCardsDisplay.innerHTML = htmlPagination + htmlResultCards.join(``);
}

function increaseResultPage(breweriesData) {
  console.log("forward");
  const paginator = document.querySelector(".pagination");
  const totalResults = breweriesData.length;
  const resultsPerPage = 10;
  const numberOfSteps = Math.floor(totalResults / resultsPerPage);
  let resultPage = parseInt(paginator.dataset.resultpagenumber);
  if (resultPage < numberOfSteps) {
    resultPage++;
    displayBreweryListInfo(breweriesData, resultPage);
  }
}

function decreaseResultPage(breweriesData) {
  console.log("back");
  const paginator = document.querySelector(".pagination");
  const totalResults = breweriesData.length;
  const resultsPerPage = 10;
  const numberOfSteps = Math.floor(totalResults / resultsPerPage);
  let resultPage = parseInt(paginator.dataset.resultpagenumber);
  if (resultPage > 0) {
    resultPage--;
    displayBreweryListInfo(breweriesData, resultPage);
  }
}

// listenerje sem dal v funkciji s pogojem, ker drugače pri klicanju funkcije searchByNameOrCity (ali katerekoli druge) iz modula main.js v modulu results.js modul results.js požene cel modul main.js (zato seveda tudi event listener), ta pa na strani result.html ne najde elementa input.searchbar

function searchWithEnter() {
  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleQuerySubmit(event);
      }
    });
  }
}

function navigateResultPages(breweriesData) {
  if (resultCardsDisplay) {
    resultCardsDisplay.addEventListener("click", (event) => {
      if (event.target.matches("button.back")) {
        decreaseResultPage(breweriesData);
      } else if (event.target.matches("button.forward")) {
        increaseResultPage(breweriesData);
      }
    });
  }
}

searchWithEnter();
