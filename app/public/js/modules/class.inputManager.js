'use strict';

var InputManager = (function(settings, skin, audioContext) {

  let inputManager = function(settings, skin, audioContext) {

    function initializeInputStrips(obj) {
      let orderedStrips = obj.input_strip.inputs.sort((a, b) => {
        if (parseInt(a.input) < parseInt(b.input)) {
          return -1;
        } else if (parseInt(a.input) > parseInt(b.input)) {
          return 1;
        } else {
          return 0;
        }
      });
      for (let i = 0; i < orderedStrips.length; i++) {
        obj.inputs[obj.inputsIndex] = {
          source: orderedStrips[i].source,
          input: orderedStrips[i].input,
          input_name: orderedStrips[i].input_name,
          input_gain: orderedStrips[i].input_gain,
          input_solo: orderedStrips[i].input_solo,
          input_mute: orderedStrips[i].input_mute,
          input_pan: orderedStrips[i].input_pan,
          gain: audioContext.createGain(),
          pan: audioContext.createStereoPanner()
        };
        obj.inputs[obj.inputsIndex].pan.connect(obj.inputs[obj.inputsIndex].gain);
        if (obj.inputs[obj.inputsIndex].mute) {
          obj.inputs.gain.gain.value = 0;
        } else {
          obj.inputs[obj.inputsIndex].gain.gain.value = obj.inputs[obj.inputsIndex].input_gain/100;
        }
        obj.inputs[obj.inputsIndex].pan.pan.value = obj.inputs[obj.inputsIndex].input_pan;
        if (obj.currentChannel === 5) {
          obj.currentMergerIndex++;
          obj.mergerArray[obj.currentMergerIndex] = audioContext.createChannelMerger();
          obj.mergerArray[obj.currentMergerIndex].connect(obj.mergerArray[obj.currentMergerIndex - 1], 0, 5);
          obj.inputs[obj.inputsIndex].gain.connect(obj.mergerArray[obj.currentMergerIndex], 0, 0);
          obj.currentChannel = 0;
        } else {
          obj.inputs[obj.inputsIndex].gain.connect(obj.mergerArray[obj.currentMergerIndex], 0, obj.currentChannel);
          obj.currentChannel++;
        }
        obj.currentChannel++;
      }
    }

    this.id = settings.id;
    this.name = settings.name;
    this.input_strip = settings.input_strip;
    this.output = settings.output;
    this.mergerArray = [];
    this.currentMergerIndex = 0;
    this.currentChannel = 0;
    this.inputs = [];
    this.inputsIndex = 0;
    this.mergerArray[this.currentMergerIndex] = audioContext.createChannelMerger();
    if (this.input_strip !== null) {
      initializeInputStrips(this);
    }

  }

  return(inputManager);
})();
