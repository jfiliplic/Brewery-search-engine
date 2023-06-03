export {
  baseEndpoint,
  searchInput,
  radioBtns,
  resultCardsDisplay,
  singleResultCardDisplay,
  root,
  themeToggle,
};

const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";
const searchInput = document.querySelector(`input[name="searchbar"]`);
const radioBtns = document.querySelectorAll(`input[name="keyword"]`);
const resultCardsDisplay = document.querySelector(".result-cards");
const singleResultCardDisplay = document.querySelector(".detailed-card");
const root = document.querySelector(":root");
const themeToggle = document.querySelector(".toggle-input");
