(function() {
  'use strict';
  var currentUserId = 0;

  angular.module('app')
    .component('emailconfirm', {
      controller: EmailconfirmController,
      templateUrl: '/js/emailconfirm/emailconfirm.template.html'
    });

    EmailconfirmController.$inject = ['$http', '$state', '$stateParams'];

    function EmailconfirmController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;


      function setHomeButton(element) {
        element.addEventListener('click', ()=>{
          $state.go('landing');
        });
      }

      function onInit() {
        console.log("Emailconfirm is lit");
        // console.log($stateParams.id);

        let emailConfirmationCode = $stateParams.id;
        let newUserForm = document.getElementById('newUserForm');
        let theBody = document.getElementsByTagName("body")[0];
        let emailConfirmEmail = document.getElementById('emailConfirmEmail');
        let emailConfirmHeadline = document.getElementById('emailConfirmHeadline');
        let emailConfirmInputUserName = document.getElementById('emailConfirmInputUserName');
        let emailConfirmUserAvatarURL = document.getElementById('emailConfirmUserAvatarURL');
        let emailConfirmUploadAvatar = document.getElementById('emailConfirmUploadAvatar');
        let confirmEmailDoneButton = document.getElementById('confirmEmailDoneButton');
        let emailConfirmUserProfileAvatar = document.getElementById('emailConfirmUserProfileAvatar');
        // console.log(theBody);

        $http.get('/users')
        .then(allUsersData=>{
          let allUsers = allUsersData.data;
          let currentUser = allUsers.filter(user=>{
            if (user.email_reset !== null) {
              if (!user.email_reset.confirm) {
                return(user.email_reset.initialize_account === emailConfirmationCode);
              }
            }
          });
          if (currentUser.length !== 1) {
            emailConfirmHeadline.setAttribute("style", "font-family: 'Raleway', sans-serif; font-size: 36px; margin-top: 20vmin;");
            emailConfirmHeadline.innerHTML = '>ERROR(403): ACCESS FORBIDDEN';
            emailConfirmInputUserName.setAttribute("style", "display: none;");
            emailConfirmUserAvatarURL.setAttribute("style", "display: none;");
            emailConfirmUploadAvatar.setAttribute("style", "display: none;");
            emailConfirmUserProfileAvatar.setAttribute("style", "display: none;");
            emailConfirmEmail.setAttribute("style", "font-family: 'Raleway', sans-serif;");
            emailConfirmEmail.innerHTML = 'link has expired. please try logging in or requesting a password reset.';
            confirmEmailDoneButton.innerHTML = 'return';
            theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 3s linear;");
            setTimeout(()=>{
              newUserForm.setAttribute("style", "opacity: 1.0; transition: opacity 2s linear;");
              setTimeout(()=>{
                newUserForm.setAttribute("style", "opacity: 1.0; webkit-transform: scale(1.1) skew(0deg, 0deg); transform: scale(1.1) skew(0deg, 0deg); transition: transform 375ms linear");
                setTimeout(()=>{
                  newUserForm.setAttribute("style", "opacity: 1.0; webkit-transform: scale(1.1) skew(0deg, 0deg); transform: scale(1.1) skew(0deg, 0deg); filter: blur(); transition: filter 250ms linear;");
                  setHomeButton(confirmEmailDoneButton);
                }, 375);
              }, 2000);
            }, 2500);
          } else {
            currentUserId = currentUser[0].id;
            let subObj = {
              email_reset: {
                confirm: true
              }
            };
            $http.patch(`/users/newuser/${currentUserId}`, subObj)
            .then(()=>{
              emailConfirmEmail.innerHTML = currentUser[0].email + ': confirmed';
              theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 6s linear;");
              setTimeout(()=>{
                newUserForm.setAttribute("style", "opacity: 1.0; transition: opacity 6s linear;");
                setTimeout(()=>{
                  newUserForm.setAttribute("style", "opacity: 1.0; webkit-transform: scale(0.9) skew(-20deg, 0deg); transform: scale(0.9) skew(-20deg, 0deg); transition: transform 750ms linear");
                  setTimeout(()=>{
                    newUserForm.setAttribute("style", "opacity: 1.0; webkit-transform: scale(0.9) skew(-20deg, 0deg); transform: scale(0.9) skew(-20deg, 0deg); filter: blur(); transition: filter 500ms linear;");
                  }, 750);
                }, 6000);
              }, 5000);

              emailConfirmInputUserName.addEventListener('focusout', ()=>{
                let subObj = {
                  name: emailConfirmInputUserName.value
                };
                $http.patch(`/users/${currentUserId}`, subObj)
                .then(()=>{
                  console.log('patched');
                });
              });

              emailConfirmUserAvatarURL.addEventListener('focusout', ()=>{
                let subObj = {
                  user_avatar_url: emailConfirmUserAvatarURL.value
                };
                emailConfirmUserProfileAvatar.src = emailConfirmUserAvatarURL.value;
                $http.patch(`/users/${currentUserId}`, subObj)
                .then(()=>{
                  console.log('patched');
                });
              });

              confirmEmailDoneButton.addEventListener('click', ()=>{
                let expire = new Date();
                expire.setDate(expire.getDate() + 3);
                let subObj = {
                  security: {
                    key: currentUser[0].security.key,
                    value: currentUser[0].security.value,
                    expire: expire
                  },
                  email_reset: null
                };
                $http.patch(`/users/${currentUserId}`, subObj)
                .then(userData=>{
                  let user = userData.data;
                  let storage = window.localStorage;
                  storage.setItem(user.security.key, user.security.value);
                  storage.setItem('freq2Expire', user.security.expire);
                  storage.setItem('freq2DomainUserID', user.id);
                  document.cookie = "freq2Expire=" + user.security.expire;
                  document.cookie = user.security.key + "=" + user.security.value;
                  document.cookie = "freq2DomainUserID=" + user.id;
                  emailConfirmHeadline.innerHTML = 'user is logged in';
                  $state.go('userhub', (id: user.id));
                });

              });
            });

          }
        });
      }

    }

}());
