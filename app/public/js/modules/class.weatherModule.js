'use strict';

var WeatherModule = (function(setting, skin, audioContext) {

  let weatherModule = function(setting, skin, audioContext) {
    this.id = setting.id;
    this.user_id = setting.user_id;
    this.name = setting.name;
    this.zip_code_toggle = setting.zip_code_toggle;
    this.zip_digit_1 = setting.zip_digit_1;
    this.zip_digit_1_modulator = setting.zip_digit_1_modulator;
    this.zip_digit_2 = setting.zip_digit_2;
    this.zip_digit_2_modulator = setting.zip_digit_2_modulator;
    this.zip_digit_3 = setting.zip_digit_3;
    this.zip_digit_3_modulator = setting.zip_digit_3_modulator;
    this.zip_digit_4 = setting.zip_digit_4;
    this.zip_digit_4_modulator = setting.zip_digit_4_modulator;
    this.zip_digit_5 = setting.zip_digit_5;
    this.zip_digit_5_modulator = setting.zip_digit_5_modulator;
    this.country = setting.country;
    this.city = setting.city;
    this.output = setting.output;
  }

  return(weatherModule);

})();
