'use strict';

function updateConnectors(device) {
  let inputRect;
  let outputRect;

  for (let i = 0; i < patchCables.length; i++) {
    if (((device.name === patchCables[i].input.name) && (device.id === patchCables[i].input.id)) || ((device.name === patchCables[i].output.name) && (device.id === patchCables[i].output.id))) {
      inputRect = patchCables[i].input.element.getBoundingClientRect();
      outputRect = patchCables[i].output.element.getBoundingClientRect();
      patchCables[i].line.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');
    }
  }
}
