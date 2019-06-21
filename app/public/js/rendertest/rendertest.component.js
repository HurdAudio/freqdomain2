(function() {
  'use strict';
  var currentUserId = 0;
  var totalWidth = 0;
  var totalHeight = 0;
  var modDiv = [];
  var rackPositionX = 0;
  var rackPositionY = 0;
  var verticalRackPositionX = 0;
  var verticalRackPositionY = 0;
  var defaultRackPositionX = 0;
  var defaultRackPositionY = 0;
  var dafaultVerticalRackPositionX = 0;
  var defaultVerticalRackPositionY = 0;
  // var audioContext;
  var contextEnabled = false;


  angular.module('app')
    .component('rendertest', {
      controller: RenderTestController,
      templateUrl: '/js/rendertest/rendertest.template.html'
    });

    RenderTestController.$inject = ['$http', '$state', '$stateParams'];

    function RenderTestController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.renderNow = renderNow;
      vm.clearNow = clearNow;

      var audioContext = new (window.AudioContext || window.webkitAudioContext)();

      function clearNow() {
        let divHandle;
        let renderSvg = document.getElementById('renderSvg');
        activePatching = false;

        if (modDiv.length > 0) {
          while (modDiv[0]) {
            divHandle = modDiv[0];
            modDiv.splice(0, 1);
            divHandle.parentNode.removeChild(divHandle);
          }
          rackPositionX = defaultRackPositionX;
          rackPositionY = defaultRackPositionY;
          verticalRackPositionX = dafaultVerticalRackPositionX;
          verticalRackPositionY = defaultVerticalRackPositionY;
          while(renderSvg.firstChild) {
            renderSvg.removeChild(renderSvg.firstChild);
          }
        }
      }

      function renderNow() {

        if (!contextEnabled) {
          audioContext.resume().then(() => {
            console.log('Playback resumed successfully');
            contextEnabled = true;
            renderNow();
          });
          return;
        } else {
          console.log(audioContext);
        }

        let renderTestingSpace = document.getElementById('renderTestingSpace');
        let moduleSelector = document.getElementById('moduleSelector');
        let moduleSelectPath = '';
        let skinSelector = document.getElementById('skinSelector');
        let skinSelectorPath = '';
        let renderSizeSelector = document.getElementById('renderSizeSelector');
        let masterDiv;
        switch(moduleSelector.value) {
          case('MasterVolume'):
            moduleSelectPath = 'master_volumes';
            skinSelectorPath = 'master_volume_skins';
            break;
          case('GainModule'):
            moduleSelectPath = 'gains';
            skinSelectorPath = 'gain_skins';
            break;
          case('Oscillator'):
            moduleSelectPath = 'oscillators';
            skinSelectorPath = 'oscillator_skins';
            break;
          case('TestTone'):
            moduleSelectPath = 'test_tones';
            skinSelectorPath = 'test_tone_skins';
            break;
          case('DynamicCompressor'):
            moduleSelectPath = 'dynamic_compressors';
            skinSelectorPath = 'dynamic_compressor_skins';
            break;
          case('RandomNumberGenerator'):
            moduleSelectPath = 'random_number_generators';
            skinSelectorPath = 'random_number_generator_skins';
            break;
          default:
            console.log('unsupported module');
        }
        $http.get(`/${moduleSelectPath}/1`)
        .then(moduleData => {
          let settings = moduleData.data;
          $http.get(`/${skinSelectorPath}/${skinSelector.value}`)
          .then(skinData => {
            let skin = skinData.data;
            if (moduleSelector.value === 'MasterVolume') {
              let masterVolume = new MasterVolume(settings, skin, audioContext);
              if (renderSizeSelector.value === 'draggable') {
                masterDiv = masterVolume.renderDraggable();
                modDiv.push(masterDiv);
                renderTestingSpace.appendChild(masterDiv);
              }
              if (renderSizeSelector.value === 'rackHorizontal') {
                if (rackPositionY > 0) {
                  masterDiv = masterVolume.renderRackHorizontal(rackPositionX, rackPositionY);
                  rackPositionY -= 162;
                  modDiv.push(masterDiv);
                  renderTestingSpace.appendChild(masterDiv);
                }
              }
              if (renderSizeSelector.value === 'rackVertical') {
                if (verticalRackPositionX > 324) {
                  masterDiv = masterVolume.renderRackVertical(verticalRackPositionX, verticalRackPositionY);
                  verticalRackPositionX -= 162;
                  modDiv.push(masterDiv);
                  renderTestingSpace.appendChild(masterDiv);
                }
              }
            }
            if (moduleSelector.value === 'GainModule') {
              let gain = new GainModule(settings, skin, audioContext);
              if (renderSizeSelector.value === 'draggable') {
                masterDiv = gain.renderDraggable();
                modDiv.push(masterDiv);
                renderTestingSpace.appendChild(masterDiv);
              }
              if (renderSizeSelector.value === 'rackHorizontal') {
                if (rackPositionY > 0) {
                  masterDiv = gain.renderRackHorizontal(rackPositionX, rackPositionY);
                  rackPositionY -= 162;
                  modDiv.push(masterDiv);
                  renderTestingSpace.appendChild(masterDiv);
                }
              }
              if (renderSizeSelector.value === 'rackVertical') {
                if (verticalRackPositionX > 324) {
                  masterDiv = gain.renderRackVertical(verticalRackPositionX, verticalRackPositionY);
                  verticalRackPositionX -= 162;
                  modDiv.push(masterDiv);
                  renderTestingSpace.appendChild(masterDiv);
                }
              }
            }
            if (moduleSelector.value === 'Oscillator') {
              let oscillator = new OscillatorModule(settings, skin, audioContext);
              if (renderSizeSelector.value === 'draggable') {
                masterDiv = oscillator.renderDraggable();
                modDiv.push(masterDiv);
                renderTestingSpace.appendChild(masterDiv);
              }
              if (renderSizeSelector.value === 'rackHorizontal') {
                if (rackPositionY > 0) {
                  masterDiv = oscillator.renderRackHorizontal(rackPositionX, rackPositionY);
                  rackPositionY -= 162;
                  modDiv.push(masterDiv);
                  renderTestingSpace.appendChild(masterDiv);
                }
              }
              if (renderSizeSelector.value === 'rackVertical') {
                if (verticalRackPositionX > 324) {
                  masterDiv = oscillator.renderRackVertical(verticalRackPositionX, verticalRackPositionY);
                  verticalRackPositionX -= 162;
                  modDiv.push(masterDiv);
                  renderTestingSpace.appendChild(masterDiv);
                }
              }
            }
            if (moduleSelector.value === 'TestTone') {
              let testTone = new TestToneModule(settings, skin, audioContext);
              if (renderSizeSelector.value === 'draggable') {
                masterDiv = testTone.renderDraggable();
                modDiv.push(masterDiv);
                renderTestingSpace.appendChild(masterDiv);
              }
              if (renderSizeSelector.value === 'rackHorizontal') {
                if (rackPositionY > 0) {
                  masterDiv = testTone.renderRackHorizontal(rackPositionX, rackPositionY);
                  rackPositionY -= 162;
                  modDiv.push(masterDiv);
                  renderTestingSpace.appendChild(masterDiv);
                }
              }
              if (renderSizeSelector.value === 'rackVertical') {
                if (verticalRackPositionX > 324) {
                  masterDiv = testTone.renderRackVertical(verticalRackPositionX, verticalRackPositionY);
                  verticalRackPositionX -= 162;
                  modDiv.push(masterDiv);
                  renderTestingSpace.appendChild(masterDiv);
                }
              }
            }
            if (moduleSelector.value === 'DynamicCompressor') {
              let dynamicCompressor = new DynamicCompressor(settings, skin, audioContext);
              if (renderSizeSelector.value === 'draggable') {
                masterDiv = dynamicCompressor.renderDraggable();
                modDiv.push(masterDiv);
                renderTestingSpace.appendChild(masterDiv);
              }
              if (renderSizeSelector.value === 'rackHorizontal') {
                if (rackPositionY > 162) {
                  rackPositionY -= 162;
                  masterDiv =  dynamicCompressor.renderRackHorizontal(rackPositionX, rackPositionY);
                  rackPositionY -= 162;
                  modDiv.push(masterDiv);
                  renderTestingSpace.appendChild(masterDiv);
                }
              }
              if (renderSizeSelector.value === 'rackVertical') {
                verticalRackPositionX -= 162;
                if (verticalRackPositionX > 324) {
                  masterDiv = dynamicCompressor.renderRackVertical(verticalRackPositionX, verticalRackPositionY);
                  verticalRackPositionX -= 162;
                  modDiv.push(masterDiv);
                  renderTestingSpace.appendChild(masterDiv);
                } else {
                  verticalRackPositionX += 162;
                }
              }
            }
            if (moduleSelector.value === 'RandomNumberGenerator') {
              let randomNumberGenerator = new RandomNumberGenerator(settings, skin, audioContext);
              if (renderSizeSelector.value === 'draggable') {
                masterDiv = randomNumberGenerator.renderDraggable();
                modDiv.push(masterDiv);
                renderTestingSpace.appendChild(masterDiv);
              }
            }
          });
        });
      }

      function initializeDropdowns() {
        let moduleSelector = document.getElementById('moduleSelector');
        let skinSelector = document.getElementById('skinSelector');
        let skinsTable = '';
        let optionSelector;

        while (skinSelector.firstChild) {
          skinSelector.removeChild(skinSelector.firstChild);
        }
        switch(moduleSelector.value) {
          case('MasterVolume'):
            skinsTable = 'master_volume_skins';
            break;
          case('GainModule'):
            skinsTable = 'gain_skins';
            break;
          case('Oscillator'):
            skinsTable = 'oscillator_skins';
            break;
          case('TestTone'):
            skinsTable = 'test_tone_skins';
            break;
          case('DynamicCompressor'):
            skinsTable = 'dynamic_compressor_skins';
            break;
          case('RandomNumberGenerator'):
            skinsTable = 'random_number_generator_skins';
            break;
          default:
            console.log('unsupported module');
        }
        $http.get(`/${skinsTable}`)
        .then(skinsListData => {
          let skinsList = skinsListData.data;
          skinsList = skinsList.sort((a, b) => {
            return(parseInt(a.id) - parseInt(b.id));
          });
          for (let i = 0; i < skinsList.length; i++) {
            optionSelector = document.createElement('option');
            skinSelector.appendChild(optionSelector);
            optionSelector.value = skinsList[i].id;
            optionSelector.innerHTML = skinsList[i].name;
          }
          skinSelector.value = skinsList[0].id;
        });
      }



      function onInit() {
        console.log("RenderTest is lit");

        let theBody = document.getElementsByTagName("body")[0];
        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 1s linear;");
        let renderTestingSpace = document.getElementById('renderTestingSpace');
        renderTestingSpace.setAttribute("style", "position: absolute; top: 0; left: 0; width: " + window.screen.width + "px; height: " + window.screen.height + "px; overflow: hidden; display: block;");
        initializeDropdowns();
        totalWidth = screen.width;
        totalHeight = screen.height;
        console.log(totalWidth);
        console.log(totalHeight);
        rackPositionX = totalWidth - 950;
        rackPositionY = totalHeight - 320;
        verticalRackPositionX = totalWidth - 200;
        verticalRackPositionY = 10;
        defaultRackPositionX = rackPositionX;
        defaultRackPositionY = rackPositionY;
        dafaultVerticalRackPositionX = verticalRackPositionX;
        defaultVerticalRackPositionY = verticalRackPositionY;

        document.getElementById('moduleSelector').addEventListener('change', () => {
          initializeDropdowns();
        });

      }

    }

}());
