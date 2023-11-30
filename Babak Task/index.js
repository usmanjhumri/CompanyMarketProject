function waitForElement(closestCardIntegration) {
  return new Promise((resolve, _) => {
    let element = document.querySelector(closestCardIntegration);
    if (element) {
      resolve(element);
    } else {
      new MutationObserver((mutations, observer) => {
        element = document.querySelector(closestCardIntegration);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      }).observe(document, {
        childList: true,
        subtree: true,
      });
    }
  });
}
function handleRouteChange() {
  const cardIntegrationDivs = document.querySelectorAll(".card-integration");
  const targetText = [
    "Connect your location's Clio Account",
    "Connect your location's Shopify Store",
    "Connect your location's LinkedIn Account",
    "Connect your Slack Channel",
  ];
  cardIntegrationDivs.forEach(function (innerDiv, index) {
    const pElements = innerDiv.querySelector("p, .custom-text");
    if (pElements && targetText.includes(pElements.textContent.trim())) {
      const closestCardIntegration = innerDiv.closest(".col-sm-6.col-md-3");
      closestCardIntegration.classList.add("targeted-div");
      console.log(innerDiv);

      closestCardIntegration.remove();
    }
  });
}
setInterval(() => {
  waitForElement(".card-integration").then(() => {
    handleRouteChange();
  });
}, 1000);
window.addEventListener("routeChangeEvent", handleRouteChange);
