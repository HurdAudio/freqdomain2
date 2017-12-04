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
          element2.setAttribute("style", "visibility: visible; margin: 1vmin; margin-left: 0; margin-top: 12vmin; width: 40%; padding-left: 1vmin;");
          element.focus();
          return;
        } else {
          element.setAttribute("style", "width: " + current + "vmin; visibility: visible; margin: 5vmin; margin-left: 2vmin; margin-top: 10vmin; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 35deg); font-family: 'Oswald', sans-serif; font-size: 24px; border-radius: 5px; color: #7DF9FF; background: #E4E4DF; background-color: -webkit-linear-gradient(90deg, #877A67, #E4E4DF); background: -o-linear-gradient(90deg, #877A67, #E4E4DF); background: -moz-linear-gradient(90deg, #877A67, #E4E4DF); background: linear-gradient(90deg, #877A67, #E4E4DF);");
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
          element.setAttribute("style", "visibility: visible; margin: 5vmin; margin-left: 2vmin; margin-top: -11vmin; webkit-transform: skew(0deg, 45deg); transform: skew(0deg, 35deg); font-family: 'Oswald', sans-serif; font-size: 24px; width: " + current + "vmin; border-radius: 5px; color: #7DF9FF; background: #E4E4DF; background-color: -webkit-linear-gradient(90deg, #877A67, #E4E4DF); background: -o-linear-gradient(90deg, #877A67, #E4E4DF); background: -moz-linear-gradient(90deg, #877A67, #E4E4DF); background: linear-gradient(90deg, #877A67, #E4E4DF);");
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
          element.setAttribute("style", "visibility: visible; margin-left: 39vmin; margin-top: 11vmin; webkit-transform: skew(0deg, -45deg); transform: skew(0deg, -35deg); font-family: 'Oswald', sans-serif; font-size: 24px; width: " + current + "vmin; border-radius: 5px; color: #7DF9FF; background: #E4E4DF; background-color: -webkit-linear-gradient(90deg, #877A67, #E4E4DF); background: -o-linear-gradient(90deg, #877A67, #E4E4DF); background: -moz-linear-gradient(90deg, #877A67, #E4E4DF); background: linear-gradient(90deg, #877A67, #E4E4DF);");
          setTimeout(()=>{
            expandNewUserEmail(element, current + 1, target);
          }, (timer * 1000));
        }
      }

      function expandNewPassword(element, current, target) {
        let timer = 0.02;
        let addAccountButtons = document.getElementById('addAccountButtons');
        if (current === target) {
          return;
        } else {
          element.setAttribute("style", "visibility: visible; margin-left: 39vmin; margin-top: 1.5vmin; webkit-transform: skew(0deg, -45deg); transform: skew(0deg, -35deg); font-family: 'Oswald', sans-serif; font-size: 24px; width: " + current + "vmin; border-radius: 5px; color: #7DF9FF; background: #E4E4DF; background-color: -webkit-linear-gradient(90deg, #877A67, #E4E4DF); background: -o-linear-gradient(90deg, #877A67, #E4E4DF); background: -moz-linear-gradient(90deg, #877A67, #E4E4DF); background: linear-gradient(90deg, #877A67, #E4E4DF);");
          addAccountButtons.setAttribute("style", "margin-top: -11.5vmin;");
          setTimeout(()=>{
            expandNewPassword(element, current + 1, target);
          }, (timer * 1000));
        }
      }

      function expandRetypePassword(element, current, target) {
        let timer = 0.02;
        let addAccountButtons = document.getElementById('addAccountButtons');
        if (current === target) {
          return;
        } else {
          element.setAttribute("style", "visibility: visible; margin-left: 39vmin; margin-top: 1vmin; webkit-transform: skew(0deg, -45deg); transform: skew(0deg, -35deg); font-family: 'Oswald', sans-serif; font-size: 24px; width: " + current + "vmin; border-radius: 5px; color: #7DF9FF; background: #E4E4DF; background-color: -webkit-linear-gradient(90deg, #877A67, #E4E4DF); background: -o-linear-gradient(90deg, #877A67, #E4E4DF); background: -moz-linear-gradient(90deg, #877A67, #E4E4DF); background: linear-gradient(90deg, #877A67, #E4E4DF);");
          addAccountButtons.setAttribute("style", "margin-top: -10.5vmin;");
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


      function onInit() {
        console.log("Landing is lit");
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
        console.log(Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
        console.log(Math.max(document.documentElement.clientHeight, window.innerHeight));
        let displayWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let displayHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        let squareSize;

        let frame = document.getElementById('frame');
        let top = document.getElementById('top');
        let newUser = document.getElementById('newUser');
        let login = document.getElementById('login');
        let topBlocker = document.getElementById('topBlocker');
        let leftBlock = document.getElementById('leftBlock');
        let rightBlock = document.getElementById('rightBlock');
        let bottomBlock = document.getElementById('bottomBlock');
        let title = document.getElementById('title');
        let git = document.getElementById('git');
        if (displayWidth > displayHeight) {
          squareSize = (displayWidth * 0.173611111111111);
        } else {
          squareSize = (displayHeight * 0.173611111111111);
        }

        if (displayWidth > 1024) {

          frame.setAttribute("style", "width: " + (displayWidth * 0.912) + "px; height: " + (displayHeight * 0.84) + "px; margin: " + (displayHeight - 5) + "px " + (displayWidth - 5) + "px + " + (displayHeight - 5) + "px "  + (displayWidth - 5) + "px;");
          top.setAttribute("style", "bottom: " + (displayHeight * 0.5004) + "px; right: " + (displayWidth * 0.41) + "px; height: " + squareSize + "px; width: " + squareSize + "px;");
          newUser.setAttribute("style", "bottom: " + (displayHeight * 0.3158) + "px; left: " + (displayWidth * 0.40225) + "px; height: " + squareSize + "px;");
          login.setAttribute("style", "bottom: " + (displayHeight * 0.3148) + "px; right: " + (displayWidth * 0.3783) + "px; height: " + squareSize + "px;");
          topBlocker.setAttribute("style", "width: " + (displayWidth * 0.92) + "px; height: " + (displayHeight * 0.2257) + "px;");
          leftBlock.setAttribute("style", "width: " + (displayWidth * 0.3637) +"px; height: " + (displayHeight * 0.6476) + "px; top: " + (displayHeight * 0.2827) + "px; left: " + (displayWidth * 0.04) + "px;");
          rightBlock.setAttribute("style", "width: " + (displayWidth * 0.3428) + "px; height: " + (displayHeight * 0.6476) + "px; top: " + (displayHeight * 0.2827) + "px; right: " + (displayWidth * 0.0360) + "px;");
          bottomBlock.setAttribute("style", "width: " + (displayWidth * 0.92) + "px; height: " + (displayHeight * 0.213) + "px; bottom: " + (displayHeight * 0.0337) + "px;");
        } else {
          frame.setAttribute("style", "width: " + (displayWidth * 0.92) + "px; height: " + (displayHeight * 0.93) + "px; margin: " + (displayHeight - 1) + "px " + (displayWidth - 1) + "px + " + (displayHeight - 1) + "px "  + (displayWidth - 1) + "px; top: 0px");
          top.setAttribute("style", "bottom: " + (displayHeight * 0.5104) + "px; right: " + (displayWidth * 0.34) + "px; height: " + squareSize + "px; width: " + squareSize + "px;");
          newUser.setAttribute("style", "bottom: " + (displayHeight * 0.3768) + "px; left: " + (displayWidth * 0.30125) + "px; height: " + squareSize + "px;");
          login.setAttribute("style", "bottom: " + (displayHeight * 0.38) + "px; right: " + (displayWidth * 0.2843) + "px; height: " + squareSize + "px;");
          topBlocker.setAttribute("style", "width: " + (displayWidth * 0.97) + "px; height: " + (displayHeight * 0.3337) + "px;");
          leftBlock.setAttribute("style", "width: " + (displayWidth * 0.3117) +"px; height: " + (displayHeight * 0.6476) + "px; top: " + (displayHeight * 0.2027) + "px; left: " + (displayWidth * -0.01) + "px;");
          rightBlock.setAttribute("style", "width: " + (displayWidth * 0.2957) + "px; height: " + (displayHeight * 0.6476) + "px; top: " + (displayHeight * 0.2827) + "px; right: " + (displayWidth * -0.01) + "px;");
          bottomBlock.setAttribute("style", "width: " + (displayWidth * 0.973) + "px; height: " + (displayHeight * 0.353) + "px; bottom: " + (displayHeight * 0.0001) + "px;");
        }

        backgroundColoring(rValues, gValues, bValues, rValues2, gValues2, bValues2, 0);

        //flickerDown(top, title, git, top, title);
        blingElement(top);
        blurElement(title);

        newUserAccountStart.addEventListener('click', ()=>{
          newUserAccountStart.setAttribute("style", "visibility: hidden;");
          expandNewUserEmail(newUserEmail, 1, 26);
          newExit.setAttribute("style", "visibility: visible;");
        });

        newSub.addEventListener('click', ()=>{
          //TODO check for unique email address
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
            //TODO post object to users table
            printErrorMessage(errorMessages, '>Processing... please wait...', '');
            $http.post('/users', createUser)
            .then(userData=>{
              let user = userData.data;
              printErrorMessage(errorMessages, '>Please check your email for verification link.', '');
            });
            //TODO generate email for user to verify account
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

        });

        document.addEventListener('keyup', ()=>{
          if (newUserRetypePassword.value !== '') {
            newSub.setAttribute("style", "visibility: visible; margin: 0.4vmin; margin-left: 2.6vmin; margin-top: 12vmin; width: 40%; padding-left: 1vmin;");
          } else {
            newSub.setAttribute("style", "visibility: hidden;");
          }
          if (newUserPassword.value !== '') {
            if (!newPasswordRetypeVisible) {
              expandRetypePassword(newUserRetypePassword, 1, 26);
              newPasswordRetypeVisible = true;
            }
          } else {
            newUserRetypePassword.setAttribute("style", "hidden;");
            newPasswordRetypeVisible = false;
          }
          if (newUserEmail.value.indexOf('@') !== -1) {
            if (newUserEmail.value.indexOf('@') < (newUserEmail.value.length - 2)) {
              if (!newPasswordVisible) {
                expandNewPassword(newUserPassword, 1, 26);
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
