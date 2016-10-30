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
    }
];

//Angular App Module and Controller
var sampleApp = angular.module('mapsApp', []);

sampleApp.controller('MapCtrl', ['$scope',function ($scope) {

    $scope.success = function(position){
        console.log("in success");

        //define google map
        //$scope.map
        // $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        // $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];
        //get current positions
        console.log(position);
        $scope.latitued = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        console.log("latitude: "+ $scope.latitued + "longitude: " + $scope.longitude );
        //define map option using getCurrent position
        var currentPos =  {lat: $scope.latitued, lng: $scope.longitude };
        var mapOptions = {
            zoom: 15,
            center: currentPos,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        //define google map
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var infoWindow = new google.maps.InfoWindow();

        /*var createMarker = function (info){

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

        }//createMarker

        for (i = 0; i < cities.length; i++){
            createMarker(cities[i]);
        }//for
        */
        //set initial marker
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: currentPos
        });
        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }//openInfoWindow


    }//success

    //define mapOption
    //center: current position
    //zoom: 15
    //$scope.map = ;
    //$scope.markers;

    console.log("in controller");
    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }//if
    console.log("before calling get Current position")

    navigator.geolocation.getCurrentPosition($scope.success);


}]);//controller

function err(){
    console.log("in error function");
    output.innerHTML = "Unable to retrieve your location";
}