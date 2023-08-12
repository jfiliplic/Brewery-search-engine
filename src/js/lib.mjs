import { handleKeywords, parseBreweryName } from "./handlers.mjs";

import {
  baseEndpoint,
  resultCardsDisplay,
  singleResultCardDisplay,
} from "./elements.mjs";

import { navigateResultPages } from "./utils.mjs";

export {
  fetchData,
  searchByAny,
  searchByCountry,
  searchByNameOrCity,
  displayBreweryListInfo,
  displaySingleBreweryInfo,
};

async function fetchData(query) {
  const breweriesData = await handleKeywords(query);
  const resultsPerPage = 10;
  const totalResults = breweriesData.length;
  const numberOfSteps = Math.floor(totalResults / resultsPerPage);
  if (!(totalResults > 0)) {
    resultCardsDisplay.innerHTML = `<h3 class="no-match">Sorry, no brewery matches your search!</h3>`;
    return;
  } else {
    displayBreweryListInfo(breweriesData, resultsPerPage, totalResults);
  }
  if (totalResults > resultsPerPage) {
    navigateResultPages(
      breweriesData,
      resultsPerPage,
      totalResults,
      numberOfSteps
    );
  }
}

async function searchByCountry(query) {
  const responseCountry = await fetch(
    `${baseEndpoint}/search?query=${query}&per_page=200`
  );
  const unfilteredData = await responseCountry.json();
  const dataCountry = [];
  for (const breweryData of unfilteredData) {
    if (breweryData.country.toLowerCase().includes(query.toLowerCase())) {
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

async function searchByNameOrCity(query, keyword) {
  const responseNameOrCity = await fetch(
    `${baseEndpoint}?by_${keyword}=${query}&per_page=200`
  );
  const dataNameOrCity = await responseNameOrCity.json();
  return dataNameOrCity;
}

function displayBreweryListInfo(
  breweriesData,
  resultsPerPage,
  totalResults,
  resultPageNumber = 0
) {
  console.log("creating HTML for all breweries found...");
  const resultsBehind = resultPageNumber * resultsPerPage;
  const resultsCurrentAhead = totalResults - resultsBehind;
  if (totalResults - resultsBehind < resultsPerPage) {
    resultsPerPage = totalResults - resultsBehind;
  }
  const htmlPagination = `
    <div class="pagination" data-resultPageNumber="${resultPageNumber}">
      <span>Showing ${1 + resultsBehind} - ${
    totalResults > resultsPerPage
      ? resultsPerPage + resultsBehind
      : totalResults
  } of ${totalResults}</span>
      <label for="back">
      <button type="button" id="back" class="back" ${
        resultsBehind ? `disabled:false` : `disabled`
      }><<</button>
      </label>
      <label for="forward">
      <button type="button" id="forward" class="forward" ${
        resultsCurrentAhead > resultsPerPage ? `disabled:false` : `disabled`
      }>>></button>
      </label>
    </div>`;
  resultCardsDisplay.innerHTML = htmlPagination;

  let htmlResultCards = [];
  htmlResultCards = breweriesData
    .slice(
      resultsBehind,
      resultsCurrentAhead > resultsPerPage
        ? resultsPerPage + resultsBehind
        : totalResults
    )
    .map(
      ({ name, city, country }) =>
        `<a class="single-result-link" href="result.html?brewery=${name}" target="_blank">
          <div class="single-card">
            <h2>${name}<span>/</span></h2>
            <h2>${city}<span>/</span></h2>
            <h2>${country}</h2>
          </div>
        </a>`
    );
  console.log(htmlResultCards);
  

  resultCardsDisplay.insertAdjacentHTML("beforeend", htmlResultCards.join(``));

  console.log(resultCardsDisplay.innerHTML);

  // htmlResultCards.push(htmlResultCard);

  // let htmlResultCards = [];
  // for (
  //   let i = 0 + resultsBehind;
  //   resultsCurrentAhead > resultsPerPage
  //     ? i < resultsPerPage + resultsBehind
  //     : i < totalResults;
  //   i++
  // ) {
  //   const htmlResultCard = [breweriesData[i]].map(
  //     ({ name, city, country }) =>
  //       `<a class="single-result-link" href="result.html?brewery=${name}" target="_blank">
  //         <div class="single-card">
  //           <h2>${name}<span>/</span></h2>
  //           <h2>${city}<span>/</span></h2>
  //           <h2>${country}</h2>
  //         </div>
  //       </a>`
  //   );
  //   htmlResultCards.push(htmlResultCard);
  // }

  // resultCardsDisplay.insertAdjacentHTML("beforeend", htmlResultCards.join(``));

  // varianta brez vmesnega koraka
  // resultCardsDisplay.innerHTML = htmlPagination + htmlResultCards.join(``);
}

function createSingleBreweryHtml(
  name,
  type,
  longitude,
  latitude,
  phone,
  website_url
) {
  console.log("creating HTML for a single brewery..");
  const html1 = `
    <h2><span>Name</span>: ${name}</h2>
    <h2><span>Brewery type</span>: ${type || "no type available"}</h2>
    <h2><span>Phone</span>: ${phone || "no phone available"}</h2>
    <a href="${website_url}" target="_blank"><span>Website:</span> ${
    website_url || "no website available"
  }</a>
    `;

  if (latitude && longitude) {
    const html2 = `
      <a href="https://www.google.com/maps/place/${latitude},%20${longitude}" target="_blank"><span>Map: </span>click to see location on map</<a>`;
    singleResultCardDisplay.innerHTML = html1 + html2;
  } else {
    singleResultCardDisplay.innerHTML =
      html1 + `<h2><span>Map: </span>no coordinates available</h2>`;
  }

  const breweryLink = document.querySelector(".detailed-card a");
  if (!website_url) {
    breweryLink.classList.add("no-link");
  }

  breweryLink.addEventListener("click", (event) => {
    if (!website_url) {
      event.preventDefault();
    }
  });
}

async function displaySingleBreweryInfo() {
  const breweryName = parseBreweryName();
  const detailedBreweryData = await searchByNameOrCity(breweryName, "name");
  const { name, type, longitude, latitude, phone, website_url } =
    detailedBreweryData[0];
  createSingleBreweryHtml(name, type, longitude, latitude, phone, website_url);
}
