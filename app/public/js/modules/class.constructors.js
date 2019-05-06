'use strict';
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

var MasterVolume = (function(settings, skin) {

  let master = function (settings, skin) {
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

    this.userMute = (masterMute, speakerIcon, masterGainDisplay, displaySpan, face, muteNote, masterGainTop, signalPanel) => {

      masterMute.addEventListener('click', () => {
        this.mute = !this.mute;
        if (this.mute) {
          this.masterGain.gain.value = 0;
          visualMuting(this);
        } else {
          this.masterGain.gain.value = (this.gainValue/100);
        }
      });

      function visualMuting(obj) {
        if (obj.mute) {
          displaySpan.innerHTML = 'mute';
          speakerIcon.setAttribute("style", "opacity: 0.3; width: 70%; margin-left: 0; margin-top: 0;");
          masterGainDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 96px; margin-left: 25px; margin-top: 25px; background: #ff0000; box-shadow: -1px -1px 1px #7DF9FF, -2px -2px 1px #7DF9FF, -3px -3px 1px #7DF9FF, -4px -4px 1px #7DF9FF; padding-left: 5vmin; color: transparent;");
          face.setAttribute("style", "height: 350px; width: 100%; background: url(" + obj.facePath + "); background-size: " + obj.faceSize + "; background-repeat: " + obj.faceRepeat + "; margin-top: -326px; margin-left: 52px; box-shadow: -1px -1px 1px " + obj.faceBoxShadowColor + ", -2px -2px 1px " + obj.faceBoxShadowColor + ", -3px -3px 1px " + obj.faceBoxShadowColor + ";");
          muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 26px; margin-bottom: 0; text-shadow: -1px -1px 1px #ff0000, -2px -2px 1px #ff0000;");
          masterGainTop.setAttribute("style", "width: 100%; background: url(" + obj.topPath + "); background-size: " + obj.topSize + "; font-family: 'Righteous', cursive; height: 50px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + obj.topRepeat + "; filter: sepia(3);");
          signalPanel.setAttribute("style", "background: url(" + obj.signalPath + "); background-size: " + obj.signalSize + "; border: solid 1px transparent; height: 350px; width: 49px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: 0; margin-top: -23px; box-shadow: 0px -1px 1px " + obj.signalFontShadow + "; filter: sepia(1);");
          setTimeout(() => {
            if (obj.mute) {
              masterGainDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 96px; margin-left: 25px; margin-top: 25px; background: url(" + obj.displayPath + "); background-size: " + obj.gainDisplaySize + "; box-shadow: -1px -1px 1px " + obj.gainDisplayBoxShadowColor + ", -2px -2px 1px " + obj.gainDisplayBoxShadowColor + ", -3px -3px 1px " + obj.gainDisplayBoxShadowColor + ", -4px -4px 1px " + obj.gainDisplayBoxShadowColor + "; padding-left: 5vmin; color: transparent;");
              face.setAttribute("style", "height: 350px; width: 100%; background: url(" + obj.facePath + "); background-size: " + obj.faceSize + "; background-repeat: " + obj.faceRepeat + "; margin-top: -326px; margin-left: 52px; box-shadow: -1px -1px 1px #ff0000, -2px -2px 1px #ff0000, -3px -3px 1px #ff0000;");
              muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 26px; margin-bottom: 0; text-shadow: -1px -1px 1px " + obj.faceFontShadow + ", -2px -2px 1px " + obj.faceFontShadow + ";");
              setTimeout(() => {
                if (obj.mute) {
                  visualMuting(obj);
                } else {
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
          displaySpan.innerHTML = '';
          speakerIcon.setAttribute("style", "opacity: 1; width: 70%; margin-left: 0; margin-top: 0;");
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


      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5);");
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
      masterMute.setAttribute("style", "width: 40%; height: auto; background: transparent; margin-left: 9vmin; margin-top: -50px; cursor: pointer;");
      speakerIcon.setAttribute("style", "width: 70%; margin-left: 0; margin-top: 0; opacity: 1;");
      muteNote.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 26px; margin-bottom: 0; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");

      this.userVolumeInput(masterGainDisplay, amountRange);
      this.userMute(masterMute, speakerIcon, masterGainDisplay, displaySpan, face, muteNote, masterGainTop, signalPanel);

      function dragElement(element, obj) {

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

      inputPort.addEventListener('click', () => {
        alert('Master Volume Input Port -- id: ' + this.id);
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
        alert('Master Volume Input Port -- id: ' + this.id);
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
        alert('Master Volume Input Port -- id: ' + this.id);
      });

      return(div);
    }

    // End of Rendering Functions

  }

  return(master);

})();

var GainModule = (function(settings, skin) {

  let gainNode = function(settings, skin) {
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
      amountRange.setAttribute("style", "background: url(" + this.displayPath + "); background-size: " + this.gainVolumeSize + "; background-repeat: " + this.gainVolumeRepeat + "; box-shadow: 1px -1px 1px " + this.gainVolumeBoxShadow + ", 2px -2px 1px " + this.gainVolumeBoxShadow + ", 3px -3px 1px " + this.gainVolumeBoxShadow + ", 4px -4px 1px " + this.gainVolumeBoxShadow + ";");
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

      inputPort.addEventListener('click', () => {
        alert('Gain Input Port -- id: ' + this.id);
      });

      outputPort.addEventListener('click', () => {
        alert('Gain Output Port -- id: ' + this.id);
      });

      modulationInputPort.addEventListener('click', () => {
        alert('Gain Modulation Input --- id: ' + this.id);
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
        alert('Gain Input Port -- id: ' + this.id);
      });

      outputPort.addEventListener('click', () => {
        alert('Gain Output Port -- id: ' + this.id);
      });

      modulationInputPort.addEventListener('click', () => {
        alert('Gain Modulation Input Port -- id: ' + this.id);
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
        alert('Gain Input Port -- id: ' + this.id);
      });

      outputPort.addEventListener('click', () => {
        alert('Gain Output Port -- id: ' + this.id);
      });

      modulationInputPort.addEventListener('click', () => {
        alert('Gain Modulation Input Port -- id: ' + this.id);
      });

      return(div);
    }

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

      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5);");
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
      hertzLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 3px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ", -3px -3px 1px " + this.faceFontShadow + ", -4px -4px 1px " + this.faceFontShadow + ";");
      hertzDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 56px; margin-left: 5px; margin-top: -20px; background: url(" + this.displayPath + "); background-size: " + this.frequencySize + "; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; padding-left: 1vmin; width: 65%;");
      hertzSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: ratateZ(-90deg); transform: rotateZ(-90deg); width: 95%; background: url(" + this.frequencySliderPath + "); background-size: " + this.frequencySliderSize + "; outline: none; opacity: 1.0; margin-left: 150px; margin-top: 80px; box-shadow: 1px -1px 1px " + this.frequencyBoxShadow + ", 2px -2px 1px " + this.frequencyBoxShadow + ", 3px -3px 1px " + this.frequencyBoxShadow + ", 4px -4px 1px " + this.frequencyBoxShadow + "; height: 52px;");
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
        default:
          alert('unsupported skin slider');
      }
      hertzModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin: -15vmin 0 2vmin 2vmin; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      hertzModPort.setAttribute("style", "margin-top: -18px; margin-left: 45px; font-family: 'Righteous', cursive; font-size: 48px; width: 12%; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; padding-left: 15px; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer;");
      detuneLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; margin: -25px 0 0 0; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      detuneDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 1px; margin-top: 8px; background: url(" + this.detunePath + "); background-size: " + this.detuneSize + "; box-shadow: -1px -1px 1px " + this.detuneBoxShadowColor + ", -2px -2px 1px " + this.detuneBoxShadowColor + ", -3px -3px 1px " + this.detuneBoxShadowColor + ", -4px -4px 1px " + this.detuneBoxShadowColor + "; padding-left: 10px;");
      detuneSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; width: 65%; height: 32px; background: url(" + this.detuneSliderPath + "); background-size: " + this.detuneSliderSize + "; outline: none; opacity: 1.0; position: relative; left: -20px; top: 15px; box-shadow: -1px -1px 1px " + this.detuneBoxShadowColor + ", -2px -2px 1px " + this.detuneBoxShadowColor + ", -3px -3px 1px " + this.detuneBoxShadowColor + ", -4px -4px 1px " + this.detuneBoxShadowColor + ";");
      detuneModLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; position: relative; top: -170px; left: 150px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      detuneModPort.setAttribute("style", "position: relative; top: -190px; left: 170px; font-family: 'Righteous', cursive; font-size: 48px; width: 12%; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; padding-left: 15px; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer;");

      this.userWaveformInput(sine, square, sawtooth, triangle);
      this.userFrequencyInput(hertzDisplay, hertzSlider);
      this.userDetuneInput(detuneDisplay, detuneSlider);

      function dragElement(element, obj) {

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

      waveModPort.addEventListener('click', () => {
        alert(waveModPort.id);
      });

      hertzModPort.addEventListener('click', () => {
        alert(hertzModPort.id);
      });

      detuneModPort.addEventListener('click', () => {
        alert(detuneModPort.id);
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
        alert('Oscillator Output Port -- id: ' + this.id);
      });

      waveModPort.addEventListener('click', () => {
        alert('Oscillator Waveform Modulation Port -- id: ' + this.id);
      });

      frequencyModPort.addEventListener('click', () => {
        alert('Oscillator Frequency Modulation Port -- id: ' + this.id);
      });

      detuneModPort.addEventListener('click', () => {
        alert('Oscillator Detune Modulation Port -- id: ' + this.id);
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
        alert('Oscillator Output Port -- id: ' + this.id);
      });

      waveModPort.addEventListener('click', () => {
        alert('Oscillator Waveform Modulation Port -- id: ' + this.id);
      });

      frequencyModPort.addEventListener('click', () => {
        alert('Oscillator Frequency Modulation Port -- id: ' + this.id);
      });

      detuneModPort.addEventListener('click', () => {
        alert('Oscillator Detune Modulation Port -- id: ' + this.id);
      });

      this.userWaveformInput(sine, square, sawtooth, triangle);
      this.userFrequencyInput(frequencyDisplay, frequencySlider);
      this.userDetuneInput(detuneDisplay, detuneSlider);

      return(div);
    }
  }

  return(oscillatorNode);
})();

var TestToneModule = (function(settings, skin) {

  let testToneNode = function(settings, skin) {
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
        this.mouseOn = true;
        if (this.deviceOn) {
          div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(0deg) contrast(100%); transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
        } else {
          div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(180deg) contrast(50%); transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
        }

      });

      div.addEventListener('mouseout', () => {
        this.mouseOn = false;
        if (this.deviceOn) {
          div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(0deg) contrast(100%); transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
        } else {
          div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(180deg) contrast(50%); transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
        }
      });

      outputPort.addEventListener('click', () => {
        alert(outputPort.id);
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
        alert('Test Tone Output Port -- id: ' + this.id);
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
        alert('Test Tone Output Port -- id: ' + this.id);
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

var DynamicCompressor = (function(settings, skin) {

  let dynamicCompressorNode = function(settings, skin) {
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

    this.drageWidth = 790;
    this.dragHeight = 453;
    this.horizontalWidth = 900;
    this.horizontalHeight = 160;
    this.verticalWidth = 160;
    this.verticalHeight = 750;

    this.renderDraggable = () => {

      let div = document.createElement('div');
      // let testtoneTop = document.createElement('div');
      // div.appendChild(testtoneTop);
      // let nameTag = document.createElement('h1');
      // testtoneTop.appendChild(nameTag);
      // let signalPanel = document.createElement('div');
      // div.appendChild(signalPanel);
      // let outputLabel = document.createElement('p');
      // signalPanel.appendChild(outputLabel);
      // outputLabel.innerHTML = 'output';
      // let outputPort = document.createElement('h1');
      // signalPanel.appendChild(outputPort);
      // outputPort.innerHTML = '◦';
      // outputPort.id = 'output ' + this.name + this.id;
      // let face = document.createElement('div');
      // div.appendChild(face);
      // let frequencyPane = document.createElement('div');
      // face.appendChild(frequencyPane);
      // let hertzLabel = document.createElement('h3');
      // frequencyPane.appendChild(hertzLabel);
      // hertzLabel.innerHTML = 'Hertz:';
      // let testToneFrequency = document.createElement('input');
      // frequencyPane.appendChild(testToneFrequency);
      // testToneFrequency.type = 'number';
      // testToneFrequency.min = "1.000";
      // testToneFrequency.max = "11025.000";
      // testToneFrequency.step = "0.001";
      // testToneFrequency.value = this.hertz;
      // let testToneFrequencySlider = document.createElement('input');
      // frequencyPane.appendChild(testToneFrequencySlider);
      // testToneFrequencySlider.type = "range";
      // testToneFrequencySlider.min = "1.000";
      // testToneFrequencySlider.max = "11025.000";
      // testToneFrequencySlider.step = "0.001";
      // testToneFrequencySlider.value = this.hertz;
      // let waveformSelectDiv = document.createElement('div');
      // frequencyPane.appendChild(waveformSelectDiv);
      // let waveformLabel = document.createElement('h3');
      // waveformSelectDiv.appendChild(waveformLabel);
      // waveformLabel.innerHTML = 'Waveform:';
      // let waveFormsContainer = document.createElement('div');
      // waveformSelectDiv.appendChild(waveFormsContainer);
      // let sine = document.createElement('div');
      // waveFormsContainer.appendChild(sine);
      // let sineLabel = document.createElement('p');
      // sine.appendChild(sineLabel);
      // sineLabel.innerHTML = "sine";
      // let sineImage = document.createElement('img');
      // sine.appendChild(sineImage);
      // sineImage.src = "./img/noun_589707_cc.png";
      // let square = document.createElement('div');
      // waveFormsContainer.appendChild(square);
      // let squareLabel = document.createElement('p');
      // square.appendChild(squareLabel);
      // squareLabel.innerHTML = "square";
      // let squareImage = document.createElement('img');
      // square.appendChild(squareImage);
      // squareImage.src = "./img/noun_538698_cc.png";
      // let sawtooth = document.createElement('div');
      // waveFormsContainer.appendChild(sawtooth);
      // let sawtoothLabel = document.createElement('p');
      // sawtooth.appendChild(sawtoothLabel);
      // sawtoothLabel.innerHTML = "sawtooth";
      // let sawtoothImage = document.createElement('img');
      // sawtooth.appendChild(sawtoothImage);
      // sawtoothImage.src = "./img/noun_538692_cc.png";
      // let triangle = document.createElement('div');
      // waveFormsContainer.appendChild(triangle);
      // let triangleLabel = document.createElement('p');
      // triangle.appendChild(triangleLabel);
      // triangleLabel.innerHTML = "triangle";
      // let triangleImage = document.createElement('img');
      // triangle.appendChild(triangleImage);
      // triangleImage.src = "./img/noun_538696_cc.png";
      // let volumePane = document.createElement('div');
      // face.appendChild(volumePane);
      // let volumeLabel = document.createElement('h3');
      // volumePane.appendChild(volumeLabel);
      // volumeLabel.innerHTML = 'Volume:';
      // let testToneVolume = document.createElement('input');
      // volumePane.appendChild(testToneVolume);
      // testToneVolume.type = "number";
      // testToneVolume.min = "0";
      // testToneVolume.max = "100";
      // testToneVolume.step = "1";
      // testToneVolume.value = this.gainValue;
      // let testToneVolumeSlider = document.createElement('input');
      // volumePane.appendChild(testToneVolumeSlider);
      // testToneVolumeSlider.type = "range";
      // testToneVolumeSlider.min = "0";
      // testToneVolumeSlider.max = "100";
      // testToneVolumeSlider.step = "1";
      // testToneVolumeSlider.value = this.gainValue;
      // let light = document.createElement('div');
      // volumePane.appendChild(light);
      // let switchLabel = document.createElement('label');
      // volumePane.appendChild(switchLabel);
      // switchLabel.className = "testToneSwitch";
      // let testToneOnOff = document.createElement('input');
      // switchLabel.appendChild(testToneOnOff);
      // testToneOnOff.type = "checkbox";
      // testToneOnOff.checked = this.deviceOn;
      // let sliderSpan = document.createElement('span');
      // switchLabel.appendChild(sliderSpan);
      // sliderSpan.className = "testToneSlider";

      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5);");
      // testtoneTop.setAttribute("style", "width: 100%; background: url(" + this.topPath + "); background-size: " + this.topSize + "; font-family: 'Righteous', cursive; height: 60px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + this.topRepeat + ";");
      // nameTag.innerHTML = this.name;
      // nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 40px; margin-left: 2em; margin-top: 6em; color: " + this.topFontColor + "; font-weight: 600; text-shadow: 1px 1px 1px " + this.topFontShadow + ", 2px 2px 1px " + this.topFontShadow + ";");
      // signalPanel.setAttribute("style", "background: url(" + this.signalPath + "); background-size: " + this.signalSize + "; border: solid 1px transparent; height: " + this.dragHeight + "px; width: 59px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: -6px; margin-top: -26px; box-shadow: 0px -1px 1px " + this.signalFontShadow + ";");
      // outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; margin-left: 1px; margin-top: 228px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      // outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      // face.setAttribute("style", "height: " + this.dragHeight + "px; width: 100%; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: " + this.faceRepeat + "; margin-top: -464px; margin-left: 61px; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ";");
      // face.className = 'pure-g';
      // frequencyPane.className = 'pure-u-1-3';
      // frequencyPane.setAttribute("style", "width: " + (this.dragWidth/2) + "px; height: " + this.dragHeight + "px;");
      // hertzLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 42px; padding: 5px 0 3px 15px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      // testToneFrequency.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 56px; margin-left: 3vmin; margin-top: 0; background: url(" + this.displayPath + "); background-size: " + this.frequencySize + "; box-shadow: -1px -1px 1px " + this.frequencyBoxShadow + ", -2px -2px 1px " + this.frequencyBoxShadow + ", -3px -3px 1px " + this.frequencyBoxShadow + ", -4px -4px 1px " + this.frequencyBoxShadow + "; position: relative; margin: -40px 0 0 15px;");
      // testToneFrequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); width: 95%; background: url(" + this.frequencySliderPath + "); background-size: " + this.frequencySliderSize + "; outline: none; opacity: 1.0; margin-left: 190px; margin-top: 87px; box-shadow: 1px -1px 1px " + this.frequenySliderBoxShadow + ", 2px -2px 1px " + this.frequenySliderBoxShadow + ", 3px -3px 1px " + this.frequenySliderBoxShadow + ", 4px -4px 1px " + this.frequenySliderBoxShadow + "; height: 52px;");
      // switch(this.skinName) {
      //   case('Test Tone: January A'):
      //     testToneFrequencySlider.className = 'testtoneJanuaryASlider';
      //     testToneVolumeSlider.className = 'testtoneJanuaryASlider';
      //     break;
      //   case('Test Tone: January B'):
      //     testToneFrequencySlider.className = 'testtoneJanuaryBSlider';
      //     testToneVolumeSlider.className = 'testtoneJanuaryBSlider';
      //     break;
      //   case('Test Tone: January C'):
      //     testToneFrequencySlider.className = 'testtoneJanuaryCSlider';
      //     testToneVolumeSlider.className = 'testtoneJanuaryCSlider';
      //     break;
      //   case('Test Tone: February A'):
      //     testToneFrequencySlider.className = 'testtoneFebruaryASlider';
      //     testToneVolumeSlider.className = 'testtoneFebruaryASlider';
      //     break;
      //   case('Test Tone: February B'):
      //     testToneFrequencySlider.className = 'testtoneFebruaryBSlider';
      //     testToneVolumeSlider.className = 'testtoneFebruaryBSlider';
      //     break;
      //   case('Test Tone: February C'):
      //     testToneFrequencySlider.className = 'testtoneFebruaryCSlider';
      //     testToneVolumeSlider.className = 'testtoneFebruaryCSlider';
      //     break;
      //   case('Test Tone: March A'):
      //     testToneFrequencySlider.className = 'testtoneMarchASlider';
      //     testToneVolumeSlider.className = 'testtoneFebruaryCSlider';
      //     break;
      //   case('Test Tone: March B'):
      //     testToneFrequencySlider.className = 'testtoneMarchBSlider';
      //     testToneVolumeSlider.className = 'testtoneMarchBSlider';
      //     break;
      //   case('Test Tone: March C'):
      //     testToneFrequencySlider.className = 'testtoneMarchCSlider';
      //     testToneVolumeSlider.className = 'testtoneMarchCSlider';
      //     break;
      //   case('Test Tone: April A'):
      //     testToneFrequencySlider.className = 'testtoneAprilASlider';
      //     testToneVolumeSlider.className = 'testtoneAprilASlider';
      //     break;
      //   case('Test Tone: April B'):
      //     testToneFrequencySlider.className = 'testtoneAprilBSlider';
      //     testToneVolumeSlider.className = 'testtoneAprilBSlider';
      //     break;
      //   case('Test Tone: April C'):
      //     testToneFrequencySlider.className = 'testtoneAprilCSlider';
      //     testToneVolumeSlider.className = 'testtoneAprilCSlider';
      //     break;
      //   default:
      //     console.log('unsupported test tone skin');
      // }
      // waveformSelectDiv.setAttribute("style", "position: relative; width: 320px; height: 290px; margin: -130px 0 0 15px;");
      // waveformLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 42px; margin: -25px 0 3px 0; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      // waveFormsContainer.setAttribute("style", "box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; width: 320px; height: 230px; cursor: pointer;");
      // if (this.waveform === 'sine') {
      //   sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden;");
      //   sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      //   square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden;");
      //   squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      //   sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
      //   sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
      //   sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
      //   triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: visible;");
      //   triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      // }
      // if (this.waveform === 'square') {
      //   sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden;");
      //   sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      //   square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: hidden;");
      //   squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      //   sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
      //   sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      //   triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
      //   triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
      //   triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
      // }
      // if (this.waveform === 'sawtooth') {
      //   sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
      //   sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
      //   sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
      //   square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(90deg); backface-visibility: hidden;");
      //   squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      //   sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden;");
      //   sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
      //   sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
      //   triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
      //   triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      // }
      // if (this.waveform === 'triangle') {
      //   sine.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: 0; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: hidden; visibility: visible;");
      //   sineImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   sineLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      //   square.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -230px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-180deg); backface-visibility: hidden; visibility: hidden;");
      //   squareImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: hidden;");
      //   squareLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: hidden;");
      //   sawtooth.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -460px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(-90deg); backface-visibility: visible;");
      //   sawtoothImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   sawtoothLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      //   triangle.setAttribute("style", "width: 320px; height: 230px; margin: 0 0 0 0; position: relative; left: 0; top: -690px; background: url(" + this.displayPath + "); background-size: " + this.waveformSelectorDisplaySize + "; overflow-x: hidden; overflow-y: hidden; transform: rotateY(0deg); backface-visibility: visible;");
      //   triangleImage.setAttribute("style", "width: 70%; float: right; backface-visibility: hidden; visibility: visible;");
      //   triangleLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 30px; margin: 80px 0 0 5%; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  "; width: 20%; float: left; backface-visibility: hidden; visibility: visible;");
      // }
      // let waveFormsObject = {
      //   sine: sine,
      //   sineLabel: sineLabel,
      //   sineImage: sineImage,
      //   square: square,
      //   squareLabel: squareLabel,
      //   squareImage: squareImage,
      //   sawtooth: sawtooth,
      //   sawtoothLabel: sawtoothLabel,
      //   sawtoothImage: sawtoothImage,
      //   triangle: triangle,
      //   triangleLabel: triangleLabel,
      //   triangleImage: triangleImage,
      //   waveFormsContainer: waveFormsContainer
      // };
      // volumePane.classname = "pure-u-1-3";
      // volumePane.setAttribute("style", "width: " + (this.dragWidth/2) + "px; height: " + this.dragHeight + "px; float: right; position: relative; top: 0; margin-top: -453px;");
      // volumeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow +  ";");
      // testToneVolume.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 56px; margin-left: 3vmin; margin-top: 0; background: url(" + this.volumePath + "); background-size: " + this.volumeSize + "; box-shadow: -1px -1px 1px " + this.volumeBoxShadowColor + ", -2px -2px 1px " + this.volumeBoxShadowColor + ", -3px -3px 1px " + this.volumeBoxShadowColor + ", -4px -4px 1px " + this.volumeBoxShadowColor + "; position: relative; margin: 0 0 0 25px;");
      // testToneVolumeSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: ratateZ(-90deg); transform: rotateZ(-90deg); width: 95%; background: url(" + this.frequencySliderPath + "); background-size: " + this.frequencySliderSize + "; outline: none; opacity: 1.0; margin-left: 20px; margin-top: 87px; box-shadow: 1px -1px 1px " + this.frequenySliderBoxShadow + ", 2px -2px 1px " + this.frequenySliderBoxShadow + ", 3px -3px 1px " + this.frequenySliderBoxShadow + ", 4px -4px 1px " + this.frequenySliderBoxShadow + "; height: 52px;");
      // if (this.deviceOn) {
      //   div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5); filter: hue-rotate(0deg) contrast(100%);");
      //   light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: visible;");
      // } else {
      //   div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5); filter: hue-rotate(180deg) contrast(50%);");
      //   light.setAttribute("style", "position: relative; border-radius: 100%; width: 120px; height: 120px; border: solid 5px " + this.faceFontColor + "; background-color: " + this.faceBoxShadowColor + "; float: right; margin: -220px 10px 0 0; filter: contrast(" + (this.gainValue) + "%) brightness(" + (this.gainValue) + "%) hue-rotate(" + (100 - this.gainValue) + "deg); visibility: hidden;");
      // }
      // switchLabel.setAttribute("style", "float: right; margin: 0 50px 0 0;");

      // this.userFrequencyInput(testToneFrequency, testToneFrequencySlider);
      // this.manageWaveformSelector(waveFormsObject);
      // this.manageVolumeInput(testToneVolume, testToneVolumeSlider, light);
      // this.onOffFunctionalityDrag(testToneOnOff, light, div);

      // function dragElement(element, obj) {
      //
      //   let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      //   if (testtoneTop) {
      //     testtoneTop.onmousedown = dragMouseDown;
      //   } else {
      //     element.onmousedown = dragMouseDown;
      //   }
      //
      //   function dragMouseDown(e) {
      //     e = e || window.event;
      //     e.preventDefault();
      //     pos3 = e.clientX;
      //     pos4 = e.clientY;
      //     document.onmouseup = closeDragElement;
      //     document.onmousemove = elementDrag;
      //   }
      //
      //   function elementDrag(e) {
      //     e = e || window.event;
      //     e.preventDefault();
      //     pos1 = pos3 - e.clientX;
      //     pos2 = pos4 - e.clientY;
      //     pos3 = e.clientX;
      //     pos4 = e.clientY;
      //     // set the element's new position:
      //     element.style.top = (element.offsetTop - pos2) + "px";
      //     element.style.left = (element.offsetLeft - pos1) + "px";
      //     obj.positionX = (element.offsetLeft - pos1);
      //     obj.positionY = (element.offsetTop - pos2);
      //   }
      //
      //   function closeDragElement() {
      //     document.onmouseup = null;
      //     document.onmousemove = null;
      //     obj.positionX = (element.offsetLeft - pos1);
      //     obj.positionY = (element.offsetTop - pos2);
      //   }
      // }

      // dragElement(div, this);

      // div.addEventListener('mouseover', () => {
      //   this.mouseOn = true;
      //   if (this.deviceOn) {
      //     div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(0deg) contrast(100%); transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
      //   } else {
      //     div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(180deg) contrast(50%); transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
      //   }
      //
      // });

      // div.addEventListener('mouseout', () => {
      //   this.mouseOn = false;
      //   if (this.deviceOn) {
      //     div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(0deg) contrast(100%); transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
      //   } else {
      //     div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; filter: hue-rotate(180deg) contrast(50%); transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
      //   }
      // });

      // outputPort.addEventListener('click', () => {
      //   alert(outputPort.id);
      // });

      return(div);
    }

  }

  return(dynamicCompressorNode);
})();

var RandomNumberGenerator = (function(settings, skin) {

  let randomNumberGenerator = function(settings, skin) {
    this.id = settings.id;
    this.name = settings.name;
    this.interval = settings.interval;
    this.interval_modulator = settings.interval_modulator;
    this.maximum = settings.maximum;
    this.maximum_modulator = settings.maximum_modulator;
    this.minimum = settings.minimum;
    this.minimum_modulator = settings.minimum_modulator;
    this.continuous = settings.continuous;
    this.exponential = settings.exponential;
    this.convex = settings.convex;
    this.slope = settings.slope;
    this.output = settings.output;
  }

  return(randomNumberGenerator);
})();

var LowpassFilter = (function(settings, skin) {

  let lowpassFilter = function(settings, skin) {
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
    this.lowpassFilter = audioContext.createBiquadFilter();
    this.lowpassFilter.type = 'lowpass';
    this.lowpassFilter.frequency.value = this.frequency;
    this.lowpassFilter.detune.value = this.detune;
    this.lowpassFilter.Q.value = this.q;
  }

  return(lowpassFilter);

})();

var HighpassFilter = (function(settings, skin) {

  let highpassFilter = function(settings, skin) {
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
    this.highpassFilter = audioContext.createBiquadFilter();
    this.highpassFilter.type = 'highpass';
    this.highpassFilter.frequency.value = this.frequency;
    this.highpassFilter.detune.value = this.detune;
    this.highpassFilter.Q.value = this.q;
  }

  return(highpassFilter);
})();

var EnvelopeGenerator = (function(settings, skin) {

  let envelopeGenerator = function(settings, skin) {
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
