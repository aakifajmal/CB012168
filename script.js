document.addEventListener("DOMContentLoaded", function () {
  localStorage.clear();
  localStorage.setItem("totalHours", 1);
  localStorage.setItem("normalHours", 1);
  localStorage.setItem("FAC", "$10");
  localStorage.setItem("ticketcountForeigner Adult", "1");
  getTotalCharges();

  const currentDate = new Date();
  let selectedDate = null;
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const currentMonthElement = document.getElementById("currentMonth");
  const calendarDaysElement = document.getElementById("calendarDays");
  const selectedDateElement = document.getElementById("currentDate");

  renderCalendar(currentMonth, currentYear);

  function renderCalendar(month, year) {
    currentMonthElement.innerHTML = `${getMonthName(month)} ${year}`;
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const prevMonthDays = new Date(year, month, 0).getDate();
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    calendarDaysElement.innerHTML = "";

    for (let i = startingDay; i > 0; i--) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.classList.add("faded");
      dayElement.textContent = prevMonthDays - i + 1;
      calendarDaysElement.appendChild(dayElement);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.textContent = i;

      dayElement.addEventListener("click", () => {
      const currentDate = new Date();
      const selectedDateObj = new Date(year, month, i);

      // Compare selected date with current date
      if (selectedDateObj >= currentDate) {
        if (selectedDate) {
          selectedDate.classList.remove("selected");
        }
        selectedDate = dayElement;
        selectedDate.classList.add("selected");
        saveSelectedDateToLocalStorage(i, month, year);
        displaySelectedDate();
      }
    });

    calendarDaysElement.appendChild(dayElement);
      // Automatically select the current date on page load
      const currentDate = new Date();
      if (
        currentDate.getDate() === i &&
        currentDate.getMonth() === month &&
        currentDate.getFullYear() === year
      ) {
        dayElement.click();
      }
    }
  }

  function getMonthName(month) {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    return months[month];
  }

  function saveSelectedDateToLocalStorage(day, month, year) {
    const selectedDateObj = {
      day: day,
      month: month,
      year: year
    };
    localStorage.setItem("selectedDate", JSON.stringify(selectedDateObj));
  }

  function displaySelectedDate() {
    const selectedDateObj = JSON.parse(localStorage.getItem("selectedDate"));
    if (selectedDateObj) {
      const { day, month, year } = selectedDateObj;
      const formattedDate = `${padNumber(day)}/${padNumber(month + 1)}/${year}`;
      selectedDateElement.textContent = formattedDate;
    }
  }
  
  function padNumber(number) {
    return number.toString().padStart(2, "0");
  }
  

  prevButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
    displaySelectedDate();
  });

  nextButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
    displaySelectedDate();
  });

  // Display the selected date on page load
  displaySelectedDate();
});


//Selection 

  $(document).ready(function () {

    $("#duration").select2();

    $("#duration").on("change", function () {
      var selectedOptions = $(this).find("option:selected");
      var selectedTimes = [];
  
      selectedOptions.each(function () {
          var timeRange = $(this).text();
          selectedTimes.push(timeRange);
      });
  
      if (selectedTimes.length > 0) {
          var combinedTimeRange = combineTimeRanges(selectedTimes);
          updateSummaryTime(combinedTimeRange);
  
          // Calculate the total hours and peak hours
          var totalHours = calculateTotalHours(selectedOptions);
          var peakHours = countPeakHours(selectedOptions);
  
          updateDurationRow(totalHours, peakHours);
          updatenewcharge()


      } else {
          // when no options are selected
          updateSummaryTime("N/A");
          updateDurationRow(0, 0);
          updatenewcharge()

      }

      // getTotalCharges();
      

  });
  

    function combineTimeRanges(timeRanges) {
        var startTime = timeRanges[0].split(" - ")[0];
        var endTime = timeRanges[timeRanges.length - 1].split(" - ")[1];
        return startTime + " - " + endTime;
    }

    function updateSummaryTime(combinedTimeRange) {
        var summaryTable = document.getElementById("Summarytable");
        var timeRow = summaryTable.rows[1]; // since "Time" row is the second row

        var timeCell = timeRow.cells[1];
        timeCell.innerText = combinedTimeRange;
    }

});


function calculateTotalHours(selectedOptions) {
  var totalHours = 0;
  selectedOptions.each(function () {
      var timeRange = $(this).text();
      var startTime = parseInt(timeRange.split("-")[0]);
      var endTime = parseInt(timeRange.split("-")[1]);
      totalHours += endTime - startTime;
      localStorage.setItem("totalHours", totalHours);
  });
  return totalHours;
}

function countPeakHours(selectedOptions) {
  var peakHours = 0;
  selectedOptions.each(function () {
      var optionValue = parseInt($(this).val());
      if ([4, 5, 6, 9, 10, 11].includes(optionValue)) {
          peakHours++;
      }
      localStorage.setItem("peakHours", peakHours);
  });
  return peakHours; 
}

function updateDurationRow(totalHours, peakHours) {
  var selectedDurationCell = document.getElementById("selectedDuration");
  var normalHours = totalHours - peakHours;
  var durationText = `${totalHours} hrs ( ${normalHours < 10 ? "0" + normalHours : normalHours} Normal : ${peakHours < 10 ? "0" + peakHours : peakHours} Peak)`;
  selectedDurationCell.textContent = durationText;

  localStorage.setItem("selectedDuration", durationText);
  localStorage.setItem("normalHours", normalHours);

  // getTotalCharges();

}



  //Tickets buttons and table
  window.addEventListener("load", init);

  function init(){
    const todayDate = document.getElementById("currentDate");
    const tdate = new Date();
    todayDate.innerText = tdate.toLocaleDateString();
  }

  let paragraphID;

  const STable = document.getElementById("Summarytable");

const minusButtons = document.querySelectorAll(".minus-btn");

      minusButtons.forEach(button => {
          button.addEventListener("click", () => {
              const parentDiv = button.parentNode;
              const paragraphTag = parentDiv.querySelector("span");
              paragraphID = paragraphTag.id;
              console.log(paragraphID);

              const sparentDiv = button.parentNode.parentNode;
              const categoryNameElement = sparentDiv.querySelector('p');
              const categoryName = categoryNameElement.textContent.trim();
              console.log(categoryName);

              decreaseCount();
              localStorage.setItem(`ticketcount${categoryName}` , paragraphTag.innerText);
              updateSummaryTable(categoryName);
              getTotalCharges();
          });
      });

const plusButtons = document.querySelectorAll(".plus-btn");

      plusButtons.forEach(button => {
          button.addEventListener("click", () => {
              const parentDiv = button.parentNode;
              const paragraphTag = parentDiv.querySelector("span");
              paragraphID = paragraphTag.id;
              console.log(paragraphID);

              const sparentDiv = button.parentNode.parentNode;
              const categoryNameElement = sparentDiv.querySelector('p');
              const categoryName = categoryNameElement.textContent.trim();
              console.log(categoryName);

              increaseCount();
              localStorage.setItem(`ticketcount${categoryName}` , paragraphTag.innerText);
              updateSummaryTable(categoryName);
              getTotalCharges();
          });
      });

function decreaseCount() {
  if (parseInt(window[paragraphID].innerText) > 0) {
    window[paragraphID].innerText = parseInt(window[paragraphID].innerText) - 1;
  }
}

function increaseCount() {
  window[paragraphID].innerText = parseInt(window[paragraphID].innerText) + 1;
}

function updateSummaryTable(categoryName) {
  const summaryTable = document.getElementById("Summarytable");
  const rows = summaryTable.querySelectorAll("tr");
  let foundRow = null;

  // Look for an existing row with the given categoryName
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    const span = cells[0].querySelector("span");
    if (cells.length === 2 && span && span.textContent === categoryName) {
      foundRow = row;
      break;
    }
  }

  const ticketCount = parseInt(window[paragraphID].innerText);

  if(ticketCount > 0){

      if (foundRow) {
            // If a row exists, update the charge
            const charge = calculateCharge(categoryName, ticketCount);
            const updatedcategoryName = ticketCount + ` <span>${categoryName}</span>`;
            foundRow.cells[1].innerText = charge;
            foundRow.cells[0].innerHTML = updatedcategoryName;
        } else {
            // If no row exists, add a new row before the Total Payable row
            const newRow = summaryTable.insertRow(rows.length - 1);
            const categoryCell = newRow.insertCell(0);
            const chargeCell = newRow.insertCell(1);
            
            categoryCell.innerHTML = ticketCount + ` <span>${categoryName}</span>` ;
            const charge = calculateCharge(categoryName, ticketCount);
            chargeCell.innerText = charge;
        }
      }  else {
            // Remove the row if ticketCount is zero
            const charge = calculateCharge(categoryName, ticketCount);
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const cells = row.getElementsByTagName("td");
          if (cells.length === 2) {
            const span = cells[0].querySelector("span");
            if (span && span.textContent === categoryName) {
              summaryTable.deleteRow(i);
              break;
            }
          }
        }
      }
    }

function calculateCharge(categoryName, ticketCount) {
  const normalHours = localStorage.getItem("normalHours");
  const peakHours = localStorage.getItem("peakHours");
  if (categoryName === "Foreigner Adult") {
      let FAC = "$" + (((normalHours * 10)+(peakHours * 13)) * ticketCount);
      localStorage.setItem("FAC" , FAC);
      console.log(FAC);
      return FAC;
  } else if (categoryName === "Foreigner Child") {
    let FCC = "$" + (((normalHours * 5)+(peakHours * 8)) * ticketCount);
    localStorage.setItem("FCC" , FCC);
    return FCC;
  } else if (categoryName === "SL Adult") {
    let SLAC = "$" + (((normalHours * 4)+(peakHours * 6)) * ticketCount);
    localStorage.setItem("SLAC" , SLAC);
    return SLAC;
  } else if (categoryName === "SL Child") {
    let SLCC = "$" + (((normalHours * 2)+(peakHours * 3)) * ticketCount);
    localStorage.setItem("SLCC" , SLCC);
    return SLCC;
  } else {
    return "Free"
  }
  
}

function updatenewcharge() {
  const summaryTable = document.getElementById("Summarytable");
  const rows = summaryTable.querySelectorAll("tr");

  rows.forEach(row => {
    const cells = row.getElementsByTagName("td");
    if (cells.length === 2) {
      const span = cells[0].querySelector("span");
      

      // Check if the span element exists before proceeding
      if (span) {
        const categoryName = span.textContent.trim();
        
        // Retrieve the ticket count from localStorage
        const ticketCountKey = `ticketcount${categoryName}`;
        const ticketCount = parseInt(localStorage.getItem(ticketCountKey));

        // Calculate the charge using the retrieved ticket count
        const charge = calculateCharge(categoryName, ticketCount);
        cells[1].innerText = charge;
      }
    }
  });

  getTotalCharges();
}




function getTotalCharges() {
  const FAC = localStorage.getItem("FAC");
  const FCC = localStorage.getItem("FCC");
  const SLAC = localStorage.getItem("SLAC");
  const SLCC = localStorage.getItem("SLCC");

  const totalCharges = (
    (FAC ? parseFloat(FAC.substring(1)) : 0) +
    (FCC ? parseFloat(FCC.substring(1)) : 0) +
    (SLAC ? parseFloat(SLAC.substring(1)) : 0) +
    (SLCC ? parseFloat(SLCC.substring(1)) : 0)
  );

  console.log(totalCharges);

  const totalPayableCell = document.getElementById("totalPayableCharge");
  totalPayableCell.textContent = "$" + totalCharges;

  localStorage.setItem("totalPayable", totalPayableCell.textContent);
}








const timerange = document.getElementById("selectedTime");
const btncont = document.getElementById("continuebtn");
btncont.addEventListener("click", ()=>{
    let summaryTable = document.getElementById("Summarytable");
    localStorage.setItem("summaryTable" , summaryTable.innerHTML);
    localStorage.setItem("time" , timerange.innerText)
    window.location.href = "details.html"
  });
