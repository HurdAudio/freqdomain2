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
    masterGainDisplay.setAttribute("style", "background: #ff0000; background-color: -webkit-linear-gradient(135deg, #ff0000, #6FAAF0); background: -o-linear-gradient(135deg, #ff0000, #6FAAF0); background: -moz-linear-gradient(135deg, #ff0000, #6FAAF0); background: linear-gradient(135deg, #ff0000, #6FAAF0); color: transparent; box-shadow: -1px -1px 1px #8f00ff, -2px -2px 1px #8f00ff, -3px -3px 1px #8f00ff, -4px -4px 1px #8f00ff;");
    masterGainFace.setAttribute("style", "box-shadow: -1px -1px 1px #8f00ff, -2px -2px 1px #8f00ff, -3px -3px 1px #8f00ff");
    muteNote.setAttribute("style", "text-shadow: -1px -1px 1px #8f00ff;");
    masterGainTop.setAttribute("style", "filter: hue-rotate(90deg);");
    masterGainInput.setAttribute("style", "filter: hue-rotate(90deg);");
    setTimeout(()=>{
      if (muteAll) {
        masterGainDisplay.setAttribute("style", "background-color: transparent; background: url(./img/january/ice_ground_texture_by_hhh316-d5imitg.jpg); background-size: 300%; color: transparent; box-shadow: -1px -1px 1px #ff0000, -2px -2px 1px #8f00ff, -3px -3px 1px #8f00ff, -4px -4px 1px #8f00ff;");
        masterGainFace.setAttribute("style", "box-shadow: -1px -1px 1px #ff0000, -2px -2px 1px #ff0000, -3px -3px 1px #ff0000;");
        muteNote.setAttribute("style", "text-shadow: -1px -1px 1px #8f00ff, -2px -2px 1px #8f00ff;");
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
    masterGainDisplay.setAttribute("style", "background-color: transparent; background: url(./img/january/ice_ground_texture_by_hhh316-d5imitg.jpg); background-size: 300%; color: #000000; box-shadow: -1px -1px 1px #8f00ff, -2px -2px 1px #8f00ff, -3px -3px 1px #8f00ff, -4px -4px 1px #8f00ff;");
    masterGainFace.setAttribute("style", "box-shadow: -1px -1px 1px #8f00ff, -2px -2px 1px #8f00ff, -3px -3px 1px #8f00ff;");
    muteNote.setAttribute("style", "text-shadow: -1px -1px 1px #8f00ff, -2px -2px 1px #8f00ff;");
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
