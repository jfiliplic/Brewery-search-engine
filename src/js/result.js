import { searchByNameOrCity } from "./main.js";

const singleResultCardDisplay = document.querySelector(".detailed-card");

function parseBreweryName() {
  const breweryName = window.location.search.slice(9).replaceAll(/%20/g, " ");
  return breweryName;
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

displaySingleBreweryInfo();
