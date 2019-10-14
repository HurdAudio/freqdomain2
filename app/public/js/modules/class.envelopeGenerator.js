'use strict';

var EnvelopeGenerator = (function(settings, skin, audioContext) {

  let envelopeGenerator = function(settings, skin, audioContext) {
    this.id = settings.id;
    this.name = settings.name;
    this.attack_start = settings.attack_start;
    this.attack_start_modulator = settings.attack_start_modulator;
    this.attack_time_interval = settings.attack_time_interval;
    this.attack_time_interval_modulator = settings.attack_time_interval_modulator;
    this.attack_end = settings.attack_end;
    this.attack_end_modulator = settings.attack_end_modulator,
    this.attack_exponential = settings.attack_exponential;
    this.attack_convex = settings.attack_convex;
    this.attack_slope = settings.attack_slope;
    this.decay_on = settings.decay_on;
    this.decays = settings.decays;
    this.sustain_on = settings.sustain_on;
    this.sustain_modulator = settings.sustain_modulator;
    this.post_sustain_on = settings.post_sustain_on;
    this.post_sustains = settings.post_sustains;
    this.release_time_interval = settings.release_time_interval;
    this.release_time_interval_modulator = settings.release_time_interval_modulator;
    this.release_end_value = settings.release_end_value;
    this.release_end_value_modulator = settings.release_end_value_modulator;
    this.release_exponential = settings.release_exponential;
    this.release_convex = settings.release_convex;
    this.release_slope = settings.release_slope;
    this.output = settings.output;
  }

  return(envelopeGenerator);
})();
