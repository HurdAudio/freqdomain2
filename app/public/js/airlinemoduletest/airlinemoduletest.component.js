(function() {
  'use strict';
  var currentUserId = 0;
  var tracking = false;
  var trackingFlightID = 0;
  var index = 0;


  angular.module('app')
    .component('airlinemoduletest', {
      controller: AirlineModuleTestComponent,
      templateUrl: '/js/airlinemoduletest/airlinemoduletest.template.html'
    });

    AirlineModuleTestComponent.$inject = ['$http', '$state', '$stateParams'];

    function AirlineModuleTestComponent($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.getXY = getXY;
      vm.backToMap = backToMap;
      vm.drillDownBack = drillDownBack;
      vm.drillDownDone = drillDownDone;

      function timedOutputs(prev, current, x, y, updatedFlight) {
        let currentLattitude = document.getElementById('currentLattitude');
        let currentLongitude = document.getElementById('currentLongitude');
        let currentAltitude = document.getElementById('currentAltitude');
        let latitudeDifference = 0;
        let longitudeDifference = 0;
        let altitudeDifference = 0;
        if (prev.lattitude > current.lattitude) {
          latitudeDifference = prev.lattitude - current.lattitude;
        } else {
          latitudeDifference = current.lattitude - prev.lattitude;
        }
        if (prev.longitude > current.longitude) {
          longitudeDifference = prev.longitude - current.longitude;
        } else {
          longitudeDifference = current.longitude - prev.longitude;
        }
        if (prev.altitude > current.altitude) {
          altitudeDifference = prev.altitude - current.altitude;
        } else {
          altitudeDifference = current.altitude - prev.altitude;
        }
        if (index === 120) {
          currentLattitude.innerHTML = 'Lattitude: ' + current.lattitude;
          currentLongitude.innerHTML = 'Longitude ' + current.longitude;
          currentAltitude.innerHTML = 'Altitude: ' + current.altitude + ' feet';
          updateAndTrack(updatedFlight, x, y);
        } else {
          setTimeout(()=>{
            if ((tracking) && (updatedFlight.id === trackingFlightID)) {
              ++index;
              if (prev.lattitude > current.lattitude) {
                currentLattitude.innerHTML = 'Lattitude: ' + ((prev.lattitude - ((index/120) * latitudeDifference))).toFixed(6);
              } else {
                currentLattitude.innerHTML = 'Lattitude: ' + (prev.lattitude + ((index/120) * latitudeDifference)).toFixed(6);
              }
              if (prev.longitude > current.longitude) {
                currentLongitude.innerHTML = 'Longitude: ' + (prev.longitude - ((index/120) * longitudeDifference)).toFixed(6);
              } else {
                currentLongitude.innerHTML = 'Longitude: ' + (prev.longitude + ((index/120) * longitudeDifference)).toFixed(6);
              }
              if (prev.altitude > current.altitude) {
                currentAltitude.innerHTML = 'Altitude: ' + (prev.altitude - ((index/120) * altitudeDifference)).toFixed(2) + ' feet';
              } else {
                currentAltitude.innerHTML = 'Altitude: ' + (prev.altitude + ((index/120) * altitudeDifference)).toFixed(2) + ' feet';
              }
              timedOutputs(prev, current, x, y, updatedFlight)
            }


          }, 500);
        }
      }

      function updateAndTrack(flightdata, x, y) {
        $http.get(`/flights_from_tiles/${x}/${y}`)
        .then(flightsData=>{
          let flights = flightsData.data.features;
          let updatedFlightdata = flights.filter(entry=>{
            return(entry.id === flightdata.id);
          });
          if (updatedFlightdata.length === 1) {
            let previousPosition = {
              lattitude: flightdata.geometry.coordinates[0],
              longitude: flightdata.geometry.coordinates[1],
              altitude: flightdata.properties.positionReport.altitude
            };
            let currentPosition = {
              lattitude: updatedFlightdata[0].geometry.coordinates[0],
              longitude: updatedFlightdata[0].geometry.coordinates[1],
              altitude: updatedFlightdata[0].properties.positionReport.altitude
            };
            index = 1;
            let scheduledArriveTime = null;
            let estimatedArriveTime = null;
            timedOutputs(previousPosition, currentPosition, x, y, updatedFlightdata[0]);

            if ((updatedFlightdata[0].properties.arrival !== undefined) && (updatedFlightdata[0].properties.arrival.runwayTime !== undefined) && (updatedFlightdata[0].properties.arrival.runwayTime.initial !== undefined)) {
              scheduledArrivalTime.innerHTML = 'Scheduled: ' + cleanDateAndTime(updatedFlightdata[0].properties.arrival.runwayTime.initial);
              scheduledArriveTime = new Date(updatedFlightdata[0].properties.arrival.runwayTime.initial);
            }

            if ((updatedFlightdata[0].properties.arrival !== undefined) && (updatedFlightdata[0].properties.arrival.runwayTime !== undefined) && (updatedFlightdata[0].properties.arrival.runwayTime.estimated !== undefined)) {
              estimatedArrivalTime.innerHTML = 'Estimated: ' + cleanDateAndTime(updatedFlightdata[0].properties.arrival.runwayTime.estimated);
              estimatedArriveTime = new Date(updatedFlightdata[0].properties.arrival.runwayTime.estimated);
            }

            if ((scheduledArriveTime !== null) && (estimatedArriveTime !== null)) {
              if (estimatedArriveTime.getTime() > scheduledArriveTime.getTime()) {
                arriveDelta.innerHTML = ((estimatedArriveTime.getTime() - scheduledArriveTime.getTime())/60000) + ' minutes late';
              } else if (estimatedArriveTime.getTime() === scheduledArriveTime.getTime()) {
                arriveDelta.innerHTML = 'On time';
              } else {
                arriveDelta.innerHTML = ((scheduledArriveTime.getTime() - estimatedArriveTime.getTime())/60000) + ' minutes early';
              }
            }

          } else {
            drillDownDone();
          }
        });

      }

      function drillDownDone() {
        tracking = false;
        let flightDrillDown = document.getElementById('flightDrillDown');
        let mercatorMap = document.getElementById('mercatorMap');

        flightDrillDown.setAttribute("style", "display: none;");
        mercatorMap.setAttribute("style", "visibility: visible; width: 100%; height: 100%;");
        document.getElementById('airlineDrilldownCallsign').innerHTML = '';
        document.getElementById('airlineData').innerHTML = '';
        document.getElementById('departureAirport').innerHTML = '';
        document.getElementById('scheduledDepartureTime').innerHTML = '';
        document.getElementById('actualDepartureTime').innerHTML = '';
        document.getElementById('departureDelta').innerHTML = '';
        document.getElementById('arriveAirport').innerHTML = '';
        document.getElementById('scheduledArrivalTime').innerHTML = '';
        document.getElementById('estimatedArrivalTime').innerHTML = '';
        document.getElementById('arriveDelta').innerHTML = '';
        document.getElementById('currentLattitude').innerHTML = '';
        document.getElementById('currentLongitude').innerHTML = '';
        document.getElementById('currentAltitude').innerHTML = '';
      }

      function drillDownBack() {
        tracking = false;
        let flightDrillDown = document.getElementById('flightDrillDown');
        let flightTable = document.getElementById('flightTable');

        flightDrillDown.setAttribute("style", "display: none;");
        flightTable.setAttribute("style", "display: initial;");
        document.getElementById('airlineDrilldownCallsign').innerHTML = '';
        document.getElementById('airlineData').innerHTML = '';
        document.getElementById('departureAirport').innerHTML = '';
        document.getElementById('scheduledDepartureTime').innerHTML = '';
        document.getElementById('actualDepartureTime').innerHTML = '';
        document.getElementById('departureDelta').innerHTML = '';
        document.getElementById('arriveAirport').innerHTML = '';
        document.getElementById('scheduledArrivalTime').innerHTML = '';
        document.getElementById('estimatedArrivalTime').innerHTML = '';
        document.getElementById('arriveDelta').innerHTML = '';
        document.getElementById('currentLattitude').innerHTML = '';
        document.getElementById('currentLongitude').innerHTML = '';
        document.getElementById('currentAltitude').innerHTML = '';
      }

      function queryForArrivalAerodome(arriveAirport, code) {
        $http.get(`/airport_lookup/${code}`)
        .then(airportData=>{
          let airport = airportData.data;
          arriveAirport.innerHTML = airport[0].Location_Name + ', ' + airport[0].State_Name;
        });
      }

      function queryForDepartureAerodome(departureAirport, code) {

        $http.get(`/airport_lookup/${code}`)
        .then(airportData=>{
          let airport = airportData.data;
          console.log(airport);
          departureAirport.innerHTML = airport[0].Location_Name + ', ' + airport[0].State_Name;
        });

      }

      function queryForAirline(airlineData, code) {

        $http.get(`/airlines_lookup/${code}`)
        .then(flightInfoData=>{
          let flightInfo = flightInfoData.data;
          console.log(flightInfo);
          airlineData.innerHTML = 'Airline: ' + flightInfo[0].operatorName;
        });

      }

      function handleFlightListener(theDiv, flightdata, x, y) {
        let flightTable = document.getElementById('flightTable');
        let flightDrillDown = document.getElementById('flightDrillDown');
        let airlineData = document.getElementById('airlineData');
        let airlineDrilldownCallsign = document.getElementById('airlineDrilldownCallsign');
        let departureAirport = document.getElementById('departureAirport');
        let scheduledDepartureTime = document.getElementById('scheduledDepartureTime');
        let scheduledDepartTime = null;
        let actualDepartTime = null;
        let actualDepartureTime = document.getElementById('actualDepartureTime');
        let departureDelta = document.getElementById('departureDelta');
        let scheduledArrivalTime = document.getElementById('scheduledArrivalTime');
        let scheduledArriveTime = null;
        let estimatedArrivalTime = document.getElementById('estimatedArrivalTime');
        let estimatedArriveTime = null;
        let arriveDelta = document.getElementById('arriveDelta');
        let currentLattitude = document.getElementById('currentLattitude');
        let currentLongitude = document.getElementById('currentLongitude');
        let currentAltitude = document.getElementById('currentAltitude');


        airlineData.innerHTML = 'Airline: ';
        theDiv.addEventListener('click', ()=>{
          tracking = true;
          trackingFlightID = flightdata.id;
          flightTable.setAttribute("style", "display: none;");
          flightDrillDown.setAttribute("style", "display: initial;");
          if ((flightdata.properties !== undefined) && (flightdata.properties.airline !== undefined)) {
            queryForAirline(airlineData, flightdata.properties.airline);
          }
          if (flightdata.properties.callsign !== undefined) {
            airlineDrilldownCallsign.innerHTML = 'Callsign: ' + flightdata.properties.callsign;
          }
          if ((flightdata.properties.departure !== undefined) && (flightdata.properties.departure.aerodrome !== undefined) && (flightdata.properties.departure.aerodrome.actual !== undefined)) {
            queryForDepartureAerodome(departureAirport, flightdata.properties.departure.aerodrome.actual);
          }
          if ((flightdata.properties.arrival !== undefined) && (flightdata.properties.arrival.aerodrome !== undefined) && (flightdata.properties.arrival.aerodrome.scheduled !== undefined)) {
            queryForArrivalAerodome(arriveAirport, flightdata.properties.arrival.aerodrome.scheduled);
          }
          if ((flightdata.properties.departure !== undefined) && (flightdata.properties.departure.runwayTime !== undefined) && (flightdata.properties.departure.runwayTime.initial !== undefined)) {
            scheduledDepartureTime.innerHTML = 'Scheduled: ' + cleanDateAndTime(flightdata.properties.departure.runwayTime.initial);
            scheduledDepartTime = new Date(flightdata.properties.departure.runwayTime.initial);
          }
          if ((flightdata.properties.arrival !== undefined) && (flightdata.properties.arrival.runwayTime !== undefined) && (flightdata.properties.arrival.runwayTime.initial !== undefined)) {
            scheduledArrivalTime.innerHTML = 'Scheduled: ' + cleanDateAndTime(flightdata.properties.arrival.runwayTime.initial);
            scheduledArriveTime = new Date(flightdata.properties.arrival.runwayTime.initial);
          }
          if ((flightdata.properties.departure !== undefined) && (flightdata.properties.departure.runwayTime !== undefined) && (flightdata.properties.departure.runwayTime.actual !== undefined)) {
            actualDepartureTime.innerHTML = 'Actual: ' + cleanDateAndTime(flightdata.properties.departure.runwayTime.actual);
            actualDepartTime = new Date(flightdata.properties.departure.runwayTime.actual);
          }
          if ((flightdata.properties.arrival !== undefined) && (flightdata.properties.arrival.runwayTime !== undefined) && (flightdata.properties.arrival.runwayTime.estimated !== undefined)) {
            estimatedArrivalTime.innerHTML = 'Estimated: ' + cleanDateAndTime(flightdata.properties.arrival.runwayTime.estimated);
            estimatedArriveTime = new Date(flightdata.properties.arrival.runwayTime.estimated);
          }
          if ((scheduledDepartTime !== null) && (actualDepartTime !== null)) {
            if (actualDepartTime.getTime() > scheduledDepartTime.getTime()) {
              departureDelta.innerHTML = ((actualDepartTime.getTime() - scheduledDepartTime.getTime())/60000) + ' minutes late';
            } else if (actualDepartTime.getTime() === scheduledDepartTime.getTime()) {
              departureDelta.innerHTML = '0 minutes late';
            } else {
              departureDelta.innerHTML = ((scheduledDepartTime.getTime() - actualDepartTime.getTime())/60000) + ' minutes early';
            }
          }
          if ((scheduledArriveTime !== null) && (estimatedArriveTime !== null)) {
            if (estimatedArriveTime.getTime() > scheduledArriveTime.getTime()) {
              arriveDelta.innerHTML = ((estimatedArriveTime.getTime() - scheduledArriveTime.getTime())/60000) + ' minutes late';
            } else if (estimatedArriveTime.getTime() === scheduledArriveTime.getTime()) {
              arriveDelta.innerHTML = 'On time';
            } else {
              arriveDelta.innerHTML = ((scheduledArriveTime.getTime() - estimatedArriveTime.getTime())/60000) + ' minutes early';
            }
          }
          if ((flightdata.geometry !== undefined) && (flightdata.geometry.coordinates !== undefined)) {
            currentLattitude.innerHTML = 'Lattitude: ' + flightdata.geometry.coordinates[0];
            currentLongitude.innerHTML = 'Longitude: ' + flightdata.geometry.coordinates[1];
          }
          if ((flightdata.properties.positionReport !== undefined) && (flightdata.properties.positionReport.altitude !== undefined)) {
            currentAltitude.innerHTML = 'Altitude: ' + flightdata.properties.positionReport.altitude + ' feet';
          }
          setTimeout(()=>{
            if ((tracking) && (flightdata.id === trackingFlightID)) {
              updateAndTrack(flightdata, x, y);
            }
          }, 60000);
        });
      }

      function backToMap() {
        let mercatorMap = document.getElementById('mercatorMap');
        let flightTable = document.getElementById('flightTable');
        mercatorMap.setAttribute("style", "visibility: visible; width: 100%; height: 100%;");
        flightTable.setAttribute("style", "display: none;");
      }

      function cleanDateAndTime(time) {
        let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        let timeString = '';
        let timeDate = new Date(time);

        timeString = timeDate.getDate().toString() + ' ' + months[timeDate.getMonth()] + ' ' + timeDate.toLocaleTimeString('en-US');

        return(timeString);
      }

      function catalogFlights(flights, x, y) {
        let mercatorMap = document.getElementById('mercatorMap');
        let flightTable = document.getElementById('flightTable');
        let flightTableList = document.getElementById('flightTableList');
        let flightTotal = document.getElementById('flightTotal');
        while (flightTableList.firstChild) {
          flightTableList.removeChild(flightTableList.firstChild);
        }
        let theDiv;
        let theImg;
        let theCallsign;
        let theDepart;
        let theArrive;
        let theAltitude;

        flightTotal.innerHTML = 'Airborne Flights: ' + flights.features.length;
        mercatorMap.setAttribute("style", "visibility: hidden; width: 0%; height: 0%;");
        flightTable.setAttribute("style", "display: initial;");

        if (flights.features.length > 0) {
          for (let i = 0; i < flights.features.length; i++) {
            theDiv = document.createElement('div');
            flightTableList.appendChild(theDiv);
            theImg = document.createElement('img');
            theDiv.appendChild(theImg);
            theImg.src = "./img/icons8-airplane-take-off-64.png";
            theCallsign = document.createElement('p');
            theDiv.appendChild(theCallsign);
            if (flights.features[i].properties.callsign !== undefined) {
              theCallsign.innerHTML = 'Flight: ' + flights.features[i].properties.callsign;
            }
            theDepart = document.createElement('p');
            theDiv.appendChild(theDepart);
            if ((flights.features[i].properties.departure !== undefined) && (flights.features[i].properties.departure.aerodrome !== undefined) && (flights.features[i].properties.departure.runwayTime !== undefined)) {
              theDepart.innerHTML = 'Depart: ' + flights.features[i].properties.departure.aerodrome.actual + ' ' + cleanDateAndTime(flights.features[i].properties.departure.runwayTime.actual);
            }
            theArrive = document.createElement('p');
            theDiv.appendChild(theArrive);
            if ((flights.features[i].properties.arrival !== undefined) && (flights.features[i].properties.arrival.aerodrome !== undefined) && (flights.features[i].properties.arrival.runwayTime !== undefined)) {
              theArrive.innerHTML = 'Arrive: ' + flights.features[i].properties.arrival.aerodrome.scheduled + ' ' + cleanDateAndTime(flights.features[i].properties.arrival.runwayTime.estimated) + ' (estimated)';
            }
            theAltitude = document.createElement('p');
            theDiv.appendChild(theAltitude);
            if ((flights.features[i].properties.positionReport !== undefined) && (flights.features[i].properties.positionReport.altitude !== undefined)) {
              theAltitude.innerHTML = 'currently at ' + flights.features[i].properties.positionReport.altitude + ' feet';
            }
            theDiv.setAttribute("style", "cursor: pointer;");
            handleFlightListener(theDiv, flights.features[i], x, y);
          }
        }
      }

      function getXY(x, y) {
        $http.get(`/flights_from_tiles/${x}/${y}`)
        .then(responseData=>{
          let response = responseData.data;
          console.log(response);
          catalogFlights(response, x, y);
        });
      }

      function onInit() {
        console.log("Airline Module Test is lit");
        let theBody = document.getElementsByTagName("body")[0];
        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg);");
        // document.getElementById('mercatorMap').setAttribute("style", "display: initial; width: 100%; height: 100%; background: url(../img/Equirectangular_projection_SW.jpg); background-size: 100%; opacity: 0;");

      }

    }

}());
