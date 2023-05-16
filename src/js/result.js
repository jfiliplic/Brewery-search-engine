import { handleResultClick, searchByNameOrCity } from "./main.js";

const singleResultCardDisplay = document.querySelector(".wrapper");

async function displaySingleBreweryInfo() {
  console.log("creating HTML for a single brewery..");
  breweryName = handleResultClick();
  const { name, type, phone, website_url } = await searchByNameOrCity(
    breweryName,
    "name"
  );
  const html = `
  <h4>${name}</h4>
  <h4>${type}</h4>
  <h4>${phone}</h4>
  <a href="${website_url} " target="_blank">${
    website_url || "no website available"
  }</a>
  `;
  singleResultCardDisplay.innerHTML = html.join(``);
}

displaySingleBreweryInfo();
