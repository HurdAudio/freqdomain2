'use strict';

var MasterVolume = (function(settings, skin, audioContext, boundingDiv) {

  let master = function (settings, skin, audioContext, boundingDiv) {
    this.id = settings.id;
    this.name = settings.name;
    this.positionX = settings.positionX;
    this.positionY = settings.positionY;
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
    this.signalBoxShadowColor = skin.signal_box_shadow_color;
    this.signalFontColor = skin.signal_font_color;
    this.signalFontShadow = skin.signal_font_shadow;
    this.displayPath = skin.display_path;
    this.inputSize = skin.input_size;
    this.inputRepeat = skin.input_repeat;
    this.inputBoxShadowColor = skin.input_box_shadow_color;
    this.inputFontColor = skin.input_font_color;
    this.inputFontShadow = skin.input_font_shadow;
    this.displaySpanColor = skin.display_span_color;
    this.gainDisplaySize = skin.gain_display_size;
    this.gainDisplayRepeat = skin.gain_display_repeat;
    this.gainDisplayBoxShadowColor = skin.gain_display_box_shadow_color;
    this.gainDisplayFontColor = skin.gain_display_font_color;
    this.masterVolumeSize = skin.master_volume_size;
    this.masterVolumeRepeat = skin.master_volume_repeat;
    this.masterVolumeBoxShadow = skin.master_volume_box_shadow;
    this.sliderBackgroundImage = skin.slider_background_image;

    this.dragWidth = 390;
    this.dragHeight = 400;
    this.horizontalWidth = 900;
    this.horizontalHeight = 160;
    this.verticalWidth = 160;
    this.verticalHeight = 750;

    this.dragScale = 1;

    this.setDragScale = (scale) => {
      this.dragScale = scale;
    }

    this.userVolumeInput = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.gainValue = display.value;
        if (this.mute) {
          this.masterGain.gain.value = 0;
        } else {
          this.masterGain.gain.value = (this.gainValue/100);
        }
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.gainValue = slider.value;
        if (this.mute) {
          this.masterGain.gain.value = 0;
        } else {
          this.masterGain.gain.value = (this.gainValue/100);
        }
      });
    }

    this.userMute = (masterMute, speakerIcon, masterGainDisplay, displaySpan, face, muteNote, masterGainTop, signalPanel, amountRange) => {

      masterMute.addEventListener('click', () => {
        this.mute = !this.mute;
        if (this.mute) {
          this.masterGain.gain.value = 0;
          visualMuting(this);
        } else {
          masterMute.setAttribute("style", "width: 40%; height: auto; background: transparent; cursor: pointer; position:relative; position: relative; bottom: 90px; left: 45px;");
          this.masterGain.gain.value = (this.gainValue/100);
          amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.masterVolumeSize + "; background-repeat: " + this.masterVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.masterVolumeBoxShadow + ", 2px -2px 1px " + this.masterVolumeBoxShadow + ", 3px -3px 1px " + this.masterVolumeBoxShadow + ", 4px -4px 1px " + this.masterVolumeBoxShadow + ";");
        }
      });

      function visualMuting(obj) {
        if (obj.mute) {
          masterMute.setAttribute("style", "width: 40%; height: auto; background: transparent; cursor: pointer; position:relative; position: relative; bottom: 140px; left: 45px;");
          amountRange.setAttribute("style", "background: url(" + obj.displayPath + "); background-size: " + obj.masterVolumeSize + "; background-repeat: " + obj.masterVolumeRepeat + "; box-shadow: 1px -1px 1px " + obj.masterVolumeBoxShadow + ", 2px -2px 1px " + obj.masterVolumeBoxShadow + ", 3px -3px 1px " + obj.masterVolumeBoxShadow + ", 4px -4px 1px " + obj.masterVolumeBoxShadow + "; transform: translateX(50px) translateY(-75px) rotateZ(-90deg);");
          displaySpan.innerHTML = 'mute';
          speakerIcon.setAttribute("style", "opacity: 0.3; width: 70%; margin-left: 0; margin-top: 0;");
          masterGainDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 96px; margin-left: 25px; margin-top: 25px; background: #ff0000; box-shadow: -1px -1px 1px #7DF9FF, -2px -2px 1px #7DF9FF, -3px -3px 1px #7DF9FF, -4px -4px 1px #7DF9FF; padding-left: 5vmin; color: transparent;");
          face.setAttribute("style", "height: 350px; width: 100%; background: url(" + obj.facePath + "); background-size: " + obj.faceSize + "; background-repeat: " + obj.faceRepeat + "; margin-top: -326px; margin-left: 52px; box-shadow: -1px -1px 1px " + obj.faceBoxShadowColor + ", -2px -2px 1px " + obj.faceBoxShadowColor + ", -3px -3px 1px " + obj.faceBoxShadowColor + ";");
          muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 26px; margin-bottom: 0; text-shadow: -1px -1px 1px #ff0000, -2px -2px 1px #ff0000;");
          masterGainTop.setAttribute("style", "width: 100%; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; font-family: 'Righteous', cursive; height: 50px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + obj.topRepeat + "; filter: sepia(3);");
          signalPanel.setAttribute("style", "background: url(" + obj.signalPath + "); background-size: " + obj.signalSize + "; border: solid 1px transparent; height: 350px; width: 49px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: 0; margin-top: -23px; box-shadow: 0px -1px 1px " + obj.signalFontShadow + "; filter: sepia(1);");
          setTimeout(() => {
            if (obj.mute) {
              masterMute.setAttribute("style", "width: 40%; height: auto; background: transparent; cursor: pointer; position:relative; position: relative; bottom: 140px; left: 45px;");
              amountRange.setAttribute("style", "background: url(" + obj.displayPath + "); background-size: " + obj.masterVolumeSize + "; background-repeat: " + obj.masterVolumeRepeat + "; box-shadow: 1px -1px 1px " + obj.masterVolumeBoxShadow + ", 2px -2px 1px " + obj.masterVolumeBoxShadow + ", 3px -3px 1px " + obj.masterVolumeBoxShadow + ", 4px -4px 1px " + obj.masterVolumeBoxShadow + "; transform: translateX(50px) translateY(-75px) rotateZ(-90deg);");
              masterGainDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 96px; margin-left: 25px; margin-top: 25px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 5vmin; color: transparent;");
              face.setAttribute("style", "height: 350px; width: 100%; background: url(" + obj.facePath + "); background-size: " + obj.faceSize + "; background-repeat: " + obj.faceRepeat + "; margin-top: -326px; margin-left: 52px; box-shadow: -1px -1px 1px #ff0000, -2px -2px 1px #ff0000, -3px -3px 1px #ff0000;");
              muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 26px; margin-bottom: 0; text-shadow: -1px -1px 1px " + obj.faceFontShadow + ", -2px -2px 1px " + obj.faceFontShadow + ";");
              setTimeout(() => {
                if (obj.mute) {
                  masterMute.setAttribute("style", "width: 40%; height: auto; background: transparent; cursor: pointer; position:relative; position: relative; bottom: 140px; left: 45px;");
                  amountRange.setAttribute("style", "background: url(" + obj.displayPath + "); background-size: " + obj.masterVolumeSize + "; background-repeat: " + obj.masterVolumeRepeat + "; box-shadow: 1px -1px 1px " + obj.masterVolumeBoxShadow + ", 2px -2px 1px " + obj.masterVolumeBoxShadow + ", 3px -3px 1px " + obj.masterVolumeBoxShadow + ", 4px -4px 1px " + obj.masterVolumeBoxShadow + "; transform: translateX(50px) translateY(-75px) rotateZ(-90deg);");
                  visualMuting(obj);
                } else {
                  masterMute.setAttribute("style", "width: 40%; height: auto; background: transparent; cursor: pointer; position:relative; position: relative; bottom: 90px; left: 45px;");
                  amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.masterVolumeSize + "; background-repeat: " + this.masterVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.masterVolumeBoxShadow + ", 2px -2px 1px " + this.masterVolumeBoxShadow + ", 3px -3px 1px " + this.masterVolumeBoxShadow + ", 4px -4px 1px " + this.masterVolumeBoxShadow + ";");
                  displaySpan.innerHTML = '';
                  speakerIcon.setAttribute("style", "opacity: 1; width: 70%; margin-left: 0; margin-top: 0;");
                  masterGainDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 96px; margin-left: 25px; margin-top: 25px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 5vmin;");
                  face.setAttribute("style", "height: 350px; width: 100%; background: url(" + obj.facePath + "); background-size: " + obj.faceSize + "; background-repeat: " + obj.faceRepeat + "; margin-top: -326px; margin-left: 52px; box-shadow: -1px -1px 1px " + obj.faceBoxShadowColor + ", -2px -2px 1px " + obj.faceBoxShadowColor + ", -3px -3px 1px " + obj.faceBoxShadowColor + ";");
                  muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 26px; margin-bottom: 0; text-shadow: -1px -1px 1px " + obj.faceFontShadow + ", -2px -2px 1px " + obj.faceFontShadow + ";");
                  masterGainTop.setAttribute("style", "width: 100%; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; font-family: 'Righteous', cursive; height: 50px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + obj.topRepeat + "; filter: sepia(0);");
                  signalPanel.setAttribute("style", "background: url(" + obj.signalPath + "); background-size: " + obj.signalSize + "; border: solid 1px transparent; height: 350px; width: 49px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: 0; margin-top: -23px; box-shadow: 0px -1px 1px " + obj.signalFontShadow + "; filter: sepia(0);");
                }
              }, 500);
            } else {
              masterMute.setAttribute("style", "width: 40%; height: auto; background: transparent; cursor: pointer; position:relative; position: relative; bottom: 90px; left: 45px;");
              displaySpan.innerHTML = '';
              speakerIcon.setAttribute("style", "opacity: 1; width: 70%; margin-left: 0; margin-top: 0;");
              masterGainDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 96px; margin-left: 25px; margin-top: 25px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 5vmin;");
              face.setAttribute("style", "height: 350px; width: 100%; background: url(" + obj.facePath + "); background-size: " + obj.faceSize + "; background-repeat: " + obj.faceRepeat + "; margin-top: -326px; margin-left: 52px; box-shadow: -1px -1px 1px " + obj.faceBoxShadowColor + ", -2px -2px 1px " + obj.faceBoxShadowColor + ", -3px -3px 1px " + obj.faceBoxShadowColor + ";");
              muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 26px; margin-bottom: 0; text-shadow: -1px -1px 1px " + obj.faceFontShadow + ", -2px -2px 1px " + obj.faceFontShadow + ";");
              masterGainTop.setAttribute("style", "width: 100%; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; font-family: 'Righteous', cursive; height: 50px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + obj.topRepeat + "; filter: sepia(0);");
              signalPanel.setAttribute("style", "background: url(" + obj.signalPath + "); background-size: " + obj.signalSize + "; border: solid 1px transparent; height: 350px; width: 49px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: 0; margin-top: -23px; box-shadow: 0px -1px 1px " + obj.signalFontShadow + "; filter: sepia(0);");
              amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.masterVolumeSize + "; background-repeat: " + this.masterVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.masterVolumeBoxShadow + ", 2px -2px 1px " + this.masterVolumeBoxShadow + ", 3px -3px 1px " + this.masterVolumeBoxShadow + ", 4px -4px 1px " + this.masterVolumeBoxShadow + ";");
            }
          }, 500);
        } else {
          masterMute.setAttribute("style", "width: 40%; height: auto; background: transparent; cursor: pointer; position:relative; position: relative; bottom: 90px; left: 45px;");
          displaySpan.innerHTML = '';
          speakerIcon.setAttribute("style", "opacity: 1; width: 70%; margin-left: 0; margin-top: 0;");
          amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.masterVolumeSize + "; background-repeat: " + this.masterVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.masterVolumeBoxShadow + ", 2px -2px 1px " + this.masterVolumeBoxShadow + ", 3px -3px 1px " + this.masterVolumeBoxShadow + ", 4px -4px 1px " + this.masterVolumeBoxShadow + ";");
          masterGainDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 96px; margin-left: 25px; margin-top: 25px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 5vmin;");
          face.setAttribute("style", "height: 350px; width: 100%; background: url(" + obj.facePath + "); background-size: " + obj.faceSize + "; background-repeat: " + obj.faceRepeat + "; margin-top: -326px; margin-left: 52px; box-shadow: -1px -1px 1px " + obj.faceBoxShadowColor + ", -2px -2px 1px " + obj.faceBoxShadowColor + ", -3px -3px 1px " + obj.faceBoxShadowColor + ";");
          muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 26px; margin-bottom: 0; text-shadow: -1px -1px 1px " + obj.faceFontShadow + ", -2px -2px 1px " + obj.faceFontShadow + ";");
          masterGainTop.setAttribute("style", "width: 100%; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; font-family: 'Righteous', cursive; height: 50px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + obj.topRepeat + "; filter: sepia(0);");
          signalPanel.setAttribute("style", "background: url(" + obj.signalPath + "); background-size: " + obj.signalSize + "; border: solid 1px transparent; height: 350px; width: 49px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: 0; margin-top: -23px; box-shadow: 0px -1px 1px " + obj.signalFontShadow + "; filter: sepia(0);");
        }
      }
    }

    this.userMuteRack = (masterMute, displaySpan, masterGainDisplay, speakerIcon, nameAndInputDiv) => {

      masterMute.addEventListener('click', () => {
        this.mute = !this.mute;
        if (this.mute) {
          this.masterGain.gain.value = 0;
          visualMutingRack(this);
        } else {
          this.masterGain.gain.value = (this.gainValue/100);
        }
      });

      function visualMutingRack(obj) {
        if (obj.mute) {
          displaySpan.innerHTML = 'mute';
          masterGainDisplay.setAttribute("style", "color: transparent; background: #ff0000; font-size: 60px; margin-left: 0; margin-top: 35px; padding-left: 1vmin; padding-right: 0; box-shadow: -1px -1px 1px #00ffff, -2px -2px 1px #00ffff, -3px -3px 1px #00ffff, -4px -4px 1px #00ffff; width: 140px; height: 80px;");
          speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 0.2;");
          nameAndInputDiv.setAttribute("style", "float: left; width: " + (obj.horizontalWidth/5) + "px; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (obj.horizontalHeight - 5) + "px; filter: sepia(5);");
          setTimeout(() => {
            if (obj.mute) {
              masterGainDisplay.setAttribute("style", "color: transparent; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 35px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 140px; height: 80px;");
              setTimeout(() => {
                if (obj.mute) {
                  visualMutingRack(obj);
                } else {
                  displaySpan.innerHTML = '';
                  masterGainDisplay.setAttribute("style", "color: " + obj.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 35px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 140px; height: 80px;");
                  speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 1;");
                  nameAndInputDiv.setAttribute("style", "float: left; width: " + (obj.horizontalWidth/5) + "px; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (obj.horizontalHeight - 5) + "px; filter: sepia(0);");
                }
              }, 500);
            } else {
              displaySpan.innerHTML = '';
              masterGainDisplay.setAttribute("style", "color: " + obj.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 35px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 140px; height: 80px;");
              speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 1;");
              nameAndInputDiv.setAttribute("style", "float: left; width: " + (obj.horizontalWidth/5) + "px; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (obj.horizontalHeight - 5) + "px; filter: sepia(0);");
            }
          }, 500);
        } else {
          displaySpan.innerHTML = '';
          masterGainDisplay.setAttribute("style", "color: " + obj.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 35px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; height: 80px;");
          nameAndInputDiv.setAttribute("style", "float: left; width: " + (obj.horizontalWidth/5) + "px; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (obj.horizontalHeight - 5) + "px; filter: sepia(0);");
          speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 1;");
        }
      }
    }

    this.userMuteRackVertical = (masterMute, displaySpan, masterGainDisplay, speakerIcon, nameAndInputDiv) => {
      masterMute.addEventListener('click', () => {
        this.mute = !this.mute;
        if (this.mute) {
          this.masterGain.gain.value = 0;
          visualMutingRackVertical(this);
        } else {
          this.masterGain.gain.value = (this.gainValue/100);
        }
      });

      function visualMutingRackVertical(obj) {
        if (obj.mute) {
          displaySpan.innerHTML = 'mute';
          masterGainDisplay.setAttribute("style", "color: transparent; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 15px; background: #ff0000; box-shadow: -1px -1px 1px #00ffff, -2px -2px 1px #00ffff, -3px -3px 1px #00ffff, -4px -4px 1px #00ffff; padding-left: 1vmin; padding-right: 0; width: 130px; height: 80px;");
          speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 0.2;");
          nameAndInputDiv.setAttribute("style", "float: left; width: " + obj.verticalWidth + "px; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (obj.verticalHeight/5) + "px; filter: sepia(5);");
          setTimeout(() => {
            if (obj.mute) {
              masterGainDisplay.setAttribute("style", "color: transparent; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 15px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 130px; height: 80px;");
              setTimeout(() => {
                if (obj.mute) {
                  visualMutingRackVertical(obj);
                } else {
                  displaySpan.innerHTML = '';
                  masterGainDisplay.setAttribute("style", "color: " + obj.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 15px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 130px; height: 80px;");
                  speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 1;");
                  nameAndInputDiv.setAttribute("style", "float: left; width: " + obj.verticalWidth + "px; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (obj.verticalHeight/5) + "px; filter: sepia(0);");
                }
              }, 500);
            } else {
              displaySpan.innerHTML = '';
              masterGainDisplay.setAttribute("style", "color: " + obj.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 15px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 130px; height: 80px;");
              speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 1;");
              nameAndInputDiv.setAttribute("style", "float: left; width: " + obj.verticalWidth + "px; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (obj.verticalHeight/5) + "px; filter: sepia(0);");
            }
          }, 500);
        } else {
          displaySpan.innerHTML = '';
          masterGainDisplay.setAttribute("style", "color: " + obj.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 15px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 130px; height: 80px;");
          nameAndInputDiv.setAttribute("style", "float: left; width: " + obj.verticalWidth + "px; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (obj.verticalHeight/5) + "px; filter: sepia(0);");
          speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 1;");
        }
      }
    }

    // Rendering Functions

    this.renderDraggable = () => {
      let div = document.createElement('div');
      let masterGainTop = document.createElement('div');
      div.appendChild(masterGainTop);
      let nameTag = document.createElement('h1');
      masterGainTop.appendChild(nameTag);
      let signalPanel = document.createElement('div');
      div.appendChild(signalPanel);
      let inputLabel = document.createElement('p');
      signalPanel.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      let inputPort = document.createElement('h1');
      signalPanel.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input' + this.name + this.id;
      let face = document.createElement('div');
      div.appendChild(face);
      let faceForm = document.createElement('div');
      face.appendChild(faceForm);
      let displayAnchor = document.createElement('a');
      faceForm.appendChild(displayAnchor);
      let masterGainDisplay = document.createElement('input');
      displayAnchor.appendChild(masterGainDisplay);
      masterGainDisplay.id = 'masterGainDisplay' + this.id;
      masterGainDisplay.type = 'number';
      masterGainDisplay.name = 'amountInput';
      masterGainDisplay.min = '0';
      masterGainDisplay.max = '100';
      masterGainDisplay.value = this.gainValue.toString();
      masterGainDisplay.stepvalue = '1';
      let displaySpan = document.createElement('span');
      displayAnchor.appendChild(displaySpan);
      let amountRange = document.createElement('input');
      faceForm.appendChild(amountRange);
      amountRange.className = 'volumeSlider';
      amountRange.name = 'amountRange';
      amountRange.type = 'range';
      amountRange.min = '0';
      amountRange.max = '100';
      amountRange.value = this.gainValue.toString();
      amountRange.stepvalue = '1';
      amountRange.id = 'masterVolume' + this.id;
      let masterMute = document.createElement('button');
      face.appendChild(masterMute);
      masterMute.type = '';
      masterMute.id = 'masterMute';
      let speakerIcon = document.createElement('img');
      masterMute.appendChild(speakerIcon);
      speakerIcon.src = './img/january/loudspeaker-155807_1280.png';
      let muteNote = document.createElement('p');
      masterMute.appendChild(muteNote);
      muteNote.innerHTML = 'mute';


      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(" + (0.5 * this.dragScale) + "); z-index: 6;");
      masterGainTop.setAttribute("style", "width: 100%; background: url(" + this.topPath + "); background-size: " + this.topSize + "; font-family: 'Righteous', cursive; height: 50px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + this.topRepeat + ";");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; margin-left: 1em; margin-top: 1em; color: " + this.topFontColor + "; font-weight: 600; text-shadow: 1px 1px 1px " + this.topFontShadow + ", 2px 2px 1px " + this.topFontShadow + ";");
      signalPanel.setAttribute("style", "background: url(" + this.signalPath + "); background-size: " + this.signalSize + "; border: solid 1px transparent; height: 350px; width: 49px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: 0; margin-top: -23px; box-shadow: 0px -1px 1px " + this.signalFontShadow + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; margin-left: 1px; margin-top: 128px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; cursor: pointer;");
      face.setAttribute("style", "height: 350px; width: 100%; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: " + this.faceRepeat + "; margin-top: -326px; margin-left: 52px; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ";");
      masterGainDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 96px; margin-left: 25px; margin-top: 25px; background: url(" + this.displayPath + "); background-size: " + this.gainDisplaySize + "; box-shadow: -1px -1px 1px " + this.gainDisplayBoxShadowColor + ", -2px -2px 1px " + this.gainDisplayBoxShadowColor + ", -3px -3px 1px " + this.gainDisplayBoxShadowColor + ", -4px -4px 1px " + this.gainDisplayBoxShadowColor + "; padding-left: 5vmin;");
      displaySpan.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 76px; color: black; margin-left: -30vmin; margin-top: -35vmin; opacity: 1; color: #fff000;");
      amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.masterVolumeSize + "; background-repeat: " + this.masterVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.masterVolumeBoxShadow + ", 2px -2px 1px " + this.masterVolumeBoxShadow + ", 3px -3px 1px " + this.masterVolumeBoxShadow + ", 4px -4px 1px " + this.masterVolumeBoxShadow + ";");
      masterMute.setAttribute("style", "width: 40%; height: auto; background: transparent; cursor: pointer; position:relative; position: relative; bottom: 90px; left: 45px;");
      speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 1;");
      muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 26px; margin-bottom: 0; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");

      this.userVolumeInput(masterGainDisplay, amountRange);
      this.userMute(masterMute, speakerIcon, masterGainDisplay, displaySpan, face, muteNote, masterGainTop, signalPanel, amountRange);

      function dragElement(element, obj) {

        let bounded = false;
        let boundRect;

        if ((boundingDiv !== null) && (boundingDiv !== undefined)) {
          bounded = true;
        }

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (masterGainTop) {
          masterGainTop.onmousedown = dragMouseDown;
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
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(" + (0.7 * this.dragScale) + "); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 1;");
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

      inputPort.addEventListener('click', () => {
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'master_volume' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'master_volumes');
        }

      });

      return(div);
    }

    this.renderRackHorizontal = (x, y) => {
      let div = document.createElement('div');
      let nameAndInputDiv = document.createElement('div');
      div.appendChild(nameAndInputDiv);
      let nameTag = document.createElement('h1');
      nameAndInputDiv.appendChild(nameTag);
      let inputPort = document.createElement('h1');
      let inputLabel = document.createElement('p');
      nameAndInputDiv.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      nameAndInputDiv.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input' + this.name + this.id;
      let displayDiv = document.createElement('div');
      div.appendChild(displayDiv);
      let displayAnchor = document.createElement('a');
      displayDiv.appendChild(displayAnchor);
      let masterGainDisplay = document.createElement('input');
      displayAnchor.appendChild(masterGainDisplay);
      masterGainDisplay.id = 'masterGainDisplay' + this.id;
      masterGainDisplay.type = 'number';
      masterGainDisplay.name = 'amountInput';
      masterGainDisplay.min = '0';
      masterGainDisplay.max = '100';
      masterGainDisplay.value = this.gainValue.toString();
      masterGainDisplay.stepvalue = '1';
      let displaySpan = document.createElement('span');
      displayAnchor.appendChild(displaySpan);
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
      amountRange.id = 'masterVolume' + this.id;
      let muteButtonDiv = document.createElement('div');
      div.appendChild(muteButtonDiv);
      let masterMute = document.createElement('button');
      muteButtonDiv.appendChild(masterMute);
      masterMute.type = '';
      masterMute.id = 'masterMute';
      let speakerIcon = document.createElement('img');
      masterMute.appendChild(speakerIcon);
      speakerIcon.src = './img/january/loudspeaker-155807_1280.png';
      let muteNote = document.createElement('p');
      masterMute.appendChild(muteNote);
      muteNote.innerHTML = 'mute';

      div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.masterVolumeBoxShadow + ", -2px -2px 1px " + this.masterVolumeBoxShadow + ", -3px -3px 1px " + this.masterVolumeBoxShadow + ", -4px -4px 1px " + this.masterVolumeBoxShadow + ";");
      div.className = 'pure-g';
      nameAndInputDiv.className = "pure-u-1-5";
      nameAndInputDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/5) + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 5px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 55px; margin-top: -5px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 60px; margin-top: -10px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      displayDiv.className = "pure-u-1-5";
      displayDiv.setAttribute("style", "float: left; width: " + this.horizontalHeight + "px; padding: 10px;");
      displayAnchor.setAttribute("style", "width: 100%;");
      masterGainDisplay.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 35px; background: url(" + this.displayPath + "); background-size: " + this.gainDisplaySize + "; box-shadow: -1px -1px 1px " + this.gainDisplayBoxShadowColor + ", -2px -2px 1px " + this.gainDisplayBoxShadowColor + ", -3px -3px 1px " + this.gainDisplayBoxShadowColor + ", -4px -4px 1px " + this.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 140px; height: 80px;");
      rangeDiv.className = 'pure-u-2-5';
      rangeDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 2)/5) + "px;");
      amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.masterVolumeSize + "; background-repeat: " + this.masterVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.masterVolumeBoxShadow + ", -2px -2px 1px " + this.masterVolumeBoxShadow + ", -3px -3px 1px " + this.masterVolumeBoxShadow + ", -4px -4px 1px " + this.masterVolumeBoxShadow + ";");
      muteButtonDiv.className = 'pure-u-1-5';
      muteButtonDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/5) + "px;");
      masterMute.setAttribute("style", "width: 100px; height: auto; background: transparent; margin-left: 45px; margin-top: 25px; cursor: pointer;");
      speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 1;");
      muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 32px; margin-bottom: 0; margin-top: -5px; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      displaySpan.setAttribute("style", "position: absolute; font-family: 'Righteous', cursive; font-size: 40px; color: black; margin-left: -130px; margin-top: 55px; opacity: 1; color: #fff000; width: 140px;");

      this.userVolumeInput(masterGainDisplay, amountRange);
      this.userMuteRack(masterMute, displaySpan, masterGainDisplay, speakerIcon, nameAndInputDiv);

      inputPort.addEventListener('click', () => {
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'master_volume' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'master_volumes');
        }
      });

      return(div);
    }

    this.renderRackVertical = (x, y) => {
      let div = document.createElement('div');
      let nameAndInputDiv = document.createElement('div');
      div.appendChild(nameAndInputDiv);
      let nameTag = document.createElement('h1');
      nameAndInputDiv.appendChild(nameTag);
      let inputPort = document.createElement('h1');
      let inputLabel = document.createElement('p');
      nameAndInputDiv.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      nameAndInputDiv.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input' + this.name + this.id;
      let displayDiv = document.createElement('div');
      div.appendChild(displayDiv);
      let displayAnchor = document.createElement('a');
      displayDiv.appendChild(displayAnchor);
      let masterGainDisplay = document.createElement('input');
      displayAnchor.appendChild(masterGainDisplay);
      masterGainDisplay.id = 'masterGainDisplay' + this.id;
      masterGainDisplay.type = 'number';
      masterGainDisplay.name = 'amountInput';
      masterGainDisplay.min = '0';
      masterGainDisplay.max = '100';
      masterGainDisplay.value = this.gainValue.toString();
      masterGainDisplay.stepvalue = '1';
      let displaySpan = document.createElement('span');
      displayAnchor.appendChild(displaySpan);
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
      amountRange.id = 'masterVolume' + this.id;
      let muteButtonDiv = document.createElement('div');
      div.appendChild(muteButtonDiv);
      let masterMute = document.createElement('button');
      muteButtonDiv.appendChild(masterMute);
      masterMute.type = '';
      masterMute.id = 'masterMute';
      let speakerIcon = document.createElement('img');
      masterMute.appendChild(speakerIcon);
      speakerIcon.src = './img/january/loudspeaker-155807_1280.png';
      let muteNote = document.createElement('p');
      masterMute.appendChild(muteNote);
      muteNote.innerHTML = 'mute';

      div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.masterVolumeBoxShadow + ", -2px -2px 1px " + this.masterVolumeBoxShadow + ", -3px -3px 1px " + this.masterVolumeBoxShadow + ", -4px -4px 1px " + this.masterVolumeBoxShadow + ";");
      nameAndInputDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; margin-left: 20px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; margin-left: 55px; margin-top: 25px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin-left: 55px; margin-top: -5px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.inputSize + "; text-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.inputBoxShadowColor + ", -2px -2px 1px " + this.inputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      displayDiv.setAttribute("style", "float: left; width: " + this.horizontalHeight + "px; padding: 10px;");
      displayAnchor.setAttribute("style", "width: 100%;");
      masterGainDisplay.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 60px; margin-left: 0; margin-top: 15px; background: url(" + this.displayPath + "); background-size: " + this.gainDisplaySize + "; box-shadow: -1px -1px 1px " + this.gainDisplayBoxShadowColor + ", -2px -2px 1px " + this.gainDisplayBoxShadowColor + ", -3px -3px 1px " + this.gainDisplayBoxShadowColor + ", -4px -4px 1px " + this.gainDisplayBoxShadowColor + "; padding-left: 1vmin; padding-right: 0; width: 130px; height: 80px;");
      displaySpan.setAttribute("style", "position: absolute; font-family: 'Righteous', cursive; font-size: 40px; color: black; margin-left: -130px; margin-top: 35px; opacity: 1; color: #fff000; width: 140px;");
      rangeDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px;");
      amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.masterVolumeSize + "; background-repeat: " + this.masterVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.masterVolumeBoxShadow + ", 2px -2px 1px " + this.masterVolumeBoxShadow + ", 3px -3px 1px " + this.masterVolumeBoxShadow + ", 4px -4px 1px " + this.masterVolumeBoxShadow + ";");
      muteButtonDiv.className = 'pure-u-1-5';
      muteButtonDiv.setAttribute("style", "float: left; width: " + (this.verticalWidth) + "px; margin-left: 30px; margin-top: 150px;");
      masterMute.setAttribute("style", "width: 100px; height: auto; background: transparent; margin-left: 0; margin-top: 0; cursor: pointer;");
      speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 1;");
      muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 32px; margin-bottom: 0; margin-top: -5px; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");

      this.userVolumeInput(masterGainDisplay, amountRange);
      this.userMuteRackVertical(masterMute, displaySpan, masterGainDisplay, speakerIcon, nameAndInputDiv);

      inputPort.addEventListener('click', () => {
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'master_volume' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'master_volumes');
        }
      });

      return(div);
    }

    // End of Rendering Functions

  }

  return(master);

})();
