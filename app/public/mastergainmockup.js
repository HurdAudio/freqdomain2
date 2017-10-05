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
    masterGainDisplay.setAttribute("style", "background: #ff0000; background-color: -webkit-linear-gradient(135deg, #ff0000, #6FAAF0); background: -o-linear-gradient(135deg, #ff0000, #6FAAF0); background: -moz-linear-gradient(135deg, #ff0000, #6FAAF0); background: linear-gradient(135deg, #ff0000, #6FAAF0); color: transparent; box-shadow: -1px -1px 1px #7DF9FF, -2px -2px 1px #7DF9FF, -3px -3px 1px #7DF9FF, -4px -4px 1px #7DF9FF;");
    masterGainFace.setAttribute("style", "box-shadow: -1px -1px 1px #7DF9FF, -2px -2px 1px #7DF9FF, -3px -3px 1px #7DF9FF");
    muteNote.setAttribute("style", "text-shadow: -1px -1px 1px #ff0000;");
    masterGainTop.setAttribute("style", "filter: sepia(3);");
    masterGainInput.setAttribute("style", "filter: sepia(1);");
    setTimeout(()=>{
      if (muteAll) {
        masterGainDisplay.setAttribute("style", "background-color: transparent; background: url(./img/january/blue_ice.png); background-size: 300%; color: transparent; box-shadow: -1px -1px 1px #ff0000, -2px -2px 1px #7DF9FF, -3px -3px 1px #7DF9FF, -4px -4px 1px #7DF9FF;");
        masterGainFace.setAttribute("style", "box-shadow: -1px -1px 1px #ff0000, -2px -2px 1px #ff0000, -3px -3px 1px #ff0000;");
        muteNote.setAttribute("style", "text-shadow: -1px -1px 1px #7DF9FF, -2px -2px 1px #7DF9FF;");
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
    masterGainDisplay.setAttribute("style", "background-color: transparent; background: url(./img/january/blue_ice.png); background-size: 300%; color: #000000; box-shadow: -1px -1px 1px #7DF9FF, -2px -2px 1px #7DF9FF, -3px -3px 1px #7DF9FF, -4px -4px 1px #7DF9FF;");
    masterGainFace.setAttribute("style", "box-shadow: -1px -1px 1px #7DF9FF, -2px -2px 1px #7DF9FF, -3px -3px 1px #7DF9FF;");
    muteNote.setAttribute("style", "text-shadow: -1px -1px 1px #7DF9FF, -2px -2px 1px #7DF9FF;");
    masterGainTop.setAttribute("style", "filter: sepia(0);");
    masterGainInput.setAttribute("style", "filter: sepia(0);");
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
}
