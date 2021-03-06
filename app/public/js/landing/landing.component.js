(function() {
  'use strict';

  function printErrorMessage(element, message, message2) {
    let currentDisplayMessage = message2;
    let currentQueueMessage = message;
    if (message === '') {
      return;
    } else {
      currentDisplayMessage += message.slice(0, 1);
      currentQueueMessage = message.slice(1);
      element.innerHTML = currentDisplayMessage;
      setTimeout(()=>{
        printErrorMessage(element, currentQueueMessage, currentDisplayMessage);
      }, 20);
    }
  }


  angular.module('app')
    .component('landing', {
      controller: LandingController,
      templateUrl: '/js/landing/landing.template.html'
    });

    LandingController.$inject = ['$http', '$state', '$stateParams'];

    function LandingController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.resetPassword = resetPassword;

      let oneGestalt = 26;
      let theDiv = document.getElementById('theDiv');
      let rValues = setAt1();
      let gValues = setAt5();
      let bValues = setAt11();
      let rValues2 = setAt3();
      let gValues2 = setAt7();
      let bValues2 = setAt13();
      let passwordVisible = false;
      let newPasswordVisible = false;
      let newPasswordRetypeVisible = false;

      function resetPassword() {
        let userEmail = document.getElementById('userEmail');
        let errorMessages = document.getElementById('errorMessages');
        errorMessages.innerHTML = '';

        $http.get(`/users`)
        .then(allUsersData=>{
          let allUsers = allUsersData.data;
          let user = allUsers.filter(entry=>{
            return(entry.email.toLowerCase() === userEmail.value.toLowerCase());
          });
          if (user.length > 0) {
            printErrorMessage(errorMessages, 'Password reset link sent to your email.', '');
            $http.post(`/users/lostpassword/${user[0].id}`, user[0])
            .then(()=>{

            });
          } else {
            printErrorMessage(errorMessages, '>ERROR : no account for this email', '');
          }
        });
      }

      function backgroundColoring(rArr, gArr, bArr, r2Arr, g2Arr, b2Arr, rad) {
        let r = rArr;
        let g = gArr;
        let b = bArr;
        let r2 = r2Arr;
        let g2 = g2Arr;
        let b2 = b2Arr;
        let deg = rad;
        if (rArr.length < 1) {
          r = rValues;
        }
        if (gArr.length < 1) {
          g = gValues;
        }
        if (bArr.length < 1) {
          b = bValues;
        }
        if (r2Arr.length < 1) {
          r2 = rValues2;
        }
        if (g2Arr.length < 1) {
          g2 = gValues2;
        }
        if (b2Arr.length < 1) {
          b2 = bValues2;
        }
        if (deg > 359) {
          deg = 0;
        }
        var str = "rgb( " + r[0] + ", " + g[0] + ", " + b[0] + "), rgb( " + r2[0] + ", " + g2[0] + ", " + b2[0] + ")";
        theDiv.setAttribute("style", "background: #22bc44; background-color: -webkit-linear-gradient(" + deg + "deg, " + str + "); background: -o-linear-gradient(" + deg + "deg, " + str + "); background: -moz-linear-gradient("+ deg + "deg, " + str + "); background: linear-gradient("+ deg + "deg, " + str + ");");
        setTimeout(()=>{
          backgroundColoring(r.slice(2), g.slice(2), b.slice(2), r2.slice(2), g2.slice(2), b2.slice(2), deg+1);
        }, 1);
      }



      function setAt13() {
        let arr = [];
        let index = 0;

        for (let i = 0; i < 255; i++) {
          for (let j = 0; j < Math.floor(oneGestalt/13); j++) {
            arr[index] = i;
            ++index;
          }
        }
        for (let i = 254; i > 0; i--) {
          for (let j = 0; j < Math.floor(oneGestalt/13); j++) {
            arr[index] = i;
            ++index;
          }
        }

        return(arr);
      }

      function setAt11() {
        let arr = [];
        let index = 0;

        for (let i = 0; i < 255; i++) {
          for (let j = 0; j < Math.floor(oneGestalt/11); j++) {
            arr[index] = i;
            ++index;
          }
        }
        for (let i = 254; i > 0; i--) {
          for (let j = 0; j < Math.floor(oneGestalt/11); j++) {
            arr[index] = i;
            ++index;
          }
        }

        return(arr);
      }

      function setAt7() {
        let arr = [];
        let index = 0;

        for (let i = 0; i < 255; i++) {
          for (let j = 0; j < Math.floor(oneGestalt/7); j++) {
            arr[index] = i;
            ++index;
          }
        }
        for (let i = 254; i > 0; i--) {
          for (let j = 0; j < Math.floor(oneGestalt/7); j++) {
            arr[index] = i;
            ++index;
          }
        }

        return(arr);
      }

      function setAt5() {
        let arr = [];
        let index = 0;

        for (let i = 0; i < 255; i++) {
          for (let j = 0; j < Math.floor(oneGestalt/5); j++) {
            arr[index] = i;
            ++index;
          }
        }
        for (let i = 254; i > 0; i--) {
          for (let j = 0; j < Math.floor(oneGestalt/5); j++) {
            arr[index] = i;
            ++index;
          }
        }

        return(arr);
      }

      function setAt3() {
        let arr = [];
        let index = 0;
        for (let i = 0; i < 255; i++) {
          for (let j = 0; j < Math.floor(oneGestalt/3); j++) {
            arr[index] = i;
            ++index;
          }
        }
        for (let i = 254; i > 0; i--) {
          for (let j = 0; j < Math.floor(oneGestalt/3); j++) {
            arr[index] = i;
            ++index;
          }
        }

        return(arr);
      }

      function setAt1() {
        let arr = [];
        let index = 0;
        for (let i = 0; i < 255; i++) {
          for (let j = 0; j < oneGestalt; j++) {
            arr[index] = i;
            ++index;
          }
        }
        for (let i = 254; i > 0; i--) {
          for (let j = 0; j <oneGestalt; j++) {
            arr[index] = i;
            ++index;
          }
        }

        return(arr);
      }

      function expandDiv(element, current, target, element2) {
        let timer = 0.02;
        if (current === target) {
          element2.setAttribute("style", "visibility: visible;");
          element.focus();
          return;
        } else {
          element.setAttribute("style", "width: " + current + "vmin; visibility: visible;");
          setTimeout(()=>{
            expandDiv(element, current + 1, target, element2);
          }, (timer * 1000));
        }

      }

      function expandPassword(element, current, target) {
        let timer = 0.02;
        if (current === target) {
          return;
        } else {
          element.setAttribute("style", "visibility: visible; width: " + current + "vmin;");
          setTimeout(()=>{
              expandPassword(element, current + 1, target);
          }, (timer * 1000));
        }
      }

      function expandNewUserEmail(element, current, target) {
        let timer = 0.02;
        if (current === target) {
          element.focus();
          return;
        } else {
          element.setAttribute("style", "visibility: visible; width: " + current + "vmin;");
          setTimeout(()=>{
            expandNewUserEmail(element, current + 1, target);
          }, (timer * 1000));
        }
      }

      function expandNewPassword(element, current, target) {
        let timer = 0.02;
        if (current === target) {
          return;
        } else {
          element.setAttribute("style", "visibility: visible; width: " + current + "vmin;");
          setTimeout(()=>{
            expandNewPassword(element, current + 1, target);
          }, (timer * 1000));
        }
      }

      function expandRetypePassword(element, current, target) {
        let timer = 0.02;
        if (current === target) {
          return;
        } else {
          element.setAttribute("style", "visibility: visible; width: " + current + "vmin;");
          setTimeout(()=>{
            expandRetypePassword(element, current + 1, target);
          }, (timer * 1000));
        }
      }

      function blingElement(element) {
        let timer = Math.random() * 30;
        element.setAttribute("style", "filter: hue-rotate(360deg); transition: filter " + timer + "s linear;");
        setTimeout(()=>{
          element.setAttribute("style", "filter: hue-rotate(0deg); transition: filter " + timer + "s linear;");
          setTimeout(()=>{
            blingElement(element);
          }, (timer * 1000));
        }, (timer * 1000));
      }

      function blurElement(element) {
        element.setAttribute("style", "filter: blur(3px); transition: filter 60s linear");
        setTimeout(()=>{
          element.setAttribute("style", "filter: blur(0px); transition: filter 60s linear");
          setTimeout(()=>{
            blurElement(element);
          }, 60000);
        }, 60000);
      }

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

      function checkUserLoggedIn() {
        let storage = window.localStorage;
        let potentialUserLocal = storage.getItem('freq2DomainUserID');
        let potentialUserCookie = getCookie('freq2DomainUserID');
        if ((potentialUserLocal === undefined) || (potentialUserCookie === null)) {
          return;
        } else {
          if (potentialUserLocal === potentialUserCookie) {
            let localExpire = new Date(storage.getItem('freq2Expire'));
            let cookieExpire = new Date(getCookie('freq2Expire'));
            let currentTime = new Date();
            if (localExpire.getTime() !== cookieExpire.getTime()) {
              return;
            }
            if (currentTime.getTime() > localExpire.getTime()) {
              return;
            }
            $http.get(`/users/${potentialUserLocal}`)
            .then(userData=>{
              let user = userData.data;
              let userExpire = new Date(user.security.expire);
              if (userExpire.getTime() !== localExpire.getTime()) {
                return;
              }
              let key = user.security.key;
              let value = user.security.value;
              if (storage.getItem(key) !== value) {
                return;
              }
              if (getCookie(key) !== value) {
                return;
              }
              $state.go('userhub', {id: user.id});
            });
          } else {
            return;
          }
        }
      }


      function onInit() {
        console.log("Landing is lit");
        checkUserLoggedIn();
        let theBody = document.getElementsByTagName("body")[0];
        theBody.setAttribute("style", "filter: hue-rotate(0deg);");
        let forgotPassword = document.getElementById('forgotPassword');
        let errorMessages = document.getElementById('errorMessages');
        let loginButton = document.getElementById('loginButton');
        let userEmail = document.getElementById('userEmail');
        let loginExit = document.getElementById('loginExit');
        let userPassword = document.getElementById('userPassword');
        let loginSub = document.getElementById('loginSub');
        let newUserAccountStart = document.getElementById('newUserAccountStart');
        let newUserEmail = document.getElementById('newUserEmail');
        let newExit = document.getElementById('newExit');
        let newUserPassword = document.getElementById('newUserPassword');
        let newUserRetypePassword = document.getElementById('newUserRetypePassword');
        let newSub = document.getElementById('newSub');

        let top = document.getElementById('top');
        let newUser = document.getElementById('newUser');
        let login = document.getElementById('login');
        let topBlocker = document.getElementById('topBlocker');
        let leftBlock = document.getElementById('leftBlock');
        let rightBlock = document.getElementById('rightBlock');
        let bottomBlock = document.getElementById('bottomBlock');
        let title = document.getElementById('title');

        backgroundColoring(rValues, gValues, bValues, rValues2, gValues2, bValues2, 0);
        blingElement(top);
        blurElement(title);

        newUserAccountStart.addEventListener('click', ()=>{
          newUserAccountStart.setAttribute("style", "visibility: hidden;");
          expandNewUserEmail(newUserEmail, 1, 27);
          newExit.setAttribute("style", "visibility: visible;");
        });

        newSub.addEventListener('click', ()=>{
          $http.get('users')
          .then(usersData=>{
            let users = usersData.data;
            let userFilt = users.filter(email=>{
              return (email.email === newUserEmail.value);
            });
            if (userFilt.length > 0) {
              printErrorMessage(errorMessages, '>ERROR : account already exists for this email', '');
              return;
            }
            if ((newUserPassword.value !== '') && (newUserRetypePassword.value !== '')) {
              if (newUserPassword.value !== newUserRetypePassword.value) {
                //error handling
                printErrorMessage(errorMessages, '>ERROR (409): password entries mismatch.', '');
                return;
              }
            } else {
              printErrorMessage(errorMessages, '>ERROR (409): password cannot be blank', '');
              return;
            }
            let createUser = {
              name: '',
              email: newUserEmail.value,
              password: newUserPassword.value,
              is_admin: false,
              user_avatar_url: '',
              associates: null,
            };
            printErrorMessage(errorMessages, '>Processing... please wait...', '');
            $http.post('/users', createUser)
            .then(userData=>{
              let user = userData.data[0];
              printErrorMessage(errorMessages, '>Please check your email for verification link.', '');
              $http.post(`/users/newuserconfirm/${user.id}`, {})
              .then(()=>{
                console.log('email sent');
              });
            });
          });

        });

        newExit.addEventListener('click', ()=>{
          newUserAccountStart.setAttribute("style", "visibility: visible;");
          newUserEmail.setAttribute("style", "visibility: hidden;");
          newUserEmail.value = '';
          newExit.setAttribute("style", "visibility: hidden;");
          newUserPassword.value = '';
          newUserPassword.setAttribute("style", "visibiltiy: hidden;");
          newPasswordVisible = false;
          newUserRetypePassword.setAttribute("style", "visibility: hidden;");
          newPasswordRetypeVisible = false;
          newUserRetypePassword.value = '';
          newSub.setAttribute("style", "visibility: hidden;");
          errorMessages.innerHTML = '';
        });

        loginButton.addEventListener('click', ()=>{

          loginButton.setAttribute("style", "visibility: hidden;");
          userEmail.setAttribute("style", "visibility: visible;");
          expandDiv(userEmail, 1, 26, loginExit);

        });

        loginExit.addEventListener('click', ()=>{

          loginExit.setAttribute("style", "visibility: hidden;");
          loginButton.setAttribute("style", "visibility: visible;");
          userEmail.setAttribute("style", "visibility: hidden;");
          userPassword.setAttribute("style", "visibility: hidden;");
          loginSub.setAttribute("style", "visibility: hidden;");
          forgotPassword.setAttribute("style", "visibility: hidden;");
          passwordVisible = false;
          userEmail.value = '';
          userPassword.value = '';

        });

        loginSub.addEventListener('click', ()=>{
          $http.get('/users')
          .then(allUsersData=>{
            let allUsers = allUsersData.data;
            let specificUser = allUsers.filter(entry=>{
              return(entry.email === userEmail.value);
            });
            if (specificUser.length === 1) {
              let subObj = {
                email: userEmail.value,
                password: userPassword.value
              };
              forgotPassword.setAttribute("style", "visibility: hidden;");
              printErrorMessage(errorMessages, '>Please wait, logging in...', '');
              $http.post('/users/login', subObj)
              .then(userData=>{
                let user = userData.data;
                if (user.login === undefined) {
                  if (user.login !== 'forbidden') {
                    if (user.email_reset === null) {
                      let storage = window.localStorage;
                      storage.setItem(user.security.key, user.security.value);
                      storage.setItem('freq2Expire', user.security.expire);
                      storage.setItem('freq2DomainUserID', user.id);
                      document.cookie = "freq2Expire=" + user.security.expire;
                      document.cookie = user.security.key + "=" + user.security.value;
                      document.cookie = "freq2DomainUserID=" + user.id;
                      console.log('user is logged in');
                      printErrorMessage(errorMessages, '>User is logged in.', '');
                      $http.patch(`/users/${user.id}`, {security: user.security, email_confirm: null})
                      .then(()=>{
                        console.log('patched');
                        $state.go('userhub', {id: user.id});
                      });
                    } else {
                      if (!user.email_reset.confirm) {
                        printErrorMessage(errorMessages, '>Please verify email.', '');
                        forgotPassword.setAttribute("style", "visibility: visible;");
                      } else {
                        let storage = window.localStorage;
                        storage.setItem(user.security.key, user.security.value);
                        storage.setItem('freq2Expire', user.security.expire);
                        storage.setItem('freq2DomainUserID', user.id);
                        document.cookie = "freq2Expire=" + user.security.expire;
                        document.cookie = user.security.key + "=" + user.security.value;
                        document.cookie = "freq2DomainUserID=" + user.id;
                        console.log('user is logged in');
                        printErrorMessage(errorMessages, '>User is logged in.', '');
                        $http.patch(`/users/${user.id}`, {security: user.security, email_confirm: null})
                        .then(()=>{
                          console.log('patched');
                          $state.go('userhub', {id: user.id});
                        });
                      }
                    }
                  } else {
                    printErrorMessage(errorMessages, '>ERROR - Login Failed.', '');
                    forgotPassword.setAttribute("style", "visibility: visible;");
                  }
                } else {
                  printErrorMessage(errorMessages, '>ERROR - Login Failed.', '');
                  forgotPassword.setAttribute("style", "visibility: visible;");
                }
              });
            } else {
              printErrorMessage(errorMessages, '>ERROR - Login Failed.', '');
              forgotPassword.setAttribute("style", "visibility: visible;");
            }
          });


        });

        document.addEventListener('keyup', ()=>{
          if (newUserRetypePassword.value !== '') {
            newSub.setAttribute("style", "visibility: visible;");
          } else {
            newSub.setAttribute("style", "visibility: hidden;");
          }
          if (newUserPassword.value !== '') {
            if (!newPasswordRetypeVisible) {
              expandRetypePassword(newUserRetypePassword, 1, 27);
              newPasswordRetypeVisible = true;
            }
          } else {
            newUserRetypePassword.setAttribute("style", "hidden;");
            newPasswordRetypeVisible = false;
          }
          if (newUserEmail.value.indexOf('@') !== -1) {
            if (newUserEmail.value.indexOf('@') < (newUserEmail.value.length - 2)) {
              if (!newPasswordVisible) {
                  expandNewPassword(newUserPassword, 1, 27);
                newPasswordVisible = true;
              }
            }
          } else {
            newUserPassword.setAttribute("style", "visibility: hidden;");
            newPasswordVisible = false;
          }
          if (userEmail.value.indexOf('@') !== -1) {
            if (userEmail.value.indexOf('@') < (userEmail.value.length - 2)) {
              if (userEmail.value.indexOf('.') !== -1) {
                if (!passwordVisible) {
                  expandPassword(userPassword, 1, 26);
                  passwordVisible = true;
                  forgotPassword.setAttribute("style", "visibility: visible;");
                }
              }
            } else {
              userPassword.setAttribute("style", "visibility: hidden;");
              forgotPassword.setAttribute("style", "visibility: hidden;");
              passwordVisible = false;
            }
          } else {
            userPassword.setAttribute("style", "visibility: hidden;");
            forgotPassword.setAttribute("style", "visibility: hidden;");
            passwordVisible = false;
          }
          if (userPassword.value !== '') {
            loginSub.setAttribute("style", "visibility: visible;");
          }
        });
      }

    }

}());
