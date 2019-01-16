'use strict';

// Array of open hours that I can loop through; has global scope
var openHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

// Create variables to use for accessing elements by ID
var firstAndPikeUl = document.getElementById('firstandpike');
var seatacUl = document.getElementById('seatac');
var seattleCtrUl = document.getElementById('seattlectr');
var capHillUl = document.getElementById('caphill');
var alkiUl = document.getElementById('alki');

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

// Global array of all CookieStand objects
var allCookieStands = [];

// Access the table on the DOM; global variable
var dailyTotalsTable = document.getElementById('dailytotaltable');

function CookieStand(locationName, minCustomers, maxCustomers, avgCookiesEachSale, locationElement) {
    this.locationName = locationName;
    this.minCustomers = minCustomers;
    this.maxCustomers = maxCustomers;
    this.avgCookiesEachSale = avgCookiesEachSale;
    this.locationElement = locationElement;
    this.cookiesSoldEachHour = [];
    this.totalCookiesSold = 0;
    allCookieStands.push(this);
}

CookieStand.prototype.render = function() {
    for (var i = 0; i < openHours.length; i++) {
        var randCustNum = getRandomInt(this.minCustomers,this.maxCustomers);
        var cookiesEachHr = Math.ceil(cookiesSoldPerHr(randCustNum,this.avgCookiesEachSale));
        this.cookiesSoldEachHour.push(cookiesEachHr);
        
        this.totalCookiesSold += this.cookiesSoldEachHour[i]; // Counter for summing total of cookies sold

        var liEl = document.createElement('li'); // 1. Create element to hold the data
        liEl.textContent = `${openHours[i]}: ${this.cookiesSoldEachHour[i]} cookies`; // 2. Assign the data to the element
        this.locationElement.appendChild(liEl); // 3. Put the element into the DOM
    }
    console.log(`Total cookies for day at ${this.locationName}: ${this.totalCookiesSold}`)

    // Generate HTML list items for total no. of cookies sold per day and add to DOM
    var liElForTotal = document.createElement('li'); // 1. Create element to hold the data
    liElForTotal.textContent = `Total: ${this.totalCookiesSold} cookies`; // 2. Assign the data to the element
    this.locationElement.appendChild(liElForTotal); // 3. Put the element into the DOM
    // return // Actually need a return stmt??
};

// Create instances of CookieStand object // Could actually omit the "var <name> =" part; unnecessary as these obj instances are 
var firstAndPikeStand = new CookieStand('1st and Pike', 23, 65, 6.3, firstAndPikeUl);
var seaTacAirportStand = new CookieStand('SeaTac Airport', 3, 24, 1.2, seatacUl);
var seattleCenterStand = new CookieStand('Seattle Center', 11, 38, 3.7, seattleCtrUl);
var capitolHillStand = new CookieStand('Capitol Hill', 20, 38, 2.3, capHillUl);
var alkiStand = new CookieStand('Alki', 2, 16, 4.6, alkiUl);

// Log table to console
console.table(allCookieStands);


// 1st table function: make header row
function makeHeaderRow() {
    // Create element for header row
    var trElmnt = document.createElement('tr');
    var thEl = document.createElement('th');
    thEl.textContent = 'Stand Location'; // Or empty string for first header column
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
    dailyTotalsTable.appendChild(trElmnt); // Needs to be done for *every row*?
}

// 2nd table function: make rows for table body content
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

    // Set counter for total of totals
    var totalOfTotals = 0; // outside outer loop so doesn't reset to 0 with each loop iteration
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

// Single function to render all individual locations
function renderAllCookieStands() {
    for (var i = 0; i < allCookieStands.length; i++) {
        allCookieStands[i].tablify();
    }
}

function invokeConstructor() {
    for (var i = 0; i < allCookieStands.length; i++) {
        allCookieStands[i].render();
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

// Console log contents of array of object instances
console.log(allCookieStands);
