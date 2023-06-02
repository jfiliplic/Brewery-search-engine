import {
  fetchData,
  searchByAny,
  searchByCountry,
  searchByNameOrCity,
} from "./lib.mjs";

import { radioBtns } from "./elements.mjs";

export {
  setPreferredMode,
  modeToggle,
  getMode,
  searchWithEnter,
  handleKeywords,
  parseBreweryName,
};

// handlers from main.js

function handleRadioBtns(radioBtns) {
  let searchBy;
  for (const radioBtn of radioBtns) {
    if (radioBtn.checked) {
      searchBy = radioBtn.value;
      return searchBy;
    }
  }
}

function searchWithEnter(searchInput) {
  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleQuerySubmit(event, searchInput);
      }
    });
  }
}

async function handleKeywords(query) {
  const keyword = handleRadioBtns(radioBtns);
  if (keyword === "country") {
    return searchByCountry(query);
  } else if (keyword === "any") {
    return searchByAny(query);
  } else return searchByNameOrCity(query, keyword);
}

function handleQuerySubmit(event, searchInput) {
  event.preventDefault();
  const query = searchInput.value;
  if (!query) return;
  fetchData(query);
}

// handlers from result.js

function parseBreweryName() {
  const breweryName = window.location.search.slice(9).replaceAll(/%20/g, " ");
  return breweryName;
}

// handlers from theme.js

function modeToggle(root, themeToggle) {
  themeToggle.addEventListener("click", (_) => {
    root.toggleAttribute("dark");
    root.dispatchEvent(new CustomEvent(`modeToggled`));
  });
}

function getMode(root) {
  root.addEventListener("modeToggled", (_) => {
    const mode = root.hasAttribute("dark") ? "dark" : null;
    if (mode) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.removeItem("mode");
    }
  });
}

function setPreferredMode(root) {
  if (localStorage.getItem("mode")) {
    root.setAttribute("dark", null);
  }
}
