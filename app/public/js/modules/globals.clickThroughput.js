'use strict';

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
            case('test_tone'):
              // connect master volume input to test tone output
              // device = master volume input
              // connect.output.device = test tone output

              // Update objects
              device.input = {
                module: 'test_tones',
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
                  module: 'test_tones',
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
            case('test_tone'):
              if (throughput.type === 'signal') {
                // connect test_tone output to gain input
                // device = gain input
                // connect.output.device = test_tone output

                // Update objects
                device.input = {
                  module: 'test_tones',
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
                    module: 'test_tones',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;
                break;
              } else {
                // connect test_tone output to gain modulation input
                // device = gain modulation input
                // connect.output.device = test_tone output

                // Update objects
                device.gainModulator = {
                  module: 'test_tones',
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
                    module: 'test_tones',
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
            case('test_tone'):
              if (throughput.type === 'frequencyModulation') {
                // connect test_tone output to oscillator frequency modulation input
                // device = frequency modulation input
                // connect.output.device = test_tone output

                // Update objects
                device.hertzModulator = {
                  module: 'test_tones',
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
                    module: 'test_tones',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;
              } else if (throughput.type === 'detuneModulation') {
                // connect test_tone output to oscillator detune modulation input
                // device = detune modulation input
                // connect.output.device = test_tone output

                // Update objects
                device.detuneModulator = {
                  module: 'test_tones',
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
                    module: 'test_tones',
                    name: connect.output.device.name,
                    id: connect.output.device.id,
                    element: connect.output.element
                  }
                });
                activePatching = false;
                connect.output = null;
                activeLine = null;
              } else if (throughput.type === 'waveformModulation') {
                // connect test_tone output to oscillator waveform modulation input
                // device = waveform modulation input
                // connect.output.device = test_tone output

                // Update objects
                device.waveformModulator = {
                  module: 'test_tones',
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
        case('test_tone'):
          switch(connect.input.throughput.device) {
            case('master_volume'):
              // connect test_tone output to master volume input
              // connect.input.device = master volume input
              // device = test_tone output

              // Update objects
              connect.input.device.input = {
                module: 'test_tones',
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
                  module: 'test_tones',
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
                // connect gain input to test_tone output
                // connect.input.device = gain input
                // device = test_tone output

                // Update objects
                connect.input.device.input = {
                  module: 'gains',
                  name: device.name,
                  id: device.id,
                  type: 'signal',
                  connection: device
                };
                device.output = {
                  module: 'test_tones',
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
                    module: 'test_tones',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;

              } else {
                // connect gain modulation input to test_tone output
                // connect.input.device = gain modulation input
                // device = test_tone output

                // Update objects
                connect.input.device.gainModulator = {
                  module: 'test_tones',
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
                    module: 'test_tones',
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
                // connect oscillator frequency modulation input to test_tone output
                // connect.input.device = oscillator frequency modulation input
                // device = test_tone output

                // Update objects
                connect.input.device.hertzModulator = {
                  module: 'test_tones',
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
                    module: 'test_tones',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;

              } else if (connect.input.throughput.type === 'detuneModulation') {
                // connect oscillator detune modulation input to test_tone output
                // connect.input.device = oscillator detune modulation input
                // device = test_tone output

                // Update objects
                connect.input.device.detuneModulator = {
                  module: 'test_tones',
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
                    module: 'test_tones',
                    name: device.name,
                    id: device.id,
                    element: element
                  }
                });
                activePatching = false;
                connect.input = null;
                activeLine = null;

              } else if (connect.input.throughput.type === 'waveformModulation') {
                // connect oscillator waveform modulation input to test_tone output
                // connect.input.device = oscillator waveform modulation input
                // device = test_tone output

                // Update objects
                connect.input.device.waveformModulator = {
                  module: 'test_tones',
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
                    module: 'test_tones',
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
