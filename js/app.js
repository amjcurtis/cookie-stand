'use strict';

// Create variables I can use globally
    // Days of week in array
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // Number of hours the stores are open each day
    var operatingHrsDay = 14;

// Create functions that can be reused in method inside each object?
    // Generate number btwn two values (learned from MDN doc on Math.random())
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; // The max is exclus and the min is inclus
    }
    // Calc and store no. of cookies bought per hour based on rand num of customers

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


    }