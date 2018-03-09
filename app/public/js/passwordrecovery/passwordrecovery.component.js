(function() {
  'use strict';
  var currentUserId = 0;

  function getUserId(params) {
    let index = params.indexOf('user=') + 5;
    let id = 0;
    let numStr = params.slice(index, params.indexOf('&recovery='));

    id = parseInt(numStr);

    return(id);
  }

  function getUserCode(params) {
    let index = params.indexOf('recovery=') + 9;
    let recover = params.slice(index);

    return(recover);
  }

  angular.module('app')
    .component('passwordreset', {
      controller: PasswordResetController,
      templateUrl: '/js/passwordrecovery/passwordrecovery.template.html'
    });

    PasswordResetController.$inject = ['$http', '$state', '$stateParams'];

    function PasswordResetController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;


      function setHomeButton(element) {
        element.addEventListener('click', ()=>{
          $state.go('landing');
        });
      }

      function onInit() {
        console.log("Password Reset is lit");
        console.log($stateParams.id);

        let passwordResetParams = $stateParams.id;
        let userId = getUserId(passwordResetParams);
        let userCode = getUserCode(passwordResetParams);
        if (userId === 0) {
          //TODO invalid user handling
          $state.go('landing');
        } else {
          $http.get(`/users/${userId}`)
          .then(userData=>{
            let user = userData.data;
            let userResetName = document.getElementById('userResetName');
            let emailResetAvatar = document.getElementById('emailResetAvatar');
            let userPasswordResetLine1 = document.getElementById('userPasswordResetLine1');
            let userPasswordResetLine2 = document.getElementById('userPasswordResetLine2');
            let userEmailResetForm = document.getElementById('userEmailResetForm');
            let theBody = document.getElementsByTagName("body")[0];
            let passwordResetDoneButton = document.getElementById('passwordResetDoneButton');
            userResetName.setAttribute("style", "display: initial;");
            userResetName.innerHTML = user.name;
            emailResetAvatar.setAttribute("style", "display: initial;");
            userPasswordResetLine1.setAttribute("style", "display: initial;");
            userPasswordResetLine1.value = '';
            userPasswordResetLine2.setAttribute("style", "display: initial;");
            userPasswordResetLine2.value = '';
            emailResetAvatar.src = user.user_avatar_url;
            passwordResetDoneButton.setAttribute("style", "visibility: hidden;");

            if (userCode === user.security.passwordRecovery) {
              user.security.passwordRecovery = null;
              theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 3s linear;");
              setTimeout(()=>{
                userEmailResetForm.setAttribute("style", "opacity: 1.0; transition: opacity 2s linear;");
                setTimeout(()=>{
                  userEmailResetForm.setAttribute("style", "opacity: 1.0; webkit-transform: scale(1.1) skew(0deg, 0deg); transform: scale(1.1) skew(0deg, 0deg); transition: transform 375ms linear");
                  setTimeout(()=>{
                    userEmailResetForm.setAttribute("style", "opacity: 1.0; webkit-transform: scale(1.1) skew(0deg, 0deg); transform: scale(1.1) skew(0deg, 0deg); filter: blur(); transition: filter 250ms linear;");
                  }, 1075);
                }, 2000);
              }, 2500);
              userPasswordResetLine1.focus();
              document.addEventListener('keyup', ()=>{
                if ((userPasswordResetLine1.value !== '') && (userPasswordResetLine2.value !== '')) {
                  if (userPasswordResetLine1.value === userPasswordResetLine2.value) {
                    passwordResetDoneButton.setAttribute("style", "visibility: visible;");
                  } else {
                    passwordResetDoneButton.setAttribute("style", "visibility: hidden;");
                  }
                }
              });
              passwordResetDoneButton.addEventListener('click', ()=>{
                userResetName.innerHTML = 'Please wait...';
                passwordResetDoneButton.setAttribute("style", "display: none;");
                $http.patch(`/users/passwordchange/${userId}`, {password: userPasswordResetLine1.value})
                .then(datadata=>{
                  let data = datadata.data;
                  $http.post(`/users/login`, {email: data.email, password: userPasswordResetLine1.value})
                  .then(useruserData=>{
                    let useruser = useruserData.data;
                    if ((useruser.login !== null) && (useruser.login !== 'forbidden')) {
                      userResetName.innerHTML = 'Logged In - password reset';
                      let storage = window.localStorage;
                      storage.setItem(useruser.security.key, useruser.security.value);
                      storage.setItem('freq2Expire', useruser.security.expire);
                      storage.setItem('freq2DomainUserID', useruser.id);
                      document.cookie = "freq2Expire=" + useruser.security.expire;
                      document.cookie = useruser.security.key + "=" + useruser.security.value;
                      document.cookie = "freq2DomainUserID=" + useruser.id;

                      $state.go('userhub', {id: useruser.id});
                    } else {
                      userResetName.innerHTML = 'Login Failure';
                    }
                  });
                });
              });
            } else {
              //TODO invalid code
              $state.go('landing');
            }
          });
        }

      }

    }

}());
