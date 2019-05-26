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
        master_volume: false
      };

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
        let div = document.getElementById(moduleDiv);
        let rect = div.getBoundingClientRect();
        console.log(rect);
        switch(moduleType) {
          case('master_volume'):
            if (!rendered.master_volume) {
              rendered.master_volume = true;
              $http.get('/master_volumes/1')
              .then(settingsData => {
                let settings = settingsData.data;
                settings.positionX = (rect.left + ((rect.width/2) + 20));
                settings.positionY = (rect.top - (13 * (rect.height/14)));
                $http.get('/master_volume_skins')
                .then(allMasterVolumeSkinsData => {
                  let allMasterVolumeSkins = allMasterVolumeSkinsData.data;
                  let skinArray = allMasterVolumeSkins.filter(entry => {
                    return((entry.month === months[now.getMonth()]) && (entry.rule.dates.indexOf(now.getDate()) !== -1));
                  });
                  if (skinArray.length === 0) {
                    skinArray.push(allMasterVolumeSkins[Math.floor(Math.random() * allMasterVolumeSkins.length)]);
                  }

                  let masterVolume = new MasterVolume(settings, skinArray[0], audioContext);
                  let masterVolumeDiv = masterVolume.renderDraggable();
                  div.appendChild(masterVolumeDiv);
                  // masterVolumeDiv.setAttribute("style", "position: relative;");
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
