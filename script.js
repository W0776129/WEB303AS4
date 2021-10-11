/*
    Assignment 4
    Nikhil Patel
*/

$(document).ready(function(){
    // your code here
    let old_lat = localStorage.getItem("location_lat");
    let old_lon = localStorage.getItem("location_lon");

    if(old_lon == null || old_lat == null){
        let str = "welcome first time visit or localStorage not available<br>";
        navigator.geolocation.getCurrentPosition((position) => {
        $('div#youarehere').eq(0).html(str + "The latitude is: " + position.coords.latitude + "<br> The longitude is:" + position.coords.longitude);
        localStorage.setItem("location_lat", position.coords.latitude );
        localStorage.setItem("location_lon", position.coords.longitude);
      
     
        }, () => {
        $('div#youarehere').text("We cannot display your coordinates unless you allow access to your location");
        });

    }else{
        let str1; 
        str1 = "The old latitude is: " + old_lat + "<br> The old longitude is:" + old_lon;
        console.log('already in localStorage');

        navigator.geolocation.getCurrentPosition((position) => {
        str1 =  str1 + "<br>The new latitude is: " + position.coords.latitude + "<br> The new longitude is:" + position.coords.longitude + "<br> new data stored in localStorage";
        localStorage.setItem("location_lat", position.coords.latitude );
        localStorage.setItem("location_lon", position.coords.longitude);
        let distance = calcDistance(position.coords.latitude, position.coords.longitude, old_lat,old_lon);
        str1 = str1 + "<br>distance from new to old is " + distance ;
        $('div#youarehere').html(str1);
        console.log(str1);
        }, () => {
        console.log(str1);
        str1 = str1 + "<br>allow location";
        $('div#youarehere').html(str1);
        });

        

    }
   






    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistance(lat1, lon1, lat2, lon2){
        var toRadians = function(num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2-lat1);
        var Δλ = toRadians(lon2-lon1);

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return ( R * c );
    }
});


