const weatherUndergroundKey = 'd2a228d7c446b04f';
const weatherUndergroundURL = 'http://api.wunderground.com/api/';
var internationalCity = false;
var apiActivated = false;
var recheckMS = 60000;

function getQueryString() {
  let zipDigit1 = document.getElementById('zipDigit1');
  let zipDigit2 = document.getElementById('zipDigit2');
  let zipDigit3 = document.getElementById('zipDigit3');
  let zipDigit4 = document.getElementById('zipDigit4');
  let zipDigit5 = document.getElementById('zipDigit5');
  let countryInput = document.getElementById('countryInput');
  let cityInput = document.getElementById('cityInput');
  let queryString = '';
  if (internationalCity) {
    if ((countryInput.value !== '') && (cityInput.value !== '')) {
      queryString = countryInput.value.toString() + '/' + cityInput.value.toString() + '.json';
    } else {
      queryString = 'nm/albuquerque.json';
    }
  } else {
    queryString = zipDigit1.value.toString() + zipDigit2.value.toString() + zipDigit3.value.toString() + zipDigit4.value.toString() + zipDigit5.value.toString() + '.json';
  }

  return(queryString);
}

function webcams() {
  let urlString = weatherUndergroundURL + weatherUndergroundKey + '/webcams/q/' + getQueryString();
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": urlString,
    "method": "GET"
  }
  let webcamImg = document.getElementById('webcamImg');

  $.ajax(settings).done(function (response) {
    console.log(response);
    if (!response.response.error) {
      let cams = response.webcams;
      let index = Math.floor(Math.random() * cams.length);
      if (cams[index.CURRENTIMAGEURL]) {
        webcamImg.src = cams[index].CURRENTIMAGEURL;
      } else {
        webcamImg.src = cams[index].WIDGETCURRENTIMAGEURL;
      }
    }
  });
}

function astronomyConditions() {
  let urlString = weatherUndergroundURL + weatherUndergroundKey + '/astronomy/q/' + getQueryString();
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": urlString,
    "method": "GET"
  }
  let sunrise = document.getElementById('sunrise');
  let sunset = document.getElementById('sunset');
  let moonrise = document.getElementById('moonrise');
  let moonset = document.getElementById('moonset');
  let moonPhase = document.getElementById('moonPhase');

  $.ajax(settings).done(response=>{
    console.log(response);
    if (!response.response.error) {
      if ((response.sun_phase.sunrise.hour) && (response.sun_phase.sunrise.minute)) {
        sunrise.innerHTML = 'Sunrise: ' + response.sun_phase.sunrise.hour + ':' + response.sun_phase.sunrise.minute;
      }
      if ((response.sun_phase.sunset.hour) && (response.sun_phase.sunset.minute)) {
        sunset.innerHTML = 'Sunset: ' + response.sun_phase.sunset.hour + ':' + response.sun_phase.sunset.minute;
      }
      if ((response.moon_phase.moonrise.hour) && (response.moon_phase.moonrise.minute)) {
        moonrise.innerHTML = 'Moonrise: ' + response.moon_phase.moonrise.hour + ':' + response.moon_phase.moonrise.minute;
      }
      if ((response.moon_phase.moonset.hour) && (response.moon_phase.moonset.minute)) {
        moonset.innerHTML = 'Moonset: ' + response.moon_phase.moonset.hour + ':' + response.moon_phase.moonset.minute;
      }
      if ((response.moon_phase.phaseofMoon) && (response.moon_phase.percentIlluminated)) {
        moonPhase.innerHTML = response.moon_phase.phaseofMoon + ': ' + response.moon_phase.percentIlluminated + '% illuminated';
      }
    }
  });
}

function weatherConditions() {
  let urlString = weatherUndergroundURL + weatherUndergroundKey + '/conditions/q/' + getQueryString();
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": urlString,
    "method": "GET"
  }
  let logoImage = document.getElementById('logoImage');
  let locationLabel = document.getElementById('locationLabel');
  let temperatureFC = document.getElementById('temperatureFC');
  let relativeHumidity = document.getElementById('relativeHumidity');
  let feelsLikeFC = document.getElementById('feelsLikeFC');
  let windString = document.getElementById('windString');
  let windSpeed = document.getElementById('windSpeed');
  let windDirection = document.getElementById('windDirection');
  let windGusts = document.getElementById('windGusts');
  let conditionsString = document.getElementById('conditionsString');
  let dailyPrecipitation = document.getElementById('dailyPrecipitation');
  let conditionsIcon = document.getElementById('conditionsIcon');

  $.ajax(settings).done(response=>{
    console.log(response);
    if (!response.response.error) {
      let conditions = response.current_observation;
      if (conditions.image && conditions.image.url) {
        logoImage.src = conditions.image.url;
      }
      if ((conditions.display_location.full) && (conditions.observation_location.full)) {
        locationLabel.innerHTML = 'Location: ' + conditions.display_location.full + ' - Observation Location: ' + conditions.observation_location.full;
      }
      if ((conditions.temp_f) && (conditions.temp_c)) {
        temperatureFC.innerHTML = conditions.temp_f + ' F / ' + conditions.temp_c + ' C';
      }
      if (conditions.relative_humidity) {
        relativeHumidity.innerHTML = 'Humidity: ' + conditions.relative_humidity;
      }
      if ((conditions.feelslike_f) && (conditions.feelslike_c)) {
        feelsLikeFC.innerHTML = conditions.feelslike_f + ' F / ' + conditions.feelslike_c + ' C';
      }
      if (conditions.wind_string) {
        windString.innerHTML = conditions.wind_string;
      }
      if ((conditions.wind_mph) && (conditions.wind_kph)) {
        windSpeed.innerHTML = conditions.wind_mph + ' mph / ' + conditions.wind_kph + ' kph';
      }
      if (conditions.wind_dir) {
        windDirection.innerHTML = conditions.wind_dir;
      }
      if ((conditions.wind_gust_mph) && (conditions.wind_gust_kph)) {
        windGusts.innerHTML = "Gusts: " + conditions.wind_gust_mph + " mph / " + conditions.wind_gust_kph + " kph";
      }
      if ((conditions.weather) && (conditions.precip_1hr_in) && (conditions.precip_1hr_metric)) {
        conditionsString.innerHTML = conditions.weather + ': ' +  conditions.precip_1hr_in + ' inches / ' + conditions.precip_1hr_metric + ' mm per hour';
      }
      if ((conditions.precip_today_in) && (conditions.precip_today_metric)) {
        dailyPrecipitation.innerHTML = 'Today: ' + conditions.precip_today_in + ' inches / ' + conditions.precip_today_metric + ' mm';
      }
      if (conditions.icon_url) {
        conditionsIcon.src = conditions.icon_url;
      }
    }
  });
}

function trackRefresh() {
  setTimeout(()=>{
    --recheckMS;
    if (apiActivated) {
      if (recheckMS < 1) {
        recheckMS = 60000;
        weatherConditions();
        astronomyConditions();
        webcams();
      }
      trackRefresh();
    }
  }, 1);
}


window.onload = ()=>{
  let inputToggleButton = document.getElementById('inputToggleButton');
  let userZipInput = document.getElementById('userZipInput');
  let userZipInputModulators = document.getElementById('userZipInputModulators');
  let userContryCityInput = document.getElementById('userContryCityInput');
  let moduleStartButton = document.getElementById('moduleStartButton');

  inputToggleButton.addEventListener('click', ()=>{
    if (internationalCity) {
      internationalCity = false;
      userZipInput.setAttribute("style", "display: initial;");
      userZipInputModulators.setAttribute("style", "display: initial;");
      userContryCityInput.setAttribute("style", "display: none;");
    } else {
      internationalCity = true;
      userZipInput.setAttribute("style", "display: none;");
      userZipInputModulators.setAttribute("style", "display: none;");
      userContryCityInput.setAttribute("style", "display: initial;");
    }
  });

  moduleStartButton.addEventListener('click', ()=>{
    if (apiActivated) {
      apiActivated = false;
      moduleStartButton.innerHTML = 'start';
    } else {
      apiActivated = true;
      moduleStartButton.innerHTML = 'stop';
      recheckMS = 60000;
      weatherConditions();
      astronomyConditions();
      webcams();
      trackRefresh();
    }
  });
};
