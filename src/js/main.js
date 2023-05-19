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

// function displayBreweryListInfo(breweriesData) {
//   console.log("creating HTML for all breweries found...");
//   const html = breweriesData.map(
//     ({ name, city, country }) =>
//       `<a href="result.html?brewery=${name}" target="_blank">
//         <div class="single-card">
//           <h2>${name}<span>/</span></h2>
//           <h2>${city}<span>/</span></h2>
//           <h2>${country}</h2>
//         </div>
//       </a>`
//   );
//   resultCardsDisplay.innerHTML = html.join(``);
// }

function displayBreweryListInfo(breweriesData) {
  const totalResults = breweriesData.length;
  const resultsPerPage = 10;
  const numberOfSteps = Math.floor(totalResults / resultsPerPage);
  const resultPageNumber = 0;
  console.log(
    `totalResults: ${totalResults}, resultsPerPage: ${resultsPerPage}, numberOfStep: ${numberOfSteps}`
  );
  console.log("creating HTML for all breweries found...");
  const htmlPagination = `
  <div class="pagination" data-resultPageNumber="${resultPageNumber}">
    <span>Showing 1 - ${
      totalResults > resultsPerPage ? resultsPerPage : totalResults
    } of ${totalResults}</span>
    <label for="back">
    <button type="button" id="back" class="back" disabled><<</button>
    </label>
    <label for="forward">
    <button type="button" id="forward" class="forward" ${
      totalResults > resultsPerPage ? `disabled:false` : `disabled`
    }>>></button>
    </label>
  </div>`;
  resultCardsDisplay.innerHTML = htmlPagination;

  // const breweryData = [breweriesData[0]];
  // console.log(breweriesData[0]);
  // const htmlResultCards = [breweriesData[2]].map(
  //   ({ name, city, country }) =>
  //     `<a href="result.html?brewery=${name}" target="_blank">
  //     <div class="single-card">
  //       <h2>${name}<span>/</span></h2>
  //       <h2>${city}<span>/</span></h2>
  //       <h2>${country}</h2>
  //     </div>
  //   </a>`
  // );

  // console.log(htmlResultCards);
  // resultCardsDisplay.innerHTML = htmlPagination + htmlResultCards.join(``);
  // resultCardsDisplay.insertAdjacentHTML("beforeend", htmlResultCards.join(``));

  //ali z indeksiranjem (map dela samo na array - daj objekt v array z oglatimi oklepaji, index od 0 do (totalResults-1), izračun indeksa: (od 0 do (resultsPerPage - 1)) + (resultPageNumber * resultsPerPage)) dokler indeks <= totalResults
  // ali pa naredimo slice s korakom resultsPerPage (start = 0 + (resultPageNumber * resultsPerPage), end = resultsPerPage - 1 + (resultPageNumber * resultsPerPage)dokler end <= totalResults )
  let cards = [];
  for (
    let i = 0;
    totalResults - resultPageNumber * 10 > resultsPerPage
      ? i < resultsPerPage
      : i < totalResults - resultPageNumber * 10;
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
}

// function setResultPage(breweriesData) {
//   const totalResults = breweriesData.length;
//   const resultsPerPage = 10;
//   const numberOfSteps = Math.floor(totalResults / resultsPerPage);
//   console.log(totalResults, resultsPerPage, numberOfSteps);
//   if (numberOfSteps > 0) {
//     fwdBtn.disabled = false;
//   }
// }

// const backBtn = document.querySelector(".back");
// const fwdBtn = document.querySelector(".forward");
// const paginator = document.querySelector(".pagination");

// backBtn.addEventListener("click", decreaseResultPage);
// fwdBtn.addEventListener("click", increaseResultPage);

function decreaseResultPage() {
  console.log("back");
  // let resultPage = parseInt(paginator.dataset.resultpagenumber);
  // if (resultPage === 0) {
  //   return;
  // } else if (resultPage === 1) {
  //   resultPage--;
  //   paginator.dataset.resultpagenumber = `${resultPage}`;
  //   backBtn.disabled = true;
  //   fwdBtn.disabled = false;
  // } else {
  //   resultPage--;
  //   paginator.dataset.resultpagenumber = `${resultPage}`;
  // }
}

function increaseResultPage() {
  console.log("forward");
  // let resultPage = parseInt(paginator.dataset.resultpagenumber);
  // if (resultPage === numberOfSteps) {
  //   return;
  // } else if (resultPage === numberOfSteps - 1) {
  //   resultPage++;
  //   paginator.dataset.resultpagenumber = `${resultPage}`;
  //   fwdBtn.disabled = true;
  // } else {
  //   resultPage++;
  //   paginator.dataset.resultpagenumber = `${resultPage}`;
  // }
}

// listenerje sem dal v funkcijo s pogojem, ker drugače pri klicanju funkcije searchByNameOrCity (ali katerekoli druge) iz modula main.js v modulu results.js požene tudi event listener, ta pa na strani result.html ne najde elementa input.searchbar

function searchWithEnter(searchInput) {
  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleQuerySubmit(event);
      }
    });
  }
}

function navigateResultPages(resultCardsDisplay) {
  if (resultCardsDisplay) {
    resultCardsDisplay.addEventListener("click", (event) => {
      if (event.target.matches("button.back")) {
        decreaseResultPage();
      } else if (event.target.matches("button.forward")) {
        increaseResultPage();
      }
    });
  }
}

searchWithEnter(searchInput);
