'use strict';

var BandpassFilter = (function(settings, skin, audioContext) {

  let bandpassFilter = function(settings, skin, audioContext) {
    this.id = settings.id;
    this.name = settings.name;
    this.frequency = settings.frequency;
    this.frequency_modulator = settings.frequency_modulator;
    this.detune = settings.detune;
    this.detune_modulator = settings.detune_modulator;
    this.q = settings.q;
    this.q_modulator = settings.q_modulator,
    this.input = settings.input;
    this.output = settings.output;
    this.bandpassFilter = audioContext.createBiquadFilter();
    this.bandpassFilter.type = 'bandpass';
    this.bandpassFilter.frequency.value = this.frequency;
    this.bandpassFilter.detune.value = this.detune;
    this.bandpassFilter.Q.value = this.q;
  }

  return(bandpassFilter);
})();
