const tname = document.getElementById("tname")
const tdate = document.getElementById("tdate")
const tmobile = document.getElementById("tmobile")
const temail = document.getElementById("temail")
const tgender = document.getElementById("tgender")
const tduration = document.getElementById("tduration")
const ttime = document.getElementById("ttime")

window.addEventListener("load", init);

function init(){
    tname.innerText = localStorage.getItem("FullName")
    temail.innerText = localStorage.getItem("Email")
    let tmobilevalue = localStorage.getItem("MobileNum")
    tmobile.innerText = `+` + tmobilevalue;
    tgender.innerText = localStorage.getItem("Gender")
    tduration.innerText = localStorage.getItem("selectedDuration")
    ttime.innerText = localStorage.getItem("time")
}

const selectedDateObj = JSON.parse(localStorage.getItem("selectedDate"));

if (selectedDateObj) {
    const { day, month, year } = selectedDateObj;
    const formattedDate = `${padNumber(day)}/${padNumber(month + 1)}/${year}`;
    tdate.innerText = formattedDate;
}

function padNumber(number) {
    return number.toString().padStart(2, "0");
}

window.addEventListener("load",load_sumtble)

function load_sumtble(){
    let summaryTable = document.getElementById("confirmtable");
    const storedTableContent = localStorage.getItem("newTable");
    summaryTable.innerHTML += storedTableContent;
}