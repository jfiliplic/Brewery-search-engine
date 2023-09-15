import { displayBreweryListInfo } from "./lib.mjs";

export { navigateResultPages };

function changeResultPage(
  changeType,
  breweriesData,
  resultsPerPage,
  totalResults,
  pagination
) {
  const numberOfSteps = Math.floor(totalResults / resultsPerPage);
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

function navigateResultPages(breweriesData, resultsPerPage, totalResults) {
  const pagination = document.querySelector(".pagination");
  pagination.addEventListener("click", (event) => {
    const changeType = event.target.matches("button.forward")
      ? "forward"
      : "back";
    changeResultPage(
      changeType,
      breweriesData,
      resultsPerPage,
      totalResults,
      pagination
    );
  });
}
