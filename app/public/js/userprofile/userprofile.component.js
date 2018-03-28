(function() {
  'use strict';
  var currentUserId = 0;


  angular.module('app')
    .component('userprofile', {
      controller: UserProfileController,
      templateUrl: '/js/userprofile/userprofile.template.html'
    });

    UserProfileController.$inject = ['$http', '$state', '$stateParams'];

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

    function UserProfileController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.userLogout = userLogout;
      vm.returnToHub = returnToHub;
      vm.displayUserInfos = displayUserInfos;
      vm.undisplayUserInfos = undisplayUserInfos;
      vm.displayFriendsInfos = displayFriendsInfos;
      vm.undisplayFriendInfos = undisplayFriendInfos;
      vm.displayStatsInfos = displayStatsInfos;
      vm.undisplayStatsInfos = undisplayStatsInfos;
      vm.displayContactInfos = displayContactInfos;
      vm.undisplayContactInfos = undisplayContactInfos;

      function undisplayContactInfos() {
        let displayContactInfosButton = document.getElementById('displayContactInfosButton');
        let displayContactFormInfosFields = document.getElementById('displayContactFormInfosFields');

        displayContactFormInfosFields.setAttribute("style", "height: 0px; transition: height 0.5s linear;");
        setTimeout(()=>{
          displayContactInfosButton.setAttribute("style", "display: initial;");
        }, 500);

      }

      function displayContactInfos() {
        let displayContactInfosButton = document.getElementById('displayContactInfosButton');
        let displayContactFormInfosFields = document.getElementById('displayContactFormInfosFields');

        undisplayStatsInfos();
        undisplayFriendInfos();
        undisplayUserInfos();

        displayContactInfosButton.setAttribute("style", "display: none;");
        displayContactFormInfosFields.setAttribute("style", "height: 510px; transition: height 0.5s linear;");
      }

      function undisplayStatsInfos() {
        let displayStatsInfosButton = document.getElementById('displayStatsInfosButton');
        let displayStatsInfosFields = document.getElementById('displayStatsInfosFields');

        displayStatsInfosFields.setAttribute("style", "height: 0px; transition: height 0.5s linear;");
        setTimeout(()=>{
          displayStatsInfosButton.setAttribute("style", "display: initial;");
        }, 500);
      }

      function displayStatsInfos() {
        let displayStatsInfosButton = document.getElementById('displayStatsInfosButton');
        let displayStatsInfosFields = document.getElementById('displayStatsInfosFields');

        undisplayFriendInfos();
        undisplayUserInfos();
        undisplayContactInfos();

        displayStatsInfosButton.setAttribute("style", "display: none;");
        displayStatsInfosFields.setAttribute("style", "height: 510px; transition: height 0.5s linear;");
      }

      function undisplayFriendInfos() {
        let displayFriendsInfosButton = document.getElementById('displayFriendsInfosButton');
        let friendsInfosFields = document.getElementById('friendsInfosFields');

        friendsInfosFields.setAttribute("style", "height: 0px; transition: height 0.5s linear;");
        setTimeout(()=>{
          displayFriendsInfosButton.setAttribute("style", "display: initial;");
        }, 500);
      }

      function displayFriendsInfos() {
        let displayFriendsInfosButton = document.getElementById('displayFriendsInfosButton');
        let friendsInfosFields = document.getElementById('friendsInfosFields');

        undisplayUserInfos();
        undisplayStatsInfos();
        undisplayContactInfos();
        displayFriendsInfosButton.setAttribute("style", "display: none;");
        friendsInfosFields.setAttribute("style", "height: 510px; transition: height 0.5s linear;");
      }

      function undisplayUserInfos() {
        let displayUserInfosButton = document.getElementById('displayUserInfosButton');
        let userInfosFields = document.getElementById('userInfosFields');

        userInfosFields.setAttribute("style", "height: 0px; transition: height 0.5s linear;");
        setTimeout(()=>{
          displayUserInfosButton.setAttribute("style", "display: initial;");
        }, 500);
      }

      function displayUserInfos() {
        let displayUserInfosButton = document.getElementById('displayUserInfosButton');
        let userInfosFields = document.getElementById('userInfosFields');

        undisplayFriendInfos();
        undisplayStatsInfos();
        undisplayContactInfos();

        displayUserInfosButton.setAttribute("style", "display: none;");
        userInfosFields.setAttribute("style", "height: 510px; transition: height 0.5s linear;");
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
        let sinceDate = new Date(user.created_at);
        let hubUserImg = document.getElementById('hubUserImg');
        let hubUserName = document.getElementById('hubUserName');
        let userPictureSlot = document.getElementById('userPictureSlot');
        let userNameSlot = document.getElementById('userNameSlot');
        let userProfileTag = document.getElementById('userProfileTag');
        let adminButton = document.getElementById('adminButton');
        let userProfileAvatarField = document.getElementById('userProfileAvatarField');
        let userProfileNameField = document.getElementById('userProfileNameField');
        let userProfileEmailField = document.getElementById('userProfileEmailField');

        if (!user.is_admin) {
          adminButton.setAttribute("style", "display: none;");
        }
        userProfileAvatarField.value = user.user_avatar_url;
        userProfileNameField.value = user.name;
        userProfileEmailField.value = user.email;

        hubUserImg.setAttribute("style", "visibility: hidden;");
        hubUserName.setAttribute("style", "visibility: hidden;");

        hubUserImg.src = user.user_avatar_url;
        userPictureSlot.src = user.user_avatar_url;
        hubUserName.innerHTML = user.name;
        userNameSlot.innerHTML = user.name;
        userProfileTag.innerHTML = 'User since ' + sinceDate.getFullYear();
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




      function onInit() {
        console.log("User Profile is lit");
        checkValidUser($stateParams.id);
        let theBody = document.getElementsByTagName("body")[0];


        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 1s linear;");





      }

    }

}());
