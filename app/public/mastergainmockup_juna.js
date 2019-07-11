'use strict';
let muteAll = false;

function visualMuting() {
  let speakerIcon = document.getElementById('speakerIcon');
  let masterGainDisplay = document.getElementById('masterGainDisplay');
  let displaySpan = document.getElementById('displaySpan');
  let masterGainFace = document.getElementById('masterGainFace');
  let muteNote = document.getElementById('muteNote');
  let masterGainTop = document.getElementById('masterGainTop');
  let masterGainInput = document.getElementById('masterGainInput');


  if (muteAll) {
    displaySpan.innerHTML = 'mute';
    speakerIcon.setAttribute("style", "opacity: 0.3;");
    masterGainDisplay.setAttribute("style", "background: #ffb2b2; background-color: -webkit-linear-gradient(135deg, #ffb2b2, #e50000); background: -o-linear-gradient(135deg, #ffb2b2, #e50000); background: -moz-linear-gradient(135deg, #ffb2b2, #e50000); background: linear-gradient(135deg, #ffb2b2, #e50000); color: transparent; box-shadow: -1px -1px 1px #99e099, -2px -2px 1px #99e099, -3px -3px 1px #99e099, -4px -4px 1px #99e099;");
    masterGainFace.setAttribute("style", "box-shadow: -1px -1px 1px #99e099, -2px -2px 1px #99e099, -3px -3px 1px #99e099");
    muteNote.setAttribute("style", "text-shadow: -1px -1px 1px #99e099;");
    masterGainTop.setAttribute("style", "filter: hue-rotate(90deg);");
    masterGainInput.setAttribute("style", "filter: hue-rotate(90deg);");
    setTimeout(()=>{
      if (muteAll) {
        masterGainDisplay.setAttribute("style", "background-color: transparent; background: url(./img/june/sicong-li-BoMschYGUcA-unsplash.jpg); background-size: 300%; color: transparent; box-shadow: -1px -1px 1px #4cfb31, -2px -2px 1px #4cfb31, -3px -3px 1px #4cfb31, -4px -4px 1px #4cfb31;");
        masterGainFace.setAttribute("style", "box-shadow: -1px -1px 1px #4cfb31, -2px -2px 1px #4cfb31, -3px -3px 1px #4cfb31;");
        muteNote.setAttribute("style", "text-shadow: -1px -1px 1px #4cfb31, -2px -2px 1px #4cfb31;");
        setTimeout(()=>{
          if (muteAll) {
            visualMuting();
          }
        }, 500);
      }

    }, 500);
  } else {
    displaySpan.innerHTML = '';
    speakerIcon.setAttribute("style", "opacity: 0.8;");
    masterGainDisplay.setAttribute("style", "background-color: transparent; background: url(./img/june/sicong-li-BoMschYGUcA-unsplash.jpg); background-size: 300%; color: #000000; box-shadow: -1px -1px 1px #4cfb31, -2px -2px 1px #4cfb31, -3px -3px 1px #4cfb31, -4px -4px 1px #4cfb31;");
    masterGainFace.setAttribute("style", "box-shadow: -1px -1px 1px #4cfb31, -2px -2px 1px #4cfb31, -3px -3px 1px #4cfb31;");
    muteNote.setAttribute("style", "text-shadow: -1px -1px 1px #4cfb31, -2px -2px 1px #4cfb31;");
    masterGainTop.setAttribute("style", "filter: hue-rotate(0deg);");
    masterGainInput.setAttribute("style", "filter: hue-rotate(0deg);");
  }
}


window.onload = ()=>{
  let masterMute = document.getElementById('masterMute');

  masterMute.addEventListener('click', ()=>{
    if (muteAll) {
      muteAll = false;
      visualMuting();
    } else {
      muteAll = true;
      visualMuting();
    }
  });
};
