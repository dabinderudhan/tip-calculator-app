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
let tipPercent = 0;
let noOfPeople = (peopleValue.value = 1);
let tipPerPerson = 0;
let billPerPerson = 0;

// this function will show error
function showError(errorMsg, errorBox) {
  errorMsg.style.opacity = 1;
  errorBox.classList.add("displayError");
}

// this function will remove error
function removeError(errorMsg, errorBox) {
  errorMsg.style.opacity = 0;
  errorBox.classList.remove("displayError");
}

// this function will calculate tip per person and will display Tip amount per person.
function calcTipPerPerson() {
  billAmount = billValue.value;

  tipPerPerson = (billAmount * tipPercent) / noOfPeople;
  displayTipAmount.innerText = tipPerPerson.toFixed(2);
  btnReset.classList.add("active");
}

// this function will calculate bill per person and will display bill amount per person.
function calcTotalBillPerPerson() {
  billAmount = billValue.value;

  billPerPerson = billAmount / noOfPeople + tipPerPerson;
  displayTotalAmount.innerText = billPerPerson.toFixed(2);
  btnReset.classList.add("active");
}

// this function will get the value of the custom button and will calculate the tip and bill per person
function customTipInput() {
  customTipValue.addEventListener("input", function () {
    customTip = customTipValue.value;
    console.log(customTip);

    tipPercent = parseFloat(customTip / 100);
    console.log(tipPercent);

    calcTipPerPerson();
    calcTotalBillPerPerson();
  });
  return tipPercent;
}

peopleValue.addEventListener("input", function () {
  noOfPeople = peopleValue.value;

  if (noOfPeople === "" || noOfPeople === "0") {
    showError(peopleError, peopleValue);
    tipPerPerson = 0;
    billPerPerson = 0;
    displayTipAmount.innerText = tipPerPerson.toFixed(2);
    displayTotalAmount.innerText = billPerPerson.toFixed(2);
  } else {
    calcTipPerPerson();
    calcTotalBillPerPerson();
    removeError(peopleError, peopleValue);
  }
});

tipValue.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const id = e.target.dataset.id;

    if (id !== "custom") {
      tipPercent = parseFloat(id / 100);
      customTipValue.value = "";
    } else {
      customTipInput();
      console.log(customTip);
      console.log(tipPercent);
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
