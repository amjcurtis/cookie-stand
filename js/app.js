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

// Sum array of numbers
function getSum(total, num) { // Best to make this global function or make it local inside object method?
    return total + num;
}

// Location #1
var firstAndPike = {
    location: '1st and Pike',
    minCust: 23,
    maxCust: 65,
    avgNumCookiesSale: 6.3,
    hourlySales: [], // Num of cookies sold per hour
    //totalCookies: sumTotal, // Will this work when the variable that's used as value of the prprty is decl'd inside the render method?
    render: function() {
        for (var i = 0; i < openHrs.length; i++) {
            var randCustNum = getRandomInt(this.minCust,this.maxCust); // Should be inside or outside for loop?
            console.log(`Number of customers: ${randCustNum}`);
            var cookiesHr = cookiesSoldPerHr(randCustNum,this.avgNumCookiesSale); // Should be inside or outside for loop?
            console.log(`Num of custs this hr (${randCustNum}) * avg cookies/cust (${this.avgNumCookiesSale}) = ${cookiesHr} cookies sold this hr`); // # of customers * cookies sold this hour = total cookies sold this hour
            this.hourlySales.push(cookiesHr);
            // console.log(`Cookies/hr sold for index ${i}: ${this.hourlySales}`);

            // 1. Create element to hold the data
            var liEl = document.createElement('li');
            // 2. Assign the data to the element
            liEl.textContent = `${openHrs[i]}: ${this.hourlySales[i]} cookies`;
            // console.log('just assigned a value liEl', liEl);
            // 3. Put the element into the DOM
            firstAndPikeUl.appendChild(liEl);
        }

        // Sum values of hourlySales array
        var sumTotal = this.hourlySales.reduce(getSum);
        console.log('Value of sum total:', this.hourlySales.reduce(getSum));
        // create variable containing sum total
        // var sumTotal = // Should be assigned value of total gotten from sum in step above
        // Create new prpty for obj contining sum for the day

        // For counter to generate total no. of cookies sold per day
        // 1. Create element to hold the data
        var liElForTotal = document.createElement('li');
        // 2. Assign the data to the element
        liElForTotal.textContent = `Total: ${this.totalCookies} cookies`;
        // 3. Put the element into the DOM
        firstAndPikeUl.appendChild(liElForTotal);    
    },
    // sumTotal: this.hourlySales.reduce(getSum)

    // ######################################################################################
    // Below is legacy code from my first attempt to 1) generate random num of customers and 
    // 2) calc num of cookies sold per hour. Probably should find way to create a 
    // single 'render' method that incorporates the two separate methods below and makes it 
    // unnecessary to create them as separate indiv methods in the object
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
// Location #3
// Location #4
// Location #5

// Call functions on objects
firstAndPike.render();
seaTacAirport.render();
seattleCtrUl.render();
capitolHill.render();
alki.render();
