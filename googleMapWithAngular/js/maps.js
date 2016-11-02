
//Angular App Module and Controller
var sampleApp = angular.module('mapsApp', []);

sampleApp.controller('MapCtrl', ['$scope', '$rootScope',function ($scope, $rootScope) {

    console.log("IN controller MapCtrl");
    $scope.success = function(position){
        //console.log("in success");

        $scope.markers = [];
        //get current positions
        console.log(position);
        $scope.latitued = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        console.log("latitude: "+ $scope.latitued + "longitude: " + $scope.longitude );
        //define map option using getCurrent position
        $rootScope.pickUpLat = $scope.latitued;
        $rootScope.pickUpLng = $scope.longitude;
       // $rootScope.pickUp =  {lat: $scope.latitued, lng: $scope.longitude };
        var mapOptions = {
            zoom: 16,
            center: {lat: $rootScope.pickUpLat, lng: $rootScope.pickUpLng },
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        //define google map
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        console.log("after define maps");

        var infoWindow = new google.maps.InfoWindow();

        //set initial marker
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: {lat: $rootScope.pickUpLat, lng: $rootScope.pickUpLng }
        });



            //add Event Listener
        google.maps.event.addListener($scope.map, 'click', function (event) {
            $rootScope.pickUpLat = event.latLng.lat();
            $rootScope.pickUpLng = event.latLng.lng();


            marker.setPosition( {lat: $rootScope.pickUpLat, lng: $rootScope.pickUpLng });
            //console.log($scope.currentPos.lat);
            //console.log($scope.currentPos.lng);

        });//addLiestener



        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }//openInfoWindow


    }//success
    //console.log("in controller");
    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }//if
    //console.log("before calling get Current position")

    navigator.geolocation.getCurrentPosition($scope.success);


}]);//controller


function err(){
    //console.log("in error function");
    output.innerHTML = "Unable to retrieve your location";
}

sampleApp.controller('dirCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    console.log("in controller maps and dirCtr");
    console.log($rootScope.pickUpLat);
    console.log($rootScope.pickUpLng);


    //console.log($scope)
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom:7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });//map definition

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('panel'));

    var request = {
        origin: 'Chicago',
        destination: 'New York',
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };//request definition

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }//if
    });

    /*$scope.getDriverPos = function (position) {
     console.log("in get driver pos");
     }//getDriverPos

     navigator.geolocation.getCurrentPosition($scope.success);*/





}]);//controller