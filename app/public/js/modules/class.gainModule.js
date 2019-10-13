'use strict';

var GainModule = (function(settings, skin, audioContext) {

  let gainNode = function(settings, skin, audioContext) {
    this.id = settings.id;
    this.name = settings.name;
    this.positionX = settings.positionX;
    this.positionY = settings.positionY;
    this.gainValue = settings.gain_value;
    this.gainModulator = settings.gain_modulator;
    this.input = settings.input;
    this.output = settings.output;
    this.gain = audioContext.createGain();
    this.gain.gain.value = (this.gainValue/100);

    this.skinName = skin.name;
    this.month = skin.month;
    this.rule = skin.rule;
    this.facePath = skin.face_path;
    this.faceSize = skin.face_size;
    this.faceRepeate = skin.face_repeat;
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
    this.inputSize = skin.input_size;
    this.inputRepeat = skin.input_repeat;
    this.inputBoxShadowColor = skin.input_box_shadow_color;
    this.inputFontColor = skin.input_font_color;
    this.inputFontShadow = skin.input_font_shadow;
    this.outputSize = skin.output_size;
    this.outputRepeat = skin.output_repeat;
    this.outputBoxShadowColor = skin.output_box_shadow_color;
    this.outputFontColor = skin.output_font_color;
    this.outputFontShadow = skin.output_font_shadow;
    this.gainDisplaySize = skin.gain_display_size;
    this.gainDisplayRepeat = skin.gain_display_repeat;
    this.gainDisplayBoxShadowColor = skin.gain_display_box_shadow_color;
    this.gainDisplayFontColor = skin.gain_display_font_color;
    this.gainVolumeSize = skin.gain_volume_size;
    this.gainVolumeRepeat = skin.gain_volume_repeat;
    this.gainVolumeBoxShadow = skin.gain_volume_box_shadow;
    this.gainSliderPath = skin.gain_slider_path;
    this.gainModulatorSelectPath = skin.gain_modulator_select_path;
    this.gainModulatorSelectSize = skin.gain_modulator_select_size;
    this.gainModulatorSelectRepeat = skin.gain_modulator_select_repeat;
    this.gainModulatorSelectBoxShadowColor = skin.gain_modulator_select_box_shadow_color;
    this.gainModulatorEditBoxShadowColor = skin.gain_modulator_edit_box_shadow_color;

    this.dragWidth = 390;
    this.dragHeight = 400;
    this.horizontalWidth = 900;
    this.horizontalHeight = 160;
    this.verticalWidth = 160;
    this.verticalHeight = 750;

    this.userVolumeInput = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.gainValue = display.value;
        this.gain.gain.value = (this.gainValue/100);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.gainValue = slider.value;
        this.gain.gain.value = (this.gainValue/100);
      });
    }

    // rendering functions

    this.renderDraggable = () => {
      let div = document.createElement('div');
      let gainTop = document.createElement('div');
      div.appendChild(gainTop);
      let nameTag = document.createElement('h1');
      gainTop.appendChild(nameTag);
      let signalPanel = document.createElement('div');
      div.appendChild(signalPanel);
      let inputLabel = document.createElement('p');
      signalPanel.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      let inputPort = document.createElement('h1');
      signalPanel.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input' + this.name + this.id;
      let outputLabel = document.createElement('p');
      signalPanel.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      signalPanel.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output' + this.name + this.id;
      let face = document.createElement('div');
      div.appendChild(face);
      let faceForm = document.createElement('div');
      face.appendChild(faceForm);
      let gainDisplay = document.createElement('input');
      faceForm.appendChild(gainDisplay);
      gainDisplay.id = 'gainDisplay' + this.id;
      gainDisplay.type = 'number';
      gainDisplay.name = 'amountInput';
      gainDisplay.min = '0';
      gainDisplay.max = '100';
      gainDisplay.value = this.gainValue.toString();
      gainDisplay.stepvalue = '1';
      let amountRange = document.createElement('input');
      faceForm.appendChild(amountRange);
      amountRange.className = 'volumeSlider';
      amountRange.name = 'amountRange';
      amountRange.type = 'range';
      amountRange.min = '0';
      amountRange.max = '100';
      amountRange.value = this.gainValue.toString();
      amountRange.stepvalue = '1';
      amountRange.id = 'gainSlider' + this.id;
      let modulationInputLabel = document.createElement('p');
      faceForm.appendChild(modulationInputLabel);
      modulationInputLabel.innerHTML = 'modulation input';
      let modulationInputPort = document.createElement('h1');
      faceForm.appendChild(modulationInputPort);
      modulationInputPort.innerHTML = '◦';
      modulationInputPort.id = 'modulationInput' + this.name + this.id;

      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5);");
      gainTop.setAttribute("style", "width: " + (this.dragWidth) + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; font-family: 'Righteous', cursive; height: 50px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + this.topRepeat + ";");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 2em; margin-top: 1em; color: " + this.topFontColor + "; font-weight: 600; text-shadow: 1px 1px 1px " + this.topFontShadow + ", 2px 2px 1px " + this.topFontShadow + ";");
      signalPanel.setAttribute("style", "background: url(" + this.signalPath + "); background-size: " + this.signalSize + "; border: solid 1px transparent; height: 350px; width: 49px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: 0; margin-top: -23px; box-shadow: 0px -1px 1px " + this.signalFontShadow + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; margin-left: 1px; margin-top: 54px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; cursor: pointer;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 15px; margin-left: 1px; margin-top: 54px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; cursor: pointer;");
      face.setAttribute("style", "height: 350px; width: " + this.dragWidth + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: " + this.faceRepeat + "; margin-top: -326px; margin-left: 52px; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ";");
      gainDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 96px; margin-left: 25px; margin-top: 25px; background: url(" + this.displayPath + "); background-size: " + this.gainDisplaySize + "; box-shadow: -1px -1px 1px " + this.gainDisplayBoxShadowColor + ", -2px -2px 1px " + this.gainDisplayBoxShadowColor + ", -3px -3px 1px " + this.gainDisplayBoxShadowColor + ", -4px -4px 1px " + this.gainDisplayBoxShadowColor + "; padding-left: 5vmin;");
      amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.gainVolumeSize + "; background-repeat: " + this.gainVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.gainVolumeBoxShadow + ", 2px -2px 1px " + this.gainVolumeBoxShadow + ", 3px -3px 1px " + this.gainVolumeBoxShadow + ", 4px -4px 1px " + this.gainVolumeBoxShadow + "; position: relative; transform: translateX(45px) translateY(-77px) rotateZ(-90deg);");
      modulationInputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; margin-left: 38px; margin-top: -34px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      modulationInputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 66px; margin-left: 137px; height: 1.2em; margin-top: 0; width: 0.7em; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + "; padding-left: 0.1em; cursor: pointer;");

      this.userVolumeInput(gainDisplay, amountRange);

      function dragElement(element, obj) {

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (gainTop) {
          gainTop.onmousedown = dragMouseDown;
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
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
        updateConnectors(this);
        setTimeout(() => {
          updateConnectors(this);
        }, 100);
      });

      div.addEventListener('mouseout', () => {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 1;");
        updateConnectors(this);
        setTimeout(() => {
          updateConnectors(this);
        }, 100);
      });

      inputPort.addEventListener('click', () => {
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'gain' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'gains');
        }
      });

      outputPort.addEventListener('click', () => {
        // alert('Gain Output Port -- id: ' + this.id);
        if (this.output == null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'gain' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'gains');
        }

      });

      modulationInputPort.addEventListener('click', () => {
        // alert('Gain Modulation Input --- id: ' + this.id);
        if (this.gainModulator === null) {
          clickThroughput({ through: 'input', type: 'modulation', device: 'gain' }, modulationInputPort, this);
        } else {
          disconnectPatchConnection(this, 'gainModulator', 'gains');
        }

      });

      return(div);
    }

    this.renderRackHorizontal = (x, y) => {
      let div = document.createElement('div');
      let nameAndInputOutputDiv = document.createElement('div');
      div.appendChild(nameAndInputOutputDiv);
      let nameTag = document.createElement('h1');
      nameAndInputOutputDiv.appendChild(nameTag);
      let inputPort = document.createElement('h1');
      let inputLabel = document.createElement('p');
      nameAndInputOutputDiv.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      nameAndInputOutputDiv.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input' + this.name + this.id;
      let outputPort = document.createElement('h1');
      let outputLabel = document.createElement('p');
      nameAndInputOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      nameAndInputOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output' + this.name + this.id;
      let displayDiv = document.createElement('div');
      div.appendChild(displayDiv);
      let gainDisplay = document.createElement('input');
      displayDiv.appendChild(gainDisplay);
      gainDisplay.id = 'gainDisplay' + this.id;
      gainDisplay.type = 'number';
      gainDisplay.name = 'amountInput';
      gainDisplay.min = '0';
      gainDisplay.max = '100';
      gainDisplay.value = this.gainValue.toString();
      gainDisplay.stepvalue = '1';
      let rangeDiv = document.createElement('div');
      div.appendChild(rangeDiv);
      let amountRange = document.createElement('input');
      rangeDiv.appendChild(amountRange);
      amountRange.className = 'volumeSliderHorizontal';
      amountRange.name = 'amountRange';
      amountRange.type = 'range';
      amountRange.min = '0';
      amountRange.max = '100';
      amountRange.value = this.gainValue.toString();
      amountRange.stepvalue = '1';
      amountRange.id = 'gainSlider' + this.id;
      let modulationDiv = document.createElement('div');
      div.appendChild(modulationDiv);
      let modulationInputLabel = document.createElement('p');
      modulationDiv.appendChild(modulationInputLabel);
      modulationInputLabel.innerHTML = 'modulation input';
      let modulationInputPort = document.createElement('h1');
      modulationDiv.appendChild(modulationInputPort);
      modulationInputPort.innerHTML = '◦';
      modulationInputPort.id = 'modulationInput' + this.name + this.id;

      div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.gainVolumeBoxShadow + ", -2px -2px 1px " + this.gainVolumeBoxShadow + ", -3px -3px 1px " + this.gainVolumeBoxShadow + ", -4px -4px 1px " + this.gainVolumeBoxShadow + ";");
      div.className = 'pure-g';
      nameAndInputOutputDiv.className = "pure-u-1-5";
      nameAndInputOutputDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/5) + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 5px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 10px; margin-top: -5px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 15px; margin-top: -10px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 95px; margin-top: -135px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 110px; margin-top: -10px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      displayDiv.className = "pure-u-1-5";
      displayDiv.setAttribute("style", "float: left; width: " + this.horizontalHeight + "px; padding: 10px;");
      gainDisplay.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 35px; background: url(" + this.displayPath + "); background-size: " + this.gainDisplaySize + "; box-shadow: -1px -1px 1px " + this.gainDisplayBoxShadowColor + ", -2px -2px 1px " + this.gainDisplayBoxShadowColor + ", -3px -3px 1px " + this.gainDisplayBoxShadowColor + ", -4px -4px 1px " + this.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 140px; height: 80px;");
      rangeDiv.className = 'pure-u-2-5';
      rangeDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 2)/5) + "px;");
      amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.gainVolumeSize + "; background-repeat: " + this.gainVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.gainVolumeBoxShadow + ", -2px -2px 1px " + this.gainVolumeBoxShadow + ", -3px -3px 1px " + this.gainVolumeBoxShadow + ", -4px -4px 1px " + this.gainVolumeBoxShadow + ";");
      modulationDiv.className = "pure-u-1-5";
      modulationDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/5) + "px;");
      modulationInputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 30px; margin-top: 15px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      modulationInputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 65px; margin-top: -10px; width: 40px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + "; cursor: pointer; padding-left: 10px;");

      this.userVolumeInput(gainDisplay, amountRange);

      inputPort.addEventListener('click', () => {
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'gain' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'gains');
        }
      });

      outputPort.addEventListener('click', () => {
        if (this.output == null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'gain' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'gains');
        }
      });

      modulationInputPort.addEventListener('click', () => {
        if (this.gainModulator === null) {
          clickThroughput({ through: 'input', type: 'modulation', device: 'gain' }, modulationInputPort, this);
        } else {
          disconnectPatchConnection(this, 'gainModulator', 'gains');
        }
      });

      return(div);
    }

    this.renderRackVertical = (x, y) => {
      let div = document.createElement('div');
      let nameAndInputOutputDiv = document.createElement('div');
      div.appendChild(nameAndInputOutputDiv);
      let nameTag = document.createElement('h1');
      nameAndInputOutputDiv.appendChild(nameTag);
      let inputPort = document.createElement('h1');
      let inputLabel = document.createElement('p');
      nameAndInputOutputDiv.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      nameAndInputOutputDiv.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input' + this.name + this.id;
      let outputLabel = document.createElement('p');
      nameAndInputOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let displayDiv = document.createElement('div');
      div.appendChild(displayDiv);
      let outputPort = document.createElement('h1');
      nameAndInputOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output' + this.name + this.id;
      let gainDisplay = document.createElement('input');
      displayDiv.appendChild(gainDisplay);
      gainDisplay.id = 'gainDisplay' + this.id;
      gainDisplay.type = 'number';
      gainDisplay.name = 'amountInput';
      gainDisplay.min = '0';
      gainDisplay.max = '100';
      gainDisplay.value = this.gainValue.toString();
      gainDisplay.stepvalue = '1';
      let rangeDiv = document.createElement('div');
      div.appendChild(rangeDiv);
      let amountRange = document.createElement('input');
      rangeDiv.appendChild(amountRange);
      amountRange.className = 'volumeSliderVertical';
      amountRange.name = 'amountRange';
      amountRange.type = 'range';
      amountRange.min = '0';
      amountRange.max = '100';
      amountRange.value = this.gainValue.toString();
      amountRange.stepvalue = '1';
      amountRange.id = 'gainSlider' + this.id;
      let modulationDiv = document.createElement('div');
      div.appendChild(modulationDiv);
      let modulationInputLabel = document.createElement('p');
      modulationDiv.appendChild(modulationInputLabel);
      modulationInputLabel.innerHTML = 'modulation input';
      let modulationInputPort = document.createElement('h1');
      modulationDiv.appendChild(modulationInputPort);
      modulationInputPort.innerHTML = '◦';
      modulationInputPort.id = 'modulationInput' + this.name + this.id;

      div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.gainVolumeBoxShadow + ", -2px -2px 1px " + this.gainVolumeBoxShadow + ", -3px -3px 1px " + this.gainVolumeBoxShadow + ", -4px -4px 1px " + this.gainVolumeBoxShadow + ";");
      nameAndInputOutputDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 20px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; margin-left: 10px; margin-top: -5px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin-left: 15px; margin-top: -5px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; margin-left: 95px; margin-top: -115px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin-left: 100px; margin-top: -5px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      displayDiv.setAttribute("style", "float: left; width: " + this.horizontalHeight + "px; padding: 10px;");
      gainDisplay.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 15px; background: url(" + this.displayPath + "); background-size: " + this.gainDisplaySize + "; box-shadow: -1px -1px 1px " + this.gainDisplayBoxShadowColor + ", -2px -2px 1px " + this.gainDisplayBoxShadowColor + ", -3px -3px 1px " + this.gainDisplayBoxShadowColor + ", -4px -4px 1px " + this.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 130px; height: 80px;");
      rangeDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px;");
      amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.gainVolumeSize + "; background-repeat: " + this.gainVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.gainVolumeBoxShadow + ", 2px -2px 1px " + this.gainVolumeBoxShadow + ", 3px -3px 1px " + this.gainVolumeBoxShadow + ", 4px -4px 1px " + this.gainVolumeBoxShadow + ";");
      modulationDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin-top: 100px;");
      modulationInputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 20px; margin-top: 35px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      modulationInputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 65px; margin-top: -10px; width: 40px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + "; cursor: pointer; padding-left: 10px;");

      this.userVolumeInput(gainDisplay, amountRange);

      inputPort.addEventListener('click', () => {
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'gain' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'gains');
        }
      });

      outputPort.addEventListener('click', () => {
        if (this.output == null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'gain' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'gains');
        }
      });

      modulationInputPort.addEventListener('click', () => {
        if (this.gainModulator === null) {
          clickThroughput({ through: 'input', type: 'modulation', device: 'gain' }, modulationInputPort, this);
        } else {
          disconnectPatchConnection(this, 'gainModulator', 'gains');
        }
      });

      return(div);
    }

  }

  return(gainNode);
})();
