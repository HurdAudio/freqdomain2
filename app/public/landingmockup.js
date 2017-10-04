'use strict';

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
    return;
  } else {
    element.setAttribute("style", "visibility: visible; margin-left: 32vmin; margin-top: 9vmin; webkit-transform: skew(0deg, -45deg); transform: skew(0deg, -35deg); font-family: 'Oswald', sans-serif; font-size: 24px; width: " + current + "vmin; border-radius: 5px; color: #7DF9FF; background: #E4E4DF; background-color: -webkit-linear-gradient(90deg, #877A67, #E4E4DF); background: -o-linear-gradient(90deg, #877A67, #E4E4DF); background: -moz-linear-gradient(90deg, #877A67, #E4E4DF); background: linear-gradient(90deg, #877A67, #E4E4DF);");
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
    element.setAttribute("style", "visibility: visible; margin-left: 32vmin; margin-top: 1vmin; webkit-transform: skew(0deg, -45deg); transform: skew(0deg, -35deg); font-family: 'Oswald', sans-serif; font-size: 24px; width: " + current + "vmin; border-radius: 5px; color: #7DF9FF; background: #E4E4DF; background-color: -webkit-linear-gradient(90deg, #877A67, #E4E4DF); background: -o-linear-gradient(90deg, #877A67, #E4E4DF); background: -moz-linear-gradient(90deg, #877A67, #E4E4DF); background: linear-gradient(90deg, #877A67, #E4E4DF);");
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
    element.setAttribute("style", "visibility: visible; margin-left: 32vmin; margin-top: 1vmin; webkit-transform: skew(0deg, -45deg); transform: skew(0deg, -35deg); font-family: 'Oswald', sans-serif; font-size: 24px; width: " + current + "vmin; border-radius: 5px; color: #7DF9FF; background: #E4E4DF; background-color: -webkit-linear-gradient(90deg, #877A67, #E4E4DF); background: -o-linear-gradient(90deg, #877A67, #E4E4DF); background: -moz-linear-gradient(90deg, #877A67, #E4E4DF); background: linear-gradient(90deg, #877A67, #E4E4DF);");
    setTimeout(()=>{
      expandRetypePassword(element, current + 1, target);
    }, (timer * 1000));
  }
}


window.onload = ()=>{
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

  backgroundColoring(rValues, gValues, bValues, rValues2, gValues2, bValues2, 0);

  newUserAccountStart.addEventListener('click', ()=>{
    newUserAccountStart.setAttribute("style", "visibility: hidden;");
    expandNewUserEmail(newUserEmail, 1, 26);
    newExit.setAttribute("style", "visibility: visible;");
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
    passwordVisible = false;
    userEmail.value = '';
    userPassword.value = '';

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
          }
        }
      } else {
        userPassword.setAttribute("style", "visibility: hidden;");
        passwordVisible = false;
      }
    } else {
      userPassword.setAttribute("style", "visibility: hidden;");
      passwordVisible = false;
    }
    if (userPassword.value !== '') {
      loginSub.setAttribute("style", "visibility: visible;");
    }
  });
};
