// ===========================================================
// Version 2 of Wanderdog-- Uses Google Maps API instead of state selectors. 
// Places everything in a single div (campsites, trails, location map). 
// ===========================================================

$(document).ready(function () {
    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    var map, infoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
        var redirectHelp = "https://cors-ut-bootcamp.herokuapp.com/";
        // Trying to find campsites-- this API returns XML instead of JSON
        $.ajax({
            url: redirectHelp + "http://api.amp.active.com/camping/campgrounds/?amenity=4006&pets=3010&landmarkLat=" + crd.latitude + "&landmarkLong=" + crd.longitude + "&api_key=" + apikey,
            headers: {
                apikey: "ue26qnj3mtgav8yn2qnmwxgr"
            },
            method: "GET",
            dataType: "xml",
        }).then(function (response) {
            // return campgrounds that are dog-friendly
            console.log(response);
            //==================================================
            // Add the names and urls for the first 5 campsites
            //==================================================
            $(response).find("result").each(function () {
                var facName = $(this).find('facilityName').text();
                console.log(facName);
            })
            // campSites1.innerHTML = response.trails[0].name;
            // campSites1.href = response.trails[0].url;

            // campSites2.innerHTML = response.trails[1].name;
            // campSites2.href = response.trails[1].url;

            // campSites3.innerHTML = response.trails[2].name;
            // campSites3.href = response.trails[2].url;

            // campSites4.innerHTML = response.trails[3].name;
            // campSites4.href = response.trails[3].url;

            // campSites5.innerHTML = response.trails[4].name;
            // campSites5.href = response.trails[4].url;

        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
})