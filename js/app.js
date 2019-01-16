'use strict';

// Create array of open hours that I can loop through; has global scope
var openHrs = [
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm'
];

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
        console.log(`Number of customers this hour: ${randCustNum}`);
        var cookiesHr = Math.ceil(cookiesSoldPerHr(randCustNum,this.avgCookiesEachSale));
        this.cookiesSoldEachHour.push(cookiesHr);
        
        // Counter for summing total of cookies sold
        this.totalCookiesSold += this.cookiesSoldEachHour[i];
        console.log(`Running total of cookies: ${this.totalCookiesSold}`)

        var liEl = document.createElement('li'); // 1. Create element to hold the data
        liEl.textContent = `${openHrs[i]}: ${this.cookiesSoldEachHour[i]} cookies`; // 2. Assign the data to the element
        this.locationElement.appendChild(liEl); // 3. Put the element into the DOM
    }
    console.log(`TOTAL cookies for day: ${this.totalCookiesSold}`)

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

// Call "render" method on instances of CookieStand object
firstAndPikeStand.render();
console.log(firstAndPikeStand.render);

seaTacAirportStand.render();
console.log(seaTacAirportStand.render);

seattleCenterStand.render();
console.log(seattleCenterStand.render);

capitolHillStand.render();
console.log(capitolHillStand.render);

alkiStand.render();
console.log(alkiStand.render);

// Console log contents of array of object instances
console.log(allCookieStands);
