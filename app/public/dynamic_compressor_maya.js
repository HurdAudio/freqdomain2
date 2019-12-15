'use strict';


window.onload = ()=>{
  let thresholdModSelect = document.getElementById('thresholdModSelect');
  let thresholdModulateEdit = document.getElementById('thresholdModulateEdit');
  let kneeModSelect = document.getElementById('kneeModSelect');
  let kneeModulateEdit = document.getElementById('kneeModulateEdit');
  let ratioModSelect = document.getElementById('ratioModSelect');
  let ratioModulateEdit = document.getElementById('ratioModulateEdit');
  let attackModSelect = document.getElementById('attackModSelect');
  let attackModulateEdit = document.getElementById('attackModulateEdit');
  let releaseModSelect = document.getElementById('releaseModSelect');
  let releaseModulateEdit = document.getElementById('releaseModulateEdit');

  thresholdModSelect.addEventListener('change', ()=>{
    if (thresholdModSelect.value === 'none') {
      thresholdModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      thresholdModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });
  kneeModSelect.addEventListener('change', ()=>{
    if (kneeModSelect.value === 'none') {
      kneeModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      kneeModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });
  ratioModSelect.addEventListener('change', ()=>{
    if (ratioModSelect.value === 'none') {
      ratioModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      ratioModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });
  attackModSelect.addEventListener('change', ()=>{
    if (attackModSelect.value === 'none') {
      attackModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      attackModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });
  releaseModSelect.addEventListener('change', ()=>{
    if (releaseModSelect.value === 'none') {
      releaseModulateEdit.setAttribute("style", "visibility: hidden;");
    } else {
      releaseModulateEdit.setAttribute("style", "visibility: visible;");
    }
  });
};
