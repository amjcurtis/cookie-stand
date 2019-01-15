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

function CookieStand(locationName, minCustomers, maxCustomers, avgCookiesEachSale) {
    this.locationName = locationName;
    this.minCustomers = minCustomers;
    this.maxCustomers = maxCustomers;
    this.avgCookiesEachSale = avgCookiesEachSale;
    this.cookiesSoldEachHour = [];
    this.totalCookiesSold = 0;
    allCookieStands.push(this);
}

CookieStand.prototype.render = function() {
    for (var i = 0; i < openHrs.length; i++) {
        var randCustNum = getRandomInt(this.minCust,this.maxCust);
        console.log(`Number of customers this hour: ${randCustNum}`);
        var cookiesHr = Math.ceil(cookiesSoldPerHr(randCustNum,this.avgNumCookiesSale));
        this.hourlySales.push(cookiesHr);
        
        // Counter for summing total of cookies sold
        this.totalCooks += this.hourlySales[i];
        console.log(`Running total of cookies: ${this.totalCooks}`)

        var liEl = document.createElement('li'); // 1. Create element to hold the data
        liEl.textContent = `${openHrs[i]}: ${this.hourlySales[i]} cookies`; // 2. Assign the data to the element
        firstAndPikeUl.appendChild(liEl); // 3. Put the element into the DOM
    }
    console.log(`TOTAL cookies for day: ${this.totalCooks}`)

    // Generate HTML list items for total no. of cookies sold per day and add to DOM
    var liElForTotal = document.createElement('li'); // 1. Create element to hold the data
    liElForTotal.textContent = `Total: ${this.totalCooks} cookies`; // 2. Assign the data to the element
    firstAndPikeUl.appendChild(liElForTotal); // 3. Put the element into the DOM
    return // Actually need a return stmt??
};

// Create instances of CookieStand object
var firstAndPikeStand = new CookieStand('1st and Pike', 23, 65, 6.3);
var seaTacAirportStand = new CookieStand('SeaTac Airport', 3, 24, 1.2);
var seattleCenterStand = new CookieStand('Seattle Center', 11, 38, 3.7);
var capitolHillStand = new CookieStand('Capitol Hill', 20, 38, 2.3);
var alkiStand = new CookieStand('Alki', 2, 16, 4.6);

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



// Location #1
var firstAndPike = {
    location: '1st and Pike',
    minCust: 23,
    maxCust: 65,
    avgNumCookiesSale: 6.3,
    hourlySales: [], // Num of cookies sold per hour
    totalCooks: 0, 
    render: function() {
        for (var i = 0; i < openHrs.length; i++) {
            var randCustNum = getRandomInt(this.minCust,this.maxCust);
            console.log(`Number of customers this hour: ${randCustNum}`);
            var cookiesHr = Math.ceil(cookiesSoldPerHr(randCustNum,this.avgNumCookiesSale));
            this.hourlySales.push(cookiesHr);
            
            // Counter for summing total of cookies sold
            this.totalCooks += this.hourlySales[i];
            console.log(`Running total of cookies: ${this.totalCooks}`)

            var liEl = document.createElement('li'); // 1. Create element to hold the data
            liEl.textContent = `${openHrs[i]}: ${this.hourlySales[i]} cookies`; // 2. Assign the data to the element
            firstAndPikeUl.appendChild(liEl); // 3. Put the element into the DOM
        }
        console.log(`TOTAL cookies for day: ${this.totalCooks}`)

        // Generate HTML list items for total no. of cookies sold per day and add to DOM
        var liElForTotal = document.createElement('li'); // 1. Create element to hold the data
        liElForTotal.textContent = `Total: ${this.totalCooks} cookies`; // 2. Assign the data to the element
        firstAndPikeUl.appendChild(liElForTotal); // 3. Put the element into the DOM
    }

    // ######################################################################################
    // Below is legacy code from my first attempt to 1) generate random num of customers 
    // and 2) calc num of cookies sold per hour. 
    // ######################################################################################
    // getRandCusts: function() { // Generate random number of custs/hr
    //     var randCustNum = getRandomInt(this.minCust,this.maxCust);
    //     return randCustNum;
    // },
    // getAvgCookiesPerHr: function() { // Total 
    //     var avgCookiesHr = cookiesSoldPerHr(this.getRandCusts,this.avgNumCookiesSale);
    //     return avgCookiesHr;
    // }
    
}

// Location #2
var seaTac = {
    location: 'SeaTac Airport',
    minCust: 3,
    maxCust: 24,
    avgNumCookiesSale: 1.2,
    hourlySales: [], // Num of cookies sold per hour
    totalCooks: 0, 
    render: function() {
        for (var i = 0; i < openHrs.length; i++) {
            var randCustNum = getRandomInt(this.minCust,this.maxCust);
            console.log(`Number of customers this hour: ${randCustNum}`);
            var cookiesHr = Math.ceil(cookiesSoldPerHr(randCustNum,this.avgNumCookiesSale));
            this.hourlySales.push(cookiesHr);
            
            // Counter for summing total of cookies sold
            this.totalCooks += this.hourlySales[i];
            console.log(`Running total of cookies: ${this.totalCooks}`)

            var liEl = document.createElement('li');
            liEl.textContent = `${openHrs[i]}: ${this.hourlySales[i]} cookies`;
            seatacUl.appendChild(liEl);
        }
        console.log(`TOTAL cookies for day: ${this.totalCooks}`)

        // Generate HTML list items for total no. of cookies sold per day and add to DOM
        var liElForTotal = document.createElement('li');
        liElForTotal.textContent = `Total: ${this.totalCooks} cookies`;
        seatacUl.appendChild(liElForTotal);    
    }
}

// Location #3
var seattleCtr = {
    location: 'Seattle Center',
    minCust: 11,
    maxCust: 38,
    avgNumCookiesSale: 3.7,
    hourlySales: [], // Num of cookies sold per hour
    totalCooks: 0, 
    render: function() {
        for (var i = 0; i < openHrs.length; i++) {
            var randCustNum = getRandomInt(this.minCust,this.maxCust);
            console.log(`Number of customers this hour: ${randCustNum}`);
            var cookiesHr = Math.ceil(cookiesSoldPerHr(randCustNum,this.avgNumCookiesSale));
            this.hourlySales.push(cookiesHr);
            
            // Counter for summing total of cookies sold
            this.totalCooks += this.hourlySales[i];
            console.log(`Running total of cookies: ${this.totalCooks}`)

            var liEl = document.createElement('li');
            liEl.textContent = `${openHrs[i]}: ${this.hourlySales[i]} cookies`;
            seattleCtrUl.appendChild(liEl);
        }
        console.log(`TOTAL cookies for day: ${this.totalCooks}`)

        // Generate HTML list items for total no. of cookies sold per day and add to DOM
        var liElForTotal = document.createElement('li');
        liElForTotal.textContent = `Total: ${this.totalCooks} cookies`;
        seattleCtrUl.appendChild(liElForTotal);    
    }
}

// Location #4
var capitolHill = {
    location: 'Capitol Hill',
    minCust: 20,
    maxCust: 38,
    avgNumCookiesSale: 2.3,
    hourlySales: [], // Num of cookies sold per hour
    totalCooks: 0, 
    render: function() {
        for (var i = 0; i < openHrs.length; i++) {
            var randCustNum = getRandomInt(this.minCust,this.maxCust);
            console.log(`Number of customers this hour: ${randCustNum}`);
            var cookiesHr = Math.ceil(cookiesSoldPerHr(randCustNum,this.avgNumCookiesSale));
            this.hourlySales.push(cookiesHr);
            
            // Counter for summing total of cookies sold
            this.totalCooks += this.hourlySales[i];
            console.log(`Running total of cookies: ${this.totalCooks}`)

            var liEl = document.createElement('li');
            liEl.textContent = `${openHrs[i]}: ${this.hourlySales[i]} cookies`;
            capHillUl.appendChild(liEl);
        }
        console.log(`TOTAL cookies for day: ${this.totalCooks}`)

        // Generate HTML list items for total no. of cookies sold per day and add to DOM
        var liElForTotal = document.createElement('li');
        liElForTotal.textContent = `Total: ${this.totalCooks} cookies`;
        capHillUl.appendChild(liElForTotal);    
    }
}

// Location #5
var alki = {
    location: 'Alki',
    minCust: 2,
    maxCust: 16,
    avgNumCookiesSale: 4.6,
    hourlySales: [], // Num of cookies sold per hour
    totalCooks: 0, 
    render: function() {
        for (var i = 0; i < openHrs.length; i++) {
            var randCustNum = getRandomInt(this.minCust,this.maxCust);
            console.log(`Number of customers this hour: ${randCustNum}`);
            var cookiesHr = Math.ceil(cookiesSoldPerHr(randCustNum,this.avgNumCookiesSale));
            this.hourlySales.push(cookiesHr);
            
            // Counter for summing total of cookies sold
            this.totalCooks += this.hourlySales[i];
            console.log(`Running total of cookies: ${this.totalCooks}`)

            var liEl = document.createElement('li');
            liEl.textContent = `${openHrs[i]}: ${this.hourlySales[i]} cookies`;
            alkiUl.appendChild(liEl);
        }
        console.log(`TOTAL cookies for day: ${this.totalCooks}`)

        // Generate HTML list items for total no. of cookies sold per day and add to DOM
        var liElForTotal = document.createElement('li');
        liElForTotal.textContent = `Total: ${this.totalCooks} cookies`;
        alkiUl.appendChild(liElForTotal);    
    }
}

// Call functions on objects
firstAndPike.render();
seaTac.render();
seattleCtr.render();
capitolHill.render();
alki.render();