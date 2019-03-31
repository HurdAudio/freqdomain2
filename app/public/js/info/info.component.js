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
