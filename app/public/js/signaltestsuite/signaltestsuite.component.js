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
      // vm.signalTestAdvanceToNext = signalTestAdvanceToNext;

      var audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // function signalTestAdvanceToNext() {
      //   let newId = parseInt($stateParams.id) + 1;
      //   $state.go('signaltestsuite', {id: newId});
      // }

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


      function onInit() {
        console.log("Signal Testing Suite is lit");
        vm.testStarted = false;
        switch($stateParams.id) {
          case('1'):
            // Master Volume Test
            masterVolumeTest(1);
            break;
          default:
            alert('unsupported signal test');
        }
        let theBody = document.getElementsByTagName("body")[0];
        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 1s linear;");

      }

    }

}());
