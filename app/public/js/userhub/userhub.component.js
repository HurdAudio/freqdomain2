(function() {
  'use strict';
  var currentUserId = 0;
  var newsArray = [ 'FreqDomain2 is currently in pre-production.', 'Currently working on: Oscillator - module 3.', 'LAA 2 ARI 3 in the top of the 6th inning in Arizona.', 'Impeachment proceedings pick up momentum as the US Senate prepares for a vote', 'Frequency Hertz so good...', 'Welcome to FreqDomain2 HUB', 'Social media guru expires in 280 characters', 'Bloodbath ensues in Tunisia after clerics attempt coup.', 'This is FreqDomain2 Headline News - the only place for news that matters to freqs', '' ];

  angular.module('app')
    .component('userhub', {
      controller: UserHubController,
      templateUrl: '/js/userhub/userhub.template.html'
    });

    UserHubController.$inject = ['$http', '$state', '$stateParams'];

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

    function UserHubController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;

      function initializeSpace(user) {
        let hubUserImg = document.getElementById('hubUserImg');
        let hubUserName = document.getElementById('hubUserName');

        hubUserImg.src = user.user_avatar_url;
        hubUserName.innerHTML = user.name;
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

      function dynamicNewsTicker(element, news, width) {
        let delay = 150;
        let display = news.slice(0, width);
        let nextNews = news.slice(1) + news[0];
        element.innerHTML = display;
        if (display[0] === ' ') {
          delay = delay * 2;
        }
        setTimeout(()=>{
          dynamicNewsTicker(element, nextNews, width);
        }, delay);

      }

      function runNewsTicker() {
        let headlineNews = document.getElementById('headlineNews');
        let newsString = '';
        let characterWidth = 100;

        if (newsArray.length === 0) {
          return;
        }
        if (newsArray.length === 1) {
          headlineNews.innerHTML = newsArray[0];
        }
        for (let i = 0; i < newsArray.length; i++) {
          newsString += '>';
          newsString += newsArray[i];
          newsString += ' • • • • • | • • • • • | • • • • • | • • • • • '
        }
        if (newsString.length < characterWidth) {
          headlineNews.innerHTML = newsString;
        } else {
          dynamicNewsTicker(headlineNews, newsString, characterWidth);
        }
      }

      function onInit() {
        console.log("User Hub is lit");
        checkValidUser($stateParams.id);
        let theBody = document.getElementsByTagName("body")[0];
        let hubMessageSpace = document.getElementById('hubMessageSpace');
        let hubUpdatesSpace = document.getElementById('hubUpdatesSpace');

        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 5s linear;");
        runNewsTicker();
        setTimeout(()=>{
          hubMessageSpace.setAttribute("style", "opacity: 0.9; filter: hue-rotate(0deg); transition: all 3s linear;");
          setTimeout(()=>{
            hubUpdatesSpace.setAttribute("style", "opacity: 0.9; filter: hue-rotate(0deg); transition: all 3s linear;");
          }, 2000);
        }, 3000);




      }

    }

}());
