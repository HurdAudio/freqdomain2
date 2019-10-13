'use strict';

var TestToneModule = (function(settings, skin, audioContext) {

  let testToneNode = function(settings, skin, audioContext) {
    this.id = settings.id;
    this.name = settings.name;
    this.positionX = settings.positionX;
    this.positionY = settings.positionY;
    this.gainValue = settings.gain_value;
    this.waveform = settings.waveform;
    this.hertz = settings.hertz;
    this.deviceOn = settings.device_on;
    this.output = settings.output;
    this.gain = audioContext.createGain();
    if (this.deviceOn) {
      this.gain.gain.value = (this.gainValue/100);
    } else {
      this.gain.gain.value = 0;
    }
    this.oscillator = audioContext.createOscillator();
    this.oscillator.frequency.setValueAtTime(this.hertz, audioContext.currentTime);
    this.oscillator.type = this.waveform;
    this.oscillator.connect(this.gain);
    this.oscillator.start();

    this.skinName = skin.name;
    this.month = skin.month;
    this.rule = skin.rule;
    this.facePath = skin.face_path;
    this.faceSize = skin.face_size;
    this.faceRepeat = skin.face_repeat;
    this.faceBoxShadowColor = skin.face_box_shadow_color;
    this.faceFontColor = skin.face_font_color;
    this.faceFontShadow = skin.face_font_shadow;
    this.topPath = skin.top_path;
    this.topSize = skin.top_size;
    this.topRepeat = skin.top_repeat;
    this.topFontColor = skin.top_font_color;
    this.topFontShadow = skin.top_font_shadow;
    this.signalPath = skin.signal_path;
    this.signalSize = skin.signal_size;
    this.signalRepeat = skin.signal_repeat;
    this.signalBoxShadowColor = skin.signal_box_shadow_color;
    this.signalFontColor = skin.signal_font_color;
    this.signalFontShadow = skin.signal_font_shadow;
    this.displayPath = skin.display_path;
    this.outputSize = skin.output_size;
    this.outputRepeat = skin.output_repeat;
    this.outputBoxShadowColor = skin.output_box_shadow_color;
    this.outputFontColor = skin.output_font_color;
    this.outputFontShadow = skin.output_font_shadow;
    this.waveformSelectorDisplaySize = skin.waveform_selector_display_size;
    this.waveformSelectorDisplayRepeat = skin.waveform_selector_display_repeat;
    this.waveformSelectorDisplayBoxShadowColor = skin.waveform_selector_display_box_shadow_color;
    this.waveformSelectorDisplayFontColor = skin.waveform_selector_display_font_color;
    this.frequencySize = skin.frequency_size;
    this.frequencyRepeat = skin.frequency_repeat;
    this.frequencyBoxShadow = skin.frequency_box_shadow;
    this.frequencySliderPath = skin.frequency_slider_path;
    this.frequencySliderSize = skin.frequency_slider_size;
    this.frequencySliderRepeat = skin.frequency_slider_repeat;
    this.frequenySliderBoxShadow = skin.frequency_slider_box_shadow;
    this.volumePath = skin.volume_path;
    this.volumeSize = skin.volume_size;
    this.volumeRepeat = skin.volume_repeat;
    this.volumeBoxShadowColor = skin.volume_box_shadow_color;
    this.volumeSliderPath = skin.volume_slider_path;
    this.volumeSliderSize = skin.volume_slider_size;
    this.volumeSliderRepeat = skin.volume_slider_repeat;
    this.volumeSliderBoxShadowColor = skin.volume_slider_box_shadow_color;
    this.sliderShaderColor1 = skin.slider_shader_color_1;
    this.sliderShaderColor2 = skin.slider_shader_color_2;

    this.dragWidth = 790;
    this.dragHeight = 453;
    this.horizontalWidth = 900;
    this.horizontalHeight = 160;
    this.verticalWidth = 160;
    this.verticalHeight = 750;
    this.mouseOn = false;

    this.onOffFunctionalityVertical = (testToneOnOff, light, div, x, y) => {
      testToneOnOff.addEventListener('change', () => {
        if (testToneOnOff.checked) {
          this.deviceOn = true;
          this.gain.gain.value = this.gainValue;
          light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: visible;");
          div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; filter: hue-rotate(0deg) contrast(100%); transition: filter 0.5s linear;");
        } else {
          this.deviceOn = false;
          this.gain.gain.value = 0;
          light.setAttribute("style", "visibility: hidden;");
          div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; filter: hue-rotate(180deg) contrast(50%); transition: filter 0.5s linear;");
        }
      });
    }

    this.onOffFunctionalityHorizontal = (testToneOnOff, light, div, x, y) => {
      testToneOnOff.addEventListener('change', () => {
        if (testToneOnOff.checked) {
          this.deviceOn = true;
          this.gain.gain.value = this.gainValue;
          light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: visible;");
          div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; filter: hue-rotate(0deg) contrast(100%); transition: filter 0.5s linear;");
        } else {
          this.deviceOn = false;
          this.gain.gain.value = 0;
          light.setAttribute("style", "visibility: hidden;");
          div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; filter: hue-rotate(180deg) contrast(50%); transition: filter 0.5s linear;");
        }
      });
    }

    this.onOffFunctionalityDrag = (testToneOnOff, light, div) => {
      testToneOnOff.addEventListener('change', () => {
        if (testToneOnOff.checked) {
          this.deviceOn = true;
          this.gain.gain.value = this.gainValue;
          light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: visible;");
          if (this.mouseOn) {
            div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.7); filter: hue-rotate(0deg) contrast(100%); transition: filter 0.5s linear;");
          } else {
            div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5); filter: hue-rotate(0deg) contrast(100%); transition: filter 0.5s linear;");
          }

        } else {
          this.deviceOn = false;
          this.gain.gain.value = 0;
          light.setAttribute("style", "visibility: hidden;");
          if (this.mouseOn) {
            div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.7); filter: hue-rotate(180deg) contrast(50%); transition: filter 0.5s linear;");
          } else {
            div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5); filter: hue-rotate(180deg) contrast(50%); transition: filter 0.5s linear;");
          }

        }
      });
    }

    this.manageVolumeInput = (display, slider, light) => {

      slider.addEventListener('mousemove', (e) => {

        e.stopPropagation();
        display.value = slider.value;
        this.gainValue = display.value;
        if (this.deviceOn) {
          this.gain.gain.value = (this.gainValue/100);
          light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: visible;");
        } else {
          this.gain.gain.value = 0;
          light.setAttribute("style", "visibility: hidden;");
        }

      });

      display.addEventListener('change', (e) => {

        e.stopPropagation();
        slider.value = display.value;
        this.gainValue = slider.value;
        if (this.deviceOn) {
          this.gain.gain.value = (this.gainValue/100);
          light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" +    (this.gainValue) + "%) hue-rotate(" (100 - this.gainValue) + "deg); visibility: visible;");
        } else {
          this.gain.gain.value = 0;
          light.setAttribute("style", "visibility: hidden;");
        }
      });
    }

    this.manageWaveformSelector = (waves) => {
      let flashDelay = 90;
      let animTime = 0.5;

      waves.waveFormsContainer.addEventListener('click', () => {
        waves.waveFormsContainer.setAttribute("style", "box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; width: 320px; height: 230px; cursor: pointer; filter: brightness(500%) sepia(100%); transition: filter " + flashDelay + "ms linear;");
        setTimeout(() =>{
          waves.waveFormsContainer.setAttribute("style", "box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; width: 320px; height: 230px; cursor: pointer; filter: brightness(100%) sepia(0%); transition: filter " + flashDelay + "ms linear;");

          switch(this.waveform) {
            case('sine'):
              this.waveform = 'square';
              this.oscillator.type = this.waveform;
              waves.sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden; transition: transform " + animTime + "s linear;");
              waves.square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden; transition: transform " + animTime + "s linear;");
              waves.sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden; visibility: hidden; transition: transform " + animTime + "s linear;");
              waves.sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
              waves.sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
              waves.triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(180deg); backface-visibility: visible; visibility: hidden; transition: transform " + animTime + "s linear;");
              waves.triangleImage.setAttribute("style", "visibility: hidden;");
              waves.triangleLabel.setAttribute("style", "visibility: hidden;");
              setTimeout(() => {
                waves.triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: visible; visibility: hidden;");
                waves.sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden; visibility: visible;");
              }, (animTime * 1000));
              break;
            case('square'):
              this.waveform = 'sawtooth';
              this.oscillator.type = this.waveform;
              waves.sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(180deg); backface-visibility: hidden; visibility: hidden; transition: transform " + animTime + "s linear;");
              waves.sineImage.setAttribute("style", "visibility: hidden;");
              waves.sineLabel.setAttribute("style", "visibility: hidden;");
              waves.square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden; transition: transform " + animTime + "s linear;");
              waves.sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden; visibility: visible; transition: transform " + animTime + "s linear;");
              waves.triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible; visibility: hidden; transition: transform " + animTime + "s linear;");
              setTimeout(() => {
                waves.sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
                waves.triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible; visibility: visible;");
              }, (animTime * 1000));
              break;
            case('sawtooth'):
              this.waveform = 'triangle';
              this.oscillator.type = this.waveform;
              waves.sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; visibility: visible; transform: rotateY(-90deg); backface-visibility: hidden; transition: transform " + animTime + "s linear;");
              waves.square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(180deg); backface-visibility: hidden; visibility: hidden; transition: transform " + animTime + "s linear;");
              waves.squareImage.setAttribute("style", "visibility: hidden;");
              waves.squareLabel.setAttribute("style", "visibility: hidden;");
              waves.sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden; visibility: visible; transition: transform " + animTime + "s linear;");
              waves.triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: visible; visibility: visible; transition: transform " + animTime + "s linear;");
              waves.triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
              waves.triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
              setTimeout(() => {
                waves.square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
                waves.sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
                waves.sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
              }, (animTime * 1000));
              break;
            case('triangle'):
              this.waveform = 'sine';
              this.oscillator.type = this.waveform;
              waves.sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden; visibility: visible; transition: transform " + animTime + "s linear;");
              waves.square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden; visibility: hidden; transition: transform " + animTime + "s linear;");
              waves.sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(180deg); backface-visibility: hidden; visibility: hidden; transition: transform " + animTime + "s linear;");
              waves.sawtoothImage.setAttribute("style", "visibility: hidden;");
              waves.sawtoothLabel.setAttribute("style", "visibility: hidden;");
              waves.triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: visible; visibility: hidden; transition: transform " + animTime + "s linear;");
              setTimeout(() => {
                waves.square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden; visibility: visible;");
                waves.squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
                waves.squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
                waves.sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
              }, (animTime * 1000));
              break;
            default:
              alert('unsupported waveform');
          }
        }, flashDelay);
      });

    }

    this.userFrequencyInput = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.hertz = display.value;
        this.oscillator.frequency.value = (this.hertz);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.hertz = slider.value;
        this.oscillator.frequency.value = (this.hertz);
      });
    }

    // rendering functions

    this.renderDraggable = () => {
      let div = document.createElement('div');
      let testtoneTop = document.createElement('div');
      div.appendChild(testtoneTop);
      let nameTag = document.createElement('h1');
      testtoneTop.appendChild(nameTag);
      let signalPanel = document.createElement('div');
      div.appendChild(signalPanel);
      let outputLabel = document.createElement('p');
      signalPanel.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      signalPanel.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let face = document.createElement('div');
      div.appendChild(face);
      let frequencyPane = document.createElement('div');
      face.appendChild(frequencyPane);
      let hertzLabel = document.createElement('h3');
      frequencyPane.appendChild(hertzLabel);
      hertzLabel.innerHTML = 'Hertz:';
      let testToneFrequency = document.createElement('input');
      frequencyPane.appendChild(testToneFrequency);
      testToneFrequency.type = 'number';
      testToneFrequency.min = "1.000";
      testToneFrequency.max = "11025.000";
      testToneFrequency.step = "0.001";
      testToneFrequency.value = this.hertz;
      let testToneFrequencySlider = document.createElement('input');
      frequencyPane.appendChild(testToneFrequencySlider);
      testToneFrequencySlider.type = "range";
      testToneFrequencySlider.min = "1.000";
      testToneFrequencySlider.max = "11025.000";
      testToneFrequencySlider.step = "0.001";
      testToneFrequencySlider.value = this.hertz;
      let waveformSelectDiv = document.createElement('div');
      frequencyPane.appendChild(waveformSelectDiv);
      let waveformLabel = document.createElement('h3');
      waveformSelectDiv.appendChild(waveformLabel);
      waveformLabel.innerHTML = 'Waveform:';
      let waveFormsContainer = document.createElement('div');
      waveformSelectDiv.appendChild(waveFormsContainer);
      let sine = document.createElement('div');
      waveFormsContainer.appendChild(sine);
      let sineLabel = document.createElement('p');
      sine.appendChild(sineLabel);
      sineLabel.innerHTML = "sine";
      let sineImage = document.createElement('img');
      sine.appendChild(sineImage);
      sineImage.src = "./img/noun_589707_cc.png";
      let square = document.createElement('div');
      waveFormsContainer.appendChild(square);
      let squareLabel = document.createElement('p');
      square.appendChild(squareLabel);
      squareLabel.innerHTML = "square";
      let squareImage = document.createElement('img');
      square.appendChild(squareImage);
      squareImage.src = "./img/noun_538698_cc.png";
      let sawtooth = document.createElement('div');
      waveFormsContainer.appendChild(sawtooth);
      let sawtoothLabel = document.createElement('p');
      sawtooth.appendChild(sawtoothLabel);
      sawtoothLabel.innerHTML = "sawtooth";
      let sawtoothImage = document.createElement('img');
      sawtooth.appendChild(sawtoothImage);
      sawtoothImage.src = "./img/noun_538692_cc.png";
      let triangle = document.createElement('div');
      waveFormsContainer.appendChild(triangle);
      let triangleLabel = document.createElement('p');
      triangle.appendChild(triangleLabel);
      triangleLabel.innerHTML = "triangle";
      let triangleImage = document.createElement('img');
      triangle.appendChild(triangleImage);
      triangleImage.src = "./img/noun_538696_cc.png";
      let volumePane = document.createElement('div');
      face.appendChild(volumePane);
      let volumeLabel = document.createElement('h3');
      volumePane.appendChild(volumeLabel);
      volumeLabel.innerHTML = 'Volume:';
      let testToneVolume = document.createElement('input');
      volumePane.appendChild(testToneVolume);
      testToneVolume.type = "number";
      testToneVolume.min = "0";
      testToneVolume.max = "100";
      testToneVolume.step = "1";
      testToneVolume.value = this.gainValue;
      let testToneVolumeSlider = document.createElement('input');
      volumePane.appendChild(testToneVolumeSlider);
      testToneVolumeSlider.type = "range";
      testToneVolumeSlider.min = "0";
      testToneVolumeSlider.max = "100";
      testToneVolumeSlider.step = "1";
      testToneVolumeSlider.value = this.gainValue;
      let light = document.createElement('div');
      volumePane.appendChild(light);
      let switchLabel = document.createElement('label');
      volumePane.appendChild(switchLabel);
      switchLabel.className = "testToneSwitch";
      let testToneOnOff = document.createElement('input');
      switchLabel.appendChild(testToneOnOff);
      testToneOnOff.type = "checkbox";
      testToneOnOff.checked = this.deviceOn;
      let sliderSpan = document.createElement('span');
      switchLabel.appendChild(sliderSpan);
      sliderSpan.className = "testToneSlider";

      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5);");
      testtoneTop.setAttribute("style", "width: 100%; background: url(" + this.topPath + "); background-size: " + this.topSize + "; font-family: 'Righteous', cursive; height: 60px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + this.topRepeat + ";");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 40px; margin-left: 2em; margin-top: 6em; color: " + this.topFontColor + "; font-weight: 600; text-shadow: 1px 1px 1px " + this.topFontShadow + ", 2px 2px 1px " + this.topFontShadow + ";");
      signalPanel.setAttribute("style", "background: url(" + this.signalPath + "); background-size: " + this.signalSize + "; border: solid 1px transparent; height: " + this.dragHeight + "px; width: 59px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: -6px; margin-top: -26px; box-shadow: 0px -1px 1px " + this.signalFontShadow + ";");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; margin-left: 1px; margin-top: 228px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      face.setAttribute("style", "height: " + this.dragHeight + "px; width: 100%; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: " + this.faceRepeat + "; margin-top: -464px; margin-left: 61px; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ";");
      face.className = 'pure-g';
      frequencyPane.className = 'pure-u-1-3';
      frequencyPane.setAttribute("style", "width: " + (this.dragWidth/2) + "px; height: " + this.dragHeight + "px;");
      hertzLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 42px; padding: 5px 0 3px 15px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      testToneFrequency.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 56px; margin-left: 3vmin; margin-top: 0; background: url(" + this.displayPath + "); background-size: " + this.frequencySize + "; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; position: relative; margin: -40px 0 0 15px;");
      testToneFrequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); width: 95%; background: url(" + this.frequencySliderPath + "); background-size: " + this.frequencySliderSize + "; outline: none; opacity: 1.0; margin-left: 190px; margin-top: 87px; box-shadow: 1px -1px 1px " + this.frequenySliderBoxShadow + ", 2px -2px 1px " + this.frequenySliderBoxShadow + ", 3px -3px 1px " + this.frequenySliderBoxShadow + ", 4px -4px 1px " + this.frequenySliderBoxShadow + "; height: 52px;");
      switch(this.skinName) {
        case('Test Tone: January A'):
          testToneFrequencySlider.className = 'testtoneJanuaryASlider';
          testToneVolumeSlider.className = 'testtoneJanuaryASlider';
          break;
        case('Test Tone: January B'):
          testToneFrequencySlider.className = 'testtoneJanuaryBSlider';
          testToneVolumeSlider.className = 'testtoneJanuaryBSlider';
          break;
        case('Test Tone: January C'):
          testToneFrequencySlider.className = 'testtoneJanuaryCSlider';
          testToneVolumeSlider.className = 'testtoneJanuaryCSlider';
          break;
        case('Test Tone: February A'):
          testToneFrequencySlider.className = 'testtoneFebruaryASlider';
          testToneVolumeSlider.className = 'testtoneFebruaryASlider';
          break;
        case('Test Tone: February B'):
          testToneFrequencySlider.className = 'testtoneFebruaryBSlider';
          testToneVolumeSlider.className = 'testtoneFebruaryBSlider';
          break;
        case('Test Tone: February C'):
          testToneFrequencySlider.className = 'testtoneFebruaryCSlider';
          testToneVolumeSlider.className = 'testtoneFebruaryCSlider';
          break;
        case('Test Tone: March A'):
          testToneFrequencySlider.className = 'testtoneMarchASlider';
          testToneVolumeSlider.className = 'testtoneFebruaryCSlider';
          break;
        case('Test Tone: March B'):
          testToneFrequencySlider.className = 'testtoneMarchBSlider';
          testToneVolumeSlider.className = 'testtoneMarchBSlider';
          break;
        case('Test Tone: March C'):
          testToneFrequencySlider.className = 'testtoneMarchCSlider';
          testToneVolumeSlider.className = 'testtoneMarchCSlider';
          break;
        case('Test Tone: April A'):
          testToneFrequencySlider.className = 'testtoneAprilASlider';
          testToneVolumeSlider.className = 'testtoneAprilASlider';
          break;
        case('Test Tone: April B'):
          testToneFrequencySlider.className = 'testtoneAprilBSlider';
          testToneVolumeSlider.className = 'testtoneAprilBSlider';
          break;
        case('Test Tone: April C'):
          testToneFrequencySlider.className = 'testtoneAprilCSlider';
          testToneVolumeSlider.className = 'testtoneAprilCSlider';
          break;
        case('Test Tone: May A'):
          testToneFrequencySlider.className = 'testtoneMayASlider';
          testToneVolumeSlider.className = 'testtoneMayASlider';
          break;
        case('Test Tone: May B'):
          testToneFrequencySlider.className = 'testtoneMayBSlider';
          testToneVolumeSlider.className = 'testtoneMayBSlider';
          break;
        case('Test Tone: May C'):
          testToneFrequencySlider.className = 'testtoneMayCSlider';
          testToneVolumeSlider.className = 'testtoneMayCSlider';
          break;
        default:
          console.log('unsupported test tone skin');
      }
      waveformSelectDiv.setAttribute("style", "position: relative; width: 320px; height: 290px; margin: -130px 0 0 15px;");
      waveformLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 42px; margin: -25px 0 3px 0; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      waveFormsContainer.setAttribute("style", "box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; width: 320px; height: 230px; cursor: pointer;");
      if (this.waveform === 'sine') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: visible;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      }
      if (this.waveform === 'square') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
      }
      if (this.waveform === 'sawtooth') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      }
      if (this.waveform === 'triangle') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden; visibility: visible;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: visible;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      }
      let waveFormsObject = {
        sine: sine,
        sineLabel: sineLabel,
        sineImage: sineImage,
        square: square,
        squareLabel: squareLabel,
        squareImage: squareImage,
        sawtooth: sawtooth,
        sawtoothLabel: sawtoothLabel,
        sawtoothImage: sawtoothImage,
        triangle: triangle,
        triangleLabel: triangleLabel,
        triangleImage: triangleImage,
        waveFormsContainer: waveFormsContainer
      };
      volumePane.classname = "pure-u-1-3";
      volumePane.setAttribute("style", "width: " + (this.dragWidth/2) + "px; height: " + this.dragHeight + "px; float: right; position: relative; top: 0; margin-top: -453px;");
      volumeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      testToneVolume.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 56px; margin-left: 3vmin; margin-top: 0; background: url(" + this.volumePath + "); background-size: " + this.volumeSize + "; box-shadow: -1px -1px 1px " + this.volumeBoxShadowColor + ", -2px -2px 1px " + this.volumeBoxShadowColor + ", -3px -3px 1px " + this.volumeBoxShadowColor + ", -4px -4px 1px " + this.volumeBoxShadowColor + "; position: relative; margin: 0 0 0 25px;");
      testToneVolumeSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: ratateZ(-90deg); transform: rotateZ(-90deg); width: 95%; background: url(" + this.frequencySliderPath + "); background-size: " + this.frequencySliderSize + "; outline: none; opacity: 1.0; margin-left: 20px; margin-top: 87px; box-shadow: 1px -1px 1px " + this.frequenySliderBoxShadow + ", 2px -2px 1px " + this.frequenySliderBoxShadow + ", 3px -3px 1px " + this.frequenySliderBoxShadow + ", 4px -4px 1px " + this.frequenySliderBoxShadow + "; height: 52px;");
      if (this.deviceOn) {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5); filter: hue-rotate(0deg) contrast(100%);");
        light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: visible;");
      } else {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5); filter: hue-rotate(180deg) contrast(50%);");
        light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: hidden;");
      }
      switchLabel.setAttribute("style", "float: right; margin: 0 50px 0 0;");

      this.userFrequencyInput(testToneFrequency, testToneFrequencySlider);
      this.manageWaveformSelector(waveFormsObject);
      this.manageVolumeInput(testToneVolume, testToneVolumeSlider, light);
      this.onOffFunctionalityDrag(testToneOnOff, light, div);

      function dragElement(element, obj) {

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (testtoneTop) {
          testtoneTop.onmousedown = dragMouseDown;
        } else {
          element.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          element.style.top = (element.offsetTop - pos2) + "px";
          element.style.left = (element.offsetLeft - pos1) + "px";
          obj.positionX = (element.offsetLeft - pos1);
          obj.positionY = (element.offsetTop - pos2);
          trackCursorLocation();
          updateConnectors(obj);
        }

        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = trackCursorLocation;
          obj.positionX = (element.offsetLeft - pos1);
          obj.positionY = (element.offsetTop - pos2);
        }
      }

      dragElement(div, this);

      div.addEventListener('mouseover', () => {
        this.mouseOn = true;
        if (this.deviceOn) {
          div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(0deg) contrast(100%); transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
          updateConnectors(this);
          setTimeout(() => {
            updateConnectors(this);
          }, 100);
        } else {
          div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(180deg) contrast(50%); transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
          updateConnectors(this);
          setTimeout(() => {
            updateConnectors(this);
          }, 100);
        }

      });

      div.addEventListener('mouseout', () => {
        this.mouseOn = false;
        if (this.deviceOn) {
          div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(0deg) contrast(100%); transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
          updateConnectors(this);
          setTimeout(() => {
            updateConnectors(this);
          }, 100);
        } else {
          div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(180deg) contrast(50%); transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
          updateConnectors(this);
          setTimeout(() => {
            updateConnectors(this);
          }, 100);
        }
      });

      outputPort.addEventListener('click', () => {
        if (this.output === null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'test_tone' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'test_tone');
        }
        // alert(outputPort.id);
      });

      return(div);
    }

    this.renderRackHorizontal = (x, y) => {

      let div = document.createElement('div');
      let nameAndOutputDiv = document.createElement('div');
      div.appendChild(nameAndOutputDiv);
      let nameTag = document.createElement('h1');
      nameAndOutputDiv.appendChild(nameTag);
      let outputPort = document.createElement('h1');
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let frequencySelectorDiv = document.createElement('div');
      div.appendChild(frequencySelectorDiv);
      let frequencyLabel = document.createElement('h3');
      frequencySelectorDiv.appendChild(frequencyLabel);
      frequencyLabel.innerHTML = "Hertz:";
      let testToneFrequency = document.createElement('input');
      frequencySelectorDiv.appendChild(testToneFrequency);
      testToneFrequency.type = "number";
      testToneFrequency.min = "1.000";
      testToneFrequency.max = "11025.000";
      testToneFrequency.step = "0.001";
      testToneFrequency.value = this.hertz;
      let testToneFrequencySlider = document.createElement('input');
      frequencySelectorDiv.appendChild(testToneFrequencySlider);
      testToneFrequencySlider.type = "range";
      testToneFrequencySlider.min = "1.000";
      testToneFrequencySlider.max = "11025.000";
      testToneFrequencySlider.step = "0.001";
      testToneFrequencySlider.value = this.hertz;
      let waveformSelectDiv = document.createElement('div');
      div.appendChild(waveformSelectDiv);
      let testToneWaveLabel = document.createElement('h3');
      waveformSelectDiv.appendChild(testToneWaveLabel);
      testToneWaveLabel.innerHTML = 'Waveform:';
      let waveFormsContainer = document.createElement('div');
      waveformSelectDiv.appendChild(waveFormsContainer);
      let sine = document.createElement('div');
      waveFormsContainer.appendChild(sine);
      let sineLabel = document.createElement('p');
      sine.appendChild(sineLabel);
      sineLabel.innerHTML = "sine";
      let sineImage = document.createElement('img');
      sine.appendChild(sineImage);
      sineImage.src = "./img/noun_589707_cc.png";
      let square = document.createElement('div');
      waveFormsContainer.appendChild(square);
      let squareLabel = document.createElement('p');
      square.appendChild(squareLabel);
      squareLabel.innerHTML = "square";
      let squareImage = document.createElement('img');
      square.appendChild(squareImage);
      squareImage.src = "./img/noun_538698_cc.png";
      let sawtooth = document.createElement('div');
      waveFormsContainer.appendChild(sawtooth);
      let sawtoothLabel = document.createElement('p');
      sawtooth.appendChild(sawtoothLabel);
      sawtoothLabel.innerHTML = "sawtooth";
      let sawtoothImage = document.createElement('img');
      sawtooth.appendChild(sawtoothImage);
      sawtoothImage.src = "./img/noun_538692_cc.png";
      let triangle = document.createElement('div');
      waveFormsContainer.appendChild(triangle);
      let triangleLabel = document.createElement('p');
      triangle.appendChild(triangleLabel);
      triangleLabel.innerHTML = "triangle";
      let triangleImage = document.createElement('img');
      triangle.appendChild(triangleImage);
      triangleImage.src = "./img/noun_538696_cc.png";
      let volumePane = document.createElement('div');
      div.appendChild(volumePane);
      let volumeLabel = document.createElement('h3');
      volumePane.appendChild(volumeLabel);
      volumeLabel.innerHTML = 'Volume:';
      let testToneVolume = document.createElement('input');
      volumePane.appendChild(testToneVolume);
      testToneVolume.type = "number";
      testToneVolume.min = "0";
      testToneVolume.max = "100";
      testToneVolume.step = "1";
      testToneVolume.value = this.gainValue;
      let br = document.createElement('br');
      volumePane.appendChild(br);
      let testToneVolumeSlider = document.createElement('input');
      volumePane.appendChild(testToneVolumeSlider);
      testToneVolumeSlider.type = "range";
      testToneVolumeSlider.min = "0";
      testToneVolumeSlider.max = "100";
      testToneVolumeSlider.step = "1";
      testToneVolumeSlider.value = this.gainValue;
      let lightDiv = document.createElement('div');
      volumePane.appendChild(lightDiv);
      let light = document.createElement('div');
      lightDiv.appendChild(light);
      let switchDiv = document.createElement('div');
      volumePane.appendChild(switchDiv);
      let switchLabel = document.createElement('label');
      switchDiv.appendChild(switchLabel);
      switchLabel.className = "testToneSwitch";
      let testToneOnOff = document.createElement('input');
      switchLabel.appendChild(testToneOnOff);
      testToneOnOff.type = "checkbox";
      testToneOnOff.checked = this.deviceOn;
      let sliderSpan = document.createElement('span');
      switchLabel.appendChild(sliderSpan);
      sliderSpan.className = "testToneSlider";

      div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/8) + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 5px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + ";");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 25px; margin-top: 1px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 35px; margin-top: -15px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      frequencySelectorDiv.setAttribute("style", "float: left; height: " + this.horizontalHeight + "px; width: " + ((this.horizontalWidth/16) * 5) + "px;");
      frequencyLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 10px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      testToneFrequency.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencySize + "; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; position: relative; margin: 5px 0 0 10px;");
      testToneFrequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; width: 95%; background: url(" + this.frequencySliderPath + "); background-size: " + this.frequencySliderSize + "; outline: none; opacity: 1.0; margin-left: 10px; margin-top: 30px; box-shadow: -1px -1px 1px " + this.frequenySliderBoxShadow + ", -2px -2px 1px " + this.frequenySliderBoxShadow + ", -3px -3px 1px " + this.frequenySliderBoxShadow + ", -4px -4px 1px " + this.frequenySliderBoxShadow + "; height: 32px;");
      switch(this.skinName) {
        case('Test Tone: January A'):
          testToneFrequencySlider.className = 'testtoneJanuaryASliderHorizontal';
          testToneVolumeSlider.className = 'testtoneJanuaryASliderHorizontal';
          break;
        case('Test Tone: January B'):
          testToneFrequencySlider.className = 'testtoneJanuaryBSliderHorizontal';
          testToneVolumeSlider.className = 'testtoneJanuaryBSliderHorizontal';
          break;
        case('Test Tone: January C'):
          testToneFrequencySlider.className = 'testtoneJanuaryCSliderHorizontal';
          testToneVolumeSlider.className = 'testtoneJanuaryCSliderHorizontal';
          break;
        case('Test Tone: February A'):
          testToneFrequencySlider.className = 'testtoneFebruaryASliderHorizontal';
          testToneVolumeSlider.className = 'testtoneFebruaryASliderHorizontal';
          break;
        case('Test Tone: February B'):
          testToneFrequencySlider.className = 'testtoneFebruaryBSliderHorizontal';
          testToneVolumeSlider.className = 'testtoneFebruaryBSliderHorizontal';
          break;
        case('Test Tone: February C'):
          testToneFrequencySlider.className = 'testtoneFebruaryCSliderHorizontal';
          testToneVolumeSlider.className = 'testtoneFebruaryCSliderHorizontal';
          break;
        case('Test Tone: March A'):
          testToneFrequencySlider.className = 'testtoneMarchASliderHorizontal';
          testToneVolumeSlider.className = 'testtoneFebruaryCSliderHorizontal';
          break;
        case('Test Tone: March B'):
          testToneFrequencySlider.className = 'testtoneMarchBSliderHorizontal';
          testToneVolumeSlider.className = 'testtoneMarchBSliderHorizontal';
          break;
        case('Test Tone: March C'):
          testToneFrequencySlider.className = 'testtoneMarchCSliderHorizontal';
          testToneVolumeSlider.className = 'testtoneMarchCSliderHorizontal';
          break;
        case('Test Tone: April A'):
          testToneFrequencySlider.className = 'testtoneAprilASliderHorizontal';
          testToneVolumeSlider.className = 'testtoneAprilASliderHorizontal';
          break;
        case('Test Tone: April B'):
          testToneFrequencySlider.className = 'testtoneAprilBSliderHorizontal';
          testToneVolumeSlider.className = 'testtoneAprilBSliderHorizontal';
          break;
        case('Test Tone: April C'):
          testToneFrequencySlider.className = 'testtoneAprilCSliderHorizontal';
          testToneVolumeSlider.className = 'testtoneAprilCSliderHorizontal';
          break;
        case('Test Tone: May A'):
          testToneFrequencySlider.className = 'testtoneMayASliderHorizontal';
          testToneVolumeSlider.className = 'testtoneMayASliderHorizontal';
          break;
        case('Test Tone: May B'):
          testToneFrequencySlider.className = 'testtoneMayBSliderHorizontal';
          testToneVolumeSlider.className = 'testtoneMayBSliderHorizontal';
          break;
        case('Test Tone: May C'):
          testToneFrequencySlider.className = 'testtoneMayCSliderHorizontal';
          testToneVolumeSlider.className = 'testtoneMayCSliderHorizontal';
          break;
        default:
          console.log('unsupported test tone skin');
      }
      waveformSelectDiv.setAttribute("style", "float: left; height: " + (this.horizontalHeight * 2) + "px; width: " + ((this.horizontalWidth/3) + 30) + "px; transform: scale(0.5); margin: " + ((this.horizontalHeight/2) * -1) + "px 0 0 " + ((this.horizontalWidth/11) * -1) + "px; padding: 2px 0 1px 5px;");
      testToneWaveLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 48px; margin: 5px 0 8px 10px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      waveFormsContainer.setAttribute("style", "box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; width: 320px; height: 230px; cursor: pointer;");
      if (this.waveform === 'sine') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: visible;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      }
      if (this.waveform === 'square') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
      }
      if (this.waveform === 'sawtooth') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      }
      if (this.waveform === 'triangle') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden; visibility: visible;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: visible;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      }
      let waveFormsObject = {
        sine: sine,
        sineLabel: sineLabel,
        sineImage: sineImage,
        square: square,
        squareLabel: squareLabel,
        squareImage: squareImage,
        sawtooth: sawtooth,
        sawtoothLabel: sawtoothLabel,
        sawtoothImage: sawtoothImage,
        triangle: triangle,
        triangleLabel: triangleLabel,
        triangleImage: triangleImage,
        waveFormsContainer: waveFormsContainer
      };
      volumePane.setAttribute("style", "position: relative; float: right; height: " + this.horizontalHeight + "px; width: " + ((this.horizontalWidth/64) * 17) + "px; margin-right: 0;");
      volumeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px -80px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      testToneVolume.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.volumeSize + "; box-shadow: -1px -1px 1px " + this.volumeBoxShadowColor + ", -2px -2px 1px " + this.volumeBoxShadowColor + ", -3px -3px 1px " + this.volumeBoxShadowColor + ", -4px -4px 1px " + this.volumeBoxShadowColor + "; position: relative; margin: 5px 0 0 -70px;");
      testToneVolumeSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; width: 95%; background: url(" + this.volumeSliderPath + "); background-size: " + this.volumeSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.volumeSliderBoxShadowColor + ", -2px -2px 1px " + this.volumeSliderBoxShadowColor + ", -3px -3px 1px " + this.volumeSliderBoxShadowColor + ", -4px -4px 1px " + this.volumeSliderBoxShadowColor + "; height: 32px; margin: 30px 0 0 -70px;");
      lightDiv.setAttribute("style", "transform: scale(0.5); margin: -10px 0 0 -100px;");
      if (this.deviceOn) {
        div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; filter: hue-rotate(0deg) contrast(100%); transition: filter 0.5s linear;");
        light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: visible;");
      } else {
        div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; filter: hue-rotate(180deg) contrast(50%); transition: filter 0.5s linear;");
        light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: hidden;");
      }
      switchDiv.setAttribute("style", "float: right; margin: -120px 0 0 40px; transform: scale(0.5);");

      outputPort.addEventListener('click', () => {
        if (this.output === null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'test_tone' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'test_tone');
        }
        // alert('Test Tone Output Port -- id: ' + this.id);
      });

      this.userFrequencyInput(testToneFrequency, testToneFrequencySlider);
      this.manageWaveformSelector(waveFormsObject);
      this.manageVolumeInput(testToneVolume, testToneVolumeSlider, light);
      this.onOffFunctionalityHorizontal(testToneOnOff, light, div, x, y);

      return(div);
    }

    this.renderRackVertical = (x, y) => {

      let div = document.createElement('div');
      let nameAndOutputDiv = document.createElement('div');
      div.appendChild(nameAndOutputDiv);
      let nameTag = document.createElement('h1');
      nameAndOutputDiv.appendChild(nameTag);
      nameTag.innerHTML = this.name;
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output' + this.name + this.id;
      let frequencySelectorDiv = document.createElement('div');
      div.appendChild(frequencySelectorDiv);
      let hertzLabel = document.createElement('h3');
      frequencySelectorDiv.appendChild(hertzLabel);
      hertzLabel.innerHTML = 'Hertz:';
      let testToneFrequency = document.createElement('input');
      frequencySelectorDiv.appendChild(testToneFrequency);
      testToneFrequency.type = "number";
      testToneFrequency.min = "1.000";
      testToneFrequency.max = "11025.000";
      testToneFrequency.step = "0.001";
      testToneFrequency.value = this.hertz;
      let testToneFrequencySlider = document.createElement('input');
      frequencySelectorDiv.appendChild(testToneFrequencySlider);
      testToneFrequencySlider.type = "range";
      testToneFrequencySlider.min = "1.000";
      testToneFrequencySlider.max = "11025.000";
      testToneFrequencySlider.step = "0.001";
      testToneFrequencySlider.value = this.hertz;
      let waveFormSelectorDiv = document.createElement('div');
      div.appendChild(waveFormSelectorDiv);
      let waveformLabel = document.createElement('h3');
      waveFormSelectorDiv.appendChild(waveformLabel);
      waveformLabel.innerHTML = 'Waveform:';
      let waveFormsContainer = document.createElement('div');
      waveFormSelectorDiv.appendChild(waveFormsContainer);
      let sine = document.createElement('div');
      waveFormsContainer.appendChild(sine);
      let sineLabel = document.createElement('p');
      sine.appendChild(sineLabel);
      sineLabel.innerHTML = "sine";
      let sineImage = document.createElement('img');
      sine.appendChild(sineImage);
      sineImage.src = "./img/noun_589707_cc.png";
      let square = document.createElement('div');
      waveFormsContainer.appendChild(square);
      let squareLabel = document.createElement('p');
      square.appendChild(squareLabel);
      squareLabel.innerHTML = "square";
      let squareImage = document.createElement('img');
      square.appendChild(squareImage);
      squareImage.src = "./img/noun_538698_cc.png";
      let sawtooth = document.createElement('div');
      waveFormsContainer.appendChild(sawtooth);
      let sawtoothLabel = document.createElement('p');
      sawtooth.appendChild(sawtoothLabel);
      sawtoothLabel.innerHTML = "sawtooth";
      let sawtoothImage = document.createElement('img');
      sawtooth.appendChild(sawtoothImage);
      sawtoothImage.src = "./img/noun_538692_cc.png";
      let triangle = document.createElement('div');
      waveFormsContainer.appendChild(triangle);
      let triangleLabel = document.createElement('p');
      triangle.appendChild(triangleLabel);
      triangleLabel.innerHTML = "triangle";
      let triangleImage = document.createElement('img');
      triangle.appendChild(triangleImage);
      triangleImage.src = "./img/noun_538696_cc.png";
      let volumeSelectorDiv = document.createElement('div');
      div.appendChild(volumeSelectorDiv);
      let volumeLabel = document.createElement('h3');
      volumeSelectorDiv.appendChild(volumeLabel);
      volumeLabel.innerHTML = "Volume:";
      let testToneVolume = document.createElement('input');
      volumeSelectorDiv.appendChild(testToneVolume);
      testToneVolume.type = "number";
      testToneVolume.min = "0";
      testToneVolume.max = "100";
      testToneVolume.step = "1";
      testToneVolume.value = this.gainValue;
      let testToneVolumeSlider = document.createElement('input');
      volumeSelectorDiv.appendChild(testToneVolumeSlider);
      testToneVolumeSlider.type = "range";
      testToneVolumeSlider.min = "0";
      testToneVolumeSlider.max = "100";
      testToneVolumeSlider.step = "1";
      testToneVolumeSlider.value = this.gainValue;
      let lightDiv = document.createElement('div');
      volumeSelectorDiv.appendChild(lightDiv);
      let light = document.createElement('div');
      lightDiv.appendChild(light);
      let switchDiv = document.createElement('div');
      volumeSelectorDiv.appendChild(switchDiv);
      let switchLabel = document.createElement('label');
      switchDiv.appendChild(switchLabel);
      switchLabel.className = "testToneSwitch";
      let testToneOnOff = document.createElement('input');
      switchLabel.appendChild(testToneOnOff);
      testToneOnOff.type = "checkbox";
      testToneOnOff.checked = this.deviceOn;
      let sliderSpan = document.createElement('span');
      switchLabel.appendChild(sliderSpan);
      sliderSpan.className = "testToneSlider";

      div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/8) + "px;");
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + "; position: relative; top: -10px; left: 5px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + "; margin-left: 8px; margin-top: -12px;");
      outputPort.setAttribute("style", "z-index: 6; cursor: pointer; font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; padding-left: 10px; position: relative; left: 80px; top: -62px;");
      frequencySelectorDiv.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + ((this.verticalHeight/16) * 7) + "px;");
      hertzLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; padding: 3px 0 3px 10px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      testToneFrequency.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencySize + "; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; position: relative; margin: -55px 0 0 8px;");
      testToneFrequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); width: 95%; background: url(" + this.frequencySliderPath + "); background-size: " + this.frequencySliderSize + "; outline: none; opacity: 1.0; margin-left: 60px; margin-top: 70px; box-shadow: 1px -1px 1px " + this.frequenySliderBoxShadow + ", 2px -2px 1px " + this.frequenySliderBoxShadow + ", 3px -3px 1px " + this.frequenySliderBoxShadow + ", 4px -4px 1px " + this.frequenySliderBoxShadow + "; height: 32px;");
      switch(this.skinName) {
        case('Test Tone: January A'):
          testToneFrequencySlider.className = 'testtoneJanuaryASliderVertical';
          testToneVolumeSlider.className = 'testtoneJanuaryASliderVertical';
          break;
        case('Test Tone: January B'):
          testToneFrequencySlider.className = 'testtoneJanuaryBSliderVertical';
          testToneVolumeSlider.className = 'testtoneJanuaryBSliderVertical';
          break;
        case('Test Tone: January C'):
          testToneFrequencySlider.className = 'testtoneJanuaryCSliderVertical';
          testToneVolumeSlider.className = 'testtoneJanuaryCSliderVertical';
          break;
        case('Test Tone: February A'):
          testToneFrequencySlider.className = 'testtoneFebruaryASliderVertical';
          testToneVolumeSlider.className = 'testtoneFebruaryASliderVertical';
          break;
        case('Test Tone: February B'):
          testToneFrequencySlider.className = 'testtoneFebruaryBSliderVertical';
          testToneVolumeSlider.className = 'testtoneFebruaryBSliderVertical';
          break;
        case('Test Tone: February C'):
          testToneFrequencySlider.className = 'testtoneFebruaryCSliderVertical';
          testToneVolumeSlider.className = 'testtoneFebruaryCSliderVertical';
          break;
        case('Test Tone: March A'):
          testToneFrequencySlider.className = 'testtoneMarchASliderVertical';
          testToneVolumeSlider.className = 'testtoneFebruaryCSliderVertical';
          break;
        case('Test Tone: March B'):
          testToneFrequencySlider.className = 'testtoneMarchBSliderVertical';
          testToneVolumeSlider.className = 'testtoneMarchBSliderVertical';
          break;
        case('Test Tone: March C'):
          testToneFrequencySlider.className = 'testtoneMarchCSliderVertical';
          testToneVolumeSlider.className = 'testtoneMarchCSliderVertical';
          break;
        case('Test Tone: April A'):
          testToneFrequencySlider.className = 'testtoneAprilASliderVertical';
          testToneVolumeSlider.className = 'testtoneAprilASliderVertical';
          break;
        case('Test Tone: April B'):
          testToneFrequencySlider.className = 'testtoneAprilBSliderVertical';
          testToneVolumeSlider.className = 'testtoneAprilBSliderVertical';
          break;
        case('Test Tone: April C'):
          testToneFrequencySlider.className = 'testtoneAprilCSliderVertical';
          testToneVolumeSlider.className = 'testtoneAprilCSliderVertical';
          break;
        case('Test Tone: May A'):
          testToneFrequencySlider.className = 'testtoneMayASliderVertical';
          testToneVolumeSlider.className = 'testtoneMayASliderVertical';
          break;
        case('Test Tone: May B'):
          testToneFrequencySlider.className = 'testtoneMayBSliderVertical';
          testToneVolumeSlider.className = 'testtoneMayBSliderVertical';
          break;
        case('Test Tone: May C'):
          testToneFrequencySlider.className = 'testtoneMayCSliderVertical';
          testToneVolumeSlider.className = 'testtoneMayCSliderVertical';
          break;
        default:
          console.log('unsupported test tone skin');
      }
      waveFormSelectorDiv.setAttribute("style", "width: " + (this.verticalWidth * 2) + "px; height: " + ((this.verticalHeight/8) * 3) + "px; transform: scale(0.5); margin: -80px 0 0 -80px;");
      waveformLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 48px; margin: -25px 0 2px 4px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      waveFormsContainer.setAttribute("style", "box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; width: 320px; height: 230px; cursor: pointer;");
      if (this.waveform === 'sine') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: visible;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      }
      if (this.waveform === 'square') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
      }
      if (this.waveform === 'sawtooth') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      }
      if (this.waveform === 'triangle') {
        sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden; visibility: visible;");
        sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
        squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
        squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
        sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
        sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
        triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: visible;");
        triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
        triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      }
      let waveFormsObject = {
        sine: sine,
        sineLabel: sineLabel,
        sineImage: sineImage,
        square: square,
        squareLabel: squareLabel,
        squareImage: squareImage,
        sawtooth: sawtooth,
        sawtoothLabel: sawtoothLabel,
        sawtoothImage: sawtoothImage,
        triangle: triangle,
        triangleLabel: triangleLabel,
        triangleImage: triangleImage,
        waveFormsContainer: waveFormsContainer
      };
      volumeSelectorDiv.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + ((this.verticalHeight/32) * 11) + "px; position: relative; margin-top: -70px;");
      volumeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; padding: 3px 0 3px 10px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; margin: -7px 0 1px -1px;");
      testToneVolume.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.volumeSize + "; box-shadow: -1px -1px 1px " + this.volumeBoxShadowColor + ", -2px -2px 1px " + this.volumeBoxShadowColor + ", -3px -3px 1px " + this.volumeBoxShadowColor + ", -4px -4px 1px " + this.volumeBoxShadowColor + "; position: relative; margin: 3px 0 0 8px;");
      testToneVolumeSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); width: 95%; background: url(" + this.volumeSliderPath + "); background-size: " + this.volumeSliderSize + "; outline: none; opacity: 1.0; margin-left: 60px; margin-top: 25px; box-shadow: 1px -1px 1px " + this.volumeSliderBoxShadowColor + ", 2px -2px 1px " + this.volumeSliderBoxShadowColor + ", 3px -3px 1px " + this.volumeSliderBoxShadowColor + ", 4px -4px 1px " + this.volumeSliderBoxShadowColor + "; height: 32px;");
      lightDiv.setAttribute("style", "transform: scale(0.5); margin: 80px 0 0 -100px;");
      if (this.deviceOn) {
        div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; filter: hue-rotate(0deg) contrast(100%);");
        light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: visible;");
      } else {
        div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; filter: hue-rotate(180deg) contrast(50%);");
        light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: hidden;");
      }
      switchDiv.setAttribute("style", "float: left; margin: -50px 0 0 30px; transform: scale(0.7);");

      outputPort.addEventListener('click', () => {
        if (this.output === null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'test_tone' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'test_tone');
        }
        // alert('Test Tone Output Port -- id: ' + this.id);
      });

      this.userFrequencyInput(testToneFrequency, testToneFrequencySlider);
      this.manageWaveformSelector(waveFormsObject);
      this.manageVolumeInput(testToneVolume, testToneVolumeSlider, light);
      this.onOffFunctionalityVertical(testToneOnOff, light, div, x, y);

      return(div);
    }


  }

  return(testToneNode);
})();
