'use strict';

// Days of week in array
// var days = [ // Don't actually need array for this---not in reqs
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday'
// ];

// Create array of open hours that I can loop through
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

// Create empty array to which to push values for each store's no. of cookies/hr sold??
var numCookies = []; 

// Create variables to use for accessing elements by ID
var firstAndPikeUl = document.getElementById('firstandpike');
var seatacUl = document.getElementById('seatac');
var seattleCtrUl = document.getElementById('seattlectr');
var capHillUl = document.getElementById('caphill');
var alkiUl = document.getElementById('alki');

// Create functions that can be reused in method inside each object?
// Generate number btwn two values (learned from MDN doc on Math.random())
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The max is exclus and the min is inclus
}
// Calc and store no. of cookies bought per hour based on rand num of customers and avg no. of cookies/hr sold at a given location; include variable that stores total no. to print below list of cookies/hr sold
function cooksSoldPerHr(custs, cooks) { // 1st param is rand no. of customers, 2nd param is avg no. of cookies per sale
    var cooksPerHr = custs * cooks;
    return cooksPerHr;
}
// Get total number of cookies to incl at end of list?? 
// function getTotalCooks() { // Gotta be same as wk 1 lab 5 stretch goal (problem 6)?
// }

// Create separate JS object literal for each shop location
// Location #1
var firstAndPike = {
    name: '1st and Pike',
    minCust: 23,
    maxCust: 65,
    avgNumCooksSale: 6.3,
    render: function() {
        var totalCookies = 0;
        // Or try empty array approach Madi and I talked about; see line below
        // numCookies
        for (var i = 0; i < openHrs.length; i++) {

            // 1. Create element to hold the data
            var liEl = document.createElement('li');
            // 2. Assign the data to the element
            liEl.textContent = `${openHrs[i]}`;
        }
    
    },

    // Probably should find way to create a single 'render' method that incorporates the two separate methods below and makes it unnecessary to create them as separate indiv methods in the object
    getRandCusts: function() { // Generate random number of custs/hr
        var randCustNum = getRandomInt(this.minCust,this.maxCust);
        return randCustNum;
    },
    getAvgCooksPerHr: function() { // Total 
        var avgCooksHr = cooksSoldPerHr(this.getRandCusts,this.avgNumCooksSale);
        return avgCooksHr;
    }
    // Store no. of cookies/hr sold per location
    
}