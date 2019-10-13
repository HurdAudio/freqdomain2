'use strict';

document.onmousemove = trackCursorLocation;

function trackCursorLocation(event) {
  let rect;

  event = event || window.event;

  cursorX = event.screenX;
  cursorY = (event.screenY - 120);
  // console.log(cursorX);

  if (activePatching) {
    // console.log(cursorX);
    // console.log(connect);
    if (connect.input !== null) {
      rect = connect.input.element.getBoundingClientRect();
      activeLine.setAttribute("d", 'M ' + Math.floor(rect.left + (rect.width/2) - connectorOffset) + ' ' + Math.floor(rect.top + (rect.height/2) - connectorOffset) + ' L ' + cursorX + ' ' + cursorY + ' A');
      // activeLine.setAttribute("z-index", 120);
      // activeLine.setAttribute("y2", cursorY);
    } else {
      rect = connect.output.element.getBoundingClientRect();
      activeLine.setAttribute("d", 'M ' + cursorX + ' ' + cursorY + ' L ' + Math.floor(rect.left + (rect.width/2) - connectorOffset) + ' ' + Math.floor(rect.top + (rect.height/2) - connectorOffset) + ' A');
      // activeLine.setAttribute("y1", cursorY);
    }
  }
}

function monitorConnector() {
  setTimeout(() => {
    if (activePatching) {
      if ((connect.input === null) || (connect.output === null)) {
        activeLine.parentNode.removeChild(activeLine);
        activePatching = false;
        document.onclick = null;
      }
    }
  }, 100);
}
