'use strict';

var HighpassFilter = (function(settings, skin, audioContext) {

  let highpassFilter = function(settings, skin, audioContext) {
    this.id = settings.id;
    this.name = settings.name;
    this.positionX = settings.positionX,
    this.positionY = settings.positionY,
    this.frequency = settings.frequency;
    this.frequency_modulator = settings.frequency_modulator;
    this.detune = settings.detune;
    this.detune_modulator = settings.detune_modulator;
    this.q = settings.q;
    this.q_modulator = settings.q_modulator,
    this.input = settings.input;
    this.output = settings.output;
    this.highpassFilter = audioContext.createBiquadFilter();
    this.highpassFilter.type = 'highpass';
    this.highpassFilter.frequency.value = this.frequency;
    this.highpassFilter.detune.value = this.detune;
    this.highpassFilter.Q.value = this.q;

    this.skinName = skin.name;
    this.skinMonth = skin.month;
    this.rule = skin.rule;
    this.facePath = skin.face_path;
    this.faceSize = skin.face_size;
    this.faceRepeat = skin.face_repeat;
    this.faceBoxShadowColor = skin.face_box_shadow_color;
    this.faceFontColor = skin.face_font_color;
    this.faceFontShadowColor = skin.face_font_shadow_color;
    this.topPath = skin.top_path;
    this.topSize = skin.top_size;
    this.topRepeat = skin.top_repeat;
    this.topFontColor = skin.top_font_color;
    this.topFontShadowColor = skin.top_font_shadow_color;
    this.signalPath = skin.signal_path;
    this.signalSize = skin.signal_size;
    this.signalRepeat = skin.signal_repeat;
    this.signalBoxShadowColor = skin.signal_box_shadow_color;
    this.signalFontColor = skin.signal_font_color;
    this.signalFontShadowColor = skin.signal_font_shadow_color;
    this.displayPath = skin.display_path;
    this.inputSize = skin.input_size;
    this.inputRepeat = skin.input_repeat;
    this.inputBoxShadowColor = skin.input_box_shadow_color;
    this.inputFontColor = skin.input_font_color;
    this.inputFontShadowColor = skin.input_font_shadow_color;
    this.outputSize = skin.output_size;
    this.outputRepeat = skin.output_repeat;
    this.outputBoxShadowColor = skin.output_box_shadow_color;
    this.outputFontColor = skin.output_font_color;
    this.outputFontShadowColor = skin.output_font_shadow_color;
    this.frequencyDisplaySize = skin.frequency_display_size;
    this.frequencyDisplayRepeat = skin.frequency_display_repeat;
    this.frequencyDisplayBoxShadowColor = skin.frequency_display_box_shadow_color;
    this.frequencyDisplayFontColor = skin.frequency_display_font_color;
    this.detuneSize = skin.detune_size;
    this.detuneRepeat = skin.detune_repeat;
    this.detuneBoxShadowColor = skin.detune_box_shadow_color;
    this.detuneFontColor = skin.detune_font_color;
    this.qSize = skin.q_size;
    this.qRepeat = skin.q_repeat;
    this.qBoxShadowColor = skin.q_box_shadow_color;
    this.qFontColor = skin.q_font_color;
    this.modSelectSize = skin.mod_select_size;
    this.modRepeatValue = skin.mod_repeat_value;
    this.sliderSize = skin.slider_size;
    this.slideRepeatValue = skin.slide_repeat_value;
    this.sliderShaderColor1 = skin.slider_shader_color_1;
    this.sliderShaderColor2 = skin.slider_shader_color_2;

    this.dragWidth = 790;
    this.dragHeight = 458;
    this.horizontalWidth = 900;
    this.horizontalHeight = 162;
    this.verticalWidth = 162;
    this.verticalHeight = 750;

    // Functionality

    this.manageFrequency = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.frequency = display.value;
        this.highpassFilter.frequency.value = (this.frequency);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.frequency = slider.value;
        this.highpassFilter.frequency.value = (this.frequency);
      });
    }

    this.manageDetune = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.detune = display.value;
        this.highpassFilter.detune.value = (this.detune);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.detune = slider.value;
        this.highpassFilter.detune.value = (this.detune);
      });
    }

    this.manageQ = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.q = display.value;
        this.highpassFilter.Q.value = (this.q);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.q = slider.value;
        this.highpassFilter.Q.value = (this.q);
      });
    }

    // Rendering Functions

    this.renderDraggable = () => {

      let div = document.createElement('div');
      let highpassFilterTop = document.createElement('div');
      div.appendChild(highpassFilterTop);
      let nameTag = document.createElement('h1');
      highpassFilterTop.appendChild(nameTag);
      let signalPanel = document.createElement('div');
      div.appendChild(signalPanel);
      let inputLabel = document.createElement('p');
      signalPanel.appendChild(inputLabel);
      inputLabel.innerHTML = 'in';
      let inputPort = document.createElement('h1');
      signalPanel.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input ' + this.name + this.id;
      let outputLabel = document.createElement('p');
      signalPanel.appendChild(outputLabel);
      outputLabel.innerHTML = 'out';
      let outputPort = document.createElement('h1');
      signalPanel.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let face = document.createElement('div');
      div.appendChild(face);
      let frequencyDiv = document.createElement('div');
      face.appendChild(frequencyDiv);
      let frequencyLabel = document.createElement('p');
      frequencyDiv.appendChild(frequencyLabel);
      frequencyLabel.innerHTML = 'frequency(Hz)';
      let highpassFilterFrequencyDisplay = document.createElement('input');
      frequencyDiv.appendChild(highpassFilterFrequencyDisplay);
      highpassFilterFrequencyDisplay.type = 'number';
      highpassFilterFrequencyDisplay.step = '0.001';
      highpassFilterFrequencyDisplay.min = '0.000';
      highpassFilterFrequencyDisplay.max = '22050.000';
      highpassFilterFrequencyDisplay.value = this.frequency;
      let frequencySlider = document.createElement('input');
      frequencyDiv.appendChild(frequencySlider);
      frequencySlider.type = 'range';
      frequencySlider.step = '0.001';
      frequencySlider.min = '0.000';
      frequencySlider.max = '22050.000';
      frequencySlider.value = this.frequency;
      let frequencyModulatorLabel = document.createElement('p');
      frequencyDiv.appendChild(frequencyModulatorLabel);
      frequencyModulatorLabel.innerHTML = 'modulation';
      let frequencyModulatorInput = document.createElement('h1');
      frequencyDiv.appendChild(frequencyModulatorInput);
      frequencyModulatorInput.innerHTML = '◦';
      frequencyModulatorInput.id = 'frequency modulator input - ' + this.name + this.id;
      let detuneDiv = document.createElement('div');
      face.appendChild(detuneDiv);
      let detuneLabel = document.createElement('p');
      detuneDiv.appendChild(detuneLabel);
      detuneLabel.innerHTML = 'detune';
      let highpassFilterDetuneDisplay = document.createElement('input');
      detuneDiv.appendChild(highpassFilterDetuneDisplay);
      highpassFilterDetuneDisplay.type = 'number';
      highpassFilterDetuneDisplay.step = '0.01';
      highpassFilterDetuneDisplay.min = '-100.00';
      highpassFilterDetuneDisplay.max = '100.00';
      highpassFilterDetuneDisplay.value = this.detune;
      let detuneSlider = document.createElement('input');
      detuneDiv.appendChild(detuneSlider);
      detuneSlider.type = 'range';
      detuneSlider.step = '0.01';
      detuneSlider.min = '-100.00';
      detuneSlider.max = '100.00';
      detuneSlider.value = this.detune;
      let detuneModulatorLabel = document.createElement('p');
      detuneDiv.appendChild(detuneModulatorLabel);
      detuneModulatorLabel.innerHTML = 'modulation';
      let detuneModulatorInput = document.createElement('h1');
      detuneDiv.appendChild(detuneModulatorInput);
      detuneModulatorInput.innerHTML = '◦';
      detuneModulatorInput.id = 'detune modulator input - ' + this.name + this.id;
      let qDiv = document.createElement('div');
      face.appendChild(qDiv);
      let qLabel = document.createElement('p');
      qDiv.appendChild(qLabel);
      qLabel.innerHTML = 'Q';
      let highpassFilterQDisplay = document.createElement('input');
      qDiv.appendChild(highpassFilterQDisplay);
      highpassFilterQDisplay.type = 'number';
      highpassFilterQDisplay.step = '0.0001';
      highpassFilterQDisplay.min = '0.0001';
      highpassFilterQDisplay.max = '1000.0000';
      highpassFilterQDisplay.value = this.q;
      let qSlider = document.createElement('input');
      qDiv.appendChild(qSlider);
      qSlider.type = 'range';
      qSlider.step = '0.0001';
      qSlider.min = '0.0001';
      qSlider.max = '1000.0000';
      qSlider.value = this.q;
      let qModulatorLabel = document.createElement('p');
      qDiv.appendChild(qModulatorLabel);
      qModulatorLabel.innerHTML = 'modulation';
      let qModulatorInput = document.createElement('h1');
      qDiv.appendChild(qModulatorInput);
      qModulatorInput.innerHTML = '◦';
      qModulatorInput.id = 'q modulator input - ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5);");
      highpassFilterTop.setAttribute("style", "width: 100%; background: url(" + this.topPath + "); background-size: " + this.topSize + "; font-family: 'Righteous', cursive; height: 60px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + this.topRepeat + ";");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 40px; margin-left: 2em; margin-top: 6em; color: " + this.topFontColor + "; font-weight: 600; text-shadow: 1px 1px 1px " + this.topFontShadowColor + ", 2px 2px 1px " + this.topFontShadowColor + ";");
      signalPanel.setAttribute("style", "background: url(" + this.signalPath + "); background-size: " + this.signalSize + "; border: solid 1px transparent; height: " + this.dragHeight + "px; width: 59px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: -6px; margin-top: -26px; box-shadow: 0px -1px 1px " + this.signalFontShadowColor + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 15px; margin-top: 58px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 2px; margin-top: 58px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      face.setAttribute("style", "height: " + this.dragHeight + "px; width: 100%; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: " + this.faceRepeat + "; margin-top: -428px; margin-left: 59px; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ";");
      frequencyDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/3) + "px; height: " + this.dragHeight + "px; background: transparent;");
      frequencyLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      highpassFilterFrequencyDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      frequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", 2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", 3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", 4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; height: 24px; width: 400px; margin: 145px 25px 0 25px;");
      switch(this.skinName) {
        case('Highpass Filter: January A'):
          frequencySlider.className = 'highpassFilterSliderJanuaryA';
          detuneSlider.className = 'highpassFilterSliderJanuaryA';
          qSlider.className = 'highpassFilterSliderJanuaryA';
          break;
        case('Highpass Filter: January B'):
          frequencySlider.className = 'highpassFilterSliderJanuaryB';
          detuneSlider.className = 'highpassFilterSliderJanuaryB';
          qSlider.className = 'highpassFilterSliderJanuaryB';
          break;
        case('Highpass Filter: January C'):
          frequencySlider.className = 'highpassFilterSliderJanuaryC';
          detuneSlider.className = 'highpassFilterSliderJanuaryC';
          qSlider.className = 'highpassFilterSliderJanuaryC';
          break;
        case('Highpass Filter: February A'):
          frequencySlider.className = 'highpassFilterSliderFebruaryA';
          detuneSlider.className = 'highpassFilterSliderFebruaryA';
          qSlider.className = 'highpassFilterSliderFebruaryA';
          break;
        case('Highpass Filter: February B'):
          frequencySlider.className = 'highpassFilterSliderFebruaryB';
          detuneSlider.className = 'highpassFilterSliderFebruaryB';
          qSlider.className = 'highpassFilterSliderFebruaryB';
          break;
        case('Highpass Filter: February C'):
          frequencySlider.className = 'highpassFilterSliderFebruaryC';
          detuneSlider.className = 'highpassFilterSliderFebruaryC';
          qSlider.className = 'highpassFilterSliderFebruaryC';
          break;
        case('Highpass Filter: March A'):
          frequencySlider.className = 'highpassFilterSliderMarchA';
          detuneSlider.className = 'highpassFilterSliderMarchA';
          qSlider.className = 'highpassFilterSliderMarchA';
          break;
        case('Highpass Filter: March B'):
          frequencySlider.className = 'highpassFilterSliderMarchB';
          detuneSlider.className = 'highpassFilterSliderMarchB';
          qSlider.className = 'highpassFilterSliderMarchB';
          break;
        case('Highpass Filter: March C'):
          frequencySlider.className = 'highpassFilterSliderMarchC';
          detuneSlider.className = 'highpassFilterSliderMarchC';
          qSlider.className = 'highpassFilterSliderMarchC';
          break;
        case('Highpass Filter: April A'):
          frequencySlider.className = 'highpassFilterSliderAprilA';
          detuneSlider.className = 'highpassFilterSliderAprilA';
          qSlider.className = 'highpassFilterSliderAprilA';
          break;
        case('Highpass Filter: April B'):
          frequencySlider.className = 'highpassFilterSliderAprilB';
          detuneSlider.className = 'highpassFilterSliderAprilB';
          qSlider.className = 'highpassFilterSliderAprilB';
          break;
        case('Highpass Filter: April C'):
          frequencySlider.className = 'highpassFilterSliderAprilC';
          detuneSlider.className = 'highpassFilterSliderAprilC';
          qSlider.className = 'highpassFilterSliderAprilC';
          break;
        default:
          console.log('unsupported highpass filter skin');
      }
      frequencyModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      frequencyModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      detuneDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/3) + "px; height: " + this.dragHeight + "px; background: transparent;");
      detuneLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      highpassFilterDetuneDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.displayPath + "); background-size: " + this.displaySize + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      detuneSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.detuneBoxShadowColor + ", 2px -2px 1px " + this.detuneBoxShadowColor + ", 3px -3px 1px " + this.detuneBoxShadowColor + ", 4px -4px 1px " + this.detuneBoxShadowColor + "; height: 24px; width: 400px; margin: 145px 25px 0 25px;");
      detuneModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      detuneModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      qDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/3) + "px; height: " + this.dragHeight + "px; background: transparent;");
      qLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      highpassFilterQDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.displayPath + "); background-size: " + this.qSize + "; box-shadow: -1px -1px 1px " + this.qBoxShadowColor + ", -2px -2px 1px " + this.qBoxShadowColor + ", -3px -3px 1px " + this.qBoxShadowColor + ", -4px -4px 1px " + this.qBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      qSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.displayPath + "); background-size: " + this.qSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.qBoxShadowColor + ", 2px -2px 1px " + this.qBoxShadowColor + ", 3px -3px 1px " + this.qBoxShadowColor + ", 4px -4px 1px " + this.qBoxShadowColor + "; height: 24px; width: 400px; margin: 145px 25px 0 25px;");
      qModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      qModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");

      this.manageFrequency(highpassFilterFrequencyDisplay, frequencySlider);

      this.manageDetune(highpassFilterDetuneDisplay, detuneSlider);

      this.manageQ(highpassFilterQDisplay, qSlider);

      function dragElement(element, obj) {

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (highpassFilterTop) {
          highpassFilterTop.onmousedown = dragMouseDown;
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
        }

        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
          obj.positionX = (element.offsetLeft - pos1);
          obj.positionY = (element.offsetTop - pos2);
        }
      }

      dragElement(div, this);

      div.addEventListener('mouseover', () => {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
      });

      div.addEventListener('mouseout', () => {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 1;");
      });

      outputPort.addEventListener('click', () => {
        alert(outputPort.id);
      });

      inputPort.addEventListener('click', () => {
        alert(inputPort.id);
      });

      frequencyModulatorInput.addEventListener('click', () => {
        alert(frequencyModulatorInput.id);
      });

      detuneModulatorInput.addEventListener('click', () => {
        alert(detuneModulatorInput.id);
      });

      qModulatorInput.addEventListener('click', () => {
        alert(qModulatorInput.id);
      });

      return(div);
    }

    this.renderRackHorizontal = (x, y) => {
    //
      let div = document.createElement('div');
      let nameAndOutputDiv = document.createElement('div');
      div.appendChild(nameAndOutputDiv);
      let nameTag = document.createElement('h1');
      nameAndOutputDiv.appendChild(nameTag);
      let inputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      let inputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input ' + this.name + this.id;
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let frequencyDiv = document.createElement('div');
      div.appendChild(frequencyDiv);
      let frequencyLabel = document.createElement('p');
      frequencyDiv.appendChild(frequencyLabel);
      frequencyLabel.innerHTML = 'frequency(Hz)';
      let frequencyDisplay = document.createElement('input');
      frequencyDiv.appendChild(frequencyDisplay);
      frequencyDisplay.type = 'number';
      frequencyDisplay.step = '0.001';
      frequencyDisplay.min = '0.000';
      frequencyDisplay.max = '22050.00';
      frequencyDisplay.value = this.frequency;
      let frequencySlider = document.createElement('input');
      frequencyDiv.appendChild(frequencySlider);
      frequencySlider.type = 'range';
      frequencySlider.step = '0.001';
      frequencySlider.min = '0.000';
      frequencySlider.max = '22050.00';
      frequencySlider.value = this.frequency;
      let frequencyModulatorLabel = document.createElement('p');
      frequencyDiv.appendChild(frequencyModulatorLabel);
      frequencyModulatorLabel.innerHTML = 'modulation';
      let frequencyModulatorInput = document.createElement('h1');
      frequencyDiv.appendChild(frequencyModulatorInput);
      frequencyModulatorInput.innerHTML = '◦';
      frequencyModulatorInput.id = 'frequency modulator input - ' + this.name + this.id;
      let detuneDiv = document.createElement('div');
      div.appendChild(detuneDiv);
      let detuneLabel = document.createElement('p');
      detuneDiv.appendChild(detuneLabel);
      detuneLabel.innerHTML = 'detune';
      let detuneDisplay = document.createElement('input');
      detuneDiv.appendChild(detuneDisplay);
      detuneDisplay.type = 'number';
      detuneDisplay.step = '0.01';
      detuneDisplay.max = '100.00';
      detuneDisplay.min = '-100.00';
      detuneDisplay.value = this.detune;
      let detuneSlider = document.createElement('input');
      detuneDiv.appendChild(detuneSlider);
      detuneSlider.type = 'range';
      detuneSlider.step = '0.01';
      detuneSlider.max = '100.00';
      detuneSlider.min = '-100.00';
      detuneSlider.value = this.detune;
      let detuneModulatorLabel = document.createElement('p');
      detuneDiv.appendChild(detuneModulatorLabel);
      detuneModulatorLabel.innerHTML = 'modulation';
      let detuneModulatorInput = document.createElement('h1');
      detuneDiv.appendChild(detuneModulatorInput);
      detuneModulatorInput.innerHTML = '◦';
      detuneModulatorInput.id = 'detune modulator input - ' + this.name + this.id;
      let qDiv = document.createElement('div');
      div.appendChild(qDiv);
      let qLabel = document.createElement('p');
      qDiv.appendChild(qLabel);
      qLabel.innerHTML = 'Q';
      let qDisplay = document.createElement('input');
      qDiv.appendChild(qDisplay);
      qDisplay.type = 'number';
      qDisplay.step = '0.0001';
      qDisplay.max = '1000.0000';
      qDisplay.min = '0.0001';
      qDisplay.value = this.q;
      let qSlider = document.createElement('input');
      qDiv.appendChild(qSlider);
      qSlider.type = 'range';
      qSlider.step = '0.0001';
      qSlider.max = '1000.0000';
      qSlider.min = '0.0001';
      qSlider.value = this.q;
      let qModulatorLabel = document.createElement('p');
      qDiv.appendChild(qModulatorLabel);
      qModulatorLabel.innerHTML = 'modulation';
      let qModulatorInput = document.createElement('h1');
      qDiv.appendChild(qModulatorInput);
      qModulatorInput.innerHTML = '◦';
      qModulatorInput.id = 'q modulator input - ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/5) + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 5px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadowColor + ", -2px -2px 1px " + this.topFontShadowColor + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 10px; margin-top: 1px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 15px; margin-top: -15px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 4px; margin-top: 1px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + "; transform: translateX(90px) translateY(-130px);");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 1px; margin-top: 1px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; transform: translateX(110px) translateY(-145px);");
      frequencyDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 4)/15) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px; background: transparent;");
      frequencyLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      frequencyDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      frequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; height: 18px; width: 220px; position: relative; margin: 50px 0 0 10px;");
      switch(this.skinName) {
        case('Highpass Filter: January A'):
          frequencySlider.className = 'highpassFilterHorizontalSliderJanuaryA';
          detuneSlider.className = 'highpassFilterHorizontalSliderJanuaryA';
          qSlider.className = 'highpassFilterHorizontalSliderJanuaryA';
          break;
        case('Highpass Filter: January B'):
          frequencySlider.className = 'highpassFilterHorizontalSliderJanuaryB';
          detuneSlider.className = 'highpassFilterHorizontalSliderJanuaryB';
          qSlider.className = 'highpassFilterHorizontalSliderJanuaryB';
          break;
        case('Highpass Filter: January C'):
          frequencySlider.className = 'highpassFilterHorizontalSliderJanuaryC';
          detuneSlider.className = 'highpassFilterHorizontalSliderJanuaryC';
          qSlider.className = 'highpassFilterHorizontalSliderJanuaryC';
          break;
        case('Highpass Filter: February A'):
          frequencySlider.className = 'highpassFilterHorizontalSliderFebruaryA';
          detuneSlider.className = 'highpassFilterHorizontalSliderFebruaryA';
          qSlider.className = 'highpassFilterHorizontalSliderFebruaryA';
          break;
        case('Highpass Filter: February B'):
          frequencySlider.className = 'highpassFilterHorizontalSliderFebruaryB';
          detuneSlider.className = 'highpassFilterHorizontalSliderFebruaryB';
          qSlider.className = 'highpassFilterHorizontalSliderFebruaryB';
          break;
        case('Highpass Filter: February C'):
          frequencySlider.className = 'highpassFilterHorizontalSliderFebruaryC';
          detuneSlider.className = 'highpassFilterHorizontalSliderFebruaryC';
          qSlider.className = 'highpassFilterHorizontalSliderFebruaryC';
          break;
        case('Highpass Filter: March A'):
          frequencySlider.className = 'highpassFilterHorizontalSliderMarchA';
          detuneSlider.className = 'highpassFilterHorizontalSliderMarchA';
          qSlider.className = 'highpassFilterHorizontalSliderMarchA';
          break;
        case('Highpass Filter: March B'):
          frequencySlider.className = 'highpassFilterHorizontalSliderMarchB';
          detuneSlider.className = 'highpassFilterHorizontalSliderMarchB';
          qSlider.className = 'highpassFilterHorizontalSliderMarchB';
          break;
        case('Highpass Filter: March C'):
          frequencySlider.className = 'highpassFilterHorizontalSliderMarchC';
          detuneSlider.className = 'highpassFilterHorizontalSliderMarchC';
          qSlider.className = 'highpassFilterHorizontalSliderMarchC';
          break;
        case('Highpass Filter: April A'):
          frequencySlider.className = 'highpassFilterHorizontalSliderAprilA';
          detuneSlider.className = 'highpassFilterHorizontalSliderAprilA';
          qSlider.className = 'highpassFilterHorizontalSliderAprilA';
          break;
        case('Highpass Filter: April B'):
          frequencySlider.className = 'highpassFilterHorizontalSliderAprilB';
          detuneSlider.className = 'highpassFilterHorizontalSliderAprilB';
          qSlider.className = 'highpassFilterHorizontalSliderAprilB';
          break;
        case('Highpass Filter: April C'):
          frequencySlider.className = 'highpassFilterHorizontalSliderAprilC';
          detuneSlider.className = 'highpassFilterHorizontalSliderAprilC';
          qSlider.className = 'highpassFilterHorizontalSliderAprilC';
          break;
        default:
          console.log('unsupported highpass filter skin');
      }
      frequencyModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(140px) translateY(-90px);");
      frequencyModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px; position: relative; transform: translateX(180px) translateY(-190px);");
      detuneDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 4)/15) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px; background: transparent;");
      detuneLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      detuneDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      detuneSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; height: 18px; width: 220px; position: relative; margin: 50px 0 0 10px;");
      detuneModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(140px) translateY(-90px);");
      detuneModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px; position: relative; transform: translateX(180px) translateY(-190px);");
      qDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 4)/15) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px; background: transparent;");
      qLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      qDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      qSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; height: 18px; width: 220px; position: relative; margin: 50px 0 0 10px;");
      qModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(140px) translateY(-90px);");
      qModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px; position: relative; transform: translateX(180px) translateY(-190px);");

      this.manageFrequency(frequencyDisplay, frequencySlider);

      this.manageDetune(detuneDisplay, detuneSlider);

      this.manageQ(qDisplay, qSlider);

      frequencyModulatorInput.addEventListener('click', () => {
        alert(frequencyModulatorInput.id);
      });

      qModulatorInput.addEventListener('click', () => {
        alert(qModulatorInput.id);
      });

      detuneModulatorInput.addEventListener('click', () => {
        alert(detuneModulatorInput.id);
      });

      outputPort.addEventListener('click', () => {
        alert(outputPort.id);
      });

      inputPort.addEventListener('click', () => {
        alert(inputPort.id);
      });

      return(div);
    }

    this.renderRackVertical = (x, y) => {

      let div = document.createElement('div');
      let nameAndOutputDiv = document.createElement('div');
      div.appendChild(nameAndOutputDiv);
      let nameTag = document.createElement('h1');
      nameAndOutputDiv.appendChild(nameTag);
      nameTag.innerHTML = this.name;
      let inputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      let inputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input ' + this.name + this.id;
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let frequencyDiv = document.createElement('div');
      div.appendChild(frequencyDiv);
      let frequencyLabel = document.createElement('p');
        frequencyDiv.appendChild(frequencyLabel);
        frequencyLabel.innerHTML = 'frequency(Hz)';
      let frequencyDisplay = document.createElement('input');
      frequencyDiv.appendChild(frequencyDisplay);
      frequencyDisplay.type = 'number';
      frequencyDisplay.step = '0.001';
      frequencyDisplay.max = '22050.000';
      frequencyDisplay.min = '0.000';
      frequencyDisplay.value = this.frequency;
      let frequencySlider = document.createElement('input');
      frequencyDiv.appendChild(frequencySlider);
      frequencySlider.type = 'range';
      frequencySlider.step = '0.001';
      frequencySlider.max = '22050.000';
      frequencySlider.min = '0.000';
      frequencySlider.value = this.frequency;
      let frequencyModulatorLabel = document.createElement('p');
      frequencyDiv.appendChild(frequencyModulatorLabel);
      frequencyModulatorLabel.innerHTML = 'modulation:';
      let frequencyModulatorInput = document.createElement('h1');
      frequencyDiv.appendChild(frequencyModulatorInput);
      frequencyModulatorInput.innerHTML = '◦';
      frequencyModulatorInput.id = 'Frequency Modulation Input ' + this.name + this.id;
      let detuneDiv = document.createElement('div');
      div.appendChild(detuneDiv);
      let detuneLabel = document.createElement('p');
      detuneDiv.appendChild(detuneLabel);
      detuneLabel.innerHTML = 'detune';
      let detuneDisplay = document.createElement('input');
      detuneDiv.appendChild(detuneDisplay);
      detuneDisplay.type = 'number';
      detuneDisplay.step = '0.01';
      detuneDisplay.max = '100.00';
      detuneDisplay.min = '-100.00';
      detuneDisplay.value = this.detune;
      let detuneSlider = document.createElement('input');
      detuneDiv.appendChild(detuneSlider);
      detuneSlider.type = 'range';
      detuneSlider.step = '0.01';
      detuneSlider.max = '100.00';
      detuneSlider.min = '-100.00';
      detuneSlider.value = this.detune;
      let detuneModulatorLabel = document.createElement('p');
      detuneDiv.appendChild(detuneModulatorLabel);
      detuneModulatorLabel.innerHTML = 'modulation:';
      let detuneModulatorInput = document.createElement('h1');
      detuneDiv.appendChild(detuneModulatorInput);
      detuneModulatorInput.innerHTML = '◦';
      detuneModulatorInput.id = 'Detune Modulation Input ' + this.name + this.id;
      let qDiv = document.createElement('div');
      div.appendChild(qDiv);
      let qLabel = document.createElement('p');
      qDiv.appendChild(qLabel);
      qLabel.innerHTML = 'Q';
      let qDisplay = document.createElement('input');
      qDiv.appendChild(qDisplay);
      qDisplay.type = 'number';
      qDisplay.step = '0.0001';
      qDisplay.max = '1000.0000';
      qDisplay.min = '0.0001';
      qDisplay.value = this.q;
      let qSlider = document.createElement('input');
      qDiv.appendChild(qSlider);
      qSlider.type = 'range';
      qSlider.step = '0.0001';
      qSlider.max = '1000.0000';
      qSlider.min = '0.0001';
      qSlider.value = this.q;
      let qModulatorLabel = document.createElement('p');
      qDiv.appendChild(qModulatorLabel);
      qModulatorLabel.innerHTML = 'modulation:';
      let qModulatorInput = document.createElement('h1');
      qDiv.appendChild(qModulatorInput);
      qModulatorInput.innerHTML = '◦';
      qModulatorInput.id = 'Q Modulation Input ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0 0 12px 0; padding-top: 5px; height: " + (this.verticalHeight/6.5) + "px;");
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; position: relative; top: -10px; left: 12px;");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + "; transform: translateX(10px) translateY(-25px);");
      inputPort.setAttribute("style", "z-index: 6; cursor: pointer; font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; padding-left: 10px; position: relative; transform: translateX(9px) translateY(-40px);");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + "; position: relative; transform: translateX(85px) translateY(-153px);");
      outputPort.setAttribute("style", "z-index: 6; cursor: pointer; font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; padding-left: 10px; position: relative; transform: translateX(95px) translateY(-168px);");
      frequencyDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + ((this.verticalHeight * 4.9)/18) + "px; background: transparent;");
      frequencyLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-20px);");
      frequencyDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; position: relative; transform: translateX(8px) translateY(-30px);");
      frequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg) translateX(-32px) translateY(80px); transform: rotateZ(-90deg) translateX(-32px) translateY(80px); background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", 2px -2px 1px " + this.faceBoxShadowColor + ", 3px -3px 1px " + this.faceBoxShadowColor + ", 4px -4px 1px " + this.faceBoxShadowColor + "; height: 16px; width: 130px; position: relative;");
      switch(this.skinName) {
        case('Highpass Filter: January A'):
          frequencySlider.className = 'highpassFilterSliderVerticalJanuaryA';
          detuneSlider.className = 'highpassFilterSliderVerticalJanuaryA';
          qSlider.className = 'highpassFilterSliderVerticalJanuaryA';
          break;
        case('Highpass Filter: January B'):
          frequencySlider.className = 'highpassFilterSliderVerticalJanuaryB';
          detuneSlider.className = 'highpassFilterSliderVerticalJanuaryB';
          qSlider.className = 'highpassFilterSliderVerticalJanuaryB';
          break;
        case('Highpass Filter: January C'):
          frequencySlider.className = 'highpassFilterSliderVerticalJanuaryC';
          detuneSlider.className = 'lowpassFilterSliderVerticalJanuaryC';
          qSlider.className = 'lowpassFilterSliderVerticalJanuaryC';
          break;
        case('Highpass Filter: February A'):
          frequencySlider.className = 'highpassFilterVerticalSliderFebruaryA';
          detuneSlider.className = 'highpassFilterVerticalSliderFebruaryA';
          qSlider.className = 'highpassFilterVerticalSliderFebruaryA';
          break;
        case('Highpass Filter: February B'):
          frequencySlider.className = 'highpassFilterVerticalSliderFebruaryB';
          detuneSlider.className = 'highpassFilterVerticalSliderFebruaryB';
          qSlider.className = 'highpassFilterVerticalSliderFebruaryB';
          break;
        case('Highpass Filter: February C'):
          frequencySlider.className = 'highpassFilterVerticalSliderFebruaryC';
          detuneSlider.className = 'highpassFilterVerticalSliderFebruaryC';
          qSlider.className = 'highpassFilterVerticalSliderFebruaryC';
          break;
        case('Highpass Filter: March A'):
          frequencySlider.className = 'highpassFilterVerticalSliderMarchA';
          detuneSlider.className = 'highpassFilterVerticalSliderMarchA';
          qSlider.className = 'highpassFilterVerticalSliderMarchA';
          break;
        case('Highpass Filter: March B'):
          frequencySlider.className = 'highpassFilterVerticalSliderMarchB';
          detuneSlider.className = 'highpassFilterVerticalSliderMarchB';
          qSlider.className = 'highpassFilterVerticalSliderMarchB';
          break;
        case('Highpass Filter: March C'):
          frequencySlider.className = 'highpassFilterVerticalSliderMarchC';
          detuneSlider.className = 'highpassFilterVerticalSliderMarchC';
          qSlider.className = 'highpassFilterVerticalSliderMarchC';
          break;
        case('Highpass Filter: April A'):
          frequencySlider.className = 'highpassFilterVerticalSliderAprilA';
          detuneSlider.className = 'highpassFilterVerticalSliderAprilA';
          qSlider.className = 'highpassFilterVerticalSliderAprilA';
          break;
        case('Highpass Filter: April B'):
          frequencySlider.className = 'highpassFilterVerticalSliderAprilB';
          detuneSlider.className = 'highpassFilterVerticalSliderAprilB';
          qSlider.className = 'highpassFilterVerticalSliderAprilB';
          break;
        case('Highpass Filter: April C'):
          frequencySlider.className = 'highpassFilterVerticalSliderAprilC';
          detuneSlider.className = 'highpassFilterVerticalSliderAprilC';
          qSlider.className = 'highpassFilterVerticalSliderAprilC';
          break;
        default:
          console.log('unsupported dynamic compressor skin');
      }
      frequencyModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-50px);");
      frequencyModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; transform: translateX(35px) translateY(-70px);");
      detuneDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + ((this.verticalHeight * 4.8)/18) + "px; background: transparent;");
      detuneLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-20px);");
      detuneDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; position: relative; transform: translateX(8px) translateY(-30px);");
      detuneSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg) translateX(-32px) translateY(80px); transform: rotateZ(-90deg) translateX(-32px) translateY(80px); background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", 2px -2px 1px " + this.faceBoxShadowColor + ", 3px -3px 1px " + this.faceBoxShadowColor + ", 4px -4px 1px " + this.faceBoxShadowColor + "; height: 16px; width: 130px; position: relative;");
      detuneModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-50px);");
      detuneModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; transform: translateX(35px) translateY(-70px);");
      qDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + ((this.verticalHeight * 4.8)/18) + "px; background: transparent;");
      qLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-20px);");
      qDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; position: relative; transform: translateX(8px) translateY(-30px);");
      qSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg) translateX(-32px) translateY(80px); transform: rotateZ(-90deg) translateX(-32px) translateY(80px); background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", 2px -2px 1px " + this.faceBoxShadowColor + ", 3px -3px 1px " + this.faceBoxShadowColor + ", 4px -4px 1px " + this.faceBoxShadowColor + "; height: 16px; width: 120px; position: relative;");
      qModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-50px);");
      qModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; transform: translateX(35px) translateY(-70px);");

      this.manageFrequency(frequencyDisplay, frequencySlider);

      this.manageDetune(detuneDisplay, detuneSlider);

      this.manageQ(qDisplay, qSlider);

    inputPort.addEventListener('click', () => {
      alert(inputPort.id);
    });

    outputPort.addEventListener('click', () => {
      alert(outputPort.id);
    });

    frequencyModulatorInput.addEventListener('click', () => {
      alert(frequencyModulatorInput.id);
    });

    detuneModulatorInput.addEventListener('click', () => {
      alert(detuneModulatorInput.id);
    });

    qModulatorInput.addEventListener('click', () => {
      alert(qModulatorInput.id);
    });

      return(div);
    }
  }


  return(highpassFilter);
})();
