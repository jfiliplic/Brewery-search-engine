export {
  baseEndpoint,
  searchInput,
  radioBtns,
  resultCardsDisplay,
  singleResultCardDisplay,
  root,
  themeToggle,
};

// elements from main.js

const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";
const searchInput = document.querySelector(`input[name="searchbar"]`);
const radioBtns = document.querySelectorAll(`input[name="keyword"]`);
const resultCardsDisplay = document.querySelector(".result-cards");

// elements from result.js
const singleResultCardDisplay = document.querySelector(".detailed-card");

// elements from theme.js

const root = document.querySelector(":root");
const themeToggle = document.querySelector(".toggle-input");
