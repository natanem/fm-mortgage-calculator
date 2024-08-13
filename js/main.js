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

const calculateResult = () => {
  const finalAmount =
    ((interestRate / 12) * amount) /
    (1 - (1 + interestRate / 12) ** (-30 * 12));

  //   console.log(finalAmount);
};

const renderResult = (result) => {
  const div = document.createElement("div");
  div.textContent = result;
};

const validateForm = (inputEls) => {
  inputEls.forEach((el) => {
    if (!el.value) {
      console.log("element is no value: ", el, !el.value);
      el.parentElement.nextElementSibling.classList.remove("hidden");
      el.setAttribute("required", true);
      return false;
    } else if (!el.checked) {
      console.log("element is not checked: ", el, !el.checked);
      el.parentElement.nextElementSibling.classList.remove("hidden");
      el.setAttribute("required", true);
      return false;
    } else {
      el.parentElement.nextElementSibling.classList.add("hidden");
      el.setAttribute("required", false);
    }
  });

  return true;
};

const formEl = findElement(".form");
const inputEls = findElement("input", "all");
const calcBtn = findElement(".calc-button");
const clearBtn = findElement(".clear-button");
const resultsContainer = findElement(".card-right .content");

const mortgageAmountEl = Array.from(inputEls).find(
  (el) => el.name === "mortgage_amount"
);

mortgageAmountEl.addEventListener("blur", () => {
  console.log(mortgageAmountEl.value);
  mortgageAmountEl.value = new Intl.NumberFormat().format(
    mortgageAmountEl.value.split(",").join("")
  );
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
  if (validateForm(inputEls)) return;
  console.log("here");

  const amount = Number(formData.get("mortgage_amount").split(",").join(""));
  const interestRate = Number(formData.get("interest_rate")) / 100;
  const term = Number(formData.get("mortgage_term"));
});
