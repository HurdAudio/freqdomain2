'use strict';
let gainModulateEdit = document.getElementById('gainModulateEdit');
let gainModulatorSelect = document.getElementById('gainModulatorSelect');

window.onload = ()=>{

  gainModulatorSelect.addEventListener('change', ()=>{
    if (gainModulatorSelect.value === 'none') {
      gainModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      gainModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });
};
