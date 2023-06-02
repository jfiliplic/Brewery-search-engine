// elements from main.js

export const baseEndpoint = "https://api.openbrewerydb.org/v1/breweries";
export const searchInput = document.querySelector(`input[name="searchbar"]`);
export const radioBtns = document.querySelectorAll(`input[name="keyword"]`);
export const resultCardsDisplay = document.querySelector(".result-cards");

// elements from result.js
export const singleResultCardDisplay = document.querySelector(".detailed-card");

// elements from theme.js

export const root = document.querySelector(":root");
export const themeToggle = document.querySelector(".toggle-input");
