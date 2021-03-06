(function() {
  'use strict';
  var currentUserId = 0;


  angular.module('app')
    .component('info', {
      controller: UserInfoController,
      templateUrl: '/js/info/info.template.html'
    });

    UserInfoController.$inject = ['$http', '$state', '$stateParams'];

    function UserInfoController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.returnToHub = returnToHub;
      vm.userLogout = userLogout;
      vm.userProfileEditor = userProfileEditor;
      vm.returnToHub = returnToHub;
      vm.navMixer = navMixer;
      vm.navPatchEditor = navPatchEditor;
      vm.renderModule = renderModule;

      var audioContext = new (window.AudioContext || window.webkitAudioContext)();
      var contextStarted = false;
      var rendered = {
        gain: false,
        master_volume: false,
        oscillator: false,
        test_tone: false,
      };
      var dragScale = 1;
      var componentArr = [];

      function manageScaling() {
        switch(componentArr.length) {
          case(1):
            componentArr.forEach(element => {
              element.setDragScale(1);
            });
            break;
          case(2):
            componentArr.forEach(element => {
              element.setDragScale(1);
            });
            break;
          case(3):
            componentArr.forEach(element => {
              element.setDragScale(0.9);
            });
            break;
          case(4):
            componentArr.forEach(element => {
              element.setDragScale(0.8);
            });
            break;
          default:
            alert("Error: Unhandled component scaling");
        }
      }

      function navPatchEditor() {
        $state.go('patcheditor', {id: currentUserId});
      }

      function navMixer() {
        $state.go('mixer', {id: currentUserId});
      }

      function returnToHub() {
        $state.go('userhub', {id: currentUserId});
      }

      function userProfileEditor() {
        $state.go('userprofile', {id: currentUserId});
      }


      function returnToHub() {
        $state.go('userhub', {id: currentUserId});
      }

      function renderModule(moduleType, moduleDiv) {

        if (!contextStarted) {
          audioContext.resume().then(() => {
            console.log('Playback resumed successfully');
            contextStarted = true;
          });
        }
        let now = new Date();
        let months = [ 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ];
        let div = document.getElementById('renderSvg');
        let infoSVG = document.getElementById('infoSVG')
        console.log(div);
        let rect = div.getBoundingClientRect();
        let hubDiv = document.getElementById('hubDiv');
        console.log(rect);
        switch(moduleType) {
          case('master_volume'):
            if (!rendered.master_volume) {
              rendered.master_volume = true;
              $http.get('/master_volumes/1')
              .then(settingsData => {
                let settings = settingsData.data;
                let masterBox = document.getElementById('masterBox');
                let masterRect = masterBox.getBoundingClientRect();
                settings.positionX = (rect.left + ((rect.width/2) + 20));
                settings.positionY = masterRect.top;
                $http.get('/master_volume_skins')
                .then(allMasterVolumeSkinsData => {
                  let allMasterVolumeSkins = allMasterVolumeSkinsData.data;
                  let skinArray = allMasterVolumeSkins.filter(entry => {
                    return((entry.month === months[now.getMonth()]) && (entry.rule.dates.indexOf(now.getDate()) !== -1));
                  });
                  if (skinArray.length === 0) {
                    skinArray.push(allMasterVolumeSkins[Math.floor(Math.random() * allMasterVolumeSkins.length)]);
                  }

                  let masterVolume = new MasterVolume(settings, skinArray[0], audioContext, infoSVG);
                  componentArr.push(masterVolume);
                  manageScaling();
                  let masterVolumeDiv = masterVolume.renderDraggable();
                  hubDiv.appendChild(masterVolumeDiv);
                });
              });
            }
            break;
          case('gain'):
            if (!rendered.gain) {
              rendered.gain = true;
              $http.get('/gains/1')
              .then(settingsData => {
                let settings = settingsData.data;
                let gainBox = document.getElementById('gainBox');
                let gainRect = gainBox.getBoundingClientRect();
                settings.positionX = (rect.left + ((rect.width/2) + 20));
                settings.positionY = gainRect.top;
                $http.get('/gain_skins')
                .then(allGainSkinsData => {
                  let allGainSkins = allGainSkinsData.data;
                  let skinArray = allGainSkins.filter(entry => {
                    return((entry.month === months[now.getMonth()]) && (entry.rule.dates.indexOf(now.getDate()) !== -1));
                  });
                  if (skinArray.length === 0) {
                    skinArray.push(allGainSkins[Math.floor(Math.random() * allGainSkins.length)]);
                  }

                  let gain = new GainModule(settings, skinArray[0], audioContext, infoSVG);
                  componentArr.push(gain);
                  manageScaling();
                  let gainDiv = gain.renderDraggable();
                  hubDiv.appendChild(gainDiv);
                });
              });
            }
            break;
          case('oscillator'):
            if (!rendered.oscillator) {
              rendered.oscillator = true;
              $http.get('/oscillators/1')
              .then(settingsData => {
                let settings = settingsData.data;
                let oscillatorBox = document.getElementById('oscillatorBox');
                let oscillatorRect = oscillatorBox.getBoundingClientRect();
                settings.positionX = (rect.left + (rect.width/2));
                settings.positionY = oscillatorRect.top;
                $http.get('/oscillator_skins')
                .then(allOscillatorSkinsData => {
                  let allOscillatorSkins = allOscillatorSkinsData.data;
                  let skinArray = allOscillatorSkins.filter(entry => {
                    return((entry.month === months[now.getMonth()]) && (entry.rule.dates.indexOf(now.getDate()) !== -1));
                  });
                  if (skinArray.length === 0) {
                    skinArray.push(allOscillatorSkins[Math.floor(Math.random() * allOscillatorSkins.length)]);
                  }

                  let oscillator = new OscillatorModule(settings, skinArray[0], audioContext, infoSVG);
                  componentArr.push(oscillator);
                  manageScaling();
                  let oscillatorDiv = oscillator.renderDraggable();
                  hubDiv.appendChild(oscillatorDiv);
                });
              });
            }
            break;
          case('test_tone'):
            if (!rendered.test_tone) {
              rendered.test_tone = true;
              $http.get('/test_tones/1')
              .then(settingsData => {
                let settings = settingsData.data;
                let testBox = document.getElementById('testBox');
                let testRect = testBox.getBoundingClientRect();
                settings.positionX = (rect.left + (rect.width/2));
                settings.positionY = testRect.top;
                $http.get('/test_tone_skins')
                .then(allTestToneSkinsData => {
                  let allTestToneSkins = allTestToneSkinsData.data;
                  let skinArray = allTestToneSkins.filter(entry => {
                    return((entry.month === months[now.getMonth()]) && (entry.rule.dates.indexOf(now.getDate()) !== -1));
                  });
                  if (skinArray.length === 0) {
                    skinArray.push(allTestToneSkins[Math.floor(Math.random() * allTestToneSkins.length)]);
                  }

                  let testTone = new TestToneModule(settings, skinArray[0], audioContext, infoSVG);
                  componentArr.push(testTone);
                  manageScaling();
                  let testToneDiv = testTone.renderDraggable();
                  hubDiv.appendChild(testToneDiv);
                });
              });
            }
            break;
          default:
            alert('unsupported module');
        }
      }


      function userLogout() {
        $http.get(`/users/${currentUserId}`)
        .then(userData=>{
          let user = userData.data;
          let storage = window.localStorage;
          storage.removeItem("freq2DomainUserID");
          storage.removeItem("freq2Expire");
          storage.removeItem(user.security.key);
          document.cookie = "freq2DomainUserID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          document.cookie = "freq2Expire=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          document.cookie = user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          $http.post('/users/logout', {})
          .then(()=>{

            $state.go('landing');
          });
        });

      }


      function initializeSpace(user) {
        let hubUserImg = document.getElementById('hubUserImg');
        let hubUserName = document.getElementById('hubUserName');

        hubUserImg.src = user.user_avatar_url;
        hubUserName.innerHTML = user.name;
      }

      function setCopyrightMessage() {
        let now = new Date();

        vm.copyrightMessage = '© 2017 - ' + now.getFullYear() + ' HurdAudio';
      }


      function onInit() {
        console.log("Info is lit");
        setCopyrightMessage();
        currentUserId = $stateParams.id;
        let theBody = document.getElementsByTagName("body")[0];
        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 1s linear;");
        // checkValidUser($stateParams.id);
        // document.getElementById("infoOnInfo").setAttribute("style", "visibility: hidden;");

        $http.get(`/users/${currentUserId}`)
        .then(userData=>{
          let user = userData.data;
          // initializeSpace(user);
        });
        // let theBody = document.getElementsByTagName("body")[0];


        // theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 1s linear;");







      }

    }

}());
