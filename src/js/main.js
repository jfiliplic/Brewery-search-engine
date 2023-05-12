const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";
const form = document.querySelector(`[name="search"]`);
const radioBtns = document.querySelectorAll(`input[name="keyword"]`);
const breweryGrid = document.querySelector(".breweries");

function handleRadioBtn(radioBtns) {
  let searchBy;
  for (const radioBtn of radioBtns) {
    if (radioBtn.checked) {
      searchBy = radioBtn.value;
      console.log(searchBy);
      return searchBy;
    }
  }
}

async function searchByCountry(query) {
  const responseCountries = await fetch(
    `${baseEndpoint}/search?query={${query}}&per_page=200`
  );
  const unfiltered = await responseCountries.json();
  console.log(unfiltered);
  const dataCountries = [];
  for (const brewery of unfiltered) {
    if (brewery.country === query) {
      dataCountries.push(brewery);
    }
  }
  return dataCountries;
}

async function searchByAny(query) {
  const responseAny = await fetch(
    `${baseEndpoint}/search?query={${query}}&per_page=200`
  );
  const dataAny = await responseAny.json();
  console.log(dataAny);
  return dataAny;
}

async function searchByNameOrCity(query, filter) {
  const responseNameOrCity = await fetch(
    `${baseEndpoint}?by_${filter}=${query}&per_page=200`
  );
  const dataNameOrCity = await responseNameOrCity.json();
  return dataNameOrCity;
}

async function fetchBreweries(query) {
  const filter = handleRadioBtn(radioBtns);
  if (filter === "country") {
    return searchByCountry(query);
  } else if (filter === "any") {
    return searchByAny(query);
  } else return searchByNameOrCity(query, filter);
}

function handleSubmit(event) {
  event.preventDefault();
  const query = form.searchbar.value;
  console.log(query);
  if (!query) return;
  fetchAndDisplay(query);
}

// async function fetchBreweries(query) {
//   const filter = handleRadioBtn(radioBtns);
//   if (filter === "country") {
//     // const responseCountries = await fetch(`${baseEndpoint}?per_page=200`);
//     const responseCountries = await fetch(
//       `${baseEndpoint}/search?query={${query}}&per_page=200`
//     );
//     const unfiltered = await responseCountries.json();
//     console.log(unfiltered);
//     const dataCountries = [];
//     for (const brewery of unfiltered) {
//       if (brewery.country === query) {
//         dataCountries.push(brewery);
//       }
//     }
//     return dataCountries;
//   }

//   if (filter === "other") {
//     const responseOther = await fetch(
//       `${baseEndpoint}/search?query={${query}}&per_page=200`
//     );
//     const dataOther = await responseOther.json();
//     console.log(dataOther);
//     return dataOther;
//   }

//   const responseNameOrCity = await fetch(
//     `${baseEndpoint}?by_${filter}=${query}&per_page=200`
//   );
//   const dataNameOrCity = await responseNameOrCity.json();
//   return dataNameOrCity;
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   const query = form.searchbar.value;
//   console.log(query);
//   if (!query) return;
//   fetchAndDisplay(query);
// }

async function fetchAndDisplay(query) {
  const breweries = await fetchBreweries(query);
  console.log(breweries);
  if (!(breweries.length > 0)) {
    breweryGrid.innerHTML = `<h1>SORRY, NO BREWERIES FOUND!</h1>`;
    return;
  } else {
    displayBreweries(breweries);
  }
}

function displayBreweries(breweries) {
  console.log("creating HTML...");
  const html = breweries.map(
    (brewery) =>
      `<div class="brewery">
        <h2>${brewery.name} / ${brewery.city} / ${brewery.country}</h2>
      </div>`
  );
  breweryGrid.innerHTML = html.join(``);
}

form.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("you pressed enter");
    handleSubmit(event);
  }
});

// fetchAndDisplay("dog");

// const numbers = [1, 2, 3, 4, 5];

// // to tud ne dela
// const rezultat = numbers.forEach((number) => {
//   if (number === 1) {
//     const fiks = number;
//     return fiks;
//   }
// });

// console.log(rezultat);

// to dela
// function filterNumbers(numbers) {
//   return numbers.filter((number) => number > 2);
// }

// to pa ne dela
// function filterNumbers(numbers) {
//   return function filter(numbers) {
//     return numbers.forEach(function (number) {
//       let arr = [];
//       if (number > 0) {
//         arr.push(number);
//       }
//       return arr;
//     });
//   };
// }

// const rezultat = filterNumbers(numbers);
// console.log(rezultat);
