'use strict';

var DynamicCompressor = (function(settings, skin, audioContext) {

  let dynamicCompressorNode = function(settings, skin, audioContext) {
    this.id = settings.id;
    this.name = settings.name;
    this.positionX = settings.positionX;
    this.positionY = settings.positionY;
    this.threshold = settings.threshold;
    this.threshold_modulator = settings.threshold_modulator;
    this.knee = settings.knee;
    this.knee_modulator = settings.knee_modulator;
    this.ratio = settings.ratio;
    this.ratio_modulator = settings.ratio_modulator;
    this.attack = settings.attack;
    this.attack_modulator = settings.attack_modulator;
    this.release = settings.release;
    this.release_modulator = settings.release_modulator;
    this.input = settings.input;
    this.output = settings.output;
    this.dynamicCompressor = audioContext.createDynamicsCompressor();
    this.dynamicCompressor.threshold.value = this.threshold;
    this.dynamicCompressor.knee.value = this.knee;
    this.dynamicCompressor.ratio.value = this.ratio;
    this.dynamicCompressor.attack.value = this.attack;
    this.dynamicCompressor.release.value = this.release;

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
    this.thresholdDisplaySize = skin.threshold_display_size;
    this.thresholdDisplayRepeat = skin.threshold_display_repeat;
    this.thresholdDisplayBoxShadowColor = skin.threshold_display_box_shadow_color;
    this.thresholdDisplayFontColor = skin.threshold_display_font_color;
    this.thresholdSliderPath = skin.threshold_slider_path;
    this.thresholdSliderSize = skin.threshold_slider_size;
    this.thresholdSliderRpeat = skin.threshold_slider_repeat;
    this.thresholdSliderBoxShadowColor = skin.threshold_slider_box_shadow_color;
    this.kneeDisplayPath = skin.knee_display_path;
    this.kneeDisplaySize = skin.knee_display_size;
    this.kneeRepeat = skin.knee_repeat;
    this.kneeBoxShadow = skin.knee_box_shadow;
    this.kneeDisplayFontColor = skin.knee_display_font_color;
    this.kneeSliderPath = skin.knee_slider_path;
    this.kneeSliderSize = skin.knee_slider_size;
    this.kneeSliderRepeat = skin.knee_slider_repeat;
    this.kneeSliderBoxShadow = skin.knee_slider_box_shadow;
    this.ratioDisplayPath = skin.ratio_display_path;
    this.ratioDisplaySize = skin.ratio_display_size;
    this.ratioDisplayRepeat = skin.ratio_display_repeat;
    this.ratioDisplayBoxShadowColor = skin.ratio_display_box_shadow_color;
    this.ratioDisplayFontColor = skin.ratio_display_font_color;
    this.ratioSliderPath = skin.ratio_slider_path;
    this.ratioSliderSize = skin.ratio_slider_size;
    this.ratioSliderRepeat = skin.ratio_slider_repeat;
    this.ratioSliderBoxShadowColor = skin.ratio_slider_box_shadow_color;
    this.attackDisplayPath = skin.attack_display_path;
    this.attackDisplaySize = skin.attack_display_size;
    this.attackDisplayRepeat = skin.attack_display_repeat;
    this.attackDisplayBoxShadowColor = skin.attack_display_box_shadow_color;
    this.attackDisplayFontColor = skin.attack_display_font_color;
    this.attackSliderPath = skin.attack_slider_path;
    this.attackSliderSize = skin.attack_slider_size;
    this.attackSliderRepeat = skin.attack_slider_repeat;
    this.attackSliderBoxShadowColor = skin.attack_slider_box_shadow_color;
    this.releaseDisplayPath = skin.release_display_path;
    this.releaseDisplaySize = skin.release_display_size;
    this.releaseDisplayRepeat = skin.release_display_repeat;
    this.releaseDisplayBoxShadowColor = skin.release_display_box_shadow_color;
    this.releaseDisplayFontColor = skin.release_display_font_color;
    this.releaseSliderPath = skin.release_slider_path;
    this.releaseSliderSize = skin.release_slider_size;
    this.releaseSliderRepeat = skin.release_slider_repeat;
    this.releaseSliderBoxShadowColor = skin.release_slider_box_shadow_color;
    this.sliderShaderColor1 = skin.slider_shader_color_1;
    this.sliderShaderColor2 = skin.slider_shader_color_2;

    this.dragWidth = 1090;
    this.dragHeight = 453;
    this.horizontalWidth = 900;
    this.horizontalHeight = 320;
    this.verticalWidth = 320;
    this.verticalHeight = 750;

    // functionality

    this.manageThrehold = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.threshold = display.value;
        this.dynamicCompressor.threshold.value = (this.threshold);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.threshold = slider.value;
        this.dynamicCompressor.threshold.value = (this.threshold);
      });
    }

    this.manageKnee = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.knee = display.value;
        this.dynamicCompressor.knee.value = (this.knee);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.knee = slider.value;
        this.dynamicCompressor.knee.value = (this.knee);
      });
    }

    this.manageRatio = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.ratio = display.value;
        this.dynamicCompressor.ratio.value = (this.ratio);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.ratio = slider.value;
        this.dynamicCompressor.ratio.value = (this.ratio);
      });
    }

    this.manageAttack = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.attack = display.value;
        this.dynamicCompressor.attack.value = (this.attack);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.attack = slider.value;
        this.dynamicCompressor.attack.value = (this.attack);
      });
    }

    this.manageRelease = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.release = display.value;
        this.dynamicCompressor.release.value = (this.release);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.release = slider.value;
        this.dynamicCompressor.release.value = (this.release);
      });
    }

    // Rendering Functions

    this.renderDraggable = () => {

      let div = document.createElement('div');
      let dynamicCompressorTop = document.createElement('div');
      div.appendChild(dynamicCompressorTop);
      let nameTag = document.createElement('h1');
      dynamicCompressorTop.appendChild(nameTag);
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
      let thresholdDiv = document.createElement('div');
      face.appendChild(thresholdDiv);
      let thresholdLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdLabel);
      thresholdLabel.innerHTML = 'threshold(dB)';
      let compressorThresholdDisplay = document.createElement('input');
      thresholdDiv.appendChild(compressorThresholdDisplay);
      compressorThresholdDisplay.type = 'number';
      compressorThresholdDisplay.step = '0.01';
      compressorThresholdDisplay.min = '-100.00';
      compressorThresholdDisplay.max = '0.00';
      compressorThresholdDisplay.value = this.threshold;
      let thresholdSlider = document.createElement('input');
      thresholdDiv.appendChild(thresholdSlider);
      thresholdSlider.type = 'range';
      thresholdSlider.step = '0.01';
      thresholdSlider.min = '-100.00';
      thresholdSlider.max = '0.00';
      thresholdSlider.value = this.threshold;
      let thresholdModulatorLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdModulatorLabel);
      thresholdModulatorLabel.innerHTML = 'modulation';
      let thresholdModulatorInput = document.createElement('h1');
      thresholdDiv.appendChild(thresholdModulatorInput);
      thresholdModulatorInput.innerHTML = '◦';
      thresholdModulatorInput.id = 'threshhold modulator input - ' + this.name + this.id;
      let kneeDiv = document.createElement('div');
      face.appendChild(kneeDiv);
      let kneeLabel = document.createElement('p');
      kneeDiv.appendChild(kneeLabel);
      kneeLabel.innerHTML = 'knee(dB)';
      let compressorKneeDisplay = document.createElement('input');
      kneeDiv.appendChild(compressorKneeDisplay);
      compressorKneeDisplay.type = 'number';
      compressorKneeDisplay.step = '0.01';
      compressorKneeDisplay.min = '0.00';
      compressorKneeDisplay.max = '40.00';
      compressorKneeDisplay.value = this.knee;
      let kneeSlider = document.createElement('input');
      kneeDiv.appendChild(kneeSlider);
      kneeSlider.type = 'range';
      kneeSlider.step = '0.01';
      kneeSlider.min = '0.00';
      kneeSlider.max = '40.00';
      kneeSlider.value = this.knee;
      let kneeModulatorLabel = document.createElement('p');
      kneeDiv.appendChild(kneeModulatorLabel);
      kneeModulatorLabel.innerHTML = 'modulation';
      let kneeModulatorInput = document.createElement('h1');
      kneeDiv.appendChild(kneeModulatorInput);
      kneeModulatorInput.innerHTML = '◦';
      kneeModulatorInput.id = 'knee modulator input - ' + this.name + this.id;
      let ratioDiv = document.createElement('div');
      face.appendChild(ratioDiv);
      let ratioLabel = document.createElement('p');
      ratioDiv.appendChild(ratioLabel);
      ratioLabel.innerHTML = 'ratio';
      let compressorRatioDisplay = document.createElement('input');
      ratioDiv.appendChild(compressorRatioDisplay);
      compressorRatioDisplay.type = 'number';
      compressorRatioDisplay.step = '0.01';
      compressorRatioDisplay.min = '1.00';
      compressorRatioDisplay.max = '20.00';
      compressorRatioDisplay.value = this.ratio;
      let ratioSlider = document.createElement('input');
      ratioDiv.appendChild(ratioSlider);
      ratioSlider.type = 'range';
      ratioSlider.step = '0.01';
      ratioSlider.min = '1.00';
      ratioSlider.max = '20.00';
      ratioSlider.value = this.ratio;
      let ratioModulatorLabel = document.createElement('p');
      ratioDiv.appendChild(ratioModulatorLabel);
      ratioModulatorLabel.innerHTML = 'modulation';
      let ratioModulatorInput = document.createElement('h1');
      ratioDiv.appendChild(ratioModulatorInput);
      ratioModulatorInput.innerHTML = '◦';
      ratioModulatorInput.id = 'ratio modulator input - ' + this.name + this.id;
      let attackDiv = document.createElement('div');
      face.appendChild(attackDiv);
      let attackLabel = document.createElement('p');
      attackDiv.appendChild(attackLabel);
      attackLabel.innerHTML = 'attack(sec)';
      let compressorAttackDisplay = document.createElement('input');
      attackDiv.appendChild(compressorAttackDisplay);
      compressorAttackDisplay.type = 'number';
      compressorAttackDisplay.step = '0.001';
      compressorAttackDisplay.min = '0.000';
      compressorAttackDisplay.max = '1.000';
      compressorAttackDisplay.value = this.attack;
      let attackSlider = document.createElement('input');
      attackDiv.appendChild(attackSlider);
      attackSlider.type = 'range';
      attackSlider.step = '0.001';
      attackSlider.min = '0.000';
      attackSlider.max = '1.000';
      attackSlider.value = this.attack;
      let attackModulatorLabel = document.createElement('p');
      attackDiv.appendChild(attackModulatorLabel);
      attackModulatorLabel.innerHTML = 'modulation';
      let attackModulatorInput = document.createElement('h1');
      attackDiv.appendChild(attackModulatorInput);
      attackModulatorInput.innerHTML = '◦';
      attackModulatorInput.id = 'attack modulator input - ' + this.name + this.id;
      let releaseDiv = document.createElement('div');
      face.appendChild(releaseDiv);
      let releaseLabel = document.createElement('p');
      releaseDiv.appendChild(releaseLabel);
      releaseLabel.innerHTML = 'release(sec)';
      let compressorReleaseDisplay = document.createElement('input');
      releaseDiv.appendChild(compressorReleaseDisplay);
      compressorReleaseDisplay.type = 'number';
      compressorReleaseDisplay.step = '0.001';
      compressorReleaseDisplay.min = '0.000';
      compressorReleaseDisplay.max = '1.000';
      compressorReleaseDisplay.value = this.release;
      let releaseSlider = document.createElement('input');
      releaseDiv.appendChild(releaseSlider);
      releaseSlider.type = 'range';
      releaseSlider.step = '0.001';
      releaseSlider.min = '0.000';
      releaseSlider.max = '1.000';
      releaseSlider.value = this.release;
      let releaseModulatorLabel = document.createElement('p');
      releaseDiv.appendChild(releaseModulatorLabel);
      releaseModulatorLabel.innerHTML = 'modulation';
      let releaseModulatorInput = document.createElement('h1');
      releaseDiv.appendChild(releaseModulatorInput);
      releaseModulatorInput.innerHTML = '◦';
      releaseModulatorInput.id = 'release modulator input - ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5);");
      dynamicCompressorTop.setAttribute("style", "width: 100%; background: url(" + this.topPath + "); background-size: " + this.topSize + "; font-family: 'Righteous', cursive; height: 60px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + this.topRepeat + ";");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 40px; margin-left: 2em; margin-top: 6em; color: " + this.topFontColor + "; font-weight: 600; text-shadow: 1px 1px 1px " + this.topFontShadow + ", 2px 2px 1px " + this.topFontShadow + ";");
      signalPanel.setAttribute("style", "background: url(" + this.signalPath + "); background-size: " + this.signalSize + "; border: solid 1px transparent; height: " + this.dragHeight + "px; width: 59px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: -6px; margin-top: -26px; box-shadow: 0px -1px 1px " + this.signalFontShadow + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 15px; margin-top: 58px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 2px; margin-top: 58px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      face.setAttribute("style", "height: " + this.dragHeight + "px; width: 100%; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: " + this.faceRepeat + "; margin-top: -425px; margin-left: 59px; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ";");
      thresholdDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px;");
      thresholdLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      compressorThresholdDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      thresholdSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 400px; margin: 140px 25px 0 -10px;");
      switch(this.skinName) {
        case('Dynamic Compressor: January A'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryA';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryA';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryA';
          attackSlider.className = 'dynamicCompressorSliderJanuaryA';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryA';
          break;
        case('Dynamic Compressor: January B'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryB';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryB';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryB';
          attackSlider.className = 'dynamicCompressorSliderJanuaryB';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryB';
          break;
        case('Dynamic Compressor: January C'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryC';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryC';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryC';
          attackSlider.className = 'dynamicCompressorSliderJanuaryC';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryC';
          break;
        case('Dynamic Compressor: February A'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryA';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryA';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryA';
          attackSlider.className = 'dynamicCompressorSliderFebruaryA';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryA';
          break;
        case('Dynamic Compressor: February B'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryB';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryB';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryB';
          attackSlider.className = 'dynamicCompressorSliderFebruaryB';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryB';
          break;
        case('Dynamic Compressor: February C'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryC';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryC';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryC';
          attackSlider.className = 'dynamicCompressorSliderFebruaryC';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryC';
          break;
        case('Dynamic Compressor: March A'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchA';
          kneeSlider.className = 'dynamicCompressorSliderMarchA';
          ratioSlider.className = 'dynamicCompressorSliderMarchA';
          attackSlider.className = 'dynamicCompressorSliderMarchA';
          releaseSlider.className = 'dynamicCompressorSliderMarchA';
          break;
        case('Dynamic Compressor: March B'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchB';
          kneeSlider.className = 'dynamicCompressorSliderMarchB';
          ratioSlider.className = 'dynamicCompressorSliderMarchB';
          attackSlider.className = 'dynamicCompressorSliderMarchB';
          releaseSlider.className = 'dynamicCompressorSliderMarchB';
          break;
        case('Dynamic Compressor: March C'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchC';
          kneeSlider.className = 'dynamicCompressorSliderMarchC';
          ratioSlider.className = 'dynamicCompressorSliderMarchC';
          attackSlider.className = 'dynamicCompressorSliderMarchC';
          releaseSlider.className = 'dynamicCompressorSliderMarchC';
          break;
        case('Dynamic Compressor: April A'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilA';
          kneeSlider.className = 'dynamicCompressorSliderAprilA';
          ratioSlider.className = 'dynamicCompressorSliderAprilA';
          attackSlider.className = 'dynamicCompressorSliderAprilA';
          releaseSlider.className = 'dynamicCompressorSliderAprilA';
          break;
        case('Dynamic Compressor: April B'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilB';
          kneeSlider.className = 'dynamicCompressorSliderAprilB';
          ratioSlider.className = 'dynamicCompressorSliderAprilB';
          attackSlider.className = 'dynamicCompressorSliderAprilB';
          releaseSlider.className = 'dynamicCompressorSliderAprilB';
          break;
        case('Dynamic Compressor: April C'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilC';
          kneeSlider.className = 'dynamicCompressorSliderAprilC';
          ratioSlider.className = 'dynamicCompressorSliderAprilC';
          attackSlider.className = 'dynamicCompressorSliderAprilC';
          releaseSlider.className = 'dynamicCompressorSliderAprilC';
          break;
        default:
          console.log('unsupported dynamic compressor skin');
      }
      thresholdModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      thresholdModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      kneeDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px;");
      kneeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      compressorKneeDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.kneeDisplayPath + "); background-size: " + this.kneeDisplaySize + "; box-shadow: -1px -1px 1px " + this.kneeDisplayBoxShadowColor + ", -2px -2px 1px " + this.kneeDisplayBoxShadowColor + ", -3px -3px 1px " + this.kneeDisplayBoxShadowColor + ", -4px -4px 1px " + this.kneeDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      kneeSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.kneeSliderPath + "); background-size: " + this.kneeSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.kneeSliderBoxShadowColor + ", 2px -2px 1px " + this.kneeSliderBoxShadowColor + ", 3px -3px 1px " + this.kneeSliderBoxShadowColor + ", 4px -4px 1px " + this.kneeSliderBoxShadowColor + "; height: 32px; width: 400px; margin: 140px 25px 0 -10px;");
      kneeModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      kneeModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      ratioDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px;");
      ratioLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      compressorRatioDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.ratioDisplayPath + "); background-size: " + this.ratioDisplaySize + "; box-shadow: -1px -1px 1px " + this.ratioDisplayBoxShadowColor + ", -2px -2px 1px " + this.ratioDisplayBoxShadowColor + ", -3px -3px 1px " + this.ratioDisplayBoxShadowColor + ", -4px -4px 1px " + this.ratioDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      ratioSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.ratioSliderPath + "); background-size: " + this.ratioSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.ratioSliderBoxShadowColor + ", 2px -2px 1px " + this.ratioSliderBoxShadowColor + ", 3px -3px 1px " + this.ratioSliderBoxShadowColor + ", 4px -4px 1px " + this.ratioSliderBoxShadowColor + "; height: 32px; width: 400px; margin: 140px 25px 0 -10px;");
      ratioModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      ratioModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      attackDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px;");
      attackLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      compressorAttackDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.attackDisplayPath + "); background-size: " + this.attackDisplaySize + "; box-shadow: -1px -1px 1px " + this.attackDisplayBoxShadowColor + ", -2px -2px 1px " + this.attackDisplayBoxShadowColor + ", -3px -3px 1px " + this.attackDisplayBoxShadowColor + ", -4px -4px 1px " + this.attackDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      attackSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.attackSliderPath + "); background-size: " + this.attackSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.attackSliderBoxShadowColor + ", 2px -2px 1px " + this.attackSliderBoxShadowColor + ", 3px -3px 1px " + this.attackSliderBoxShadowColor + ", 4px -4px 1px " + this.attackSliderBoxShadowColor + "; height: 32px; width: 400px; margin: 140px 25px 0 -10px;");
      attackModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      attackModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      releaseDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px;");
      releaseLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      compressorReleaseDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.releaseDisplayPath + "); background-size: " + this.releaseDisplaySize + "; box-shadow: -1px -1px 1px " + this.releaseDisplayBoxShadowColor + ", -2px -2px 1px " + this.releaseDisplayBoxShadowColor + ", -3px -3px 1px " + this.releaseDisplayBoxShadowColor + ", -4px -4px 1px " + this.releaseDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      releaseSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.releaseSliderPath + "); background-size: " + this.releaseSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.releaseSliderBoxShadowColor + ", 2px -2px 1px " + this.releaseSliderBoxShadowColor + ", 3px -3px 1px " + this.releaseSliderBoxShadowColor + ", 4px -4px 1px " + this.releaseSliderBoxShadowColor + "; height: 32px; width: 400px; margin: 140px 25px 0 -10px;");
      releaseModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      releaseModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");

      this.manageThrehold(compressorThresholdDisplay, thresholdSlider);

      this.manageKnee(compressorKneeDisplay, kneeSlider);

      this.manageRatio(compressorRatioDisplay, ratioSlider);

      this.manageAttack(compressorAttackDisplay, attackSlider);

      this.manageRelease(compressorReleaseDisplay, releaseSlider);

      function dragElement(element, obj) {

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (dynamicCompressorTop) {
          dynamicCompressorTop.onmousedown = dragMouseDown;
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

      thresholdModulatorInput.addEventListener('click', () => {
        alert(thresholdModulatorInput.id);
      });

      kneeModulatorInput.addEventListener('click', () => {
        alert(kneeModulatorInput.id);
      });

      ratioModulatorInput.addEventListener('click', () => {
        alert(ratioModulatorInput.id);
      });

      attackModulatorInput.addEventListener('click', () => {
        alert(attackModulatorInput.id);
      });

      releaseModulatorInput.addEventListener('click', () => {
        alert(releaseModulatorInput.id);
      })

      return(div);
    }

    this.renderRackHorizontal = (x, y) => {

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
      inputPort.id = 'input ' +    this.name + this.id;
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let thresholdDiv = document.createElement('div');
      div.appendChild(thresholdDiv);
      let thresholdLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdLabel);
      thresholdLabel.innerHTML = 'threshold(dB)';
      let thresholdDisplay = document.createElement('input');
      thresholdDiv.appendChild(thresholdDisplay);
      thresholdDisplay.type = 'number';
      thresholdDisplay.step = '0.01';
      thresholdDisplay.min = '-100.00';
      thresholdDisplay.max = '0.00';
      thresholdDisplay.value = this.threshold;
      let thresholdSlider = document.createElement('input');
      thresholdDiv.appendChild(thresholdSlider);
      thresholdSlider.type = 'range';
      thresholdSlider.step = '0.01';
      thresholdSlider.min = '-100.00';
      thresholdSlider.max = '0.00';
      thresholdSlider.value = this.threshold;
      let thresholdModulatorLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdModulatorLabel);
      thresholdModulatorLabel.innerHTML = 'modulation';
      let thresholdModulatorInput = document.createElement('h1');
      thresholdDiv.appendChild(thresholdModulatorInput);
      thresholdModulatorInput.innerHTML = '◦';
      thresholdModulatorInput.id = 'threshhold modulator input - ' + this.name + this.id;
      let kneeDiv = document.createElement('div');
      div.appendChild(kneeDiv);
      let kneeLabel = document.createElement('p');
      kneeDiv.appendChild(kneeLabel);
      kneeLabel.innerHTML = 'knee(dB)';
      let kneeDisplay = document.createElement('input');
      kneeDiv.appendChild(kneeDisplay);
      kneeDisplay.type = 'number';
      kneeDisplay.step = '0.01';
      kneeDisplay.max = '40.00';
      kneeDisplay.min = '0.00';
      kneeDisplay.value = this.knee;
      let kneeSlider = document.createElement('input');
      kneeDiv.appendChild(kneeSlider);
      kneeSlider.type = 'range';
      kneeSlider.step = '0.01';
      kneeSlider.max = '40.00';
      kneeSlider.min = '0.00';
      kneeSlider.value = this.knee;
      let kneeModulatorLabel = document.createElement('p');
      kneeDiv.appendChild(kneeModulatorLabel);
      kneeModulatorLabel.innerHTML = 'modulation';
      let kneeModulatorInput = document.createElement('h1');
      kneeDiv.appendChild(kneeModulatorInput);
      kneeModulatorInput.innerHTML = '◦';
      kneeModulatorInput.id = 'knee modulator input - ' + this.name + this.id;
      let ratioDiv = document.createElement('div');
      div.appendChild(ratioDiv);
      let ratioLabel = document.createElement('p');
      ratioDiv.appendChild(ratioLabel);
      ratioLabel.innerHTML = 'ratio';
      let ratioDisplay = document.createElement('input');
      ratioDiv.appendChild(ratioDisplay);
      ratioDisplay.type = 'number';
      ratioDisplay.step = '0.01';
      ratioDisplay.max = '20.00';
      ratioDisplay.min = '1.00';
      ratioDisplay.value = this.ratio;
      let ratioSlider = document.createElement('input');
      ratioDiv.appendChild(ratioSlider);
      ratioSlider.type = 'range';
      ratioSlider.step = '0.01';
      ratioSlider.max = '20.00';
      ratioSlider.min = '1.00';
      ratioSlider.value = this.ratio;
      let ratioModulatorLabel = document.createElement('p');
      ratioDiv.appendChild(ratioModulatorLabel);
      ratioModulatorLabel.innerHTML = 'modulation';
      let ratioModulatorInput = document.createElement('h1');
      ratioDiv.appendChild(ratioModulatorInput);
      ratioModulatorInput.innerHTML = '◦';
      ratioModulatorInput.id = 'ratio modulator input - ' + this.name + this.id;
      let attackDiv = document.createElement('div');
      div.appendChild(attackDiv);
      let attackLabel = document.createElement('p');
      attackDiv.appendChild(attackLabel);
      attackLabel.innerHTML = 'attack(sec)';
      let attackDisplay = document.createElement('input');
      attackDiv.appendChild(attackDisplay);
      attackDisplay.type = 'number';
      attackDisplay.step = '0.001';
      attackDisplay.max = '1.000';
      attackDisplay.min = '0.000';
      attackDisplay.value = this.attack;
      let attackSlider = document.createElement('input');
      attackDiv.appendChild(attackSlider);
      attackSlider.type = 'range';
      attackSlider.step = '0.001';
      attackSlider.max = '1.000';
      attackSlider.min = '0.000';
      attackSlider.value = this.attack;
      let attackModulatorLabel = document.createElement('p');
      attackDiv.appendChild(attackModulatorLabel);
      attackModulatorLabel.innerHTML = 'modulation';
      let attackModulatorInput = document.createElement('h1');
      attackDiv.appendChild(attackModulatorInput);
      attackModulatorInput.innerHTML = '◦';
      attackModulatorInput.id = 'attack modulator input - ' + this.name + this.id;
      let releaseDiv = document.createElement('div');
      div.appendChild(releaseDiv);
      let releaseLabel = document.createElement('p');
      releaseDiv.appendChild(releaseLabel);
      releaseLabel.innerHTML = 'release(sec)';
      let releaseDisplay = document.createElement('input');
      releaseDiv.appendChild(releaseDisplay);
      releaseDisplay.type = 'number';
      releaseDisplay.step = '0.001';
      releaseDisplay.max = '1.000';
      releaseDisplay.min = '0.000';
      releaseDisplay.value = this.release;
      let releaseSlider = document.createElement('input');
      releaseDiv.appendChild(releaseSlider);
      releaseSlider.type = 'range';
      releaseSlider.step = '0.001';
      releaseSlider.max = '1.000';
      releaseSlider.min = '0.000';
      releaseSlider.value = this.release;
      let releaseModulatorLabel = document.createElement('p');
      releaseDiv.appendChild(releaseModulatorLabel);
      releaseModulatorLabel.innerHTML = 'modulation';
      let releaseModulatorInput = document.createElement('h1');
      releaseDiv.appendChild(releaseModulatorInput);
      releaseModulatorInput.innerHTML = '◦';
      releaseModulatorInput.id = 'release modulator input - ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 5px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 40px; margin-top: 1px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 50px; margin-top: -15px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 40px; margin-top: 1px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 50px; margin-top: -15px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      thresholdDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      thresholdLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      thresholdDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      thresholdSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 220px; margin: 105px 0 0 10px;");
      switch(this.skinName) {
        case('Dynamic Compressor: January A'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryA';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryA';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryA';
          attackSlider.className = 'dynamicCompressorSliderJanuaryA';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryA';
          break;
        case('Dynamic Compressor: January B'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryB';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryB';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryB';
          attackSlider.className = 'dynamicCompressorSliderJanuaryB';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryB';
          break;
        case('Dynamic Compressor: January C'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryC';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryC';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryC';
          attackSlider.className = 'dynamicCompressorSliderJanuaryC';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryC';
          break;
        case('Dynamic Compressor: February A'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryA';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryA';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryA';
          attackSlider.className = 'dynamicCompressorSliderFebruaryA';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryA';
          break;
        case('Dynamic Compressor: February B'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryB';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryB';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryB';
          attackSlider.className = 'dynamicCompressorSliderFebruaryB';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryB';
          break;
        case('Dynamic Compressor: February C'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryC';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryC';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryC';
          attackSlider.className = 'dynamicCompressorSliderFebruaryC';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryC';
          break;
        case('Dynamic Compressor: March A'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchA';
          kneeSlider.className = 'dynamicCompressorSliderMarchA';
          ratioSlider.className = 'dynamicCompressorSliderMarchA';
          attackSlider.className = 'dynamicCompressorSliderMarchA';
          releaseSlider.className = 'dynamicCompressorSliderMarchA';
          break;
        case('Dynamic Compressor: March B'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchB';
          kneeSlider.className = 'dynamicCompressorSliderMarchB';
          ratioSlider.className = 'dynamicCompressorSliderMarchB';
          attackSlider.className = 'dynamicCompressorSliderMarchB';
          releaseSlider.className = 'dynamicCompressorSliderMarchB';
          break;
        case('Dynamic Compressor: March C'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchC';
          kneeSlider.className = 'dynamicCompressorSliderMarchC';
          ratioSlider.className = 'dynamicCompressorSliderMarchC';
          attackSlider.className = 'dynamicCompressorSliderMarchC';
          releaseSlider.className = 'dynamicCompressorSliderMarchC';
          break;
        case('Dynamic Compressor: April A'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilA';
          kneeSlider.className = 'dynamicCompressorSliderAprilA';
          ratioSlider.className = 'dynamicCompressorSliderAprilA';
          attackSlider.className = 'dynamicCompressorSliderAprilA';
          releaseSlider.className = 'dynamicCompressorSliderAprilA';
          break;
        case('Dynamic Compressor: April B'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilB';
          kneeSlider.className = 'dynamicCompressorSliderAprilB';
          ratioSlider.className = 'dynamicCompressorSliderAprilB';
          attackSlider.className = 'dynamicCompressorSliderAprilB';
          releaseSlider.className = 'dynamicCompressorSliderAprilB';
          break;
        case('Dynamic Compressor: April C'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilC';
          kneeSlider.className = 'dynamicCompressorSliderAprilC';
          ratioSlider.className = 'dynamicCompressorSliderAprilC';
          attackSlider.className = 'dynamicCompressorSliderAprilC';
          releaseSlider.className = 'dynamicCompressorSliderAprilC';
          break;
        default:
          console.log('unsupported dynamic compressor skin');
      }
      thresholdModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 0 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      thresholdModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 0 30px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      kneeDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      kneeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      kneeDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.ratioDisplaySize + "; box-shadow: -1px -1px 1px " + this.ratioDisplayBoxShadowColor + ", -2px -2px 1px " + this.ratioDisplayBoxShadowColor + ", -3px -3px 1px " + this.ratioDisplayBoxShadowColor + ", -4px -4px 1px " + this.ratioDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      kneeSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 220px; margin: 105px 0 0 10px;");
      kneeModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 0 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      kneeModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 0 30px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      ratioDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      ratioLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      ratioDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.ratioDisplaySize + "; box-shadow: -1px -1px 1px " + this.ratioDisplayBoxShadowColor + ", -2px -2px 1px " + this.ratioDisplayBoxShadowColor + ", -3px -3px 1px " + this.ratioDisplayBoxShadowColor + ", -4px -4px 1px " + this.ratioDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      ratioSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 220px; margin: 105px 0 0 10px;");
      ratioModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 0 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      ratioModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 0 30px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      attackDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      attackLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      attackDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.ratioDisplaySize + "; box-shadow: -1px -1px 1px " + this.ratioDisplayBoxShadowColor + ", -2px -2px 1px " + this.ratioDisplayBoxShadowColor + ", -3px -3px 1px " + this.ratioDisplayBoxShadowColor + ", -4px -4px 1px " + this.ratioDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      attackSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 220px; margin: 105px 0 0 10px;");
      attackModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 0 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      attackModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 0 30px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      releaseDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      releaseLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      releaseDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.ratioDisplaySize + "; box-shadow: -1px -1px 1px " + this.ratioDisplayBoxShadowColor + ", -2px -2px 1px " + this.ratioDisplayBoxShadowColor + ", -3px -3px 1px " + this.ratioDisplayBoxShadowColor + ", -4px -4px 1px " + this.ratioDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      releaseSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 220px; margin: 105px 0 0 10px;");
      releaseModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 0 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      releaseModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 0 30px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");

      this.manageThrehold(thresholdDisplay, thresholdSlider);

      this.manageKnee(kneeDisplay, kneeSlider);

      this.manageRatio(ratioDisplay, ratioSlider);

      this.manageAttack(attackDisplay, attackSlider);

      this.manageRelease(releaseDisplay, releaseSlider);

      thresholdModulatorInput.addEventListener('click', () => {
        alert(thresholdModulatorInput.id);
      });

      kneeModulatorInput.addEventListener('click', () => {
        alert(kneeModulatorInput.id);
      });

      ratioModulatorInput.addEventListener('click', () => {
        alert(ratioModulatorInput.id);
      });

      attackModulatorInput.addEventListener('click', () => {
        alert(attackModulatorInput.id);
      });

      releaseModulatorInput.addEventListener('click', () => {
        alert(releaseModulatorInput.id);
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
      let thresholdDiv = document.createElement('div');
      div.appendChild(thresholdDiv);
      let thresholdDisplay = document.createElement('input');
      thresholdDiv.appendChild(thresholdDisplay);
      thresholdDisplay.type = 'number';
      thresholdDisplay.step = '0.01';
      thresholdDisplay.max = '0.00';
      thresholdDisplay.min = '-100.00';
      thresholdDisplay.value = this.threshold;
      let thresholdLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdLabel);
      thresholdLabel.innerHTML = 'threshold(dB)';
      let thresholdSlider = document.createElement('input');
      thresholdDiv.appendChild(thresholdSlider);
      thresholdSlider.type = 'range';
      thresholdSlider.step = '0.01';
      thresholdSlider.max = '0.00';
      thresholdSlider.min = '-100.00';
      thresholdSlider.value = this.threshold;
      let thresholdModulatorLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdModulatorLabel);
      thresholdModulatorLabel.innerHTML = 'modulation:';
      let thresholdModulatorInput = document.createElement('h1');
      thresholdDiv.appendChild(thresholdModulatorInput);
      thresholdModulatorInput.innerHTML = '◦';
      thresholdModulatorInput.id = 'Threshold Modulation Input ' + this.name + this.id;
      let kneeDiv = document.createElement('div');
      div.appendChild(kneeDiv);
      let kneeDisplay = document.createElement('input');
      kneeDiv.appendChild(kneeDisplay);
      kneeDisplay.type = 'number';
      kneeDisplay.step = '0.01';
      kneeDisplay.max = '40.00';
      kneeDisplay.min = '0.00';
      kneeDisplay.value = this.knee;
      let kneeLabel = document.createElement('p');
      kneeDiv.appendChild(kneeLabel);
      kneeLabel.innerHTML = 'knee(dB)';
      let kneeSlider = document.createElement('input');
      kneeDiv.appendChild(kneeSlider);
      kneeSlider.type = 'range';
      kneeSlider.step = '0.01';
      kneeSlider.max = '40.00';
      kneeSlider.min = '0.00';
      kneeSlider.value = this.knee;
      let kneeModulatorLabel = document.createElement('p');
      kneeDiv.appendChild(kneeModulatorLabel);
      kneeModulatorLabel.innerHTML = 'modulation:';
      let kneeModulatorInput = document.createElement('h1');
      kneeDiv.appendChild(kneeModulatorInput);
      kneeModulatorInput.innerHTML = '◦';
      kneeModulatorInput.id = 'Knee Modulation Input ' + this.name + this.id;
      let ratioDiv = document.createElement('div');
      div.appendChild(ratioDiv);
      let ratioDisplay = document.createElement('input');
      ratioDiv.appendChild(ratioDisplay);
      ratioDisplay.type = 'number';
      ratioDisplay.step = '0.01';
      ratioDisplay.max = '20.00';
      ratioDisplay.min = '1.00';
      ratioDisplay.value = this.ratio;
      let ratioLabel = document.createElement('p');
      ratioDiv.appendChild(ratioLabel);
      ratioLabel.innerHTML = 'ratio';
      let ratioSlider = document.createElement('input');
      ratioDiv.appendChild(ratioSlider);
      ratioSlider.type = 'range';
      ratioSlider.step = '0.01';
      ratioSlider.max = '20.00';
      ratioSlider.mind = '1.00';
      ratioSlider.value = this.ratio;
      let ratioModulatorLabel = document.createElement('p');
      ratioDiv.appendChild(ratioModulatorLabel);
      ratioModulatorLabel.innerHTML = 'modulation:';
      let ratioModulatorInput = document.createElement('h1');
      ratioDiv.appendChild(ratioModulatorInput);
      ratioModulatorInput.innerHTML = '◦';
      ratioModulatorInput.id = 'Ratio Modulation Input ' + this.name + this.id;
      let attackDiv = document.createElement('div');
      div.appendChild(attackDiv);
      let attackDisplay = document.createElement('input');
      attackDiv.appendChild(attackDisplay);
      attackDisplay.type = 'number';
      attackDisplay.step = '0.001';
      attackDisplay.max = '1.000';
      attackDisplay.min = '0.000';
      attackDisplay.value = this.attack;
      let attackLabel = document.createElement('p');
      attackDiv.appendChild(attackLabel);
      attackLabel.innerHTML = 'attack(sec)';
      let attackSlider = document.createElement('input');
      attackDiv.appendChild(attackSlider);
      attackSlider.type = 'range';
      attackSlider.step = '0.001';
      attackSlider.max = '1.000';
      attackSlider.min = '0.000';
      attackSlider.value = this.attack;
      let attackModulatorLabel = document.createElement('p');
      attackDiv.appendChild(attackModulatorLabel);
      attackModulatorLabel.innerHTML = 'modulation:';
      let attackModulatorInput = document.createElement('h1');
      attackDiv.appendChild(attackModulatorInput);
      attackModulatorInput.innerHTML = '◦';
      attackModulatorInput.id = 'Attack Modulation Input ' + this.name + this.id;
      let releaseDiv = document.createElement('div');
      div.appendChild(releaseDiv);
      let releaseDisplay = document.createElement('input');
      releaseDiv.appendChild(releaseDisplay);
      releaseDisplay.type = 'number';
      releaseDisplay.step = '0.001';
      releaseDisplay.max = '1.000';
      releaseDisplay.min = '0.000';
      releaseDisplay.value = this.release;
      let releaseLabel = document.createElement('p');
      releaseDiv.appendChild(releaseLabel);
      releaseLabel.innerHTML = 'release(sec)';
      let releaseSlider = document.createElement('input');
      releaseDiv.appendChild(releaseSlider);
      releaseSlider.type = 'range';
      releaseSlider.step = '0.001';
      releaseSlider.max = '1.000';
      releaseSlider.min = '0.000';
      releaseSlider.value = this.release;
      let releaseModulatorLabel = document.createElement('p');
      releaseDiv.appendChild(releaseModulatorLabel);
      releaseModulatorLabel.innerHTML = 'modulation:';
      let releaseModulatorInput = document.createElement('h1');
      releaseDiv.appendChild(releaseModulatorInput);
      releaseModulatorInput.innerHTML = '◦';
      releaseModulatorInput.id = 'Release Modulator Input ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + "; position: relative; top: -10px; left: 5px;");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + "; margin-left: 8px; margin-top: -12px;");
      inputPort.setAttribute("style", "z-index: 6; cursor: pointer; font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; padding-left: 10px; position: relative; left: 80px; top: -42px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + "; margin-left: 158px; margin-top: -130px; position: relative;");
      outputPort.setAttribute("style", "z-index: 6; cursor: pointer; font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; padding-left: 10px; position: relative; left: 240px; top: -42px;");
      thresholdDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      thresholdDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; top: 5px; left: 10px;");
      thresholdLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -45px; left: 165px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      thresholdSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", -2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", -3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", -4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 24px; width: 240px; position: relative; top: -45px; left: 10px;");
      switch(this.skinName) {
        case('Dynamic Compressor: January A'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderJanuaryA';
          kneeSlider.className = 'dynamicCompressorVerticalSliderJanuaryA';
          ratioSlider.className = 'dynamicCompressorVerticalSliderJanuaryA';
          attackSlider.className = 'dynamicCompressorVerticalSliderJanuaryA';
          releaseSlider.className = 'dynamicCompressorVerticalSliderJanuaryA';
          break;
        case('Dynamic Compressor: January B'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderJanuaryB';
          kneeSlider.className = 'dynamicCompressorVerticalSliderJanuaryB';
          ratioSlider.className = 'dynamicCompressorVerticalSliderJanuaryB';
          attackSlider.className = 'dynamicCompressorVerticalSliderJanuaryB';
          releaseSlider.className = 'dynamicCompressorVerticalSliderJanuaryB';
          break;
        case('Dynamic Compressor: January C'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderJanuaryC';
          kneeSlider.className = 'dynamicCompressorVerticalSliderJanuaryC';
          ratioSlider.className = 'dynamicCompressorVerticalSliderJanuaryC';
          attackSlider.className = 'dynamicCompressorVerticalSliderJanuaryC';
          releaseSlider.className = 'dynamicCompressorVerticalSliderJanuaryC';
          break;
        case('Dynamic Compressor: February A'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderFebruaryA';
          kneeSlider.className = 'dynamicCompressorVerticalSliderFebruaryA';
          ratioSlider.className = 'dynamicCompressorVerticalSliderFebruaryA';
          attackSlider.className = 'dynamicCompressorVerticalSliderFebruaryA';
          releaseSlider.className = 'dynamicCompressorVerticalSliderFebruaryA';
          break;
        case('Dynamic Compressor: February B'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderFebruaryB';
          kneeSlider.className = 'dynamicCompressorVerticalSliderFebruaryB';
          ratioSlider.className = 'dynamicCompressorVerticalSliderFebruaryB';
          attackSlider.className = 'dynamicCompressorVerticalSliderFebruaryB';
          // releaseSlider.className = 'dynamicCompressorSliderFebruaryB';
          break;
        case('Dynamic Compressor: February C'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderFebruaryC';
          kneeSlider.className = 'dynamicCompressorVerticalSliderFebruaryC';
          ratioSlider.className = 'dynamicCompressorVerticalSliderFebruaryC';
          attackSlider.className = 'dynamicCompressorVerticalSliderFebruaryC';
          releaseSlider.className = 'dynamicCompressorVerticalSliderFebruaryC';
          break;
        case('Dynamic Compressor: March A'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderMarchA';
          kneeSlider.className = 'dynamicCompressorVerticalSliderMarchA';
          ratioSlider.className = 'dynamicCompressorVerticalSliderMarchA';
          attackSlider.className = 'dynamicCompressorVerticalSliderMarchA';
          releaseSlider.className = 'dynamicCompressorVerticalSliderMarchA';
          break;
        case('Dynamic Compressor: March B'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderMarchB';
          kneeSlider.className = 'dynamicCompressorVerticalSliderMarchB';
          ratioSlider.className = 'dynamicCompressorVerticalSliderMarchB';
          attackSlider.className = 'dynamicCompressorVerticalSliderMarchB';
          releaseSlider.className = 'dynamicCompressorVerticalSliderMarchB';
          break;
        case('Dynamic Compressor: March C'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderMarchC';
          kneeSlider.className = 'dynamicCompressorVerticalSliderMarchC';
          ratioSlider.className = 'dynamicCompressorVerticalSliderMarchC';
          attackSlider.className = 'dynamicCompressorVerticalSliderMarchC';
          releaseSlider.className = 'dynamicCompressorVerticalSliderMarchC';
          break;
        case('Dynamic Compressor: April A'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderAprilA';
          kneeSlider.className = 'dynamicCompressorVerticalSliderAprilA';
          ratioSlider.className = 'dynamicCompressorVerticalSliderAprilA';
          attackSlider.className = 'dynamicCompressorVerticalSliderAprilA';
          releaseSlider.className = 'dynamicCompressorVerticalSliderAprilA';
          break;
        case('Dynamic Compressor: April B'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderAprilB';
          kneeSlider.className = 'dynamicCompressorVerticalSliderAprilB';
          ratioSlider.className = 'dynamicCompressorVerticalSliderAprilB';
          attackSlider.className = 'dynamicCompressorVerticalSliderAprilB';
          releaseSlider.className = 'dynamicCompressorVerticalSliderAprilB';
          break;
        case('Dynamic Compressor: April C'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderAprilC';
          kneeSlider.className = 'dynamicCompressorVerticalSliderAprilC';
          ratioSlider.className = 'dynamicCompressorVerticalSliderAprilC';
          attackSlider.className = 'dynamicCompressorVerticalSliderAprilC';
          releaseSlider.className = 'dynamicCompressorVerticalSliderAprilC';
          break;
        default:
          console.log('unsupported dynamic compressor skin');
      }
      thresholdModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -55px; left: 155px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      thresholdModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; top: -140px; left: 262px;");
      kneeDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      kneeDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; top: 5px; left: 10px;");
      kneeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -45px; left: 165px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      kneeSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", -2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", -3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", -4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 24px; width: 240px; position: relative; top: -45px; left: 10px;");
      kneeModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -55px; left: 155px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      kneeModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; top: -140px; left: 262px;");
      ratioDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      ratioDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; top: 5px; left: 10px;");
      ratioLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -45px; left: 165px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      ratioSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", -2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", -3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", -4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 24px; width: 240px; position: relative; top: -45px; left: 10px;");
      ratioModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -55px; left: 155px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      ratioModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; top: -140px; left: 262px;");
      attackDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      attackDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; top: 5px; left: 10px;");
      attackLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -45px; left: 165px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      attackSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", -2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", -3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", -4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 24px; width: 240px; position: relative; top: -45px; left: 10px;");
      attackModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -55px; left: 155px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      attackModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; top: -140px; left: 262px;");
      releaseDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      releaseDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; top: 5px; left: 10px;");
      releaseLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -45px; left: 165px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      releaseSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", -2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", -3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", -4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 24px; width: 240px; position: relative; top: -45px; left: 10px;");
      releaseModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -55px; left: 155px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      releaseModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; top: -140px; left: 262px;");

      this.manageThrehold(thresholdDisplay, thresholdSlider);

      this.manageKnee(kneeDisplay, kneeSlider);

      this.manageRatio(ratioDisplay, ratioSlider);

      this.manageAttack(attackDisplay, attackSlider);

      this.manageRelease(releaseDisplay, releaseSlider);

      inputPort.addEventListener('click', () => {
        alert(inputPort.id);
      });

      outputPort.addEventListener('click', () => {
        alert(outputPort.id);
      });

      thresholdModulatorInput.addEventListener('click', () => {
        alert(thresholdModulatorInput.id);
      });

      kneeModulatorInput.addEventListener('click', () => {
        alert(kneeModulatorInput.id);
      });

      ratioModulatorInput.addEventListener('click', () => {
        alert(ratioModulatorInput.id);
      });

      attackModulatorInput.addEventListener('click', () => {
        alert(attackModulatorInput.id);
      });

      releaseModulatorInput.addEventListener('click', () => {
        alert(releaseModulatorInput.id);
      });

      return(div);
    }

  }

  return(dynamicCompressorNode);
})();
