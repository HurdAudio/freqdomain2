'use strict';
var waveForms = ['sine', 'square', 'sawtooth', 'triangle'];
var currentWaveform = 0;

window.onload = ()=>{
  let waveFormsContainer = document.getElementById('waveFormsContainer');
  let sine = document.getElementById('sine');
  let square = document.getElementById('square');
  let sawtooth = document.getElementById('sawtooth');
  let triangle = document.getElementById('triangle');
  let testToneVolume = document.getElementById('testToneVolume');
  let testToneVolumeSlider = document.getElementById('testToneVolumeSlider');
  let light = document.getElementById('light');
  let testToneOnOff = document.getElementById('testToneOnOff');
  let testtoneDiv = document.getElementById('testtoneDiv');
  sine.setAttribute("style", "transform: rotateY(0deg); opacity: 1;");
  square.setAttribute("style", "transform: rotateY(-90deg); opacity: 1;");
  sawtooth.setAttribute("style", "transform: rotateY(180deg); opacity: 0;");
  triangle.setAttribute("style", "transform: rotateY(90deg); opacity: 0;");
  light.setAttribute("style", "filter: hue-rotate(" + (180 - (Math.floor((testToneVolume.value / 100) * 180))) + "deg); opacity: 0.4; visibility: hidden;");
  testtoneDiv.setAttribute("style", "opacity: 0.6; filter: saturate(900%);");

  testToneVolume.addEventListener('click', ()=>{
    if (testToneOnOff.checked) {
      light.setAttribute("style", "filter: hue-rotate(" + (180 - (Math.floor((testToneVolume.value / 100) * 180))) + "deg); opacity: " + (testToneVolume.value * 0.01) + ";)");
    }
  });
  testToneVolume.addEventListener('mouseover', ()=>{
    if (testToneOnOff.checked) {
      light.setAttribute("style", "filter: hue-rotate(" + (180 - (Math.floor((testToneVolume.value / 100) * 180))) + "deg); opacity: " + (testToneVolume.value * 0.01) + ";)");
    }
  });
  testToneVolume.addEventListener('mouseout', ()=>{
    if (testToneOnOff.checked) {
      light.setAttribute("style", "filter: hue-rotate(" + (180 - (Math.floor((testToneVolume.value / 100) * 180))) + "deg); opacity: " + (testToneVolume.value * 0.01) + ";)");
    }
  });
  testToneVolumeSlider.addEventListener('click', ()=>{
    if (testToneOnOff.checked) {
      light.setAttribute("style", "filter: hue-rotate(" + (180 - (Math.floor((testToneVolume.value / 100) * 180))) + "deg); opacity: " + (testToneVolume.value * 0.01) + ";)");
    }
  });
  testToneVolumeSlider.addEventListener('mouseover', ()=>{
    if (testToneOnOff.checked) {
      light.setAttribute("style", "filter: hue-rotate(" + (180 - (Math.floor((testToneVolume.value / 100) * 180))) + "deg); opacity: " + (testToneVolume.value * 0.01) + ";)");
    }
  });
  testToneVolumeSlider.addEventListener('mouseout', ()=>{
    if (testToneOnOff.checked) {
      light.setAttribute("style", "filter: hue-rotate(" + (180 - (Math.floor((testToneVolume.value / 100) * 180))) + "deg); opacity: " + (testToneVolume.value * 0.01) + ";)");
    }
  });
  testToneVolumeSlider.addEventListener('mousemove', ()=>{
    if (testToneOnOff.checked) {
      light.setAttribute("style", "filter: hue-rotate(" + (180 - (Math.floor((testToneVolume.value / 100) * 180))) + "deg); opacity: " + (testToneVolume.value * 0.01) + ";)");
    }
  });

  testToneOnOff.addEventListener('click', ()=>{
    if (testToneOnOff.checked) {
      light.setAttribute("style", "visbility: visible; filter: hue-rotate(" + (180 - (Math.floor((testToneVolume.value / 100) * 180))) + "deg); opacity: " + (testToneVolume.value * 0.01) + ";)");
      testtoneDiv.setAttribute("style", "opacity: 1; filter: saturate(100%); transition: opacity 0.6s linear;");
    } else {
      light.setAttribute("style", "visibility: hidden;");
      testtoneDiv.setAttribute("style", "opacity: 0.6; filter: saturate(900%); transition: opacity 0.6s linear;");
    }
  });

  waveFormsContainer.addEventListener('click', ()=>{

    switch(waveForms[currentWaveform]) {
      case('sine'):
        triangle.setAttribute("style", "transform: rotateY(180deg); opacity: 0;");
        sawtooth.setAttribute("style", "transform: rotateY(-90deg); opacity: 0;");
        sine.setAttribute("style", "transform: rotateY(90deg); opacity: 1; transition: transform 0.6s linear;");
        square.setAttribute("style", "transform: rotateY(0deg); opacity: 1; transition: transform 0.6s linear;");
        ++currentWaveform;
        break;
      case('square'):
        sine.setAttribute("style", "transform: rotateY(180deg); opacity: 0; transition: transform opacity 0.6s linear;");
        triangle.setAttribute("style", "transform: rotateY(-90deg); opacity: 0;");
        square.setAttribute("style", "transform: rotateY(90deg); opacity: 1; transition: transform 0.6s linear;");
        sawtooth.setAttribute("style", "transform: rotateY(0deg); opacity: 1; transition: transform 0.6s linear;");
        ++currentWaveform;
        break;
      case('sawtooth'):
        sine.setAttribute("style", "transform: rotateY(-90deg); opacity: 0;");
        square.setAttribute("style", "transform: rotateY(180deg); opacity: 0;");
        sawtooth.setAttribute("style", "transform: rotateY(90deg); opacity: 1; transition: transform 0.6s linear;");
        triangle.setAttribute("style", "transform: rotateY(0deg); opacity: 1; transition: transform 0.6s linear;");
        ++currentWaveform;
        break;
      case('triangle'):
      square.setAttribute("style", "transform: rotateY(-90deg); opacity: 0;");
        sawtooth.setAttribute("style", "transform: rotateY(180deg); opacity: 0;");
        triangle.setAttribute("style", "transform: rotateY(90deg); opacity: 1; transition: transform 0.6s linear;");
        sine.setAttribute("style", "transform: rotateY(0deg); opacity: 1; transition: transform 0.6s linear;");
        currentWaveform = 0;
        break;
      default:
        console.log('unsupported wave form');
    }
    waveFormsContainer.setAttribute("style", "filter: hue-rotate(270deg); transition: filter 0.3s;");
    setTimeout(()=>{
      waveFormsContainer.setAttribute("style", "filter: hue-rotate(0deg); transition: filter 0.3s;");
    }, 300);
  });
};
