const laminarKey = 'a79b4c9262774ddf72e57ba37f602cf0';
const laminarURL = 'http://localhost:3007/flights_from_tiles/';
const laminarInnerURL = '/flights?user_key=';
const laminarOuterURL = '&format=json';
const airlinesLookupURL =  'http://localhost:3007/airlines_lookup/';
const airportsLookupURL = 'http://localhost:3007/airport_lookup/';
// const iStarsKey = '93cc1020-54b8-11e8-b538-bd940efc5a88';
const airportsPostURL = '&airports=';
var internationalCity = false;
var apiActivated = false;
var recheckMS = 60000;

function backToMap() {
  let mercatorMap = document.getElementById('mercatorMap');
  let flightTable = document.getElementById('flightTable');
  mercatorMap.setAttribute("style", "display: initial;");
  flightTable.setAttribute("style", "display: none;");
}

function queryForDepartureAerodome(departureAirport, code) {
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": airportsLookupURL + code,
    "method": "GET",
  };

  $.ajax(settings).done((response)=>{
    let airportInfo = JSON.parse(response);
    console.log(response);
    console.log(airportInfo);
    departureAirport.innerHTML = airportInfo[0].Location_Name + ', ' + airportInfo.State_Name;
  });
}

function queryForAirline(airlineData, code) {
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": airlinesLookupURL + code,
    "method": "GET",
  };

$.ajax(settings).done(function (response) {
  let flightInfo = JSON.parse(response);
  console.log(response);
  console.log(flightInfo);
  airlineData.innerHTML = 'Airline: ' + flightInfo[0].operatorName;
});
}

function handleFlightListener(theDiv, flightdata) {
  let flightTable = document.getElementById('flightTable');
  let flightDrillDown = document.getElementById('flightDrillDown');
  let airlineData = document.getElementById('airlineData');
  let airlineDrilldownCallsign = document.getElementById('airlineDrilldownCallsign');
  let departureAirport = document.getElementById('departureAirport');


  airlineData.innerHTML = 'Airline: ';
  theDiv.addEventListener('click', ()=>{
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
  });
}

function cleanDateAndTime(time) {
  let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  let timeString = '';
  let timeDate = new Date(time);

  timeString = timeDate.getDate().toString() + ' ' + months[timeDate.getMonth()] + ' ' + timeDate.toLocaleTimeString('en-US');

  return(timeString);
}


function catalogFlights(flights) {
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
  mercatorMap.setAttribute("style", "display: none;");
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
      handleFlightListener(theDiv, flights.features[i]);
    }
  }
}

function getXY(x, y) {
  // alert(x + ' ' + y);

  let settings = {
  "async": true,
  "crossDomain": true,
  "url": laminarURL + x.toString() + '/' + y.toString(),
  "method": "GET",
  "headers": {
    "Cache-Control": "no-cache"
  },
  "processData": false
}

$.ajax(settings).done(function (response) {
  console.log(response);
  catalogFlights(response);
});
}


window.onload = ()=>{
  console.log('airlines is lit');
};
