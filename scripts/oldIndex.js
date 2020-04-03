//=========================================================
// WELCOME TO WANDERDOG'S WEATHER SEARCH SCRIPT!
//=========================================================

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


    var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (ios) {
        $('a').on('click touchend', function () {
            var link = $(this).attr('href');
            window.open(link, '_blank');
            return false;
        });
    }
});