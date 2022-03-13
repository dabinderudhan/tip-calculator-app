const billValue = document.querySelector(".bill-value");
const tipContainer = document.querySelector(".input-data--btns");
const tipValue = document.querySelectorAll(".input-data--btns_btn");
const peopleValue = document.querySelector(".people-no");
const displayTipAmount = document.querySelector(".tip-amount");
const displayTotalAmount = document.querySelector(".total-amount");
const customTipValue = document.querySelector(".input-data--btns_btn-custom");

const peopleError = document.querySelector(".input-data--error");

const btnReset = document.querySelector(".output-reset");

let billAmount = 0;

let customTip = 0;
let tipPercent;

let noOfPeople;

let tipPerPerson = 0;
let billPerPerson = 0;

function showError(errorMsg, errorBox) {
  errorMsg.style.opacity = 1;
  errorBox.classList.add("displayError");
}

function removeError(errorMsg, errorBox) {
  errorMsg.style.opacity = 0;
  errorBox.classList.remove("displayError");
}

validatePeopleValue = () => {
  if (peopleValue.value === "" || peopleValue.value === 0) {
    showError(peopleError, peopleValue);
  } else noOfPeople = peopleValue.value;
  return noOfPeople;
};

function calcTipPerPerson() {
  billAmount = billValue.value;

  if (validatePeopleValue()) {
    removeError(peopleError, peopleValue);
    tipPerPerson = (billAmount * tipPercent) / noOfPeople;
    displayTipAmount.innerText = tipPerPerson.toFixed(2);
    btnReset.classList.add("active");
  }
}

function calcTotalBillPerPerson() {
  billAmount = billValue.value;

  if (validatePeopleValue()) {
    removeError(peopleError, peopleValue);
    billPerPerson = billAmount / noOfPeople + tipPerPerson;
    displayTotalAmount.innerText = billPerPerson.toFixed(2);
    btnReset.classList.add("active");
  }
}

function customTipInput() {
  customTipValue.addEventListener("change", function () {
    customTip = customTipValue.value;
    tipPercent = parseFloat(customTip / 100);

    calcTipPerPerson();
    calcTotalBillPerPerson();

    // return customTip;
  });
}

peopleValue.addEventListener("change", function () {
  calcTipPerPerson();
  calcTotalBillPerPerson();
});

tipValue.forEach((btn) => {
  // customTip = customTipValue.value;
  btn.addEventListener("click", function (e) {
    const id = e.target.dataset.id;

    if (id !== "custom") {
      tipPercent = parseFloat(id / 100);
      customTipValue.value = "";
    } else {
      customTipInput();
    }

    calcTipPerPerson();
    calcTotalBillPerPerson();

    tipValue.forEach(function (btn) {
      btn.classList.remove("active");
    });
    if (btn.dataset.id !== "custom") btn.classList.add("active");
  });
});

btnReset.addEventListener("click", function () {
  billAmount = 0;

  customTip = 0;
  tipPercent = "";

  noOfPeople = "";

  tipPerPerson = 0;
  billPerPerson = 0;
});
