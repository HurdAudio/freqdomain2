'use strict';


window.onload = ()=>{
  let frequencyModSelect = document.getElementById('frequencyModSelect');
  let frequencyModulateEdit = document.getElementById('frequencyModulateEdit');
  let detuneModSelect = document.getElementById('detuneModSelect');
  let detuneModulateEdit = document.getElementById('detuneModulateEdit');
  let gainModSelect = document.getElementById('gainModSelect');
  let gainModulateEdit = document.getElementById('gainModulateEdit');

  frequencyModSelect.addEventListener('change', ()=>{
    if (frequencyModSelect.value === 'none') {
      frequencyModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      frequencyModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });

  detuneModSelect.addEventListener('change', ()=>{
    if (detuneModSelect.value === 'none') {
      detuneModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      detuneModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });

  gainModSelect.addEventListener('change', ()=>{
    if (gainModSelect.value === 'none') {
      gainModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      gainModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });
};
