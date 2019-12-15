'use strict';
var moduleActive = false;
const spacebar = 32;

function getRandomValue(minval, maxval) {

  let min = parseInt(minval);
  let max = parseInt(maxval);
  let result = 0;
  if (min < max) {
    result = (Math.random() * (max - min)) + min;
  } else if (min > max) {
    result = (Math.random() * (min - max)) + max;
  } else {
    result = min;
  }


  return((Math.round(result * 1000))/1000);
}

function moduleOverTime (intervalVal, random1, random2) {
  let outputDisplay = document.getElementById('outputDisplay');
  let minimumDisplay = document.getElementById('minimumDisplay');
  let maximumDisplay = document.getElementById('maximumDisplay');
  let intervalDisplay = document.getElementById('intervalDisplay');
  let interval = parseInt(intervalVal);

  outputDisplay.innerHTML = random1;
  if (moduleActive) {
    setTimeout(()=>{
      if (moduleActive) {
        moduleOverTime(intervalDisplay.value, random2, getRandomValue(minimumDisplay.value, maximumDisplay.value));
      }
    }, interval);
  }


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

function executeArray(arr, display, min, max, interval, endValue) {
  if (arr.length < 1) {
    if (moduleActive) {
      continuousModuleOverTime(interval.value, endValue, getRandomValue(min.value, max.value));
    } else {
      return;
    }
  } else {
    if (moduleActive) {
      display.innerHTML = arr[0];
      setTimeout(()=>{
        if (moduleActive) {
          executeArray(arr.slice(1), display, min, max, interval, endValue);
        }
      }, 1);
    }
  }

}

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
    for (let i = 0; i <slope; i++) {
      end = endValue - ((endValue - startValue) * (1/(Math.pow(2, i + 1))));
      arr = arr.concat(getLinearArray(frame, start, end));
      start = end;
    }
  } else {

    for (let j = 0; j < interval; j++) {
      end = endValue - ((endValue - startValue) * (1/(Math.pow(2, j + 1))));
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
      end = ((endValue - startValue) * (1/Math.pow(2, (slope - i))) + start);
      arr = arr.concat(getLinearArray(frame, start, end));
      start = end;
    }
  } else {
    for (let j = 0; j < interval; j++) {
      end = ((endValue - startValue) * (1/Math.pow(2, (slope - j))) + start);
      arr = arr.concat(getLinearArray(frame, start, end));
      start = end;
    }
  }

  return(arr);
}

function continuousModuleOverTime (intervalVal, startValue, endValue) {
  let outputDisplay = document.getElementById('outputDisplay');
  let minimumDisplay = document.getElementById('minimumDisplay');
  let maximumDisplay = document.getElementById('maximumDisplay');
  let intervalDisplay = document.getElementById('intervalDisplay');
  let linearOrExponential = document.getElementById('linearOrExponential');
  let concaveOrConvex = document.getElementById('concaveOrConvex');
  let slopeAmount = document.getElementById('slopeAmount');
  let interval = parseInt(intervalVal);
  let overTime = [];

  if (linearOrExponential.checked) {
    if (concaveOrConvex.checked) {
      overTime = getConvexExponentialArray(interval, startValue, endValue, parseInt(slopeAmount.value));
    } else {
      overTime = getConcaveExponentialArray(interval, startValue, endValue, parseInt(slopeAmount.value));
    }
  } else {

    overTime = getLinearArray(interval, startValue, endValue);
  }

  if (moduleActive) {
    executeArray(overTime, outputDisplay, minimumDisplay, maximumDisplay, intervalDisplay, endValue);

  }

}

function setModuleInMotion() {
  let outputDisplay = document.getElementById('outputDisplay');
  let minimumDisplay = document.getElementById('minimumDisplay');
  let maximumDisplay = document.getElementById('maximumDisplay');
  let intervalDisplay = document.getElementById('intervalDisplay');
  let stepOrContinuous = document.getElementById('stepOrContinuous');

  if (parseInt(intervalDisplay.value) === 0) {
    outputDisplay.innerHTML = getRandomValue(minimumDisplay.value, maximumDisplay.value);
    moduleActive = false;
  } else {
    if (stepOrContinuous.checked) {
      continuousModuleOverTime(intervalDisplay.value, getRandomValue(minimumDisplay.value, maximumDisplay.value), getRandomValue(minimumDisplay.value, maximumDisplay.value))
    } else {
      moduleOverTime(intervalDisplay.value, getRandomValue(minimumDisplay.value, maximumDisplay.value), getRandomValue(minimumDisplay.value, maximumDisplay.value));
    }
  }



}

window.onload = ()=>{
  let minimumModSelect = document.getElementById('minimumModSelect');
  let minimumModulateEdit = document.getElementById('minimumModulateEdit');
  let maximumModSelect = document.getElementById('maximumModSelect');
  let maximumModulateEdit = document.getElementById('maximumModulateEdit');
  let intervalModSelect = document.getElementById('intervalModSelect');
  let intervalModulateEdit = document.getElementById('intervalModulateEdit');
  let increaseSlope = document.getElementById('increaseSlope');
  let slopeAmount = document.getElementById('slopeAmount');
  let decreaseSlope = document.getElementById('decreaseSlope');
  let stepOrContinuous = document.getElementById('stepOrContinuous');
  let continuousHandlerDiv = document.getElementById('continuousHandlerDiv');
  let exponentialCurveHanlderDiv = document.getElementById('exponentialCurveHanlderDiv');
  let linearOrExponential = document.getElementById('linearOrExponential');
  let continuousLabel = document.getElementById('continuousLabel');
  let stepLabel = document.getElementById('stepLabel');
  let linearLabel = document.getElementById('linearLabel');
  let exponentialLabel = document.getElementById('exponentialLabel');
  let concaveOrConvex = document.getElementById('concaveOrConvex');
  let concaveLabel = document.getElementById('concaveLabel');
  let convexLabel = document.getElementById('convexLabel');


  stepOrContinuous.addEventListener('change', ()=>{
    if (stepOrContinuous.checked) {
      continuousHandlerDiv.setAttribute("style", "visibility: visible;");
      if (linearOrExponential.checked) {
        exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
      } else {
        exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
      }
      continuousLabel.className = 'activeState';
      stepLabel.className = 'inactiveState';
    } else {
      continuousHandlerDiv.setAttribute("style", "visibility: hidden;");
      exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
      continuousLabel.className = 'inactiveState';
      stepLabel.className = 'activeState';
    }
  });

  linearOrExponential.addEventListener('change', ()=>{
    if (linearOrExponential.checked) {
      exponentialCurveHanlderDiv.setAttribute("style", "visibility: visible;");
      linearLabel.className = 'inactiveState';
      exponentialLabel.className = 'activeState';
    } else {
      exponentialCurveHanlderDiv.setAttribute("style", "visibility: hidden;");
      linearLabel.className = 'activeState';
      exponentialLabel.className = 'inactiveState';
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

  increaseSlope.addEventListener('click', ()=>{
    slopeAmount.value++;
    if (slopeAmount.value === "1024") {
      increaseSlope.setAttribute("style", "visibility: hidden;");
    }
    if (slopeAmount.value === "2") {
      decreaseSlope.setAttribute("style", "visibility: visible;");
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

  minimumModSelect.addEventListener('change', ()=>{
    if (minimumModSelect.value === 'none') {
      minimumModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      minimumModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });

  maximumModSelect.addEventListener('change', ()=>{
    if (maximumModSelect.value === 'none') {
      maximumModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      maximumModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });

  intervalModSelect.addEventListener('change', ()=>{
    if (intervalModSelect.value === 'none') {
      intervalModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      intervalModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });

  document.body.onkeyup = (e)=>{
    if (e.keyCode === spacebar) {
      if (moduleActive) {
        moduleActive = false;
      } else {
        moduleActive = true;
        setModuleInMotion();
      }
    }
  };
};
