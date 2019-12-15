'use strict';
let frequencyModulateEdit = document.getElementById('frequencyModulateEdit');
let frequenctModulatorSelect = document.getElementById('frequenctModulatorSelect');
let waveformModulatorSelect = document.getElementById('waveformModulatorSelect');
let waveformModulatorEditor = document.getElementById('waveformModulatorEditor');
let detuneModulatorSelect = document.getElementById('detuneModulatorSelect');
let detuneModulatorEditor = document.getElementById('detuneModulatorEditor');
let sine = document.getElementById('sine');
let square = document.getElementById('square');
let sawtooth = document.getElementById('sawtooth');
let triangle = document.getElementById('triangle');


window.onload = ()=>{

  frequenctModulatorSelect.addEventListener('change', ()=>{
    if (frequenctModulatorSelect.value === 'none') {
      frequencyModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      frequencyModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });

  waveformModulatorSelect.addEventListener('change', ()=>{
    if (waveformModulatorSelect.value === 'none') {
      waveformModulatorEditor.setAttribute("style", "visibility: hidden;");
    } else {
      waveformModulatorEditor.setAttribute("style", "visibility: visible;");
    }
  });

  detuneModulatorSelect.addEventListener('change', ()=>{
    if (detuneModulatorSelect.value === 'none') {
      detuneModulatorEditor.setAttribute("style", "visibility: hidden;");
    } else {
      detuneModulatorEditor.setAttribute("style", "visibility: visible;");
    }
  });

  sine.addEventListener('click', ()=>{
    sine.setAttribute("style", "filter: hue-rotate(180deg); filter: invert(1); opacity: 1;");
    square.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
    sawtooth.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
    triangle.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
  });

  square.addEventListener('click', ()=>{
    sine.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
    square.setAttribute("style", "filter: hue-rotate(180deg); filter: invert(1); opacity: 1;");
    sawtooth.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
    triangle.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
  });

  sawtooth.addEventListener('click', ()=>{
    sine.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
    square.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
    sawtooth.setAttribute("style", "filter: hue-rotate(180deg); filter: invert(1); opacity: 1;");
    triangle.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
  });

  triangle.addEventListener('click', ()=>{
    sine.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
    square.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
    sawtooth.setAttribute("style", "filter: hue-rotate(0deg); filter: invert(0); opacity: 0.3;");
    triangle.setAttribute("style", "filter: hue-rotate(180deg); filter: invert(1); opacity: 1;");
  });
};
