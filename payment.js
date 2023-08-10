window.addEventListener("load", UpdateTableandPayable);

function UpdateTableandPayable(){
    
    let summaryTable = document.getElementById("Summarytable");
    const storedTableContent = localStorage.getItem("summaryTable");
    summaryTable.innerHTML = storedTableContent;
    let totalPayable = document.getElementById("totalPayable");
    totalPayable.innerText = localStorage.getItem("totalPayable");
}

const Cardnum = document.getElementById("Cardnum");
const exdate = document.getElementById("exdate");
const CVV = document.getElementById("CVV");
const Cardname = document.getElementById("Cardname");
const form = document.getElementById("myForm");

const Contbtn = document.getElementById("continuebtn");

Cardnum.addEventListener("input", () => {
    validateCardNumber();
    validateForm();
});

exdate.addEventListener("input", () => {
    validateExpiryDate();
    validateForm();
});

CVV.addEventListener("input", () => {
    validateCVV();
    validateForm();
});

Cardname.addEventListener("input", () => {
    validateCardName();
    validateForm();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateCardNumber = () => {
    const value = Cardnum.value.trim();
    const cardNumRegex = /^[0-9]+$/;


    if (value === '') {
        setError(Cardnum, 'Card Number is required');
    } else if (!cardNumRegex.test(value)) {
        setError(Cardnum, 'Invalid Card Number');
    } else if (value.length !== 16) {
        setError(Cardnum, 'Card Number must contain 16 digits');
    } else {
        setSuccess(Cardnum);
    }
};

const validateExpiryDate = () => {
    const value = exdate.value.trim();
    // Expiry date validation rule: Check if the date is in the future and matches MM/YY format
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const currentDate = new Date();
    const [enteredMonth, enteredYear] = value.split('/').map(item => parseInt(item, 10));
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (value === '') {
        setError(exdate, 'Expiry Date is required');
    } else if (!expiryDateRegex.test(value)) {
        setError(exdate, 'Invalid Expiry Date (use MM/YY format)');
    } else if (enteredYear < currentYear || (enteredYear === currentYear && enteredMonth < currentMonth)) {
        setError(exdate, 'Card has expired');
    } else {
        setSuccess(exdate);
    }
};

const validateCVV = () => {
    const value = CVV.value.trim();
    const cvvRegex = /^[0-9]+$/;


    if (value === '') {
        setError(CVV, 'CVV is required');
    } else if (!cvvRegex.test(value)) {
        setError(CVV, 'Invalid CVV');
    } else if (value.length !== 3) {
        setError(CVV, 'Invalid CVV');
    } else {
        setSuccess(CVV);
    }
};

const validateCardName = () => {
    const value = Cardname.value.trim();
    // Card name validation rule: Only alphabetic characters and spaces
    const cardNameRegex = /^[A-Za-z ]+$/;

    if (value === '') {
        setError(Cardname, 'Card Name is required');
    } else if (!cardNameRegex.test(value)) {
        setError(Cardname, 'Invalid Card Name (use only alphabetic characters and spaces)');
    } else {
        setSuccess(Cardname);
    }
};

const validateForm = () => {
    const allFieldsValid = (
        Cardnum.parentElement.classList.contains('success') &&
        exdate.parentElement.classList.contains('success') &&
        CVV.parentElement.classList.contains('success') &&
        Cardname.parentElement.classList.contains('success')
    );

    Contbtn.disabled = !allFieldsValid;
};

Contbtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = './confirmation.html';
});

