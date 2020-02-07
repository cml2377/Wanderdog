//=========================================================
// WELCOME TO WANDERDOG'S WEATHER SEARCH SCRIPT!
//=========================================================

//this key is for openweathermap's API.
var weatherKey = 'd9370cf81c44dc3900380fcc44da127d';

//================================================================================================
// When the website loads, (You can search by number and period)
//      1. Welcome modal pops up.
//      2. Moment.js pulls current date and appends to weather div.
//      3. Moment.js pulls current month and changes background image accordingly.
//      4. Fade hero on user scroll.
//      5. Function queries current weather.
//      6. Function queries forecast.
//      7. Function will show "Invalid zipcode" modal if user info is missing.
//      8. Add links to links box based on state.
//      9. Function for clickable map.
//================================================================================================

$(document).ready(function () {

    var submitButton = $("#submitBtn");
    var clearButton = $("#clearBtn");
    var zipcodeInput = $("#zipcodeInput");
    var usCity = $("#cityInput");

    //=========================================================
    // 1. This script pops up a modal with our disclaimer.
    //=========================================================

    $("#welcomeModal").addClass("is-active");

    $(".delete").click(function () {
        $("#welcomeModal").removeClass("is-active");
    });

    $("#canceled").click(function () {
        $("#welcomeModal").removeClass("is-active");
    });

    $("#userUnderstands").click(function () {
        $("#welcomeModal").removeClass("is-active");
    });

    //=========================================================
    // 2. This script uses Moment.js to pull current date.
    //=========================================================

    var momentDates = moment().format("MMMM Do YYYY")
    $("#currentDate").append(momentDates);

    for (i = 1; i < 6; i++) {
        var addDay = moment().add(i, 'days');
        console.log(addDay.format("MMMM Do YYYY"));

        $("#day" + i + "Date").append(addDay.format("MMMM Do YYYY"));

    };

    //=========================================================
    // 3. This script uses Moment.js to figure out month
    // and changes background based on month
    //=========================================================

    var momentMonth = moment().format("MMMM");

    if ((momentMonth === "December") || (momentMonth === "January") || (momentMonth === "February")) {
        document.body.style.background = "url('assets/images/jf-brou-915UJQaxtrk-unsplash.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
    }

    else if ((momentMonth === "March") || (momentMonth === "April") || (momentMonth === "May")) {
        document.body.style.background = "url('assets/images/jamie-street-wcO2PWLuQ3U-unsplash.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
    }

    else if ((momentMonth === "June") || (momentMonth === "July") || (momentMonth === "August")) {
        document.body.style.background = "url('assets/images/ipet-photo-T-0EW-SEbsE-unsplash.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
    }

    else if ((momentMonth === "September") || (momentMonth === "October") || (momentMonth === "November")) {
        document.body.style.background = "url('assets/images/wilfried-santer-f5V0hJY2ohQ-unsplash.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
    };

    //=========================================================
    // 4. This function fades the hero on user scroll.
    //=========================================================

    $(window).on('scroll', function () {
        var header = $(".hero");
        if ($(this).scrollTop() > 50) {
            if (!header.data('faded')) header.data('faded', 1).stop(true).fadeTo(400, 0.2);
        } else if (header.data('faded')) {
            header.data('faded', 0).stop(true).fadeTo(400, 1);
        }
    });

    //=========================================================
    // 5. This function queries current weather for a given city.
    //========================================================= 

    function queryCurrentWeather(cityName) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",us&units=imperial&appid=" + weatherKey,
            method: "GET"
        }).then(function (response) {
            //Log the resulting object
            console.log(response);

            //logging to see if query works.
            var cityEl = response.name;
            $("#cityStats").html(cityEl);
            $("#cityForecast").html("Weather Forecast: " + cityEl);

            //This is for current weather!
            var currentTempEl = response.main.temp;
            $("#currentTemp").html(currentTempEl + "&deg;F");

            //current weather conditions
            var currentConditionEl = response.weather[0].description; //this is in the icon box
            $("#currentCondition").text(currentConditionEl);
            //current weather icon
            var iconCode = response.weather[0].id;
            var flowersIcon = "wi wi-owm-" + iconCode;
            $("#currentIcon").attr('class', flowersIcon);
        });
    }

    //=======================================================================
    // On page load, the page will query Austin's current weather as default.
    //=======================================================================

    queryCurrentWeather("Austin");

    //==================================================================
    // 6. This function grabs the 5 day weather forecast for a given city.
    //==================================================================
    function forecast(cityName) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + (cityName) + ",us&units=imperial&appid=" + weatherKey,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //THESE ARE FOR THE FORECAST!
            var tempEl1 = response.list[0].main.temp;
            console.log(tempEl1);
            $("#day1Temp").html(tempEl1 + "&deg;F");
            var day1ConditionEl = response.list[0].weather[0].description;
            $("#day1Condition").text(day1ConditionEl);
            var day1Icon = response.list[0].weather[0].id;
            var flowersD1Icon = "wi wi-owm-" + day1Icon;
            $("#day1Icon").attr('class', flowersD1Icon);

            var tempEl2 = response.list[8].main.temp;
            $("#day2Temp").html(tempEl2 + "&deg;F");
            var day2ConditionEl = response.list[8].weather[0].description;
            $("#day2Condition").text(day2ConditionEl);
            var day2Icon = response.list[8].weather[0].id;
            var flowersD2Icon = "wi wi-owm-" + day2Icon;
            $("#day2Icon").attr('class', flowersD2Icon);

            var tempEl3 = response.list[17].main.temp;
            $("#day3Temp").html(tempEl3 + "&deg;F");
            var day3ConditionEl = response.list[17].weather[0].description;
            $("#day3Condition").text(day3ConditionEl);
            var day3Icon = response.list[17].weather[0].id;
            var flowersD3Icon = "wi wi-owm-" + day3Icon;
            $("#day3Icon").attr('class', flowersD3Icon);

            var tempEl4 = response.list[26].main.temp;
            $("#day4Temp").html(tempEl4 + "&deg;F");
            var day4ConditionEl = response.list[26].weather[0].description;
            $("#day4Condition").text(day4ConditionEl);
            var day4Icon = response.list[26].weather[0].id;
            var flowersD4Icon = "wi wi-owm-" + day4Icon;
            $("#day4Icon").attr('class', flowersD4Icon);

            var tempEl5 = response.list[35].main.temp;
            $("#day5Temp").html(tempEl5 + "&deg;F");
            var day5ConditionEl = response.list[35].weather[0].description;
            $("#day5Condition").text(day5ConditionEl);
            var day5Icon = response.list[35].weather[0].id;
            var flowersD5Icon = "wi wi-owm-" + day5Icon;
            $("#day5Icon").attr('class', flowersD5Icon);
        });
    }

    //==========================================================
    // On page load, the page will grab Austin's 5 day forecast.
    //==========================================================

    forecast("Austin");

    //==================================================================
    // 8. This is our function that grabs links based on state!
    // Links to Forest Service & BLM
    // Links to Forest Service and BLM appear when state is clicked
    // Globally naming variables to add links to the links box.
    //==================================================================        
    var aTag = document.getElementById('link');
    var aTag2 = document.getElementById('link2');
    var aTag3 = document.getElementById('link3');
    var wTag = document.getElementById('wLink');

    //==================================================================
    // WILDERNESS.net - Learn About Wilderness | Appears when ANY state is clicked
    //==================================================================
    $('#g5').on('click', function () {
        wTag.setAttribute('href', "https://wilderness.net/learn-about-wilderness/default.php");
        wTag.innerText = "US Wilderness Info"
    });


    var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (ios) {
        $('a').on('click touchend', function () {
            var link = $(this).attr('href');
            window.open(link, '_blank');
            return false;
        });
    }
});