'use strict';

var OscillatorModule = (function(settings, skin, audioContext, boundingDiv) {

  let oscillatorNode = function(settings, skin, audioContext, boundingDiv) {
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
    this.positionX = settings.positionX;
    this.positionY = settings.positionY;
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
    this.frequencySliderBoxShadow = skin.frequency_slider_box_shadow;
    this.frequencyModulatorSelectPath = skin.frequency_modulator_select_path;
    this.frequencyModulatorSelectSize = skin.frequency_modulator_select_size;
    this.frequencyModulatorSelectRepeat = skin.frequency_modulator_select_repeat;
    this.frequencyModulatorSelectBoxShadowColor = skin.frequency_modulator_select_box_shadow_color;
    this.waveformModulatorSelectPath = skin.waveform_modulator_select_path;
    this.waveformModulatorSelectSize = skin.waveform_modulator_select_size;
    this.waveformModulatorSelectRepeat = skin.waveform_modulator_select_repeat;
    this.waveformModulatorSelectBoxShadowColor = skin.waveform_modulator_select_box_shadow_color;
    this.detunePath = skin.detune_path;
    this.detuneSize = skin.detune_size;
    this.detuneRepeat = skin.detune_repeat;
    this.detuneBoxShadowColor = skin.detune_box_shadow_color;
    this.detuneSliderPath = skin.detune_slider_path;
    this.detuneSliderSize = skin.detune_slider_size;
    this.detuneSliderRepeat = skin.detune_slider_repeat;
    this.detuneSliderBoxShadowColor = skin.detune_slider_box_shadow_color;
    this.detuneModulatorPath = skin.detune_modulator_path;
    this.detuneModulatorSize = skin.detune_modulator_size;
    this.detuneModulatorRepeat = skin.detune_modulator_repeat;
    this.detuneModulatorBoxShadowColor = skin.detune_modulator_box_shadow_color;

    this.dragWidth = 590;
    this.dragHeight = 450;
    this.horizontalWidth = 900;
    this.horizontalHeight = 160;
    this.verticalWidth = 160;
    this.verticalHeight = 750;

    this.dragScale = 1;

    this.setDragScale = (scale) => {
      this.dragScale = scale;
    }

    this.userWaveformInput = (sine, square, sawtooth, triangle) => {
      sine.addEventListener('click', () => {
        this.waveform = 'sine';
        this.oscillator.type = this.waveform;
        sine.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");
        square.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
        sawtooth.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
        triangle.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
      });
      square.addEventListener('click', () => {
        this.waveform = 'square';
        this.oscillator.type = this.waveform;
        square.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");
        sine.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
        sawtooth.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
        triangle.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
      });
      sawtooth.addEventListener('click', () => {
        this.waveform = 'sawtooth';
        this.oscillator.type = this.waveform;
        sawtooth.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");
        sine.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
        square.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
        triangle.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
      });
      triangle.addEventListener('click', () => {
        this.waveform = 'triangle';
        this.oscillator.type = this.waveform;
        triangle.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");
        sine.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
        square.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
        sawtooth.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
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

    this.userDetuneInput = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.detune = display.value;
        this.oscillator.detune.value = this.detune;
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.detune = display.value;
        this.oscillator.detune.value = this.detune;
      });
    }


    // rendering functions

    this.renderDraggable = () => {
      let div = document.createElement('div');
      let oscillatorTop = document.createElement('div');
      div.appendChild(oscillatorTop);
      let nameTag = document.createElement('h1');
      oscillatorTop.appendChild(nameTag);
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
      let waveform = document.createElement('div');
      face.appendChild(waveform);
      let waveLabel = document.createElement('p');
      waveform.appendChild(waveLabel);
      waveLabel.innerHTML = 'waveform:';
      let waveformSelector = document.createElement('ul');
      waveform.appendChild(waveformSelector);
      let sine = document.createElement('li');
      waveformSelector.appendChild(sine);
      let sineImg = document.createElement('img');
      sine.appendChild(sineImg);
      sineImg.src="./img/noun_589707_cc.png"
      let sineLabel = document.createElement('p');
      sine.appendChild(sineLabel);
      sineLabel.innerHTML = 'sine';
      let square = document.createElement('li');
      waveformSelector.appendChild(square);
      let squareImg = document.createElement('img');
      square.appendChild(squareImg);
      squareImg.src = './img/noun_538698_cc.png';
      let squareLabel = document.createElement('p');
      square.appendChild(squareLabel);
      squareLabel.innerHTML = 'square';
      let sawtooth = document.createElement('li');
      waveformSelector.appendChild(sawtooth);
      let sawtoothImg = document.createElement('img');
      sawtooth.appendChild(sawtoothImg);
      sawtoothImg.src = './img/noun_538692_cc.png';
      let sawtoothLabel = document.createElement('p');
      sawtooth.appendChild(sawtoothLabel);
      sawtoothLabel.innerHTML = 'sawtooth';
      let triangle = document.createElement('li');
      waveformSelector.appendChild(triangle);
      let triangleImg = document.createElement('img');
      triangle.appendChild(triangleImg);
      triangleImg.src = './img/noun_538696_cc.png';
      let triangleLabel = document.createElement('p');
      triangle.appendChild(triangleLabel);
      triangleLabel.innerHTML = 'triangle';
      let waveMod = document.createElement('div');
      waveform.appendChild(waveMod);
      let waveModLabel = document.createElement('p');
      waveMod.appendChild(waveModLabel);
      waveModLabel.innerHTML = 'modulator:';
      let waveModPort = document.createElement('h1');
      waveMod.appendChild(waveModPort);
      waveModPort.innerHTML = '◦';
      waveModPort.id = 'waveModulator ' + this.name + this.id;
      let leverSpace = document.createElement('div');
      face.appendChild(leverSpace);
      leverSpace.className = 'pure-u-2-3';
      let frequencyForm = document.createElement('div');
      frequencyForm.onsubmit = "return false";
      leverSpace.appendChild(frequencyForm);
      let hertzLabel = document.createElement('h3');
      frequencyForm.appendChild(hertzLabel);
      hertzLabel.innerHTML = 'Hertz:';
      let hertzDisplay = document.createElement('input');
      frequencyForm.appendChild(hertzDisplay);
      hertzDisplay.type = "number";
      hertzDisplay.name = "amountInput";
      hertzDisplay.min = "1.000";
      hertzDisplay.max = "11025.000";
      hertzDisplay.value = this.hertz.toString();
      hertzDisplay.step = "0.001";
      let hertzSlider = document.createElement('input');
      frequencyForm.appendChild(hertzSlider);
      hertzSlider.name = "amountRange";
      hertzSlider.type = "range";
      hertzSlider.min = "1.000";
      hertzSlider.max = "11025.000";
      hertzSlider.value = this.hertz.toString();
      hertzSlider.step = "0.001";
      hertzSlider.id = 'hertzSlider';
      let hertzModLabel = document.createElement('p');
      frequencyForm.appendChild(hertzModLabel);
      hertzModLabel.innerHTML = 'modulator:';
      let hertzModPort = document.createElement('h1');
      frequencyForm.appendChild(hertzModPort);
      hertzModPort.innerHTML = '◦';
      hertzModPort.id = 'hertzModPort ' + this.name + this.id;
      let detuneForm = document.createElement('div');
      leverSpace.appendChild(detuneForm);
      let detuneLabel = document.createElement('p');
      detuneForm.appendChild(detuneLabel);
      detuneLabel.innerHTML = 'Detune:';
      let detuneDisplay = document.createElement('input');
      detuneForm.appendChild(detuneDisplay);
      detuneDisplay.type = "number";
      detuneDisplay.name = "detuneQuantity";
      detuneDisplay.min = "-100.00";
      detuneDisplay.max = "100.00";
      detuneDisplay.step = "0.01";
      detuneDisplay.value = this.detune.toString();
      let detuneSlider = document.createElement('input');
      detuneForm.appendChild(detuneSlider);
      detuneSlider.type = "range";
      detuneSlider.name = "detuneAmountRange";
      detuneSlider.min = "-100.00";
      detuneSlider.max = "100.00";
      detuneSlider.step = "0.01";
      detuneSlider.value = this.detune.toString();
      let detuneModLabel = document.createElement('p');
      detuneForm.appendChild(detuneModLabel);
      detuneModLabel.innerHTML = 'modulator:';
      let detuneModPort = document.createElement('h1');
      detuneForm.appendChild(detuneModPort);
      detuneModPort.innerHTML = '◦';
      detuneModPort.id = 'detuneModPort ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(" + (0.5 * this.dragScale) + ");");
      oscillatorTop.setAttribute("style", "width: 100%; background: url(" + this.topPath + "); background-size: " + this.topSize + "; font-family: 'Righteous', cursive; height: 60px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + this.topRepeat + ";");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 40px; margin-left: 2em; margin-top: 6em; color: " + this.topFontColor + "; font-weight: 600; text-shadow: 1px 1px 1px " + this.topFontShadow + ", 2px 2px 1px " + this.topFontShadow + ";");
      signalPanel.setAttribute("style", "background: url(" + this.signalPath + "); background-size: " + this.signalSize + "; border: solid 1px transparent; height: 450px; width: 59px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: -6px; margin-top: -26px; box-shadow: 0px -1px 1px " + this.signalFontShadow + ";");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; margin-left: 1px; margin-top: 228px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      face.setAttribute("style", "height: 450px; width: 100%; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: " + this.faceRepeat + "; margin-top: -427px; margin-left: 58px; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ";");
      face.className = 'pure-g';
      waveform.className = 'pure-u-1-3';
      waveLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin: 1vmin 0 2vmin 2vmin; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      waveformSelector.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; width: 23%; list-style-type: none;");
      if (this.waveform === 'sine') {
        sine.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");
      } else {
        sine.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
      }
      sineImg.setAttribute("style", "width: 60px; height 60px;");
      sineLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 18px;");
      if (this.waveform === 'square') {
        square.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");
      } else {
        square.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
      }
      squareImg.setAttribute("style", "width: 60px; height 60px;");
      squareLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 18px;");
      if (this.waveform === 'sawtooth') {
        sawtooth.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");

      } else {
        sawtooth.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");

      }
      sawtoothImg.setAttribute("style", "width: 60px; height 60px;");
      sawtoothLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 14px;");
      if (this.waveform === 'triangle') {
        triangle.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");

      } else {
        triangle.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");

      }
      triangleImg.setAttribute("style", "width: 60px; height 60px;");
      triangleLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 18px;");
      waveMod.setAttribute("style", "margin: 2vmin 0 0 2vmin;");
      waveModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin: 1vmin 0 2vmin 2vmin; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      waveModPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 47px; margin-top: 5px; width: 8%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      leverSpace.setAttribute("style", "margin: -465px 0 0 35%;");
      hertzLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 3px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ", -3px -3px 1px " + this.faceFontShadow + ", -4px -4px 1px " + this.faceFontShadow + "; transform: translateY(-300px);");
      hertzDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 56px; margin-left: 5px; margin-top: -20px; background: url(" + this.displayPath + "); background-size: " + this.frequencySize + "; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; padding-left: 1vmin; width: 65%; transform: translateY(-300px);");
      hertzSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg) translateY(-300px); transform: translateY(-300px) rotateZ(-90deg); width: 95%; background: url(" + this.frequencySliderPath + "); background-size: " + this.frequencySliderSize + "; outline: none; opacity: 1.0; margin-left: 150px; margin-top: 80px; box-shadow: 1px -1px 1px " + this.frequencyBoxShadow + ", 2px -2px 1px " + this.frequencyBoxShadow + ", 3px -3px 1px " + this.frequencyBoxShadow + ", 4px -4px 1px " + this.frequencyBoxShadow + "; height: 52px; z-index: 60;");
      switch(this.skinName) {
        case('Oscillator: January A'):
          hertzSlider.className = 'oscillatorJanuaryASlider';
          detuneSlider.className = 'oscillatorDetuneJanuaryASlider';
          break;
        case('Oscillator: January B'):
          hertzSlider.className = 'oscillatorJanuaryBSlider';
          detuneSlider.className = 'oscillatorDetuneJanuaryBSlider';
          break;
        case('Oscillator: January C'):
          hertzSlider.className = 'oscillatorJanuaryCSlider';
          detuneSlider.className = 'oscillatorDetuneJanuaryCSlider';
          break;
        case('Oscillator: February A'):
          hertzSlider.className = 'oscillatorFebruaryASlider';
          detuneSlider.className = 'oscillatorDetuneFebruaryASlider';
          break;
        case('Oscillator: February B'):
          hertzSlider.className = 'oscillatorFebruaryBSlider';
          detuneSlider.className = 'oscillatorDetuneFebruaryBSlider';
          break;
        case('Oscillator: February C'):
          hertzSlider.className = 'oscillatorFebruaryCSlider';
          detuneSlider.className = 'oscillatorDetuneFebruaryCSlider';
          break;
        case('Oscillator: March A'):
          hertzSlider.className = 'oscillatorMarchASlider';
          detuneSlider.className = 'oscillatorDetuneMarchASlider';
          break;
        case('Oscillator: March B'):
          hertzSlider.className = 'oscillatorMarchBSlider';
          detuneSlider.className = 'oscillatorDetuneMarchBSlider';
          break;
        case('Oscillator: March C'):
          hertzSlider.className = 'oscillatorMarchCSlider';
          detuneSlider.className = 'oscillatorDetuneMarchCSlider';
          break;
        case('Oscillator: April A'):
          hertzSlider.className = 'oscillatorAprilASlider';
          detuneSlider.className = 'oscillatorDetuneAprilASlider';
          break;
        case('Oscillator: April B'):
          hertzSlider.className = 'oscillatorAprilBSlider';
          detuneSlider.className = 'oscillatorDetuneAprilBSlider';
          break;
        case('Oscillator: April C'):
          hertzSlider.className = 'oscillatorAprilCSlider';
          detuneSlider.className = 'oscillatorDetuneAprilCSlider';
          break;
        case('Oscillator: May A'):
          hertzSlider.className = 'oscillatorMayASlider';
          detuneSlider.className = 'oscillatorDetuneMayASlider';
          break;
        case('Oscillator: May B'):
          hertzSlider.className = 'oscillatorMayBSlider';
          detuneSlider.className = 'oscillatorDetuneMayBSlider';
          break;
        case('Oscillator: May C'):
          hertzSlider.className = 'oscillatorMayCSlider';
          detuneSlider.className = 'oscillatorDetuneMayCSlider';
          break;
        default:
          alert('unsupported skin slider');
      }
      hertzModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin: -15vmin 0 2vmin 2vmin; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; transform: translateY(-300px);");
      hertzModPort.setAttribute("style", "margin-top: -18px; margin-left: 45px; font-family: 'Righteous', cursive; font-size: 48px; width: 12%; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; padding-left: 15px; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; transform: translateY(-290px);");
      detuneLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; margin: -25px 0 0 0; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; transform: translateY(-250px);");
      detuneDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 1px; margin-top: 8px; background: url(" + this.detunePath + "); background-size: " + this.detuneSize + "; box-shadow: -1px -1px 1px " + this.detuneBoxShadowColor + ", -2px -2px 1px " + this.detuneBoxShadowColor + ", -3px -3px 1px " + this.detuneBoxShadowColor + ", -4px -4px 1px " + this.detuneBoxShadowColor + "; padding-left: 10px; transform: translateY(-250px);");
      detuneSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; width: 65%; height: 32px; background: url(" + this.detuneSliderPath + "); background-size: " + this.detuneSliderSize + "; outline: none; opacity: 1.0; position: relative; left: -20px; top: 15px; box-shadow: -1px -1px 1px " + this.detuneBoxShadowColor + ", -2px -2px 1px " + this.detuneBoxShadowColor + ", -3px -3px 1px " + this.detuneBoxShadowColor + ", -4px -4px 1px " + this.detuneBoxShadowColor + "; transform: translateY(-250px); z-index: 60;");
      detuneModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; position: relative; top: -170px; left: 150px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; transform: translateY(-250px);");
      detuneModPort.setAttribute("style", "position: relative; top: -190px; left: 170px; font-family: 'Righteous', cursive; font-size: 48px; width: 12%; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; padding-left: 15px; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; transform: translateY(-250px);");

      this.userWaveformInput(sine, square, sawtooth, triangle);
      this.userFrequencyInput(hertzDisplay, hertzSlider);
      this.userDetuneInput(detuneDisplay, detuneSlider);

      function dragElement(element, obj) {

        let bounded = false;
        let boundRect;

        if ((boundingDiv !== null) && (boundingDiv !== undefined)) {
          bounded = true;
        }

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (oscillatorTop) {
          oscillatorTop.onmousedown = dragMouseDown;
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
          if (bounded) {
            boundRect = boundingDiv.getBoundingClientRect();
            if ((e.clientX < (boundRect.left + (obj.dragWidth/2)))) {
              pos1 = pos3 - (boundRect.left + (obj.dragWidth/2));
              pos3 = (boundRect.left + (obj.dragWidth/2));
              element.style.left = (element.offsetLeft - pos1) + "px";
              obj.positionX = (element.offsetLeft - pos1);
            } else if ((e.clientX > (boundRect.right - (obj.dragWidth/2)))) {
              pos1 = pos3 - (boundRect.right - (obj.dragWidth/2));
              pos3 = (boundRect.right - (obj.dragWidth/2));
              element.style.left = (element.offsetLeft - pos1) + "px";
              obj.positionX = (element.offsetLeft - pos1);
            } else {
              pos1 = pos3 - e.clientX;
              pos3 = e.clientX;
              element.style.left = (element.offsetLeft - pos1) + "px";
              obj.positionX = (element.offsetLeft - pos1);
            }
            if (e.clientY < boundRect.top) {
              pos2 = pos4 - boundRect.top;
              pos4 = boundRect.top;
              element.style.top = (element.offsetTop - pos2) + "px";
              obj.positionY = (element.offsetTop - pos2);
            } else if (e.clientY > (boundRect.bottom - obj.dragHeight)) {
              pos2 = pos4 - (boundRect.bottom - obj.dragHeight);
              pos4 = (boundRect.bottom - obj.dragHeight);
              element.style.top = (element.offsetTop - pos2) + "px";
              obj.positionY = (element.offsetTop - pos2);
            } else {
              pos2 = pos4 - e.clientY;
              pos4 = e.clientY;
              element.style.top = (element.offsetTop - pos2) + "px";
              obj.positionY = (element.offsetTop - pos2);
            }
          } else {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
            obj.positionX = (element.offsetLeft - pos1);
            obj.positionY = (element.offsetTop - pos2);
          }
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
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(" + (0.7 * this.dragScale) + "); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
        updateConnectors(this);
        setTimeout(() => {
          updateConnectors(this);
        }, 100);
      });

      div.addEventListener('mouseout', () => {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(" + (0.5 * this.dragScale) + "); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 1;");
        updateConnectors(this);
        setTimeout(() => {
          updateConnectors(this);
        }, 100);
      });

      outputPort.addEventListener('click', () => {
        // alert(outputPort.id);
        if (this.output === null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'oscillator' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'oscillator');
        }
      });

      waveModPort.addEventListener('click', () => {
        // alert(waveModPort.id);
        if (this.waveformModulator === null) {
          clickThroughput({ through: 'input', type: 'waveformModulation', device: 'oscillator'}, waveModPort, this);
        } else {
          disconnectPatchConnection(this, 'waveModInput', 'oscillator');
        }
      });

      hertzModPort.addEventListener('click', () => {
        // alert(hertzModPort.id);
        if (this.hertzModulator === null) {
          clickThroughput({ through: 'input', type: 'frequencyModulation', device: 'oscillator'}, hertzModPort, this);
        } else {
          disconnectPatchConnection(this, 'frequencyModInput', 'oscillator');
        }
      });

      detuneModPort.addEventListener('click', () => {
        // alert(detuneModPort.id);
        if (this.detuneModulator === null) {
          clickThroughput({ through: 'input', type: 'detuneModulation', device: 'oscillator'}, detuneModPort, this);
        } else {
          disconnectPatchConnection(this, 'detuneModInput', 'oscillator');
        }
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
      let waveformSelectDiv = document.createElement('div');
      div.appendChild(waveformSelectDiv);
      let waveformSelectLabel = document.createElement('p');
      waveformSelectDiv.appendChild(waveformSelectLabel);
      waveformSelectLabel.innerHTML = 'waveform:';
      let waveformSelector = document.createElement('ul');
      waveformSelectDiv.appendChild(waveformSelector);
      let sine = document.createElement('li');
      waveformSelector.appendChild(sine);
      let sineImg = document.createElement('img');
      sine.appendChild(sineImg);
      sineImg.src="./img/noun_589707_cc.png"
      let sineLabel = document.createElement('p');
      sine.appendChild(sineLabel);
      sineLabel.innerHTML = 'sine';
      let square = document.createElement('li');
      waveformSelector.appendChild(square);
      let squareImg = document.createElement('img');
      square.appendChild(squareImg);
      squareImg.src = './img/noun_538698_cc.png';
      let squareLabel = document.createElement('p');
      square.appendChild(squareLabel);
      squareLabel.innerHTML = 'sqr';
      let waveformSelector2 = document.createElement('ul');
      waveformSelectDiv.appendChild(waveformSelector2);
      let sawtooth = document.createElement('li');
      waveformSelector2.appendChild(sawtooth);
      let sawtoothImg = document.createElement('img');
      sawtooth.appendChild(sawtoothImg);
      sawtoothImg.src = './img/noun_538692_cc.png';
      let sawtoothLabel = document.createElement('p');
      sawtooth.appendChild(sawtoothLabel);
      sawtoothLabel.innerHTML = 'saw';
      let triangle = document.createElement('li');
      waveformSelector2.appendChild(triangle);
      let triangleImg = document.createElement('img');
      triangle.appendChild(triangleImg);
      triangleImg.src = './img/noun_538696_cc.png';
      let triangleLabel = document.createElement('p');
      triangle.appendChild(triangleLabel);
      triangleLabel.innerHTML = 'tri-';
      let waveMod = document.createElement('div');
      waveformSelectDiv.appendChild(waveMod);
      let waveModLabel = document.createElement('p');
      waveMod.appendChild(waveModLabel);
      waveModLabel.innerHTML = 'modulator:';
      let waveModPort = document.createElement('h1');
      waveMod.appendChild(waveModPort);
      waveModPort.innerHTML = '◦';
      waveModPort.id = 'waveModulator ' + this.name + this.id;
      let frequencyDiv = document.createElement('div');
      div.appendChild(frequencyDiv);
      let hertzLabel = document.createElement('h3');
      frequencyDiv.appendChild(hertzLabel);
      hertzLabel.innerHTML = 'Hertz:';
      let frequencyDisplay = document.createElement('input');
      frequencyDiv.appendChild(frequencyDisplay);
      frequencyDisplay.type = "number";
      frequencyDisplay.name = "amountInput";
      frequencyDisplay.min = "1.000";
      frequencyDisplay.max = "11025.000";
      frequencyDisplay.step = "0.001";
      frequencyDisplay.value = this.hertz.toString();
      let frequencySlider = document.createElement('input');
      frequencyDiv.appendChild(frequencySlider);
      frequencySlider.type = "range";
      frequencySlider.min = "1.000";
      frequencySlider.max = "11025.000";
      frequencySlider.step = "0.001";
      frequencySlider.value = this.hertz.toString();
      let frequencyModulatorDiv = document.createElement('div');
      frequencyDiv.appendChild(frequencyModulatorDiv);
      let frequencyModLabel = document.createElement('p');
      frequencyModulatorDiv.appendChild(frequencyModLabel);
      frequencyModLabel.innerHTML = 'modulator:';
      let frequencyModPort = document.createElement('h1');
      frequencyModulatorDiv.appendChild(frequencyModPort);
      frequencyModPort.innerHTML = '◦';
      frequencyModPort.id = 'frequencyModulator ' + this.name + this.id;
      let detuneDiv = document.createElement('div');
      div.appendChild(detuneDiv);
      let detuneLabel = document.createElement('h3');
      detuneDiv.appendChild(detuneLabel);
      detuneLabel.innerHTML = 'Detune:'
      let detuneDisplay = document.createElement('input');
      detuneDiv.appendChild(detuneDisplay);
      detuneDisplay.type = "number";
      detuneDisplay.name = "detuneQuantity";
      detuneDisplay.min = "-100.00";
      detuneDisplay.max = "100.00";
      detuneDisplay.step = "0.01";
      detuneDisplay.value = this.detune.toString();
      let detuneSlider = document.createElement("input");
      detuneDiv.appendChild(detuneSlider);
      detuneSlider.type = "range";
      detuneSlider.name = "detuneAmountRange";
      detuneSlider.min = "-100.00";
      detuneSlider.max = "100.00";
      detuneSlider.step = "0.01";
      detuneSlider.value = this.detune.toString();
      let detuneModDiv = document.createElement('div');
      detuneDiv.appendChild(detuneModDiv);
      let detuneModLabel = document.createElement('p');
      detuneModDiv.appendChild(detuneModLabel);
      detuneModLabel.innerHTML = "modulator:";
      let detuneModPort = document.createElement('h1');
      detuneModDiv.appendChild(detuneModPort);
      detuneModPort.innerHTML = '◦';
      detuneModPort.id = 'detineModulator ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/8) + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 5px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + ";");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 25px; margin-top: 1px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 35px; margin-top: -15px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      waveformSelectDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 9)/32) + "px; height: " + this.horizontalHeight + "px;");
      waveformSelectLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin: 2px 0 1px 15px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      waveformSelector.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; width: 115px; list-style-type: none; transform: scale(0.7); position: relative; left: -40px; top: -20px;");
      if (this.waveform === 'sine') {
        sine.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");
      } else {
        sine.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
      }
      sineImg.setAttribute("style", "width: 60px; height 60px;");
      sineLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 18px;");
      if (this.waveform === 'square') {
        square.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");
      } else {
        square.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
      }
      squareImg.setAttribute("style", "width: 60px; height 60px;");
      squareLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 18px;");
      waveformSelector2.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; width: 115px; list-style-type: none; transform: scale(0.7); float: left; margin-left: 42px; margin-top: -172px;");
      if (this.waveform === 'sawtooth') {
        sawtooth.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");

      } else {
        sawtooth.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");

      }
      sawtoothImg.setAttribute("style", "width: 60px; height 60px;");
      sawtoothLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 14px;");
      if (this.waveform === 'triangle') {
        triangle.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");

      } else {
        triangle.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");

      }
      triangleImg.setAttribute("style", "width: 60px; height 60px;");
      triangleLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 18px;");
      waveMod.setAttribute("style", "position: relative; top: -160px; left: 185px;");
      waveModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 12px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      waveModPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; margin: 2px 0 0 5px;");
      frequencyDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 9)/32) + "px; height: " + this.horizontalHeight + "px;");
      hertzLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; margin-left: 3px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ", -3px -3px 1px " + this.faceFontShadow + ", -4px -4px 1px " + this.faceFontShadow + "; margin-top: 1px; margin-left: 6px;");
      frequencyDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; margin-left: 5px; margin-top: -20px; background: url(" + this.displayPath + "); background-size: " + this.frequencySize + "; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; padding-left: 1vmin; width: auto;");
      frequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; width: 90%; background: url(" + this.frequencySliderPath + "); background-size: " + this.frequencySliderSize + "; outline: none; opacity: 1.0; margin-left: 10px; margin-top: 28px; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; height: 22px;");
      switch(this.skinName) {
        case('Oscillator: January A'):
          frequencySlider.className = 'oscillatorHorizontalJanuaryASlider';
          detuneSlider.className = 'oscillatorHorizontalJanuaryASlider';
          break;
        case('Oscillator: January B'):
          frequencySlider.className = 'oscillatorHorizontalJanuaryBSlider';
          detuneSlider.className = 'oscillatorHorizontalJanuaryBSlider';
          break;
        case('Oscillator: January C'):
          frequencySlider.className = 'oscillatorHorizontalJanuaryCSlider';
          detuneSlider.className = 'oscillatorHorizontalJanuaryCSlider';
          break;
        case('Oscillator: February A'):
          frequencySlider.className = 'oscillatorHorizontalFebruaryASlider';
          detuneSlider.className = 'oscillatorHorizontalFebruaryASlider';
          break;
        case('Oscillator: February B'):
          frequencySlider.className = 'oscillatorHorizontalFebruaryBSlider';
          detuneSlider.className = 'oscillatorHorizontalFebruaryBSlider';
          break;
        case('Oscillator: February C'):
          frequencySlider.className = 'oscillatorHoizontalFebruaryCSlider';
          detuneSlider.className = 'oscillatorHoizontalFebruaryCSlider';
          break;
        case('Oscillator: March A'):
          frequencySlider.className = 'oscillatorHorizontalMarchASlider';
          detuneSlider.className = 'oscillatorHorizontalMarchASlider';
          break;
        case('Oscillator: March B'):
          frequencySlider.className = 'oscillatorHorizontalMarchBSlider';
          detuneSlider.className = 'oscillatorHorizontalMarchBSlider';
          break;
        case('Oscillator: March C'):
          frequencySlider.className = 'oscillatorHorizontalMarchCSlider';
          detuneSlider.className = 'oscillatorHorizontalMarchCSlider';
          break;
        case('Oscillator: April A'):
          frequencySlider.className = 'oscillatorHorizontalAprilASlider';
          detuneSlider.className = 'oscillatorHorizontalAprilASlider';
          break;
        case('Oscillator: April B'):
          frequencySlider.className = 'oscillatorHorizontalAprilBSlider';
          detuneSlider.className = 'oscillatorHorizontalAprilBSlider';
          break;
        case('Oscillator: April C'):
          frequencySlider.className = 'oscillatorHorizontalAprilCSlider';
          detuneSlider.className = 'oscillatorHorizontalAprilCSlider';
          break;
        case('Oscillator: May A'):
          frequencySlider.className = 'oscillatorHorizontalMayASlider';
          detuneSlider.className = 'oscillatorHorizontalMayASlider';
          break;
        case('Oscillator: May B'):
          frequencySlider.className = 'oscillatorHorizontalMayBSlider';
          detuneSlider.className = 'oscillatorHorizontalMayBSlider';
          break;
        case('Oscillator: May C'):
          frequencySlider.className = 'oscillatorHorizontalMayCSlider';
          detuneSlider.className = 'oscillatorHorizontalMayCSlider';
          break;
        default:
          alert('unsupported skin slider');
      }
      frequencyModulatorDiv.setAttribute("style", "position: relative; top: -150px; left: 200px;");
      frequencyModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 12px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      frequencyModPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; margin: 2px 0 0 5px;");
      detuneDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 9)/32) + "px; height: " + this.horizontalHeight + "px;");
      detuneLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 3px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ", -3px -3px 1px " + this.faceFontShadow + ", -4px -4px 1px " + this.faceFontShadow + "; margin-top: 6px; margin-left: 20px;");
      detuneDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 15px; margin-top: -10px; background: url(" + this.displayPath + "); background-size: " + this.frequencySize + "; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; padding-left: 1vmin; width: 70%;");
      detuneSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; width: 90%; background: url(" + this.frequencySliderPath + "); background-size: " + this.frequencySliderSize + "; outline: none; opacity: 1.0; margin-left: 10px; margin-top: 36px; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; height: 22px;");
      detuneModDiv.setAttribute("style", "position: relative; top: -148px; left: 215px;");
      detuneModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 12px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      detuneModPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; margin: 2px 0 0 5px;");


      outputPort.addEventListener('click', () => {
        // alert('Oscillator Output Port -- id: ' + this.id);
        if (this.output == null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'oscillator' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'oscillator');
        }
      });

      waveModPort.addEventListener('click', () => {
        // alert('Oscillator Waveform Modulation Port -- id: ' + this.id);
        if (this.waveformModulator === null) {
          clickThroughput({ through: 'input', type: 'waveformModulation', device: 'oscillator'}, waveModPort, this);
        } else {
          disconnectPatchConnection(this, 'waveModInput', 'oscillator');
        }
      });

      frequencyModPort.addEventListener('click', () => {
        // alert('Oscillator Frequency Modulation Port -- id: ' + this.id);
        if (this.hertzModulator === null) {
          clickThroughput({ through: 'input', type: 'frequencyModulation', device: 'oscillator'}, frequencyModPort, this);
        } else {
          disconnectPatchConnection(this, 'frequencyModInput', 'oscillator');
        }
      });

      detuneModPort.addEventListener('click', () => {
        // alert('Oscillator Detune Modulation Port -- id: ' + this.id);
        if (this.detuneModulator === null) {
          clickThroughput({ through: 'input', type: 'detuneModulation', device: 'oscillator'}, detuneModPort, this);
        } else {
          disconnectPatchConnection(this, 'detuneModInput', 'oscillator');
        }
      });

      this.userWaveformInput(sine, square, sawtooth, triangle);
      this.userFrequencyInput(frequencyDisplay, frequencySlider);
      this.userDetuneInput(detuneDisplay, detuneSlider);

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
      let waveformDiv = document.createElement('div');
      div.appendChild(waveformDiv);
      let waveformLabel = document.createElement('p');
      waveformDiv.appendChild(waveformLabel);
      waveformLabel.innerHTML = 'waveform:';
      let waveformSelector = document.createElement('ul');
      waveformDiv.appendChild(waveformSelector);
      let sine = document.createElement('li');
      waveformSelector.appendChild(sine);
      let sineImg = document.createElement('img');
      sine.appendChild(sineImg);
      sineImg.src="./img/noun_589707_cc.png"
      let sineLabel = document.createElement('p');
      sine.appendChild(sineLabel);
      sineLabel.innerHTML = 'sine';
      let square = document.createElement('li');
      waveformSelector.appendChild(square);
      let squareImg = document.createElement('img');
      square.appendChild(squareImg);
      squareImg.src = './img/noun_538698_cc.png';
      let squareLabel = document.createElement('p');
      square.appendChild(squareLabel);
      squareLabel.innerHTML = 'sqr';
      let waveformSelector2 = document.createElement('ul');
      waveformDiv.appendChild(waveformSelector2);
      let sawtooth = document.createElement('li');
      waveformSelector2.appendChild(sawtooth);
      let sawtoothImg = document.createElement('img');
      sawtooth.appendChild(sawtoothImg);
      sawtoothImg.src = './img/noun_538692_cc.png';
      let sawtoothLabel = document.createElement('p');
      sawtooth.appendChild(sawtoothLabel);
      sawtoothLabel.innerHTML = 'saw';
      let triangle = document.createElement('li');
      waveformSelector2.appendChild(triangle);
      let triangleImg = document.createElement('img');
      triangle.appendChild(triangleImg);
      triangleImg.src = './img/noun_538696_cc.png';
      let triangleLabel = document.createElement('p');
      triangle.appendChild(triangleLabel);
      triangleLabel.innerHTML = 'tri-';
      let waveModDiv = document.createElement('div');
      waveformDiv.appendChild(waveModDiv);
      let waveformModLabel = document.createElement('p');
      waveModDiv.appendChild(waveformModLabel);
      waveformModLabel.innerHTML = 'modulator:';
      let waveModPort = document.createElement('h1');
      waveModDiv.appendChild(waveModPort);
      waveModPort.innerHTML = '◦';
      waveModPort.id = 'wave selector ' + this.name + this.id;
      let frequencyDiv = document.createElement('div');
      div.appendChild(frequencyDiv);
      let frequencyLabel = document.createElement('h3');
      frequencyDiv.appendChild(frequencyLabel);
      frequencyLabel.innerHTML = 'Hertz:';
      let frequencyDisplay = document.createElement('input');
      frequencyDiv.appendChild(frequencyDisplay);
      frequencyDisplay.type = "number";
      frequencyDisplay.name = "amountInput";
      frequencyDisplay.min = "1.000";
      frequencyDisplay.max = "11025.000";
      frequencyDisplay.step = "0.001";
      frequencyDisplay.value = this.hertz.toString();
      let frequencySlider = document.createElement('input');
      frequencyDiv.appendChild(frequencySlider);
      frequencySlider.type = "range";
      frequencySlider.name = "amountRange";
      frequencySlider.min = "1.000";
      frequencySlider.max = "11025.000";
      frequencySlider.step = "0.001";
      frequencySlider.value = this.hertz.toString();
      let frequencyModDiv = document.createElement('div');
      frequencyDiv.appendChild(frequencyModDiv);
      let frequencyModLabel = document.createElement('p');
      frequencyModDiv.appendChild(frequencyModLabel);
      frequencyModLabel.innerHTML = "modulator:";
      let frequencyModPort = document.createElement('h1');
      frequencyDiv.appendChild(frequencyModPort);
      frequencyModPort.innerHTML = '◦';
      frequencyModPort.id = 'frequency modulator ' + this.name + this.id;
      let detuneDiv = document.createElement('div');
      div.appendChild(detuneDiv);
      let detuneLabel = document.createElement('h3');
      detuneDiv.appendChild(detuneLabel);
      detuneLabel.innerHTML = 'detune:';
      let detuneDisplay = document.createElement('input');
      detuneDiv.appendChild(detuneDisplay);
      detuneDisplay.type = "number";
      detuneDisplay.name = "detuneQuantity";
      detuneDisplay.min = "-100.00";
      detuneDisplay.max = "100.00";
      detuneDisplay.step = "0.01";
      detuneDisplay.value = this.detune.toString();
      let detuneSlider = document.createElement('input');
      detuneDiv.appendChild(detuneSlider);
      detuneSlider.type = "range";
      detuneSlider.name = "detuneAmountRange";
      detuneSlider.min = "-100.00";
      detuneSlider.max = "100.00";
      detuneSlider.step = "0.01";
      detuneSlider.value = this.detune.toString();
      let detuneModDiv = document.createElement('div');
      detuneDiv.appendChild(detuneModDiv);
      let detuneModLabel = document.createElement('p');
      detuneModDiv.appendChild(detuneModLabel);
      detuneModLabel.innerHTML = 'modulator:';
      let detuneModPort = document.createElement('h1');
      detuneModDiv.appendChild(detuneModPort);
      detuneModPort.innerHTML = '◦';
      detuneModPort.id = 'detune modulator ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/8) + "px;");
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + "; position: relative; top: -10px; left: 5px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + "; margin-left: 8px; margin-top: -12px;");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; position: relative; left: 80px; top: -62px;");
      waveformDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; height: " + (this.verticalHeight * 9/32) + "px;");
      waveformLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + "; margin-left: 8px; margin-top: 3px;");
      waveformSelector.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; width: 105px; list-style-type: none; transform: scale(0.7); position: relative; left: -45px; top: -30px;");
      if (this.waveform === 'sine') {
        sine.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");
      } else {
        sine.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
      }
      sineImg.setAttribute("style", "width: 60px; height 60px;");
      sineLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 18px;");
      if (this.waveform === 'square') {
        square.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");
      } else {
        square.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");
      }
      squareImg.setAttribute("style", "width: 60px; height 60px;");
      squareLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 18px;");
      waveformSelector2.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; width: 105px; list-style-type: none; transform: scale(0.7); float: left; margin-left: 32px; margin-top: -183px;");
      if (this.waveform === 'sawtooth') {
        sawtooth.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");

      } else {
        sawtooth.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");

      }
      sawtoothImg.setAttribute("style", "width: 60px; height 60px;");
      sawtoothLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 14px;");
      if (this.waveform === 'triangle') {
        triangle.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(180deg) invert(1); opacity: 1;");

      } else {
        triangle.setAttribute("style", "border: solid 1px black; cursor: pointer; box-shadow: 1px 1px 1px " +  this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; background: url(" + this.displayPath + "); background-size: 100%; filter: hue-rotate(0deg) invert(0); opacity: 0.3;");

      }
      triangleImg.setAttribute("style", "width: 60px; height 60px;");
      triangleLabel.setAttribute("style", "float: right; margin-right: 6px; color: " + this.faceFontColor + "; font-size: 18px;");
      waveModDiv.setAttribute("style", "float: left; width: 100%; position: relative; top: -70px; padding-left: 5px;");
      waveformModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      waveModPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; position: relative; left: 100px; top: -40px;");
      frequencyDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; height: " + (this.verticalHeight * 9/32) + "px;");
      frequencyLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + "; position: relative; top: -20px; left: 10px;");
      frequencyDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; background: url(" + this.displayPath + "); background-size: " + this.frequencySize + "; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; padding-left: 1vmin; width: auto; position: relative; top: -30px; left: 20px;");
      frequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); width: 145px; background: url(" + this.frequencySliderPath  + "); background-size: " + this.frequencySliderSize  + "; outline: none; opacity: 1.0; position: relative; top: 35px; height: 22px; left: 60px; box-shadow: 1px -1px 1px " + this.frequencyBoxShadow + ", 2px -2px 1px " + this.frequencyBoxShadow + ", 3px -3px 1px " + this.frequencyBoxShadow + ", 4px -4px 1px " + this.frequencyBoxShadow + ";");
      switch(this.skinName) {
        case('Oscillator: January A'):
          frequencySlider.className = 'oscillatorVerticalJanuaryASlider';
          detuneSlider.className = 'oscillatorVerticalJanuaryASlider';
          break;
        case('Oscillator: January B'):
          frequencySlider.className = 'oscillatorVerticalJanuaryBSlider';
          detuneSlider.className = 'oscillatorVerticalJanuaryBSlider';
          break;
        case('Oscillator: January C'):
          frequencySlider.className = 'oscillatorVerticalJanuaryCSlider';
          detuneSlider.className = 'oscillatorVerticalJanuaryCSlider';
          break;
        case('Oscillator: February A'):
          frequencySlider.className = 'oscillatorVerticalFebruaryASlider';
          detuneSlider.className = 'oscillatorVerticalFebruaryASlider';
          break;
        case('Oscillator: February B'):
          frequencySlider.className = 'oscillatorVerticalFebruaryBSlider';
          detuneSlider.className = 'oscillatorVerticalFebruaryBSlider';
          break;
        case('Oscillator: February C'):
          frequencySlider.className = 'oscillatorVerticalFebruaryCSlider';
          detuneSlider.className = 'oscillatorVerticalFebruaryCSlider';
          break;
        case('Oscillator: March A'):
          frequencySlider.className = 'oscillatorVerticalMarchASlider';
          detuneSlider.className = 'oscillatorVerticalMarchASlider';
          break;
        case('Oscillator: March B'):
          frequencySlider.className = 'oscillatorVerticalMarchBSlider';
          detuneSlider.className = 'oscillatorVerticalMarchBSlider';
          break;
        case('Oscillator: March C'):
          frequencySlider.className = 'oscillatorVerticalMarchCSlider';
          detuneSlider.className = 'oscillatorVerticalMarchCSlider';
          break;
        case('Oscillator: April A'):
          frequencySlider.className = 'oscillatorVerticalAprilASlider';
          detuneSlider.className = 'oscillatorVerticalAprilASlider';
          break;
        case('Oscillator: April B'):
          frequencySlider.className = 'oscillatorVerticalAprilBSlider';
          detuneSlider.className = 'oscillatorVerticalAprilBSlider';
          break;
        case('Oscillator: April C'):
          frequencySlider.className = 'oscillatorVerticalAprilCSlider';
          detuneSlider.className = 'oscillatorVerticalAprilCSlider';
          break;
        case('Oscillator: May A'):
          frequencySlider.className = 'oscillatorVerticalMayASlider';
          detuneSlider.className = 'oscillatorVerticalMayASlider';
          break;
        case('Oscillator: May B'):
          frequencySlider.className = 'oscillatorVerticalMayBSlider';
          detuneSlider.className = 'oscillatorVerticalMayBSlider';
          break;
        case('Oscillator: May C'):
          frequencySlider.className = 'oscillatorVerticalMayCSlider';
          detuneSlider.className = 'oscillatorVerticalMayCSlider';
          break;
        default:
          alert('unsupported skin slider');
      }
      frequencyModDiv.setAttribute("style", "position: relative; padding-left: 5px; top: -50px;");
      frequencyModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      frequencyModPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; position: relative; top: -60px; left: 30px;");
      detuneDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; height: " + (this.verticalHeight * 9/32) + "px;");
      detuneLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + "; position: relative; top: -20px; left: 10px;");
      detuneDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; background: url(" + this.displayPath + "); background-size: " + this.frequencySize + "; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; padding-left: 1vmin; width: auto; position: relative; top: -30px; left: 20px;");
      detuneSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); width: 145px; background: url(" + this.frequencySliderPath  + "); background-size: " + this.frequencySliderSize  + "; outline: none; opacity: 1.0; position: relative; top: 35px; height: 22px; left: 60px; box-shadow: 1px -1px 1px " + this.frequencyBoxShadow + ", 2px -2px 1px " + this.frequencyBoxShadow + ", 3px -3px 1px " + this.frequencyBoxShadow + ", 4px -4px 1px " + this.frequencyBoxShadow + "; z-index: 6;");
      detuneModDiv.setAttribute("style", "position: relative; padding-left: 5px; top: -50px;");
      detuneModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      detuneModPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; position: relative; top: -10px; left: 30px;");

      outputPort.addEventListener('click', () => {
        // alert('Oscillator Output Port -- id: ' + this.id);
        if (this.output == null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'oscillator' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'oscillator');
        }
      });

      waveModPort.addEventListener('click', () => {
        // alert('Oscillator Waveform Modulation Port -- id: ' + this.id);
        if (this.waveformModulator === null) {
          clickThroughput({ through: 'input', type: 'waveformModulation', device: 'oscillator'}, waveModPort, this);
        } else {
          disconnectPatchConnection(this, 'waveModInput', 'oscillator');
        }
      });

      frequencyModPort.addEventListener('click', () => {
        // alert('Oscillator Frequency Modulation Port -- id: ' + this.id);
        if (this.hertzModulator === null) {
          clickThroughput({ through: 'input', type: 'frequencyModulation', device: 'oscillator'}, frequencyModPort, this);
        } else {
          disconnectPatchConnection(this, 'frequencyModInput', 'oscillator');
        }
      });

      detuneModPort.addEventListener('click', () => {
        // alert('Oscillator Detune Modulation Port -- id: ' + this.id);
        if (this.detuneModulator === null) {
          clickThroughput({ through: 'input', type: 'detuneModulation', device: 'oscillator'}, detuneModPort, this);
        } else {
          disconnectPatchConnection(this, 'detuneModInput', 'oscillator');
        }
      });

      this.userWaveformInput(sine, square, sawtooth, triangle);
      this.userFrequencyInput(frequencyDisplay, frequencySlider);
      this.userDetuneInput(detuneDisplay, detuneSlider);

      return(div);
    }
  }

  return(oscillatorNode);
})();
