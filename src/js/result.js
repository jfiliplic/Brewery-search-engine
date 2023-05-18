import { searchByNameOrCity } from "./main.js";

const singleResultCardDisplay = document.querySelector(".wrapper");

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
  <h4>Name: ${name}</h4>
  <h4>Brewery type: ${type || "no type available"}</h4>
  <h4>Phone: ${phone || "no phone available"}</h4>
  <a href="${website_url}" target="_blank">${
    website_url || "no website available"
  }</a>
  `;

  if (latitude && longitude) {
    const html2 = `
    <a href="https://www.google.com/maps/place/${latitude},%20${longitude}" target="_blank">Map</<a>`;
    singleResultCardDisplay.innerHTML = html1 + html2;
  } else {
    singleResultCardDisplay.innerHTML =
      html1 + `<p>no coordinates available</p>`;
  }

  const breweryLink = document.querySelector(".wrapper a");
  if (!website_url) {
    breweryLink.classList.add("noLink");
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
