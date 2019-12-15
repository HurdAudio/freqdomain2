'use strict';
let delayModulateEdit = document.getElementById('delayModulateEdit');
let delayModulatorSelect = document.getElementById('delayModulatorSelect');

window.onload = ()=>{

  delayModulatorSelect.addEventListener('change', ()=>{
    if (delayModulatorSelect.value === 'none') {
      delayModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      delayModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });
};
