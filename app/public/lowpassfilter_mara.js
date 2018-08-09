'use strict';


window.onload = ()=>{
  let frequencyModSelect = document.getElementById('frequencyModSelect');
  let frequencyModulateEdit = document.getElementById('frequencyModulateEdit');
  let detuneModSelect = document.getElementById('detuneModSelect');
  let detuneModulateEdit = document.getElementById('detuneModulateEdit');
  let qModSelect = document.getElementById('qModSelect');
  let qModulateEdit = document.getElementById('qModulateEdit');

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

  qModSelect.addEventListener('change', ()=>{
    if (qModSelect.value === 'none') {
      qModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      qModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });
};
