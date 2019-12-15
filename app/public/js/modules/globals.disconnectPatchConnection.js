'use strict';

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
        case('test_tones'):
          // disconnect test_tone output from master volume input

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
            case('test_tones'):
              // disconnect gain input from test_tone output
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
            case('test_tones'):
              // disconnect gain modulator input from test_tone output
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
            case('test_tones'):
              // disconnect oscillator frequency modulation input from test_tone output
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
            case('test_tones'):
              // disconnect oscillator detune modulation input from test_tone output
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
            case('test_tones'):
              // disconnect oscillator waveform modulation input from test_tone output
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
      case('test_tone'):
        switch(device.output.module) {
          case('master_volumes'):
            // disconnect master volume input from test_tone output
            // remove visual connection
            for (let i = 0; i < patchCables.length; i++) {
              if ((patchCables[i].output.module === 'test_tones') && (patchCables[i].output.id === device.id)) {
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
            if ((device.output !== null) && (device.output.connection.input !== null) && (device.output.connection.input.connection.id === device.id)) {
              // disconnect gain input from test_tone output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].output.module === 'test_tones') && (patchCables[i].output.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.gain.disconnect(device.output.connection.gain);

              // update Objects
              device.output.connection.input = null;
              device.output = null;
            } else if ((device.output !== null) && (device.output.connection.gainModulator !== null) && (device.output.connection.gainModulator.connection.id === device.id)) {
              // disconnect gain modulation input from test_tone output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].output.module === 'test_tones') && (patchCables[i].output.id === device.id)) {
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
          case('oscillator'):
            if ((device.output !== null) && (device.output.connection.hertzModulator !== null) && (device.output.connection.hertzModulator.connection.id === device.id)) {
              // disconnect frequency modulation input from test_tone output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].output.module === 'test_tones') && (patchCables[i].output.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              // device.gain.disconnect(device.output.connection.oscillator.frequency);

              // update Objects
              device.output.connection.hertzModulator = null;
              device.output = null;
            } else if ((device.output !== null) && (device.output.connection.detuneModulator !== null) && (device.output.connection.detuneModulator.connection.id === device.id)) {
              // disconnect detune modulation input from test_tone output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].output.module === 'test_tones') && (patchCables[i].output.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.gain.disconnect(device.output.connection.oscillator.detune);

              // update Objects
              device.output.connection.detuneModulator = null;
              device.output = null;
            } else if ((device.output !== null) && (device.output.connection.waveformModulator !== null) && (device.output.connection.waveformModulator.connection.id === device.id)) {
              // disconnect waveform modulation input from test_tone output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].output.module === 'test_tones') && (patchCables[i].output.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              // device.gain.disconnect(device.output.connection.oscillator.detune);
              // Illegal Connection

              // update Objects
              device.output.connection.waveformModulator = null;
              device.output = null;
            }
            break;
          case('oscillators'):
            if ((device.output !== null) && (device.output.connection.hertzModulator !== null) && (device.output.connection.hertzModulator.connection.id === device.id)) {
              // disconnect frequency modulation input from test_tone output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].output.module === 'test_tones') && (patchCables[i].output.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.gain.disconnect(device.output.connection.oscillator.frequency);

              // update Objects
              device.output.connection.hertzModulator = null;
              device.output = null;
            } else if ((device.output !== null) && (device.output.connection.detuneModulator !== null) && (device.output.connection.detuneModulator.connection.id === device.id)) {
              // disconnect detune modulation input from test_tone output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].output.module === 'test_tones') && (patchCables[i].output.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              device.gain.disconnect(device.output.connection.oscillator.detune);

              // update Objects
              device.output.connection.detuneModulator = null;
              device.output = null;
            } else if ((device.output !== null) && (device.output.connection.waveformModulator !== null) && (device.output.connection.waveformModulator.connection.id === device.id)) {
              // disconnect waveform modulation input from test_tone output
              // remove visual connection
              for (let i = 0; i < patchCables.length; i++) {
                if ((patchCables[i].output.module === 'test_tones') && (patchCables[i].output.id === device.id)) {
                  patchCables[i].line.parentNode.removeChild(patchCables[i].line);
                  patchCables.splice(i, 1);
                }
              }

              // disconnect
              // device.gain.disconnect(device.output.connection.oscillator.detune);
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
      console.log('unsupported device type');
      alert('Unsupported Device Type');
  }

}
