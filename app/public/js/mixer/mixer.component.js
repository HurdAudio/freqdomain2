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
    .component('mixer', {
      controller: MixerController,
      templateUrl: '/js/mixer/mixer.template.html'
    });

    MixerController.$inject = ['$http', '$state', '$stateParams'];

    function MixerController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.returnToHub = returnToHub;
      vm.userLogout = userLogout;
      vm.userProfileEditor = userProfileEditor;
      vm.returnToHub = returnToHub;
      vm.navMixer = navMixer;
      vm.userMixerPaths = [
        {
          patch: 1,
          name: "Default",
          selected: "mixPathSelected"
        },
        {
          patch: 2,
          name: "Hard Limiter",
          selected: "mixPathNotSelected"
        },
        {
          patch: 3,
          name: "Soft Limiter",
          selected: "mixPathNotSelected"
        },
        {
          patch: 4,
          name: "Vocal Mixer",
          selected: "mixPathNotSelected"
        },
        {
          patch: 5,
          name: "Instrumental",
          selected: "mixPathNotSelected"
        },
        {
          patch: null,
          name: "+ Add New",
          selected: "newPatchSelector"
        }
      ];
      vm.selectMixPath = selectMixPath;
      vm.loadInfo = loadInfo;
      vm.navPatchEditor = navPatchEditor;
      vm.mixInfos = mixInfos;
      vm.mixInfoVisible = false;
      vm.mixInfoOn = mixInfoOn;
      vm.mixInfoOff = mixInfoOff;

      function mixInfoOff() {
        let whatIsMixer = document.getElementById('whatIsMixer');
        vm.mixInfoVisible = false;
        whatIsMixer.setAttribute("style", "opacity: 0; z-index: -5;");
      }

      function mixInfoOn() {
        let whatIsMixer = document.getElementById('whatIsMixer');
        vm.mixInfoVisible = true;
        whatIsMixer.setAttribute("style", "opacity: 1; z-index: 5;");
      }

      function mixInfos() {
        let whatIsMixer = document.getElementById('whatIsMixer');
        if (vm.mixInfoVisible) {
          vm.mixInfoVisible = false;
          whatIsMixer.setAttribute("style", "opacity: 0; z-index: -5;");
        } else {
          vm.mixInfoVisible = true;
            whatIsMixer.setAttribute("style", "opacity: 1; z-index: 5;");
        }
      }

      var audioContext = new (window.AudioContext || window.webkitAudioContext)();

      function navPatchEditor() {
        $state.go('patcheditor', {id: currentUserId});
      }

      function loadInfo() {
        $state.go('info', {id: currentUserId});
      }

      function selectMixPath(index) {
        for (let i = 0; i < vm.userMixerPaths.length; i++) {
          if (vm.userMixerPaths[i].patch !== null) {
            if (index === (i + 1)) {
              vm.userMixerPaths[i].selected = "mixPathSelected";
            } else {
              vm.userMixerPaths[i].selected = "mixPathNotSelected";
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


      function returnToHub() {
        $state.go('userhub', {id: currentUserId});
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


      function initializeSpace() {
        let signalPathEditorSpace = document.getElementById('signalPathEditorSpace');
        let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ];
        let now = new Date();
        let hubDiv = document.getElementById('hubDiv');

        $http.get('/master_volumes/1')
        .then(settingsData => {
          let settings = settingsData.data;
          $http.get('/master_volume_skins')
          .then(skinsData => {
            let skins = skinsData.data;
            let skinArr = skins.filter(entry => {
              return((entry.month === months[now.getMonth()]) && (entry.rule.dates.indexOf(now.getDate()) !== -1));
            });
            console.log(skinArr);
            if (skinArr.length < 1) {
              skinArr.push(skins[Math.floor(Math.random() * (skins.length))]);
            }
            let masterVolume = new MasterVolume(settings, skinArr[0], audioContext);
            let masterDiv = masterVolume.renderDraggable();
            hubDiv.appendChild(masterDiv);
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
        // let signalPathEditorSpace = document.getElementById('signalPathEditorSpace');
        // let mixerSidebar = document.getElementById('mixerSidebar');
        //
        // signalPathEditorSpace.addEventListener('mouseout', () => {
        //   mixerSidebar.className = "pure-u-1-6 mixerSideOnScreen";
        // });
        //
        // signalPathEditorSpace.addEventListener('mouseover', () => {
        //   mixerSidebar.className = "pure-u-1-6 mixerSideOffScreen";
        // });
      }


      function onInit() {
        console.log("Mixer is lit");
        // checkValidUser($stateParams.id);
        let theBody = document.getElementsByTagName("body")[0];
        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 1s linear;");
        // document.getElementById("mixerOnMixer").setAttribute("style", "visibility: hidden;");
        currentUserId = $stateParams.id;
        // handleSidebar();
        initializeSpace();

        // let theBody = document.getElementsByTagName("body")[0];


        // theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 1s linear;");







      }

    }

}());
