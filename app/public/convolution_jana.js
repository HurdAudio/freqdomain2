'use strict';


window.onload = ()=>{
  let impulseSelector = document.getElementById('impulseSelector');
  let impulseLoadButton = document.getElementById('impulseLoadButton');
  let impulseLabel = document.getElementById('impulseLabel');
  let normalizeSwitch = document.getElementById('normalizeSwitch');
  let normalizeOffLabel = document.getElementById('normalizeOffLabel');
  let normalizeOnLabel = document.getElementById('normalizeOnLabel');

  impulseLoadButton.setAttribute("style", "visibility: hidden;");
  impulseLabel.innerHTML = 'impulse file: (none)';
  normalizeOffLabel.setAttribute("style", "visibility: visible;");
  normalizeOnLabel.setAttribute("style", "visibility: hidden;");

  impulseLoadButton.addEventListener('click', () => {
    impulseLoadButton.setAttribute("style", "visibility: hidden;");
    impulseLabel.innerHTML = 'impulse file: loaded';
  });

  impulseSelector.addEventListener('change', () => {
    impulseLabel.innerHTML = 'impulse file: (none)';
    if (impulseSelector.value === 'none') {
      impulseLoadButton.setAttribute("style", "visibility: hidden;");
    } else {
      impulseLoadButton.setAttribute("style", "visibility: visible;");
    }
  });

  normalizeSwitch.addEventListener('click', () => {
    if (normalizeSwitch.checked) {
      normalizeOffLabel.setAttribute("style", "visibility: hidden;");
      normalizeOnLabel.setAttribute("style", "visibility: visible;");
    } else {
      normalizeOffLabel.setAttribute("style", "visibility: visible;");
      normalizeOnLabel.setAttribute("style", "visibility: hidden;");
    }
  });
};
