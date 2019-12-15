'use strict';

var RandomNumberGenerator = (function(settings, skin, audioContext) {

  let randomNumberGenerator = function(settings, skin, audioContext) {
    this.id = settings.id;
    this.name = settings.name;
    this.positionX = settings.positionX;
    this.positionY = settings.positionY;
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

    this.skinId = skin.id;
    this.skinName = skin.name;
    this.skinMonth = skin.month;
    this.skinRule = skin.rule;
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
    this.outputSize = skin.output_size;
    this.outputRepeat = skin.output_repeat;
    this.outputBoxShadowColor = skin.output_box_shadow_color;
    this.outputFontColor = skin.output_font_color;
    this.outputFontShadowColor = skin.output_font_shadow_color;
    this.outputDisplaySize = skin.output_display_size;
    this.outputDisplayRepeat = skin.output_display_repeat;
    this.outputDisplayBoxShadowColor = skin.output_display_box_shadow_color;
    this.outputDisplayFontColor = skin.output_display_font_color;
    this.minimumDisplayPath = skin.minimum_display_path;
    this.minimumDisplaySize = skin.minimum_display_size;
    this.minimumDisplayRepeat = skin.minimum_display_repeat;
    this.minimumDisplayBoxShadowColor = skin.minimum_display_box_shadow_color;
    this.minimumSliderPath = skin.minimum_slider_path;
    this.minimumSliderSize = skin.minimum_slider_size;
    this.minimumSliderRepeat = skin.minimum_slider_repeat;
    this.minimumSliderBoxShadowColor = skin.minimum_slider_box_shadow_color;
    this.minimumModulatorPath = skin.minimum_modulator_path;
    this.minimumModulatorSize = skin.minimum_modulator_size;
    this.minimumModulatorRepeat = skin.minimum_modulator_repeat;
    this.minimumModulatorBoxShadowColor = skin.minimum_modulator_box_shadow_color;
    this.maximumDisplayPath = skin.maximum_display_path;
    this.maximumDisplaySize = skin.maximum_display_size;
    this.maximumDisplayRepeat = skin.maximum_display_repeat;
    this.maximumDisplayBoxShadowColor = skin.maximum_display_box_shadow_color;
    this.maximumSliderPath = skin.maximum_slider_path;
    this.maximumSliderSize = skin.maximum_slider_size;
    this.maximumSliderRepeat = skin.maximum_slider_repeat;
    this.maximumSliderBoxShadowColor = skin.maximum_slider_box_shadow_color;
    this.maximumModulatorPath = skin.maximum_modulator_path;
    this.maximumModulatorSize = skin.maximum_modulator_size;
    this.maximumModulatorRepeat = skin.maximum_modulator_repeat;
    this.maximumModulatorBoxShadowColor = skin.maximum_modulator_box_shadow_color;
    this.intervalDisplayPath = skin.interval_display_path;
    this.intervalDisplaySize = skin.interval_display_size;
    this.intervalDisplayRepeat = skin.interval_display_repeat;
    this.intervalDisplayBoxShadowColor = skin.interval_display_box_shadow_color;
    this.intervalSliderPath = skin.interval_slider_path;
    this.intervalSliderSize = skin.interval_slider_size;
    this.intervalSliderRepeat = skin.interval_slider_repeat;
    this.intervalSliderBoxShadowColor = skin.interval_slider_box_shadow_color;
    this.intervalSliderPath = skin.interval_modulator_path;
    this.intervalModulatorSize = skin.interval_modulator_size;
    this.intervalModulatorRepeat = skin.interval_modulator_repeat;
    this.intervalModulatorBoxShadowColor = skin.interval_modulator_box_shadow_color;
    this.slopeDisplayPath = skin.slope_display_path;
    this.slopeDisplaySize = skin.slope_display_size;
    this.slopeDisplayRepeat = skin.slope_display_repeat;
    this.slopeDisplayBoxShadowColor = skin.slope_display_box_shadow_color;
    this.sliderShaderColor1 = skin.slider_shader_color_1;
    this.sliderShaderColor2 = skin.slider_shader_color_2;

    this.dragWidth = 1090;
    this.dragHeight = 453;
    this.horizontalWidth = 900;
    this.horizontalHeight = 320;
    this.verticalWidth = 320;
    this.verticalHeight = 750;

    this.inMotion = false;
    this.displayValue = null;

    // functionality

    this.manageStepContinuousSwitchVertical = (stepContinuousLabel, stepLabel, continuousLabel, stepOrContinuous, continuousHandlerDiv, exponentialCurveHanlderDiv, slopeDiv) => {
      stepContinuousLabel.addEventListener('click', () => {
        if (stepOrContinuous.checked) {
          this.continuous = true;
          stepLabel.setAttribute("style", "float: left; margin: 32px 2px 0 16px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(25px) translateY(-65px);");
          continuousLabel.setAttribute("style", "float: left; margin: 32px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(50px) translateY(-65px)");
          continuousHandlerDiv.setAttribute("style", "margin: 2px 0 2px 4px; visibility: visible;");
          if (this.exponential) {
            exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
            slopeDiv.setAttribute("style", "visibility: visible;");
          } else {
            exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
            slopeDiv.setAttribute("style", "visibility: hidden;");
          }
        } else {
          this.continuous = false;
          stepLabel.setAttribute("style", "float: left; margin: 32px 2px 0 16px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(25px) translateY(-65px);");
          continuousLabel.setAttribute("style", "float: left; margin: 32px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(50px) translateY(-65px)");
          continuousHandlerDiv.setAttribute("style", "margin: 2px 0 2px 4px; visibility: hidden;");
          exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
          slopeDiv.setAttribute("style", "visibility: hidden;");
        }
      });
    }

    this.manageStepContinuousSwitchHorizontal = (stepContinuousLabel, stepLabel, continuousLabel, stepOrContinuous, continuousHandlerDiv, exponentialCurveHanlderDiv) => {
      stepContinuousLabel.addEventListener('click', () => {
        if (stepOrContinuous.checked) {
          this.continuous = true;
          stepLabel.setAttribute("style", "float: left; margin: 32px 2px 0 16px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
          continuousLabel.setAttribute("style", "float: left; margin: 32px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
          continuousHandlerDiv.setAttribute("style", "margin: 2px 0 2px 4px; visibility: visible;");
          if (this.exponential) {
            exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
          } else {
            exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
          }
        } else {
          this.continuous = false;
          stepLabel.setAttribute("style", "float: left; margin: 32px 2px 0 16px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
          continuousLabel.setAttribute("style", "float: left; margin: 32px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
          continuousHandlerDiv.setAttribute("style", "margin: 2px 0 2px 4px; visibility: hidden;");
          exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
        }
      });
    }

    this.manageStepContinuousSwitch = (stepContinuousLabel, stepLabel, continuousLabel, stepOrContinuous, continuousHandlerDiv, exponentialCurveHanlderDiv) => {
      stepContinuousLabel.addEventListener('click', () => {
        if (stepOrContinuous.checked) {
          this.continuous = true;
          stepLabel.setAttribute("style", "float: left; margin: 16px 2px 0 32px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
          continuousLabel.setAttribute("style", "float: left; margin: 16px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
          continuousHandlerDiv.setAttribute("style", "margin: 2px 0 2px 4px; visibility: visible;");
          if (this.exponential) {
            exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
          } else {
            exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
          }
        } else {
          this.continuous = false;
          stepLabel.setAttribute("style", "float: left; margin: 16px 2px 0 32px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
          continuousLabel.setAttribute("style", "float: left; margin: 16px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
          continuousHandlerDiv.setAttribute("style", "margin: 2px 0 2px 4px; visibility: hidden;");
          exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
        }
      });
    }

    this.manageLinearExponentialSwitchVertical = (linearExponentialLabel, linearLabel, exponentialLabel, linearOrExponential, exponentialCurveHanlderDiv, slopeDiv) => {
      linearExponentialLabel.addEventListener('click', () => {
        if (linearOrExponential.checked) {
          this.exponential = true;
          linearLabel.setAttribute("style", "float: left; margin: 16px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-210px) translateY(-10px);");
          exponentialLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(165px) translateY(-85px);");
          exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
          slopeDiv.setAttribute("style", "visibility: visible;");
        } else {
          this.exponential = false;
          linearLabel.setAttribute("style", "float: left; margin: 16px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-210px) translateY(-10px);");
          exponentialLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(165px) translateY(-85px);");
          exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
          slopeDiv.setAttribute("style", "visibility: hidden;");
        }
      });
    }

    this.manageLinearExponentialSwitchHorizontal = (linearExponentialLabel, linearLabel, exponentialLabel, linearOrExponential, exponentialCurveHanlderDiv) => {
      linearExponentialLabel.addEventListener('click', () => {
        if (linearOrExponential.checked) {
          this.exponential = true;
          linearLabel.setAttribute("style", "float: left; margin: 16px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-140px);");
          exponentialLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(160px) translateY(-40px);");
          exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
        } else {
          this.exponential = false;
          linearLabel.setAttribute("style", "float: left; margin: 16px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-140px);");
          exponentialLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(160px) translateY(-40px);");
          exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
        }
      });
    }

    this.manageLinearExponentialSwitch = (linearExponentialLabel, linearLabel, exponentialLabel, linearOrExponential, exponentialCurveHanlderDiv) => {
      linearExponentialLabel.addEventListener('click', () => {
        if (linearOrExponential.checked) {
          this.exponential = true;
          linearLabel.setAttribute("style", "float: left; margin: 16px 2px 0 32px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
          exponentialLabel.setAttribute("style", "float: left; margin: 18px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
          exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
        } else {
          this.exponential = false;
          linearLabel.setAttribute("style", "float: left; margin: 22px 2px 0 26px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
          exponentialLabel.setAttribute("style", "float: left; margin: 18px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
          exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
        }
      });
    }

    this.manageConcaveConvexSwitchVertical = (concaveConvexLabel, concaveLabel, convexLabel, concaveOrConvex) => {
      concaveConvexLabel.addEventListener('click', () => {
        if (concaveOrConvex.checked) {
          this.convex = true;
          concaveLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-83px) translateY(-50px);");
          convexLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-61px) translateY(-50px)");
        } else {
          this.convex = false;
          concaveLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-83px) translateY(-50px);");
          convexLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-61px) translateY(-50px);");
        }
      });
    }

    this.manageConcaveConvexSwitchHorizontal = (concaveConvexLabel, concaveLabel, convexLabel, concaveOrConvex) => {
      concaveConvexLabel.addEventListener('click', () => {
        if (concaveOrConvex.checked) {
          this.convex = true;
          concaveLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-78px) translateY(-3px);");
          convexLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-56px) translateY(-3px)");
        } else {
          this.convex = false;
          concaveLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-78px) translateY(-3px);");
          convexLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-56px) translateY(-3px);");
        }
      });
    }

    this.manageConcaveConvexSwitch = (concaveConvexLabel, concaveLabel, convexLabel, concaveOrConvex) => {
      concaveConvexLabel.addEventListener('click', () => {
        if (concaveOrConvex.checked) {
          this.convex = true;
          concaveLabel.setAttribute("style", "float: left; margin: 16px 2px 0 32px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
          convexLabel.setAttribute("style", "float: left; margin: 18px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
        } else {
          this.convex = false;
          concaveLabel.setAttribute("style", "float: left; margin: 22px 2px 0 26px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
          convexLabel.setAttribute("style", "float: left; margin: 18px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
        }
      });
    }

    this.manageDecreaseSlope = (decreaseSlope, slopeAmount) => {
      decreaseSlope.addEventListener('click', () => {
        if (this.slope !== 1) {
          --this.slope;
          slopeAmount.value = this.slope;
        }
      });
    }

    this.manageIncreaseSlope = (increaseSlope, slopeAmount) => {
      increaseSlope.addEventListener('click', () => {
        if (this.slope !== 1024) {
          ++this.slope;
          slopeAmount.value = this.slope;
        }
      });
    }

    this.manageSlopeInput = (slopeAmount) => {
      slopeAmount.addEventListener('change', () => {
        this.slope = slopeAmount.value;
      });
    }

    this.manageMinimumAmount = (minimumDisplay, minimumSlider) => {

      minimumDisplay.addEventListener('change', () => {
        this.minimum = minimumDisplay.value;
        minimumSlider.value = this.minimum;
      });

      minimumSlider.addEventListener('mousemove', () => {
        this.minimum = minimumSlider.value;
        minimumDisplay.value = this.minimum;
      });
    }

    this.manageMaximumAmount = (maximumDisplay, maximumSlider) => {

      maximumDisplay.addEventListener('change', () => {
        this.maximum = maximumDisplay.value;
        maximumSlider.value = this.maximum;
      });

      maximumSlider.addEventListener('mousemove', () => {
        this.maximum = maximumSlider.value;
        maximumDisplay.value = this.maximum;
      });
    }

    this.manageIntervalAmount = (intervalDisplay, intervalSlider) => {

      intervalDisplay.addEventListener('change', () => {
        this.interval = intervalDisplay.value;
        intervalSlider.value = this.interval;
      });

      intervalSlider.addEventListener('mousemove', () => {
        this.interval = intervalSlider.value;
        intervalDisplay.value = this.interval;
      });
    }

    // Random Number Generation

    this.eventOn = () => {
      this.inMotion = true;

      function generateValue(min, max) {
        let span = (max - min);
        let randy = ((Math.random() * span) + min).toFixed(3);

        return(randy);
      }

      function stepRandomsOverInterval(obj) {
        obj.displayValue.innerHTML = generateValue(parseFloat(obj.minimum), parseFloat(obj.maximum));
        setTimeout(() => {
          if(obj.inMotion) {
            stepRandomsOverInterval(obj);
          }
        }, parseInt(obj.interval));
      }

      function stepSize(start, end, duration) {
        let step = 0;
        let span = (parseFloat(end) - parseFloat(start));
        step = span/(parseInt(duration));

        return(step);
      }

      function linearStreamBetweenTwoValues(obj, start, end, duration, step) {
        console.log(step);
        let value = parseFloat(start);
        if (duration === 0) {
          value = parseFloat(end);
          obj.displayValue.innerHTML = value.toFixed(3);
          if (obj.inMotion) {
            linearRandomOverInterval(obj, end);
          }
        } else {
          obj.displayValue.innerHTML = value.toFixed(3);
          setTimeout(() => {
            if (obj.inMotion) {
              linearStreamBetweenTwoValues(obj, (parseFloat(start) + parseFloat(step)), end, (parseInt(duration) - 1), step);
            }
          }, 1);
        }
      }

      function linearRandomOverInterval(obj, start) {
        let startPoint = start;
        let endPoint = generateValue(parseFloat(obj.minimum), parseInt(obj.maximum));
        if (startPoint === null) {
          startPoint = generateValue(parseFloat(obj.minimum), parseInt(obj.maximum));
        }
        if (obj.inMotion) {
          console.log(stepSize(startPoint, endPoint, parseInt(obj.interval)));
          linearStreamBetweenTwoValues(obj, startPoint, endPoint, parseInt(obj.interval), stepSize(startPoint, endPoint, parseInt(obj.interval)));
        }
      }

      function calculateConvexSlopeArray(obj, start, end) {
        const startPoint = parseFloat(start);
        const endPoint = parseFloat(end);
        let subStart = startPoint;
        let duration = parseInt(obj.interval);
        let arr = [];
        let slope = parseInt(obj.slope);
        if (slope > duration) {
          while(slope > duration) {
            slope = Math.floor(slope/2);
          }
        }
        const slopeStep = Math.floor(duration/slope);
        let span = (endPoint - startPoint);
        let subEnd = (span/2) + startPoint;

        for (let i = 0; i < slope; i++) {
          if (i === 0) {
            arr[i] = {
              start: startPoint,
              end: subEnd,
              stepSize: stepSize(startPoint, subEnd, slopeStep),
              duration: slopeStep
            };
            span = (endPoint - subEnd);
            subStart = subEnd;
            subEnd = (span/2) + subStart;
          } else if (i === (slope - 1)) {
            arr[i] = {
              start: subStart,
              end: endPoint,
              stepSize: stepSize(subStart, endPoint, slopeStep),
              duration: slopeStep
            };
          } else {
            arr[i] = {
              start: subStart,
              end: subEnd,
              stepSize: stepSize(subStart, subEnd, slopeStep),
              duration: slopeStep
            };
            span = (endPoint - subEnd);
            subStart = subEnd;
            subEnd = (span/2) + subStart;
          }
        }

        return(arr);
      }

      function calculateConcaveSlopeArray(obj, start, end) {
        const startPoint = parseFloat(start);
        const endPoint= parseFloat(end);
        let subEnd = endPoint;
        let duration = parseInt(obj.interval);
        let arr = [];
        let slope = parseInt(obj.slope);
        if (slope > duration) {
          while(slope > duration) {
            slope = Math.floor(slope/2);
          }
        }
        const slopeStep = Math.floor(duration/slope);
        let span = (endPoint - startPoint);
        let subStart = (span/2) + startPoint;

        for (let i = (slope - 1); i > -1; i--) {
          if (i === (slope - 1)) {
            arr[i] = {
              start: subStart,
              end: subEnd,
              stepSize: stepSize(subStart, subEnd, slopeStep),
              duration: slopeStep
            };
            span = (subStart - startPoint);
            subEnd = subStart;
            subStart = (span/2) + startPoint;
          } else if (i === 0) {
            arr[i] = {
              start: startPoint,
              end: subEnd,
              stepSize: stepSize(startPoint, subEnd, slopeStep),
              duration: slopeStep
            };
          } else {
            arr[i] = {
              start: subStart,
              end: subEnd,
              stepSize: stepSize(subStart, subEnd, slopeStep),
              duration: slopeStep
            };
            span = (subStart - startPoint);
            subEnd = subStart;
            subStart = (span/2) + startPoint;
          }
        }

        console.log(arr);

        return(arr);
      }

      function cycleExponentialSet(obj, arr, type, start) {
        if (arr.length === 0) {
          obj.displayValue.innerHTML = parseFloat(start).toFixed(3);
          if (obj.inMotion) {
            if (type === 'concave') {
              exponentialConcaveOverInterval(obj, start);
            } else {
              exponentialConvexOverInterval(obj, start);
            }
          }
          return;
        }
        if (arr[0].duration === 0) {
          obj.displayValue.innerHTML = arr[0].end.toFixed(3);
          cycleExponentialSet(obj, arr.slice(1), type, start);
        } else {
          obj.displayValue.innerHTML = parseFloat(start).toFixed(3);
          arr[0].start += arr[0].stepSize;
          --arr[0].duration;
          setTimeout(() => {
            if (obj.inMotion) {
              cycleExponentialSet(obj, arr, type, arr[0].start);
            }
          }, 1);
        }
      }

      function exponentialConvexOverInterval(obj, start) {
        let startPoint = start;
        let endPoint = generateValue(parseFloat(obj.minimum), parseFloat(obj.maximum));
        if (start === null) {
          startPoint = generateValue(parseFloat(obj.minimum), parseFloat(obj.maximum));
        }
        let convexSlope = calculateConvexSlopeArray(obj, startPoint, endPoint);
        cycleExponentialSet(obj, convexSlope, 'convex', startPoint);
      }


      function exponentialConcaveOverInterval(obj, start) {
        let startPoint = start;
        let endPoint = generateValue(parseFloat(obj.minimum), parseFloat(obj.maximum));
        if (start === null) {
          startPoint = generateValue(parseFloat(obj.minimum), parseFloat(obj.maximum));
        }
        let concaveSlope = calculateConcaveSlopeArray(obj, startPoint, endPoint);
        cycleExponentialSet(obj, concaveSlope, 'concave', startPoint);
      }

      if (this.continuous) {
        if (this.exponential) {
          if (this.convex) {
            if (parseInt(this.interval) === 0) {
              this.displayValue.innerHTML = generateValue(parseFloat(this.minimum), parseFloat(this.maximum));
            } else {
              exponentialConvexOverInterval(this, null);
            }
          } else {
            if (parseInt(this.interval) === 0) {
              this.displayValue.innerHTML = generateValue(parseFloat(this.minimum), parseFloat(this.maximum));
            } else {
              exponentialConcaveOverInterval(this, null);
            }
          }
        } else {
          if (parseInt(this.interval) === 0) {
            this.displayValue.innerHTML = generateValue(parseFloat(this.minimum), parseFloat(this.maximum));
          } else {
            linearRandomOverInterval(this, null);
          }
        }

      } else {
        if (parseInt(this.interval) === 0) {
          this.displayValue.innerHTML = generateValue(parseFloat(this.minimum), parseFloat(this.maximum));
        } else {
          stepRandomsOverInterval(this);
        }
      }
    }

    this.eventOff = () => {
      this.inMotion = false;
      this.displayValue.innerHTML = '';
    }

    // Rendering Functions

    this.renderDraggable = () => {

      let div = document.createElement('div');
      let randomNumberGeneratorTop = document.createElement('div');
      div.appendChild(randomNumberGeneratorTop);
      let nameTag = document.createElement('h1');
      randomNumberGeneratorTop.appendChild(nameTag);
      let signalPanel = document.createElement('div');
      div.appendChild(signalPanel);
      let outputLabel = document.createElement('p');
      signalPanel.appendChild(outputLabel);
      outputLabel.innerHTML = 'out';
      let outputPort = document.createElement('h1');
      signalPanel.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let face = document.createElement('div');
      div.appendChild(face);
      let outputDiv = document.createElement('div');
      face.appendChild(outputDiv);
      let outputDisplayLabel = document.createElement('p');
      outputDiv.appendChild(outputDisplayLabel);
      outputDisplayLabel.innerHTML = 'output value';
      let outputDisplay = document.createElement('div');
      outputDiv.appendChild(outputDisplay);
      this.displayValue = outputDisplay;
      let stepOrContinuousDiv = document.createElement('div');
      outputDiv.appendChild(stepOrContinuousDiv);
      let stepLabel = document.createElement('p');
      stepOrContinuousDiv.appendChild(stepLabel);
      stepLabel.innerHTML = 'step';
      let stepContinuousLabel = document.createElement('label');
      stepOrContinuousDiv.appendChild(stepContinuousLabel);
      let stepOrContinuous = document.createElement('input');
      stepContinuousLabel.appendChild(stepOrContinuous);
      stepOrContinuous.type = 'checkbox';
      stepOrContinuous.checked = this.continuous;
      let continuousRoundSlider = document.createElement('span');
      stepContinuousLabel.appendChild(continuousRoundSlider);
      continuousRoundSlider.className = 'slider round';
      let continuousLabel = document.createElement('p');
      stepOrContinuousDiv.appendChild(continuousLabel);
      continuousLabel.innerHTML = 'continuous';
      let continuousHandlerDiv = document.createElement('div');
      outputDiv.appendChild(continuousHandlerDiv);
      let linearOrExponentialDiv = document.createElement('div');
      continuousHandlerDiv.appendChild(linearOrExponentialDiv);
      let linearLabel = document.createElement('p');
      linearOrExponentialDiv.appendChild(linearLabel);
      linearLabel.innerHTML = 'linear';
      let linearExponentialLabel = document.createElement('label');
      linearOrExponentialDiv.appendChild(linearExponentialLabel);
      let linearOrExponential = document.createElement('input');
      linearExponentialLabel.appendChild(linearOrExponential);
      linearOrExponential.type = 'checkbox';
      linearOrExponential.checked = this.exponential;
      let exponentialRoundSlider = document.createElement('span');
      linearExponentialLabel.appendChild(exponentialRoundSlider);
      exponentialRoundSlider.className = 'slider round';
      let exponentialLabel = document.createElement('p');
      linearOrExponentialDiv.appendChild(exponentialLabel);
      exponentialLabel.innerHTML = 'exponential';
      let exponentialCurveHanlderDiv = document.createElement('div');
      continuousHandlerDiv.appendChild(exponentialCurveHanlderDiv);
      let concaveOrConvexDiv = document.createElement('div');
      exponentialCurveHanlderDiv.appendChild(concaveOrConvexDiv);
      let concaveLabel = document.createElement('p');
      concaveOrConvexDiv.appendChild(concaveLabel);
      concaveLabel.innerHTML = 'concave';
      let concaveConvexLabel = document.createElement('label');
      concaveOrConvexDiv.appendChild(concaveConvexLabel);
      let concaveOrConvex = document.createElement('input');
      concaveConvexLabel.appendChild(concaveOrConvex);
      concaveOrConvex.type = 'checkbox';
      concaveOrConvex.checked = this.convex;
      let concaveSwitch = document.createElement('span');
      concaveConvexLabel.appendChild(concaveSwitch);
      concaveSwitch.className = "slider round";
      let convexLabel = document.createElement('p');
      concaveOrConvexDiv.appendChild(convexLabel);
      convexLabel.innerHTML = 'convex';
      let slopeDiv = document.createElement('div');
      exponentialCurveHanlderDiv.appendChild(slopeDiv);
      let slopeLabel = document.createElement('p');
      slopeDiv.appendChild(slopeLabel);
      slopeLabel.innerHTML = 'slope:';
      let decreaseSlope = document.createElement('button');
      slopeDiv.appendChild(decreaseSlope);
      decreaseSlope.innerHTML = '-';
      let slopeAmount = document.createElement('input');
      slopeDiv.appendChild(slopeAmount);
      slopeAmount.type = 'number';
      slopeAmount.min = '1';
      slopeAmount.max = '1024';
      slopeAmount.value = this.slope;
      let increaseSlope = document.createElement('button');
      slopeDiv.appendChild(increaseSlope);
      increaseSlope.innerHTML = '+';
      let minimumDiv = document.createElement('div');
      face.appendChild(minimumDiv);
      let minimumLabel = document.createElement('p');
      minimumDiv.appendChild(minimumLabel);
      minimumLabel.innerHTML = 'minimum';
      let minimumDisplay = document.createElement('input');
      minimumDiv.appendChild(minimumDisplay);
      minimumDisplay.type = 'number';
      minimumDisplay.step = '0.001';
      minimumDisplay.min = '-1024.000';
      minimumDisplay.max = '1024.000';
      minimumDisplay.value = this.minimum;
      let minimumSlider = document.createElement('input');
      minimumDiv.appendChild(minimumSlider);
      minimumSlider.type = 'range';
      minimumSlider.min = '-1024.000';
      minimumSlider.max = '1024.000';
      minimumSlider.step = '0.001';
      minimumSlider.value = this.minimum;
      let minimumModLabel = document.createElement('p');
      minimumDiv.appendChild(minimumModLabel);
      minimumModLabel.innerHTML = 'modulation:';
      let minimumModInput = document.createElement('h1');
      minimumDiv.appendChild(minimumModInput);
      minimumModInput.innerHTML = '◦';
      minimumModInput.id = 'minimum modulation input: ' + this.name + this.id;
      let maximumDiv = document.createElement('div');
      face.appendChild(maximumDiv);
      let maximumLabel = document.createElement('p');
      maximumDiv.appendChild(maximumLabel);
      maximumLabel.innerHTML = 'maximum';
      let maximumDisplay = document.createElement('input');
      maximumDiv.appendChild(maximumDisplay);
      maximumDisplay.type = 'number';
      maximumDisplay.step = '0.001';
      maximumDisplay.min = '-1024.000';
      maximumDisplay.max = '1024.000';
      maximumDisplay.value = this.maximum;
      let maximumSlider = document.createElement('input');
      maximumDiv.appendChild(maximumSlider);
      maximumSlider.type = 'range';
      maximumSlider.step = '0.001';
      maximumSlider.min = '-1024.000';
      maximumSlider.max = '1024.000';
      maximumSlider.value = this.maximum;
      let maximumModLabel = document.createElement('p');
      maximumDiv.appendChild(maximumModLabel);
      maximumModLabel.innerHTML = 'modulation:';
      let maximumModInput = document.createElement('h1');
      maximumDiv.appendChild(maximumModInput);
      maximumModInput.innerHTML = '◦';
      maximumModInput.id = 'maximum modulation input: ' + this.name + this.id;
      let intervalDiv = document.createElement('div');
      face.appendChild(intervalDiv);
      let intervalLabel = document.createElement('p');
      intervalDiv.appendChild(intervalLabel);
      intervalLabel.innerHTML = 'interval(ms)';
      let intervalDisplay = document.createElement('input');
      intervalDiv.appendChild(intervalDisplay);
      intervalDisplay.type = 'number';
      intervalDisplay.step = '1';
      intervalDisplay.min = '0';
      intervalDisplay.max = '60000';
      intervalDisplay.value = this.interval;
      let intervalSlider = document.createElement('input');
      intervalDiv.appendChild(intervalSlider);
      intervalSlider.type = 'range';
      intervalSlider.step = '1';
      intervalSlider.min = '0';
      intervalSlider.max = '60000';
      intervalSlider.value = this.interval;
      let intervalModLabel = document.createElement('p');
      intervalDiv.appendChild(intervalModLabel);
      intervalModLabel.innerHTML = 'modulation:';
      let intervalModInput = document.createElement('h1');
      intervalDiv.appendChild(intervalModInput);
      intervalModInput.innerHTML = '◦';
      intervalModInput.id = 'interval modulation input: ' + this.name + this.id;


      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5);");
      randomNumberGeneratorTop.setAttribute("style", "width: 100%; background: url(" + this.topPath + "); background-size: " + this.topSize + "; font-family: 'Righteous', cursive; height: 60px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + this.topRepeat + ";");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 40px; margin-left: 2em; margin-top: 6em; color: " + this.topFontColor + "; font-weight: 600; text-shadow: 1px 1px 1px " + this.topFontShadowColor + ", 2px 2px 1px " + this.topFontShadowColor + ";");
      signalPanel.setAttribute("style", "background: url(" + this.signalPath + "); background-size: " + this.signalSize + "; border: solid 1px transparent; height: " + this.dragHeight + "px; width: 59px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: -6px; margin-top: -26px; box-shadow: 0px -1px 1px " + this.signalFontShadowColor + ";");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 2px; margin-top: 188px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      face.setAttribute("style", "height: " + this.dragHeight + "px; width: 100%; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: " + this.faceRepeat + "; margin-top: -425px; margin-left: 59px; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ";");
      outputDiv.setAttribute("style", "float: left; width: " + ((this.dragWidth/5) * 2) + "px; height: " + this.dragHeight + "px; background: transparent;");
      outputDisplayLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 36px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; margin: 2px 0 2px 10px;");
      outputDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 72px; background: url(" + this.displayPath + "); background-size: " + this.outputDisplaySize + "; box-shadow: -1px -1px 1px" + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; height: 96px; width: 90%; margin: 6px 5px 2px 15px;");
      stepOrContinuousDiv.setAttribute("style", "margin: 2px 0 2px 4px;");
      if (this.continuous) {
        stepLabel.setAttribute("style", "float: left; margin: 16px 2px 0 32px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
        continuousLabel.setAttribute("style", "float: left; margin: 16px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
        continuousHandlerDiv.setAttribute("style", "margin: 2px 0 2px 4px; visibility: visible;");
      } else {
        stepLabel.setAttribute("style", "float: left; margin: 16px 2px 0 32px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
        continuousLabel.setAttribute("style", "float: left; margin: 16px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
        continuousHandlerDiv.setAttribute("style", "margin: 2px 0 2px 4px; visibility: hidden;");
      }
      stepContinuousLabel.setAttribute("style", "position: relative; float: left; display: inline-block; width: 60px; height: 34px; margin: 21px 20px 4px 20px;");
      stepOrContinuous.setAttribute("style", "display: none;");
      if (this.exponential) {
        linearLabel.setAttribute("style", "float: left; margin: 16px 2px 0 32px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
        exponentialLabel.setAttribute("style", "float: left; margin: 18px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
        exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
      } else {
        linearLabel.setAttribute("style", "float: left; margin: 22px 2px 0 26px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
        exponentialLabel.setAttribute("style", "float: left; margin: 18px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
        exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
      }
      linearExponentialLabel.setAttribute("style", "position: relative; float: left; display: inline-block; width: 60px; height: 34px; margin: 21px 20px 4px 20px; z-index: 6;");
      linearOrExponential.setAttribute("style", "display: none;");
      concaveOrConvexDiv.setAttribute("style", "margin: 2px 0 2px 4px;");
      if (this.convex) {
        concaveLabel.setAttribute("style", "float: left; margin: 16px 2px 0 32px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
        convexLabel.setAttribute("style", "float: left; margin: 18px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
      } else {
        concaveLabel.setAttribute("style", "float: left; margin: 22px 2px 0 26px; font-family: 'Righteous', cursive; font-size: 36px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
        convexLabel.setAttribute("style", "float: left; margin: 18px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 36px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
      }
      concaveConvexLabel.setAttribute("style", "position: relative; float: left; display: inline-block; width: 60px; height: 34px; margin: 26px 20px 4px 10px; z-index; 6;");
      concaveOrConvex.setAttribute("style", "display: none;");
      slopeDiv.setAttribute("style", "margin: 2px 0 2px 4px;");
      slopeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 36px; color: #2F4F4F; text-shadow: -1px -1px 1px #999900, -2px -2px 1px #999900; opacity: 1.0; left: -230px; top: 30px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
      decreaseSlope.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; cursor: pointer; margin 0 1px; border: solid 1px " + this.faceFontShadowColor + "; border-radius: 10%; padding: 1vmin; background-color: #eeeeee; background-color: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -o-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); box-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; color: " + this.faceFontColor + "; width: 50px; position: relative; transform: translateX(125px) translateY(-150px);");
      slopeAmount.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; background: url(" + this.slopeDisplayPath + "); background-size: " + this.slopeDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + ", -4px -4px 1px " + this.faceFontShadowColor + "; height: 70px; position: relative; transform: translateX(140px) translateY(-145px);");
      increaseSlope.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; cursor: pointer; margin 0 1px; border: solid 1px " + this.faceFontShadowColor + "; border-radius: 10%; padding: 1vmin; background-color: #eeeeee; background-color: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -o-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); box-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; color: " + this.faceFontColor + "; width: 50px; position: relative; transform: translateX(135px) translateY(-150px);");
      minimumDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px; background: transparent;");
      minimumLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 36px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; margin: 2px 0 2px 10px;");
      minimumDisplay.setAttribute("style", "position: relative; margin: 8px; font-family: 'Righteous', cursive; font-size: 36px; background: url(" + this.minimumDisplayPath + "); background-size: " + this.minimumDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; padding-left: 1vmin; width: 85%;");
      minimumSlider.setAttribute("style", "position: relative; -webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg) translateX(-150px) translateY(24px); width: 325px; height: 36px; background: url(" + this.minimumSliderPath + "); background-size: " + this.minimumSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.minimumSliderBoxShadowColor + ", 2px -2px 1px " + this.minimumSliderBoxShadowColor + ", 3px -3px 1px " + this.minimumSliderBoxShadowColor + ", 4px -4px 1px " + this.minimumSliderBoxShadowColor + ";");
      switch(this.skinName) {
        case('Random Number Generator: January A'):
          minimumSlider.className = 'randomNumberGeneratorJanuaryASlider';
          maximumSlider.className = 'randomNumberGeneratorJanuaryASlider';
          intervalSlider.className = 'randomNumberGeneratorJanuaryASlider';
          break;
        case('Random Number Generator: January B'):
          minimumSlider.className = 'randomNumberGeneratorJanuaryBSlider';
          maximumSlider.className = 'randomNumberGeneratorJanuaryBSlider';
          intervalSlider.className = 'randomNumberGeneratorJanuaryBSlider';
          break;
        case('Random Number Generator: January C'):
          minimumSlider.className = 'randomNumberGeneratorJanuaryCSlider';
          maximumSlider.className = 'randomNumberGeneratorJanuaryCSlider';
          intervalSlider.className = 'randomNumberGeneratorJanuaryCSlider';
          break;
        case('Random Number Generator: February A'):
          minimumSlider.className = 'randomNumberGeneratorFebruaryASlider';
          maximumSlider.className = 'randomNumberGeneratorFebruaryASlider';
          intervalSlider.className = 'randomNumberGeneratorFebruaryASlider';
          break;
        case('Random Number Generator: February B'):
          minimumSlider.className = 'randomNumberGeneratorFebruaryBSlider';
          maximumSlider.className = 'randomNumberGeneratorFebruaryBSlider';
          intervalSlider.className = 'randomNumberGeneratorFebruaryBSlider';
          break;
        case('Random Number Generator: February C'):
          minimumSlider.className = 'randomNumberGeneratorFebruaryCSlider';
          maximumSlider.className = 'randomNumberGeneratorFebruaryCSlider';
          intervalSlider.className = 'randomNumberGeneratorFebruaryCSlider';
          break;
        case('Random Number Generator: March A'):
          minimumSlider.className = 'randomNumberGeneratorMarchASlider';
          maximumSlider.className = 'randomNumberGeneratorMarchASlider';
          intervalSlider.className = 'randomNumberGeneratorMarchASlider';
          break;
        case('Random Number Generator: March B'):
          minimumSlider.className = 'randomNumberGeneratorMarchBSlider';
          maximumSlider.className = 'randomNumberGeneratorMarchBSlider';
          intervalSlider.className = 'randomNumberGeneratorMarchBSlider';
          break;
        case('Random Number Generator: March C'):
          minimumSlider.className = 'randomNumberGeneratorMarchCSlider';
          maximumSlider.className = 'randomNumberGeneratorMarchCSlider';
          intervalSlider.className = 'randomNumberGeneratorMarchCSlider';
          break;
        case('Random Number Generator: April A'):
          minimumSlider.className = 'randomNumberGeneratorAprilASlider';
          maximumSlider.className = 'randomNumberGeneratorAprilASlider';
          intervalSlider.className = 'randomNumberGeneratorAprilASlider';
          break;
        case('Random Number Generator: April B'):
          minimumSlider.className = 'randomNumberGeneratorAprilBSlider';
          maximumSlider.className = 'randomNumberGeneratorAprilBSlider';
          intervalSlider.className = 'randomNumberGeneratorAprilBSlider';
          break;
        case('Random Number Generator: April C'):
          minimumSlider.className = 'randomNumberGeneratorAprilCSlider';
          maximumSlider.className = 'randomNumberGeneratorAprilCSlider';
          intervalSlider.className = 'randomNumberGeneratorAprilCSlider';
          break;
        default:
          console.log('unsupported random number generator skin');
      }
      minimumModLabel.setAttribute("style", "position: relative; color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 24px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(15px) translateY(120px);");
      minimumModInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 35px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding: 2px 9px; transform: translateX(50px) translateY(100px);");
      maximumDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px; background: transparent;");
      maximumLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 36px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; margin: 2px 0 2px 10px;");
      maximumDisplay.setAttribute("style", "position: relative; margin: 8px; font-family: 'Righteous', cursive; font-size: 36px; background: url(" + this.maximumDisplayPath + "); background-size: " + this.minimumDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; padding-left: 1vmin; width: 85%;");
      maximumSlider.setAttribute("style", "position: relative; -webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg) translateX(-150px) translateY(24px); width: 325px; height: 36px; background: url(" + this.maximumSliderPath + "); background-size: " + this.maximumSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.maximumSliderBoxShadowColor + ", 2px -2px 1px " + this.maximumSliderBoxShadowColor + ", 3px -3px 1px " + this.maximumSliderBoxShadowColor + ", 4px -4px 1px " + this.maximumSliderBoxShadowColor + ";");
      maximumModLabel.setAttribute("style", "position: relative; color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 24px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(15px) translateY(120px);");
      maximumModInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 35px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding: 2px 9px; transform: translateX(50px) translateY(100px);");
      intervalDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px; background: transparent;");
      intervalLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 36px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; margin: 2px 0 2px 10px;");
      intervalDisplay.setAttribute("style", "position: relative; margin: 8px; font-family: 'Righteous', cursive; font-size: 36px; background: url(" + this.maximumDisplayPath + "); background-size: " + this.minimumDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; padding-left: 1vmin; width: 85%;");
      intervalSlider.setAttribute("style", "position: relative; -webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg) translateX(-150px) translateY(24px); width: 325px; height: 36px; background: url(" + this.intervalDisplayPath + "); background-size: " + this.intervalSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.intervalSliderBoxShadowColor + ", 2px -2px 1px " + this.intervalSliderBoxShadowColor + ", 3px -3px 1px " + this.intervalSliderBoxShadowColor + ", 4px -4px 1px " + this.intervalSliderBoxShadowColor + ";");
      intervalModLabel.setAttribute("style", "position: relative; color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 24px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(15px) translateY(120px);");
      intervalModInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 35px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding: 2px 9px; transform: translateX(50px) translateY(100px);");


      this.manageStepContinuousSwitch(stepContinuousLabel, stepLabel, continuousLabel, stepOrContinuous, continuousHandlerDiv, exponentialCurveHanlderDiv);

      this.manageLinearExponentialSwitch(linearExponentialLabel, linearLabel, exponentialLabel, linearOrExponential, exponentialCurveHanlderDiv);

      this.manageConcaveConvexSwitch(concaveConvexLabel, concaveLabel, convexLabel, concaveOrConvex);

      this.manageDecreaseSlope(decreaseSlope, slopeAmount);

      this.manageIncreaseSlope(increaseSlope, slopeAmount);

      this.manageSlopeInput(slopeAmount);

      this.manageMinimumAmount(minimumDisplay, minimumSlider);

      this.manageMaximumAmount(maximumDisplay, maximumSlider);

      this.manageIntervalAmount(intervalDisplay, intervalSlider);

      function dragElement(element, obj) {

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (randomNumberGeneratorTop) {
          randomNumberGeneratorTop.onmousedown = dragMouseDown;
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

      minimumModInput.addEventListener('click', () => {
        alert(minimumModInput.id);
      });

      maximumModInput.addEventListener('click', () => {
        alert(maximumModInput.id);
      });

      intervalModInput.addEventListener('click', () => {
        alert(intervalModInput.id);
      });

      return(div);
    }

    this.renderRackHorizontal = (x, y) => {
      let div = document.createElement('div');
      let nameAndOutputDiv = document.createElement('div');
      div.appendChild(nameAndOutputDiv);
      let nameTag = document.createElement('h1');
      nameAndOutputDiv.appendChild(nameTag);
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let outputDiv = document.createElement('div');
      div.appendChild(outputDiv);
      let outputDisplayLabel = document.createElement('p');
      outputDiv.appendChild(outputDisplayLabel);
      outputDisplayLabel.innerHTML = 'output value';
      let outputDisplay = document.createElement('div');
      outputDiv.appendChild(outputDisplay);
      this.displayValue = outputDisplay;
      let stepOrContinuousDiv = document.createElement('div');
      outputDiv.appendChild(stepOrContinuousDiv);
      let stepLabel = document.createElement('p');
      stepOrContinuousDiv.appendChild(stepLabel);
      stepLabel.innerHTML = 'step';
      let stepContinuousLabel = document.createElement('label');
      stepOrContinuousDiv.appendChild(stepContinuousLabel);
      let stepOrContinuous = document.createElement('input');
      stepContinuousLabel.appendChild(stepOrContinuous);
      stepOrContinuous.type = 'checkbox';
      stepOrContinuous.checked = this.continuous;
      let continuousRoundSlider = document.createElement('span');
      stepContinuousLabel.appendChild(continuousRoundSlider);
      continuousRoundSlider.className = 'slider round';
      let continuousLabel = document.createElement('p');
      stepOrContinuousDiv.appendChild(continuousLabel);
      continuousLabel.innerHTML = 'continuous';
      let continuousHandlerDiv = document.createElement('div');
      outputDiv.appendChild(continuousHandlerDiv);
      let linearOrExponentialDiv = document.createElement('div');
      continuousHandlerDiv.appendChild(linearOrExponentialDiv);
      let linearLabel = document.createElement('p');
      linearOrExponentialDiv.appendChild(linearLabel);
      linearLabel.innerHTML = 'linear';
      let linearExponentialLabel = document.createElement('label');
      linearOrExponentialDiv.appendChild(linearExponentialLabel);
      let linearOrExponential = document.createElement('input');
      linearExponentialLabel.appendChild(linearOrExponential);
      linearOrExponential.type = 'checkbox';
      linearOrExponential.checked = this.exponential;
      let exponentialRoundSlider = document.createElement('span');
      linearExponentialLabel.appendChild(exponentialRoundSlider);
      exponentialRoundSlider.className = 'slider round';
      let exponentialLabel = document.createElement('p');
      linearOrExponentialDiv.appendChild(exponentialLabel);
      exponentialLabel.innerHTML = 'exponential';
      let exponentialCurveHanlderDiv = document.createElement('div');
      continuousHandlerDiv.appendChild(exponentialCurveHanlderDiv);
      let concaveOrConvexDiv = document.createElement('div');
      exponentialCurveHanlderDiv.appendChild(concaveOrConvexDiv);
      let concaveLabel = document.createElement('p');
      concaveOrConvexDiv.appendChild(concaveLabel);
      concaveLabel.innerHTML = 'concave';
      let concaveConvexLabel = document.createElement('label');
      concaveOrConvexDiv.appendChild(concaveConvexLabel);
      let concaveOrConvex = document.createElement('input');
      concaveConvexLabel.appendChild(concaveOrConvex);
      concaveOrConvex.type = 'checkbox';
      concaveOrConvex.checked = this.convex;
      let concaveSwitch = document.createElement('span');
      concaveConvexLabel.appendChild(concaveSwitch);
      concaveSwitch.className = "slider round";
      let convexLabel = document.createElement('p');
      concaveOrConvexDiv.appendChild(convexLabel);
      convexLabel.innerHTML = 'convex';
      let slopeDiv = document.createElement('div');
      exponentialCurveHanlderDiv.appendChild(slopeDiv);
      let slopeLabel = document.createElement('p');
      slopeDiv.appendChild(slopeLabel);
      slopeLabel.innerHTML = 'slope:';
      let decreaseSlope = document.createElement('button');
      slopeDiv.appendChild(decreaseSlope);
      decreaseSlope.innerHTML = '-';
      let slopeAmount = document.createElement('input');
      slopeDiv.appendChild(slopeAmount);
      slopeAmount.type = 'number';
      slopeAmount.min = '1';
      slopeAmount.max = '1024';
      slopeAmount.value = this.slope;
      let increaseSlope = document.createElement('button');
      slopeDiv.appendChild(increaseSlope);
      increaseSlope.innerHTML = '+';
      let minimumDiv = document.createElement('div');
      div.appendChild(minimumDiv);
      let minimumLabel = document.createElement('p');
      minimumDiv.appendChild(minimumLabel);
      minimumLabel.innerHTML = 'minimum';
      let minimumDisplay = document.createElement('input');
      minimumDiv.appendChild(minimumDisplay);
      minimumDisplay.type = 'number';
      minimumDisplay.step = '0.001';
      minimumDisplay.min = '-1024.000';
      minimumDisplay.max = '1024.000';
      minimumDisplay.value = this.minimum;
      let minimumSlider = document.createElement('input');
      minimumDiv.appendChild(minimumSlider);
      minimumSlider.type = 'range';
      minimumSlider.min = '-1024.000';
      minimumSlider.max = '1024.000';
      minimumSlider.step = '0.001';
      minimumSlider.value = this.minimum;
      let minimumModLabel = document.createElement('p');
      minimumDiv.appendChild(minimumModLabel);
      minimumModLabel.innerHTML = 'modulation:';
      let minimumModInput = document.createElement('h1');
      minimumDiv.appendChild(minimumModInput);
      minimumModInput.innerHTML = '◦';
      minimumModInput.id = 'minimum modulation input: ' + this.name + this.id;
      let maximumDiv = document.createElement('div');
      div.appendChild(maximumDiv);
      let maximumLabel = document.createElement('p');
      maximumDiv.appendChild(maximumLabel);
      maximumLabel.innerHTML = 'maximum';
      let maximumDisplay = document.createElement('input');
      maximumDiv.appendChild(maximumDisplay);
      maximumDisplay.type = 'number';
      maximumDisplay.step = '0.001';
      maximumDisplay.min = '-1024.000';
      maximumDisplay.max = '1024.000';
      maximumDisplay.value = this.maximum;
      let maximumSlider = document.createElement('input');
      maximumDiv.appendChild(maximumSlider);
      maximumSlider.type = 'range';
      maximumSlider.step = '0.001';
      maximumSlider.min = '-1024.000';
      maximumSlider.max = '1024.000';
      maximumSlider.value = this.maximum;
      let maximumModLabel = document.createElement('p');
      maximumDiv.appendChild(maximumModLabel);
      maximumModLabel.innerHTML = 'modulation:';
      let maximumModInput = document.createElement('h1');
      maximumDiv.appendChild(maximumModInput);
      maximumModInput.innerHTML = '◦';
      maximumModInput.id = 'maximum modulation input: ' + this.name + this.id;
      let intervalDiv = document.createElement('div');
      div.appendChild(intervalDiv);
      let intervalLabel = document.createElement('p');
      intervalDiv.appendChild(intervalLabel);
      intervalLabel.innerHTML = 'interval(ms)';
      let intervalDisplay = document.createElement('input');
      intervalDiv.appendChild(intervalDisplay);
      intervalDisplay.type = 'number';
      intervalDisplay.step = '1';
      intervalDisplay.min = '0';
      intervalDisplay.max = '60000';
      intervalDisplay.value = this.interval;
      let intervalSlider = document.createElement('input');
      intervalDiv.appendChild(intervalSlider);
      intervalSlider.type = 'range';
      intervalSlider.step = '1';
      intervalSlider.min = '0';
      intervalSlider.max = '60000';
      intervalSlider.value = this.interval;
      let intervalModLabel = document.createElement('p');
      intervalDiv.appendChild(intervalModLabel);
      intervalModLabel.innerHTML = 'modulation:';
      let intervalModInput = document.createElement('h1');
      intervalDiv.appendChild(intervalModInput);
      intervalModInput.innerHTML = '◦';
      intervalModInput.id = 'interval modulation input: ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 5px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadowColor + ", -2px -2px 1px " + this.topFontShadowColor + ";");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 40px; margin-top: 85px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 50px; margin-top: -15px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      outputDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/3) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px; background: transparent; z-index: 96;");
      outputDisplayLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 30px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; margin: 2px 0 2px 10px;");
      outputDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 60px; background: url(" + this.displayPath + "); background-size: " + this.outputDisplaySize + "; box-shadow: -1px -1px 1px" + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; height: 96px; width: 90%; margin: 6px 5px 2px 15px;");
      stepOrContinuousDiv.setAttribute("style", "margin: -16px 0 2px 8px;");
      if (this.continuous) {
        stepLabel.setAttribute("style", "float: left; margin: 32px 2px 0 16px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
        continuousLabel.setAttribute("style", "float: left; margin: 32px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
        continuousHandlerDiv.setAttribute("style", "margin: 2px 0 2px 4px; visibility: visible;");
      } else {
        stepLabel.setAttribute("style", "float: left; margin: 32px 2px 0 16px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0;");
        continuousLabel.setAttribute("style", "float: left; margin: 32px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3;");
        continuousHandlerDiv.setAttribute("style", "margin: 2px 0 2px 4px; visibility: hidden;");
      }
      stepContinuousLabel.setAttribute("style", "position: relative; float: left; display: inline-block; width: 60px; height: 34px; margin: 21px 20px 4px 20px;");
      stepOrContinuous.setAttribute("style", "display: none;");
      if (this.exponential) {
        linearLabel.setAttribute("style", "float: left; margin: 16px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-140px);");
        exponentialLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(160px) translateY(-40px);");
        exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
      } else {
        linearLabel.setAttribute("style", "float: left; margin: 16px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-140px);");
        exponentialLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(160px) translateY(-40px);");
        exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
      }
      linearExponentialLabel.setAttribute("style", "position: relative; float: left; display: inline-block; width: 60px; height: 34px; transform: translateX(-130px) translateY(6px);");
      linearOrExponential.setAttribute("style", "display: none;");
      concaveOrConvexDiv.setAttribute("style", "margin: 2px 0 2px 4px;");
      if (this.convex) {
        concaveLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-78px) translateY(-3px);");
        convexLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-56px) translateY(-3px)");
      } else {
        concaveLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-78px) translateY(-3px);");
        convexLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-56px) translateY(-3px);");
      }
      concaveConvexLabel.setAttribute("style", "position: relative; float: left; display: inline-block; width: 60px; height: 34px; z-index: 6; transform: translateX(-70px) translateY(6px);");
      concaveOrConvex.setAttribute("style", "display: none;");
      slopeDiv.setAttribute("style", "margin: 2px 0 2px 4px;");
      slopeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: #2F4F4F; text-shadow: -1px -1px 1px #999900, -2px -2px 1px #999900; opacity: 1.0; left: -230px; top: 30px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-34px) translateY(30px); z-index: 1; pointer-events: none;");
      decreaseSlope.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; cursor: pointer; border: solid 1px " + this.faceFontShadowColor + "; border-radius: 10%; padding: 1vmin; background-color: #eeeeee; background-color: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -o-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); box-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; color: " + this.faceFontColor + "; height: 40px; width: 40px; position: relative; transform: translateX(125px) translateY(-150px); transform: translateX(55px) translateY(-105px);");
      slopeAmount.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; background: url(" + this.slopeDisplayPath + "); background-size: " + this.slopeDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + ", -4px -4px 1px " + this.faceFontShadowColor + "; height: 35px; position: relative; transform: translateX(65px) translateY(-110px); padding: 0 0 0 5px;");
      increaseSlope.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; cursor: pointer; border: solid 1px " + this.faceFontShadowColor + "; border-radius: 10%; padding: 1vmin; background-color: #eeeeee; background-color: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -o-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); box-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; color: " + this.faceFontColor + "; height: 40px; width: 40px; position: relative; transform: translateX(55px) translateY(-105px);");
      minimumDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px; background: transparent;");
      minimumLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 24px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; margin: 2px 0 2px 10px;");
      minimumDisplay.setAttribute("style", "position: relative; margin: 8px; font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.minimumDisplayPath + "); background-size: " + this.minimumDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; padding-left: 1vmin; width: 85%;");
      minimumSlider.setAttribute("style", "position: relative; -webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg) translateX(-105px) translateY(25px); width: 210px; height: 20px; background: url(" + this.minimumSliderPath + "); background-size: " + this.minimumSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.minimumSliderBoxShadowColor + ", 2px -2px 1px " + this.minimumSliderBoxShadowColor + ", 3px -3px 1px " + this.minimumSliderBoxShadowColor + ", 4px -4px 1px " + this.minimumSliderBoxShadowColor + ";");
      switch(this.skinName) {
        case('Random Number Generator: January A'):
          minimumSlider.className = 'randomNumberGeneratorJanuaryASliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorJanuaryASliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorJanuaryASliderHorizontal';
          break;
        case('Random Number Generator: January B'):
          minimumSlider.className = 'randomNumberGeneratorJanuaryASliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorJanuaryASliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorJanuaryASliderHorizontal';
          break;
        case('Random Number Generator: January C'):
          minimumSlider.className = 'randomNumberGeneratorJanuaryCSliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorJanuaryCSliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorJanuaryCSliderHorizontal';
          break;
        case('Random Number Generator: February A'):
          minimumSlider.className = 'randomNumberGeneratorFebruaryASliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorFebruaryASliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorFebruaryASliderHorizontal';
          break;
        case('Random Number Generator: February B'):
          minimumSlider.className = 'randomNumberGeneratorFebruaryBSliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorFebruaryBSliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorFebruaryBSliderHorizontal';
          break;
        case('Random Number Generator: February C'):
          minimumSlider.className = 'randomNumberGeneratorFebruaryCSliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorFebruaryCSliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorFebruaryCSliderHorizontal';
          break;
        case('Random Number Generator: March A'):
          minimumSlider.className = 'randomNumberGeneratorMarchASliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorMarchASliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorMarchASliderHorizontal';
          break;
        case('Random Number Generator: March B'):
          minimumSlider.className = 'randomNumberGeneratorMarchBSliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorMarchBSliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorMarchBSliderHorizontal';
          break;
        case('Random Number Generator: March C'):
          minimumSlider.className = 'randomNumberGeneratorMarchCSliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorMarchCSliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorMarchCSliderHorizontal';
          break;
        case('Random Number Generator: April A'):
          minimumSlider.className = 'randomNumberGeneratorAprilASliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorAprilASliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorAprilASliderHorizontal';
          break;
        case('Random Number Generator: April B'):
          minimumSlider.className = 'randomNumberGeneratorAprilBSliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorAprilBSliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorAprilBSliderHorizontal';
          break;
        case('Random Number Generator: April C'):
          minimumSlider.className = 'randomNumberGeneratorAprilCSliderHorizontal';
          maximumSlider.className = 'randomNumberGeneratorAprilCSliderHorizontal';
          intervalSlider.className = 'randomNumberGeneratorAprilCSliderHorizontal';
          break;
        default:
          console.log('unsupported random number generator skin');
      }
      minimumModLabel.setAttribute("style", "position: relative; color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 18px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(5px) translateY(75px);");
      minimumModInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 35px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding: 0 9px; transform: translateX(30px) translateY(50px);");
      maximumDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px; background: transparent;");
      maximumLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 24px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; margin: 2px 0 2px 10px;");
      maximumDisplay.setAttribute("style", "position: relative; margin: 8px; font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.minimumDisplayPath + "); background-size: " + this.minimumDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; padding-left: 1vmin; width: 85%;");
      maximumSlider.setAttribute("style", "position: relative; -webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg) translateX(-105px) translateY(25px); width: 210px; height: 20px; background: url(" + this.minimumSliderPath + "); background-size: " + this.minimumSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.minimumSliderBoxShadowColor + ", 2px -2px 1px " + this.minimumSliderBoxShadowColor + ", 3px -3px 1px " + this.minimumSliderBoxShadowColor + ", 4px -4px 1px " + this.minimumSliderBoxShadowColor + ";");
      maximumModLabel.setAttribute("style", "position: relative; color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 18px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(5px) translateY(75px);");
      maximumModInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 35px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding: 0 9px; transform: translateX(30px) translateY(50px);");
      intervalDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px; background: transparent;");
      intervalLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 24px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; margin: 2px 0 2px 10px;");
      intervalDisplay.setAttribute("style", "position: relative; margin: 8px; font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.minimumDisplayPath + "); background-size: " + this.minimumDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; padding-left: 1vmin; width: 85%;");
      intervalSlider.setAttribute("style", "position: relative; -webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg) translateX(-105px) translateY(25px); width: 210px; height: 20px; background: url(" + this.minimumSliderPath + "); background-size: " + this.minimumSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.minimumSliderBoxShadowColor + ", 2px -2px 1px " + this.minimumSliderBoxShadowColor + ", 3px -3px 1px " + this.minimumSliderBoxShadowColor + ", 4px -4px 1px " + this.minimumSliderBoxShadowColor + ";");
      intervalModLabel.setAttribute("style", "position: relative; color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 18px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(5px) translateY(75px);");
      intervalModInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 35px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding: 0 9px; transform: translateX(30px) translateY(50px);");

      this.manageStepContinuousSwitchHorizontal(stepContinuousLabel, stepLabel, continuousLabel, stepOrContinuous, continuousHandlerDiv, exponentialCurveHanlderDiv);

      this.manageLinearExponentialSwitchHorizontal(linearExponentialLabel, linearLabel, exponentialLabel, linearOrExponential, exponentialCurveHanlderDiv);

      this.manageConcaveConvexSwitchHorizontal(concaveConvexLabel, concaveLabel, convexLabel, concaveOrConvex);

      this.manageDecreaseSlope(decreaseSlope, slopeAmount);

      this.manageIncreaseSlope(increaseSlope, slopeAmount);

      this.manageSlopeInput(slopeAmount);

      this.manageMinimumAmount(minimumDisplay, minimumSlider);

      this.manageMaximumAmount(maximumDisplay, maximumSlider);

      this.manageIntervalAmount(intervalDisplay, intervalSlider);

      outputPort.addEventListener('click', () => {
        alert(outputPort.id);
      });

      minimumModInput.addEventListener('click', () => {
        alert(minimumModInput.id);
      });

      maximumModInput.addEventListener('click', () => {
        alert(maximumModInput.id);
      });

      intervalModInput.addEventListener('click', () => {
        alert(intervalModInput.id);
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
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let outputDiv = document.createElement('div');
      div.appendChild(outputDiv);
      let outputDisplayLabel = document.createElement('p');
      outputDiv.appendChild(outputDisplayLabel);
      outputDisplayLabel.innerHTML = 'output value';
      let outputDisplay = document.createElement('div');
      outputDiv.appendChild(outputDisplay);
      this.displayValue = outputDisplay;
      let stepOrContinuousDiv = document.createElement('div');
      outputDiv.appendChild(stepOrContinuousDiv);
      let stepLabel = document.createElement('p');
      stepOrContinuousDiv.appendChild(stepLabel);
      stepLabel.innerHTML = 'step';
      let stepContinuousLabel = document.createElement('label');
      stepOrContinuousDiv.appendChild(stepContinuousLabel);
      let stepOrContinuous = document.createElement('input');
      stepContinuousLabel.appendChild(stepOrContinuous);
      stepOrContinuous.type = 'checkbox';
      stepOrContinuous.checked = this.continuous;
      let continuousRoundSlider = document.createElement('span');
      stepContinuousLabel.appendChild(continuousRoundSlider);
      continuousRoundSlider.className = 'slider round';
      let continuousLabel = document.createElement('p');
      stepOrContinuousDiv.appendChild(continuousLabel);
      continuousLabel.innerHTML = 'continuous';
      let continuousHandlerDiv = document.createElement('div');
      outputDiv.appendChild(continuousHandlerDiv);
      let linearOrExponentialDiv = document.createElement('div');
      continuousHandlerDiv.appendChild(linearOrExponentialDiv);
      let linearLabel = document.createElement('p');
      linearOrExponentialDiv.appendChild(linearLabel);
      linearLabel.innerHTML = 'linear';
      let linearExponentialLabel = document.createElement('label');
      linearOrExponentialDiv.appendChild(linearExponentialLabel);
      let linearOrExponential = document.createElement('input');
      linearExponentialLabel.appendChild(linearOrExponential);
      linearOrExponential.type = 'checkbox';
      linearOrExponential.checked = this.exponential;
      let exponentialRoundSlider = document.createElement('span');
      linearExponentialLabel.appendChild(exponentialRoundSlider);
      exponentialRoundSlider.className = 'slider round';
      let exponentialLabel = document.createElement('p');
      linearOrExponentialDiv.appendChild(exponentialLabel);
      exponentialLabel.innerHTML = 'exponential';
      let exponentialCurveHanlderDiv = document.createElement('div');
      continuousHandlerDiv.appendChild(exponentialCurveHanlderDiv);
      let concaveOrConvexDiv = document.createElement('div');
      exponentialCurveHanlderDiv.appendChild(concaveOrConvexDiv);
      let concaveLabel = document.createElement('p');
      concaveOrConvexDiv.appendChild(concaveLabel);
      concaveLabel.innerHTML = 'concave';
      let concaveConvexLabel = document.createElement('label');
      concaveOrConvexDiv.appendChild(concaveConvexLabel);
      let concaveOrConvex = document.createElement('input');
      concaveConvexLabel.appendChild(concaveOrConvex);
      concaveOrConvex.type = 'checkbox';
      concaveOrConvex.checked = this.convex;
      let concaveSwitch = document.createElement('span');
      concaveConvexLabel.appendChild(concaveSwitch);
      concaveSwitch.className = "slider round";
      let convexLabel = document.createElement('p');
      concaveOrConvexDiv.appendChild(convexLabel);
      convexLabel.innerHTML = 'convex';
      let slopeDiv = document.createElement('div');
      outputDiv.appendChild(slopeDiv);
      let slopeLabel = document.createElement('p');
      slopeDiv.appendChild(slopeLabel);
      slopeLabel.innerHTML = 'slope:';
      let decreaseSlope = document.createElement('button');
      slopeDiv.appendChild(decreaseSlope);
      decreaseSlope.innerHTML = '-';
      let slopeAmount = document.createElement('input');
      slopeDiv.appendChild(slopeAmount);
      slopeAmount.type = 'number';
      slopeAmount.min = '1';
      slopeAmount.max = '1024';
      slopeAmount.value = this.slope;
      let increaseSlope = document.createElement('button');
      slopeDiv.appendChild(increaseSlope);
      increaseSlope.innerHTML = '+';
      let minimumDiv = document.createElement('div');
      div.appendChild(minimumDiv);
      let minimumLabel = document.createElement('p');
      minimumDiv.appendChild(minimumLabel);
      minimumLabel.innerHTML = 'minimum';
      let minimumDisplay = document.createElement('input');
      minimumDiv.appendChild(minimumDisplay);
      minimumDisplay.type = 'number';
      minimumDisplay.step = '0.001';
      minimumDisplay.min = '-1024.000';
      minimumDisplay.max = '1024.000';
      minimumDisplay.value = this.minimum;
      let minimumSlider = document.createElement('input');
      minimumDiv.appendChild(minimumSlider);
      minimumSlider.type = 'range';
      minimumSlider.min = '-1024.000';
      minimumSlider.max = '1024.000';
      minimumSlider.step = '0.001';
      minimumSlider.value = this.minimum;
      let minimumModLabel = document.createElement('p');
      minimumDiv.appendChild(minimumModLabel);
      minimumModLabel.innerHTML = 'modulation:';
      let minimumModInput = document.createElement('h1');
      minimumDiv.appendChild(minimumModInput);
      minimumModInput.innerHTML = '◦';
      minimumModInput.id = 'minimum modulation input: ' + this.name + this.id;
      let maximumDiv = document.createElement('div');
      div.appendChild(maximumDiv);
      let maximumLabel = document.createElement('p');
      maximumDiv.appendChild(maximumLabel);
      maximumLabel.innerHTML = 'maximum';
      let maximumDisplay = document.createElement('input');
      maximumDiv.appendChild(maximumDisplay);
      maximumDisplay.type = 'number';
      maximumDisplay.step = '0.001';
      maximumDisplay.min = '-1024.000';
      maximumDisplay.max = '1024.000';
      maximumDisplay.value = this.maximum;
      let maximumSlider = document.createElement('input');
      maximumDiv.appendChild(maximumSlider);
      maximumSlider.type = 'range';
      maximumSlider.step = '0.001';
      maximumSlider.min = '-1024.000';
      maximumSlider.max = '1024.000';
      maximumSlider.value = this.maximum;
      let maximumModLabel = document.createElement('p');
      maximumDiv.appendChild(maximumModLabel);
      maximumModLabel.innerHTML = 'modulation:';
      let maximumModInput = document.createElement('h1');
      maximumDiv.appendChild(maximumModInput);
      maximumModInput.innerHTML = '◦';
      maximumModInput.id = 'maximum modulation input: ' + this.name + this.id;
      let intervalDiv = document.createElement('div');
      div.appendChild(intervalDiv);
      let intervalLabel = document.createElement('p');
      intervalDiv.appendChild(intervalLabel);
      intervalLabel.innerHTML = 'interval(ms)';
      let intervalDisplay = document.createElement('input');
      intervalDiv.appendChild(intervalDisplay);
      intervalDisplay.type = 'number';
      intervalDisplay.step = '1';
      intervalDisplay.min = '0';
      intervalDisplay.max = '60000';
      intervalDisplay.value = this.interval;
      let intervalSlider = document.createElement('input');
      intervalDiv.appendChild(intervalSlider);
      intervalSlider.type = 'range';
      intervalSlider.step = '1';
      intervalSlider.min = '0';
      intervalSlider.max = '60000';
      intervalSlider.value = this.interval;
      let intervalModLabel = document.createElement('p');
      intervalDiv.appendChild(intervalModLabel);
      intervalModLabel.innerHTML = 'modulation:';
      let intervalModInput = document.createElement('h1');
      intervalDiv.appendChild(intervalModInput);
      intervalModInput.innerHTML = '◦';
      intervalModInput.id = 'interval modulation input: ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6) + "px;");
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadowColor + ", -2px -2px 1px " + this.topFontShadowColor + "; position: relative; top: -10px; left: 5px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + "; position: relative; margin: 0 10px 0 96px;");
      outputPort.setAttribute("style", "z-index: 6; cursor: pointer; font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; padding-left: 10px; position: relative; transform: translateX(180px) translateY(-50px);");
      outputDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; height: " + (this.verticalHeight/3) + "px; background: transparent");
      outputDisplayLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 18px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(6px) translateY(5px);");
      outputDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; background: url(" + this.displayPath + "); background-size: " + this.outputDisplaySize + "; box-shadow: -1px -1px 1px" + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; height: 56px; width: 190px; transform: translateX(125px) translateY(-50px);");
      stepOrContinuousDiv.setAttribute("style", "margin: 0;");
      if (this.continuous) {
        stepLabel.setAttribute("style", "float: left; margin: 32px 2px 0 16px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(25px) translateY(-65px);");
        continuousLabel.setAttribute("style", "float: left; margin: 32px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(50px) translateY(-65px)");
        continuousHandlerDiv.setAttribute("style", "visibility: visible;");
      } else {
        stepLabel.setAttribute("style", "float: left; margin: 32px 2px 0 16px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(25px) translateY(-65px);");
        continuousLabel.setAttribute("style", "float: left; margin: 32px 32px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(50px) translateY(-65px)");
        continuousHandlerDiv.setAttribute("style", "visibility: hidden;");
      }
      stepContinuousLabel.setAttribute("style", "position: relative; float: left; display: inline-block; width: 60px; height: 34px; transform: translateX(40px) translateY(-40px);");
      stepOrContinuous.setAttribute("style", "display: none;");
      if (this.exponential) {
        linearLabel.setAttribute("style", "float: left; margin: 16px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-210px) translateY(-10px);");
        exponentialLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(165px) translateY(-85px);");
        exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
        slopeDiv.setAttribute("style", "visibility: visible;");
      } else {
        linearLabel.setAttribute("style", "float: left; margin: 16px 2px 0 2px; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-210px) translateY(-10px);");
        exponentialLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(165px) translateY(-85px);");
        exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
        slopeDiv.setAttribute("style", "visibility: hidden;");
      }
      linearExponentialLabel.setAttribute("style", "position: relative; float: left; display: inline-block; width: 60px; height: 34px; transform: translateX(-145px) translateY(-40px);");
      linearOrExponential.setAttribute("style", "display: none;");
      concaveOrConvexDiv.setAttribute("style", "margin: 0 0 0 0;");
      if (this.convex) {
        concaveLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-83px) translateY(-50px);");
        convexLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-61px) translateY(-50px)");
      } else {
        concaveLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; transform: translateX(-83px) translateY(-50px);");
        convexLabel.setAttribute("style", "float: left; font-family: 'Righteous', cursive; font-size: 18px; color: transparent; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 0.3; transform: translateX(-61px) translateY(-50px);");
      }
      concaveConvexLabel.setAttribute("style", "position: relative; float: left; display: inline-block; width: 60px; height: 34px; z-index: 6; transform: translateX(-73px) translateY(-35px);");
      concaveOrConvex.setAttribute("style", "display: none;");
      slopeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: #2F4F4F; text-shadow: -1px -1px 1px #999900, -2px -2px 1px #999900; opacity: 1.0; left: -230px; top: 30px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; opacity: 1.0; z-index: 1; pointer-events: none; transform: translateX(250px) translateY(-70px);");
      decreaseSlope.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; cursor: pointer; border: solid 1px " + this.faceFontShadowColor + "; border-radius: 10%; padding: 1vmin; background-color: #eeeeee; background-color: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -o-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); box-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; color: " + this.faceFontColor + "; height: 40px; width: 40px; position: relative; transform: translateX(65px) translateY(-183px);");
      slopeAmount.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; background: url(" + this.slopeDisplayPath + "); background-size: " + this.slopeDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + ", -4px -4px 1px " + this.faceFontShadowColor + "; height: 35px; position: relative; transform: translateX(75px) translateY(-187px); padding: 0 0 0 5px;");
      increaseSlope.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; cursor: pointer; border: solid 1px " + this.faceFontShadowColor + "; border-radius: 10%; padding: 1vmin; background-color: #eeeeee; background-color: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -webkit-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: -o-linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); background: linear-gradient(45deg, " + this.sliderShaderColor1 + ", " + this.sliderShaderColor2 + "); box-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; color: " + this.faceFontColor + "; height: 40px; width: 40px; position: relative; transform: translateX(65px) translateY(-183px);");
      minimumDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; height: " + (this.verticalHeight/6) + "px; background: transparent;");
      minimumLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 18px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-15px);");
      minimumDisplay.setAttribute("style", "position: relative; margin: 8px; font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.minimumDisplayPath + "); background-size: " + this.minimumDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; padding-left: 1vmin; width: 170px; height: 40px; transform: translateX(5px) translateY(-35px);");
      minimumSlider.setAttribute("style", "position: relative; -webkit-appearance: none; appearance: none; width: 300px; height: 14px; background: url(" + this.minimumSliderPath + "); background-size: " + this.minimumSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.minimumSliderBoxShadowColor + ", -2px -2px 1px " + this.minimumSliderBoxShadowColor + ", -3px -3px 1px " + this.minimumSliderBoxShadowColor + ", -4px -4px 1px " + this.minimumSliderBoxShadowColor + "; transform: translateX(10px) translateY(-25px);");
      switch(this.skinName) {
        case('Random Number Generator: January A'):
          minimumSlider.className = 'randomNumberGeneratorJanuaryASliderVertical';
          maximumSlider.className = 'randomNumberGeneratorJanuaryASliderVertical';
          intervalSlider.className = 'randomNumberGeneratorJanuaryASliderVertical';
          break;
        case('Random Number Generator: January B'):
          minimumSlider.className = 'randomNumberGeneratorJanuaryBSliderVertical';
          maximumSlider.className = 'randomNumberGeneratorJanuaryBSliderVertical';
          intervalSlider.className = 'randomNumberGeneratorJanuaryBSliderVertical';
          break;
        case('Random Number Generator: January C'):
          minimumSlider.className = 'randomNumberGeneratorJanuaryCSliderVertical';
          maximumSlider.className = 'randomNumberGeneratorJanuaryCSliderVertical';
          intervalSlider.className = 'randomNumberGeneratorJanuaryCSliderVertical';
          break;
        case('Random Number Generator: February A'):
          minimumSlider.className = 'randomNumberGeneratorFebruaryASliderVertical';
          maximumSlider.className = 'randomNumberGeneratorFebruaryASliderVertical';
          intervalSlider.className = 'randomNumberGeneratorFebruaryASliderVertical';
          break;
        case('Random Number Generator: February B'):
          minimumSlider.className = 'randomNumberGeneratorFebruaryBSliderVertical';
          maximumSlider.className = 'randomNumberGeneratorFebruaryBSliderVertical';
          intervalSlider.className = 'randomNumberGeneratorFebruaryBSliderVertical';
          break;
        case('Random Number Generator: February C'):
          minimumSlider.className = 'randomNumberGeneratorFebruaryCSliderVertical';
          maximumSlider.className = 'randomNumberGeneratorFebruaryCSliderVertical';
          intervalSlider.className = 'randomNumberGeneratorFebruaryCSliderVertical';
          break;
        case('Random Number Generator: March A'):
          minimumSlider.className = 'randomNumberGeneratorMarchASliderVertical';
          maximumSlider.className = 'randomNumberGeneratorMarchASliderVertical';
          intervalSlider.className = 'randomNumberGeneratorMarchASliderVertical';
          break;
        case('Random Number Generator: March B'):
          minimumSlider.className = 'randomNumberGeneratorMarchBSliderVertical';
          maximumSlider.className = 'randomNumberGeneratorMarchBSliderVertical';
          intervalSlider.className = 'randomNumberGeneratorMarchBSliderVertical';
          break;
        case('Random Number Generator: March C'):
          minimumSlider.className = 'randomNumberGeneratorMarchCSliderVertical';
          maximumSlider.className = 'randomNumberGeneratorMarchCSliderVertical';
          intervalSlider.className = 'randomNumberGeneratorMarchCSliderVertical';
          break;
        case('Random Number Generator: April A'):
          minimumSlider.className = 'randomNumberGeneratorAprilASliderVertical';
          maximumSlider.className = 'randomNumberGeneratorAprilASliderVertical';
          intervalSlider.className = 'randomNumberGeneratorAprilASliderVertical';
          break;
        case('Random Number Generator: April B'):
          minimumSlider.className = 'randomNumberGeneratorAprilBSliderVertical';
          maximumSlider.className = 'randomNumberGeneratorAprilBSliderVertical';
          intervalSlider.className = 'randomNumberGeneratorAprilBSliderVertical';
          break;
        case('Random Number Generator: April C'):
          minimumSlider.className = 'randomNumberGeneratorAprilCSliderVertical';
          maximumSlider.className = 'randomNumberGeneratorAprilCSliderVertical';
          intervalSlider.className = 'randomNumberGeneratorAprilCSliderVertical';
          break;
        default:
          console.log('unsupported random number generator skin');
      }
      minimumModLabel.setAttribute("style", "position: relative; color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 18px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(210px) translateY(-155px);");
      minimumModInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 35px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding: 0 9px; transform: translateX(240px) translateY(-185px);");
      maximumDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; height: " + (this.verticalHeight/6) + "px; background: transparent;");
      maximumLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 18px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-15px);");
      maximumDisplay.setAttribute("style", "position: relative; margin: 8px; font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.minimumDisplayPath + "); background-size: " + this.minimumDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; padding-left: 1vmin; width: 170px; height: 40px; transform: translateX(5px) translateY(-35px);");
      maximumSlider.setAttribute("style", "position: relative; -webkit-appearance: none; appearance: none; width: 300px; height: 14px; background: url(" + this.minimumSliderPath + "); background-size: " + this.minimumSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.minimumSliderBoxShadowColor + ", -2px -2px 1px " + this.minimumSliderBoxShadowColor + ", -3px -3px 1px " + this.minimumSliderBoxShadowColor + ", -4px -4px 1px " + this.minimumSliderBoxShadowColor + "; transform: translateX(10px) translateY(-25px);");
      maximumModLabel.setAttribute("style", "position: relative; color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 18px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(210px) translateY(-155px);");
      maximumModInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 35px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding: 0 9px; transform: translateX(240px) translateY(-185px);");
      intervalDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; height: " + (this.verticalHeight/6) + "px; background: transparent;");
      intervalLabel.setAttribute("style", "color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 18px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-15px);");
      intervalDisplay.setAttribute("style", "position: relative; margin: 8px; font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.minimumDisplayPath + "); background-size: " + this.minimumDisplaySize + "; background-color: #BFBFBF; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; padding-left: 1vmin; width: 170px; height: 40px; transform: translateX(5px) translateY(-35px);");
      intervalSlider.setAttribute("style", "position: relative; -webkit-appearance: none; appearance: none; width: 300px; height: 14px; background: url(" + this.minimumSliderPath + "); background-size: " + this.minimumSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.minimumSliderBoxShadowColor + ", -2px -2px 1px " + this.minimumSliderBoxShadowColor + ", -3px -3px 1px " + this.minimumSliderBoxShadowColor + ", -4px -4px 1px " + this.minimumSliderBoxShadowColor + "; transform: translateX(10px) translateY(-25px);");
      intervalModLabel.setAttribute("style", "position: relative; color: " + this.faceFontColor + "; font-family: 'Righteous', cursive; font-size: 18px; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ", -3px -3px 1px " + this.faceFontShadowColor + "; transform: translateX(210px) translateY(-155px);");
      intervalModInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; width: 35px; color: " + this.faceFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding: 0 9px; transform: translateX(240px) translateY(-185px);");

      this.manageStepContinuousSwitchVertical(stepContinuousLabel, stepLabel, continuousLabel, stepOrContinuous, continuousHandlerDiv, exponentialCurveHanlderDiv, slopeDiv);

      this.manageLinearExponentialSwitchVertical(linearExponentialLabel, linearLabel, exponentialLabel, linearOrExponential, exponentialCurveHanlderDiv, slopeDiv);

      this.manageConcaveConvexSwitchVertical(concaveConvexLabel, concaveLabel, convexLabel, concaveOrConvex);

      this.manageDecreaseSlope(decreaseSlope, slopeAmount);

      this.manageIncreaseSlope(increaseSlope, slopeAmount);

      this.manageSlopeInput(slopeAmount);

      this.manageMinimumAmount(minimumDisplay, minimumSlider);

      this.manageMaximumAmount(maximumDisplay, maximumSlider);

      this.manageIntervalAmount(intervalDisplay, intervalSlider);

      outputPort.addEventListener('click', () => {
        alert(outputPort.id);
      });

      minimumModInput.addEventListener('click', () => {
        alert(minimumModInput.id);
      });

      maximumModInput.addEventListener('click', () => {
        alert(maximumModInput.id);
      });

      intervalModInput.addEventListener('click', () => {
        alert(intervalModInput.id);
      });

      return(div);
    }
  }

  return(randomNumberGenerator);
})();
