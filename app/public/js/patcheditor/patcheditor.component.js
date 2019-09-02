(function() {
  'use strict';
  var currentUserId = 0;

  function getCookie (name) {
    var cookies = document.cookie.split(';');
    for(var i=0 ; i < cookies.length ; ++i) {
      var pair = cookies[i].trim().split('=');
      if(pair[0] === name) {
        return (pair[1]);
      }
    }
    return null;
  }


  angular.module('app')
    .component('patcheditor', {
      controller: PatchEditorController,
      templateUrl: '/js/patcheditor/patcheditor.template.html'
    });

    PatchEditorController.$inject = ['$http', '$state', '$stateParams'];

    function PatchEditorController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.returnToHub = returnToHub;
      vm.userLogout = userLogout;
      vm.userProfileEditor = userProfileEditor;
      vm.navMixer = navMixer;
      vm.userPatches = [
        {
          patch: 1,
          name: "Default",
        },
        {
          patch: 2,
          name: "Sine Tones",
        },
        {
          patch: 3,
          name: "Square Wave Experiment",
        },
        {
          patch: 4,
          name: "Low Pass Drone",
        },
        {
          patch: 5,
          name: "Evolution",
        },
        {
          patch: null,
          name: "+ Add New",
        }
      ];
      vm.selectPatch = selectPatch;
      vm.loadInfo = loadInfo;

      function loadInfo() {
        $state.go('info', {id: currentUserId});
      }

      function selectPatch(index) {
        for (let i = 0; i < vm.userPatches.length; i++) {
          if (vm.userPatches[i].patch !== null) {
            if (index === (i + 1)) {
              vm.userPatches[i].selected = "patchSelected";
            } else {
              vm.userPatches[i].selected = "patchNotSelected";
            }
          }
        }
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
        let patchEditorSpace = document.getElementById('patchEditorSpace');
        let hubUserImg = document.getElementById('hubUserImg');
        let hubUserName = document.getElementById('hubUserName');

        hubUserImg.src = user.user_avatar_url;
        hubUserName.innerHTML = user.name;

        $http.get('/master_volumes/1')
        .then(settingsData => {
          let settings = settingsData.data;
          $http.get('/master_volume_skins/1')
          .then(skinData => {
            let skin = skinData.data;
            let masterVolume = new MasterVolume(settings, skin);
            let masterDiv = masterVolume.renderDraggable(0, 0);
            patchEditorSpace.appendChild(masterDiv);
          });
        })
      }

      function checkValidUser(userId) {
        let storage = window.localStorage;
        let localUser = storage.getItem('freq2DomainUserID');
        let cookieUser = getCookie('freq2DomainUserID');
        let localExpiration = new Date(storage.getItem('freq2Expire'));
        let cookieExpiration = new Date(getCookie('freq2Expire'));
        let currentTime = new Date();

        if ((localUser === undefined) || (cookieUser === null)) {
          $state.go('landing');
          return;
        }
        if (parseInt(localUser) !== parseInt(cookieUser)) {
          $state.go('landing');
          return;
        }
        if (parseInt(localUser) !== parseInt(userId)) {
          $state.go('landing');
          return;
        }
        if (localExpiration.getTime() !== cookieExpiration.getTime()) {
          $state.go('landing');
          return;
        }
        if (currentTime.getTime() > localExpiration.getTime()) {
          $state.go('landing');
          return;
        }
        currentUserId = userId;
        $http.get(`/users/${userId}`)
        .then(userData=>{
          let user = userData.data;
          let userExpiration = new Date(user.security.expire);
          if (userExpiration.getTime() !== localExpiration.getTime()) {
            $state.go('landing');
            return;
          }
          let key = user.security.key;
          let value = user.security.value;
          let localValue = storage.getItem(key);
          let cookieValue = getCookie(key);
          if (localValue !== cookieValue) {
            $state.go('landing');
            return;
          }
          if (localValue !== value) {
            $state.go('landing');
            return;
          }
          console.log('user is legit');
          initializeSpace(user);
        });

      }

      function handleSidebar() {
        let patchEditorSpace = document.getElementById('patchEditorSpace');
        let patchEditorSidebar = document.getElementById('patchEditorSidebar');

        patchEditorSpace.addEventListener('mouseout', () => {
          patchEditorSidebar.className = "pure-u-1-6 patchSideOnScreen";
        });

        patchEditorSpace.addEventListener('mouseover', () => {
          patchEditorSidebar.className = "pure-u-1-6 patchEditorSideOffScreen";
        });
      }


      function onInit() {
        console.log("Mixer is lit");
        checkValidUser($stateParams.id);
        let theBody = document.getElementsByTagName("body")[0];
        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 1s linear;");
        document.getElementById("patchEditorOnPatchEditor").setAttribute("style", "visibility: hidden;");
        currentUserId = $stateParams.id;
        handleSidebar();

        // let theBody = document.getElementsByTagName("body")[0];


        // theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 1s linear;");







      }

    }

}());
