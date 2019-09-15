'use strict';

var activePatching = false;
var connect = { input: null, output: null };
var lines = [];
var cursorX = 0;
var cursorY = 0;
var activeLine = null;
var connectorOffset = 10;
var patchCables = [];

document.onmousemove = trackCursorLocation;

function trackCursorLocation(event) {
  let rect;

  event = event || window.event;

  cursorX = event.screenX;
  cursorY = (event.screenY - 120);
  // console.log(cursorX);

  if (activePatching) {
    console.log(cursorX);
    console.log(connect);
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

function disconnectPatchConnection(device, connector, deviceType) {
  switch(deviceType) {
    case('master_volumes'):
      switch(device.input.module) {
        case('gains'):
          // disconnect gain output from master volume input

          // remove visual connection
          for (let i = 0; i < patchCables.length; i++) {
            if ((patchCables[i].input.module === 'master_volumes') && (patchCables[i].input.id === device.id)) {
              patchCables[i].line.parentNode.removeChild(patchCables[i].line);
              patchCables.splice(i, 1);
            }
          }

          // disconnect
          device.input.connection.gain.disconnect(device.masterGain);

          // update Objects
          device.input.connection.output = null;
          device.input = null;

          break;
        case('oscillators'):
          // disconnect oscillator output from master volume input

          // remove visual connection
          for (let i = 0; i < patchCables.length; i++) {
            if ((patchCables[i].input.module === 'master_volumes') && (patchCables[i].input.id === device.id)) {
              patchCables[i].line.parentNode.removeChild(patchCables[i].line);
              patchCables.splice(i, 1);
            }
          }

          // disconnect
          device.input.connection.oscillator.disconnect(device.masterGain);

          // update Objects
          device.input.connection.output = null;
          device.input = null;
          break;
        default:
          console.log('upsupported device');
          alert('unsupported device');
      }
      break;
    case('gains'):
      switch(connector) {
        case('input'):
          switch(device.input.module) {
            case('gains'):
              // disconnect gain input from gain output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'gains') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.input.connection.gain.disconnect(device.gain);

              // update Objects
              device.input.connection.output = null;
              device.input = null;

              break;
            case('oscillators'):
              // disconnect gain input from oscillator output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'gains') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.input.connection.oscillator.disconnect(device.gain);

              // update Objects
              device.input.connection.output = null;
              device.input = null;

              break;
            default:
              console.log('unsupported device');
              alert('unsupported device');
          }
          break;
        case('gainModulator'):
          switch(device.gainModulator.module) {
            case('gains'):
              // disconnect gain modulator input from gain output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'gains') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }
              // disconnect
              device.gainModulator.connection.gain.disconnect(device.gain.gain);

              // update Objects
              device.gainModulator.connection.output = null;
              device.gainModulator = null;

              break;
            case('oscillators'):
              // disconnect gain modulator input from oscillator output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'gains') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }
              // disconnect
              device.gainModulator.connection.oscillator.disconnect(device.gain.gain);

              // update Objects
              device.gainModulator.connection.output = null;
              device.gainModulator = null;

              break;
            default:
              console.log('unsupported device');
              alert('unsupported device');
          }
          break;
        case('output'):
          switch(device.output.module) {
            case('master_volumes'):
              // disconnect master volume input from gain output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].output.module === 'gains') && (patchCables[i].output.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }
              // disconnect
              device.gain.disconnect(device.output.connection.masterGain);

              // update Objects
              device.output.connection.input = null;
              device.output = null;

              break;
            case('gains'):
              if (device.output.type === 'signal') {
                // disconnect gain input from gain output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'gains') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.gain.disconnect(device.output.connection.gain);

                // update Objects
                device.output.connection.input = null;
                device.output = null;

              } else {
                // disconnect gain modulation input from gain output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'gains') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.gain.disconnect(device.output.connection.gain.gain);

                // update Objects
                device.output.connection.gainModulator = null;
                device.output = null;

              }
              break;
            case('oscillators'):
              if (device.output.type === 'frequencyModulation') {
                // disconnect oscillator frequency modulation input from gain output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.gain.disconnect(device.output.connection.oscillator.frequency);

                // update Objects
                device.output.connection.hertzModulator = null;
                device.output = null;
              } else if (device.output.type === 'detuneModulation') {
                // disconnect oscillator detune modulation input from gain output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.gain.disconnect(device.output.connection.oscillator.detune);

                // update Objects
                device.output.connection.detuneModulator = null;
                device.output = null;
              } else if (device.output.type === 'waveformModulation') {
                // disconnect oscillator waveform modulation input from gain output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                // device.gain.disconnect(device.output.connection.oscillator.type);
                // Illegal Connection

                // update Objects
                device.output.connection.waveformModulator = null;
                device.output = null;
              }
              break;
            default:
              console.log('unsupported device');
              alert('unsupported device');
          }
          break;
        default:
          console.log('bad connector');
          alert('bad connector');
      }
      break;
    case('oscillator'):
      switch(connector) {
        case('frequencyModInput'):
          switch(device.hertzModulator.module) {
            case('gains'):
              // disconnect oscillator frequency modulation input from gain output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.hertzModulator.connection.gain.disconnect(device.oscillator.frequency);

              // update Objects
              device.hertzModulator.connection.output = null;
              device.hertzModulator = null;
              break;
            case('oscillators'):
              // disconnect oscillator frequency modulation input from oscillator output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.hertzModulator.connection.oscillator.disconnect(device.oscillator.frequency);

              // update Objects
              device.hertzModulator.connection.output = null;
              device.hertzModulator = null;
              break;
            case('oscillator'):
              // disconnect oscillator frequency modulation input from oscillator output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.hertzModulator.connection.oscillator.disconnect(device.oscillator.frequency);

              // update Objects
              device.hertzModulator.connection.output = null;
              device.hertzModulator = null;
              break;
            default:
              console.log('unsupported device');
              alert('unsupported device');
          }
          break;
        case('detuneModInput'):
          switch(device.detuneModulator.module) {
            case('gains'):
              // disconnect oscillator detune modulation input from gain output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.detuneModulator.connection.gain.disconnect(device.oscillator.detune);

              // update Objects
              device.detuneModulator.connection.output = null;
              device.detuneModulator = null;
              break;
            case('oscillator'):
              // disconnect oscillator detune modulation input from oscillator output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.detuneModulator.connection.oscillator.disconnect(device.oscillator.detune);

              // update Objects
              device.detuneModulator.connection.output = null;
              device.detuneModulator = null;
              break;
            case('oscillators'):
              // disconnect oscillator detune modulation input from oscillator output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.detuneModulator.connection.oscillator.disconnect(device.oscillator.detune);

              // update Objects
              device.detuneModulator.connection.output = null;
              device.detuneModulator = null;
              break;
            default:
              console.log('unsupported device');
              alert('unsupported device');
          }
          break;
        case('waveModInput'):
          switch(device.waveformModulator.module) {
            case('gains'):
              // disconnect oscillator waveform modulation input from gain output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              // device.detuneModulator.connection.gain.disconnect(device.oscillator.detune);
              // Illegal connection

              // update Objects
              device.waveformModulator.connection.output = null;
              device.waveformModulator = null;
              break;
            case('oscillator'):
              // disconnect oscillator waveform modulation input from oscillator output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              // device.waveformModulator.connection.oscillator.disconnect(device.oscillator.detune);
              // Illegal connection

              // update Objects
              device.waveformModulator.connection.output = null;
              device.waveformModulator = null;
              break;
            case('oscillators'):
              // disconnect oscillator waveform modulation input from oscillator output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              // device.waveformModulator.connection.oscillator.disconnect(device.oscillator.detune);
              // Illegal connection

              // update Objects
              device.waveformModulator.connection.output = null;
              device.waveformModulator = null;
              break;
            default:
              console.log('unsupported device');
              alert('unsupported device');
          }
          break;
        case('output'):
          switch(device.output.module) {
            case('master_volumes'):
              // disconnect master volume input from oscillator output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.oscillator.disconnect(device.output.connection.masterGain);

              // update Objects
              device.output.connection.input = null;
              device.output = null;
              break;
            case('gains'):
              if ((device.output !== null) && (device.output.connection.input !== null) && (device.output.connection.input.connection.id === device.id)) {
                // disconnect gain input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.oscillator.disconnect(device.output.connection.gain);

                // update Objects
                device.output.connection.input = null;
                device.output = null;
              } else if ((device.output !== null) && (device.output.connection.gainModulator !== null) && (device.output.connection.gainModulator.connection.id === device.id)) {
                // disconnect gain modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.oscillator.disconnect(device.output.connection.gain.gain);

                // update Objects
                device.output.connection.gainModulator = null;
                device.output = null;
              }
              break;
            case('oscillators'):
              if ((device.output !== null) && (device.output.connection.hertzModulator !== null) && (device.output.connection.hertzModulator.connection.id === device.id)) {
                // disconnect frequency modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.oscillator.disconnect(device.output.connection.oscillator.frequency);

                // update Objects
                device.output.connection.hertzModulator = null;
                device.output = null;
              } else if ((device.output !== null) && (device.output.connection.detuneModulator !== null) && (device.output.connection.detuneModulator.connection.id === device.id)) {
                // disconnect detune modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.oscillator.disconnect(device.output.connection.oscillator.detune);

                // update Objects
                device.output.connection.detuneModulator = null;
                device.output = null;
              } else if ((device.output !== null) && (device.output.connection.waveformModulator !== null) && (device.output.connection.waveformModulator.connection.id === device.id)) {
                // disconnect waveform modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                // device.oscillator.disconnect(device.output.connection.oscillator.detune);
                // Illegal Connection

                // update Objects
                device.output.connection.waveformModulator = null;
                device.output = null;
              }
              break;
            case('oscillator'):
              if ((device.output !== null) && (device.output.connection.hertzModulator !== null) && (device.output.connection.hertzModulator.connection.id === device.id)) {
                // disconnect frequency modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.oscillator.disconnect(device.output.connection.oscillator.frequency);

                // update Objects
                device.output.connection.hertzModulator = null;
                device.output = null;
              } else if ((device.output !== null) && (device.output.connection.detuneModulator !== null) && (device.output.connection.detuneModulator.connection.id === device.id)) {
                // disconnect detune modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.oscillator.disconnect(device.output.connection.oscillator.detune);

                // update Objects
                device.output.connection.detuneModulator = null;
                device.output = null;
              } else if ((device.output !== null) && (device.output.connection.waveformModulator !== null) && (device.output.connection.waveformModulator.connection.id === device.id)) {
                // disconnect waveform modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                // device.oscillator.disconnect(device.output.connection.oscillator.detune);
                // Illegal Connection

                // update Objects
                device.output.connection.waveformModulator = null;
                device.output = null;
              }
              break;
            default:
              console.log('unsupported device');
              alert('unsupported device');
          }
          break;
        default:
          console.log('unsupported device');
          alert('unsupported device');
      }
      break;
      case('oscillators'):
        switch(connector) {
          case('frequencyModInput'):
            switch(device.hertzModulator.module) {
              case('gains'):
                // disconnect oscillator frequency modulation input from gain output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.hertzModulator.connection.gain.disconnect(device.oscillator.frequency);

                // update Objects
                device.hertzModulator.connection.output = null;
                device.hertzModulator = null;
                break;
              case('oscillators'):
                // disconnect oscillator frequency modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.hertzModulator.connection.oscillator.disconnect(device.oscillator.frequency);

                // update Objects
                device.hertzModulator.connection.output = null;
                device.hertzModulator = null;
                break;
              case('oscillator'):
                // disconnect oscillator frequency modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.hertzModulator.connection.oscillator.disconnect(device.oscillator.frequency);

                // update Objects
                device.hertzModulator.connection.output = null;
                device.hertzModulator = null;
                break;
              default:
                console.log('unsupported device');
                alert('unsupported device');
            }
            break;
          case('detuneModInput'):
            switch(device.detuneModulator.module) {
              case('gains'):
                // disconnect oscillator detune modulation input from gain output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.detuneModulator.connection.gain.disconnect(device.oscillator.detune);

                // update Objects
                device.detuneModulator.connection.output = null;
                device.detuneModulator = null;
                break;
              case('oscillator'):
                // disconnect oscillator detune modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.detuneModulator.connection.oscillator.disconnect(device.oscillator.detune);

                // update Objects
                device.detuneModulator.connection.output = null;
                device.detuneModulator = null;
                break;
              case('oscillators'):
                // disconnect oscillator detune modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.detuneModulator.connection.oscillator.disconnect(device.oscillator.detune);

                // update Objects
                device.detuneModulator.connection.output = null;
                device.detuneModulator = null;
                break;
              default:
                console.log('unsupported device');
                alert('unsupported device');
            }
            break;
          case('waveModInput'):
            switch(device.waveformModulator.module) {
              case('gains'):
                // disconnect oscillator waveform modulation input from gain output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                // device.detuneModulator.connection.gain.disconnect(device.oscillator.detune);
                // Illegal connection

                // update Objects
                device.waveformModulator.connection.output = null;
                device.waveformModulator = null;
                break;
              case('oscillator'):
                // disconnect oscillator waveform modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                // device.waveformModulator.connection.oscillator.disconnect(device.oscillator.detune);
                // Illegal connection

                // update Objects
                device.waveformModulator.connection.output = null;
                device.waveformModulator = null;
                break;
              case('oscillators'):
                // disconnect oscillator waveform modulation input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].input.module === 'oscillators') && (patchCables[i].input.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                // device.waveformModulator.connection.oscillator.disconnect(device.oscillator.detune);
                // Illegal connection

                // update Objects
                device.waveformModulator.connection.output = null;
                device.waveformModulator = null;
                break;
              default:
                console.log('unsupported device');
                alert('unsupported device');
            }
            break;
          case('output'):
            switch(device.output.module) {
              case('master_volumes'):
                // disconnect master volume input from oscillator output
                // remove visual connection
                for (let i = 0; i < patchCables.length; i++) {
                  if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                    patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                    patchCables.splice(i, 1);
                  }
                }

                // disconnect
                device.oscillator.disconnect(device.output.connection.masterGain);

                // update Objects
                device.output.connection.input = null;
                device.output = null;
                break;
              case('gains'):
                if ((device.output !== null) && (device.output.connection.input !== null) && (device.output.connection.input.connection.id === device.id)) {
                  // disconnect gain input from oscillator output
                  // remove visual connection
                  for (let i = 0; i < patchCables.length; i++) {
                    if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                      patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                      patchCables.splice(i, 1);
                    }
                  }

                  // disconnect
                  device.oscillator.disconnect(device.output.connection.gain);

                  // update Objects
                  device.output.connection.input = null;
                  device.output = null;
                } else if ((device.output !== null) && (device.output.connection.gainModulator !== null) && (device.output.connection.gainModulator.connection.id === device.id)) {
                  // disconnect gain modulation input from oscillator output
                  // remove visual connection
                  for (let i = 0; i < patchCables.length; i++) {
                    if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                      patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                      patchCables.splice(i, 1);
                    }
                  }

                  // disconnect
                  device.oscillator.disconnect(device.output.connection.gain.gain);

                  // update Objects
                  device.output.connection.gainModulator = null;
                  device.output = null;
                }
                break;
              case('oscillator'):
                if ((device.output !== null) && (device.output.connection.hertzModulator !== null) && (device.output.connection.hertzModulator.connection.id === device.id)) {
                  // disconnect frequency modulation input from oscillator output
                  // remove visual connection
                  for (let i = 0; i < patchCables.length; i++) {
                    if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                      patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                      patchCables.splice(i, 1);
                    }
                  }

                  // disconnect
                  device.oscillator.disconnect(device.output.connection.oscillator.frequency);

                  // update Objects
                  device.output.connection.hertzModulator = null;
                  device.output = null;
                } else if ((device.output !== null) && (device.output.connection.detuneModulator !== null) && (device.output.connection.detuneModulator.connection.id === device.id)) {
                  // disconnect detune modulation input from oscillator output
                  // remove visual connection
                  for (let i = 0; i < patchCables.length; i++) {
                    if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                      patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                      patchCables.splice(i, 1);
                    }
                  }

                  // disconnect
                  device.oscillator.disconnect(device.output.connection.oscillator.detune);

                  // update Objects
                  device.output.connection.detuneModulator = null;
                  device.output = null;
                } else if ((device.output !== null) && (device.output.connection.waveformModulator !== null) && (device.output.connection.waveformModulator.connection.id === device.id)) {
                  // disconnect waveform modulation input from oscillator output
                  // remove visual connection
                  for (let i = 0; i < patchCables.length; i++) {
                    if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                      patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                      patchCables.splice(i, 1);
                    }
                  }

                  // disconnect
                  // device.oscillator.disconnect(device.output.connection.oscillator.detune);
                  // Illegal Connection

                  // update Objects
                  device.output.connection.waveformModulator = null;
                  device.output = null;
                }
                break;
              case('oscillators'):
                if ((device.output !== null) && (device.output.connection.hertzModulator !== null) && (device.output.connection.hertzModulator.connection.id === device.id)) {
                  // disconnect frequency modulation input from oscillator output
                  // remove visual connection
                  for (let i = 0; i < patchCables.length; i++) {
                    if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                      patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                      patchCables.splice(i, 1);
                    }
                  }

                  // disconnect
                  device.oscillator.disconnect(device.output.connection.oscillator.frequency);

                  // update Objects
                  device.output.connection.hertzModulator = null;
                  device.output = null;
                } else if ((device.output !== null) && (device.output.connection.detuneModulator !== null) && (device.output.connection.detuneModulator.connection.id === device.id)) {
                  // disconnect detune modulation input from oscillator output
                  // remove visual connection
                  for (let i = 0; i < patchCables.length; i++) {
                    if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                      patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                      patchCables.splice(i, 1);
                    }
                  }

                  // disconnect
                  device.oscillator.disconnect(device.output.connection.oscillator.detune);

                  // update Objects
                  device.output.connection.detuneModulator = null;
                  device.output = null;
                } else if ((device.output !== null) && (device.output.connection.waveformModulator !== null) && (device.output.connection.waveformModulator.connection.id === device.id)) {
                  // disconnect waveform modulation input from oscillator output
                  // remove visual connection
                  for (let i = 0; i < patchCables.length; i++) {
                    if ((patchCables[i].output.module === 'oscillators') && (patchCables[i].output.id === device.id)) {
                      patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                      patchCables.splice(i, 1);
                    }
                  }

                  // disconnect
                  // device.oscillator.disconnect(device.output.connection.oscillator.detune);
                  // Illegal Connection

                  // update Objects
                  device.output.connection.waveformModulator = null;
                  device.output = null;
                }
                break;
              default:
                console.log('unsupported device');
                alert('unsupported device');
            }
            break;
          default:
            console.log('unsupported device');
            alert('unsupported device');
        }
        break;
    default:
      console.log('unsupported device type');
      alert('Unsupported Device Type');
  }

}

function clickThroughput(throughput, element, device) {
  let inputRect;
  let outputRect;

  if (activePatching) {
    if (throughput.through === 'input') {
      if ((connect.input !== null) || (connect.output === null)) {
        return;
      }
      if (throughput.through.device === connect.output.throughput.device) {
        if (device.id === connect.output.device.id) {
          return;
        }
      }
      switch(throughput.device) {
        case('master_volume'):
          switch(connect.output.throughput.device) {
            case('gain'):
              // connect master volume input to gain output
              // device = master volume input
              // connect.output.device = gain output

              // Update objects
              device.input = {
                module: 'gains',
                name: connect.output.device.name,
                id: connect.output.device.id,
                type: 'signal',
                connection: connect.output.device
              };
              connect.output.device.output = {
                module: 'master_volumes',
                name: device.name,
                id: device.id,
                type: 'signal',
                connection: device
              };

              // make connections
              connect.output.device.gain.connect(device.masterGain);

              // connect visual
              inputRect = element.getBoundingClientRect();
              outputRect = connect.output.element.getBoundingClientRect();
              activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

              // maintain visual placement
              patchCables.push({
                line: activeLine,
                input: {
                  module: 'master_volumes',
                  name: device.name,
                  id: device.id,
                  element: element
                },
                output: {
                  module: 'gains',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  element: connect.output.element
                }
              });
              activePatching = false;
              connect.output = null;
              activeLine = null;

              break;
            case('oscillator'):
              // connect master volume input to oscillator output
              // device = master volume input
              // connect.output.device = oscillator output

              // Update objects
              device.input = {
                module: 'oscillators',
                name: connect.output.device.name,
                id: connect.output.device.id,
                type: 'signal',
                connection: connect.output.device
              };
              connect.output.device.output = {
                module: 'master_volumes',
                name: device.name,
                id: device.id,
                type: 'signal',
                connection: device
              };

              // make connections
              connect.output.device.oscillator.connect(device.masterGain);

              // connect visual
              inputRect = element.getBoundingClientRect();
              outputRect = connect.output.element.getBoundingClientRect();
              activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

              // maintain visual placement
              patchCables.push({
                line: activeLine,
                input: {
                  module: 'master_volumes',
                  name: device.name,
                  id: device.id,
                  element: element
                },
                output: {
                  module: 'oscillators',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  element: connect.output.element
                }
              });
              activePatching = false;
              connect.output = null;
              activeLine = null;
              break;
            default:
              console.log('unsupported device');
              alert('unsupported device: \n master_volume input to ??');
          }
          break;
        case('gain'):
          switch(connect.output.throughput.device) {
            case('gain'):
              if (throughput.type === 'signal') {
                // connect gain output to gain input
                // device = gain input
                // connect.output.device = gain output

                // Update objects
                device.input = {
                  module: 'gains',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  type: 'signal',
                  connection: connect.output.device
                };
                connect.output.device.output = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };

                // make connections
                connect.output.device.gain.connect(device.gain);

                // connect visual
                inputRect = element.getBoundingClientRect();
                outputRect = connect.output.element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'gains',
                    name: device.name,
                    id: device.id,
                    element: element
                  },
                  output: {
                    module: 'gains',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;

              } else {
                // connect gain output to gain modulation input
                // device = gain modulation input
                // connect.output.device = gain output

                // Update objects
                device.gainModulator = {
                  module: 'gains',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  type: 'signal',
                  connection: connect.output.device
                };
                connect.output.device.output = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'modulation',
                  connection: device
                };

                // make connections
                connect.output.device.gain.connect(device.gain.gain);
                console.log(connect.output.device);

                // connect visual
                inputRect = element.getBoundingClientRect();
                outputRect = connect.output.element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'gains',
                    name: device.name,
                    id: device.id,
                    element: element
                  },
                  output: {
                    module: 'gains',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;

              }
              break;
            case('oscillator'):
              if (throughput.type === 'signal') {
                // connect oscillator output to gain input
                // device = gain input
                // connect.output.device = oscillator output

                // Update objects
                device.input = {
                  module: 'oscillators',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  type: 'signal',
                  connection: connect.output.device
                };
                connect.output.device.output = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };

                // make connections
                connect.output.device.oscillator.connect(device.gain);

                // connect visual
                inputRect = element.getBoundingClientRect();
                outputRect = connect.output.element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'gains',
                    name: device.name,
                    id: device.id,
                    element: element
                  },
                  output: {
                    module: 'oscillators',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;

              } else {
                // connect oscillator output to gain modulation input
                // device = gain modulation input
                // connect.output.device = oscillator output

                // Update objects
                device.gainModulator = {
                  module: 'oscillators',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  type: 'signal',
                  connection: connect.output.device
                };
                connect.output.device.output = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'modulation',
                  connection: device
                };

                // make connections
                connect.output.device.oscillator.connect(device.gain.gain);
                console.log(connect.output.device);

                // connect visual
                inputRect = element.getBoundingClientRect();
                outputRect = connect.output.element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'gains',
                    name: device.name,
                    id: device.id,
                    element: element
                  },
                  output: {
                    module: 'oscillators',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;

              }
              break;
            default:
              console.log('unsupported device');
              alert('unsupported device: \n gain input to ??');
          }
          break;
        case('oscillator'):
          switch(connect.output.throughput.device) {
            case('gain'):
              if (throughput.type === 'frequencyModulation') {
                // connect gain output to oscillator frequency modulation input
                // device = frequency modulation input
                // connect.output.device = gain output

                // Update objects
                device.hertzModulator = {
                  module: 'gains',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  type: 'signal',
                  connection: connect.output.device
                };
                connect.output.device.output = {
                  module: 'oscillators',
                  name: device.name,
                  id: device.id,
                  type: 'frequencyModulation',
                  connection: device
                };

                // make connections
                connect.output.device.gain.connect(device.oscillator.frequency);
                console.log(connect.output.device);

                // connect visual
                inputRect = element.getBoundingClientRect();
                outputRect = connect.output.element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  },
                  output: {
                    module: 'gains',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;
              } else if (throughput.type === 'detuneModulation') {
                // connect gain output to oscillator detune modulation input
                // device = detune modulation input
                // connect.output.device = gain output

                // Update objects
                device.detuneModulator = {
                  module: 'gains',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  type: 'signal',
                  connection: connect.output.device
                };
                connect.output.device.output = {
                  module: 'oscillators',
                  name: device.name,
                  id: device.id,
                  type: 'detuneModulation',
                  connection: device
                };

                // make connections
                connect.output.device.gain.connect(device.oscillator.detune);
                console.log(connect.output.device);

                // connect visual
                inputRect = element.getBoundingClientRect();
                outputRect = connect.output.element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  },
                  output: {
                    module: 'gains',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;
              } else if (throughput.type === 'waveformModulation') {
                // connect gain output to oscillator waveform modulation input
                // device = waveform modulation input
                // connect.output.device = gain output

                // Update objects
                device.waveformModulator = {
                  module: 'gains',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  type: 'signal',
                  connection: connect.output.device
                };
                connect.output.device.output = {
                  module: 'oscillators',
                  name: device.name,
                  id: device.id,
                  type: 'waveformModulation',
                  connection: device
                };

                // make connections
                // connect.output.device.gain.connect(device.oscillator.type);
                // Illegal connection
                console.log(connect.output.device);

                // connect visual
                inputRect = element.getBoundingClientRect();
                outputRect = connect.output.element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  },
                  output: {
                    module: 'gains',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;
              }
              break;
            case('oscillator'):
              if (throughput.type === 'frequencyModulation') {
                // connect oscillator output to oscillator frequency modulation input
                // device = frequency modulation input
                // connect.output.device = oscillator output

                // Update objects
                device.hertzModulator = {
                  module: 'oscillators',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  type: 'signal',
                  connection: connect.output.device
                };
                connect.output.device.output = {
                  module: 'oscillators',
                  name: device.name,
                  id: device.id,
                  type: 'frequencyModulation',
                  connection: device
                };

                // make connections
                connect.output.device.oscillator.connect(device.oscillator.frequency);
                console.log(connect.output.device);

                // connect visual
                inputRect = element.getBoundingClientRect();
                outputRect = connect.output.element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  },
                  output: {
                    module: 'oscillators',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;
              } else if (throughput.type === 'detuneModulation') {
                // connect oscillator output to oscillator detune modulation input
                // device = detune modulation input
                // connect.output.device = oscillator output

                // Update objects
                device.detuneModulator = {
                  module: 'oscillators',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  type: 'signal',
                  connection: connect.output.device
                };
                connect.output.device.output = {
                  module: 'oscillators',
                  name: device.name,
                  id: device.id,
                  type: 'detuneModulation',
                  connection: device
                };

                // make connections
                connect.output.device.oscillator.connect(device.oscillator.detune);
                console.log(connect.output.device);

                // connect visual
                inputRect = element.getBoundingClientRect();
                outputRect = connect.output.element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  },
                  output: {
                    module: 'oscillators',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;
              } else if (throughput.type === 'waveformModulation') {
                // connect oscillator output to oscillator waveform modulation input
                // device = waveform modulation input
                // connect.output.device = oscillator output

                // Update objects
                device.waveformModulator = {
                  module: 'oscillators',
                  name: connect.output.device.name,
                  id: connect.output.device.id,
                  type: 'signal',
                  connection: connect.output.device
                };
                connect.output.device.output = {
                  module: 'oscillators',
                  name: device.name,
                  id: device.id,
                  type: 'waveformModulation',
                  connection: device
                };

                // make connections
                // connect.output.device.oscillator.connect(device.oscillator.type);
                // Illegal Connection
                console.log(connect.output.device);

                // connect visual
                inputRect = element.getBoundingClientRect();
                outputRect = connect.output.element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  },
                  output: {
                    module: 'oscillators',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;
              }
              break;
            default:
              console.log('Unsupported device: unknown output to oscillator modulation input');
              alert('unsupported device: ' + connect.output.throughput.device);
          }
          break;
        default:
          console.log('unsupported device');
          alert('unsupported device');
      }
    } else {
      if ((connect.output !== null) || (connect.input === null)) {
        return;
      }
      if (throughput.through.device === connect.input.throughput.device) {
        if (device.id === connect.input.device.id) {
          return;
        }
      }
      switch(throughput.device) {
        case('gain'):
          switch(connect.input.throughput.device) {
            case('master_volume'):
              // connect gain output to master volume input
              // connect.input.device = master volume input
              // device = gain output

              // Update objects
              connect.input.device.input = {
                module: 'gains',
                name: device.name,
                id: device.id,
                type: 'signal',
                connection: device
              };
              device.output = {
                module: 'master_volumes',
                name: connect.input.device.name,
                id: connect.input.device.id,
                type: 'signal',
                connection: connect.input.device
              };

              // make connections
              device.gain.connect(connect.input.device.masterGain);

              // connect visual
              inputRect = connect.input.element.getBoundingClientRect();
              outputRect = element.getBoundingClientRect();
              activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

              // maintain visual placement
              patchCables.push({
                line: activeLine,
                input: {
                  module: 'master_volumes',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  element: connect.input.element
                },
                output: {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  element: element
                }
              });
              activePatching = false;
              connect.input = null;
              activeLine = null;

              break;
            case('gain'):
              if (connect.input.throughput.type === 'signal') {
                // connect gain input to gain output
                // connect.input.device = gain input
                // device = gain output

                // Update objects
                connect.input.device.input = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'gains',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  type: 'signal',
                  connection: connect.input.device
                };

                // make connections
                device.gain.connect(connect.input.device.gain);

                // connect visual
                inputRect = connect.input.element.getBoundingClientRect();
                outputRect = element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'gains',
                    name: connect.input.device.name,
                    id: connect.input.device.id,
                    element: connect.input.element
                  },
                  output: {
                    module: 'gains',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;

              } else {
                // connect gain modulation input to gain output
                // connect.input.device = gain modulation input
                // device = gain output

                // Update objects
                connect.input.device.gainModulator = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'gains',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  type: 'modulation',
                  connection: connect.input.device
                };

                // make connections
                device.gain.connect(connect.input.device.gain.gain);

                // connect visual
                inputRect = connect.input.element.getBoundingClientRect();
                outputRect = element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'gains',
                    name: connect.input.device.name,
                    id: connect.input.device.id,
                    element: connect.input.element
                  },
                  output: {
                    module: 'gains',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;

              }
              break;
            case('oscillator'):
              if (connect.input.throughput.type === 'frequencyModulation') {
                // connect oscillator frequency modulation input to gain output
                // connect.input.device = frequency modulation input
                // device = gain output

                // Update objects
                connect.input.device.hertzModulator = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'oscillators',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  type: 'frequencyModulation',
                  connection: connect.input.device
                };

                // make connections
                device.gain.connect(connect.input.device.oscillator.frequency);

                // connect visual
                inputRect = connect.input.element.getBoundingClientRect();
                outputRect = element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: connect.input.device.name,
                    id: connect.input.device.id,
                    element: connect.input.element
                  },
                  output: {
                    module: 'gains',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;
              } else if (connect.input.throughput.type === 'detuneModulation') {
                // connect oscillator detune modulation input to gain output
                // connect.input.device = detune modulation input
                // device = gain output

                // Update objects
                connect.input.device.detuneModulator = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'oscillators',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  type: 'detuneModulation',
                  connection: connect.input.device
                };

                // make connections
                device.gain.connect(connect.input.device.oscillator.detune);

                // connect visual
                inputRect = connect.input.element.getBoundingClientRect();
                outputRect = element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: connect.input.device.name,
                    id: connect.input.device.id,
                    element: connect.input.element
                  },
                  output: {
                    module: 'gains',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;
              } else if (connect.input.throughput.type === 'waveformModulation') {
                // connect oscillator waveform modulation input to gain output
                // connect.input.device = waveform modulation input
                // device = gain output

                // Update objects
                connect.input.device.waveformModulator = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'oscillators',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  type: 'waveformModulation',
                  connection: connect.input.device
                };

                // make connections
                // device.gain.connect(connect.input.device.oscillator.type);
                // Illegal Connection

                // connect visual
                inputRect = connect.input.element.getBoundingClientRect();
                outputRect = element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: connect.input.device.name,
                    id: connect.input.device.id,
                    element: connect.input.element
                  },
                  output: {
                    module: 'gains',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;
              }
              break;
            default:
              console.log('unsupported device');
              alert('unsupported device: \n ?? to gain output');
          }
          break;
        case('oscillator'):
          switch(connect.input.throughput.device) {
            case('master_volume'):
              // connect oscillator output to master volume input
              // connect.input.device = master volume input
              // device = oscillator output

              // Update objects
              connect.input.device.input = {
                module: 'oscillators',
                name: device.name,
                id: device.id,
                type: 'signal',
                connection: device
              };
              device.output = {
                module: 'master_volumes',
                name: connect.input.device.name,
                id: connect.input.device.id,
                type: 'signal',
                connection: connect.input.device
              };

              // make connections
              device.oscillator.connect(connect.input.device.masterGain);

              // connect visual
              inputRect = connect.input.element.getBoundingClientRect();
              outputRect = element.getBoundingClientRect();
              activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

              // maintain visual placement
              patchCables.push({
                line: activeLine,
                input: {
                  module: 'master_volumes',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  element: connect.input.element
                },
                output: {
                  module: 'oscillators',
                  name: device.name,
                  id: device.id,
                  element: element
                }
              });
              activePatching = false;
              connect.input = null;
              activeLine = null;

              break;
            case('gain'):
              if (connect.input.throughput.type === 'signal') {
                // connect gain input to oscillator output
                // connect.input.device = gain input
                // device = oscillator output

                // Update objects
                connect.input.device.input = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'oscillators',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  type: 'signal',
                  connection: connect.input.device
                };

                // make connections
                device.oscillator.connect(connect.input.device.gain);

                // connect visual
                inputRect = connect.input.element.getBoundingClientRect();
                outputRect = element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'gains',
                    name: connect.input.device.name,
                    id: connect.input.device.id,
                    element: connect.input.element
                  },
                  output: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;

              } else {
                // connect gain modulation input to oscillator output
                // connect.input.device = gain modulation input
                // device = oscillator output

                // Update objects
                connect.input.device.gainModulator = {
                  module: 'oscillators',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'gains',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  type: 'modulation',
                  connection: connect.input.device
                };

                // make connections
                device.oscillator.connect(connect.input.device.gain.gain);

                // connect visual
                inputRect = connect.input.element.getBoundingClientRect();
                outputRect = element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'gains',
                    name: connect.input.device.name,
                    id: connect.input.device.id,
                    element: connect.input.element
                  },
                  output: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;

              }
              break;
            case('oscillator'):
              if (connect.input.throughput.type === 'frequencyModulation') {
                // connect oscillator frequency modulation input to oscillator output
                // connect.input.device = oscillator frequency modulation input
                // device = oscillator output

                // Update objects
                connect.input.device.hertzModulator = {
                  module: 'oscillators',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'oscillator',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  type: 'frequencyModulation',
                  connection: connect.input.device
                };

                // make connections
                device.oscillator.connect(connect.input.device.oscillator.frequency);

                // connect visual
                inputRect = connect.input.element.getBoundingClientRect();
                outputRect = element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: connect.input.device.name,
                    id: connect.input.device.id,
                    element: connect.input.element
                  },
                  output: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;

              } else if (connect.input.throughput.type === 'detuneModulation') {
                // connect oscillator detune modulation input to oscillator output
                // connect.input.device = oscillator detune modulation input
                // device = oscillator output

                // Update objects
                connect.input.device.detuneModulator = {
                  module: 'oscillator',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'oscillator',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  type: 'detuneModulation',
                  connection: connect.input.device
                };

                // make connections
                device.oscillator.connect(connect.input.device.oscillator.detune);

                // connect visual
                inputRect = connect.input.element.getBoundingClientRect();
                outputRect = element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: connect.input.device.name,
                    id: connect.input.device.id,
                    element: connect.input.element
                  },
                  output: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;

              } else if (connect.input.throughput.type === 'waveformModulation') {
                // connect oscillator waveform modulation input to oscillator output
                // connect.input.device = oscillator waveform modulation input
                // device = oscillator output

                // Update objects
                connect.input.device.waveformModulator = {
                  module: 'oscillator',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'oscillator',
                  name: connect.input.device.name,
                  id: connect.input.device.id,
                  type: 'waveformModulation',
                  connection: connect.input.device
                };

                // make connections
                // device.oscillator.connect(connect.input.device.oscillator.type);
                // Illegal Connection

                // connect visual
                inputRect = connect.input.element.getBoundingClientRect();
                outputRect = element.getBoundingClientRect();
                activeLine.setAttribute("d", 'M ' + Math.floor(inputRect.left + (inputRect.width/2) - connectorOffset) + ' ' + Math.floor(inputRect.top + (inputRect.height/2) - connectorOffset) + ' L ' + Math.floor(outputRect.left + (outputRect.width/2) - connectorOffset) + ' ' + Math.floor(outputRect.top + (outputRect.height/2) - connectorOffset) + ' A');

                // maintain visual placement
                patchCables.push({
                  line: activeLine,
                  input: {
                    module: 'oscillators',
                    name: connect.input.device.name,
                    id: connect.input.device.id,
                    element: connect.input.element
                  },
                  output: {
                    module: 'oscillators',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;

              }
              break;
            default:
              console.log('unsupported device');
              alert('unsupported device: \n ?? to gain output');
          }
          break;
        default:
          console.log('unsupported device');
          alert('unsupported device');
      }
    }
  } else {
    activePatching = true;
    if (throughput.through === 'input') {
      connect.input = {
        throughput: throughput,
        element: element,
        device: device
      };
      connect.output = null;
    } else {
      connect.output = {
        throughput: throughput,
        element: element,
        device: device
      };
      connect.input = null;
    }
    initializeVisualConnector(throughput, element, device);

  }

}

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

var MasterVolume = (function(settings, skin, audioContext) {

  let master = function (settings, skin, audioContext) {
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


      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5); z-index: 6;");
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
          trackCursorLocation();
          updateConnectors(obj);
        }

        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = trackCursorLocation;
          obj.positionX = (element.offsetLeft - pos1);
          obj.positionY = (element.offsetTop - pos2);
        }
      }

      dragElement(div, this);

      div.addEventListener('mouseover', () => {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 1;");
        updateConnectors(this);
        setTimeout(() => {
          updateConnectors(this);
        }, 100);
      });

      div.addEventListener('mouseout', () => {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 1;");
        updateConnectors(this);
        setTimeout(() => {
          updateConnectors(this);
        }, 100);
      });

      inputPort.addEventListener('click', () => {
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'master_volume' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'master_volumes');
        }

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
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'master_volume' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'master_volumes');
        }
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
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'master_volume' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'master_volumes');
        }
      });

      return(div);
    }

    // End of Rendering Functions

  }

  return(master);

})();

var GainModule = (function(settings, skin, audioContext) {

  let gainNode = function(settings, skin, audioContext) {
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
          trackCursorLocation();
          updateConnectors(obj);
        }

        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = trackCursorLocation;
          obj.positionX = (element.offsetLeft - pos1);
          obj.positionY = (element.offsetTop - pos2);
        }
      }

      dragElement(div, this);

      div.addEventListener('mouseover', () => {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
        updateConnectors(this);
        setTimeout(() => {
          updateConnectors(this);
        }, 100);
      });

      div.addEventListener('mouseout', () => {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 1;");
        updateConnectors(this);
        setTimeout(() => {
          updateConnectors(this);
        }, 100);
      });

      inputPort.addEventListener('click', () => {
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'gain' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'gains');
        }
      });

      outputPort.addEventListener('click', () => {
        // alert('Gain Output Port -- id: ' + this.id);
        if (this.output == null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'gain' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'gains');
        }

      });

      modulationInputPort.addEventListener('click', () => {
        // alert('Gain Modulation Input --- id: ' + this.id);
        if (this.gainModulator === null) {
          clickThroughput({ through: 'input', type: 'modulation', device: 'gain' }, modulationInputPort, this);
        } else {
          disconnectPatchConnection(this, 'gainModulator', 'gains');
        }

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
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'gain' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'gains');
        }
      });

      outputPort.addEventListener('click', () => {
        if (this.output == null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'gain' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'gains');
        }
      });

      modulationInputPort.addEventListener('click', () => {
        if (this.gainModulator === null) {
          clickThroughput({ through: 'input', type: 'modulation', device: 'gain' }, modulationInputPort, this);
        } else {
          disconnectPatchConnection(this, 'gainModulator', 'gains');
        }
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
        if (this.input === null) {
          clickThroughput({ through: 'input', type: 'signal', device: 'gain' }, inputPort, this);
        } else {
          disconnectPatchConnection(this, 'input', 'gains');
        }
      });

      outputPort.addEventListener('click', () => {
        if (this.output == null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'gain' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'gains');
        }
      });

      modulationInputPort.addEventListener('click', () => {
        if (this.gainModulator === null) {
          clickThroughput({ through: 'input', type: 'modulation', device: 'gain' }, modulationInputPort, this);
        } else {
          disconnectPatchConnection(this, 'gainModulator', 'gains');
        }
      });

      return(div);
    }

  }

  return(gainNode);
})();

var OscillatorModule = (function(settings, skin, audioContext) {

  let oscillatorNode = function(settings, skin, audioContext) {
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
        case('Oscillator: May A'):
          hertzSlider.className = 'oscillatorMayASlider';
          detuneSlider.className = 'oscillatorDetuneMayASlider';
          break;
        case('Oscillator: May B'):
          hertzSlider.className = 'oscillatorMayBSlider';
          detuneSlider.className = 'oscillatorDetuneMayBSlider';
          break;
        case('Oscillator: May C'):
          hertzSlider.className = 'oscillatorMayCSlider';
          detuneSlider.className = 'oscillatorDetuneMayCSlider';
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
          trackCursorLocation();
          updateConnectors(obj);
        }

        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = trackCursorLocation;
          obj.positionX = (element.offsetLeft - pos1);
          obj.positionY = (element.offsetTop - pos2);
        }
      }

      dragElement(div, this);

      div.addEventListener('mouseover', () => {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(0.7); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 6;");
        updateConnectors(this);
        setTimeout(() => {
          updateConnectors(this);
        }, 100);
      });

      div.addEventListener('mouseout', () => {
        div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; transform: scale(0.5); transition: transform 0.1s linear; top: " + this.positionY + "px; left: " + this.positionX + "px; z-index: 1;");
        updateConnectors(this);
        setTimeout(() => {
          updateConnectors(this);
        }, 100);
      });

      outputPort.addEventListener('click', () => {
        // alert(outputPort.id);
        if (this.output === null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'oscillator' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'oscillator');
        }
      });

      waveModPort.addEventListener('click', () => {
        // alert(waveModPort.id);
        if (this.waveformModulator === null) {
          clickThroughput({ through: 'input', type: 'waveformModulation', device: 'oscillator'}, waveModPort, this);
        } else {
          disconnectPatchConnection(this, 'waveModInput', 'oscillator');
        }
      });

      hertzModPort.addEventListener('click', () => {
        // alert(hertzModPort.id);
        if (this.hertzModulator === null) {
          clickThroughput({ through: 'input', type: 'frequencyModulation', device: 'oscillator'}, hertzModPort, this);
        } else {
          disconnectPatchConnection(this, 'frequencyModInput', 'oscillator');
        }
      });

      detuneModPort.addEventListener('click', () => {
        // alert(detuneModPort.id);
        if (this.detuneModulator === null) {
          clickThroughput({ through: 'input', type: 'detuneModulation', device: 'oscillator'}, detuneModPort, this);
        } else {
          disconnectPatchConnection(this, 'detuneModInput', 'oscillator');
        }
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
        case('Oscillator: May A'):
          frequencySlider.className = 'oscillatorHorizontalMayASlider';
          detuneSlider.className = 'oscillatorHorizontalMayASlider';
          break;
        case('Oscillator: May B'):
          frequencySlider.className = 'oscillatorHorizontalMayBSlider';
          detuneSlider.className = 'oscillatorHorizontalMayBSlider';
          break;
        case('Oscillator: May C'):
          frequencySlider.className = 'oscillatorHorizontalMayCSlider';
          detuneSlider.className = 'oscillatorHorizontalMayCSlider';
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
        // alert('Oscillator Output Port -- id: ' + this.id);
        if (this.output == null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'oscillator' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'oscillator');
        }
      });

      waveModPort.addEventListener('click', () => {
        // alert('Oscillator Waveform Modulation Port -- id: ' + this.id);
        if (this.waveformModulator === null) {
          clickThroughput({ through: 'input', type: 'waveformModulation', device: 'oscillator'}, waveModPort, this);
        } else {
          disconnectPatchConnection(this, 'waveModInput', 'oscillator');
        }
      });

      frequencyModPort.addEventListener('click', () => {
        // alert('Oscillator Frequency Modulation Port -- id: ' + this.id);
        if (this.hertzModulator === null) {
          clickThroughput({ through: 'input', type: 'frequencyModulation', device: 'oscillator'}, frequencyModPort, this);
        } else {
          disconnectPatchConnection(this, 'frequencyModInput', 'oscillator');
        }
      });

      detuneModPort.addEventListener('click', () => {
        // alert('Oscillator Detune Modulation Port -- id: ' + this.id);
        if (this.detuneModulator === null) {
          clickThroughput({ through: 'input', type: 'detuneModulation', device: 'oscillator'}, detuneModPort, this);
        } else {
          disconnectPatchConnection(this, 'detuneModInput', 'oscillator');
        }
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
        case('Oscillator: May A'):
          frequencySlider.className = 'oscillatorVerticalMayASlider';
          detuneSlider.className = 'oscillatorVerticalMayASlider';
          break;
        case('Oscillator: May B'):
          frequencySlider.className = 'oscillatorVerticalMayBSlider';
          detuneSlider.className = 'oscillatorVerticalMayBSlider';
          break;
        case('Oscillator: May C'):
          frequencySlider.className = 'oscillatorVerticalMayCSlider';
          detuneSlider.className = 'oscillatorVerticalMayCSlider';
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
        // alert('Oscillator Output Port -- id: ' + this.id);
        if (this.output == null) {
          clickThroughput({ through: 'output', type: 'signal', device: 'oscillator' }, outputPort, this);
        } else {
          disconnectPatchConnection(this, 'output', 'oscillator');
        }
      });

      waveModPort.addEventListener('click', () => {
        // alert('Oscillator Waveform Modulation Port -- id: ' + this.id);
        if (this.waveformModulator === null) {
          clickThroughput({ through: 'input', type: 'waveformModulation', device: 'oscillator'}, waveModPort, this);
        } else {
          disconnectPatchConnection(this, 'waveModInput', 'oscillator');
        }
      });

      frequencyModPort.addEventListener('click', () => {
        // alert('Oscillator Frequency Modulation Port -- id: ' + this.id);
        if (this.hertzModulator === null) {
          clickThroughput({ through: 'input', type: 'frequencyModulation', device: 'oscillator'}, frequencyModPort, this);
        } else {
          disconnectPatchConnection(this, 'frequencyModInput', 'oscillator');
        }
      });

      detuneModPort.addEventListener('click', () => {
        // alert('Oscillator Detune Modulation Port -- id: ' + this.id);
        if (this.detuneModulator === null) {
          clickThroughput({ through: 'input', type: 'detuneModulation', device: 'oscillator'}, detuneModPort, this);
        } else {
          disconnectPatchConnection(this, 'detuneModInput', 'oscillator');
        }
      });

      this.userWaveformInput(sine, square, sawtooth, triangle);
      this.userFrequencyInput(frequencyDisplay, frequencySlider);
      this.userDetuneInput(detuneDisplay, detuneSlider);

      return(div);
    }
  }

  return(oscillatorNode);
})();

var TestToneModule = (function(settings, skin, audioContext) {

  let testToneNode = function(settings, skin, audioContext) {
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

var DynamicCompressor = (function(settings, skin, audioContext) {

  let dynamicCompressorNode = function(settings, skin, audioContext) {
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

    this.dragWidth = 1090;
    this.dragHeight = 453;
    this.horizontalWidth = 900;
    this.horizontalHeight = 320;
    this.verticalWidth = 320;
    this.verticalHeight = 750;

    // functionality

    this.manageThrehold = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.threshold = display.value;
        this.dynamicCompressor.threshold.value = (this.threshold);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.threshold = slider.value;
        this.dynamicCompressor.threshold.value = (this.threshold);
      });
    }

    this.manageKnee = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.knee = display.value;
        this.dynamicCompressor.knee.value = (this.knee);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.knee = slider.value;
        this.dynamicCompressor.knee.value = (this.knee);
      });
    }

    this.manageRatio = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.ratio = display.value;
        this.dynamicCompressor.ratio.value = (this.ratio);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.ratio = slider.value;
        this.dynamicCompressor.ratio.value = (this.ratio);
      });
    }

    this.manageAttack = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.attack = display.value;
        this.dynamicCompressor.attack.value = (this.attack);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.attack = slider.value;
        this.dynamicCompressor.attack.value = (this.attack);
      });
    }

    this.manageRelease = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.release = display.value;
        this.dynamicCompressor.release.value = (this.release);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.release = slider.value;
        this.dynamicCompressor.release.value = (this.release);
      });
    }

    // Rendering Functions

    this.renderDraggable = () => {

      let div = document.createElement('div');
      let dynamicCompressorTop = document.createElement('div');
      div.appendChild(dynamicCompressorTop);
      let nameTag = document.createElement('h1');
      dynamicCompressorTop.appendChild(nameTag);
      let signalPanel = document.createElement('div');
      div.appendChild(signalPanel);
      let inputLabel = document.createElement('p');
      signalPanel.appendChild(inputLabel);
      inputLabel.innerHTML = 'in';
      let inputPort = document.createElement('h1');
      signalPanel.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input ' + this.name + this.id;
      let outputLabel = document.createElement('p');
      signalPanel.appendChild(outputLabel);
      outputLabel.innerHTML = 'out';
      let outputPort = document.createElement('h1');
      signalPanel.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let face = document.createElement('div');
      div.appendChild(face);
      let thresholdDiv = document.createElement('div');
      face.appendChild(thresholdDiv);
      let thresholdLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdLabel);
      thresholdLabel.innerHTML = 'threshold(dB)';
      let compressorThresholdDisplay = document.createElement('input');
      thresholdDiv.appendChild(compressorThresholdDisplay);
      compressorThresholdDisplay.type = 'number';
      compressorThresholdDisplay.step = '0.01';
      compressorThresholdDisplay.min = '-100.00';
      compressorThresholdDisplay.max = '0.00';
      compressorThresholdDisplay.value = this.threshold;
      let thresholdSlider = document.createElement('input');
      thresholdDiv.appendChild(thresholdSlider);
      thresholdSlider.type = 'range';
      thresholdSlider.step = '0.01';
      thresholdSlider.min = '-100.00';
      thresholdSlider.max = '0.00';
      thresholdSlider.value = this.threshold;
      let thresholdModulatorLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdModulatorLabel);
      thresholdModulatorLabel.innerHTML = 'modulation';
      let thresholdModulatorInput = document.createElement('h1');
      thresholdDiv.appendChild(thresholdModulatorInput);
      thresholdModulatorInput.innerHTML = '◦';
      thresholdModulatorInput.id = 'threshhold modulator input - ' + this.name + this.id;
      let kneeDiv = document.createElement('div');
      face.appendChild(kneeDiv);
      let kneeLabel = document.createElement('p');
      kneeDiv.appendChild(kneeLabel);
      kneeLabel.innerHTML = 'knee(dB)';
      let compressorKneeDisplay = document.createElement('input');
      kneeDiv.appendChild(compressorKneeDisplay);
      compressorKneeDisplay.type = 'number';
      compressorKneeDisplay.step = '0.01';
      compressorKneeDisplay.min = '0.00';
      compressorKneeDisplay.max = '40.00';
      compressorKneeDisplay.value = this.knee;
      let kneeSlider = document.createElement('input');
      kneeDiv.appendChild(kneeSlider);
      kneeSlider.type = 'range';
      kneeSlider.step = '0.01';
      kneeSlider.min = '0.00';
      kneeSlider.max = '40.00';
      kneeSlider.value = this.knee;
      let kneeModulatorLabel = document.createElement('p');
      kneeDiv.appendChild(kneeModulatorLabel);
      kneeModulatorLabel.innerHTML = 'modulation';
      let kneeModulatorInput = document.createElement('h1');
      kneeDiv.appendChild(kneeModulatorInput);
      kneeModulatorInput.innerHTML = '◦';
      kneeModulatorInput.id = 'knee modulator input - ' + this.name + this.id;
      let ratioDiv = document.createElement('div');
      face.appendChild(ratioDiv);
      let ratioLabel = document.createElement('p');
      ratioDiv.appendChild(ratioLabel);
      ratioLabel.innerHTML = 'ratio';
      let compressorRatioDisplay = document.createElement('input');
      ratioDiv.appendChild(compressorRatioDisplay);
      compressorRatioDisplay.type = 'number';
      compressorRatioDisplay.step = '0.01';
      compressorRatioDisplay.min = '1.00';
      compressorRatioDisplay.max = '20.00';
      compressorRatioDisplay.value = this.ratio;
      let ratioSlider = document.createElement('input');
      ratioDiv.appendChild(ratioSlider);
      ratioSlider.type = 'range';
      ratioSlider.step = '0.01';
      ratioSlider.min = '1.00';
      ratioSlider.max = '20.00';
      ratioSlider.value = this.ratio;
      let ratioModulatorLabel = document.createElement('p');
      ratioDiv.appendChild(ratioModulatorLabel);
      ratioModulatorLabel.innerHTML = 'modulation';
      let ratioModulatorInput = document.createElement('h1');
      ratioDiv.appendChild(ratioModulatorInput);
      ratioModulatorInput.innerHTML = '◦';
      ratioModulatorInput.id = 'ratio modulator input - ' + this.name + this.id;
      let attackDiv = document.createElement('div');
      face.appendChild(attackDiv);
      let attackLabel = document.createElement('p');
      attackDiv.appendChild(attackLabel);
      attackLabel.innerHTML = 'attack(sec)';
      let compressorAttackDisplay = document.createElement('input');
      attackDiv.appendChild(compressorAttackDisplay);
      compressorAttackDisplay.type = 'number';
      compressorAttackDisplay.step = '0.001';
      compressorAttackDisplay.min = '0.000';
      compressorAttackDisplay.max = '1.000';
      compressorAttackDisplay.value = this.attack;
      let attackSlider = document.createElement('input');
      attackDiv.appendChild(attackSlider);
      attackSlider.type = 'range';
      attackSlider.step = '0.001';
      attackSlider.min = '0.000';
      attackSlider.max = '1.000';
      attackSlider.value = this.attack;
      let attackModulatorLabel = document.createElement('p');
      attackDiv.appendChild(attackModulatorLabel);
      attackModulatorLabel.innerHTML = 'modulation';
      let attackModulatorInput = document.createElement('h1');
      attackDiv.appendChild(attackModulatorInput);
      attackModulatorInput.innerHTML = '◦';
      attackModulatorInput.id = 'attack modulator input - ' + this.name + this.id;
      let releaseDiv = document.createElement('div');
      face.appendChild(releaseDiv);
      let releaseLabel = document.createElement('p');
      releaseDiv.appendChild(releaseLabel);
      releaseLabel.innerHTML = 'release(sec)';
      let compressorReleaseDisplay = document.createElement('input');
      releaseDiv.appendChild(compressorReleaseDisplay);
      compressorReleaseDisplay.type = 'number';
      compressorReleaseDisplay.step = '0.001';
      compressorReleaseDisplay.min = '0.000';
      compressorReleaseDisplay.max = '1.000';
      compressorReleaseDisplay.value = this.release;
      let releaseSlider = document.createElement('input');
      releaseDiv.appendChild(releaseSlider);
      releaseSlider.type = 'range';
      releaseSlider.step = '0.001';
      releaseSlider.min = '0.000';
      releaseSlider.max = '1.000';
      releaseSlider.value = this.release;
      let releaseModulatorLabel = document.createElement('p');
      releaseDiv.appendChild(releaseModulatorLabel);
      releaseModulatorLabel.innerHTML = 'modulation';
      let releaseModulatorInput = document.createElement('h1');
      releaseDiv.appendChild(releaseModulatorInput);
      releaseModulatorInput.innerHTML = '◦';
      releaseModulatorInput.id = 'release modulator input - ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5);");
      dynamicCompressorTop.setAttribute("style", "width: 100%; background: url(" + this.topPath + "); background-size: " + this.topSize + "; font-family: 'Righteous', cursive; height: 60px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + this.topRepeat + ";");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 40px; margin-left: 2em; margin-top: 6em; color: " + this.topFontColor + "; font-weight: 600; text-shadow: 1px 1px 1px " + this.topFontShadow + ", 2px 2px 1px " + this.topFontShadow + ";");
      signalPanel.setAttribute("style", "background: url(" + this.signalPath + "); background-size: " + this.signalSize + "; border: solid 1px transparent; height: " + this.dragHeight + "px; width: 59px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: -6px; margin-top: -26px; box-shadow: 0px -1px 1px " + this.signalFontShadow + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 15px; margin-top: 58px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 2px; margin-top: 58px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      face.setAttribute("style", "height: " + this.dragHeight + "px; width: 100%; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: " + this.faceRepeat + "; margin-top: -425px; margin-left: 59px; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ";");
      thresholdDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px;");
      thresholdLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      compressorThresholdDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      thresholdSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 400px; margin: 140px 25px 0 -10px;");
      switch(this.skinName) {
        case('Dynamic Compressor: January A'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryA';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryA';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryA';
          attackSlider.className = 'dynamicCompressorSliderJanuaryA';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryA';
          break;
        case('Dynamic Compressor: January B'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryB';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryB';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryB';
          attackSlider.className = 'dynamicCompressorSliderJanuaryB';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryB';
          break;
        case('Dynamic Compressor: January C'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryC';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryC';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryC';
          attackSlider.className = 'dynamicCompressorSliderJanuaryC';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryC';
          break;
        case('Dynamic Compressor: February A'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryA';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryA';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryA';
          attackSlider.className = 'dynamicCompressorSliderFebruaryA';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryA';
          break;
        case('Dynamic Compressor: February B'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryB';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryB';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryB';
          attackSlider.className = 'dynamicCompressorSliderFebruaryB';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryB';
          break;
        case('Dynamic Compressor: February C'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryC';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryC';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryC';
          attackSlider.className = 'dynamicCompressorSliderFebruaryC';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryC';
          break;
        case('Dynamic Compressor: March A'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchA';
          kneeSlider.className = 'dynamicCompressorSliderMarchA';
          ratioSlider.className = 'dynamicCompressorSliderMarchA';
          attackSlider.className = 'dynamicCompressorSliderMarchA';
          releaseSlider.className = 'dynamicCompressorSliderMarchA';
          break;
        case('Dynamic Compressor: March B'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchB';
          kneeSlider.className = 'dynamicCompressorSliderMarchB';
          ratioSlider.className = 'dynamicCompressorSliderMarchB';
          attackSlider.className = 'dynamicCompressorSliderMarchB';
          releaseSlider.className = 'dynamicCompressorSliderMarchB';
          break;
        case('Dynamic Compressor: March C'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchC';
          kneeSlider.className = 'dynamicCompressorSliderMarchC';
          ratioSlider.className = 'dynamicCompressorSliderMarchC';
          attackSlider.className = 'dynamicCompressorSliderMarchC';
          releaseSlider.className = 'dynamicCompressorSliderMarchC';
          break;
        case('Dynamic Compressor: April A'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilA';
          kneeSlider.className = 'dynamicCompressorSliderAprilA';
          ratioSlider.className = 'dynamicCompressorSliderAprilA';
          attackSlider.className = 'dynamicCompressorSliderAprilA';
          releaseSlider.className = 'dynamicCompressorSliderAprilA';
          break;
        case('Dynamic Compressor: April B'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilB';
          kneeSlider.className = 'dynamicCompressorSliderAprilB';
          ratioSlider.className = 'dynamicCompressorSliderAprilB';
          attackSlider.className = 'dynamicCompressorSliderAprilB';
          releaseSlider.className = 'dynamicCompressorSliderAprilB';
          break;
        case('Dynamic Compressor: April C'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilC';
          kneeSlider.className = 'dynamicCompressorSliderAprilC';
          ratioSlider.className = 'dynamicCompressorSliderAprilC';
          attackSlider.className = 'dynamicCompressorSliderAprilC';
          releaseSlider.className = 'dynamicCompressorSliderAprilC';
          break;
        default:
          console.log('unsupported dynamic compressor skin');
      }
      thresholdModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      thresholdModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      kneeDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px;");
      kneeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      compressorKneeDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.kneeDisplayPath + "); background-size: " + this.kneeDisplaySize + "; box-shadow: -1px -1px 1px " + this.kneeDisplayBoxShadowColor + ", -2px -2px 1px " + this.kneeDisplayBoxShadowColor + ", -3px -3px 1px " + this.kneeDisplayBoxShadowColor + ", -4px -4px 1px " + this.kneeDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      kneeSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.kneeSliderPath + "); background-size: " + this.kneeSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.kneeSliderBoxShadowColor + ", 2px -2px 1px " + this.kneeSliderBoxShadowColor + ", 3px -3px 1px " + this.kneeSliderBoxShadowColor + ", 4px -4px 1px " + this.kneeSliderBoxShadowColor + "; height: 32px; width: 400px; margin: 140px 25px 0 -10px;");
      kneeModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      kneeModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      ratioDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px;");
      ratioLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      compressorRatioDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.ratioDisplayPath + "); background-size: " + this.ratioDisplaySize + "; box-shadow: -1px -1px 1px " + this.ratioDisplayBoxShadowColor + ", -2px -2px 1px " + this.ratioDisplayBoxShadowColor + ", -3px -3px 1px " + this.ratioDisplayBoxShadowColor + ", -4px -4px 1px " + this.ratioDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      ratioSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.ratioSliderPath + "); background-size: " + this.ratioSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.ratioSliderBoxShadowColor + ", 2px -2px 1px " + this.ratioSliderBoxShadowColor + ", 3px -3px 1px " + this.ratioSliderBoxShadowColor + ", 4px -4px 1px " + this.ratioSliderBoxShadowColor + "; height: 32px; width: 400px; margin: 140px 25px 0 -10px;");
      ratioModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      ratioModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      attackDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px;");
      attackLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      compressorAttackDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.attackDisplayPath + "); background-size: " + this.attackDisplaySize + "; box-shadow: -1px -1px 1px " + this.attackDisplayBoxShadowColor + ", -2px -2px 1px " + this.attackDisplayBoxShadowColor + ", -3px -3px 1px " + this.attackDisplayBoxShadowColor + ", -4px -4px 1px " + this.attackDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      attackSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.attackSliderPath + "); background-size: " + this.attackSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.attackSliderBoxShadowColor + ", 2px -2px 1px " + this.attackSliderBoxShadowColor + ", 3px -3px 1px " + this.attackSliderBoxShadowColor + ", 4px -4px 1px " + this.attackSliderBoxShadowColor + "; height: 32px; width: 400px; margin: 140px 25px 0 -10px;");
      attackModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      attackModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      releaseDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/5) + "px; height: " + this.dragHeight + "px;");
      releaseLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      compressorReleaseDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.releaseDisplayPath + "); background-size: " + this.releaseDisplaySize + "; box-shadow: -1px -1px 1px " + this.releaseDisplayBoxShadowColor + ", -2px -2px 1px " + this.releaseDisplayBoxShadowColor + ", -3px -3px 1px " + this.releaseDisplayBoxShadowColor + ", -4px -4px 1px " + this.releaseDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      releaseSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.releaseSliderPath + "); background-size: " + this.releaseSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.releaseSliderBoxShadowColor + ", 2px -2px 1px " + this.releaseSliderBoxShadowColor + ", 3px -3px 1px " + this.releaseSliderBoxShadowColor + ", 4px -4px 1px " + this.releaseSliderBoxShadowColor + "; height: 32px; width: 400px; margin: 140px 25px 0 -10px;");
      releaseModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      releaseModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");

      this.manageThrehold(compressorThresholdDisplay, thresholdSlider);

      this.manageKnee(compressorKneeDisplay, kneeSlider);

      this.manageRatio(compressorRatioDisplay, ratioSlider);

      this.manageAttack(compressorAttackDisplay, attackSlider);

      this.manageRelease(compressorReleaseDisplay, releaseSlider);

      function dragElement(element, obj) {

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (dynamicCompressorTop) {
          dynamicCompressorTop.onmousedown = dragMouseDown;
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

      inputPort.addEventListener('click', () => {
        alert(inputPort.id);
      });

      thresholdModulatorInput.addEventListener('click', () => {
        alert(thresholdModulatorInput.id);
      });

      kneeModulatorInput.addEventListener('click', () => {
        alert(kneeModulatorInput.id);
      });

      ratioModulatorInput.addEventListener('click', () => {
        alert(ratioModulatorInput.id);
      });

      attackModulatorInput.addEventListener('click', () => {
        alert(attackModulatorInput.id);
      });

      releaseModulatorInput.addEventListener('click', () => {
        alert(releaseModulatorInput.id);
      })

      return(div);
    }

    this.renderRackHorizontal = (x, y) => {

      let div = document.createElement('div');
      let nameAndOutputDiv = document.createElement('div');
      div.appendChild(nameAndOutputDiv);
      let nameTag = document.createElement('h1');
      nameAndOutputDiv.appendChild(nameTag);
      let inputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      let inputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input ' +    this.name + this.id;
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let thresholdDiv = document.createElement('div');
      div.appendChild(thresholdDiv);
      let thresholdLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdLabel);
      thresholdLabel.innerHTML = 'threshold(dB)';
      let thresholdDisplay = document.createElement('input');
      thresholdDiv.appendChild(thresholdDisplay);
      thresholdDisplay.type = 'number';
      thresholdDisplay.step = '0.01';
      thresholdDisplay.min = '-100.00';
      thresholdDisplay.max = '0.00';
      thresholdDisplay.value = this.threshold;
      let thresholdSlider = document.createElement('input');
      thresholdDiv.appendChild(thresholdSlider);
      thresholdSlider.type = 'range';
      thresholdSlider.step = '0.01';
      thresholdSlider.min = '-100.00';
      thresholdSlider.max = '0.00';
      thresholdSlider.value = this.threshold;
      let thresholdModulatorLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdModulatorLabel);
      thresholdModulatorLabel.innerHTML = 'modulation';
      let thresholdModulatorInput = document.createElement('h1');
      thresholdDiv.appendChild(thresholdModulatorInput);
      thresholdModulatorInput.innerHTML = '◦';
      thresholdModulatorInput.id = 'threshhold modulator input - ' + this.name + this.id;
      let kneeDiv = document.createElement('div');
      div.appendChild(kneeDiv);
      let kneeLabel = document.createElement('p');
      kneeDiv.appendChild(kneeLabel);
      kneeLabel.innerHTML = 'knee(dB)';
      let kneeDisplay = document.createElement('input');
      kneeDiv.appendChild(kneeDisplay);
      kneeDisplay.type = 'number';
      kneeDisplay.step = '0.01';
      kneeDisplay.max = '40.00';
      kneeDisplay.min = '0.00';
      kneeDisplay.value = this.knee;
      let kneeSlider = document.createElement('input');
      kneeDiv.appendChild(kneeSlider);
      kneeSlider.type = 'range';
      kneeSlider.step = '0.01';
      kneeSlider.max = '40.00';
      kneeSlider.min = '0.00';
      kneeSlider.value = this.knee;
      let kneeModulatorLabel = document.createElement('p');
      kneeDiv.appendChild(kneeModulatorLabel);
      kneeModulatorLabel.innerHTML = 'modulation';
      let kneeModulatorInput = document.createElement('h1');
      kneeDiv.appendChild(kneeModulatorInput);
      kneeModulatorInput.innerHTML = '◦';
      kneeModulatorInput.id = 'knee modulator input - ' + this.name + this.id;
      let ratioDiv = document.createElement('div');
      div.appendChild(ratioDiv);
      let ratioLabel = document.createElement('p');
      ratioDiv.appendChild(ratioLabel);
      ratioLabel.innerHTML = 'ratio';
      let ratioDisplay = document.createElement('input');
      ratioDiv.appendChild(ratioDisplay);
      ratioDisplay.type = 'number';
      ratioDisplay.step = '0.01';
      ratioDisplay.max = '20.00';
      ratioDisplay.min = '1.00';
      ratioDisplay.value = this.ratio;
      let ratioSlider = document.createElement('input');
      ratioDiv.appendChild(ratioSlider);
      ratioSlider.type = 'range';
      ratioSlider.step = '0.01';
      ratioSlider.max = '20.00';
      ratioSlider.min = '1.00';
      ratioSlider.value = this.ratio;
      let ratioModulatorLabel = document.createElement('p');
      ratioDiv.appendChild(ratioModulatorLabel);
      ratioModulatorLabel.innerHTML = 'modulation';
      let ratioModulatorInput = document.createElement('h1');
      ratioDiv.appendChild(ratioModulatorInput);
      ratioModulatorInput.innerHTML = '◦';
      ratioModulatorInput.id = 'ratio modulator input - ' + this.name + this.id;
      let attackDiv = document.createElement('div');
      div.appendChild(attackDiv);
      let attackLabel = document.createElement('p');
      attackDiv.appendChild(attackLabel);
      attackLabel.innerHTML = 'attack(sec)';
      let attackDisplay = document.createElement('input');
      attackDiv.appendChild(attackDisplay);
      attackDisplay.type = 'number';
      attackDisplay.step = '0.001';
      attackDisplay.max = '1.000';
      attackDisplay.min = '0.000';
      attackDisplay.value = this.attack;
      let attackSlider = document.createElement('input');
      attackDiv.appendChild(attackSlider);
      attackSlider.type = 'range';
      attackSlider.step = '0.001';
      attackSlider.max = '1.000';
      attackSlider.min = '0.000';
      attackSlider.value = this.attack;
      let attackModulatorLabel = document.createElement('p');
      attackDiv.appendChild(attackModulatorLabel);
      attackModulatorLabel.innerHTML = 'modulation';
      let attackModulatorInput = document.createElement('h1');
      attackDiv.appendChild(attackModulatorInput);
      attackModulatorInput.innerHTML = '◦';
      attackModulatorInput.id = 'attack modulator input - ' + this.name + this.id;
      let releaseDiv = document.createElement('div');
      div.appendChild(releaseDiv);
      let releaseLabel = document.createElement('p');
      releaseDiv.appendChild(releaseLabel);
      releaseLabel.innerHTML = 'release(sec)';
      let releaseDisplay = document.createElement('input');
      releaseDiv.appendChild(releaseDisplay);
      releaseDisplay.type = 'number';
      releaseDisplay.step = '0.001';
      releaseDisplay.max = '1.000';
      releaseDisplay.min = '0.000';
      releaseDisplay.value = this.release;
      let releaseSlider = document.createElement('input');
      releaseDiv.appendChild(releaseSlider);
      releaseSlider.type = 'range';
      releaseSlider.step = '0.001';
      releaseSlider.max = '1.000';
      releaseSlider.min = '0.000';
      releaseSlider.value = this.release;
      let releaseModulatorLabel = document.createElement('p');
      releaseDiv.appendChild(releaseModulatorLabel);
      releaseModulatorLabel.innerHTML = 'modulation';
      let releaseModulatorInput = document.createElement('h1');
      releaseDiv.appendChild(releaseModulatorInput);
      releaseModulatorInput.innerHTML = '◦';
      releaseModulatorInput.id = 'release modulator input - ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 5px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 40px; margin-top: 1px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 50px; margin-top: -15px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 40px; margin-top: 1px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 50px; margin-top: -15px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      thresholdDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      thresholdLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      thresholdDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      thresholdSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 220px; margin: 105px 0 0 10px;");
      switch(this.skinName) {
        case('Dynamic Compressor: January A'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryA';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryA';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryA';
          attackSlider.className = 'dynamicCompressorSliderJanuaryA';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryA';
          break;
        case('Dynamic Compressor: January B'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryB';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryB';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryB';
          attackSlider.className = 'dynamicCompressorSliderJanuaryB';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryB';
          break;
        case('Dynamic Compressor: January C'):
          thresholdSlider.className = 'dynamicCompressorSliderJanuaryC';
          kneeSlider.className = 'dynamicCompressorSliderJanuaryC';
          ratioSlider.className = 'dynamicCompressorSliderJanuaryC';
          attackSlider.className = 'dynamicCompressorSliderJanuaryC';
          releaseSlider.className = 'dynamicCompressorSliderJanuaryC';
          break;
        case('Dynamic Compressor: February A'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryA';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryA';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryA';
          attackSlider.className = 'dynamicCompressorSliderFebruaryA';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryA';
          break;
        case('Dynamic Compressor: February B'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryB';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryB';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryB';
          attackSlider.className = 'dynamicCompressorSliderFebruaryB';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryB';
          break;
        case('Dynamic Compressor: February C'):
          thresholdSlider.className = 'dynamicCompressorSliderFebruaryC';
          kneeSlider.className = 'dynamicCompressorSliderFebruaryC';
          ratioSlider.className = 'dynamicCompressorSliderFebruaryC';
          attackSlider.className = 'dynamicCompressorSliderFebruaryC';
          releaseSlider.className = 'dynamicCompressorSliderFebruaryC';
          break;
        case('Dynamic Compressor: March A'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchA';
          kneeSlider.className = 'dynamicCompressorSliderMarchA';
          ratioSlider.className = 'dynamicCompressorSliderMarchA';
          attackSlider.className = 'dynamicCompressorSliderMarchA';
          releaseSlider.className = 'dynamicCompressorSliderMarchA';
          break;
        case('Dynamic Compressor: March B'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchB';
          kneeSlider.className = 'dynamicCompressorSliderMarchB';
          ratioSlider.className = 'dynamicCompressorSliderMarchB';
          attackSlider.className = 'dynamicCompressorSliderMarchB';
          releaseSlider.className = 'dynamicCompressorSliderMarchB';
          break;
        case('Dynamic Compressor: March C'):
          thresholdSlider.className = 'dynamicCompressorSliderMarchC';
          kneeSlider.className = 'dynamicCompressorSliderMarchC';
          ratioSlider.className = 'dynamicCompressorSliderMarchC';
          attackSlider.className = 'dynamicCompressorSliderMarchC';
          releaseSlider.className = 'dynamicCompressorSliderMarchC';
          break;
        case('Dynamic Compressor: April A'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilA';
          kneeSlider.className = 'dynamicCompressorSliderAprilA';
          ratioSlider.className = 'dynamicCompressorSliderAprilA';
          attackSlider.className = 'dynamicCompressorSliderAprilA';
          releaseSlider.className = 'dynamicCompressorSliderAprilA';
          break;
        case('Dynamic Compressor: April B'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilB';
          kneeSlider.className = 'dynamicCompressorSliderAprilB';
          ratioSlider.className = 'dynamicCompressorSliderAprilB';
          attackSlider.className = 'dynamicCompressorSliderAprilB';
          releaseSlider.className = 'dynamicCompressorSliderAprilB';
          break;
        case('Dynamic Compressor: April C'):
          thresholdSlider.className = 'dynamicCompressorSliderAprilC';
          kneeSlider.className = 'dynamicCompressorSliderAprilC';
          ratioSlider.className = 'dynamicCompressorSliderAprilC';
          attackSlider.className = 'dynamicCompressorSliderAprilC';
          releaseSlider.className = 'dynamicCompressorSliderAprilC';
          break;
        default:
          console.log('unsupported dynamic compressor skin');
      }
      thresholdModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 0 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      thresholdModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 0 30px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      kneeDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      kneeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      kneeDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.ratioDisplaySize + "; box-shadow: -1px -1px 1px " + this.ratioDisplayBoxShadowColor + ", -2px -2px 1px " + this.ratioDisplayBoxShadowColor + ", -3px -3px 1px " + this.ratioDisplayBoxShadowColor + ", -4px -4px 1px " + this.ratioDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      kneeSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 220px; margin: 105px 0 0 10px;");
      kneeModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 0 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      kneeModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 0 30px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      ratioDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      ratioLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      ratioDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.ratioDisplaySize + "; box-shadow: -1px -1px 1px " + this.ratioDisplayBoxShadowColor + ", -2px -2px 1px " + this.ratioDisplayBoxShadowColor + ", -3px -3px 1px " + this.ratioDisplayBoxShadowColor + ", -4px -4px 1px " + this.ratioDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      ratioSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 220px; margin: 105px 0 0 10px;");
      ratioModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 0 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      ratioModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 0 30px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      attackDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      attackLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      attackDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.ratioDisplaySize + "; box-shadow: -1px -1px 1px " + this.ratioDisplayBoxShadowColor + ", -2px -2px 1px " + this.ratioDisplayBoxShadowColor + ", -3px -3px 1px " + this.ratioDisplayBoxShadowColor + ", -4px -4px 1px " + this.ratioDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      attackSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 220px; margin: 105px 0 0 10px;");
      attackModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 0 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      attackModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 0 30px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      releaseDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/6) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      releaseLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      releaseDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.ratioDisplaySize + "; box-shadow: -1px -1px 1px " + this.ratioDisplayBoxShadowColor + ", -2px -2px 1px " + this.ratioDisplayBoxShadowColor + ", -3px -3px 1px " + this.ratioDisplayBoxShadowColor + ", -4px -4px 1px " + this.ratioDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      releaseSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", 2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", 3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", 4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 32px; width: 220px; margin: 105px 0 0 10px;");
      releaseModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 0 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      releaseModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; margin: 5px 0 0 30px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");

      this.manageThrehold(thresholdDisplay, thresholdSlider);

      this.manageKnee(kneeDisplay, kneeSlider);

      this.manageRatio(ratioDisplay, ratioSlider);

      this.manageAttack(attackDisplay, attackSlider);

      this.manageRelease(releaseDisplay, releaseSlider);

      thresholdModulatorInput.addEventListener('click', () => {
        alert(thresholdModulatorInput.id);
      });

      kneeModulatorInput.addEventListener('click', () => {
        alert(kneeModulatorInput.id);
      });

      ratioModulatorInput.addEventListener('click', () => {
        alert(ratioModulatorInput.id);
      });

      attackModulatorInput.addEventListener('click', () => {
        alert(attackModulatorInput.id);
      });

      releaseModulatorInput.addEventListener('click', () => {
        alert(releaseModulatorInput.id);
      });

      outputPort.addEventListener('click', () => {
        alert(outputPort.id);
      });

      inputPort.addEventListener('click', () => {
        alert(inputPort.id);
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
      let inputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      let inputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input ' + this.name + this.id;
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let thresholdDiv = document.createElement('div');
      div.appendChild(thresholdDiv);
      let thresholdDisplay = document.createElement('input');
      thresholdDiv.appendChild(thresholdDisplay);
      thresholdDisplay.type = 'number';
      thresholdDisplay.step = '0.01';
      thresholdDisplay.max = '0.00';
      thresholdDisplay.min = '-100.00';
      thresholdDisplay.value = this.threshold;
      let thresholdLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdLabel);
      thresholdLabel.innerHTML = 'threshold(dB)';
      let thresholdSlider = document.createElement('input');
      thresholdDiv.appendChild(thresholdSlider);
      thresholdSlider.type = 'range';
      thresholdSlider.step = '0.01';
      thresholdSlider.max = '0.00';
      thresholdSlider.min = '-100.00';
      thresholdSlider.value = this.threshold;
      let thresholdModulatorLabel = document.createElement('p');
      thresholdDiv.appendChild(thresholdModulatorLabel);
      thresholdModulatorLabel.innerHTML = 'modulation:';
      let thresholdModulatorInput = document.createElement('h1');
      thresholdDiv.appendChild(thresholdModulatorInput);
      thresholdModulatorInput.innerHTML = '◦';
      thresholdModulatorInput.id = 'Threshold Modulation Input ' + this.name + this.id;
      let kneeDiv = document.createElement('div');
      div.appendChild(kneeDiv);
      let kneeDisplay = document.createElement('input');
      kneeDiv.appendChild(kneeDisplay);
      kneeDisplay.type = 'number';
      kneeDisplay.step = '0.01';
      kneeDisplay.max = '40.00';
      kneeDisplay.min = '0.00';
      kneeDisplay.value = this.knee;
      let kneeLabel = document.createElement('p');
      kneeDiv.appendChild(kneeLabel);
      kneeLabel.innerHTML = 'knee(dB)';
      let kneeSlider = document.createElement('input');
      kneeDiv.appendChild(kneeSlider);
      kneeSlider.type = 'range';
      kneeSlider.step = '0.01';
      kneeSlider.max = '40.00';
      kneeSlider.min = '0.00';
      kneeSlider.value = this.knee;
      let kneeModulatorLabel = document.createElement('p');
      kneeDiv.appendChild(kneeModulatorLabel);
      kneeModulatorLabel.innerHTML = 'modulation:';
      let kneeModulatorInput = document.createElement('h1');
      kneeDiv.appendChild(kneeModulatorInput);
      kneeModulatorInput.innerHTML = '◦';
      kneeModulatorInput.id = 'Knee Modulation Input ' + this.name + this.id;
      let ratioDiv = document.createElement('div');
      div.appendChild(ratioDiv);
      let ratioDisplay = document.createElement('input');
      ratioDiv.appendChild(ratioDisplay);
      ratioDisplay.type = 'number';
      ratioDisplay.step = '0.01';
      ratioDisplay.max = '20.00';
      ratioDisplay.min = '1.00';
      ratioDisplay.value = this.ratio;
      let ratioLabel = document.createElement('p');
      ratioDiv.appendChild(ratioLabel);
      ratioLabel.innerHTML = 'ratio';
      let ratioSlider = document.createElement('input');
      ratioDiv.appendChild(ratioSlider);
      ratioSlider.type = 'range';
      ratioSlider.step = '0.01';
      ratioSlider.max = '20.00';
      ratioSlider.mind = '1.00';
      ratioSlider.value = this.ratio;
      let ratioModulatorLabel = document.createElement('p');
      ratioDiv.appendChild(ratioModulatorLabel);
      ratioModulatorLabel.innerHTML = 'modulation:';
      let ratioModulatorInput = document.createElement('h1');
      ratioDiv.appendChild(ratioModulatorInput);
      ratioModulatorInput.innerHTML = '◦';
      ratioModulatorInput.id = 'Ratio Modulation Input ' + this.name + this.id;
      let attackDiv = document.createElement('div');
      div.appendChild(attackDiv);
      let attackDisplay = document.createElement('input');
      attackDiv.appendChild(attackDisplay);
      attackDisplay.type = 'number';
      attackDisplay.step = '0.001';
      attackDisplay.max = '1.000';
      attackDisplay.min = '0.000';
      attackDisplay.value = this.attack;
      let attackLabel = document.createElement('p');
      attackDiv.appendChild(attackLabel);
      attackLabel.innerHTML = 'attack(sec)';
      let attackSlider = document.createElement('input');
      attackDiv.appendChild(attackSlider);
      attackSlider.type = 'range';
      attackSlider.step = '0.001';
      attackSlider.max = '1.000';
      attackSlider.min = '0.000';
      attackSlider.value = this.attack;
      let attackModulatorLabel = document.createElement('p');
      attackDiv.appendChild(attackModulatorLabel);
      attackModulatorLabel.innerHTML = 'modulation:';
      let attackModulatorInput = document.createElement('h1');
      attackDiv.appendChild(attackModulatorInput);
      attackModulatorInput.innerHTML = '◦';
      attackModulatorInput.id = 'Attack Modulation Input ' + this.name + this.id;
      let releaseDiv = document.createElement('div');
      div.appendChild(releaseDiv);
      let releaseDisplay = document.createElement('input');
      releaseDiv.appendChild(releaseDisplay);
      releaseDisplay.type = 'number';
      releaseDisplay.step = '0.001';
      releaseDisplay.max = '1.000';
      releaseDisplay.min = '0.000';
      releaseDisplay.value = this.release;
      let releaseLabel = document.createElement('p');
      releaseDiv.appendChild(releaseLabel);
      releaseLabel.innerHTML = 'release(sec)';
      let releaseSlider = document.createElement('input');
      releaseDiv.appendChild(releaseSlider);
      releaseSlider.type = 'range';
      releaseSlider.step = '0.001';
      releaseSlider.max = '1.000';
      releaseSlider.min = '0.000';
      releaseSlider.value = this.release;
      let releaseModulatorLabel = document.createElement('p');
      releaseDiv.appendChild(releaseModulatorLabel);
      releaseModulatorLabel.innerHTML = 'modulation:';
      let releaseModulatorInput = document.createElement('h1');
      releaseDiv.appendChild(releaseModulatorInput);
      releaseModulatorInput.innerHTML = '◦';
      releaseModulatorInput.id = 'Release Modulator Input ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadow + ", -2px -2px 1px " + this.topFontShadow + "; position: relative; top: -10px; left: 5px;");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + "; margin-left: 8px; margin-top: -12px;");
      inputPort.setAttribute("style", "z-index: 6; cursor: pointer; font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; padding-left: 10px; position: relative; left: 80px; top: -42px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadow + ", -2px -2px 1px " + this.signalFontShadow + "; margin-left: 158px; margin-top: -130px; position: relative;");
      outputPort.setAttribute("style", "z-index: 6; cursor: pointer; font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; padding-left: 10px; position: relative; left: 240px; top: -42px;");
      thresholdDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      thresholdDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; top: 5px; left: 10px;");
      thresholdLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -45px; left: 165px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      thresholdSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", -2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", -3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", -4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 24px; width: 240px; position: relative; top: -45px; left: 10px;");
      switch(this.skinName) {
        case('Dynamic Compressor: January A'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderJanuaryA';
          kneeSlider.className = 'dynamicCompressorVerticalSliderJanuaryA';
          ratioSlider.className = 'dynamicCompressorVerticalSliderJanuaryA';
          attackSlider.className = 'dynamicCompressorVerticalSliderJanuaryA';
          releaseSlider.className = 'dynamicCompressorVerticalSliderJanuaryA';
          break;
        case('Dynamic Compressor: January B'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderJanuaryB';
          kneeSlider.className = 'dynamicCompressorVerticalSliderJanuaryB';
          ratioSlider.className = 'dynamicCompressorVerticalSliderJanuaryB';
          attackSlider.className = 'dynamicCompressorVerticalSliderJanuaryB';
          releaseSlider.className = 'dynamicCompressorVerticalSliderJanuaryB';
          break;
        case('Dynamic Compressor: January C'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderJanuaryC';
          kneeSlider.className = 'dynamicCompressorVerticalSliderJanuaryC';
          ratioSlider.className = 'dynamicCompressorVerticalSliderJanuaryC';
          attackSlider.className = 'dynamicCompressorVerticalSliderJanuaryC';
          releaseSlider.className = 'dynamicCompressorVerticalSliderJanuaryC';
          break;
        case('Dynamic Compressor: February A'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderFebruaryA';
          kneeSlider.className = 'dynamicCompressorVerticalSliderFebruaryA';
          ratioSlider.className = 'dynamicCompressorVerticalSliderFebruaryA';
          attackSlider.className = 'dynamicCompressorVerticalSliderFebruaryA';
          releaseSlider.className = 'dynamicCompressorVerticalSliderFebruaryA';
          break;
        case('Dynamic Compressor: February B'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderFebruaryB';
          kneeSlider.className = 'dynamicCompressorVerticalSliderFebruaryB';
          ratioSlider.className = 'dynamicCompressorVerticalSliderFebruaryB';
          attackSlider.className = 'dynamicCompressorVerticalSliderFebruaryB';
          // releaseSlider.className = 'dynamicCompressorSliderFebruaryB';
          break;
        case('Dynamic Compressor: February C'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderFebruaryC';
          kneeSlider.className = 'dynamicCompressorVerticalSliderFebruaryC';
          ratioSlider.className = 'dynamicCompressorVerticalSliderFebruaryC';
          attackSlider.className = 'dynamicCompressorVerticalSliderFebruaryC';
          releaseSlider.className = 'dynamicCompressorVerticalSliderFebruaryC';
          break;
        case('Dynamic Compressor: March A'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderMarchA';
          kneeSlider.className = 'dynamicCompressorVerticalSliderMarchA';
          ratioSlider.className = 'dynamicCompressorVerticalSliderMarchA';
          attackSlider.className = 'dynamicCompressorVerticalSliderMarchA';
          releaseSlider.className = 'dynamicCompressorVerticalSliderMarchA';
          break;
        case('Dynamic Compressor: March B'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderMarchB';
          kneeSlider.className = 'dynamicCompressorVerticalSliderMarchB';
          ratioSlider.className = 'dynamicCompressorVerticalSliderMarchB';
          attackSlider.className = 'dynamicCompressorVerticalSliderMarchB';
          releaseSlider.className = 'dynamicCompressorVerticalSliderMarchB';
          break;
        case('Dynamic Compressor: March C'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderMarchC';
          kneeSlider.className = 'dynamicCompressorVerticalSliderMarchC';
          ratioSlider.className = 'dynamicCompressorVerticalSliderMarchC';
          attackSlider.className = 'dynamicCompressorVerticalSliderMarchC';
          releaseSlider.className = 'dynamicCompressorVerticalSliderMarchC';
          break;
        case('Dynamic Compressor: April A'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderAprilA';
          kneeSlider.className = 'dynamicCompressorVerticalSliderAprilA';
          ratioSlider.className = 'dynamicCompressorVerticalSliderAprilA';
          attackSlider.className = 'dynamicCompressorVerticalSliderAprilA';
          releaseSlider.className = 'dynamicCompressorVerticalSliderAprilA';
          break;
        case('Dynamic Compressor: April B'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderAprilB';
          kneeSlider.className = 'dynamicCompressorVerticalSliderAprilB';
          ratioSlider.className = 'dynamicCompressorVerticalSliderAprilB';
          attackSlider.className = 'dynamicCompressorVerticalSliderAprilB';
          releaseSlider.className = 'dynamicCompressorVerticalSliderAprilB';
          break;
        case('Dynamic Compressor: April C'):
          thresholdSlider.className = 'dynamicCompressorVerticalSliderAprilC';
          kneeSlider.className = 'dynamicCompressorVerticalSliderAprilC';
          ratioSlider.className = 'dynamicCompressorVerticalSliderAprilC';
          attackSlider.className = 'dynamicCompressorVerticalSliderAprilC';
          releaseSlider.className = 'dynamicCompressorVerticalSliderAprilC';
          break;
        default:
          console.log('unsupported dynamic compressor skin');
      }
      thresholdModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -55px; left: 155px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      thresholdModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; top: -140px; left: 262px;");
      kneeDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      kneeDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; top: 5px; left: 10px;");
      kneeLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -45px; left: 165px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      kneeSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", -2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", -3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", -4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 24px; width: 240px; position: relative; top: -45px; left: 10px;");
      kneeModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -55px; left: 155px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      kneeModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; top: -140px; left: 262px;");
      ratioDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      ratioDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; top: 5px; left: 10px;");
      ratioLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -45px; left: 165px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      ratioSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", -2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", -3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", -4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 24px; width: 240px; position: relative; top: -45px; left: 10px;");
      ratioModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -55px; left: 155px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      ratioModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; top: -140px; left: 262px;");
      attackDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      attackDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; top: 5px; left: 10px;");
      attackLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -45px; left: 165px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      attackSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", -2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", -3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", -4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 24px; width: 240px; position: relative; top: -45px; left: 10px;");
      attackModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -55px; left: 155px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      attackModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; top: -140px; left: 262px;");
      releaseDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6.24) + "px;");
      releaseDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.thresholdDisplaySize + "; box-shadow: -1px -1px 1px " + this.thresholdDisplayBoxShadowColor + ", -2px -2px 1px " + this.thresholdDisplayBoxShadowColor + ", -3px -3px 1px " + this.thresholdDisplayBoxShadowColor + ", -4px -4px 1px " + this.thresholdDisplayBoxShadowColor + "; position: relative; top: 5px; left: 10px;");
      releaseLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -45px; left: 165px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      releaseSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.thresholdSliderPath + "); background-size: " + this.thresholdSliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.thresholdSliderBoxShadowColor + ", -2px -2px 1px " + this.thresholdSliderBoxShadowColor + ", -3px -3px 1px " + this.thresholdSliderBoxShadowColor + ", -4px -4px 1px " + this.thresholdSliderBoxShadowColor + "; height: 24px; width: 240px; position: relative; top: -45px; left: 10px;");
      releaseModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; top: -55px; left: 155px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadow + ", -2px -2px 1px " + this.faceFontShadow + ";");
      releaseModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; top: -140px; left: 262px;");

      this.manageThrehold(thresholdDisplay, thresholdSlider);

      this.manageKnee(kneeDisplay, kneeSlider);

      this.manageRatio(ratioDisplay, ratioSlider);

      this.manageAttack(attackDisplay, attackSlider);

      this.manageRelease(releaseDisplay, releaseSlider);

      inputPort.addEventListener('click', () => {
        alert(inputPort.id);
      });

      outputPort.addEventListener('click', () => {
        alert(outputPort.id);
      });

      thresholdModulatorInput.addEventListener('click', () => {
        alert(thresholdModulatorInput.id);
      });

      kneeModulatorInput.addEventListener('click', () => {
        alert(kneeModulatorInput.id);
      });

      ratioModulatorInput.addEventListener('click', () => {
        alert(ratioModulatorInput.id);
      });

      attackModulatorInput.addEventListener('click', () => {
        alert(attackModulatorInput.id);
      });

      releaseModulatorInput.addEventListener('click', () => {
        alert(releaseModulatorInput.id);
      });

      return(div);
    }

  }

  return(dynamicCompressorNode);
})();

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

var LowpassFilter = (function(settings, skin, audioContext) {

  let lowpassFilter = function(settings, skin, audioContext) {
    this.id = settings.id;
    this.name = settings.name;
    this.positionX = settings.positionX,
    this.positionY = settings.positionY,
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

    this.skinName = skin.name;
    this.month = skin.month;
    this.rule = skin.rule;
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
    this.inputSize = skin.input_size;
    this.inputRepeat = skin.input_repeat;
    this.inputBoxShadowColor = skin.input_box_shadow_color;
    this.inputFontColor = skin.input_font_color;
    this.inputFontShadowColor = skin.input_font_shadow_color;
    this.outputSize = skin.output_size;
    this.outputRepeat = skin.output_repeat;
    this.outputBoxShadowColor = skin.output_box_shadow_color;
    this.outputFontColor = skin.output_font_color;
    this.outputFontShadowColor = skin.output_font_shadow_color;
    this.frequencyDisplaySize = skin.frequency_display_size;
    this.frequencyDisplayRepeat = skin.frequency_display_repeat;
    this.frequencyDisplayBoxShadowColor = skin.frequency_display_box_shadow_color;
    this.frequencyDisplayFontColor = skin.frequency_display_font_color;
    this.detuneSize = skin.detune_size;
    this.detuneRepeat = skin.detune_repeat;
    this.detuneBoxShadowColor = skin.detune_box_shadow_color;
    this.detuneFontColor = skin.detune_font_color;
    this.qSize = skin.q_size;
    this.qRepeat = skin.q_repeat;
    this.qBoxShadowColor = skin.q_box_shadow_color;
    this.qFontColor = skin.q_font_color;
    this.modSelectSize = skin.mod_select_size;
    this.modRepeatValue = skin.mod_repeat_value;
    this.sliderSize = skin.slider_size;
    this.slideRepeatValue = skin.slide_repeat_value;
    this.sliderShaderColor1 = skin.slider_shader_color_1;
    this.sliderShaderColor2 = skin.slider_shader_color_2;

    this.dragWidth = 790;
    this.dragHeight = 458;
    this.horizontalWidth = 900;
    this.horizontalHeight = 162;
    this.verticalWidth = 162;
    this.verticalHeight = 750;

    // Functionality

    this.manageFrequency = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.frequency = display.value;
        this.lowpassFilter.frequency.value = (this.frequency);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.frequency = slider.value;
        this.lowpassFilter.frequency.value = (this.frequency);
      });
    }

    this.manageDetune = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.detune = display.value;
        this.lowpassFilter.detune.value = (this.detune);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.detune = slider.value;
        this.lowpassFilter.detune.value = (this.detune);
      });
    }

    this.manageQ = (display, slider) => {

      slider.addEventListener('mousemove', (e) => {
        e.stopPropagation();
        display.value = slider.value;
        this.q = display.value;
        this.lowpassFilter.Q.value = (this.q);
      });

      display.addEventListener('change', (e) => {
        e.stopPropagation();
        slider.value = display.value;
        this.q = slider.value;
        this.lowpassFilter.Q.value = (this.q);
      });
    }

    // Rendering Functions

    this.renderDraggable = () => {

      let div = document.createElement('div');
      let lowpassFilterTop = document.createElement('div');
      div.appendChild(lowpassFilterTop);
      let nameTag = document.createElement('h1');
      lowpassFilterTop.appendChild(nameTag);
      let signalPanel = document.createElement('div');
      div.appendChild(signalPanel);
      let inputLabel = document.createElement('p');
      signalPanel.appendChild(inputLabel);
      inputLabel.innerHTML = 'in';
      let inputPort = document.createElement('h1');
      signalPanel.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input ' + this.name + this.id;
      let outputLabel = document.createElement('p');
      signalPanel.appendChild(outputLabel);
      outputLabel.innerHTML = 'out';
      let outputPort = document.createElement('h1');
      signalPanel.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let face = document.createElement('div');
      div.appendChild(face);
      let frequencyDiv = document.createElement('div');
      face.appendChild(frequencyDiv);
      let frequencyLabel = document.createElement('p');
      frequencyDiv.appendChild(frequencyLabel);
      frequencyLabel.innerHTML = 'frequency(Hz)';
      let lowpassFilterFrequencyDisplay = document.createElement('input');
      frequencyDiv.appendChild(lowpassFilterFrequencyDisplay);
      lowpassFilterFrequencyDisplay.type = 'number';
      lowpassFilterFrequencyDisplay.step = '0.001';
      lowpassFilterFrequencyDisplay.min = '0.000';
      lowpassFilterFrequencyDisplay.max = '22050.000';
      lowpassFilterFrequencyDisplay.value = this.frequency;
      let frequencySlider = document.createElement('input');
      frequencyDiv.appendChild(frequencySlider);
      frequencySlider.type = 'range';
      frequencySlider.step = '0.001';
      frequencySlider.min = '0.000';
      frequencySlider.max = '22050.000';
      frequencySlider.value = this.frequency;
      let frequencyModulatorLabel = document.createElement('p');
      frequencyDiv.appendChild(frequencyModulatorLabel);
      frequencyModulatorLabel.innerHTML = 'modulation';
      let frequencyModulatorInput = document.createElement('h1');
      frequencyDiv.appendChild(frequencyModulatorInput);
      frequencyModulatorInput.innerHTML = '◦';
      frequencyModulatorInput.id = 'frequency modulator input - ' + this.name + this.id;
      let detuneDiv = document.createElement('div');
      face.appendChild(detuneDiv);
      let detuneLabel = document.createElement('p');
      detuneDiv.appendChild(detuneLabel);
      detuneLabel.innerHTML = 'detune';
      let lowpassFilterDetuneDisplay = document.createElement('input');
      detuneDiv.appendChild(lowpassFilterDetuneDisplay);
      lowpassFilterDetuneDisplay.type = 'number';
      lowpassFilterDetuneDisplay.step = '0.01';
      lowpassFilterDetuneDisplay.min = '-100.00';
      lowpassFilterDetuneDisplay.max = '100.00';
      lowpassFilterDetuneDisplay.value = this.detune;
      let detuneSlider = document.createElement('input');
      detuneDiv.appendChild(detuneSlider);
      detuneSlider.type = 'range';
      detuneSlider.step = '0.01';
      detuneSlider.min = '-100.00';
      detuneSlider.max = '100.00';
      detuneSlider.value = this.detune;
      let detuneModulatorLabel = document.createElement('p');
      detuneDiv.appendChild(detuneModulatorLabel);
      detuneModulatorLabel.innerHTML = 'modulation';
      let detuneModulatorInput = document.createElement('h1');
      detuneDiv.appendChild(detuneModulatorInput);
      detuneModulatorInput.innerHTML = '◦';
      detuneModulatorInput.id = 'detune modulator input - ' + this.name + this.id;
      let qDiv = document.createElement('div');
      face.appendChild(qDiv);
      let qLabel = document.createElement('p');
      qDiv.appendChild(qLabel);
      qLabel.innerHTML = 'Q';
      let lowpassFilterQDisplay = document.createElement('input');
      qDiv.appendChild(lowpassFilterQDisplay);
      lowpassFilterQDisplay.type = 'number';
      lowpassFilterQDisplay.step = '0.0001';
      lowpassFilterQDisplay.min = '0.0001';
      lowpassFilterQDisplay.max = '1000.0000';
      lowpassFilterQDisplay.value = this.q;
      let qSlider = document.createElement('input');
      qDiv.appendChild(qSlider);
      qSlider.type = 'range';
      qSlider.step = '0.0001';
      qSlider.min = '0.0001';
      qSlider.max = '1000.0000';
      qSlider.value = this.q;
      let qModulatorLabel = document.createElement('p');
      qDiv.appendChild(qModulatorLabel);
      qModulatorLabel.innerHTML = 'modulation';
      let qModulatorInput = document.createElement('h1');
      qDiv.appendChild(qModulatorInput);
      qModulatorInput.innerHTML = '◦';
      qModulatorInput.id = 'q modulator input - ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.dragWidth + "px; height: " + this.dragHeight + "px; background: transparent; position: absolute; left: " + this.positionX + "px; top: " + this.positionY + "px; transform: scale(0.5);");
      lowpassFilterTop.setAttribute("style", "width: 100%; background: url(" + this.topPath + "); background-size: " + this.topSize + "; font-family: 'Righteous', cursive; height: 60px; webkit-transform: skew(45deg, 0deg); transform: skew(45deg, 0deg); margin-top: -30px; margin-left: 25px; cursor: move; background-repeat: " + this.topRepeat + ";");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 40px; margin-left: 2em; margin-top: 6em; color: " + this.topFontColor + "; font-weight: 600; text-shadow: 1px 1px 1px " + this.topFontShadowColor + ", 2px 2px 1px " + this.topFontShadowColor + ";");
      signalPanel.setAttribute("style", "background: url(" + this.signalPath + "); background-size: " + this.signalSize + "; border: solid 1px transparent; height: " + this.dragHeight + "px; width: 59px; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 45deg); margin-left: -6px; margin-top: -26px; box-shadow: 0px -1px 1px " + this.signalFontShadowColor + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 15px; margin-top: 58px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 36px; margin-left: 2px; margin-top: 58px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + ";");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 7px; margin-top: 15px; width: 70%; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px;");
      face.setAttribute("style", "height: " + this.dragHeight + "px; width: 100%; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: " + this.faceRepeat + "; margin-top: -428px; margin-left: 59px; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ";");
      frequencyDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/3) + "px; height: " + this.dragHeight + "px; background: transparent;");
      frequencyLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      lowpassFilterFrequencyDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      frequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", 2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", 3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", 4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; height: 24px; width: 400px; margin: 145px 25px 0 25px;");
      switch(this.skinName) {
        case('Lowpass Filter: January A'):
          frequencySlider.className = 'lowpassFilterSliderJanuaryA';
          detuneSlider.className = 'lowpassFilterSliderJanuaryA';
          qSlider.className = 'lowpassFilterSliderJanuaryA';
          break;
        case('Lowpass Filter: January B'):
          frequencySlider.className = 'lowpassFilterSliderJanuaryB';
          detuneSlider.className = 'lowpassFilterSliderJanuaryB';
          qSlider.className = 'lowpassFilterSliderJanuaryB';
          break;
        case('Lowpass Filter: January C'):
          frequencySlider.className = 'lowpassFilterSliderJanuaryC';
          detuneSlider.className = 'lowpassFilterSliderJanuaryC';
          qSlider.className = 'lowpassFilterSliderJanuaryC';
          break;
        case('Lowpass Filter: February A'):
          frequencySlider.className = 'lowpassFilterSliderFebruaryA';
          detuneSlider.className = 'lowpassFilterSliderFebruaryA';
          qSlider.className = 'lowpassFilterSliderFebruaryA';
          break;
        case('Lowpass Filter: February B'):
          frequencySlider.className = 'lowpassFilterSliderFebruaryB';
          detuneSlider.className = 'lowpassFilterSliderFebruaryB';
          qSlider.className = 'lowpassFilterSliderFebruaryB';
          break;
        case('Lowpass Filter: February C'):
          frequencySlider.className = 'lowpassFilterSliderFebruaryC';
          detuneSlider.className = 'lowpassFilterSliderFebruaryC';
          qSlider.className = 'lowpassFilterSliderFebruaryC';
          break;
        case('Lowpass Filter: March A'):
          frequencySlider.className = 'lowpassFilterSliderMarchA';
          detuneSlider.className = 'lowpassFilterSliderMarchA';
          qSlider.className = 'lowpassFilterSliderMarchA';
          break;
        case('Lowpass Filter: March B'):
          frequencySlider.className = 'lowpassFilterSliderMarchB';
          detuneSlider.className = 'lowpassFilterSliderMarchB';
          qSlider.className = 'lowpassFilterSliderMarchB';
          break;
        case('Lowpass Filter: March C'):
          frequencySlider.className = 'lowpassFilterSliderMarchC';
          detuneSlider.className = 'lowpassFilterSliderMarchC';
          qSlider.className = 'lowpassFilterSliderMarchC';
          break;
        case('Lowpass Filter: April A'):
          frequencySlider.className = 'lowpassFilterSliderAprilA';
          detuneSlider.className = 'lowpassFilterSliderAprilA';
          qSlider.className = 'lowpassFilterSliderAprilA';
          break;
        case('Lowpass Filter: April B'):
          frequencySlider.className = 'lowpassFilterSliderAprilB';
          detuneSlider.className = 'lowpassFilterSliderAprilB';
          qSlider.className = 'lowpassFilterSliderAprilB';
          break;
        case('Lowpass Filter: April C'):
          frequencySlider.className = 'lowpassFilterSliderAprilC';
          detuneSlider.className = 'lowpassFilterSliderAprilC';
          qSlider.className = 'lowpassFilterSliderAprilC';
          break;
        default:
          console.log('unsupported dynamic compressor skin');
      }
      frequencyModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      frequencyModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      detuneDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/3) + "px; height: " + this.dragHeight + "px; background: transparent;");
      detuneLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      lowpassFilterDetuneDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.displayPath + "); background-size: " + this.displaySize + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      detuneSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.detuneBoxShadowColor + ", 2px -2px 1px " + this.detuneBoxShadowColor + ", 3px -3px 1px " + this.detuneBoxShadowColor + ", 4px -4px 1px " + this.detuneBoxShadowColor + "; height: 24px; width: 400px; margin: 145px 25px 0 25px;");
      detuneModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      detuneModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");
      qDiv.setAttribute("style", "float: left; width: " + (this.dragWidth/3) + "px; height: " + this.dragHeight + "px; background: transparent;");
      qLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      lowpassFilterQDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 30px; background: url(" + this.displayPath + "); background-size: " + this.qSize + "; box-shadow: -1px -1px 1px " + this.qBoxShadowColor + ", -2px -2px 1px " + this.qBoxShadowColor + ", -3px -3px 1px " + this.qBoxShadowColor + ", -4px -4px 1px " + this.qBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      qSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg); transform: rotateZ(-90deg); background: url(" + this.displayPath + "); background-size: " + this.qSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.qBoxShadowColor + ", 2px -2px 1px " + this.qBoxShadowColor + ", 3px -3px 1px " + this.qBoxShadowColor + ", 4px -4px 1px " + this.qBoxShadowColor + "; height: 24px; width: 400px; margin: 145px 25px 0 25px;");
      qModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 24px; margin: 5px 0 3px 25px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      qModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin: 10px 0 0 55px; width: 50px; height: 65px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 15px;");

      this.manageFrequency(lowpassFilterFrequencyDisplay, frequencySlider);

      this.manageDetune(lowpassFilterDetuneDisplay, detuneSlider);

      this.manageQ(lowpassFilterQDisplay, qSlider);

      function dragElement(element, obj) {

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (lowpassFilterTop) {
          lowpassFilterTop.onmousedown = dragMouseDown;
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

      inputPort.addEventListener('click', () => {
        alert(inputPort.id);
      });

      frequencyModulatorInput.addEventListener('click', () => {
        alert(frequencyModulatorInput.id);
      });

      detuneModulatorInput.addEventListener('click', () => {
        alert(detuneModulatorInput.id);
      });

      qModulatorInput.addEventListener('click', () => {
        alert(qModulatorInput.id);
      });

      return(div);
    }

    this.renderRackHorizontal = (x, y) => {
    //
      let div = document.createElement('div');
      let nameAndOutputDiv = document.createElement('div');
      div.appendChild(nameAndOutputDiv);
      let nameTag = document.createElement('h1');
      nameAndOutputDiv.appendChild(nameTag);
      let inputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      let inputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input ' + this.name + this.id;
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let frequencyDiv = document.createElement('div');
      div.appendChild(frequencyDiv);
      let frequencyLabel = document.createElement('p');
      frequencyDiv.appendChild(frequencyLabel);
      frequencyLabel.innerHTML = 'frequency(Hz)';
      let frequencyDisplay = document.createElement('input');
      frequencyDiv.appendChild(frequencyDisplay);
      frequencyDisplay.type = 'number';
      frequencyDisplay.step = '0.001';
      frequencyDisplay.min = '0.000';
      frequencyDisplay.max = '22050.00';
      frequencyDisplay.value = this.frequency;
      let frequencySlider = document.createElement('input');
      frequencyDiv.appendChild(frequencySlider);
      frequencySlider.type = 'range';
      frequencySlider.step = '0.001';
      frequencySlider.min = '0.000';
      frequencySlider.max = '22050.00';
      frequencySlider.value = this.frequency;
      let frequencyModulatorLabel = document.createElement('p');
      frequencyDiv.appendChild(frequencyModulatorLabel);
      frequencyModulatorLabel.innerHTML = 'modulation';
      let frequencyModulatorInput = document.createElement('h1');
      frequencyDiv.appendChild(frequencyModulatorInput);
      frequencyModulatorInput.innerHTML = '◦';
      frequencyModulatorInput.id = 'frequency modulator input - ' + this.name + this.id;
      let detuneDiv = document.createElement('div');
      div.appendChild(detuneDiv);
      let detuneLabel = document.createElement('p');
      detuneDiv.appendChild(detuneLabel);
      detuneLabel.innerHTML = 'detune';
      let detuneDisplay = document.createElement('input');
      detuneDiv.appendChild(detuneDisplay);
      detuneDisplay.type = 'number';
      detuneDisplay.step = '0.01';
      detuneDisplay.max = '100.00';
      detuneDisplay.min = '-100.00';
      detuneDisplay.value = this.detune;
      let detuneSlider = document.createElement('input');
      detuneDiv.appendChild(detuneSlider);
      detuneSlider.type = 'range';
      detuneSlider.step = '0.01';
      detuneSlider.max = '100.00';
      detuneSlider.min = '-100.00';
      detuneSlider.value = this.detune;
      let detuneModulatorLabel = document.createElement('p');
      detuneDiv.appendChild(detuneModulatorLabel);
      detuneModulatorLabel.innerHTML = 'modulation';
      let detuneModulatorInput = document.createElement('h1');
      detuneDiv.appendChild(detuneModulatorInput);
      detuneModulatorInput.innerHTML = '◦';
      detuneModulatorInput.id = 'detune modulator input - ' + this.name + this.id;
      let qDiv = document.createElement('div');
      div.appendChild(qDiv);
      let qLabel = document.createElement('p');
      qDiv.appendChild(qLabel);
      qLabel.innerHTML = 'Q';
      let qDisplay = document.createElement('input');
      qDiv.appendChild(qDisplay);
      qDisplay.type = 'number';
      qDisplay.step = '0.0001';
      qDisplay.max = '1000.0000';
      qDisplay.min = '0.0001';
      qDisplay.value = this.q;
      let qSlider = document.createElement('input');
      qDiv.appendChild(qSlider);
      qSlider.type = 'range';
      qSlider.step = '0.0001';
      qSlider.max = '1000.0000';
      qSlider.min = '0.0001';
      qSlider.value = this.q;
      let qModulatorLabel = document.createElement('p');
      qDiv.appendChild(qModulatorLabel);
      qModulatorLabel.innerHTML = 'modulation';
      let qModulatorInput = document.createElement('h1');
      qDiv.appendChild(qModulatorInput);
      qModulatorInput.innerHTML = '◦';
      qModulatorInput.id = 'q modulator input - ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.horizontalWidth + "px; height: " + this.horizontalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + this.faceSize + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + (this.horizontalWidth/5) + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px;");
      nameTag.innerHTML = this.name;
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 5px; margin-top: 0; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.topFontShadowColor + ", -2px -2px 1px " + this.topFontShadowColor + ";");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 10px; margin-top: 1px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + ";");
      inputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 15px; margin-top: -15px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px;");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; margin-left: 4px; margin-top: 1px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + "; transform: translateX(90px) translateY(-130px);");
      outputPort.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 48px; margin-left: 1px; margin-top: 1px; width: 40px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; transform: translateX(110px) translateY(-145px);");
      frequencyDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 4)/15) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px; background: transparent;");
      frequencyLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      frequencyDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      frequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; height: 18px; width: 220px; position: relative; margin: 50px 0 0 10px;");
      switch(this.skinName) {
        case('Lowpass Filter: January A'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderJanuaryA';
          detuneSlider.className = 'lowpassFilterHorizontalSliderJanuaryA';
          qSlider.className = 'lowpassFilterHorizontalSliderJanuaryA';
          break;
        case('Lowpass Filter: January B'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderJanuaryB';
          detuneSlider.className = 'lowpassFilterHorizontalSliderJanuaryB';
          qSlider.className = 'lowpassFilterHorizontalSliderJanuaryB';
          break;
        case('Lowpass Filter: January C'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderJanuaryC';
          detuneSlider.className = 'lowpassFilterHorizontalSliderJanuaryC';
          qSlider.className = 'lowpassFilterHorizontalSliderJanuaryC';
          break;
        case('Lowpass Filter: February A'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderFebruaryA';
          detuneSlider.className = 'lowpassFilterHorizontalSliderFebruaryA';
          qSlider.className = 'lowpassFilterHorizontalSliderFebruaryA';
          break;
        case('Lowpass Filter: February B'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderFebruaryB';
          detuneSlider.className = 'lowpassFilterHorizontalSliderFebruaryB';
          qSlider.className = 'lowpassFilterHorizontalSliderFebruaryB';
          break;
        case('Lowpass Filter: February C'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderFebruaryC';
          detuneSlider.className = 'lowpassFilterHorizontalSliderFebruaryC';
          qSlider.className = 'lowpassFilterHorizontalSliderFebruaryC';
          break;
        case('Lowpass Filter: March A'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderMarchA';
          detuneSlider.className = 'lowpassFilterHorizontalSliderMarchA';
          qSlider.className = 'lowpassFilterHorizontalSliderMarchA';
          break;
        case('Lowpass Filter: March B'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderMarchB';
          detuneSlider.className = 'lowpassFilterHorizontalSliderMarchB';
          qSlider.className = 'lowpassFilterHorizontalSliderMarchB';
          break;
        case('Lowpass Filter: March C'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderMarchC';
          detuneSlider.className = 'lowpassFilterHorizontalSliderMarchC';
          qSlider.className = 'lowpassFilterHorizontalSliderMarchC';
          break;
        case('Lowpass Filter: April A'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderAprilA';
          detuneSlider.className = 'lowpassFilterHorizontalSliderAprilA';
          qSlider.className = 'lowpassFilterHorizontalSliderAprilA';
          break;
        case('Lowpass Filter: April B'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderAprilB';
          detuneSlider.className = 'lowpassFilterHorizontalSliderAprilB';
          qSlider.className = 'lowpassFilterHorizontalSliderAprilB';
          break;
        case('Lowpass Filter: April C'):
          frequencySlider.className = 'lowpassFilterHorizontalSliderAprilC';
          detuneSlider.className = 'lowpassFilterHorizontalSliderAprilC';
          qSlider.className = 'lowpassFilterHorizontalSliderAprilC';
          break;
        default:
          console.log('unsupported dynamic compressor skin');
      }
      frequencyModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(140px) translateY(-90px);");
      frequencyModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px; position: relative; transform: translateX(180px) translateY(-190px);");
      detuneDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 4)/15) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px; background: transparent;");
      detuneLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      detuneDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      detuneSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; height: 18px; width: 220px; position: relative; margin: 50px 0 0 10px;");
      detuneModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(140px) translateY(-90px);");
      detuneModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px; position: relative; transform: translateX(180px) translateY(-190px);");
      qDiv.setAttribute("style", "float: left; width: " + ((this.horizontalWidth * 4)/15) + "px; margin: 0; padding-top: 5px; height: " + (this.horizontalHeight - 5) + "px; background: transparent;");
      qLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; margin: 5px 0 3px 5px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + ";");
      qDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; position: relative; margin: 5px 0 0 10px;");
      qSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: -1px -1px 1px " + this.frequencyDisplayBoxShadowColor + ", -2px -2px 1px " + this.frequencyDisplayBoxShadowColor + ", -3px -3px 1px " + this.frequencyDisplayBoxShadowColor + ", -4px -4px 1px " + this.frequencyDisplayBoxShadowColor + "; height: 18px; width: 220px; position: relative; margin: 50px 0 0 10px;");
      qModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(140px) translateY(-90px);");
      qModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; width: 35px; height: 45px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 5px; position: relative; transform: translateX(180px) translateY(-190px);");

      this.manageFrequency(frequencyDisplay, frequencySlider);

      this.manageDetune(detuneDisplay, detuneSlider);

      this.manageQ(qDisplay, qSlider);

      frequencyModulatorInput.addEventListener('click', () => {
        alert(frequencyModulatorInput.id);
      });

      qModulatorInput.addEventListener('click', () => {
        alert(qModulatorInput.id);
      });

      detuneModulatorInput.addEventListener('click', () => {
        alert(detuneModulatorInput.id);
      });

      outputPort.addEventListener('click', () => {
        alert(outputPort.id);
      });

      inputPort.addEventListener('click', () => {
        alert(inputPort.id);
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
      let inputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(inputLabel);
      inputLabel.innerHTML = 'input';
      let inputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(inputPort);
      inputPort.innerHTML = '◦';
      inputPort.id = 'input ' + this.name + this.id;
      let outputLabel = document.createElement('p');
      nameAndOutputDiv.appendChild(outputLabel);
      outputLabel.innerHTML = 'output';
      let outputPort = document.createElement('h1');
      nameAndOutputDiv.appendChild(outputPort);
      outputPort.innerHTML = '◦';
      outputPort.id = 'output ' + this.name + this.id;
      let frequencyDiv = document.createElement('div');
      div.appendChild(frequencyDiv);
      let frequencyLabel = document.createElement('p');
        frequencyDiv.appendChild(frequencyLabel);
        frequencyLabel.innerHTML = 'frequency(Hz)';
      let frequencyDisplay = document.createElement('input');
      frequencyDiv.appendChild(frequencyDisplay);
      frequencyDisplay.type = 'number';
      frequencyDisplay.step = '0.001';
      frequencyDisplay.max = '22050.000';
      frequencyDisplay.min = '0.000';
      frequencyDisplay.value = this.frequency;
      let frequencySlider = document.createElement('input');
      frequencyDiv.appendChild(frequencySlider);
      frequencySlider.type = 'range';
      frequencySlider.step = '0.001';
      frequencySlider.max = '22050.000';
      frequencySlider.min = '0.000';
      frequencySlider.value = this.frequency;
      let frequencyModulatorLabel = document.createElement('p');
      frequencyDiv.appendChild(frequencyModulatorLabel);
      frequencyModulatorLabel.innerHTML = 'modulation:';
      let frequencyModulatorInput = document.createElement('h1');
      frequencyDiv.appendChild(frequencyModulatorInput);
      frequencyModulatorInput.innerHTML = '◦';
      frequencyModulatorInput.id = 'Frequency Modulation Input ' + this.name + this.id;
      let detuneDiv = document.createElement('div');
      div.appendChild(detuneDiv);
      let detuneLabel = document.createElement('p');
      detuneDiv.appendChild(detuneLabel);
      detuneLabel.innerHTML = 'detune';
      let detuneDisplay = document.createElement('input');
      detuneDiv.appendChild(detuneDisplay);
      detuneDisplay.type = 'number';
      detuneDisplay.step = '0.01';
      detuneDisplay.max = '100.00';
      detuneDisplay.min = '-100.00';
      detuneDisplay.value = this.detune;
      let detuneSlider = document.createElement('input');
      detuneDiv.appendChild(detuneSlider);
      detuneSlider.type = 'range';
      detuneSlider.step = '0.01';
      detuneSlider.max = '100.00';
      detuneSlider.min = '-100.00';
      detuneSlider.value = this.detune;
      let detuneModulatorLabel = document.createElement('p');
      detuneDiv.appendChild(detuneModulatorLabel);
      detuneModulatorLabel.innerHTML = 'modulation:';
      let detuneModulatorInput = document.createElement('h1');
      detuneDiv.appendChild(detuneModulatorInput);
      detuneModulatorInput.innerHTML = '◦';
      detuneModulatorInput.id = 'Detune Modulation Input ' + this.name + this.id;
      let qDiv = document.createElement('div');
      div.appendChild(qDiv);
      let qLabel = document.createElement('p');
      qDiv.appendChild(qLabel);
      qLabel.innerHTML = 'Q';
      let qDisplay = document.createElement('input');
      qDiv.appendChild(qDisplay);
      qDisplay.type = 'number';
      qDisplay.step = '0.0001';
      qDisplay.max = '1000.0000';
      qDisplay.min = '0.0001';
      qDisplay.value = this.q;
      let qSlider = document.createElement('input');
      qDiv.appendChild(qSlider);
      qSlider.type = 'range';
      qSlider.step = '0.0001';
      qSlider.max = '1000.0000';
      qSlider.min = '0.0001';
      qSlider.value = this.q;
      let qModulatorLabel = document.createElement('p');
      qDiv.appendChild(qModulatorLabel);
      qModulatorLabel.innerHTML = 'modulation:';
      let qModulatorInput = document.createElement('h1');
      qDiv.appendChild(qModulatorInput);
      qModulatorInput.innerHTML = '◦';
      qModulatorInput.id = 'Q Modulation Input ' + this.name + this.id;

      div.setAttribute("style", "width: " + this.verticalWidth + "px; height: " + this.verticalHeight + "px; background: #ffffff; position: absolute; left: " + x + "px; top: " + y + "px; background: url(" + this.facePath + "); background-size: " + (this.faceSize * 5) + "; background-repeat: repeat; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + ";");
      nameAndOutputDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; background: url(" + this.topPath + "); background-size: " + this.topSize + "; background-repeat: repeat; margin: 0; padding-top: 5px; height: " + (this.verticalHeight/6) + "px;");
      nameTag.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; color: " + this.topFontColor + "; font-weight: 600; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; position: relative; top: -20px; left: 2px;");
      inputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + "; transform: translateX(10px) translateY(-35px);");
      inputPort.setAttribute("style", "z-index: 6; cursor: pointer; font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; padding-left: 10px; position: relative; transform: translateX(9px) translateY(-55px);");
      outputLabel.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 18px; color: " + this.signalFontColor + "; text-shadow: -1px -1px 1px " + this.signalFontShadowColor + ", -2px -2px 1px " + this.signalFontShadowColor + "; position: relative; transform: translateX(85px) translateY(-163px);");
      outputPort.setAttribute("style", "z-index: 6; cursor: pointer; font-family: 'Righteous', cursive; font-size: 42px; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; padding-left: 10px; position: relative; transform: translateX(95px) translateY(-183px);");
      frequencyDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + ((this.verticalHeight * 4.9)/18) + "px; background: transparent;");
      frequencyLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-20px);");
      frequencyDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; position: relative; transform: translateX(8px) translateY(-30px);");
      frequencySlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg) translateX(-32px) translateY(80px); transform: rotateZ(-90deg) translateX(-32px) translateY(80px); background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", 2px -2px 1px " + this.faceBoxShadowColor + ", 3px -3px 1px " + this.faceBoxShadowColor + ", 4px -4px 1px " + this.faceBoxShadowColor + "; height: 16px; width: 130px; position: relative;");
      switch(this.skinName) {
        case('Lowpass Filter: January A'):
          frequencySlider.className = 'lowpassFilterSliderVerticalJanuaryA';
          detuneSlider.className = 'lowpassFilterSliderVerticalJanuaryA';
          qSlider.className = 'lowpassFilterSliderVerticalJanuaryA';
          break;
        case('Lowpass Filter: January B'):
          frequencySlider.className = 'lowpassFilterSliderVerticalJanuaryB';
          detuneSlider.className = 'lowpassFilterSliderVerticalJanuaryB';
          qSlider.className = 'lowpassFilterSliderVerticalJanuaryB';
          break;
        case('Lowpass Filter: January C'):
          frequencySlider.className = 'lowpassFilterSliderVerticalJanuaryC';
          detuneSlider.className = 'lowpassFilterSliderVerticalJanuaryC';
          qSlider.className = 'lowpassFilterSliderVerticalJanuaryC';
          break;
        case('Lowpass Filter: February A'):
          frequencySlider.className = 'lowpassFilterVerticalSliderFebruaryA';
          detuneSlider.className = 'lowpassFilterVerticalSliderFebruaryA';
          qSlider.className = 'lowpassFilterVerticalSliderFebruaryA';
          break;
        case('Lowpass Filter: February B'):
          frequencySlider.className = 'lowpassFilterVerticalSliderFebruaryB';
          detuneSlider.className = 'lowpassFilterVerticalSliderFebruaryB';
          qSlider.className = 'lowpassFilterVerticalSliderFebruaryB';
          break;
        case('Lowpass Filter: February C'):
          frequencySlider.className = 'lowpassFilterVerticalSliderFebruaryC';
          detuneSlider.className = 'lowpassFilterVerticalSliderFebruaryC';
          qSlider.className = 'lowpassFilterVerticalSliderFebruaryC';
          break;
        case('Lowpass Filter: March A'):
          frequencySlider.className = 'lowpassFilterVerticalSliderMarchA';
          detuneSlider.className = 'lowpassFilterVerticalSliderMarchA';
          qSlider.className = 'lowpassFilterVerticalSliderMarchA';
          break;
        case('Lowpass Filter: March B'):
          frequencySlider.className = 'lowpassFilterVerticalSliderMarchB';
          detuneSlider.className = 'lowpassFilterVerticalSliderMarchB';
          qSlider.className = 'lowpassFilterVerticalSliderMarchB';
          break;
        case('Lowpass Filter: March C'):
          frequencySlider.className = 'lowpassFilterVerticalSliderMarchC';
          detuneSlider.className = 'lowpassFilterVerticalSliderMarchC';
          qSlider.className = 'lowpassFilterVerticalSliderMarchC';
          break;
        case('Lowpass Filter: April A'):
          frequencySlider.className = 'lowpassFilterVerticalSliderAprilA';
          detuneSlider.className = 'lowpassFilterVerticalSliderAprilA';
          qSlider.className = 'lowpassFilterVerticalSliderAprilA';
          break;
        case('Lowpass Filter: April B'):
          frequencySlider.className = 'lowpassFilterVerticalSliderAprilB';
          detuneSlider.className = 'lowpassFilterVerticalSliderAprilB';
          qSlider.className = 'lowpassFilterVerticalSliderAprilB';
          break;
        case('Lowpass Filter: April C'):
          frequencySlider.className = 'lowpassFilterVerticalSliderAprilC';
          detuneSlider.className = 'lowpassFilterVerticalSliderAprilC';
          qSlider.className = 'lowpassFilterVerticalSliderAprilC';
          break;
        default:
          console.log('unsupported dynamic compressor skin');
      }
      frequencyModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-50px);");
      frequencyModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; transform: translateX(35px) translateY(-70px);");
      detuneDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + ((this.verticalHeight * 4.8)/18) + "px; background: transparent;");
      detuneLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-20px);");
      detuneDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; position: relative; transform: translateX(8px) translateY(-30px);");
      detuneSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg) translateX(-32px) translateY(80px); transform: rotateZ(-90deg) translateX(-32px) translateY(80px); background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", 2px -2px 1px " + this.faceBoxShadowColor + ", 3px -3px 1px " + this.faceBoxShadowColor + ", 4px -4px 1px " + this.faceBoxShadowColor + "; height: 16px; width: 130px; position: relative;");
      detuneModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-50px);");
      detuneModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; transform: translateX(35px) translateY(-70px);");
      qDiv.setAttribute("style", "float: left; width: " + this.verticalWidth + "px; margin: 0; padding-top: 5px; height: " + ((this.verticalHeight * 4.8)/18) + "px; background: transparent;");
      qLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-20px);");
      qDisplay.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 24px; background: url(" + this.displayPath + "); background-size: " + this.frequencyDisplaySize + "; box-shadow: -1px -1px 1px " + this.faceBoxShadowColor + ", -2px -2px 1px " + this.faceBoxShadowColor + ", -3px -3px 1px " + this.faceBoxShadowColor + ", -4px -4px 1px " + this.faceBoxShadowColor + "; position: relative; transform: translateX(8px) translateY(-30px);");
      qSlider.setAttribute("style", "-webkit-appearance: none; appearance: none; webkit-transform: rotateZ(-90deg) translateX(-32px) translateY(80px); transform: rotateZ(-90deg) translateX(-32px) translateY(80px); background: url(" + this.displayPath + "); background-size: " + this.sliderSize + "; outline: none; opacity: 1.0; box-shadow: 1px -1px 1px " + this.faceBoxShadowColor + ", 2px -2px 1px " + this.faceBoxShadowColor + ", 3px -3px 1px " + this.faceBoxShadowColor + ", 4px -4px 1px " + this.faceBoxShadowColor + "; height: 16px; width: 120px; position: relative;");
      qModulatorLabel.setAttribute("style", "position: relative; font-family: 'Righteous', cursive; font-size: 18px; color: " + this.faceFontColor + "; text-shadow: -1px -1px 1px " + this.faceFontShadowColor + ", -2px -2px 1px " + this.faceFontShadowColor + "; transform: translateX(10px) translateY(-50px);");
      qModulatorInput.setAttribute("style", "font-family: 'Righteous', cursive; font-size: 42px; position: relative; width: 40px; height: 50px; color: " + this.signalFontColor + "; background: url(" + this.displayPath + "); background-size: " + this.outputSize + "; text-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; box-shadow: -1px -1px 1px " + this.outputBoxShadowColor + ", -2px -2px 1px " + this.outputBoxShadowColor + "; cursor: pointer; padding-left: 10px; transform: translateX(35px) translateY(-70px);");

      this.manageFrequency(frequencyDisplay, frequencySlider);

      this.manageDetune(detuneDisplay, detuneSlider);

      this.manageQ(qDisplay, qSlider);

    inputPort.addEventListener('click', () => {
      alert(inputPort.id);
    });

    outputPort.addEventListener('click', () => {
      alert(outputPort.id);
    });

    frequencyModulatorInput.addEventListener('click', () => {
      alert(frequencyModulatorInput.id);
    });

    detuneModulatorInput.addEventListener('click', () => {
      alert(detuneModulatorInput.id);
    });

    qModulatorInput.addEventListener('click', () => {
      alert(qModulatorInput.id);
    });

      return(div);
    }
  }

  return(lowpassFilter);

})();

var HighpassFilter = (function(settings, skin, audioContext) {

  let highpassFilter = function(settings, skin, audioContext) {
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

var EnvelopeGenerator = (function(settings, skin, audioContext) {

  let envelopeGenerator = function(settings, skin, audioContext) {
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

var WeatherModule = (function(setting, skin, audioContext) {

  let weatherModule = function(setting, skin, audioContext) {
    this.id = setting.id;
    this.user_id = setting.user_id;
    this.name = setting.name;
    this.zip_code_toggle = setting.zip_code_toggle;
    this.zip_digit_1 = setting.zip_digit_1;
    this.zip_digit_1_modulator = setting.zip_digit_1_modulator;
    this.zip_digit_2 = setting.zip_digit_2;
    this.zip_digit_2_modulator = setting.zip_digit_2_modulator;
    this.zip_digit_3 = setting.zip_digit_3;
    this.zip_digit_3_modulator = setting.zip_digit_3_modulator;
    this.zip_digit_4 = setting.zip_digit_4;
    this.zip_digit_4_modulator = setting.zip_digit_4_modulator;
    this.zip_digit_5 = setting.zip_digit_5;
    this.zip_digit_5_modulator = setting.zip_digit_5_modulator;
    this.country = setting.country;
    this.city = setting.city;
    this.output = setting.output;
  }

  return(weatherModule);

})();

var BandpassFilter = (function(settings, skin, audioContext) {

  let bandpassFilter = function(settings, skin, audioContext) {
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
    this.bandpassFilter = audioContext.createBiquadFilter();
    this.bandpassFilter.type = 'bandpass';
    this.bandpassFilter.frequency.value = this.frequency;
    this.bandpassFilter.detune.value = this.detune;
    this.bandpassFilter.Q.value = this.q;
  }

  return(bandpassFilter);
})();

var LowshelfFilter = (function(settings, skin, audioContext) {

  let lowshelfFilter = function(settings, skin, audioContext) {
    this.id = settings.id;
    this.name = settings.name;
    this.frequency = settings.frequency;
    this.frequency_modulator = settings.frequency_modulator;
    this.detune = settings.detune;
    this.detune_modulator = settings.detune_modulator;
    this.gain = settings.gain;
    this.gain_modulator = settings.gain_modulator,
    this.input = settings.input;
    this.output = settings.output;
    this.lowshelfFilter = audioContext.createBiquadFilter();
    this.lowshelfFilter.type = 'lowshelf';
    this.lowshelfFilter.frequency.value = this.frequency;
    this.lowshelfFilter.detune.value = this.detune;
    this.lowshelfFilter.gain.value = this.gain;
  }

  return(lowshelfFilter);
})();
