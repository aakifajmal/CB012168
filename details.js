//Load Date from local storage

window.addEventListener("load", displaySelectedDateandUpdateTable);

const selectedDateElement = document.getElementById("currentDate");

function displaySelectedDateandUpdateTable() {
    const selectedDateObj = JSON.parse(localStorage.getItem("selectedDate"));
    if (selectedDateObj) {
      const { day, month, year } = selectedDateObj;
      const formattedDate = `${padNumber(day)}/${padNumber(month + 1)}/${year}`;
      selectedDateElement.textContent = formattedDate;
    }

    let summaryTable = document.getElementById("Summarytable");
    const storedTableContent = localStorage.getItem("summaryTable");
    summaryTable.innerHTML = storedTableContent;
    
  }

function padNumber(number) {
    return number.toString().padStart(2, "0");
    
}

// Function to update the selected dial code
function updateSelectedDialCode() {
    // Find the selected country element with class "iti__active"
    const selectedCountryElement = document.querySelector('.iti__active');

    if (selectedCountryElement) {
        // Extract the dial code from the selected element
        const dialCodeElement = selectedCountryElement.querySelector('.iti__dial-code');
        const selectedDialCode = dialCodeElement ? dialCodeElement.textContent : null;

        // Display the selected dial code (without plus symbol) in the input
        const inputElement = document.getElementById('MobileNum');
        if (inputElement) {
            inputElement.value = selectedDialCode.replace('+', ''); // Remove plus symbol and set dial code as the new input value
        }
    }
}

// Initial update when the page loads
updateSelectedDialCode();

// Set up an event listener for changes in the selected country
document.addEventListener('click', function(event) {
    const targetElement = event.target;

    // Check if the clicked element is part of the country list
    if (targetElement.closest('.iti__country')) {
        // Clear the input field and update the selected dial code
        const inputElement = document.getElementById('MobileNum');
        if (inputElement) {
            inputElement.value = ''; // Clear the input field
            setTimeout(updateSelectedDialCode, 100); // Update the selected dial code after clearing
        }
    }
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////

const FullName = document.getElementById("FullName");
const Email = document.getElementById("Email");
const MobileNum = document.getElementById("MobileNum");
const ConfirmEmail = document.getElementById("ConfirmEmail");
const Gender = document.getElementById("Gender");
const form = document.getElementById("myForm");
var flag = document.getElementById("flag");

var selectedValue = flag.value; 

console.log('Selected value:', selectedValue);

flag.addEventListener("select", () => {
    var selectedValue = flag.value; 

console.log('Selected value:', selectedValue);
  });
const Contbtn = document.getElementById("continuebtn");

// Add input event listener to each input field separately
FullName.addEventListener("input", () => {
    validateFullName();
    validateForm();
});

Email.addEventListener("input", () => {
    validateEmail();
    validateForm();


    
});

MobileNum.addEventListener("input", () => {
    validateMobileNum();
    validateForm();
});

ConfirmEmail.addEventListener("input", () => {
    validateConfirmEmail();
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

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateFullName = () => {
    const FullNameValue = FullName.value.trim();
    const FullNameRegex = /^[A-Za-z ]+$/;


    if (FullNameValue === '') {
        setError(FullName, 'Full Name is required');
    } else if(!FullNameRegex.test(FullNameValue)) {
        setError(FullName, 'Invalid (Use only alphabetic characters and spaces)');
    } else {
        setSuccess(FullName);
    }
};

const validateEmail = () => {
    const EmailValue = Email.value.trim();

    if (EmailValue === '') {
        setError(Email, 'Email is required');
    } else if (!isValidEmail(EmailValue)) {
        setError(Email, 'Provide a valid email address');
    } else {
        setSuccess(Email);
    }
};

const validateConfirmEmail = () => {
    const ConfirmEmailValue = ConfirmEmail.value.trim();
    const EmailValue = Email.value.trim();

    if (ConfirmEmailValue === '') {
        setError(ConfirmEmail, 'Please confirm your email');
    } else if (ConfirmEmailValue !== EmailValue) {
        setError(ConfirmEmail, 'Emails must match.')
    } else {
        setSuccess(ConfirmEmail);
    }
};

const validateMobileNum = () => {
    const MobileNumValue = MobileNum.value.trim();

    if (MobileNumValue === '') {
        setError(MobileNum, 'Mobile number is required');
    } else if (MobileNumValue.length < 9 || MobileNumValue.length > 15) {
        setError(MobileNum, 'Enter a valid phone number');
    } else {
        setSuccess(MobileNum);
    }
};


const validateForm = () => {
    const allFieldsValid = (
        FullName.parentElement.classList.contains('success') &&
        Email.parentElement.classList.contains('success') &&
        ConfirmEmail.parentElement.classList.contains('success') &&
        MobileNum.parentElement.classList.contains('success')
    );

    Contbtn.disabled = !allFieldsValid;
};

Contbtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("FullName", FullName.value);
    localStorage.setItem("Email", Email.value);
    localStorage.setItem("MobileNum", MobileNum.value);
    localStorage.setItem("Gender", Gender.value);
    window.location.href = './payment.html';
});

Contbtn.addEventListener("click", () => {
    let summaryTable = document.getElementById("Summarytable");
    let rows = summaryTable.getElementsByTagName("tr");
    
    // let partialTable = document.createElement("table");
    let tbody = document.createElement("tbody");
    
    for (let i = 3; i < rows.length; i++) { // Start from the 4th row
      let newRow = document.createElement("tr");
      newRow.innerHTML = rows[i].innerHTML;
      tbody.appendChild(newRow);
    }
    
    // partialTable.appendChild(tbody);
    
    localStorage.setItem("newTable", tbody.innerHTML);
    window.location.href = "payment.html"
  });


