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

function handleRadioBtns(radioBtns) {
  let searchBy;
  for (const radioBtn of radioBtns) {
    if (radioBtn.checked) {
      searchBy = radioBtn.value;
      console.log("test3 handleRadioBtns get value of radio btn", searchBy);
      return searchBy;
    }
  }
}

function searchWithEnter(searchInput) {
  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleQuerySubmit(event, searchInput);
        console.log("test1 searchWithEnter pressed enter");
      }
    });
  }
}

async function handleKeywords(query) {
  const keyword = handleRadioBtns(radioBtns);
  console.log("test4 handleKeywords call search function by keyword", keyword);
  if (keyword === "country") {
    console.log("test5a handleKeywords returns data by country");
    return searchByCountry(query);
  } else if (keyword === "any") {
    console.log("test5b handleKeywords returns data by any");
    return searchByAny(query);
  } else {
    console.log("test5c handleKeywords returns data by name or city");
    return searchByNameOrCity(query, keyword);
  }
}

function handleQuerySubmit(event, searchInput) {
  event.preventDefault();
  const query = searchInput.value;
  if (!query) return;
  fetchData(query);
  console.log("test2 handleQuerySubmit typed in query", query);
}

function parseBreweryName() {
  const breweryName = window.location.search.slice(9).replaceAll(/%20/g, " ");
  return breweryName;
}

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

function setPreferredMode(root, themeToggle) {
  if (localStorage.getItem("mode")) {
    root.setAttribute("dark", null);
    themeToggle.checked = true;
  }
}
