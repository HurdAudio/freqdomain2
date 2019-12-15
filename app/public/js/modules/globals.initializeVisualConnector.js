'use strict';

function initializeVisualConnector(throughput, element, device) {
  let renderTestingSpace = document.getElementById('renderTestingSpace');
  let svg = document.getElementById('renderSvg');
  let line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let d_string = '';
  let rect = element.getBoundingClientRect();
  // renderTestingSpace.appendChild(svg);
  svg.appendChild(line);
  activeLine = line;

  if (connect.input !== null) {
    d_string = 'M ' + Math.floor(rect.left + (rect.width/2)) + ' ' + Math.floor(rect.top + (rect.height/2)) + ' L ' + cursorX + ' ' + cursorY;
  } else {
    d_string = 'M ' + cursorX + ' ' + cursorY + ' L ' + Math.floor(rect.left + (rect.width/2)) + ' ' + Math.floor(rect.top + (rect.height/2));
  }
  line.setAttribute("stroke", device.faceBoxShadowColor);
  line.setAttribute("stroke-width", "10");
  line.setAttribute("stroke-linecap", "round");
  line.setAttribute("opacity", "0.9");
  line.setAttribute("width", "100%");
  line.setAttribute("height", "100%");
  line.setAttribute("z-index", "128");
  line.setAttribute("d", d_string);
  setTimeout(() => {
    document.onclick = monitorConnector;
  }, 100);

}
