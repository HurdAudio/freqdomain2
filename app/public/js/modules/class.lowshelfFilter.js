'use strict';

var LowshelfFilter = (function(settings, skin, audioContext) {

  let lowshelfFilter = function(settings, skin, audioContext) {
    this.id = settings.id;
    this.name = settings.name;
    this.frequency = settings.frequency;
    this.frequency_modulator = settings.frequency_modulator;
    this.detune = settings.detune;
    this.detune_modulator = settings.detune_modulator;
    this.gain = settings.gain;
    this.gain_modulator = settings.gain_modulator,
    this.input = settings.input;
    this.output = settings.output;
    this.lowshelfFilter = audioContext.createBiquadFilter();
    this.lowshelfFilter.type = 'lowshelf';
    this.lowshelfFilter.frequency.value = this.frequency;
    this.lowshelfFilter.detune.value = this.detune;
    this.lowshelfFilter.gain.value = this.gain;
  }

  return(lowshelfFilter);
})();
