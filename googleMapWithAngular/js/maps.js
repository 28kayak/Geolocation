/**
 * Created by kaya on 10/26/16.
 */
//Data
var cities = [
    {
        city : 'India',
        desc : 'This is the best country in the world!',
        lat : 23.200000,
        long : 79.225487
    },
    {
        city : 'New Delhi',
        desc : 'The Heart of India!',
        lat : 28.500000,
        long : 77.250000
    },
    {
        city : 'Mumbai',
        desc : 'Bollywood city!',
        lat : 19.000000,
        long : 72.90000
    },
    {
        city : 'Kolkata',
        desc : 'Howrah Bridge!',
        lat : 22.500000,
        long : 88.400000
    },
    {
        city : 'Chennai  ',
        desc : 'Kathipara Bridge!',
        lat : 13.000000,
        long : 80.250000
    },
    {
        city: 'San Jose',
        desc: 'this is SJSU',
        lat: 37.336798,
        long:-121.8796567

    }
];

//Angular App Module and Controller
var sampleApp = angular.module('mapsApp', []);
sampleApp.controller('MapCtrl', function ($scope) {
    //Define map Options
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(25,80),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    $scope.output = document.getElementById('map');


    if(!navigator.geolocation)
    {
        output.innerHTML = "<p>Geolocation is not supported by your browser </p>";
    }

    //$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});