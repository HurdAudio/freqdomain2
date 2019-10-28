'use strict';

var setToRange = true;

window.onload = ()=>{
  let settingsKnob = document.getElementById('settingsKnob');
  let rangeSettingLabel = document.getElementById('rangeSettingLabel');
  let multiplierSettingsLabel = document.getElementById('multiplierSettingsLabel');
  let rangeFace = document.getElementById('rangeFace');
  let multiplierFace = document.getElementById('multiplierFace');
  let minimumOutputValueInput = document.getElementById('minimumOutputValueInput');
  let minimumOutputValueRange = document.getElementById('minimumOutputValueRange');
  let maximumOutputValueInput = document.getElementById('maximumOutputValueInput');
  let maximumOutputValueRange = document.getElementById('maximumOutputValueRange');
  let multiplierValueInput = document.getElementById('multiplierValueInput');
  let multiplierValueRange = document.getElementById('multiplierValueRange');

  settingsKnob.addEventListener('click', () => {
    if (setToRange) {
      setToRange = false;
      rangeSettingLabel.className = 'settingOff';
      settingsKnob.className = 'settingsToMultiplier';
      multiplierSettingsLabel.className = 'settingOn';
      rangeFace.setAttribute("style", "display: none");
      multiplierFace.setAttribute("style", "display: initial;");
    } else {
      setToRange = true;
      rangeSettingLabel.className = 'settingOn';
      settingsKnob.className = 'settingsToRange';
      multiplierSettingsLabel.className = 'settingOff';
      rangeFace.setAttribute("style", "display: initial");
      multiplierFace.setAttribute("style", "display: none;");
    }
  });

  minimumOutputValueInput.addEventListener('change', () => {
    minimumOutputValueRange.value = minimumOutputValueInput.value;
  });
  minimumOutputValueRange.addEventListener('mousemove', () => {
    minimumOutputValueInput.value = minimumOutputValueRange.value;
  });

  maximumOutputValueInput.addEventListener('change', () => {
    maximumOutputValueRange.value = maximumOutputValueInput.value;
  });
  maximumOutputValueRange.addEventListener('mousemove', () => {
    maximumOutputValueInput.value = maximumOutputValueRange.value;
  });

  multiplierValueInput.addEventListener('change', () => {
    multiplierValueRange.value = multiplierValueInput.value;
  });
  multiplierValueRange.addEventListener('mousemove', () => {
    multiplierValueInput.value = multiplierValueRange.value;
  });
};
