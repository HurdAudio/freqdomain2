'use strict';

var channels = 1;
var solos = [];
solos[0] = false;

function panStripListen(slider, leftLabel, rightLabel) {
  let leftBlur = 0;
  let rightBlur = 0;
  let leftContrast = 100;
  let rightContrast = 100;
  leftLabel.setAttribute("style", "filter: invert(0%) blur(0px);");
  rightLabel.setAttribute("style", "filter: invert(0%) blur(0px);");

  slider.addEventListener('input', ()=>{

    if (slider.value === 0) {
      leftBlur = 0;
      leftContrast = 0;
      rightContrast = 0;
      rightBlur = 0;
    }
    if (slider.value > 0) {
      rightContrast = 100 - (50 + (slider.value / 2));
      rightBlur = 0;
      leftBlur = Math.floor(slider.value / 16);
      leftContrast = 50 + (slider.value / 2);

    }
    if (slider.value < 0) {
      rightContrast = 100 - (50 + (slider.value / 2));
      rightBlur = Math.floor((slider.value / 16) * -1);
      leftBlur = 0;
      leftContrast = 50 + (slider.value / 2);
    }
    leftLabel.setAttribute("style", "filter: invert(" + leftContrast + "%) blur(" + leftBlur + "px);");
    rightLabel.setAttribute("style", "filter: invert(" + rightContrast + "%) blur(" + rightBlur + "px);");
  });
}

function muteStripListen(muteButton, muteDisplay, muteSlider, ch) {
  let valueHolder = muteDisplay.value;
  let muteOn = false;

  muteSlider.addEventListener('change', ()=>{
    if (muteSlider.value !== 0) {
      valueHolder = muteSlider.value;
      muteOn = false;
      muteButton.setAttribute("style", "filter: invert(0%)");
      if (solos[ch-1]) {
        muteDisplay.setAttribute("style", "background: #00ff00;");
      } else {
        muteDisplay.setAttribute("style", "background: url(./img/january/felipe-cotrim-397113-unsplash.jpg); background-size: 200%;");
      }
    }
  });

  muteButton.addEventListener('click', ()=>{
    if (muteOn) {
      muteOn = false;
      muteDisplay.value = valueHolder;
      muteSlider.value = valueHolder;
      muteButton.setAttribute("style", "filter: invert(0%)");
      if (solos[ch-1]) {
        muteDisplay.setAttribute("style", "background: #00ff00;");
      } else {
        muteDisplay.setAttribute("style", "background: url(./img/january/felipe-cotrim-397113-unsplash.jpg); background-size: 200%;");
      }

    } else {
      muteOn = true;
      muteDisplay.value = 0;
      muteSlider.value = 0;
      muteButton.setAttribute("style", "filter: invert(100%)");
      muteDisplay.setAttribute("style", "background: #ff0000;");
    }
  });
}

function linkDisplayToSlider(gainStripDisplay, gainStripSlider) {
  gainStripDisplay.addEventListener('input', ()=>{
    gainStripSlider.value = gainStripDisplay.value;
  });
  gainStripSlider.addEventListener('input', ()=>{
    gainStripDisplay.value = gainStripSlider.value;
  });
}

function monitorSoloButton(soloButton, rudeChannel) {
  let storedVolumes = [];

  soloButton.addEventListener('click', ()=>{
    if (solos[rudeChannel - 1]) {
      solos[rudeChannel - 1] = false;
      document.getElementById('gainStripDisplay' + rudeChannel).setAttribute("style", "background: url(./img/january/felipe-cotrim-397113-unsplash.jpg); background-size: 200%;");
      soloButton.setAttribute("style", "filter: invert(0%);");
      for (let j = 0; j < channels; j++) {
        if ((j + 1) !== rudeChannel) {
          if (solos[j]) {
            // this channel is still solo'd up.
          } else {
            document.getElementById('gainStripDisplay' + (j + 1)).value = storedVolumes[j];
            document.getElementById('gainStripSlider' + (j + 1)).value = storedVolumes[j];
          }
        }
      }

    } else {
      solos[rudeChannel - 1] = true;
      document.getElementById('gainStripDisplay' + rudeChannel).setAttribute("style", "background: #00ff00;");
      soloButton.setAttribute("style", "filter: invert(100%);");
      for (let i = 0; i < channels; i++) {
        if ((i + 1) !== rudeChannel) {
          if (solos[i]) {
            // this channel is also solo'd up.
            storedVolumes[i] = document.getElementById('gainStripDisplay' + (i + 1)).value;
          } else {
            storedVolumes[i] = document.getElementById('gainStripDisplay' + (i + 1)).value;
            document.getElementById('gainStripDisplay' + (i + 1)).value = 0;
            document.getElementById('gainStripSlider' + (i + 1)).value = 0;
          }
        }
      }

    }
  });
}


window.onload = ()=>{
  console.log('we are lit');

  let leftPanStrip1 = document.getElementById('leftPanStrip1');
  let rightPanStrip1 = document.getElementById('rightPanStrip1');
  let panStripSlider1 = document.getElementById('panStripSlider1');
  let muteStrip1 = document.getElementById('muteStrip1');
  let gainStripSlider1 = document.getElementById('gainStripSlider1');
  let gainStripDisplay1 = document.getElementById('gainStripDisplay1');
  let channelStripAdder = document.getElementById('channelStripAdder');
  let strips = document.getElementById('strips');
  let soloButton1 = document.getElementById('soloButton1');


  panStripListen(panStripSlider1, leftPanStrip1, rightPanStrip1);
  muteStripListen(muteStrip1, gainStripDisplay1, gainStripSlider1, 1);
  monitorSoloButton(soloButton1, 1);

  channelStripAdder.addEventListener('click', ()=>{
    ++channels;
    solos[channels - 1] = false;
    let stripDiv = document.createElement('div');
    strips.appendChild(stripDiv);
    stripDiv.className = 'channelStrip pure-u-1-1';
    stripDiv.id = "channel" + channels;
    stripDiv.setAttribute("style", "margin-left: 26vmin; margin-top: -28vmin; margin-bottom: 1vmin;");
    let label = document.createElement('h2');
    stripDiv.appendChild(label);
    label.className = 'channelLabel';
    label.innerHTML = 'Input ' + channels;
    let channelUserLabel = document.createElement('input');
    stripDiv.appendChild(channelUserLabel);
    channelUserLabel.className = 'channelUserLabel';
    channelUserLabel.id = 'channelUserLabel' + channels;
    channelUserLabel.type = 'text';
    channelUserLabel.placeholder = 'Input ' + channels;
    let gainStrip = document.createElement('div');
    stripDiv.appendChild(gainStrip);
    gainStrip.className = 'gainStrip';
    let theForm = document.createElement('form');
    gainStrip.appendChild(theForm);
    let anchor = document.createElement('a');
    theForm.appendChild(anchor);
    let gainStripDisplay = document.createElement('input');
    anchor.appendChild(gainStripDisplay);
    gainStripDisplay.className = 'gainStripDisplay';
    gainStripDisplay.id = "gainStripDisplay" + channels;
    gainStripDisplay.type = 'number';
    gainStripDisplay.name = 'amountInput';
    gainStripDisplay.min = '0';
    gainStripDisplay.max = '100';
    gainStripDisplay.value = 40;
    gainStripDisplay.stepvalue = 1;
    // gainStripDisplay.oninput = "this.form.amountRange.value=this.value";
    let gainStripSlider = document.createElement('input');
    theForm.appendChild(gainStripSlider);
    gainStripSlider.className = 'gainStripSlider';
    gainStripSlider.id = 'gainStripSlider' + channels;
    gainStripSlider.name = 'amountRange';
    gainStripSlider.type = 'range';
    gainStripSlider.min = '0';
    gainStripSlider.max = '100';
    gainStripSlider.value = 40;
    gainStripSlider.stepvalue = 1;
    // gainStripSlider.oninput = 'this.form.amountInput.value=this.value';
    linkDisplayToSlider(gainStripDisplay, gainStripSlider);
    let soloingButton = document.createElement('button');
    gainStrip.appendChild(soloingButton);
    soloingButton.className = 'soloButton';
    soloingButton.id = 'soloButton' + channels;
    let soloLight = document.createElement('img');
    soloingButton.appendChild(soloLight);
    soloLight.src = './img/4944946_636469510790511958.jpg';
    let soloLabel = document.createElement('p');
    soloingButton.appendChild(soloLabel);
    soloLabel.innerHTML = 'solo';
    monitorSoloButton(soloingButton, channels);
    let mutingButton = document.createElement('button');
    gainStrip.appendChild(mutingButton);
    mutingButton.className = 'channelStripMute';
    mutingButton.id = 'muteStrip' + channels;
    let muteSpeaker = document.createElement('img');
    mutingButton.appendChild(muteSpeaker);
    muteSpeaker.src = './img/january/loudspeaker-155807_1280.png';
    let muteLabel = document.createElement('p');
    mutingButton.appendChild(muteLabel);
    muteLabel.innerHTML = 'mute';
    muteStripListen(mutingButton, gainStripDisplay, gainStripSlider, channels);
    let panStrip = document.createElement('div');
    stripDiv.appendChild(panStrip);
    panStrip.className = 'panStrip';
    let leftPanStrip = document.createElement('h4');
    panStrip.appendChild(leftPanStrip);
    leftPanStrip.className = 'leftPanStrip';
    leftPanStrip.id = 'leftPanStrip' + channels;
    leftPanStrip.innerHTML = 'L';
    let rightPanStrip = document.createElement('h4');
    panStrip.appendChild(rightPanStrip);
    rightPanStrip.className = 'rightPanStrip';
    rightPanStrip.id = 'rightPanStrip' + channels;
    rightPanStrip.innerHTML = 'R';
    let panRange = document.createElement('input');
    panStrip.appendChild(panRange);
    panRange.name = 'panRange';
    panRange.type = 'range';
    panRange.min = '-100';
    panRange.max = '100';
    panRange.value = 0;
    panRange.stepvalue = '1';
    panRange.className = 'panStripSlider';
    panRange.id = 'panStripSlider' + channels;
    panStripListen(panRange, leftPanStrip, rightPanStrip);
  });
};
