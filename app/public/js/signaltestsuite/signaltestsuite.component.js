(function() {
  'use strict';




  angular.module('app')
    .component('signaltestsuite', {
      controller: SignalTestSuiteController,
      templateUrl: '/js/signaltestsuite/signaltestsuite.template.html'
    });

    SignalTestSuiteController.$inject = ['$http', '$state', '$stateParams'];

    function SignalTestSuiteController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.testStarted = false;
      vm.startSignalTest = startSignalTest;
      vm.signalTestAdvanceToNext = signalTestAdvanceToNext;

      var audioContext = new (window.AudioContext || window.webkitAudioContext)();

      function signalTestAdvanceToNext() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let newId = parseInt($stateParams.id) + 1;
        $state.go('signaltestsuite', {id: newId});
      }

      function oscillatorTest1() {
        let signalTestingSuite = document.getElementById('signalTestingSuite');
        let signalTestLabel = document.getElementById('signalTestLabel');
        let signalTestSublabel = document.getElementById('signalTestSublabel');
        let signalTestingInstructions = document.getElementById('signalTestingInstructions');
        let testingArray = [ 'Oscillator output -> Master Volume input', 'Disconnect Oscillator from Master Volume', 'Frequency Slider', 'Frequency Input', 'Detune Slider', 'Detune Input', 'Waveform Selectors', 'Oscillator output -> Gain input, Gain output -> Master Volume Input', 'AM/FM Modulation' ];
        let testingIndex = 0;
        let testingInstructions = [ 'Connect oscillator output to master volume input. Oscillator should be audible.', 'Disconnect oscillator from master volume. The visual connection should no longer be visible and the audio signal should stop.', 'Reconnect oscillator to master volume. Test the frequency slider element. Frequency should change with slider input.', 'Enter frequency values directly into the number input field. Frequency playback should reflect new input values.', 'Test detune slider. Detune should alter frequency within a range of -100/100 cents.', 'Enter detune values directly into number input field. Playback should reflect new values.', 'Change the waveform by selecting from the waveform buttons. Playback should reflect this change.', 'Now alter module connections so that the oscillator output passes through a gain module before reaching the master volume. Signal should be audible.', 'Connect the second oscillator to the second gain module. Connect output of second gain to the modulation input of the first gain module. Signal modulation should be audible.' ];
        let testingErrors = [ 'FAIL: Oscillator to Master Volume connection error.', 'FAIL: Oscillator disconnection error.', 'FAIL: frequency slider error.', 'FAIL: frequency input field error.', 'FAIL: detune slider error.', 'FAIL: detune input field error.', 'FAIL: waveform selector error.', 'FAIL: oscillator/gain connection error.', 'FAIL: signal modulation error.' ];
        let months = [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ];
        let now = new Date();
        $http.get('/oscillators/1')
        .then(oscData => {
          let osc = oscData.data;
          osc.id = 501;
          osc.positionX = 600;
          osc.positionY = -100;
          $http.get('/oscillator_skins')
          .then(allOscillatorSkinsData => {
            let allOscillatorSkins = allOscillatorSkinsData.data;
            let oscillatorSkinArray = allOscillatorSkins.filter(skin => {
              return((skin.month === months[now.getMonth()]) && (skin.rule.dates.indexOf(now.getDate()) !== -1));
            });
            if (oscillatorSkinArray.length === 0) {
              oscillatorSkinArray.push(allOscillatorSkins[Math.floor(Math.random() * (allOscillatorSkins.length))]);
            }
            let oscillator1 = new OscillatorModule(osc, oscillatorSkinArray[0], audioContext);
            let oscillator1Div = oscillator1.renderDraggable();
            signalTestingSuite.appendChild(oscillator1Div);

            $http.get('/oscillators/1')
            .then(osc2Data => {
              let osc2 = osc2Data.data;
              osc2.id = 555;
              osc2.positionX = 300;
              osc2.positionY = 200;
              let oscillator2 = new OscillatorModule(osc2, oscillatorSkinArray[0], audioContext);
              let oscillator2Div = oscillator2.renderDraggable();
              signalTestingSuite.appendChild(oscillator2Div);

              $http.get('/gains/1')
              .then(gainData => {
                let gain = gainData.data;
                gain.id = 620;
                gain.positionX = 1100;
                gain.positionY = 100;
                $http.get('/gain_skins')
                .then(allGainSkinsData => {
                  let allGainSkins = allGainSkinsData.data;
                  let gainSkinArray = allGainSkins.filter(skin => {
                    return((skin.month === months[now.getMonth()]) && (skin.rule.dates.indexOf(now.getDate()) !== -1));
                  });
                  if (gainSkinArray.length === 0) {
                    gainSkinArray.push(allGainSkins[Math.floor(Math.random() * (allGainSkins.length))]);
                  }
                  let gainModule = new GainModule(gain, gainSkinArray[0], audioContext);
                  let gainDiv = gainModule.renderDraggable();
                  signalTestingSuite.appendChild(gainDiv);

                  $http.get('/gains/1')
                  .then(gain2Data => {
                    let gain2 = gain2Data.data;
                    gain2.id = 4;
                    gain2.positionX = 700;
                    gain2.positionY = 400;
                    let gain2Module = new GainModule(gain2, gainSkinArray[0], audioContext);
                    let gain2Div = gain2Module.renderDraggable();
                    signalTestingSuite.appendChild(gain2Div);

                    $http.get('/master_volumes/1')
                    .then(masterVolData => {
                      let masterVol = masterVolData.data;
                      $http.get('/master_volume_skins')
                      .then(allMasterVolumeSkinsData => {
                        let allMasterVolumeSkins = allMasterVolumeSkinsData.data;
                        let masterVolumeSkinArray = allMasterVolumeSkins.filter(skin => {
                          return((skin.month === months[now.getMonth()]) && (skin.rule.dates.indexOf(now.getDate()) !== -1));
                        });
                        if (masterVolumeSkinArray.length === 0) {
                          masterVolumeSkinArray.push(allMasterVolumeSkins[Math.floor(Math.random() * (allMasterVolumeSkins.length))]);
                        }
                        let masterVolume = new MasterVolume(masterVol, masterVolumeSkinArray[0], audioContext);
                        let masterVolumeDiv = masterVolume.renderDraggable();
                        signalTestingSuite.appendChild(masterVolumeDiv);

                        signalTestLabel.innerHTML = 'Oscillator Test:';
                        signalTestSublabel.innerHTML = (testingIndex + 1) + ' of ' + (testingArray.length) + ' - ' + testingArray[testingIndex];
                        signalTestingInstructions.innerHTML = testingInstructions[testingIndex];
                        let signalTestFail = document.getElementById('signalTestFail');
                        let signalTestPass = document.getElementById('signalTestPass');

                        signalTestFail.addEventListener('click', () => {
                          signalTestingInstructions.innerHTML = testingErrors[testingIndex];
                          document.getElementById('successFail').innerHTML = 'FAIL';
                          document.getElementById('successFail').setAttribute("style", "color: red;");
                          signalTestFail.setAttribute("style", "display: none;");
                          signalTestPass.setAttribute("style", "display: none;");
                        });

                        signalTestPass.addEventListener('click', () => {
                          ++testingIndex;
                          if (testingIndex < testingArray.length) {
                            signalTestSublabel.innerHTML = (testingIndex + 1) + ' of ' + (testingArray.length) + ' - ' + testingArray[testingIndex];
                            signalTestingInstructions.innerHTML = testingInstructions[testingIndex];
                          } else {
                            signalTestFail.setAttribute("style", "display: none;");
                            signalTestPass.setAttribute("style", "display: none;");
                            document.getElementById('successFail').innerHTML = 'SUCCESS';
                            document.getElementById('successFail').setAttribute("style", "color: green;");
                            signalTestLabel.innerHTML = 'Oscillator Test: PASSED';
                            signalTestLabel.setAttribute("style", "color: green;");
                            signalTestSublabel.innerHTML = (testingArray.length) + ' of ' + (testingArray.length) + ' tests passed.';
                            signalTestSublabel.setAttribute("style", "color: green;");
                            signalTestingInstructions.innerHTML = 'Oscillator passes signal testing.';
                            signalTestingInstructions.setAttribute("style", "color: green;");
                            document.getElementById('signalTestingTitle').setAttribute("style", "color: green;");
                            document.getElementById('signalTestNext').setAttribute("style", "display: initial;");

                            if (masterVolume.input !== null) {
                              disconnectPatchConnection(masterVolume, 'input', 'master_volumes');
                            }
                            if (oscillator1.output !== null) {
                              disconnectPatchConnection(oscillator1, 'output', 'oscillators');
                            }
                            if (oscillator2.output !== null) {
                              disconnectPatchConnection(oscillator2, 'output', 'oscillators');
                            }
                            if (gain1.output !== null) {
                              disconnectPatchConnection(gain1, 'output', 'gains');
                            }
                            if (gain2.output !== null) {
                              disconnectPatchConnection(gain2, 'output', 'gains');
                            }
                            if (gain1.input !== null) {
                              disconnectPatchConnection(gain1, 'input', 'gains');
                            }
                            if (gain2.input !== null) {
                              disconnectPatchConnection(gain2, 'input', 'gains');
                            }
                            audioContext = null;
                          }
                        });
                      });
                    });
                  });
                });
              })
            });
          });
        });
      }

      function gainTest1() {
        let signalTestingSuite = document.getElementById('signalTestingSuite');
        let signalTestLabel = document.getElementById('signalTestLabel');
        let signalTestSublabel = document.getElementById('signalTestSublabel');
        let signalTestingInstructions = document.getElementById('signalTestingInstructions');
        let testingArray = [ 'Gain output -> Master Volume input', 'Disconnect Gain output from Master Volume input', 'Gain Slider', 'Gain Input', 'Amplitude Modulation', 'Amplitude Modulation Attenuation', 'Amplitude Modulation Attenuation via Input Field' ];
        let testingIndex = 0;
        let testingInstructions = [ 'The gain module closest to the Master Volume currently has a sine tone at 311.127Hertz passing through it. Connect this gain\'s output to the Master Volume input. Do you hear the sine tone?', 'Now disconnect the Gain module from the Master Volume by clicking on either the Master Volume Input or Gain output. The visual connection should disappear and the sound should stop.', 'Reconnect the Gain output to the Master Volume input. Move the slider so that the Gain values span the range from 0 to 100. Does the signal increase/decrease in volume as expected?', 'Now type gain values directly into the input field. Does the volume adjust from loud to soft as expected?', 'With the initial Gain at a comfortable volume, now connect our second Gain output to the modulation input of the first Gain. The second gain has a sine wave at 30Hertz passing through it. This should produce a noticeable amplitude modulation on the signal.', 'Now adjust the slider on the second Gain. Does this attenuate the amplitude modulation as expected?', 'Now type Gain output values into the input field of the second Gain. Does this attenuate the amplitude modulation as expected?' ];
        let testingErrors = [ 'FAIL: Gain module to Master Volume connection error.', 'FAIL: Gain module/Master Volume disconnection error.', 'FAIL: Gain slider error.', 'FAIL: Gain input error.', 'FAIL: Gain modulation error.', 'FAIL: Gain modulation slider attenuation error.', 'FAIL: Gain modulation input attenuation error.' ];
        let months = [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ];
        let now = new Date();
        let masterVolumeDiv;
        let gain1Div;
        let gain2Div;

        $http.get('master_volumes/1')
        .then(masterVolumeData => {
          let settings = masterVolumeData.data;

          $http.get('master_volume_skins')
          .then(allMasterVolumeSkinsData =>    {
            let allMasterVolumeSkins = allMasterVolumeSkinsData.data;

            let skinArray = allMasterVolumeSkins.filter(entry => {
              return((entry.month === months[now.getMonth()]) && (entry.rule.dates.indexOf(now.getDate()) !== -1));
            });
            if (skinArray.length === 0) {
              skinArray.push(allMasterVolumeSkins[Math.floor(Math.random() * (allMasterVolumeSkins.length))]);
            }
            let masterVolume = new MasterVolume(settings, skinArray[0], audioContext);
            console.log(masterVolume);
            masterVolumeDiv = masterVolume.renderDraggable();
            signalTestingSuite.appendChild(masterVolumeDiv);

            $http.get('/gains/1')
            .then(gain1Data => {
              let gain1Settings = gain1Data.data;
              gain1Settings.id = 2;
              gain1Settings.positionX = 700;
              gain1Settings.positionY = 300;

              $http.get('/gain_skins')
              .then(allGainSkinsData => {
                let allGainSkins = allGainSkinsData.data;

                let gainSkinArray = allGainSkins.filter(entry => {
                  return((entry.month === months[now.getMonth()]) && (entry.rule.dates.indexOf(now.getDate()) !== -1));
                });
                if (gainSkinArray.length === 0) {
                  gainSkinArray.push(allGainSkins[Math.floor(Math.random() * (allGainSkins.length))]);
                }
                let gain1 = new GainModule(gain1Settings, gainSkinArray[0], audioContext);
                gain1Settings.id = 3;
                gain1Settings.positionX = 400;
                gain1Settings.positionY = 400;
                let gain2 = new GainModule(gain1Settings, gainSkinArray[0], audioContext);
                let oscillator1 = audioContext.createOscillator();
                oscillator1.type = 'sine';
                oscillator1.frequency.value = 311.127;
                oscillator1.connect(gain1.gain);
                oscillator1.start();
                let oscillator2 = audioContext.createOscillator();
                oscillator2.type = 'sine';
                oscillator2.frequency.value = 30;
                oscillator2.connect(gain2.gain);
                oscillator2.start();
                gain1Div = gain1.renderDraggable();
                signalTestingSuite.appendChild(gain1Div);
                gain2Div = gain2.renderDraggable();
                signalTestingSuite.appendChild(gain2Div);

                signalTestLabel.innerHTML = 'Gain Test:';
                signalTestSublabel.innerHTML = (testingIndex + 1) + ' of ' + (testingArray.length) + ' - ' + testingArray[testingIndex];
                signalTestingInstructions.innerHTML = testingInstructions[testingIndex];
                let signalTestFail = document.getElementById('signalTestFail');
                let signalTestPass = document.getElementById('signalTestPass');

                signalTestFail.addEventListener('click', () => {
                  signalTestingInstructions.innerHTML = testingErrors[testingIndex];
                  document.getElementById('successFail').innerHTML = 'FAIL';
                  document.getElementById('successFail').setAttribute("style", "color: red;");
                  signalTestFail.setAttribute("style", "display: none;");
                  signalTestPass.setAttribute("style", "display: none;");
                });

                signalTestPass.addEventListener('click', () => {
                  ++testingIndex;
                  if (testingIndex < testingArray.length) {
                    signalTestSublabel.innerHTML = (testingIndex + 1) + ' of ' + (testingArray.length) + ' - ' + testingArray[testingIndex];
                    signalTestingInstructions.innerHTML = testingInstructions[testingIndex];
                  } else {
                    signalTestFail.setAttribute("style", "display: none;");
                    signalTestPass.setAttribute("style", "display: none;");
                    document.getElementById('successFail').innerHTML = 'SUCCESS';
                    document.getElementById('successFail').setAttribute("style", "color: green;");
                    signalTestLabel.innerHTML = 'Gain Test: PASSED';
                    signalTestLabel.setAttribute("style", "color: green;");
                    signalTestSublabel.innerHTML = (testingArray.length) + ' of ' + (testingArray.length) + ' tests passed.';
                    signalTestSublabel.setAttribute("style", "color: green;");
                    signalTestingInstructions.innerHTML = 'Gain passes signal testing.';
                    signalTestingInstructions.setAttribute("style", "color: green;");
                    document.getElementById('signalTestingTitle').setAttribute("style", "color: green;");
                    document.getElementById('signalTestNext').setAttribute("style", "display: initial;");
                    oscillator1.disconnect(gain1.gain);
                    oscillator1.stop();
                    oscillator2.disconnect(gain2.gain);
                    oscillator2.stop();
                    gain1.gain.disconnect(masterVolume.masterGain);

                    audioContext = null;
                    masterVolumeDiv.parentNode.removeChild(masterVolumeDiv);
                    gain1Div.parentNode.removeChild(gain1Div);
                    gain2Div.parentNode.removeChild(gain2Div);
                  }
                });

              });
            });

          });
        });
      }

      function masterVolumeTest1() {
        let signalTestingSuite = document.getElementById('signalTestingSuite');
        let signalTestLabel = document.getElementById('signalTestLabel');
        let signalTestSublabel = document.getElementById('signalTestSublabel');
        let signalTestingInstructions = document.getElementById('signalTestingInstructions');
        let testingArray = [ 'Audibility', 'Volume Slider', 'Volume Input', 'Mute Button' ]
        let testingIndex = 0;
        let testingInstructions = [ 'Master Volume is now connected to audio context with a sine tone at 311.127Hz. Is this audible through your speakers?', 'Check volume slider. Does slider increase/decrease signal volume as expected?', 'Check volume input field. Does typing in values between 0 - 100 increase/decrease signal volume as expected?', 'Check mute button. Does mute button eliminate audible signale when engaged as expected?' ];
        let testingErrors = [ 'FAIL: Signal non-audible. Please check your speaker connections and try again.', 'FAIL: Volume slider fail.', 'FAIL: Volume input field fail.', 'FAIL: Mute button fail.' ];
        let months = [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ];
        let now = new Date();
        let masterVolumeDiv;


        $http.get('/master_volumes/1')
        .then(masterVolumeSettingsData => {
          let settings = masterVolumeSettingsData.data;
          console.log(settings);

          $http.get('/master_volume_skins')
          .then(allMasterVolumeSkinsData => {
            let allMasterVolumeSkins = allMasterVolumeSkinsData.data;
            console.log(allMasterVolumeSkins);
            let skinArray = allMasterVolumeSkins.filter(entry => {
              return((entry.month === months[now.getMonth()]) && (entry.rule.dates.indexOf(now.getDate()) !== -1));
            });
            if (skinArray.length === 0) {
              skinArray.push(allMasterVolumeSkins[Math.floor(Math.random() * (allMasterVolumeSkins.length))]);
            }
            let masterVolume = new MasterVolume(settings, skinArray[0], audioContext);
            console.log(masterVolume);
            masterVolumeDiv = masterVolume.renderDraggable();
            signalTestingSuite.appendChild(masterVolumeDiv);
            let oscillator = audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.value = 311.127;
            oscillator.connect(masterVolume.masterGain);
            oscillator.start();

            signalTestLabel.innerHTML = 'Master Volume Test:';
            signalTestSublabel.innerHTML = (testingIndex + 1) + ' of ' + (testingArray.length) + ' - ' + testingArray[testingIndex];
            signalTestingInstructions.innerHTML = testingInstructions[testingIndex];
            let signalTestFail = document.getElementById('signalTestFail');
            let signalTestPass = document.getElementById('signalTestPass');

            signalTestFail.addEventListener('click', () => {
              signalTestingInstructions.innerHTML = testingErrors[testingIndex];
              document.getElementById('successFail').innerHTML = 'FAIL';
              document.getElementById('successFail').setAttribute("style", "color: red;");
              signalTestFail.setAttribute("style", "display: none;");
              signalTestPass.setAttribute("style", "display: none;");
            });

            signalTestPass.addEventListener('click', () => {
              ++testingIndex;
              if (testingIndex < testingArray.length) {
                signalTestSublabel.innerHTML = (testingIndex + 1) + ' of ' + (testingArray.length) + ' - ' + testingArray[testingIndex];
                signalTestingInstructions.innerHTML = testingInstructions[testingIndex];
              } else {
                signalTestFail.setAttribute("style", "display: none;");
                signalTestPass.setAttribute("style", "display: none;");
                document.getElementById('successFail').innerHTML = 'SUCCESS';
                document.getElementById('successFail').setAttribute("style", "color: green;");
                signalTestLabel.innerHTML = 'Master Volume Test: PASSED';
                signalTestLabel.setAttribute("style", "color: green;");
                signalTestSublabel.innerHTML = (testingArray.length) + ' of ' + (testingArray.length) + ' tests passed.';
                signalTestSublabel.setAttribute("style", "color: green;");
                signalTestingInstructions.innerHTML = 'Master Volume passes signal testing.';
                signalTestingInstructions.setAttribute("style", "color: green;");
                document.getElementById('signalTestingTitle').setAttribute("style", "color: green;");
                document.getElementById('signalTestNext').setAttribute("style", "display: initial;");
                oscillator.disconnect(masterVolume.masterGain);
                audioContext = null;
                masterVolumeDiv.parentNode.removeChild(masterVolumeDiv);
              }
            });
          });
        });
      }

      function startSignalTest() {
        vm.testStarted = true;
        audioContext.resume().then(() => {
          console.log('Playback resumed successfully');
        });
        switch(parseInt($stateParams.id)) {
          case(1):
            // Master volume
            masterVolumeTest1();
            break;
          case(2):
            // Gain
            gainTest1();
            break;
          case(3):
            // OscillatorModule
            oscillatorTest1();
            break;
          default:
            alert('unsupported module type');
        }
      }

      function masterVolumeTest(moduleVal) {
        console.log('master volume');
        let signalTestingSuite = document.getElementById('signalTestingSuite');
        let signalTestLabel = document.getElementById('signalTestLabel');
        let signalTestSublabel = document.getElementById('signalTestSublabel');
        let signalTestingInstructions = document.getElementById('signalTestingInstructions');

        signalTestLabel.innerHTML = 'Master Volume Test';
        signalTestSublabel.innerHTML = '';
        signalTestingInstructions.innerHTML = 'Click \'start\' to begin';

      }

      function gainTest(moduleVal) {
        console.log('gain');
        let signalTestingSuite = document.getElementById('signalTestingSuite');
        let signalTestLabel = document.getElementById('signalTestLabel');
        let signalTestSublabel = document.getElementById('signalTestSublabel');
        let signalTestingInstructions = document.getElementById('signalTestingInstructions');

        signalTestLabel.innerHTML = 'Gain Test';
        signalTestSublabel.innerHTML = '';
        signalTestingInstructions.innerHTML = 'Click \'start\' to begin';

      }

      function oscillatorTest(moduleVal) {
        console.log('oscillator');
        let signalTestingSuite = document.getElementById('signalTestingSuite');
        let signalTestLabel = document.getElementById('signalTestLabel');
        let signalTestSublabel = document.getElementById('signalTestSublabel');
        let signalTestingInstructions = document.getElementById('signalTestingInstructions');

        signalTestLabel.innerHTML = 'Oscillator Test';
        signalTestSublabel.innerHTML = '';
        signalTestingInstructions.innerHTML = 'Click \'start\' to begin';
      }


      function onInit() {
        console.log("Signal Testing Suite is lit");
        vm.testStarted = false;
        switch($stateParams.id) {
          case('1'):
            // Master Volume Test
            masterVolumeTest(1);
            break;
          case('2'):
            gainTest(2);
            break;
          case('3'):
            oscillatorTest(3);
            break;
          default:
            alert('unsupported signal test');
        }
        let theBody = document.getElementsByTagName("body")[0];
        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 1s linear;");

      }

    }

}());
