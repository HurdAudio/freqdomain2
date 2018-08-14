'use strict';
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

var MasterVolume = (function(settings, skin) {

  let master = function (settings, skin) {
    this.id = settings.id;
    this.name = settings.name;
    this.gainValue = settings.master_volume_gain_value;
    this.input = settings.input;
    this.mute = settings.mute;
    this.masterGain = audioContext.createGain();
    this.masterGain.connect(audioContext.destination);
    if (this.mute) {
      this.masterGain.gain.value = 0;
    } else {
      this.masterGain.gain.value = (this.gainValue/100);
    }
    this.muteOn = function() {
      this.masterGain.gain.value = 0;
    }
    this.muteOff = function() {
      this.masterGain.gain.value = (this.gainValue/100);
    }

  }

  return(master);

})();

var GainModule = (function(settings, skin) {

  let gainNode = function(settings, skin) {
    this.id = settings.id;
    this.name = settings.name;
    this.gainValue = settings.gain_value;
    this.gainModulator = settings.gain_modulator;
    this.input = settings.input;
    this.output = settings.output;
    this.gain = audioContext.createGain();
    this.gain.gain.value = (this.gainValue/100);

  }

  return(gainNode);
})();

var OscillatorModule = (function(settings, skin) {

  let oscillatorNode = function(settings, skin) {
    this.id = settings.id;
    this.name = settings.name;
    this.waveform = settings.waveform;
    this.waveformModulator = settings.waveform_modulator;
    this.hertz = settings.hertz;
    this.hertzModulator = settings.hertz_modulator;
    this.detune = settings.detune;
    this.detuneModulator = settings.detune_modulator;
    this.output = settings.output;
    this.oscillator = audioContext.createOscillator();
    this.oscillator.frequency.setValueAtTime(this.hertz, audioContext.currentTime);
    this.oscillator.detune.setValueAtTime(this.detune, audioContext.currentTime);
    this.oscillator.type = this.waveform;

  }

  return(oscillatorNode);
})();

var TestToneModule = (function(settings, skin) {

  let testToneNode = function(settings, skin) {
    this.id = settings.id;
    this.name = settings.name;
    this.gainValue = settings.gain_value;
    this.waveform = settings.waveform;
    this.hertz = settings.hertz;
    this.deviceOn = settings.device_on;
    this.output = settings.output;
    this.gain = audioContext.createGain();
    this.gain.gain.value = (this.gainValue/100);
    this.oscillator = audioContext.createOscillator();
    this.oscillator.frequency.setValueAtTime(this.hertz, audioContext.currentTime);
    this.oscillator.type = this.waveform;
    this.oscillator.connect(this.gain);

  }

  return(testToneNode);
})();
