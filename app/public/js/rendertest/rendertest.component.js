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

      function clearNow() {
        let divHandle;

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
        }
      }

      function renderNow() {
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
              let masterVolume = new MasterVolume(settings, skin);
              if (renderSizeSelector.value === 'draggable') {
                masterDiv = masterVolume.renderDraggable(totalWidth, totalHeight);
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


              // let masterVolumeDiv = masterVolume(renderDraggable);
              // renderTestingSpace.appendChild(newmasterVolumeDivDiv)
              // masterVolumeDiv.setAttribute("style", "position: absolute; left: " + (totalWidth - 400) + "px; top: " + (totalHeight - 500) + "px;");
            }
          });
        });
        // let renderTestingSpace = document.getElementById('renderTestingSpace');
        // let div = document.createElement('div');
        // let handle = document.createElement('div');
        //
        // renderTestingSpace.appendChild(div);
        // div.appendChild(handle);
        // div.setAttribute("style", "position: absolute; left: " + (totalWidth - 400) + "px; top: " + (totalHeight - 500) + "px; background: #ffffff; width: 300px; height: 300px;");
        // handle.setAttribute("style", "width: 100%; background: blue; height: 50px; cursor: move;");
        //
        // dragElement(div);
        //
        // function dragElement(element) {
        //   let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        //   if (handle) {
        //     handle.onmousedown = dragMouseDown;
        //   } else {
        //     element.onmousedown = dragMouseDown;
        //   }
        //
        //   function dragMouseDown(e) {
        //     e = e || window.event;
        //     e.preventDefault();
        //     // get the mouse cursor position at startup:
        //     pos3 = e.clientX;
        //     pos4 = e.clientY;
        //     document.onmouseup = closeDragElement;
        //     // call a function whenever the cursor moves:
        //     document.onmousemove = elementDrag;
        //   }
        //
        //   function elementDrag(e) {
        //     e = e || window.event;
        //     e.preventDefault();
        //     // calculate the new cursor position:
        //     pos1 = pos3 - e.clientX;
        //     pos2 = pos4 - e.clientY;
        //     pos3 = e.clientX;
        //     pos4 = e.clientY;
        //     // set the element's new position:
        //     element.style.top = (element.offsetTop - pos2) + "px";
        //     element.style.left = (element.offsetLeft - pos1) + "px";
        //   }
        //
        //   function closeDragElement() {
        //     // stop moving when mouse button is released:
        //     document.onmouseup = null;
        //     document.onmousemove = null;
        //     console.log(pos1);
        //     console.log(pos2);
        //     console.log(pos3);
        //     console.log(pos4);
        //   }
        // }



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
          default:
            console.log('unsupported module');
        }
        $http.get(`/${skinsTable}`)
        .then(skinsListData => {
          let skinsList = skinsListData.data;
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

      }

    }

}());
