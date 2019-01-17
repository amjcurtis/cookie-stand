'use strict';

// Array of open hours that I can loop through; has global scope
var openHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

// GLOBAL VARIABLES FOR DOM ACCESS
var salesForm = document.getElementById('sales-form');
var clearSalesForm = document.getElementById('clear-sales-form');
var dailyTotalsTable = document.getElementById('dailytotalstable');
var allFormSubmissions = [];
// Global array of all CookieStand objects
var allCookieStands = [];

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FORM SUBMISSION FUNCTION DECLARATIONS

// DON'T NEED THIS RENDER FUNCTION; ALREADY GOT THIS BELOW WITH renderAllCookieStands FUNCTION
// Function that goes thru array of form inputs (?) and calls rendering method on each
// function renderAllInputs() {
//     dailyTotalsTable// We want to add row to table here

//     for (var i = 0; i < allFormSubmissions.length; i++) {
//         dailyTotalsTable.appendChild(allFormSubmissions[i].tablify());
//     }
// }

// Event handler function for submission of new locations
function handleFormSubmission(event) {
    // console.log('log of the event object', event);
    // console.log('log of the event.target', event.target);
    // console.log('log of the event.target.name', event.target.name);
    console.log(event.target.name.value);

    event.preventDefault(); // Prevents page reload on a "submit" event
    var locationName = event.target.name.value;
    var minCustomers = parseInt(event.target.min.value);
    var maxCustomers = parseInt(event.target.max.value);
    var avgCookiesEachSale = parseInt(event.target.avg.value);
    new CookieStand(locationName, minCustomers, maxCustomers, avgCookiesEachSale);
    dailyTotalsTable.textContent = [];

    /*
    // Validation to prevent empty form fields; check out HTML5 form validation for better way
    if (!event.target.name.value ||
        !event.target.min.value ||
        !event.target.max.value ||
        !event.target.avg.value) {
        return alert('Fields cannot be empty!')
    }
*/

    var newSubmission = new CookieStand(locationName, minCustomers, maxCustomers, avgCookiesEachSale); 
    console.log('This is the CookieStand instance:', newSubmission);

    console.log('Pat added ' + event.target.name.value + ' at ' + Date());

    // Empty form fields after data has been grabbed
    event.target.name.value = null;
    event.target.min.value = null;
    event.target.max.value = null;
    event.target.avg.value = null;

    allFormSubmissions.unshift(newSubmission);
    renderAllInputs();
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Event listener for submission of form
salesForm.addEventListener('submit', handleFormSubmission);

// Event listener for "Clear sales form" button
clearSalesForm.addEventListener('click', function() {

    console.log('You\'ve cleared the form!');
    allFormSubmissions = [];
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// COOKIE STAND FUNCTION DECLARATIONS

// Generate number btwn two values (learned from MDN doc on Math.random())
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The max is exclus and the min is inclus
}

// Calc num of cookies sold per hour
function cookiesSoldPerHr(custs, cookies) { // 1st param is rand no. of customers, 2nd param is avg no. of cookies per sale
    var cookiesPerHr = custs * cookies;
    return cookiesPerHr;
}

// Constructor function for CookieStand object
function CookieStand(locationName, minCustomers, maxCustomers, avgCookiesEachSale) {
    this.locationName = locationName;
    this.minCustomers = minCustomers;
    this.maxCustomers = maxCustomers;
    this.avgCookiesEachSale = avgCookiesEachSale;
    this.cookiesSoldEachHour = [];
    this.totalCookiesSold = 0;
    allCookieStands.push(this);
}

// Calc cookies sold each hour per each object
CookieStand.prototype.calcCookiesSoldHourly = function() {
    for (var i = 0; i < openHours.length; i++) {
        var randCustNum = getRandomInt(this.minCustomers,this.maxCustomers);
        var cookiesEachHr = Math.ceil(cookiesSoldPerHr(randCustNum,this.avgCookiesEachSale));
        this.cookiesSoldEachHour.push(cookiesEachHr);
        this.totalCookiesSold += this.cookiesSoldEachHour[i]; // Counter for summing total of cookies sold
    }
};

// Create instances of CookieStand object // Could actually omit the "var <name> =" part
var firstAndPikeStand = new CookieStand('1st and Pike', 23, 65, 6.3);
var seaTacAirportStand = new CookieStand('SeaTac Airport', 3, 24, 1.2);
var seattleCenterStand = new CookieStand('Seattle Center', 11, 38, 3.7);
var capitolHillStand = new CookieStand('Capitol Hill', 20, 38, 2.3);
var alkiStand = new CookieStand('Alki', 2, 16, 4.6);

// Log table to console
console.table(allCookieStands);

// 1st table function: make header row
function makeHeaderRow() {
    // Create element for header row
    var trElmnt = document.createElement('tr');
    var thEl = document.createElement('th');
    thEl.textContent = 'Stand Location';
    trElmnt.appendChild(thEl);
    
    // Add hours via for loop
    for (var i = 0; i < openHours.length; i++) {
        thEl = document.createElement('th');
        thEl.textContent = openHours[i];
        trElmnt.appendChild(thEl);
    }

    // Add "Daily Location Total"
    thEl.textContent = 'Daily Location Total';
    trElmnt.appendChild(thEl);

    // Add to the DOM
    dailyTotalsTable.appendChild(trElmnt); 
}

// 2nd table function: makes a single row for table body content
CookieStand.prototype.tablify = function() {
    // Make element accessing this.locationName
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = this.locationName;
    trEl.appendChild(tdEl);

    // For every hour grab the no. of cookies sold and add to table
    for (var i = 0; i < openHours.length; i++) {
        tdEl = document.createElement('td');
        tdEl.textContent = this.cookiesSoldEachHour[i];
        trEl.appendChild(tdEl);
    }

    // Populate Daily Location Total column
    tdEl.textContent = this.totalCookiesSold;
    trEl.appendChild(tdEl);

    // Add to the DOM
    dailyTotalsTable.appendChild(trEl);
}

// 3rd table function: make footer row
// Can define this as a stand-alone function rather'n a prototype method b/c it just needs to access global arrays: allCookieStands and openHours
function makeFooterRow() {
    var trElmnt = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = 'Totals';
    trElmnt.appendChild(tdEl);

    var totalOfTotals = 0; // Set counter for total of totals outside outer loop so doesn't reset to 0 with each loop iteration
    for (var i = 0; i < openHours.length; i++) { // "Rows" loop

        var totalPerHour = 0; // Set counter for total cookies sold per hour across all stands

        for (var j = 0; j < allCookieStands.length; j++) { // "Columns" loop
            totalPerHour += allCookieStands[j].cookiesSoldEachHour[i];
        }
        totalOfTotals += totalPerHour;
        tdEl = document.createElement('td');
        tdEl.textContent = totalPerHour;
        trElmnt.appendChild(tdEl); 
    }

    // Add up total of daily totals across all cookie stands
    tdEl.textContent = totalOfTotals; 
    console.log(`Total cookies sold across all stores: ${totalOfTotals}`)
    trElmnt.appendChild(tdEl);
    dailyTotalsTable.appendChild(trElmnt); // Add to the DOM 
}

// Single function to render a row in table for *each* *individual* locations
function renderAllCookieStands() {
    for (var i = 0; i < allCookieStands.length; i++) {
        allCookieStands[i].tablify();
    }
}

function invokeConstructor() {  // SHOULD MERGE THIS INTO SAME renderAllCookieStands FUNCTION AS IS USED TO tablify THE INSTANCES? THE LOGIC IN THAT FUNCTION AND THIS ONE ARE THE SAME...BUT DOES PROPER CONTROL FLOW REQUIRE THIS NOT BE DONE?
    for (var i = 0; i < allCookieStands.length; i++) {
        allCookieStands[i].calcCookiesSoldHourly();
    }
}

// Calls (in proper order) all my function calls for creating and populating the table
function pageLoad() {
    invokeConstructor();
    makeHeaderRow();
    renderAllCookieStands();
    makeFooterRow();
}

// Call pageLoad function that calls "render" on all object instances and also calls all 3 table functions
pageLoad();
