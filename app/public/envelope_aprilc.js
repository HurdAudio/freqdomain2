'use strict';
var key = 'keyOff';
const spacebar = 32;
var moduleState = 'Attack';
var decayArr = [];
var postSustainArr = [];

function additionalDecayDeleteButtonListen(xButton, decayField, decayObject) {

  xButton.addEventListener('click', ()=>{
    decayArr.splice((decayArr.indexOf(decayObject)), 1);
    decayField.parentNode.removeChild(decayField);
    xButton.parentNode.removeChild(xButton);
  });
}

function additionalDecayModulationListen(modulationSelect, editButton, leftMargin, key, decayObject) {
  modulationSelect.addEventListener('change', ()=>{
    decayObject[key] = modulationSelect.value;
    if (modulationSelect.value === 'none') {
      editButton.setAttribute("style", "visibility: hidden; margin: 2vmin 1vmin 1vmin " + leftMargin + "vmin;");
    } else {
      editButton.setAttribute("style", "visibility: visible; margin: 2vmin 1vmin 1vmin "+ leftMargin + "vmin;");
    }
  });
}

function additionalLinearOrExponentialListen(linearOrExSwitch, linear, exponential, curveType, slopeData, decayObject) {
  linearOrExSwitch.addEventListener('click', ()=>{
    decayObject.exponential = linearOrExSwitch.checked;
    if (linearOrExSwitch.checked) {
      linear.className = 'inactiveState';
      exponential.className = 'activeState';
      curveType.setAttribute("style", "visibility: visible;");
      slopeData.setAttribute("style", "visibility: visible;");
    } else {
      linear.className = 'activeState';
      exponential.className = 'inactiveState';
      curveType.setAttribute("style", "visibility: hidden;");
      slopeData.setAttribute("style", "visibility: hidden;");
    }
  });
}

function additionalConcaveOrConvexListen(theSwitch, concave, convex, decayObject) {
  theSwitch.addEventListener('click', ()=>{
    decayObject.convex = theSwitch.checked;
    if (theSwitch.checked) {
      concave.className = "inactiveState";
      convex.className = "activeState";
    } else {
      concave.className = "activeState";
      convex.className = "inactiveState";
    }
  });
}

function additionalSlopeListen(display, subtract, add, decayObject) {

  subtract.addEventListener('click', ()=>{
    display.value = (parseInt(display.value) - 1).toString();
    decayObject.slope = parseInt(display.value);
    if (display.value === '1') {
      add.setAttribute("style", "visibility: visible;");
      subtract.setAttribute("style", "visibility: hidden;");
    } else {
      add.setAttribute("style", "visibility: visible;");
      subtract.setAttribute("style", "visibility: visible;");
    }
  });
  add.addEventListener('click', ()=>{
    display.value = (parseInt(display.value) + 1).toString();
    decayObject.slope = parseInt(display.value);
    if (display.value === '1024') {
      add.setAttribute("style", "visibility: hidden;");
      subtract.setAttribute("style", "visibility: visible;");
    } else {
      add.setAttribute("style", "visibility: visible;");
      subtract.setAttribute("style", "visibility: visible;");
    }
  });
}

function additionalTimeIntervalListen(decayTime, decayObject) {
  decayTime.addEventListener('focusout', ()=>{
    decayObject.timeInterval = parseInt(decayTime.value);
  });
}

function additionalEndValueListen(end, decayObject) {
  end.addEventListener('focusout', ()=>{
    decayObject.endValue = parseFloat(end.value);
  });
}

function createDecayModule(decayObject) {
  let modulationArray = [ 'none', 'envelope1', 'envelope2', 'envelope3', 'envelope4', 'frequency1', 'frequency2', 'frequency3' ];
  let element;
  let addedDecays = document.getElementById('addedDecays');
  let xButton = document.createElement('button');
  let decayField = document.createElement('fieldset');
  let decayTimeIntervalDiv = document.createElement('div');
  let decayIntervalLabel = document.createElement('p');
  let decayTimeIntervalValue = document.createElement('input');
  let modulationInputLabel = document.createElement('p');
  let timeIntervalModulation = document.createElement('select');
  let decayTimeIntervalModulationEditButton = document.createElement('button');
  let endValueDiv = document.createElement('div');
  let endValueLabel = document.createElement('p');
  let endValueValue = document.createElement('input');
  let endValueModLabel = document.createElement('p');
  let endValueModSelect = document.createElement('select');
  let endValueModEditButton = document.createElement('button');
  let continuousHandlerDiv = document.createElement('div');
  let linearOrExponentialDiv = document.createElement('div');
  let decayLinearLabel = document.createElement('p');
  let linearOrExponentialSwitchLabel = document.createElement('label');
  let linearOrExponentialSwitch = document.createElement('input');
  let linearOrExponentialSpan = document.createElement('span');
  let exponentialLabel = document.createElement('p');
  let exponentialCurveDiv = document.createElement('div');
  let exponentialCurveHandlerDiv = document.createElement('div');
  let concaveOrConvexDiv = document.createElement('div');
  let concaveLabel = document.createElement('p');
  let curveSwitchLabel = document.createElement('label');
  let concaveOrConvexSwitch = document.createElement('input');
  let concaveOrConvexSpan = document.createElement('span');
  let convexLabel = document.createElement('p');
  let slopeDiv = document.createElement('div');
  let setSlopeDiv = document.createElement('div');
  let slopeSwitchDiv = document.createElement('div');
  let slopeLabel = document.createElement('p');
  let decreaseSlope = document.createElement('a');
  let slopeAmount = document.createElement('input');
  let increaseSlope = document.createElement('a');

  addedDecays.appendChild(xButton);
  xButton.className = 'deleteDecay';
  xButton.innerHTML = 'X';
  addedDecays.appendChild(decayField);
  decayField.className = 'pure-u-7-8';
  decayField.appendChild(decayTimeIntervalDiv);
  decayTimeIntervalDiv.className = 'pure-u-1-2';
  decayTimeIntervalDiv.appendChild(decayIntervalLabel);
  decayIntervalLabel.className = 'envelopeValuesLabel';
  decayIntervalLabel.innerHTML = 'Time Interval:';
  decayTimeIntervalDiv.appendChild(decayTimeIntervalValue);
  decayTimeIntervalValue.type = "number";
  decayTimeIntervalValue.min = "1";
  decayTimeIntervalValue.step = "1";
  decayTimeIntervalValue.value = "1";
  decayObject.timeInterval = parseInt(decayTimeIntervalValue.value);
  decayTimeIntervalValue.className = "envelopeInputDisplay";
  decayTimeIntervalValue.setAttribute("style", "width: 40%; margin-left: 6vmin;");
  decayTimeIntervalDiv.appendChild(modulationInputLabel);
  modulationInputLabel.className = 'modInput';
  modulationInputLabel.innerHTML = 'modulation input:';
  decayTimeIntervalDiv.appendChild(timeIntervalModulation);
  timeIntervalModulation.className = 'modInput';
  timeIntervalModulation.setAttribute("style", "margin-left: 6vmin;");
  for (let i = 0; i < modulationArray.length; i++) {
    element = document.createElement('option');
    timeIntervalModulation.appendChild(element);
    element.value = modulationArray[i];
    element.innerHTML = modulationArray[i];
  }
  decayObject.timeIntervalModulation = 'none';
  element = document.createElement('br');
  decayTimeIntervalDiv.appendChild(element);
  decayTimeIntervalDiv.appendChild(decayTimeIntervalModulationEditButton);
  decayTimeIntervalModulationEditButton.innerHTML = 'edit';
  decayTimeIntervalModulationEditButton.setAttribute("style", "visibility: hidden; margin: 2vmin 1vmin 1vmin 9vmin;");

  decayField.appendChild(endValueDiv);
  endValueDiv.className = "pure-u-1-2";
  endValueDiv.appendChild(endValueLabel);
  endValueLabel.className = "envelopeValuesLabel";
  endValueLabel.innerHTML = 'End Value:';
  endValueDiv.appendChild(endValueValue);
  endValueValue.type = 'number';
  endValueValue.min = '0.00';
  endValueValue.max = '100.00';
  endValueValue.step = '0.01';
  endValueValue.value = '80.00';
  decayObject.endValue = parseFloat(endValueValue.value);
  endValueValue.className = "envelopeInputDisplay";
  endValueDiv.appendChild(endValueModLabel);
  endValueModLabel.className = "modInput";
  endValueModLabel.innerHTML = 'modulation input:';
  endValueDiv.appendChild(endValueModSelect);
  endValueModSelect.className = "modInput";
  for (let j = 0; j < modulationArray.length; j++) {
    element = document.createElement('option');
    endValueModSelect.appendChild(element);
    element.innerHTML = modulationArray[j];
    element.value = modulationArray[j];
  }
  decayObject.endValueModulation = 'none';
  endValueDiv.appendChild(endValueModEditButton);
  endValueModEditButton.innerHTML = 'edit';
  endValueModEditButton.setAttribute("style", "visibility: hidden; margin: 2vmin 1vmin 1vmin 6vmin;");

  decayField.appendChild(continuousHandlerDiv);
  continuousHandlerDiv.className = "pure-u-1-2";
  continuousHandlerDiv.setAttribute("style", "visibility: visible; margin: -4vmin 0 0 0;");
  continuousHandlerDiv.appendChild(linearOrExponentialDiv);
  linearOrExponentialDiv.setAttribute("style", "margin: 4vmin 0 4vmin 0;");
  linearOrExponentialDiv.appendChild(decayLinearLabel);
  decayLinearLabel.className = 'activeState';
  decayLinearLabel.innerHTML = 'linear';
  decayLinearLabel.setAttribute("style", "float: left; margin: 1vmin 2vmin 0 0; font-family: 'Righteous', cursive; font-size: 24px;");
  linearOrExponentialDiv.appendChild(linearOrExponentialSwitchLabel);
  linearOrExponentialSwitchLabel.className = 'switch';
  linearOrExponentialSwitchLabel.appendChild(linearOrExponentialSwitch);
  linearOrExponentialSwitch.type = 'checkbox';
  decayObject.exponential = linearOrExponentialSwitch.checked;
  linearOrExponentialSwitch.setAttribute("style", "float: left; margin-left: 1vmin;");
  linearOrExponentialSwitchLabel.appendChild(linearOrExponentialSpan);
  linearOrExponentialSpan.className = 'slider round';
  linearOrExponentialDiv.appendChild(exponentialLabel);
  exponentialLabel.className = 'inactiveState';
  exponentialLabel.innerHTML = 'exponential';
  exponentialLabel.setAttribute("style", "float: right; margin: 1vmin 2vmin 1vmin 1vmin; font-family: 'Righteous', cursive; font-size: 24px;");
  decayField.appendChild(exponentialCurveDiv);
  exponentialCurveDiv.className = 'pure-u-1-2';
  exponentialCurveDiv.appendChild(exponentialCurveHandlerDiv);
  exponentialCurveHandlerDiv.appendChild(concaveOrConvexDiv);
  concaveOrConvexDiv.appendChild(concaveLabel);
  concaveLabel.className = 'activeState';
  concaveLabel.innerHTML = 'concave';
  concaveLabel.setAttribute("style", "float: left; margin: 1vmin 2vmin 0 2vmin; font-family: 'Righteous', cursive; font-size: 24px;");
  concaveOrConvexDiv.appendChild(curveSwitchLabel);
  curveSwitchLabel.className = 'switch';
  curveSwitchLabel.appendChild(concaveOrConvexSwitch);
  concaveOrConvexSwitch.type = 'checkbox';
  decayObject.convex = concaveOrConvexSwitch.checked;
  curveSwitchLabel.appendChild(concaveOrConvexSpan);
  concaveOrConvexSpan.className = "slider round";
  concaveOrConvexDiv.appendChild(convexLabel);
  convexLabel.className = 'inactiveState';
  convexLabel.innerHTML = 'convex';
  convexLabel.setAttribute("style", "float: right; margin: 1vmin 2vmin 1vmin 1vmin; font-family: 'Righteous', cursive; font-size: 24px;");
  decayField.appendChild(slopeDiv);
  slopeDiv.className = 'pure-u-5-6';
  slopeDiv.appendChild(setSlopeDiv);
  setSlopeDiv.setAttribute("style", "visibility: hidden; margin: 0 0 3vmin 16vmin;");
  exponentialCurveHandlerDiv.setAttribute("style", "visibility: hidden;");
  setSlopeDiv.appendChild(slopeSwitchDiv);
  slopeSwitchDiv.appendChild(slopeLabel);
  slopeLabel.className = 'activeState';
  slopeLabel.innerHTML = 'slope:';
  slopeLabel.setAttribute("style", "float: left; margin: 0 3vmin 0 4vmin; font-family: 'Righteous', cursive; font-size: 24px;");
  slopeSwitchDiv.appendChild(decreaseSlope);
  decreaseSlope.className = 'incrementDecriment';
  decreaseSlope.innerHTML = '-';
  slopeSwitchDiv.appendChild(slopeAmount);
  slopeAmount.type = 'number';
  slopeAmount.min = "1";
  slopeAmount.max = "1024";
  slopeAmount.value = "4";
  decayObject.slope = parseInt(slopeAmount.value);
  slopeAmount.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; background: url(../img/january/18e2fca5234f5d52bc44401c5d53c5d4.png); background-size: 300%; background-color: #BFBFBF; box-shadow: -1px -1px 1px #999900, -2px -2px 1px #999900, -3px -3px 1px #999900, -4px -4px 1px #999900; padding-left: 1vmin; height: 50px;");
  slopeSwitchDiv.appendChild(increaseSlope);
  increaseSlope.className = 'incrementDecriment';
  increaseSlope.innerHTML = '+';

  additionalDecayDeleteButtonListen(xButton, decayField, decayObject);
  additionalDecayModulationListen(timeIntervalModulation, decayTimeIntervalModulationEditButton, 9, 'timeIntervalModulation', decayObject);
  additionalDecayModulationListen(endValueModSelect, endValueModEditButton, 6, 'endValueModulation', decayObject);
  additionalLinearOrExponentialListen(linearOrExponentialSwitch, decayLinearLabel, exponentialLabel, exponentialCurveHandlerDiv, setSlopeDiv, decayObject);
  additionalConcaveOrConvexListen(concaveOrConvexSwitch, concaveLabel, convexLabel, decayObject);
  additionalSlopeListen(slopeAmount, decreaseSlope, increaseSlope, decayObject);
  additionalTimeIntervalListen(decayTimeIntervalValue, decayObject);
  additionalEndValueListen(endValueValue, decayObject);
}

function additionalPostSustainDeleteButtonListen(button, postSustainField, postSustainObject) {
  button.addEventListener('click', ()=>{
    postSustainArr.splice((postSustainArr.indexOf(postSustainObject)), 1);
    postSustainField.parentNode.removeChild(postSustainField);
    button.parentNode.removeChild(button);
  });
}

function additionalPostSustainTimeIntervalListen(postTimeInterval, postSustainObject) {
  postTimeInterval.addEventListener('focusout', ()=>{
    postSustainObject.timeInterval = parseInt(postTimeInterval.value);
  });
}

function additionalPostSustainModulationListen(modulationSelect, editButton, leftMargin, key, postSustainObject) {
  modulationSelect.addEventListener('change', ()=>{
    postSustainObject[key] = modulationSelect.value;
    if (modulationSelect.value === 'none') {
      editButton.setAttribute("style", "visibility: hidden; margin: 2vmin 1vmin 1vmin " + leftMargin + "vmin;");
    } else {
      editButton.setAttribute("style", "visibility: visible; margin: 2vmin 1vmin 1vmin "+ leftMargin + "vmin;");
    }
  });
}

function createPostSustainModule(postSustainObject) {
  let modulationArray = [ 'none', 'envelope1', 'envelope2', 'envelope3', 'envelope4', 'frequency1', 'frequency2', 'frequency3' ];
  let element;
  let addedPostSustains = document.getElementById('addedPostSustains');
  let xButton = document.createElement('button');
  let postSustainField = document.createElement('fieldset');
  let postSustainTimeIntervalDiv = document.createElement('div');
  let postSustainIntervalLabel = document.createElement('p');
  let postSustainTimeIntervalValue = document.createElement('input');
  let modulationInputLabel = document.createElement('p');
  let timeIntervalModulation = document.createElement('select');
  let postSustainTimeIntervalModulationEditButton = document.createElement('button');
  let endValueDiv = document.createElement('div');
  let endValueLabel = document.createElement('p');
  let endValueValue = document.createElement('input');
  let endValueModLabel = document.createElement('p');
  let endValueModSelect = document.createElement('select');
  let endValueModEditButton = document.createElement('button');
  let continuousHandlerDiv = document.createElement('div');
  let linearOrExponentialDiv = document.createElement('div');
  let postSustainLinearLabel = document.createElement('p');
  let linearOrExponentialSwitchLabel = document.createElement('label');
  let linearOrExponentialSwitch = document.createElement('input');
  let linearOrExponentialSpan = document.createElement('span');
  let exponentialLabel = document.createElement('p');
  let exponentialCurveDiv = document.createElement('div');
  let exponentialCurveHandlerDiv = document.createElement('div');
  let concaveOrConvexDiv = document.createElement('div');
  let concaveLabel = document.createElement('p');
  let curveSwitchLabel = document.createElement('label');
  let concaveOrConvexSwitch = document.createElement('input');
  let concaveOrConvexSpan = document.createElement('span');
  let convexLabel = document.createElement('p');
  let slopeDiv = document.createElement('div');
  let setSlopeDiv = document.createElement('div');
  let slopeSwitchDiv = document.createElement('div');
  let slopeLabel = document.createElement('p');
  let decreaseSlope = document.createElement('a');
  let slopeAmount = document.createElement('input');
  let increaseSlope = document.createElement('a');

  addedPostSustains.appendChild(xButton);
  xButton.className = 'deleteDecay';
  xButton.innerHTML = 'X';
  addedPostSustains.appendChild(postSustainField);
  postSustainField.className = 'pure-u-7-8';
  postSustainField.appendChild(postSustainTimeIntervalDiv);
  postSustainTimeIntervalDiv.className = 'pure-u-1-2';
  postSustainTimeIntervalDiv.appendChild(postSustainIntervalLabel);
  postSustainIntervalLabel.className = 'envelopeValuesLabel';
  postSustainIntervalLabel.innerHTML = 'Time Interval:';
  postSustainTimeIntervalDiv.appendChild(postSustainTimeIntervalValue);
  postSustainTimeIntervalValue.type = "number";
  postSustainTimeIntervalValue.min = "1";
  postSustainTimeIntervalValue.step = "1";
  postSustainTimeIntervalValue.value = "1";
  postSustainObject.timeInterval = parseInt(postSustainTimeIntervalValue.value);
  postSustainTimeIntervalValue.className = "envelopeInputDisplay";
  postSustainTimeIntervalValue.setAttribute("style", "width: 40%; margin-left: 6vmin;");
  postSustainTimeIntervalDiv.appendChild(modulationInputLabel);
  modulationInputLabel.className = 'modInput';
  modulationInputLabel.innerHTML = 'modulation input:';
  postSustainTimeIntervalDiv.appendChild(timeIntervalModulation);
  timeIntervalModulation.className = 'modInput';
  timeIntervalModulation.setAttribute("style", "margin-left: 6vmin;");
  for (let i = 0; i < modulationArray.length; i++) {
    element = document.createElement('option');
    timeIntervalModulation.appendChild(element);
    element.value = modulationArray[i];
    element.innerHTML = modulationArray[i];
  }
  postSustainObject.timeIntervalModulation = 'none';
  element = document.createElement('br');
  postSustainTimeIntervalDiv.appendChild(element);
  postSustainTimeIntervalDiv.appendChild(postSustainTimeIntervalModulationEditButton);
  postSustainTimeIntervalModulationEditButton.innerHTML = 'edit';
  postSustainTimeIntervalModulationEditButton.setAttribute("style", "visibility: hidden; margin: 2vmin 1vmin 1vmin 9vmin;");

  postSustainField.appendChild(endValueDiv);
  endValueDiv.className = "pure-u-1-2";
  endValueDiv.appendChild(endValueLabel);
  endValueLabel.className = "envelopeValuesLabel";
  endValueLabel.innerHTML = 'End Value:';
  endValueDiv.appendChild(endValueValue);
  endValueValue.type = 'number';
  endValueValue.min = '0.00';
  endValueValue.max = '100.00';
  endValueValue.step = '0.01';
  endValueValue.value = '80.00';
  postSustainObject.endValue = parseFloat(endValueValue.value);
  endValueValue.className = "envelopeInputDisplay";
  endValueDiv.appendChild(endValueModLabel);
  endValueModLabel.className = "modInput";
  endValueModLabel.innerHTML = 'modulation input:';
  endValueDiv.appendChild(endValueModSelect);
  endValueModSelect.className = "modInput";
  for (let j = 0; j < modulationArray.length; j++) {
    element = document.createElement('option');
    endValueModSelect.appendChild(element);
    element.innerHTML = modulationArray[j];
    element.value = modulationArray[j];
  }
  postSustainObject.endValueModulation = 'none';
  endValueDiv.appendChild(endValueModEditButton);
  endValueModEditButton.innerHTML = 'edit';
  endValueModEditButton.setAttribute("style", "visibility: hidden; margin: 2vmin 1vmin 1vmin 6vmin;");

  postSustainField.appendChild(continuousHandlerDiv);
  continuousHandlerDiv.className = "pure-u-1-2";
  continuousHandlerDiv.setAttribute("style", "visibility: visible; margin: -4vmin 0 0 0;");
  continuousHandlerDiv.appendChild(linearOrExponentialDiv);
  linearOrExponentialDiv.setAttribute("style", "margin: 4vmin 0 4vmin 0;");
  linearOrExponentialDiv.appendChild(postSustainLinearLabel);
  postSustainLinearLabel.className = 'activeState';
  postSustainLinearLabel.innerHTML = 'linear';
  postSustainLinearLabel.setAttribute("style", "float: left; margin: 1vmin 2vmin 0 0; font-family: 'Righteous', cursive; font-size: 24px;");
  linearOrExponentialDiv.appendChild(linearOrExponentialSwitchLabel);
  linearOrExponentialSwitchLabel.className = 'switch';
  linearOrExponentialSwitchLabel.appendChild(linearOrExponentialSwitch);
  linearOrExponentialSwitch.type = 'checkbox';
  postSustainObject.exponential = linearOrExponentialSwitch.checked;
  linearOrExponentialSwitch.setAttribute("style", "float: left; margin-left: 1vmin;");
  linearOrExponentialSwitchLabel.appendChild(linearOrExponentialSpan);
  linearOrExponentialSpan.className = 'slider round';
  linearOrExponentialDiv.appendChild(exponentialLabel);
  exponentialLabel.className = 'inactiveState';
  exponentialLabel.innerHTML = 'exponential';
  exponentialLabel.setAttribute("style", "float: right; margin: 1vmin 2vmin 1vmin 1vmin; font-family: 'Righteous', cursive; font-size: 24px;");
  postSustainField.appendChild(exponentialCurveDiv);
  exponentialCurveDiv.className = 'pure-u-1-2';
  exponentialCurveDiv.appendChild(exponentialCurveHandlerDiv);
  exponentialCurveHandlerDiv.appendChild(concaveOrConvexDiv);
  concaveOrConvexDiv.appendChild(concaveLabel);
  concaveLabel.className = 'activeState';
  concaveLabel.innerHTML = 'concave';
  concaveLabel.setAttribute("style", "float: left; margin: 1vmin 2vmin 0 2vmin; font-family: 'Righteous', cursive; font-size: 24px;");
  concaveOrConvexDiv.appendChild(curveSwitchLabel);
  curveSwitchLabel.className = 'switch';
  curveSwitchLabel.appendChild(concaveOrConvexSwitch);
  concaveOrConvexSwitch.type = 'checkbox';
  postSustainObject.convex = concaveOrConvexSwitch.checked;
  curveSwitchLabel.appendChild(concaveOrConvexSpan);
  concaveOrConvexSpan.className = "slider round";
  concaveOrConvexDiv.appendChild(convexLabel);
  convexLabel.className = 'inactiveState';
  convexLabel.innerHTML = 'convex';
  convexLabel.setAttribute("style", "float: right; margin: 1vmin 2vmin 1vmin 1vmin; font-family: 'Righteous', cursive; font-size: 24px;");
  postSustainField.appendChild(slopeDiv);
  slopeDiv.className = 'pure-u-5-6';
  slopeDiv.appendChild(setSlopeDiv);
  setSlopeDiv.setAttribute("style", "visibility: hidden; margin: 0 0 3vmin 16vmin;");
  exponentialCurveHandlerDiv.setAttribute("style", "visibility: hidden;");
  setSlopeDiv.appendChild(slopeSwitchDiv);
  slopeSwitchDiv.appendChild(slopeLabel);
  slopeLabel.className = 'activeState';
  slopeLabel.innerHTML = 'slope:';
  slopeLabel.setAttribute("style", "float: left; margin: 0 3vmin 0 4vmin; font-family: 'Righteous', cursive; font-size: 24px;");
  slopeSwitchDiv.appendChild(decreaseSlope);
  decreaseSlope.className = 'incrementDecriment';
  decreaseSlope.innerHTML = '-';
  slopeSwitchDiv.appendChild(slopeAmount);
  slopeAmount.type = 'number';
  slopeAmount.min = "1";
  slopeAmount.max = "1024";
  slopeAmount.value = "4";
  postSustainObject.slope = parseInt(postSustainObject.slope);
  slopeAmount.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; background: url(../img/january/18e2fca5234f5d52bc44401c5d53c5d4.png); background-size: 300%; background-color: #BFBFBF; box-shadow: -1px -1px 1px #999900, -2px -2px 1px #999900, -3px -3px 1px #999900, -4px -4px 1px #999900; padding-left: 1vmin; height: 50px;");
  slopeSwitchDiv.appendChild(increaseSlope);
  increaseSlope.className = 'incrementDecriment';
  increaseSlope.innerHTML = '+';

  additionalPostSustainDeleteButtonListen(xButton, postSustainField, postSustainObject);
  additionalPostSustainModulationListen(timeIntervalModulation, postSustainTimeIntervalModulationEditButton, 9, 'timeIntervalModulation', postSustainObject);
  additionalPostSustainModulationListen(endValueModSelect, endValueModEditButton, 6, 'endValueModulation', postSustainObject);
  additionalLinearOrExponentialListen(linearOrExponentialSwitch, postSustainLinearLabel, exponentialLabel, exponentialCurveHandlerDiv, setSlopeDiv, postSustainObject);
  additionalConcaveOrConvexListen(concaveOrConvexSwitch, concaveLabel, convexLabel, postSustainObject);
  additionalSlopeListen(slopeAmount, decreaseSlope, increaseSlope, postSustainObject);
  additionalPostSustainTimeIntervalListen(postSustainTimeIntervalValue, postSustainObject);
  additionalEndValueListen(endValueValue, postSustainObject);
}

function getLinearArray(span, start, end) {
  let arr = [];
  if (span === 1) {
    return([end]);
  }
  for (let i = 0; i < span; i++) {
    if (i === 0) {
      arr[i] = (Math.round(start * 1000))/1000;
    } else if (i === span) {
      arr[i] = (Math.round(end * 1000))/1000;
    } else {
      arr[i] = (Math.round((((end - start) * (i/span)) + start) * 1000)/1000);
    }

  }

  return(arr);
}

// function executeArray(arr, display, min, max, interval, endValue) {
//   if (arr.length < 1) {
//     if (moduleActive) {
//       continuousModuleOverTime(interval.value, endValue, getRandomValue(min.value, max.value));
//     } else {
//       return;
//     }
//   } else {
//     if (moduleActive) {
//       display.innerHTML = arr[0];
//       setTimeout(()=>{
//         if (moduleActive) {
//           executeArray(arr.slice(1), display, min, max, interval, endValue);
//         }
//       }, 1);
//     }
//   }
//
// }

function getConvexExponentialArray(interval, startValue, endValue, slope) {
  let arr = [];
  let frame;
  if (slope > interval) {
    frame = 1;
  } else {
    frame = Math.round(interval/slope);
  }
  let start = startValue;
  let end = endValue - ((endValue - startValue) * (1/2));

  if (slope < interval) {
    for (let i = 0; i < slope; i++) {
      if (i === (slope - 1)) {
        end = endValue;
      } else {
        end = endValue - ((endValue - startValue) * (1/(Math.pow(2, i + 1))));
      }
      arr = arr.concat(getLinearArray(frame, start, end));
      start = end;
    }
  } else {

    for (let j = 0; j < interval; j++) {
      if (j === (interval - 1)) {
        end = endValue;
      } else {
        end = endValue - ((endValue - startValue) * (1/(Math.pow(2, j + 1))));
      }
      arr = arr.concat(getLinearArray(frame, start, end));
      start = end;
    }
  }
  return(arr);
}



function getConcaveExponentialArray(interval, startValue, endValue, slope) {
  let arr = [];
  let frame;
  if (slope > interval) {
    frame = 1;
  } else {
    frame = Math.round(interval/slope);
  }
  let start = startValue;
  let end = ((endValue - startValue) * (1/(Math.pow(2, slope)))) + start;

  if (slope < interval) {
    for (let i = 0; i < slope; i++) {
      if (i === (slope - 1)) {
        end = endValue;
      } else {
        end = ((endValue - startValue) * (1/Math.pow(2, (slope - i))) + start);
      }
      arr = arr.concat(getLinearArray(frame, start, end));
      start = end;
    }
  } else {
    for (let j = 0; j < interval; j++) {
      if (j === (interval - 1)) {
        end = endvalue;
      } else {
        end = ((endValue - startValue) * (1/Math.pow(2, (slope - j))) + start);
      }
      arr = arr.concat(getLinearArray(frame, start, end));
      start = end;
    }
  }

  return(arr);
}

// function continuousModuleOverTime (intervalVal, startValue, endValue) {
//   let outputDisplay = document.getElementById('outputDisplay');
//   let minimumDisplay = document.getElementById('minimumDisplay');
//   let maximumDisplay = document.getElementById('maximumDisplay');
//   let intervalDisplay = document.getElementById('intervalDisplay');
//   let linearOrExponential = document.getElementById('linearOrExponential');
//   let concaveOrConvex = document.getElementById('concaveOrConvex');
//   let slopeAmount = document.getElementById('slopeAmount');
//   let interval = parseInt(intervalVal);
//   let overTime = [];
//
//   if (linearOrExponential.checked) {
//     if (concaveOrConvex.checked) {
//       overTime = getConvexExponentialArray(interval, startValue, endValue, parseInt(slopeAmount.value));
//     } else {
//       overTime = getConcaveExponentialArray(interval, startValue, endValue, parseInt(slopeAmount.value));
//     }
//   } else {
//
//     overTime = getLinearArray(interval, startValue, endValue);
//   }
//
//   if (moduleActive) {
//     executeArray(overTime, outputDisplay, minimumDisplay, maximumDisplay, intervalDisplay, endValue);
//
//   }
//
// }

function unfurlArray(arr, requiredKey, next, lastValue) {

  let last;
  let attackSelector = document.getElementById('attackSelector');
  let decaySelector = document.getElementById('decaySelector');
  let sustainSelector = document.getElementById('sustainSelector');

  let meterVerticalDiv = document.getElementById('meterVerticalDiv');
  let hoizontalMeterInnerDivL = document.getElementById('hoizontalMeterInnerDivL');
  let horizontalMeterInnerDivR = document.getElementById('horizontalMeterInnerDivR');
  let releaseSelector = document.getElementById('releaseSelector');
  let postSustainSelector = document.getElementById('postSustainSelector');

  if (arr.length < 1) {
    //this is where we trigger next
    if (next === 'decay') {
      if (document.getElementById('decayOn').checked) {
        console.log('triggered');
        attackSelector.setAttribute("style", "transform: scale(1.0);");
        decaySelector.setAttribute("style", "transform: scale(1.2);");
        sustainSelector.setAttribute("style", "transform: scale(1.0);");
        postSustainSelector.setAttribute("style", "transform: scale(1.0);");
        releaseSelector.setAttribute("style", "transform: scale(1.0)");
        triggerDecay(lastValue);
      } else {
        if (document.getElementById('sustainOn').checked) {
          attackSelector.setAttribute("style", "transform: scale(1.0);");
          decaySelector.setAttribute("style", "transform: scale(1.0);");
          sustainSelector.setAttribute("style", "transform: scale(1.2);");
          postSustainSelector.setAttribute("style", "transform: scale(1.0);");
          releaseSelector.setAttribute("style", "transform: scale(1.0)");
          triggerSustain(lastValue);
        } else {
          if (document.getElementById('postSustainOn').checked) {
          attackSelector.setAttribute("style", "transform: scale(1.0);");
          decaySelector.setAttribute("style", "transform: scale(1.0);");
          sustainSelector.setAttribute("style", "transform: scale(1.0);");
          postSustainSelector.setAttribute("style", "transform: scale(1.2);");
          releaseSelector.setAttribute("style", "transform: scale(1.0)");
          triggerPostSustain(lastValue);
          } else {
            attackSelector.setAttribute("style", "transform: scale(1.0);");
            decaySelector.setAttribute("style", "transform: scale(1.0);");
            sustainSelector.setAttribute("style", "transform: scale(1.0);");
            postSustainSelector.setAttribute("style", "transform: scale(1.0);");
            releaseSelector.setAttribute("style", "transform: scale(1.2)");
            key = 'keyOff';
            triggerRelease(lastValue);
            return;
              // check for post sustain
              // fall through to release
          }
        }
      }
    }
      if (next === 'sustain') {
        if (document.getElementById('sustainOn').checked) {
          attackSelector.setAttribute("style", "transform: scale(1.0);");
          decaySelector.setAttribute("style", "transform: scale(1.0);");
          sustainSelector.setAttribute("style", "transform: scale(1.2);");
          postSustainSelector.setAttribute("style", "transform: scale(1.0);");
          releaseSelector.setAttribute("style", "transform: scale(1.0)");
          triggerSustain(lastValue);
          return;
        }
        if (document.getElementById('postSustainOn').checked) {
          attackSelector.setAttribute("style", "transform: scale(1.0);");
          decaySelector.setAttribute("style", "transform: scale(1.0);");
          sustainSelector.setAttribute("style", "transform: scale(1.0);");
          postSustainSelector.setAttribute("style", "transform: scale(1.2);");
          releaseSelector.setAttribute("style", "transform: scale(1.0)");
          triggerPostSustain(lastValue);
          return;
        //check for post sustain

        //fall through to release
      } else {

        attackSelector.setAttribute("style", "transform: scale(1.0);");
        decaySelector.setAttribute("style", "transform: scale(1.0);");
        sustainSelector.setAttribute("style", "transform: scale(1.0);");
        postSustainSelector.setAttribute("style", "transform: scale(1.0);");
        releaseSelector.setAttribute("style", "transform: scale(1.2)");
        key = 'keyOff';
        triggerRelease(lastValue);
        return;
      }
      }
      if (next=== 'post sustain') {
        if (document.getElementById('postSustainOn').checked) {
          attackSelector.setAttribute("style", "transform: scale(1.0);");
          decaySelector.setAttribute("style", "transform: scale(1.0);");
          sustainSelector.setAttribute("style", "transform: scale(1.0);");
          postSustainSelector.setAttribute("style", "transform: scale(1.2);");
          releaseSelector.setAttribute("style", "transform: scale(1.0)");
          triggerPostSustain(lastValue);
          return;
        //check for post sustain

        //fall through to release
        } else {
          attackSelector.setAttribute("style", "transform: scale(1.0);");
          decaySelector.setAttribute("style", "transform: scale(1.0);");
          sustainSelector.setAttribute("style", "transform: scale(1.0);");
          postSustainSelector.setAttribute("style", "transform: scale(1.0);");
          releaseSelector.setAttribute("style", "transform: scale(1.2)");
          key = 'keyOff';
          triggerRelease(lastValue);
        }
      }
      if (next === 'release') {
        attackSelector.setAttribute("style", "transform: scale(1.0);");
        decaySelector.setAttribute("style", "transform: scale(1.0);");
        sustainSelector.setAttribute("style", "transform: scale(1.0);");
        postSustainSelector.setAttribute("style", "transform: scale(1.0);");
        releaseSelector.setAttribute("style", "transform: scale(1.2)");
        key = 'keyOff';
        triggerRelease(lastValue);
      }
      if (next === '') {
        attackSelector.setAttribute("style", "transform: scale(1.0);");
        decaySelector.setAttribute("style", "transform: scale(1.0);");
        sustainSelector.setAttribute("style", "transform: scale(1.0);");
        postSustainSelector.setAttribute("style", "transform: scale(1.0);");
        releaseSelector.setAttribute("style", "transform: scale(1.0)");
      }
  } else {
    last = arr[0];
    meterVerticalDiv.setAttribute("style", "height: " + (100 - (parseFloat(arr[0]))) + '%;');
    hoizontalMeterInnerDivL.setAttribute("style", "width: " + (parseFloat(arr[0]) - 1) + "%;");
    horizontalMeterInnerDivR.setAttribute("style", "width: " + (100 - (parseFloat(arr[0]))) + "%;");
    if (key === requiredKey) {
      setTimeout(()=>{
        if (arr.length === 1) {
          if (next === '') {
            releaseSelector.setAttribute("style", "transform: scale(1.0);");
          }
        }
        unfurlArray(arr.slice(1), requiredKey, next, last);
      }, 1);
    } else {
      if (key === 'keyOff') {
        if (document.getElementById('postSustainOn').checked) {
          attackSelector.setAttribute("style", "transform: scale(1.0);");
          decaySelector.setAttribute("style", "transform: scale(1.0);");
          sustainSelector.setAttribute("style", "transform: scale(1.0);");
          postSustainSelector.setAttribute("style", "transform: scale(1.2);");
          releaseSelector.setAttribute("style", "transform: scale(1.0)");
          triggerPostSustain(last);
          //trigger post sustain
        } else {
          attackSelector.setAttribute("style", "transform: scale(1.0);");
          decaySelector.setAttribute("style", "transform: scale(1.0);");
          sustainSelector.setAttribute("style", "transform: scale(1.0);");
          postSustainSelector.setAttribute("style", "transform: scale(1.0);");
          releaseSelector.setAttribute("style", "transform: scale(1.2)");
          key = 'keyOff';
          triggerRelease(last);
          //trigger release
        }
      }
    }
  }
}

function executeArray(arr, mode) {

  let attackSelector = document.getElementById('attackSelector');
  let decaySelector = document.getElementById('decaySelector');
  let sustainSelector = document.getElementById('sustainSelector');
  let postSustainSelector = document.getElementById('postSustainSelector');
  let releaseSelector = document.getElementById('releaseSelector');
  let lastValue = 0;

  switch(mode) {
    case('attack'):
      attackSelector.setAttribute("style", "transform: scale(1.2);");
      decaySelector.setAttribute("style", "transform: scale(1.0);");
      sustainSelector.setAttribute("style", "transform: scale(1.0);");
      postSustainSelector.setAttribute("style", "transform: scale(1.0);");
      releaseSelector.setAttribute("style", "transform: scale(1.0);");
      unfurlArray(arr, 'keyOn', 'decay', parseFloat(document.getElementById('attackStartValue').value));
      break;
    case('decay'):
      lastValue = parseFloat(document.getElementById('attackEndValueValue').value);
      attackSelector.setAttribute("style", "transform: scale(1.0);");
      decaySelector.setAttribute("style", "transform: scale(1.2);");
      sustainSelector.setAttribute("style", "transform: scale(1.0);");
      postSustainSelector.setAttribute("style", "transform: scale(1.0);");
      releaseSelector.setAttribute("style", "transform: scale(1.0);");
      unfurlArray(arr, 'keyOn', 'sustain', lastValue);
      break;
    case('post sustain'):
      if (document.getElementById('decayOn').checked) {
        lastValue = decayArr[decayArr.length - 1].endValue;
      } else {
        lastValue = parseFloat(document.getElementById('attackEndValueValue').value);
      }
      attackSelector.setAttribute("style", "transform: scale(1.0);");
      decaySelector.setAttribute("style", "transform: scale(1.0);");
      sustainSelector.setAttribute("style", "transform: scale(1.0);");
      postSustainSelector.setAttribute("style", "transform: scale(1.2);");
      releaseSelector.setAttribute("style", "transform: scale(1.0);");
      unfurlArray(arr, 'keyOff', 'release', lastValue);
      break;
    case('release'):
      if (document.getElementById('postSustainOn').checked) {
        lastValue = postSustainArr[postSustainArr.length - 1].endValue;
      } else if (document.getElementById('decayOn').checked) {
        lastValue = lastValue = decayArr[decayArr.length - 1].endValue;
      } else {
        lastValue = parseFloat(document.getElementById('attackEndValueValue').value);
      }
      attackSelector.setAttribute("style", "transform: scale(1.0);");
      decaySelector.setAttribute("style", "transform: scale(1.0);");
      sustainSelector.setAttribute("style", "transform: scale(1.0);");
      postSustainSelector.setAttribute("style", "transform: scale(1.0);");
      releaseSelector.setAttribute("style", "transform: scale(1.2);");
      unfurlArray(arr, 'keyOff', '', lastValue);
      break;
    default:
    console.log('this mode is not supported');
  }
}

function setModuleInMotion() {
  console.log('in motion');
  let attackTimeIntervalValue = document.getElementById('attackTimeIntervalValue');
  let attackStartValue = document.getElementById('attackStartValue');
  let attackEndValueValue = document.getElementById('attackEndValueValue');
  let linearOrExponential = document.getElementById('linearOrExponential');
  let concaveOrConvex = document.getElementById('concaveOrConvex');
  let slopeAmount = document.getElementById('slopeAmount');

  let attackArray = [];
  let span = parseInt(attackTimeIntervalValue.value);
  let start = parseFloat(attackStartValue.value);
  let end = parseFloat(attackEndValueValue.value);
  let slope = parseInt(slopeAmount.value);

  //TODO attack
  if (linearOrExponential.checked) {
    //set attackArray to exponential array;
    if (concaveOrConvex.checked) {
      attackArray = getConvexExponentialArray(span, start, end, slope);
    } else {
      attackArray = getConcaveExponentialArray(span, start, end, slope);
    }
  } else {
    attackArray = getLinearArray(span, start, end);
  }
  if (key === 'keyOn') {
    executeArray(attackArray, 'attack');
  }
  //TODO sustain (if active)
  //TODO post sustain (if active)
  //TODO release

}

function triggerDecay(lastValue) {
  let decayArray = [];
  let addon = [];
  if (decayArr[0].exponential) {
    if (decayArr[0].convex) {
      decayArray = getConvexExponentialArray(decayArr[0].timeInterval, lastValue, decayArr[0].endValue, decayArr[0].slope);
    } else {
      decayArray = getConcaveExponentialArray(decayArr[0].timeInterval, lastValue, decayArr[0].endValue, decayArr[0].slope);
    }
  } else {
    decayArray = getLinearArray(decayArr[0].timeInterval, lastValue, decayArr[0].endValue);
  }
  if (decayArr.length > 1) {
    for (let i = 1; i < decayArr.length; i++) {
      if (decayArr[i].exponential) {
        if (decayArr[i].convex) {
          addon = getConvexExponentialArray(decayArr[i].timeInterval, decayArr[i-1].endValue, decayArr[i].endValue, decayArr[i].slope);
        } else {
          addon = getConcaveExponentialArray(decayArr[i].timeInterval, decayArr[i-1].endValue, decayArr[i].endValue, decayArr[i].slope);
        }
      } else {
        addon = getLinearArray(decayArr[i].timeInterval, decayArr[i-1].endValue, decayArr[i].endValue);
      }
      decayArray = decayArray.concat(addon);
    }
  }
  executeArray(decayArray, 'decay');
}

function triggerRelease(lastValue) {
  let releaseArray = [];
  if (document.getElementById('releaseLinearOrExponential').checked) {
    if (document.getElementById('releaseConcaveOrConvex').checked) {
      releaseArray = getConvexExponentialArray((parseInt(document.getElementById('releaseTimeIntervalValue').value)), lastValue, (parseFloat(document.getElementById('releaseEndValueValue').value)), (parseInt(document.getElementById('releaseSlopeAmount').value)));
    } else {
      releaseArray = getConcaveExponentialArray((parseInt(document.getElementById('releaseTimeIntervalValue').value)), lastValue, (parseFloat(document.getElementById('releaseEndValueValue').value)), (parseInt(document.getElementById('releaseSlopeAmount').value)));
    }
  } else {
    releaseArray = getLinearArray((parseInt(document.getElementById('releaseTimeIntervalValue').value)), lastValue, (parseFloat(document.getElementById('releaseEndValueValue').value)));
  }
  executeArray(releaseArray, 'release');
}

function triggerPostSustain(lastValue) {
  let postSustainArray = [];
  let addon = [];
  if (postSustainArr[0].exponential) {
    if (postSustainArr[0].convex) {
      postSustainArray = getConvexExponentialArray(postSustainArr[0].timeInterval, lastValue, postSustainArr[0].endValue, postSustainArr[0].slope);
    } else {
      postSustainArray = getConcaveExponentialArray(postSustainArr[0].timeInterval, lastValue, postSustainArr[0].endValue, postSustainArr[0].slope);
    }
  } else {
    postSustainArray = getLinearArray(postSustainArr[0].timeInterval, lastValue, postSustainArr[0].endValue);
  }
  if (postSustainArr.length > 1) {
    for (let i = 1; i < postSustainArr.length; i++) {
      if (postSustainArr[i].exponential) {
        if (postSustainArr[i].convex) {
          addon = getConvexExponentialArray(postSustainArr[i].timeInterval, postSustainArr[i-1].endValue, postSustainArr[i].endValue, postSustainArr[i].slope);
        } else {
          addon = getConcaveExponentialArray(postSustainArr[i].timeInterval, postSustainArr[i-1].endValue, postSustainArr[i].endValue, postSustainArr[i].slope);
        }
      } else {
        addon = getLinearArray(postSustainArr[i].timeInterval, postSustainArr[i-1].endValue, postSustainArr[i].endValue);
      }
      postSustainArray = postSustainArray.concat(addon);
    }
  }
  executeArray(postSustainArray, 'post sustain');
}

function triggerSustain(lastValue) {
  let attackSelector = document.getElementById('attackSelector');
  let decaySelector = document.getElementById('decaySelector');
  let sustainSelector = document.getElementById('sustainSelector');
  let postSustainSelector = document.getElementById('postSustainSelector');
  let releaseSelector = document.getElementById('releaseSelector');
  console.log('sustain at ' + lastValue);
  setTimeout(()=>{
    if (key === 'keyOn') {
      triggerSustain(lastValue);
    } else {
      if (document.getElementById('postSustainOn').checked) {
        attackSelector.setAttribute("style", "transform: scale(1.0);");
        decaySelector.setAttribute("style", "transform: scale(1.0);");
        sustainSelector.setAttribute("style", "transform: scale(1.0);");
        postSustainSelector.setAttribute("style", "transform: scale(1.2);");
        releaseSelector.setAttribute("style", "transform: scale(1.0);");
        triggerPostSustain(lastValue);
        //trigger post sustain
      } else {
        attackSelector.setAttribute("style", "transform: scale(1.0);");
        decaySelector.setAttribute("style", "transform: scale(1.0);");
        sustainSelector.setAttribute("style", "transform: scale(1.0);");
        postSustainSelector.setAttribute("style", "transform: scale(1.0);");
        releaseSelector.setAttribute("style", "transform: scale(1.2);");
        triggerRelease(lastValue);
        //trigger release
      }
      //check for post sustain
      //fall through to release
    }
  }, 1);
}

window.onload = ()=>{
  let increaseSlope = document.getElementById('increaseSlope');
  let slopeAmount = document.getElementById('slopeAmount');
  let decreaseSlope = document.getElementById('decreaseSlope');
  let continuousHandlerDiv = document.getElementById('continuousHandlerDiv');
  let exponentialCurveHanlderDiv = document.getElementById('exponentialCurveHanlderDiv');
  let linearOrExponential = document.getElementById('linearOrExponential');
  let stepLabel = document.getElementById('stepLabel');
  let linearLabel = document.getElementById('linearLabel');
  let exponentialLabel = document.getElementById('exponentialLabel');
  let concaveOrConvex = document.getElementById('concaveOrConvex');
  let concaveLabel = document.getElementById('concaveLabel');
  let convexLabel = document.getElementById('convexLabel');
  let attackSelector = document.getElementById('attackSelector');
  let attackWindow = document.getElementById('attackWindow');
  let attackStartValue = document.getElementById('attackStartValue');
  let meterVerticalDiv = document.getElementById('meterVerticalDiv');
  let hoizontalMeterInnerDivL = document.getElementById('hoizontalMeterInnerDivL');
  let horizontalMeterInnerDivR = document.getElementById('horizontalMeterInnerDivR');
  let slopeDiv = document.getElementById('slopeDiv');
  let attackStartValueModSelect = document.getElementById('attackStartValueModSelect');
  let attackStartValueModulationEditButton = document.getElementById('attackStartValueModulationEditButton');
  let attackTimeIntervalModSelect = document.getElementById('attackTimeIntervalModSelect');
  let attackTimeIntervalModulationEditButton = document.getElementById('attackTimeIntervalModulationEditButton');
  let attackEndValueModSelect = document.getElementById('attackEndValueModSelect');
  let attackEndValueModulationEditButton = document.getElementById('attackEndValueModulationEditButton');
  let decaySelector = document.getElementById('decaySelector');
  let decayWindow = document.getElementById('decayWindow');
  let decayTimeIntervalModSelect1 = document.getElementById('decayTimeIntervalModSelect1');
  let decayTimeIntervalModulationEditButton1 = document.getElementById('decayTimeIntervalModulationEditButton1');
  let decayEndValueModSelect1 = document.getElementById('decayEndValueModSelect1');
  let decayEndValueModulationEditButton1 = document.getElementById('decayEndValueModulationEditButton1');
  let decayLinearOrExponential = document.getElementById('decayLinearOrExponential');
  let decayExponentialCurveHanlderDiv = document.getElementById('decayExponentialCurveHanlderDiv');
  let decaySlopeDiv = document.getElementById('decaySlopeDiv');
  let decayLinearLabel = document.getElementById('decayLinearLabel');
  let decayExponentialLabel = document.getElementById('decayExponentialLabel');
  let decayConcaveOrConvex = document.getElementById('decayConcaveOrConvex');
  let decayConcaveLabel = document.getElementById('decayConcaveLabel');
  let decayConvexLabel = document.getElementById('decayConvexLabel');
  let decayDecreaseSlope = document.getElementById('decayDecreaseSlope');
  let decaySlopeAmount = document.getElementById('decaySlopeAmount');
  let decayIncreaseSlope = document.getElementById('decayIncreaseSlope');
  let decayUniverse = document.getElementById('decayUniverse');
  let decayOn = document.getElementById('decayOn');
  let addedDecays = document.getElementById('addedDecays');
  let addNewDecay = document.getElementById('addNewDecay');
  let sustainSelector = document.getElementById('sustainSelector');
  let sustainWindow = document.getElementById('sustainWindow');
  let sustainOn = document.getElementById('sustainOn');
  let sustainTimeIntervalModSelect1 = document.getElementById('sustainTimeIntervalModSelect1');
  let sustainTimeIntervalModulationEditButton1 = document.getElementById('sustainTimeIntervalModulationEditButton1');
  let postSustainSelector = document.getElementById('postSustainSelector');
  let postSustainWindow = document.getElementById('postSustainWindow');
  let postSustainOn = document.getElementById('postSustainOn');
  let postSustainUniverse = document.getElementById('postSustainUniverse');
  let postSustainTimeIntervalValue1 = document.getElementById('postSustainTimeIntervalValue1');
  let postSustainTimeIntervalModSelect1 = document.getElementById('postSustainTimeIntervalModSelect1');
  let postSustainTimeIntervalModulationEditButton1 = document.getElementById('postSustainTimeIntervalModulationEditButton1');
  let postSustainEndValueValue = document.getElementById('postSustainEndValueValue');
  let postEndValueModSelect1 = document.getElementById('postEndValueModSelect1');
  let postSustainEndValueModulationEditButton1 = document.getElementById('postSustainEndValueModulationEditButton1');
  let postSustainLinearOrExponential = document.getElementById('postSustainLinearOrExponential');
  let postSustainLinearLabel = document.getElementById('postSustainLinearLabel');
  let postSustainExponentialLabel = document.getElementById('postSustainExponentialLabel');
  let postSustainExponentialCurveHanlderDiv = document.getElementById('postSustainExponentialCurveHanlderDiv');
  let postSustainConcaveOrConvex = document.getElementById('postSustainConcaveOrConvex');
  let postSusatinConcaveLabel = document.getElementById('postSusatinConcaveLabel');
  let postSustainConvexLabel = document.getElementById('postSustainConvexLabel');
  let postSustainSlopeDiv = document.getElementById('postSustainSlopeDiv');
  let postSustainSlopeAmount = document.getElementById('postSustainSlopeAmount');
  let postSustainDecreaseSlope = document.getElementById('postSustainDecreaseSlope');
  let postSustainIncreaseSlope = document.getElementById('postSustainIncreaseSlope');
  let addedPostSustains = document.getElementById('addedPostSustains');
  let addNewPostSustain = document.getElementById('addNewPostSustain');
  let releaseSelector = document.getElementById('releaseSelector');
  let releaseWindow = document.getElementById('releaseWindow');
  let releaseTimeIntervalModSelect = document.getElementById('releaseTimeIntervalModSelect');
  let releaseTimeIntervalModulationEditButton = document.getElementById('releaseTimeIntervalModulationEditButton');
  let releaseEndValueModSelect = document.getElementById('releaseEndValueModSelect');
  let releaseEndValueModulationEditButton = document.getElementById('releaseEndValueModulationEditButton');
  let releaseLinearOrExponential = document.getElementById('releaseLinearOrExponential');
  let releaseLinearLabel = document.getElementById('releaseLinearLabel');
  let releaseExponentialLabel = document.getElementById('releaseExponentialLabel');
  let releaseExponentialCurveHanlderDiv = document.getElementById('releaseExponentialCurveHanlderDiv');
  let releaseSlopeDiv = document.getElementById('releaseSlopeDiv');
  let releaseConcaveOrConvex = document.getElementById('releaseConcaveOrConvex');
  let releaseConcaveLabel = document.getElementById('releaseConcaveLabel');
  let releaseConvexLabel = document.getElementById('releaseConvexLabel');
  let releaseSlopeAmount = document.getElementById('releaseSlopeAmount');
  let releaseDecreaseSlope = document.getElementById('releaseDecreaseSlope');
  let releaseIncreaseSlope = document.getElementById('releaseIncreaseSlope');

  meterVerticalDiv.setAttribute("style", "height: " + (99.5 - Math.floor(parseFloat(attackStartValue.value)) - 1) + '%;');
  hoizontalMeterInnerDivL.setAttribute("style", "width: " + Math.floor(parseFloat(attackStartValue.value)) + "%;");
  horizontalMeterInnerDivR.setAttribute("style", "width: " + (99.5 - Math.floor(parseFloat(attackStartValue.value))) + "%;");
  if (moduleState === 'Attack') {
    attackSelector.setAttribute("style", "filter: saturate(1000%); transition: filter 1.2s linear;");
    attackWindow.setAttribute("style", "display: initial;");
    decayWindow.setAttribute("style", "display: none;");
  }

  while (addedDecays.firstChild) {
    addedDecays.removeChild(addedDecays.firstChild);
  }
  while (addedPostSustains.firstChild) {
    addedPostSustains.removeChild(addedPostSustains.firstChild);
  }
  decayArr[0] = {};
  decayArr[0].timeInterval = parseInt(decayTimeIntervalValue1.value);
  decayArr[0].timeIntervalModulation = decayTimeIntervalModSelect1.value;
  decayArr[0].endValue = parseFloat(decayEndValueValue.value);
  decayArr[0].endValueModulation = decayEndValueModSelect1.value;
  decayArr[0].exponential = decayLinearOrExponential.checked;
  decayArr[0].convex = decayConcaveOrConvex.checked;
  decayArr[0].slope = parseInt(decaySlopeAmount.value);
  postSustainArr[0] = {};
  postSustainArr[0].timeInterval = parseInt(postSustainTimeIntervalValue1.value);
  postSustainArr[0].timeIntervalModulation = postSustainTimeIntervalModSelect1.value;
  postSustainArr[0].endValue = parseFloat(postSustainEndValueValue.value);
  postSustainArr[0].endValueModulation = postEndValueModSelect1.value;
  postSustainArr[0].exponential = postSustainLinearOrExponential.checked;
  postSustainArr[0].convex = postSustainConcaveOrConvex.checked;
  postSustainArr[0].slope = parseInt(postSustainSlopeAmount.value);

  addNewDecay.addEventListener('click', ()=>{
    decayArr[decayArr.length] = {};
    createDecayModule(decayArr[decayArr.length - 1]);
  });

  releaseIncreaseSlope.addEventListener('click', ()=>{
    releaseSlopeAmount.value = (parseInt(releaseSlopeAmount.value) + 1).toString();
    if (releaseSlopeAmount.value === '1024') {
      releaseIncreaseSlope.setAttribute("style", "visibility: hidden;");
      releaseDecreaseSlope.setAttribute("style", "visibility: visible;");
    } else {
      releaseIncreaseSlope.setAttribute("style", "visibility: visible;");
      releaseDecreaseSlope.setAttribute("style", "visibility: visible;");
    }
  });
  releaseDecreaseSlope.addEventListener('click', ()=>{
    releaseSlopeAmount.value = (parseInt(releaseSlopeAmount.value) - 1).toString();
    if (releaseSlopeAmount.value === '1') {
      releaseDecreaseSlope.setAttribute("style", "visibility: hidden;");
      releaseIncreaseSlope.setAttribute("style", "visibility: visible;");
    } else {
      releaseDecreaseSlope.setAttribute("style", "visibility: visible;");
      releaseIncreaseSlope.setAttribute("style", "visibility: visible;");
    }
  });
  releaseConcaveOrConvex.addEventListener('click', ()=>{
    if (releaseConcaveOrConvex.checked) {
      releaseConcaveLabel.className = "inactiveState";
      releaseConvexLabel.className = "activeState";
    } else {
      releaseConcaveLabel.className = "activeState";
      releaseConvexLabel.className = "inactiveState";
    }
  });
  releaseLinearOrExponential.addEventListener('click', ()=>{
    if (releaseLinearOrExponential.checked) {
      releaseLinearLabel.className = 'inactiveState';
      releaseExponentialLabel.className = 'activeState';
      releaseExponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
      releaseSlopeDiv.setAttribute("style", "visibility: visible;");
    } else {
      releaseLinearLabel.className = 'activeState';
      releaseExponentialLabel.className = 'inactiveState';
      releaseExponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
      releaseSlopeDiv.setAttribute("style", "visibility: hidden;");
    }
  });
  releaseEndValueModSelect.addEventListener('change', ()=>{
    if (releaseEndValueModSelect.value === 'none') {
      releaseEndValueModulationEditButton.setAttribute("style", "visibility: hidden;");
    } else {
      releaseEndValueModulationEditButton.setAttribute("style", "visibility: visible;");
    }
  });
  releaseTimeIntervalModSelect.addEventListener('change', ()=>{
    if (releaseTimeIntervalModSelect.value === 'none') {
      releaseTimeIntervalModulationEditButton.setAttribute("style", "visibility: hidden;");
    } else {
      releaseTimeIntervalModulationEditButton.setAttribute("style", "visibility: visible;");
    }
  });
  addNewPostSustain.addEventListener('click', ()=>{
    postSustainArr[postSustainArr.length] = {};
    createPostSustainModule(postSustainArr[postSustainArr.length - 1]);
  })

  postSustainSlopeAmount.addEventListener('focusout', ()=>{
    postSustainArr[0].slope = parseInt(postSustainSlopeAmount.value);
  });

  postSustainDecreaseSlope.addEventListener('click', ()=>{
    postSustainSlopeAmount.value = (parseInt(postSustainSlopeAmount.value) - 1).toString();
    postSustainArr[0].slope = parseInt(postSustainSlopeAmount.value);
    if (postSustainSlopeAmount.value === '1') {
      postSustainDecreaseSlope.setAttribute("style", "visibility: hidden;");
      postSustainIncreaseSlope.setAttribute("style", "visibility: visible;");
    } else {
      postSustainDecreaseSlope.setAttribute("style", "visibility: visible;");
      postSustainIncreaseSlope.setAttribute("style", "visibility: visible;");
    }
  });
  postSustainIncreaseSlope.addEventListener('click', ()=>{
    postSustainSlopeAmount.value = (parseInt(postSustainSlopeAmount.value) + 1).toString();
    postSustainArr[0].slope = parseInt(postSustainSlopeAmount.value);
    if (postSustainSlopeAmount === '1024') {
      postSustainIncreaseSlope.setAttribute("style", "visibility: hidden;");
      postSustainDecreaseSlope.setAttribute("style", "visibility: visible;");
    } else {
      postSustainIncreaseSlope.setAttribute("style", "visibility: visible;");
      postSustainDecreaseSlope.setAttribute("style", "visibility: visible;");
    }
  });

  postSustainTimeIntervalValue1.addEventListener('focusout', ()=>{
    postSustainArr[0].timeInterval = parseInt(postSustainTimeIntervalValue1.value);
  });
  postSustainEndValueValue.addEventListener('focusout', ()=>{
    postSustainArr[0].endValue = parseFloat(postSustainEndValueValue.value);
  });
  postSustainLinearOrExponential.addEventListener('click', ()=>{
    postSustainArr[0].exponential = postSustainLinearOrExponential.checked;
    if (postSustainLinearOrExponential.checked) {
      postSustainLinearLabel.className = 'inactiveState';
      postSustainExponentialLabel.className = 'activeState';
      postSustainExponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
      postSustainSlopeDiv.setAttribute("style", "visibility: visible;");
    } else {
      postSustainLinearLabel.className = 'activeState';
      postSustainExponentialLabel.className = 'inactiveState';
      postSustainExponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
      postSustainSlopeDiv.setAttribute("style", "visibility: hidden;");
    }
  });
  postSustainConcaveOrConvex.addEventListener('click', ()=>{
    postSustainArr[0].convex = postSustainConcaveOrConvex.checked;
    if (postSustainConcaveOrConvex.checked) {
      postSusatinConcaveLabel.className = 'inactiveState';
      postSustainConvexLabel.className = 'activeState';
    } else {
      postSusatinConcaveLabel.className = 'activeState';
      postSustainConvexLabel.className = 'inactiveState';
    }
  });

  decayTimeIntervalValue1.addEventListener('focusout', ()=>{
    decayArr[0].timeInterval = parseInt(decayTimeIntervalValue1.value);
  });
  decayEndValueValue.addEventListener('focusout', ()=>{
    decayArr[0].endValue = parseFloat(decayEndValueValue.value);
  });
  postSustainTimeIntervalModSelect1.addEventListener('change', ()=>{
    postSustainArr[0].timeIntervalModulation = postSustainTimeIntervalModSelect1.value;
    if (postSustainTimeIntervalModSelect1.value === 'none') {
      postSustainTimeIntervalModulationEditButton1.setAttribute("style", "visibility: hidden;");
    } else {
      postSustainTimeIntervalModulationEditButton1.setAttribute("style", "visibility: visible;");
    }
  });
  postEndValueModSelect1.addEventListener('change', ()=>{
    postSustainArr[0].endValueModulation = postEndValueModSelect1.value;
    if (postEndValueModSelect1.value === 'none') {
      postSustainEndValueModulationEditButton1.setAttribute("style", "visibility: hidden;");
    } else {
      postSustainEndValueModulationEditButton1.setAttribute("style", "visibility: visible;");
    }
  });


  postSustainOn.addEventListener('change', ()=>{
    if (postSustainOn.checked) {
      postSustainUniverse.setAttribute("style", "opacity: 1.0;");
    } else {
      postSustainUniverse.setAttribute("style", "opacity: 0.2;");
    }
  });
  decayOn.addEventListener('change', ()=>{
    if (decayOn.checked) {
      decayUniverse.setAttribute("style", "opacity: 1.0;");
    } else {
      decayUniverse.setAttribute("style", "opacity: 0.2;");
    }
  });
  decayEndValueModSelect1.addEventListener('change', ()=>{
    decayArr[0].endValueModulation = decayEndValueModSelect1.value;
    if (decayEndValueModSelect1.value === 'none') {
      decayEndValueModulationEditButton1.setAttribute("style", "visibility: hidden;");
    } else {
      decayEndValueModulationEditButton1.setAttribute("style", "visibility: visible;");
    }
  });
  decayTimeIntervalModSelect1.addEventListener('change', ()=>{
    decayArr[0].timeIntervalModulation = decayTimeIntervalModSelect1;
    if (decayTimeIntervalModSelect1.value === 'none') {
      decayTimeIntervalModulationEditButton1.setAttribute("style", "visibility: hidden;");
    } else {
      decayTimeIntervalModulationEditButton1.setAttribute("style", "visibility: visible;");
    }
  });
  attackSelector.addEventListener('click', ()=>{
    if (moduleState !== 'Attack') {
      moduleState = 'Attack';
      attackSelector.setAttribute("style", "filter: saturate(1000%);");
      decaySelector.setAttribute("style", "filter: saturate(100%);");
      sustainSelector.setAttribute("style", "filter: saturate(100%);");
      postSustainSelector.setAttribute("style", "filter: saturate(100%);");
      releaseSelector.setAttribute("style", "filter: saturate(100%);");
      attackWindow.setAttribute("style", "display: initial;");
      decayWindow.setAttribute("style", "display: none;");
      sustainWindow.setAttribute("style", "display: none;");
      postSustainWindow.setAttribute("style", "display: none;");
      releaseWindow.setAttribute("style", "display: none;");
    }
  });
  decaySelector.addEventListener('click', ()=>{
    if (moduleState !== 'Decay') {
      moduleState = 'Decay';
      attackSelector.setAttribute("style", "filter: saturate(100%);");
      decaySelector.setAttribute("style", "filter: saturate(1000%);");
      sustainSelector.setAttribute("style", "filter: saturate(100%);");
      postSustainSelector.setAttribute("style", "filter: saturate(100%);");
      releaseSelector.setAttribute("style", "filter: saturate(100%);");
      attackWindow.setAttribute("style", "display: none;");
      decayWindow.setAttribute("style", "display: initial;");
      sustainWindow.setAttribute("style", "display: none;");
      postSustainWindow.setAttribute("style", "display: none;");
      releaseWindow.setAttribute("style", "display: none;");
    }
  });
  sustainSelector.addEventListener('click', ()=>{
    if (moduleState !== 'Sustain') {
      moduleState = 'Sustain';
      attackSelector.setAttribute("style", "filter: saturate(100%);");
      decaySelector.setAttribute("style", "filter: saturate(100%);");
      sustainSelector.setAttribute("style", "filter: saturate(1000%);");
      postSustainSelector.setAttribute("style", "filter: saturate(100%);");
      releaseSelector.setAttribute("style", "filter: saturate(100%);");
      attackWindow.setAttribute("style", "display: none;");
      decayWindow.setAttribute("style", "display: none;");
      sustainWindow.setAttribute("style", "display: initial;");
      postSustainWindow.setAttribute("style", "display: none;");
      releaseWindow.setAttribute("style", "display: none;");
    }
  });
  postSustainSelector.addEventListener('click', ()=>{
    if (moduleState !== 'Post Sustain') {
      moduleState = 'Post Sustain';
      attackSelector.setAttribute("style", "filter: saturate(100%);");
      decaySelector.setAttribute("style", "filter: saturate(100%);");
      sustainSelector.setAttribute("style", "filter: saturate(100%);");
      postSustainSelector.setAttribute("style", "filter: saturate(1000%);");
      releaseSelector.setAttribute("style", "filter: saturate(100%);");
      attackWindow.setAttribute("style", "display: none;");
      decayWindow.setAttribute("style", "display: none;");
      sustainWindow.setAttribute("style", "display: none;");
      postSustainWindow.setAttribute("style", "display: initial;");
      releaseWindow.setAttribute("style", "display: none;");
    }
  });
  releaseSelector.addEventListener('click', ()=>{
      if (moduleState !== 'Release') {
        moduleState = 'Release';
        attackSelector.setAttribute("style", "filter: saturate(100%);");
        decaySelector.setAttribute("style", "filter: saturate(100%);");
        sustainSelector.setAttribute("style", "filter: saturate(100%);");
        postSustainSelector.setAttribute("style", "filter: saturate(100%);");
        releaseSelector.setAttribute("style", "filter: saturate(1000%);");
        attackWindow.setAttribute("style", "display: none;");
        decayWindow.setAttribute("style", "display: none;");
        sustainWindow.setAttribute("style", "display: none;");
        postSustainWindow.setAttribute("style", "display: none;");
        releaseWindow.setAttribute("style", "display: initial;");
      }
  });
  attackStartValue.addEventListener('change', ()=>{
    if (key === 'keyOff') {
      meterVerticalDiv.setAttribute("style", "height: " + (100 - Math.floor(parseFloat(attackStartValue.value))) + '%;');
      hoizontalMeterInnerDivL.setAttribute("style", "width: " + Math.floor(parseFloat(attackStartValue.value) - 1) + "%;");
      horizontalMeterInnerDivR.setAttribute("style", "width: " + (100 - Math.floor(parseFloat(attackStartValue.value))) + "%;");
    }
  });
  attackStartValueModSelect.addEventListener('change', ()=>{
    if (attackStartValueModSelect.value === 'none') {
      attackStartValueModulationEditButton.setAttribute("style", "visibility: hidden;");
    } else {
      attackStartValueModulationEditButton.setAttribute("style", "visibility: visible;");
    }
  });
  attackTimeIntervalModSelect.addEventListener('change', ()=>{
    if (attackTimeIntervalModSelect.value === 'none') {
      attackTimeIntervalModulationEditButton.setAttribute("style", "visibility: hidden;");
    } else {
      attackTimeIntervalModulationEditButton.setAttribute("style", "visibility: visible;");
    }
  });
  attackEndValueModSelect.addEventListener('change', ()=>{
    if (attackEndValueModSelect.value === 'none') {
      attackEndValueModulationEditButton.setAttribute("style", "visibility: hidden;");
    } else {
      attackEndValueModulationEditButton.setAttribute("style", "visibility: visible;");
    }
  });

  decayLinearOrExponential.addEventListener('change', ()=>{
    decayArr[0].exponential = decayLinearOrExponential.checked;
    if (decayLinearOrExponential.checked) {
      decayExponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
      decaySlopeDiv.setAttribute("style", "visibility: visible;");
      decayLinearLabel.className = 'inactiveState';
      decayExponentialLabel.className = 'activeState';
    } else {
      decayExponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
      decaySlopeDiv.setAttribute("style", "visibility: hidden;");
      decayLinearLabel.className = 'activeState';
      decayExponentialLabel.className = 'inactiveState';
    }
  });

  linearOrExponential.addEventListener('change', ()=>{
    if (linearOrExponential.checked) {
      exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
      slopeDiv.setAttribute("style", "visibility: visible;");
      linearLabel.className = 'inactiveState';
      exponentialLabel.className = 'activeState';
    } else {
      exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
      slopeDiv.setAttribute("style", "visibility: hidden;");
      linearLabel.className = 'activeState';
      exponentialLabel.className = 'inactiveState';
    }
  });

  decayConcaveOrConvex.addEventListener('change', ()=>{
    decayArr[0].convex = decayConcaveOrConvex.checked;
    if (decayConcaveOrConvex.checked) {
      decayConcaveLabel.className = 'inactiveState';
      decayConvexLabel.className = 'activeState';
    } else {
      decayConcaveLabel.className = 'activeState';
      decayConvexLabel.className = 'inactiveState';
    }
  });

  concaveOrConvex.addEventListener('change', ()=>{
    if (concaveOrConvex.checked) {
      concaveLabel.className = 'inactiveState';
      convexLabel.className = 'activeState';
    } else {
      concaveLabel.className = 'activeState';
      convexLabel.className = 'inactiveState';
    }
  });

  decayIncreaseSlope.addEventListener('click', ()=>{
    decaySlopeAmount.value++;
    decayArr[0].slope = parseInt(decaySlopeAmount.value);
    if (decaySlopeAmount.value === "1024") {
      decayIncreaseSlope.setAttribute("style", "visibility: hidden;");
    }
    if (decaySlopeAmount.value === "2") {
      decayDecreaseSlope.setAttribute("style", "visibility: visible;");
    }
  });

  increaseSlope.addEventListener('click', ()=>{
    slopeAmount.value++;
    decayArr[0].slope = parseInt(decaySlopeAmount.value);
    if (slopeAmount.value === "1024") {
      increaseSlope.setAttribute("style", "visibility: hidden;");
    }
    if (slopeAmount.value === "2") {
      decreaseSlope.setAttribute("style", "visibility: visible;");
    }
  });

  decayDecreaseSlope.addEventListener('click', ()=>{
    decaySlopeAmount.value--;
    if (decaySlopeAmount.value === "1") {
      decayDecreaseSlope.setAttribute("style", "visibility: hidden;");
    }
    if (decaySlopeAmount.value === "1023") {
      decayIncreaseSlope.setAttribute("style", "visibility: visible;");
    }
  });

  decreaseSlope.addEventListener('click', ()=>{
    slopeAmount.value--;
    if (slopeAmount.value === "1") {
      decreaseSlope.setAttribute("style", "visibility: hidden;");
    }
    if (slopeAmount.value === "1023") {
      increaseSlope.setAttribute("style", "visibility: visible;");
    }
  });

  slopeAmount.addEventListener('focusout', ()=>{
    if (slopeAmount.value === "1024") {
      increaseSlope.setAttribute("style", "visibility: hidden;");
    } else {
      increaseSlope.setAttribute("style", "visibility: visible;");
    }
    if (slopeAmount.value === "1") {
      decreaseSlope.setAttribute("style", "visibility: hidden;");
    } else {
      decreaseSlope.setAttribute("style", "visibility: visible;");
    }
  });

  sustainOn.addEventListener('change', ()=>{
    if (sustainOn.checked) {
      sustainUniverse.setAttribute("style", "opacity: 1.0;");
    } else {
      sustainUniverse.setAttribute("style", "opacity: 0.2;");
    }
  });

  sustainTimeIntervalModSelect1.addEventListener('change', ()=>{
    if (sustainTimeIntervalModSelect1.value === 'none') {
      sustainTimeIntervalModulationEditButton1.setAttribute("style", "visibility: hidden;");
    } else {
      sustainTimeIntervalModulationEditButton1.setAttribute("style", "visibility: visible;");
    }
  });


  document.body.onkeyup = (e)=>{
    if (e.keyCode === spacebar) {
      if (key === 'keyOn') {
        key = 'keyOff';
      } else {
        key = 'keyOn';
        setModuleInMotion();
      }
    }
  };
};
