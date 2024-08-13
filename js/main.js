const findElement = (selector, howMany = "") => {
  const element = document.querySelectorAll(selector);
  if (howMany.trim().toLowerCase() !== "all") {
    return element[0];
  }
  return element;
};

const validateInput = (value) => {
  if (NaN(value) || typeof value !== "number") {
    return false;
  }

  return true;
};

const calculateResult = (amount, interestRate, term) => {
  const finalAmount =
    ((interestRate / 12) * amount) /
    (1 - (1 + interestRate / 12) ** (-30 * 12));

  return finalAmount;
};

const validateForm = (inputEls) => {
  for (let el of Array.from(inputEls)) {
    if (el.type === "text" && el.value == "") return false;
  }
  return true;
};

const formEl = findElement(".form");
const inputEls = findElement("input", "all");
const calcBtn = findElement(".calc-button");
const clearBtn = findElement(".clear-button");
const resultsContainer = findElement(".card-right .content");

// const mortgageAmountEl = Array.from(inputEls).find(
//   (el) => el.name === "mortgage_amount"
// );

// mortgageAmountEl.addEventListener("blur", () => {
//   mortgageAmountEl.value =
//     mortgageAmountEl.value &&
//     new Intl.NumberFormat().format(mortgageAmountEl.value.split(",").join(""));
// });

const renderResult = (result) => {
  resultsContainer.innerHTML = `
     <div class="results-container">
                <h2>Your results</h2>
                <p>
                  Your results are shown below based on the information you
                  provided. To adjust the results, edit the form and click
                  “calculate repayments” again.
                </p>
                <div class="results-info-card">
                  <div class="monthly-payment">
                    <p>Your monthly repayments</p>
                    <p class="amount">&pound;${result.toFixed(2)}</p>
                  </div>
                  <div class="total-payment">
                    <p>Total you'll repay over the term</p>
                    <p class="amount">&pound;1797.74</p>
                  </div>
                </div>
              </div>
  `;
};

inputEls.forEach((inputEl) => {
  inputEl.addEventListener("blur", () => {
    if (inputEl.name === "mortgage_amount") {
      inputEl.value =
        inputEl.value &&
        new Intl.NumberFormat().format(inputEl.value.split(",").join(""));
    }

    inputEl.setAttribute("required", "");
  });
});

clearBtn.addEventListener("click", () => {
  inputEls.forEach((element) => {
    element.value = "";
    element.checked = false;
    element.required = false;
  });
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const formData = new FormData(formEl);
  Array.from(inputEls).map((el) => el.setAttribute("required", ""));
  if (!validateForm(inputEls)) {
    return;
  }
  const amount = Number(formData.get("mortgage_amount").split(",").join(""));
  const interestRate = Number(formData.get("interest_rate")) / 100;
  const term = Number(formData.get("mortgage_term"));

  const result = calculateResult(amount, interestRate, term);
  renderResult(result);

  console.log("here");
});
