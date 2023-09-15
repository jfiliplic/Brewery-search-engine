import { resultCardsDisplay } from "./elements.mjs";

import { displayBreweryListInfo } from "./lib.mjs";

export { navigateResultPages };

function changeResultPage(
  changeType,
  breweriesData,
  resultsPerPage,
  totalResults,
  numberOfSteps
) {
  const pagination = document.querySelector(".pagination");
  let resultPageNumber = parseInt(pagination.dataset.resultpagenumber);
  if (changeType === "forward") {
    if (resultPageNumber < numberOfSteps) {
      resultPageNumber++;
      displayBreweryListInfo(
        breweriesData,
        resultsPerPage,
        totalResults,
        resultPageNumber
      );
    }
  } else if (changeType === "back") {
    if (resultPageNumber > 0) {
      resultPageNumber--;
      displayBreweryListInfo(
        breweriesData,
        resultsPerPage,
        totalResults,
        resultPageNumber
      );
    }
  }
}

function navigateResultPages(
  breweriesData,
  resultsPerPage,
  totalResults,
  numberOfSteps
) {
  if (resultCardsDisplay) {
    resultCardsDisplay.addEventListener("click", (event) => {
      const changeType = event.target.matches("button.forward")
        ? "forward"
        : "back";
      changeResultPage(
        changeType,
        breweriesData,
        resultsPerPage,
        totalResults,
        numberOfSteps
      );
    });
  }
}
