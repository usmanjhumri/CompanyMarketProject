function waitForElement(selector) {
  return new Promise((resolve, _) => {
    let element = document.querySelector(selector);
    if (element) {
      resolve(element);
    } else {
      new MutationObserver((mutations, observer) => {
        element = document.querySelector(selector);
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

function handleRouteChange() {}

window.addEventListener("routeChangeEvent", handleRouteChange);

// targeting those element which we want to remove
// const IndexToTargetedDivElement = [3,5,7,8]

// IndexToTargetedDivElement.forEach((index) => {
//     const TargetedDivs = document.querySelectorAll('.card-integration')[index]
//     console.log(TargetedDivs);
// })

// const  cardIntegrationDivs = document.querySelectorAll('.card-integration--inner');
//     cardIntegrationDivs.forEach(function (innerDiv, index) {
//         const pElement = innerDiv.querySelector('p');
//         if (pElement?.textContent.trim() === "Connect your location's Clio Account") {
//             console.log(`Element ${index + 1} matches the specified text:`);
//             console.log(innerDiv);
//         }
//     });

const cardIntegrationDiv = document.querySelectorAll(".card-integration--inner");
const targetText = [
  "Connect your location's Clio Account",
  "Connect your location's Shopify Store",
  "Connect your location's LinkedIn Account",
  "Connect your Slack Channel",
];
cardIntegrationDiv.forEach(function (innerDiv, index) {
  const pElements = innerDiv.querySelector("p, .custom-text");
  if (pElements && targetText.includes(pElements.textContent.trim())) {
    innerDiv.closest(".card-integration").classList.add("targeted-div");
    console.log(innerDiv);
  }
});

const manageScoring = document.getElementById("sb_manage-scoring");
const LinkedInFormFieldsMapping = document.getElementById(
  "tb_linkedin-form-fields-mapping"
);














function waitForElement(selector) {
    return new Promise((resolve, _) => {
      let element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else {
        new MutationObserver((mutations, observer) => {
          element = document.querySelector(selector);
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
    const cardIntegrationDivs = document.querySelectorAll(".card-integration--inner");
    const targetText = [
      "Connect your location's Clio Account",
      "Connect your location's Shopify Store",
      "Connect your location's LinkedIn Account",
      "Connect your Slack Channel",
    ];
    
    cardIntegrationDivs.forEach(function (innerDiv, index) {
      const pElements = innerDiv.querySelector("p, .custom-text");
      if (pElements && targetText.includes(pElements.textContent.trim())) {
        const closestCardIntegration = innerDiv.closest(".card-integration");
        closestCardIntegration.classList.add("targeted-div");
        console.log(innerDiv);
        
        closestCardIntegration.remove();
      }
    });
  }
  
  waitForElement('.card-integration--inner').then(() => {
    handleRouteChange();
  });
  window.addEventListener("routeChangeEvent", handleRouteChange);
  
  const routeChangeEvent = new Event('routeChangeEvent');
  window.dispatchEvent(routeChangeEvent);
  window.addEventListener('beforeunload', () => {
    const targetedDivs = document.querySelectorAll('.targeted-div');
    targetedDivs.forEach(div => div.remove());
  });
  