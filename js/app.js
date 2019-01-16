'use strict';

// Create array of open hours that I can loop through; has global scope
var openHrs = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

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

var allCookieStands = [];

// Access the table on the DOM
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
    for (var i = 0; i < openHrs.length; i++) {
        var randCustNum = getRandomInt(this.minCustomers,this.maxCustomers);
        // console.log(`Number of customers this hour: ${randCustNum}`);
        var cookiesHr = Math.ceil(cookiesSoldPerHr(randCustNum,this.avgCookiesEachSale));
        this.cookiesSoldEachHour.push(cookiesHr);
        
        // Counter for summing total of cookies sold
        this.totalCookiesSold += this.cookiesSoldEachHour[i];
        console.log(`Running total of cookies: ${this.totalCookiesSold}`)

        var liEl = document.createElement('li'); // 1. Create element to hold the data
        liEl.textContent = `${openHrs[i]}: ${this.cookiesSoldEachHour[i]} cookies`; // 2. Assign the data to the element
        this.locationElement.appendChild(liEl); // 3. Put the element into the DOM
    }
    console.log(`Total cookies for day at ${this.locationName}: ${this.totalCookiesSold}`)

    // Generate HTML list items for total no. of cookies sold per day and add to DOM
    var liElForTotal = document.createElement('li'); // 1. Create element to hold the data
    liElForTotal.textContent = `Total: ${this.totalCookiesSold} cookies`; // 2. Assign the data to the element
    this.locationElement.appendChild(liElForTotal); // 3. Put the element into the DOM
    return // Actually need a return stmt??
};

// Create instances of CookieStand object
var firstAndPikeStand = new CookieStand('1st and Pike', 23, 65, 6.3, firstAndPikeUl);
var seaTacAirportStand = new CookieStand('SeaTac Airport', 3, 24, 1.2, seatacUl);
var seattleCenterStand = new CookieStand('Seattle Center', 11, 38, 3.7, seattleCtrUl);
var capitolHillStand = new CookieStand('Capitol Hill', 20, 38, 2.3, capHillUl);
var alkiStand = new CookieStand('Alki', 2, 16, 4.6, alkiUl);

// Log table to console
console.table(allCookieStands);

// Define method to tablify data 
CookieStand.prototype.tablify = function() {
    // make tr

    // create, content, append for 
};

function makeHeaderRow() {
    var trElmnt = document.createElement('tr');
    var thEl = document.createElement('th');
    thEl.textContent = ''; // Empty string for first header column?
    trElmnt.appendChild(thEl);
    
    // Inside for loop?
    for (var i = 0; i < openHrs.length; i++) {
        thEl.textContent = document.createElement('th'); // Needs to be contents of openHrs array
        thEl.textContent = openHrs[i];
        trElmnt.appendChild(thEl);
    }

    dailyTotalsTable.appendChild(trElmnt); // Need one of these inside for loop at end of loop?
}


// Call "render" method on instances of CookieStand object; made obsolete by renderAllCoolieStands function
// firstAndPikeStand.render();
// seaTacAirportStand.render();
// seattleCenterStand.render();
// capitolHillStand.render();
// alkiStand.render();

// Nice single function to render all individuual locations
function renderAllCookieStands() {
    for (var i = 0; i < allCookieStands.length; i++) {
        allCookieStands[i].tablify();
    }
}

// Call function to make header row
makeHeaderRow();
// Call function to render all individual locations stored in array
renderAllCookieStands();
// Make separate function similar to makeHeaderRow for footer?

// Console log contents of array of object instances
console.log(allCookieStands);
