'use strict';

// Create variables I can use globally
    // Days of week in array
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // Number of hours the stores are open each day
        var operatingHrsDay = 14; // Think I'll actually need to loop through open hrs per biz reqs
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
        // Generate random number of custs/hr
        getRandCusts: function() {
            var randCustNum = getRandomInt(this.minCust,this.maxCust);
            return randCustNum;
        },
        // Total 
        getAvgCooksPerHr: function() {
            var avgCooksHr = cooksSoldPerHr(this.getRandCusts,this.avgNumCooksSale);
            return avgCooksHr;
        },

    }