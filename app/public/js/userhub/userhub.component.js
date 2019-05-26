(function() {
  'use strict';
  var currentUserId = 0;
  // var newsArray = [ 'FreqDomain2 is currently in pre-production.', 'Currently working on: Front End - module 0.', 'LAA 2 ARI 3 in the top of the 6th inning in Arizona.', 'Impeachment proceedings pick up momentum as the US Senate prepares for a vote', 'Frequency Hertz so good...', 'Welcome to FreqDomain2 HUB', 'Social media guru expires in 280 characters', 'Bloodbath ensues in Tunisia after clerics attempt coup.', 'This is FreqDomain2 Headline News - the only place for news that matters to freqs', '' ];

  angular.module('app')
    .component('userhub', {
      controller: UserHubController,
      templateUrl: '/js/userhub/userhub.template.html'
    });

    UserHubController.$inject = ['$http', '$state', '$stateParams'];

    function getCookie (name) {
      var cookies = document.cookie.split(';');
      for(var i=0 ; i < cookies.length ; ++i) {
        var pair = cookies[i].trim().split('=');
        if(pair[0] === name) {
          return (pair[1]);
        }
      }
      return null;
    }

    function UserHubController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.userLogout = userLogout;
      vm.userProfileEditor = userProfileEditor;
      vm.loadInfo = loadInfo;
      vm.openCollapsedMessage = openCollapsedMessage;
      vm.collapseUnreadMessage = collapseUnreadMessage;
      vm.uncollapseReadMessage = uncollapseReadMessage;
      vm.collapseReadMessageAction = collapseReadMessageAction;
      vm.navMixer = navMixer;
      vm.navPatchEditor = navPatchEditor;
      vm.mixerPatches = [
        {
          value: 'none',
          text: 'please select a mixer'
        },
        {
          value: 1,
          text: 'simple mixer'
        },
        {
          value: 2,
          text: 'vocal mixer'
        },
        {
          value: 3,
          text: 'commercial compression'
        },
        {
          value: 4,
          text: 'sfx'
        },
        {
          value: 'createNew',
          text: 'add new mixer'
        }
      ];
      vm.patchBank = [
        {
          value: 'none',
          text: 'no patch selected'
        },
        {
          value: 1,
          text: 'e. piano'
        },
        {
          value: 2,
          text: 'string pad'
        },
        {
          value: 3,
          text: 'percussive log'
        },
        {
          value: 4,
          text: 'snap bass'
        },
        {
          value: 5,
          text: 'gamelan'
        },
        {
          value: 'new',
          text: 'new patch'
        }
      ];
      vm.compositions = [
        {
          value: 'none',
          text: 'none selected'
        },
        {
          value: 1,
          text: 'Radon Theme'
        },
        {
          value: 2,
          text: 'Drone IX'
        },
        {
          value: 3,
          text: 'Salt Tea'
        },
        {
          value: 4,
          text: 'Experimental'
        },
        {
          value: 'new',
          text: 'new composition'
        }
      ];
      vm.mixerSelected = false;

      var audioContext = new (window.AudioContext || window.webkitAudioContext)();

      function navPatchEditor() {
        $state.go('patcheditor', {id: currentUserId});
      }

      function navMixer() {
        $state.go('mixer', {id: currentUserId});
      }

      // function mixerSelected() {
      //   if (document.getElementById('mixerSelection').value === 'none') {
      //     return(false);
      //   } else {
      //     return(true);
      //   }
      // }

      function collapseReadMessageAction(msgId) {
        let collapsedReadMessage = document.getElementById('collapsedReadMessage' + msgId);
        let openedReadMessage = document.getElementById('openedReadMessage' + msgId);

        collapsedReadMessage.setAttribute("style", "display: initial; filter: saturate(0%);");
        openedReadMessage.setAttribute("style", "display: none;");
      }

      function uncollapseReadMessage(msgId) {
        let collapsedReadMessage = document.getElementById('collapsedReadMessage' + msgId);
        let openedReadMessage = document.getElementById('openedReadMessage' + msgId);

        collapsedReadMessage.setAttribute("style", "display: none;");
        openedReadMessage.setAttribute("style", "display: initial;");
      }

      function collapseUnreadMessage(msgId) {
        let collapsedUnreadMessage = document.getElementById('collapsedUnreadMessage' + msgId);
        let openedUnreadMessage = document.getElementById('openedUnreadMessage' + msgId);

        openedUnreadMessage.setAttribute("style", "display: none;");
        collapsedUnreadMessage.setAttribute("style", "display: initial; filter: saturate(0%);");
      }

      function openCollapsedMessage(msgId) {
        let collapsedUnreadMessage = document.getElementById('collapsedUnreadMessage' + msgId);
        let openedUnreadMessage = document.getElementById('openedUnreadMessage' + msgId);
        let now = new Date();
        let subObj = {
          read: true,
          updated_at: now
        }
        $http.patch(`/messages/${msgId}`, subObj)
        .then(()=>{
          console.log('patched');
        });

        openedUnreadMessage.setAttribute("style", "display: initial;");
        collapsedUnreadMessage.setAttribute("style", "display: none;");
      }

      function loadInfo() {
        $state.go('info', {id: currentUserId});
      }

      function userProfileEditor() {
        $state.go('userprofile', {id: currentUserId});
      }

      function userLogout() {
        $http.get(`/users/${currentUserId}`)
        .then(userData=>{
          let user = userData.data;
          let storage = window.localStorage;
          storage.removeItem("freq2DomainUserID");
          storage.removeItem("freq2Expire");
          storage.removeItem(user.security.key);
          document.cookie = "freq2DomainUserID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          document.cookie = "freq2Expire=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          document.cookie = user.security.key + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          $http.post('/users/logout', {})
          .then(()=>{

            $state.go('landing');
          });
        });

      }

      function initializeSpace(user) {
        // TODO stuff
      }

      function checkValidUser(userId) {
        let storage = window.localStorage;
        let localUser = storage.getItem('freq2DomainUserID');
        let cookieUser = getCookie('freq2DomainUserID');
        let localExpiration = new Date(storage.getItem('freq2Expire'));
        let cookieExpiration = new Date(getCookie('freq2Expire'));
        let currentTime = new Date();

        if ((localUser === undefined) || (cookieUser === null)) {
          $state.go('landing');
          return;
        }
        if (parseInt(localUser) !== parseInt(cookieUser)) {
          $state.go('landing');
          return;
        }
        if (parseInt(localUser) !== parseInt(userId)) {
          $state.go('landing');
          return;
        }
        if (localExpiration.getTime() !== cookieExpiration.getTime()) {
          $state.go('landing');
          return;
        }
        if (currentTime.getTime() > localExpiration.getTime()) {
          $state.go('landing');
          return;
        }
        currentUserId = userId;
        $http.get(`/users/${userId}`)
        .then(userData=>{
          let user = userData.data;
          let userExpiration = new Date(user.security.expire);
          if (userExpiration.getTime() !== localExpiration.getTime()) {
            $state.go('landing');
            return;
          }
          let key = user.security.key;
          let value = user.security.value;
          let localValue = storage.getItem(key);
          let cookieValue = getCookie(key);
          if (localValue !== cookieValue) {
            $state.go('landing');
            return;
          }
          if (localValue !== value) {
            $state.go('landing');
            return;
          }
          console.log('user is legit');
          initializeSpace(user);
          document.getElementById('mixerSelection').value = 'none';
        });

      }

      function dynamicNewsTicker(element, news, width) {
        let delay = 300;
        if (news.length < 1) {
          runNewsTicker();
          return;
        }
        let display = '';
        if (news.length < width) {
          display = news;
        } else {
          display = news.slice(0, width);
        }
        let nextNews = news.slice(1);
        element.innerHTML = display;
        // if (display[0] === ' ') {
        //   delay = delay * 2;
        // }
        setTimeout(()=>{
          dynamicNewsTicker(element, nextNews, width);
        }, delay);

      }

      function runNewsTicker() {
        let headlineNews = document.getElementById('headlineNews');
        let newsString = '';
        let characterWidth = 70;
        for (let sp = 0; sp < characterWidth; sp++) {
          newsString+= ' ';
        }

        $http.get('/news_tickers')
        .then(freqdomain2NewsData=>{
          let freqdomain2News = freqdomain2NewsData.data;
          let freqNews = freqdomain2News.filter(line=>{
            return(!line.expired);
          });
          $http.get('/reuters_headlines/us')
          .then(reutersHeadlinesData=>{
            let reutersHeadlines = reutersHeadlinesData.data;
            if (freqNews.length > 0) {
              for (let i = 0; i < freqNews.length; i++) {
                newsString += 'FreqDomain2 News: ' + freqNews[i].headline + '                                                  ';
              }
            }
            if (reutersHeadlines.articles.length > 0) {
              for (let j = 0; j < reutersHeadlines.articles.length; j++) {
                newsString += reutersHeadlines.articles[j].source.name + ': ' + reutersHeadlines.articles[j].title;
                if (reutersHeadlines.articles[j].description !== null) {
                  newsString += ' - ' + reutersHeadlines.articles[j].description;
                }
                newsString += '                                                  ';
              }
            }
            // console.log(newsString);
            dynamicNewsTicker(headlineNews, newsString, characterWidth);
          });
        });

        // if (newsArray.length === 0) {
        //   return;
        // }
        // if (newsArray.length === 1) {
        //   headlineNews.innerHTML = newsArray[0];
        // }
        // for (let i = 0; i < newsArray.length; i++) {
        //   newsString += '>';
        //   newsString += newsArray[i];
        //   newsString += ' • • • • • | • • • • • | • • • • • | • • • • • '
        // }
        // if (newsString.length < characterWidth) {
        //   headlineNews.innerHTML = newsString;
        // } else {
        //   dynamicNewsTicker(headlineNews, newsString, characterWidth);
        // }
      }

      function populateToField(recipientId, controlArray, index, firstEntry) {
        $http.get(`/users/${recipientId}`)
        .then(recipientData=>{
          let recipient = recipientData.data;
          if (firstEntry) {
            controlArray[index].to += recipient.name;
          } else {
            controlArray[index].to += ', ' + recipient.name;
          }
        });
      }

      function setSenderData (controlArray, index, message) {
        $http.get(`/users/${message.user_author_id}`)
        .then(authorData=>{
          let author = authorData.data;
          console.log(author);
          controlArray[index].fromImage = author.user_avatar_url;
          controlArray[index].from = author.name;
          for (let i = 0; i < message.recipients_id.recipients.length; i++) {
            if (i === 0) {
              controlArray[index].to = '';
              populateToField(message.recipients_id.recipients[i], controlArray, index, true);
            } else {
              populateToField(message.recipients_id.recipients[i], controlArray, index, false)
            }
          }
        });
      }

      function getCleanDate(theDate) {
        let clean = '';
        let posted = new Date(theDate);
        let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

        clean += posted.toLocaleTimeString('en-GB') + ' on ' + posted.getDate() + ' ' + months[posted.getMonth()] + ' ' + posted.getFullYear();

        return(clean);
      }

      function populateThreadToField(toId, controlArray, index, threadIndex, isFirstEntry) {
        $http.get(`/users/${toId}`)
        .then(toFieldData=>{
          let toField = toFieldData.data;
          if (isFirstEntry) {
            controlArray[index].threads[threadIndex].to += toField.name;
          } else {
            controlArray[index].threads[threadIndex].to += ', ' + toField.name;
          }
        });
      }

      function obtainThreadToInfo(controlArray, index, threadIndex, recipientsArray) {
        controlArray[index].threads[threadIndex].to = '';
        for (let i = 0; i < recipientsArray.length; i++) {
          if (i === 0) {

            populateThreadToField(recipientsArray[i], controlArray, index, threadIndex, true);
          } else {
            populateThreadToField(recipientsArray[i], controlArray, index, threadIndex, false);
          }

        }
      }

      function obtainThreadFromInfo(controlArray, index, threadIndex, fromId) {
        $http.get(`/users/${fromId}`)
        .then(threadSenderData=>{
          let threadSender = threadSenderData.data;
          controlArray[index].threads[threadIndex].fromImage = threadSender.user_avatar_url;
          controlArray[index].threads[threadIndex].from = threadSender.name;
        });
      }

      function handleMessageThreads(controlArray, index, allMessages, threadIndex, childId) {
        ++controlArray[index].threadCount;
        let msg = allMessages.filter(en=>{
          return(en.id === childId);
        });
        controlArray[index].threads[threadIndex] = {
          id: msg[0].id,
          subject: msg[0].subject,
          message: msg[0].message,
          cleanDate: getCleanDate(msg[0].updated_at)
        };
        obtainThreadFromInfo(controlArray, index, threadIndex, msg[0].user_author_id);
        obtainThreadToInfo(controlArray, index, threadIndex, msg[0].recipients_id.recipients);
        if (msg[0].links !== null) {
          controlArray[index].threads[threadIndex].links = [];
          for (let i = 0; i < msg[0].links.link.length; i++) {
            controlArray[index].threads[threadIndex].links[i] = {
              link: msg[0].links.link[i],
              name: msg[0].links.name[i]
            };
          }
        }
        if (msg[0].thread_child !== null) {
          handleMessageThreads(controlArray, index, allMessages, (threadIndex + 1), msg[0].thread_child);
        }
      }

      function retrieveMessages() {
        let aDate;
        let bDate;

        $http.get('messages')
        .then(allMessagesData=>{
          let allMessages = allMessagesData.data;
          let userMessages = allMessages.filter(msg=>{
            return(((msg.recipients_id.recipients.indexOf(parseInt(currentUserId)) !== -1) || (msg.user_author_id === parseInt(currentUserId))) && (msg.thread_parent === null));
          });
          let userUnreadMessages = userMessages.filter(msg=>{
            return(!msg.read);
          });
          let userReadMessages = userMessages.filter(msg=>{
            return(msg.read);
          });
          userUnreadMessages = userUnreadMessages.sort((a, b)=>{
            aDate = new Date(a.created_at);
            bDate = new Date(b.created_at);
            return(aDate.getDate() - bDate.getDate());
          });
          userReadMessages = userReadMessages.sort((a, b)=>{
            aDate = new Date(a.created_at);
            bDate = new Date(b.created_at);
            return(aDate.getDate() - bDate.getDate());
          });

          vm.unreadMessages = [];
          vm.readMessages = [];
          if (userUnreadMessages.length > 0) {
            document.getElementById('youHaveNoMessagesAtThisTime').setAttribute("style", "display: none;");
            for (let i = 0; i < userUnreadMessages.length; i++) {
              vm.unreadMessages[i] = {
                id: userUnreadMessages[i].id,
                subject: userUnreadMessages[i].subject,
                message: userUnreadMessages[i].message
              };
              setSenderData(vm.unreadMessages, i, userUnreadMessages[i]);
              vm.unreadMessages[i].cleanDate = getCleanDate(userUnreadMessages[i].updated_at);
              if (userUnreadMessages[i].links !== null) {
                vm.unreadMessages[i].links = [];
                for (let j = 0; j < userUnreadMessages[i].links.link.length; j++) {
                  vm.unreadMessages[i].links[j] = {
                    link: userUnreadMessages[i].links.link[j],
                    name: userUnreadMessages[i].links.name[j]
                  };
                }
              } else {
                vm.unreadMessages[i].links = [];
                vm.unreadMessages[i].links[0] = {
                  link: '#',
                  name: 'no link(s)'
                };
              }
              if (userUnreadMessages[i].thread_child !== null) {
                vm.unreadMessages[i].threadCount = 0;
                vm.unreadMessages[i].threads = [];
                handleMessageThreads(vm.unreadMessages, i, allMessages, 0, userUnreadMessages[i].thread_child);
              } else {
                vm.unreadMessages[i].threadCount = 0;
              }
            }
          }
          if (userReadMessages.length > 0) {
            document.getElementById('youHaveNoMessagesAtThisTime').setAttribute("style", "display: none;");
            for (let i = 0; i < userReadMessages.length; i++) {
              vm.readMessages[i] = {
                id: userReadMessages[i].id,
                subject: userReadMessages[i].subject,
                message: userReadMessages[i].message
              };
              setSenderData(vm.readMessages, i, userReadMessages[i]);
              vm.readMessages[i].cleanDate = getCleanDate(userReadMessages[i].updated_at);
              if (userReadMessages[i].links !== null) {
                vm.readMessages[i].links = [];
                for (let j = 0; j < userReadMessages[i].links.link.length; j++) {
                  vm.readMessages[i].links[j] = {
                    link: userReadMessages[i].links.link[j],
                    name: userReadMessages[i].links.name[j]
                  };
                }
              } else {
                vm.readMessages[i].links = [];
                vm.readMessages[i].links[0] = {
                  link: '#',
                  name: 'no link(s)'
                };
              }
              if (userReadMessages[i].thread_child !== null) {
                vm.readMessages[i].threadCount = 0;
                vm.readMessages[i].threads = [];
                handleMessageThreads(vm.readMessages, i, allMessages, 0, userReadMessages[i].thread_child);
              } else {
                vm.readMessages[i].threadCount = 0;
              }
            }
          }
        });
      }

      function onInit() {
        console.log("User Hub is lit");
        console.log(audioContext);
        // let masterVolume = new MasterVolume({
        //   id: 1,
        //   user_id: 1,
        //   name: "master volume",
        //   master_volume_gain_value: 40,
        //   input: null,
        //   mute: false,
        //   created_at: "2017-07-20T13:44:00.000Z",
        //   updated_at: "2017-07-20T13:44:00.000Z"
        // }, {});
        // console.log(masterVolume);
        checkValidUser($stateParams.id);
        let theBody = document.getElementsByTagName("body")[0];
        let hubMessageSpace = document.getElementById('hubMessageSpace');
        let hubUpdatesSpace = document.getElementById('hubUpdatesSpace');

        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg); transition: filter 5s linear;");
        runNewsTicker();
        retrieveMessages();
        setTimeout(()=>{
          hubMessageSpace.setAttribute("style", "opacity: 0.9; filter: hue-rotate(0deg); transition: all 3s linear;");
          setTimeout(()=>{
            hubUpdatesSpace.setAttribute("style", "opacity: 0.9; filter: hue-rotate(0deg); transition: all 3s linear;");
          }, 2000);
        }, 3000);

        document.getElementById('mixerSelection').addEventListener('change', () => {
          if (document.getElementById('mixerSelection').value === 'none') {
            vm.mixerSelected = false;
            document.getElementById('patchSetting').setAttribute("style", "opacity: 0.2;");
            document.getElementById('composeSetting').setAttribute("style", "opacity: 0.2;");
          } else {
            vm.mixerSelected = true;
            document.getElementById('patchSetting').setAttribute("style", "opacity: 1;");
            document.getElementById('composeSetting').setAttribute("style", "opacity: 1;");
          }
        });

        // $http.get('/flights_from_tiles/3/3')
        // .then(data=>{
        //   console.log(data.data);
        // });

        // let testGain = new GainModule({
        //   id: 1,
        //   user_id: 1,
        //   name: "gain",
        //   gain_value: 40,
        //   gain_modulator: null,
        //   input: null,
        //   output: null,
        //   created_at: "2017-07-20T13:44:00.000Z",
        //   updated_at: "2017-07-20T13:44:00.000Z"
        // }, {});

        // let testOscillator = new OscillatorModule({
        //   id: 1,
        //   user_id: 1,
        //   name: "oscillator",
        //   waveform: "sine",
        //   waveform_modulator: null,
        //   hertz: 440,
        //   hertz_modulator: null,
        //   detune: 0,
        //   detune_modulator: null,
        //   output: null
        // }, {});

        // let testTestTone = new TestToneModule({
        //   id: 1,
        //   user_id: 1,
        //   name: 'test tone',
        //   gain_value: 40,
        //   waveform: 'sine',
        //   hertz: 440.000,
        //   device_on: false,
        //   output: null
        // }, {});
        //
        // console.log(testTestTone);

        // let dynamicCompressor = new DynamicCompressor({
        //   id: 1,
        //   name: 'dynamic compressor',
        //   threshold: -24.00,
        //   threshold_modulator: null,
        //   knee: 30.00,
        //   knee_modulator: null,
        //   ratio: 12.000,
        //   ratio_modulator: null,
        //   attack: 0.003,
        //   attack_modulator: null,
        //   release: 0.250,
        //   release_modulator: null,
        //   input: null,
        //   output: null
        // }, {});

        // let randomNumberGenerator = new RandomNumberGenerator({
        //   id: 1,
        //   user_id: 1,
        //   name: "random number generator",
        //   interval: 1,
        //   interval_modulator: null,
        //   maximum: 0,
        //   maximum_modulator: null,
        //   minimum: 0,
        //   minimum_modulator: null,
        //   continuous: false,
        //   exponential: false,
        //   convex: false,
        //   slope: 4,
        //   output: null
        // }, {});

        // let lowpassFilter = new LowpassFilter({
        //   id: 1,
        //   user_id: 1,
        //   name: 'low pass filter',
        //   frequency: 110.000,
        //   frequency_modulator: null,
        //   detune: 0.00,
        //   detune_modulator: null,
        //   q: 0.0000,
        //   q_modulator: null,
        //   input: null,
        //   output: null
        // }, {});

        // let highpassFilter = new HighpassFilter({
        //     id: 1,
        //     user_id: 1,
        //     name: 'high pass filter',
        //     frequency: 110.000,
        //     frequency_modulator: null,
        //     detune: 0.00,
        //     detune_modulator: null,
        //     q: 0.0000,
        //     q_modulator: null,
        //     input: null,
        //     output: null
        // }, {});

        let envelopeGenerator = new EnvelopeGenerator({
          name: 'envelope generator',
          attack_start: 0.00,
          attack_start_modulator: null,
          attack_time_interval: 1,
          attack_time_interval_modulator: null,
          attack_end: 100.00,
          attack_end_modulator: null,
          attack_exponential: false,
          attack_convex: false,
          attack_slope: 4,
          decay_on: true,
          decays: {
            "decays": [
              {
                "decay_time_interval": 1,
                "decay_time_interval_modulator": null,
                "decay_end": 80.00,
                "decay_end_modulator": null,
                "decay_exponential": false,
                "decay_convex": false,
                "decay_slope": 4
              }
            ]
          },
          sustain_on: false,
          sustain_modulator: null,
          post_sustain_on: false,
          post_sustains: {
            "post_sustains": [
              {
                "post_sustain_time_interval": 1,
                "post_sustain_time_interval_modulator": null,
                "post_sustain_end": 80.00,
                "post_sustain_end_modulator": null,
                "post_sustain_exponential": false,
                "post_sustain_convex": false,
                "post_sustain_slope": 4
              }
            ]
          },
          release_time_interval: 1,
          release_time_interval_modulator: null,
          release_end_value: 0.00,
          release_end_value_modulator: null,
          release_exponential: false,
          release_convex: false,
          release_slope: 4,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }, {});


        console.log(envelopeGenerator);




      }

    }

}());
