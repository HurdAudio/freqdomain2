(function() {
  'use strict';
  var currentUserId = 0;
  var tracking = false;
  var trackingFlightID = 0;
  var index = 0;


  angular.module('app')
    .component('financialmoduletest', {
      controller: FinancialModuleTestComponent,
      templateUrl: '/js/financialmoduletest/financialmoduletest.template.html'
    });

    FinancialModuleTestComponent.$inject = ['$http', '$state', '$stateParams'];

    function FinancialModuleTestComponent($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.stocksSelectedByUser = stocksSelectedByUser;
      vm.submitStockSymbol = submitStockSymbol;
      vm.selectCompany = selectCompany;
      vm.randomizeStockSymbol = randomizeStockSymbol;
      vm.stockPickerToBeginning = stockPickerToBeginning;
      vm.companyDisplayToInitial = companyDisplayToInitial;
      vm.realitimeToInitial = realitimeToInitial;
      vm.intradayStockToInitial = intradayStockToInitial;
      vm.historicalStockToInitial = historicalStockToInitial;
      vm.mutualFundsSelectedByUser = mutualFundsSelectedByUser;
      vm.mutualFundPickerToBeginning = mutualFundPickerToBeginning;
      vm.submitMutualFundSymbol = submitMutualFundSymbol;
      vm.randomizeMutualFundSymbol = randomizeMutualFundSymbol;



      function mutualFundPickerToBeginning() {
        let mutualFundPicker = document.getElementById('mutualFundPicker');
        let financialInstrumentSelector = document.getElementById('financialInstrumentSelector');
        let currencySelector = document.getElementById('currencySelector');
        let mutualFundsSelector = document.getElementById('mutualFundsSelector');
        let stocksSelector = document.getElementById('stocksSelector');
        let outputLabel = document.getElementById('outputLabel');
        let outputDisplay = document.getElementById('outputDisplay');
        let highLabel = document.getElementById('highLabel');
        let highDisplay = document.getElementById('highDisplay');
        let lowLabel = document.getElementById('lowLabel');
        let lowDisplay = document.getElementById('lowDisplay');

        mutualFundPicker.setAttribute("style", "display: none;");
        financialInstrumentSelector.setAttribute("style", "display: initial;");
        currencySelector.setAttribute("style", "opacity: 1;");
        mutualFundsSelector.setAttribute("style", "opacity: 1;");
        stocksSelector.setAttribute("style", "opacity: 1;");
        outputLabel.innerHTML = 'Price';
        outputDisplay.innerHTML = '';
        highLabel.innerHTML = 'High';
        highDisplay.innerHTML = '';
        lowLabel.innerHTML = 'Low';
        lowDisplay.innerHTML = '';
      }

      function historicalStockToInitial() {
        let historicalStockAction = document.getElementById('historicalStockAction');
        let financialInstrumentSelector = document.getElementById('financialInstrumentSelector');
        let currencySelector = document.getElementById('currencySelector');
        let mutualFundsSelector = document.getElementById('mutualFundsSelector');
        let stocksSelector = document.getElementById('stocksSelector');
        let outputLabel = document.getElementById('outputLabel');
        let outputDisplay = document.getElementById('outputDisplay');
        let highLabel = document.getElementById('highLabel');
        let highDisplay = document.getElementById('highDisplay');
        let lowLabel = document.getElementById('lowLabel');
        let lowDisplay = document.getElementById('lowDisplay');

        historicalStockAction.setAttribute("style", "display: none;");
        financialInstrumentSelector.setAttribute("style", "display: initial;");
        currencySelector.setAttribute("style", "opacity: 1;");
        mutualFundsSelector.setAttribute("style", "opacity: 1;");
        stocksSelector.setAttribute("style", "opacity: 1;");
        outputLabel.innerHTML = 'Price';
        outputDisplay.innerHTML = '';
        highLabel.innerHTML = 'High';
        highDisplay.innerHTML = '';
        lowLabel.innerHTML = 'Low';
        lowDisplay.innerHTML = '';
      }

      function intradayStockToInitial() {
        let intradayStockAction = document.getElementById('intradayStockAction');
        let financialInstrumentSelector = document.getElementById('financialInstrumentSelector');
        let currencySelector = document.getElementById('currencySelector');
        let mutualFundsSelector = document.getElementById('mutualFundsSelector');
        let stocksSelector = document.getElementById('stocksSelector');
        let outputLabel = document.getElementById('outputLabel');
        let outputDisplay = document.getElementById('outputDisplay');
        let highLabel = document.getElementById('highLabel');
        let highDisplay = document.getElementById('highDisplay');
        let lowLabel = document.getElementById('lowLabel');
        let lowDisplay = document.getElementById('lowDisplay');

        intradayStockAction.setAttribute("style", "display: none;");
        financialInstrumentSelector.setAttribute("style", "display: initial;");
        currencySelector.setAttribute("style", "opacity: 1;");
        mutualFundsSelector.setAttribute("style", "opacity: 1;");
        stocksSelector.setAttribute("style", "opacity: 1;");
        outputLabel.innerHTML = 'Price';
        outputDisplay.innerHTML = '';
        highLabel.innerHTML = 'High';
        highDisplay.innerHTML = '';
        lowLabel.innerHTML = 'Low';
        lowDisplay.innerHTML = '';
      }

      function realitimeToInitial() {
        let realtimeStockAction = document.getElementById('realtimeStockAction');
        let financialInstrumentSelector = document.getElementById('financialInstrumentSelector');
        let currencySelector = document.getElementById('currencySelector');
        let mutualFundsSelector = document.getElementById('mutualFundsSelector');
        let stocksSelector = document.getElementById('stocksSelector');
        let outputLabel = document.getElementById('outputLabel');
        let outputDisplay = document.getElementById('outputDisplay');
        let highLabel = document.getElementById('highLabel');
        let highDisplay = document.getElementById('highDisplay');
        let lowLabel = document.getElementById('lowLabel');
        let lowDisplay = document.getElementById('lowDisplay');

        realtimeStockAction.setAttribute("style", "display: none;");
        financialInstrumentSelector.setAttribute("style", "display: initial;");
        currencySelector.setAttribute("style", "opacity: 1;");
        mutualFundsSelector.setAttribute("style", "opacity: 1;");
        stocksSelector.setAttribute("style", "opacity: 1;");
        outputLabel.innerHTML = 'Price';
        outputDisplay.innerHTML = '';
        highLabel.innerHTML = 'High';
        highDisplay.innerHTML = '';
        lowLabel.innerHTML = 'Low';
        lowDisplay.innerHTML = '';
      }

      function companyDisplayToInitial() {
        let companyDisplayPickDataStream = document.getElementById('companyDisplayPickDataStream');
        let financialInstrumentSelector = document.getElementById('financialInstrumentSelector');
        let currencySelector = document.getElementById('currencySelector');
        let mutualFundsSelector = document.getElementById('mutualFundsSelector');
        let stocksSelector = document.getElementById('stocksSelector');

        companyDisplayPickDataStream.setAttribute("style", "display: none;");
        financialInstrumentSelector.setAttribute("style", "display: initial;");
        currencySelector.setAttribute("style", "opacity: 1;");
        mutualFundsSelector.setAttribute("style", "opacity: 1;");
        stocksSelector.setAttribute("style", "opacity: 1;");
      }

      function stockPickerToBeginning() {
        let stockPicker = document.getElementById('stockPicker');
        let financialInstrumentSelector = document.getElementById('financialInstrumentSelector');
        let currencySelector = document.getElementById('currencySelector');
        let mutualFundsSelector = document.getElementById('mutualFundsSelector');
        let stocksSelector = document.getElementById('stocksSelector');

        stockPicker.setAttribute("style", "display: none;");
        financialInstrumentSelector.setAttribute("style", "display: initial;");
        currencySelector.setAttribute("style", "opacity: 1;");
        mutualFundsSelector.setAttribute("style", "opacity: 1;");
        stocksSelector.setAttribute("style", "opacity: 1;");
      }

      function randomizeMutualFundSymbol() {
        let mutualFundSymbolInput = document.getElementById('mutualFundSymbolInput');
        let symbolLength = 5;
        let symbol = '';

        for (let i = 0; i < symbolLength; i++) {
          symbol += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }

        mutualFundSymbolInput.value = symbol.toUpperCase();
      }

      function randomizeStockSymbol() {
        let stockSymbolInput = document.getElementById('stockSymbolInput');
        let symbolLength = Math.floor(Math.random() * 3) + 2;
        let symbol = '';

        for (let i = 0; i < symbolLength; i++) {
          symbol += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }


        stockSymbolInput.value = symbol;

      }

      function stockCompanyHistoricalManager(company) {
        let historicalHigh = 0;
        let historicalLow = 1000000;
        let historicalFeed = [];
        let historicalIndex = 0;
        let tracking = false;
        let historicalStockAction = document.getElementById('historicalStockAction');
        let companyDisplayPickDataStream = document.getElementById('companyDisplayPickDataStream');
        document.getElementById('companyInfoStockHistoricalCurrencyTraded');
        document.getElementById('companyInfoStockHistoricalDay');
        let companyInfoStockHistoricalDayVolume = document.getElementById('companyInfoStockHistoricalDayVolume');
        let companyInfoStockHistoricalPaneCompanyName = document.getElementById('companyInfoStockHistoricalPaneCompanyName');
        document.getElementById('companyInfoStockHistoricalPaneStockExchange');
        let historicalStockButtonsDiv = document.getElementById('historicalStockButtonsDiv');
        let companyHistoricalStockQuoteStartButton = document.getElementById('companyHistoricalStockQuoteStartButton');
        if (companyHistoricalStockQuoteStartButton) {
          companyHistoricalStockQuoteStartButton.parentNode.removeChild(companyHistoricalStockQuoteStartButton);
          companyHistoricalStockQuoteStartButton = document.createElement('button');
          historicalStockButtonsDiv.appendChild(companyHistoricalStockQuoteStartButton);
          companyHistoricalStockQuoteStartButton.id = 'companyHistoricalStockQuoteStartButton';
          companyHistoricalStockQuoteStartButton.innerHTML = 'start';
          companyHistoricalStockQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
        }
        let companyHistoricalStockQuoteStopButton = document.getElementById('companyHistoricalStockQuoteStopButton');
        if (companyHistoricalStockQuoteStopButton) {
          companyHistoricalStockQuoteStopButton.parentNode.removeChild(companyHistoricalStockQuoteStopButton);
          companyHistoricalStockQuoteStopButton = document.createElement('button');
          historicalStockButtonsDiv.appendChild(companyHistoricalStockQuoteStopButton);
          companyHistoricalStockQuoteStopButton.id = 'companyHistoricalStockQuoteStopButton';
          companyHistoricalStockQuoteStopButton.innerHTML = 'stop';
          companyHistoricalStockQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
        }
        let outputLabel = document.getElementById('outputLabel');
        let highLabel = document.getElementById('highLabel');
        let lowLabel = document.getElementById('lowLabel');
        let outputDisplay = document.getElementById('outputDisplay');
        let lowDisplay = document.getElementById('lowDisplay');
        let highDisplay = document.getElementById('highDisplay');
        let historicalStockInterval = document.getElementById('historicalStockInterval');
        let companyStockHistoricalReturnImg = document.getElementById('companyStockHistoricalReturnImg');


        $http.get(`/currency_type_query/${company.currency}`)
        .then(currencyTypeData => {
          let currencyType = currencyTypeData.data;
          window.clearInterval(displayHistoricalQuotes);
          companyInfoStockHistoricalCurrencyTraded.innerHTML = currencyType[0].currencies[0].name + ' : ' +  currencyType[0].currencies[0].symbol;
          companyInfoStockHistoricalDay.innerHTML = '';
          companyInfoStockHistoricalDayVolume.innerHTML = '';

          function displayHistoricalQuotes() {
            let transactionTime;
            let cleanDate = '';
            let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
            let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

            if (tracking) {
              if (historicalIndex === historicalFeed.length) {
                historicalIndex = 0;
              }
              transactionTime = new Date(historicalFeed[historicalIndex].timestamp);
              outputDisplay.innerHTML = historicalFeed[historicalIndex].open;
              if (parseFloat(historicalFeed[historicalIndex].low) < historicalLow) {
                historicalLow = parseFloat(historicalFeed[historicalIndex].low).toFixed(2);
                lowDisplay.innerHTML = historicalLow;
              }
              if (parseFloat(historicalFeed[historicalIndex].high) > historicalHigh) {
                historicalHigh = parseFloat(historicalFeed[historicalIndex].high).toFixed(2);
                highDisplay.innerHTML = historicalHigh;
              }
              companyInfoStockHistoricalDayVolume.innerHTML = 'Volume: ' + historicalFeed[historicalIndex].volume;
              cleanDate = days[transactionTime.getDay()] + ', ' + transactionTime.getFullYear() + ' ' + months[transactionTime.getMonth()] + ' ' + transactionTime.getDate();
              companyInfoStockHistoricalDay.innerHTML = cleanDate;
              ++historicalIndex;
            }
          }

          function populateHistoricalQuotes() {

            $http.get(`/historical_stock_quotes/${company.symbol}`)
            .then(historicalData => {
              let historical = historicalData.data.history;
              console.log(historical);
              historicalIndex = 0;
              historicalFeed = [];
              for (let key in historical) {
                historicalFeed[historicalIndex] = {
                  timestamp: key,
                  close: historical[key].close,
                  high: historical[key].high,
                  low: historical[key].low,
                  open: historical[key].open,
                  volume: historical[key].volume
                };
                ++historicalIndex;
              }
              historicalIndex = 0;
              displayHistoricalQuotes();
              setTimeout(() => {
                let quoter = setInterval(displayHistoricalQuotes, (parseFloat(historicalStockInterval.value) * 1000));
              }, (parseFloat(historicalStockInterval.value) * 1000));
            });

          }

          companyHistoricalStockQuoteStartButton.addEventListener('click', () => {
            tracking = true;
            companyStockHistoricalReturnImg.setAttribute("style", "visibility: hidden;");
            companyHistoricalStockQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
            companyHistoricalStockQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: visible;");
            outputLabel.innerHTML = 'Price in ' + currencyType[0].currencies[0].symbol;
            highLabel.innerHTML = 'High in ' + currencyType[0].currencies[0].symbol;
            lowLabel.innerHTML = 'Low in ' + currencyType[0].currencies[0].symbol;
            if (historicalFeed.length === 0) {
              historicalIndex = 0;
              historicalHigh = 0;
              historicalLow = 1000000;
              populateHistoricalQuotes();
            } else {
              displayHistoricalQuotes();
              setTimeout(() => {
                let quoter = setInterval(displayHistoricalQuotes, (parseFlaot(historicalStockInterval.value) * 1000));
              }, (parseFloat(historicalStockInterval.value) * 1000));
            }
          });

          companyHistoricalStockQuoteStopButton.addEventListener('click', () => {
            tracking = false;
            companyStockHistoricalReturnImg.setAttribute("style", "visibility: visible;");
            window.clearInterval(displayHistoricalQuotes);
            companyHistoricalStockQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
            companyHistoricalStockQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
            outputLabel.innerHTML = 'Price';
            highLabel.innerHTML = 'High';
            lowLabel.innerHTML = 'Low';
          });
        });


        historicalStockAction.setAttribute("style", "display: initial;");
        companyDisplayPickDataStream.setAttribute("style", "display: none;");
        companyInfoStockHistoricalPaneCompanyName.innerHTML = company.name;
        companyInfoStockHistoricalPaneStockExchange.innerHTML = company.stock_exchange_long;
      }

      function stockCompanyIntradayManager(company) {
        let intradayHigh = 0;
        let intradayLow = 1000000;
        let intradayFeed = [];
        let intradayIndex = 0;
        let tracking = false;
        let companyDisplayPickDataStream = document.getElementById('companyDisplayPickDataStream');
        let intradayStockAction = document.getElementById('intradayStockAction');
        let companyInfoStockIntradayPaneCompanyName = document.getElementById('companyInfoStockIntradayPaneCompanyName');
        let companyInfoStockIntradayPaneStockExchange = document.getElementById('companyInfoStockIntradayPaneStockExchange');
        let companyInfoStockIntradayCurrencyTraded = document.getElementById('companyInfoStockIntradayCurrencyTraded');
        let companyInfoStockIntradayMinute = document.getElementById('companyInfoStockIntradayMinute');
        let companyInfoStockIntradayMinuteVolume = document.getElementById('companyInfoStockIntradayMinuteVolume');
        let intradayStockButtonsDiv = document.getElementById('intradayStockButtonsDiv');
        let companyIntradayStockQuoteStartButton = document.getElementById('companyIntradayStockQuoteStartButton');
        if (companyIntradayStockQuoteStartButton) {
          companyIntradayStockQuoteStartButton.parentNode.removeChild(companyIntradayStockQuoteStartButton);
          companyIntradayStockQuoteStartButton = document.createElement('button');
          intradayStockButtonsDiv.appendChild(companyIntradayStockQuoteStartButton);
          companyIntradayStockQuoteStartButton.id = 'companyIntradayStockQuoteStartButton';
          companyIntradayStockQuoteStartButton.innerHTML = 'start';
          companyIntradayStockQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
        }
        let companyIntradayStockQuoteStopButton = document.getElementById('companyIntradayStockQuoteStopButton');
        if (companyIntradayStockQuoteStopButton) {
          companyIntradayStockQuoteStopButton.parentNode.removeChild(companyIntradayStockQuoteStopButton);
          companyIntradayStockQuoteStopButton = document.createElement('button');
          intradayStockButtonsDiv.appendChild(companyIntradayStockQuoteStopButton);
          companyIntradayStockQuoteStopButton.id = 'companyIntradayStockQuoteStopButton';
          companyIntradayStockQuoteStopButton.innerHTML = 'stop';
          companyIntradayStockQuoteStopButton.setAttribute("style", "cursor: pointer; visibiity: hidden;");
        }
        let outputLabel = document.getElementById('outputLabel');
        let outputDisplay = document.getElementById('outputDisplay');
        outputDisplay.innerHTML = '';
        let highLabel = document.getElementById('highLabel');
        let highDisplay = document.getElementById('highDisplay');
        highDisplay.innerHTML = '';
        let lowLabel = document.getElementById('lowLabel');
        let lowDisplay = document.getElementById('lowDisplay');
        lowDisplay.innerHTML = '';
        let intradayStockInterval = document.getElementById('intradayStockInterval');
        let companyStockIntradayReturnImg = document.getElementById('companyStockIntradayReturnImg');

        $http.get(`/currency_type_query/${company.currency}`)
        .then(currencyTypeData => {
          let currencyType = currencyTypeData.data;
          window.clearInterval(populateIntradayQuotes);
          console.log(currencyType);
          companyInfoStockIntradayCurrencyTraded.innerHTML = currencyType[0].currencies[0].name + ' : ' +  currencyType[0].currencies[0].symbol;
          companyInfoStockIntradayMinute.innerHTML = '';
          companyInfoStockIntradayMinuteVolume.innerHTML = '';

          function displayIntradayFeed() {
            let transactionTime;
            let cleanDate = '';
            let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
            let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

            if (tracking) {
              if (intradayIndex === intradayFeed.length) {
                intradayIndex = 0;
              }
              transactionTime = new Date(intradayFeed[intradayIndex].timestamp);
              outputDisplay.innerHTML = intradayFeed[intradayIndex].open;
              if (parseFloat(intradayFeed[intradayIndex].low) < intradayLow) {
                intradayLow = parseFloat(intradayFeed[intradayIndex].low).toFixed(2);
                lowDisplay.innerHTML = intradayLow;
              }
              if (parseFloat(intradayFeed[intradayIndex].high) > intradayHigh) {
                intradayHigh = parseFloat(intradayFeed[intradayIndex].high).toFixed(2);
                highDisplay.innerHTML = intradayHigh;
              }
              companyInfoStockIntradayMinuteVolume.innerHTML = 'Volume: ' + intradayFeed[intradayIndex].volume;
              console.log(transactionTime.getHours());
              cleanDate = days[transactionTime.getDay()] + ', ' + transactionTime.getFullYear() + ' ' + months[transactionTime.getMonth()] + ' ' + transactionTime.getDate() + ' - ' + transactionTime.getHours() + ':';
              if (transactionTime.getMinutes() < 10) {
                cleanDate += '0' + transactionTime.getMinutes();
              } else {
                cleanDate += transactionTime.getMinutes();
              }
              companyInfoStockIntradayMinute.innerHTML = cleanDate;
              ++intradayIndex;
            }
          }

          function populateIntradayQuotes() {
            $http.get(`/intraday_stock_quotes/${company.symbol}`)
            .then(intradayFeedData => {
              let intradayObject = intradayFeedData.data.intraday;
              console.log(intradayObject);
              intradayFeed = [];
              for (let key in intradayObject) {
                intradayFeed[intradayIndex] = {
                  timestamp: key,
                  close: intradayObject[key].close,
                  high: intradayObject[key].high,
                  low: intradayObject[key].low,
                  open: intradayObject[key].open,
                  volume: intradayObject[key].volume
                };
                ++intradayIndex;
              }
              console.log(intradayFeed);
              intradayIndex = 0;
              displayIntradayFeed()
              setTimeout(() => {
                let quoter = setInterval(displayIntradayFeed, (parseInt(intradayStockInterval.value) * 1000));
              }, (parseInt(intradayStockInterval.value) * 1000));

            });
          }

          companyIntradayStockQuoteStartButton.addEventListener('click', () => {
            tracking = true;
            companyStockIntradayReturnImg.setAttribute("style", "visibility: hidden;");
            companyIntradayStockQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
            companyIntradayStockQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: visible;");
            outputLabel.innerHTML = 'Price in ' + currencyType[0].currencies[0].symbol;
            highLabel.innerHTML = 'High in ' + currencyType[0].currencies[0].symbol;
            lowLabel.innerHTML = 'Low in ' + currencyType[0].currencies[0].symbol;
            if (intradayFeed.length === 0) {
              intradayIndex = 0;
              intradayHigh = 0;
              intradayLow = 1000000;
              populateIntradayQuotes();
            } else {
              displayIntradayFeed();
              setTimeout(() => {
                let quoter = setInterval(displayIntradayFeed, (parseInt(intradayStockInterval.value) * 1000));
              }, (parseInt(intradayStockInterval.value) * 1000));

            }
          });

          companyIntradayStockQuoteStopButton.addEventListener('click', () => {
            tracking = false;
            window.clearInterval(populateIntradayQuotes);
            companyIntradayStockQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
            companyIntradayStockQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
            outputLabel.innerHTML = 'Price';
            highLabel.innerHTML = 'High';
            lowLabel.innerHTML = 'Low';
            companyStockIntradayReturnImg.setAttribute("style", "visibility: visible;");
          });

        });


        companyDisplayPickDataStream.setAttribute("style", "display: none;");
        intradayStockAction.setAttribute("style", "display: initial;");
        companyInfoStockIntradayPaneCompanyName.innerHTML = company.name;
        companyInfoStockIntradayPaneStockExchange.innerHTML = company.stock_exchange_long;
      }

      function stockCompanyRealtimeManager(company) {
        let tracking = false;
        let companyDisplayPickDataStream = document.getElementById('companyDisplayPickDataStream');
        let realtimeStockAction = document.getElementById('realtimeStockAction');
        let companyInfoRealtimePaneCompanyName = document.getElementById('companyInfoRealtimePaneCompanyName');
        let companyInfoRealtimePaneStockExchange = document.getElementById('companyInfoRealtimePaneStockExchange');
        let companyInfoRealtimeCurrencyTraded = document.getElementById('companyInfoRealtimeCurrencyTraded');
        let realTimeStockButtonsDiv = document.getElementById('realTimeStockButtonsDiv');
        let companyRealtimeStockQuoteStartButton = document.getElementById('companyRealtimeStockQuoteStartButton');
        if (companyRealtimeStockQuoteStartButton) {
          companyRealtimeStockQuoteStartButton.parentNode.removeChild(companyRealtimeStockQuoteStartButton);
          companyRealtimeStockQuoteStartButton = document.createElement('button');
          realTimeStockButtonsDiv.appendChild(companyRealtimeStockQuoteStartButton);
          companyRealtimeStockQuoteStartButton.id = 'companyRealtimeStockQuoteStartButton';
          companyRealtimeStockQuoteStartButton.innerHTML = 'start';
          companyRealtimeStockQuoteStartButton.setAttribute("style", "visibility: visible; cursor: pointer;");
        }
        let companyRealtimeStockQuoteStopButton = document.getElementById('companyRealtimeStockQuoteStopButton');
        if (companyRealtimeStockQuoteStopButton) {
          companyRealtimeStockQuoteStopButton.parentNode.removeChild(companyRealtimeStockQuoteStopButton);
          companyRealtimeStockQuoteStopButton = document.createElement('button');
          realTimeStockButtonsDiv.appendChild(companyRealtimeStockQuoteStopButton);
          companyRealtimeStockQuoteStopButton.id = 'companyRealtimeStockQuoteStopButton';
          companyRealtimeStockQuoteStopButton.innerHTML = 'stop';
          companyRealtimeStockQuoteStopButton.setAttribute("style", "visibility: hidden; cursor: pointer;");
        }
        let realtimeStockInterval = document.getElementById('realtimeStockInterval');
        let outputLabel = document.getElementById('outputLabel');
        let outputDisplay = document.getElementById('outputDisplay');
        let highLabel = document.getElementById('highLabel');
        let highDisplay = document.getElementById('highDisplay');
        let lowLabel = document.getElementById('lowLabel');
        let lowDisplay = document.getElementById('lowDisplay');
        let companyStockRealtimeReturnImg = document.getElementById('companyStockRealtimeReturnImg');

        $http.get(`/currency_type_query/${company.currency}`)
        .then(currencyTypeData => {
          window.clearInterval(getStockQuote);
          let currencyType = currencyTypeData.data;
          console.log(currencyType);
          companyInfoRealtimeCurrencyTraded.innerHTML = currencyType[0].currencies[0].name + ' : ' +  currencyType[0].currencies[0].symbol;

          function getStockQuote() {
            if (tracking) {
              $http.get(`/realtime_stock_quotes/${company.symbol}`)
              .then(quoteData => {
                let quote = quoteData.data.data[0];
                console.log(quote);
                outputDisplay.innerHTML = quote.price;
                highDisplay.innerHTML = quote.day_high;
                lowDisplay.innerHTML = quote.day_low;
              });
            }
          }

          companyRealtimeStockQuoteStartButton.addEventListener('click', () => {
            tracking = true;
            companyRealtimeStockQuoteStartButton.setAttribute("style", "visibility: hidden; cusor: pointer;");
            companyRealtimeStockQuoteStopButton.setAttribute("style", "visibility: visible; cursor: pointer;");
            outputLabel.innerHTML = 'Price in ' + currencyType[0].currencies[0].symbol;
            highLabel.innerHTML = 'High in ' + currencyType[0].currencies[0].symbol;
            lowLabel.innerHTML = 'Low in ' + currencyType[0].currencies[0].symbol;
            getStockQuote();
            let quoter = setInterval(getStockQuote, (parseInt(realtimeStockInterval.value) * 1000));
            companyStockRealtimeReturnImg.setAttribute("style", "visibility: hidden;");
          });
          companyRealtimeStockQuoteStopButton.addEventListener('click', () => {
            tracking = false;
            companyRealtimeStockQuoteStartButton.setAttribute("style", "visibility: visible; cusor: pointer;");
            companyRealtimeStockQuoteStopButton.setAttribute("style", "visibility: hidden; cursor: pointer;");
            window.clearInterval(getStockQuote);
            outputDisplay.innerHTML = '';
            outputLabel.innerHTML = 'Price';
            highLabel.innerHTML = 'High';
            highDisplay.innerHTML = '';
            lowLabel.innerHTML = 'Low';
            lowDisplay.innerHTML = '';
            companyStockRealtimeReturnImg.setAttribute("style", "visibility: visible;");
          });
        });

        companyDisplayPickDataStream.setAttribute("style", "display: none;");
        realtimeStockAction.setAttribute("style", "display: initial;");
        companyInfoRealtimePaneCompanyName.innerHTML = company.name;
        companyInfoRealtimePaneStockExchange.innerHTML = company.stock_exchange_long;
      }

      function selectCompany(company) {
        let companyDisplayPickDataStream = document.getElementById('companyDisplayPickDataStream');
        let stockPicker = document.getElementById('stockPicker');
        let companyInfoPaneCompanyName = document.getElementById('companyInfoPaneCompanyName');
        let companyInfoPaneSymbol = document.getElementById('companyInfoPaneSymbol');
        let companyInfoPaneStockExchange = document.getElementById('companyInfoPaneStockExchange');
        let companyInfoCurrencyTraded = document.getElementById('companyInfoCurrencyTraded');
        let companyInfoPaneCurrentPrice = document.getElementById('companyInfoPaneCurrentPrice');
        let companyDataStreamPickerButtonDiv = document.getElementById('companyDataStreamPickerButtonDiv');
        let companyDataStreamPickerRealTimeButton = document.getElementById('companyDataStreamPickerRealTimeButton');
        if (companyDataStreamPickerRealTimeButton) {
          companyDataStreamPickerRealTimeButton.parentNode.removeChild(companyDataStreamPickerRealTimeButton);
          companyDataStreamPickerRealTimeButton = document.createElement('button');
          companyDataStreamPickerButtonDiv.appendChild(companyDataStreamPickerRealTimeButton);
          companyDataStreamPickerRealTimeButton.id = 'companyDataStreamPickerRealTimeButton';
          companyDataStreamPickerRealTimeButton.innerHTML = 'Real Time';
        }
        let companyDataStreamPickerIntradayButton = document.getElementById('companyDataStreamPickerIntradayButton');
        if (companyDataStreamPickerIntradayButton) {
          companyDataStreamPickerIntradayButton.parentNode.removeChild(companyDataStreamPickerIntradayButton);
          companyDataStreamPickerIntradayButton = document.createElement('button');
          companyDataStreamPickerButtonDiv.appendChild(companyDataStreamPickerIntradayButton);
          companyDataStreamPickerIntradayButton.id = 'companyDataStreamPickerIntradayButton';
          companyDataStreamPickerIntradayButton.innerHTML = 'Intraday';
        }
        let companyDataStreamPickerHistoricalButton = document.getElementById('companyDataStreamPickerHistoricalButton');
        if (companyDataStreamPickerHistoricalButton) {
          companyDataStreamPickerHistoricalButton.parentNode.removeChild(companyDataStreamPickerHistoricalButton);
          companyDataStreamPickerHistoricalButton = document.createElement('button');
          companyDataStreamPickerButtonDiv.appendChild(companyDataStreamPickerHistoricalButton);
          companyDataStreamPickerHistoricalButton.id = 'companyDataStreamPickerHistoricalButton';
          companyDataStreamPickerHistoricalButton.innerHTML = 'Historical';
        }

        stockPicker.setAttribute("style", "display: none;");
        companyDisplayPickDataStream.setAttribute("style", "display: initial;");
        companyInfoPaneCompanyName.innerHTML = company.name;
        companyInfoPaneSymbol.innerHTML = company.symbol;
        companyInfoPaneStockExchange.innerHTML = company.stock_exchange_long;
        companyInfoCurrencyTraded.innerHTML = company.currency;
        companyInfoPaneCurrentPrice.innerHTML = company.price;

        companyDataStreamPickerRealTimeButton.addEventListener('click', () => {
          stockCompanyRealtimeManager(company);
        });

        companyDataStreamPickerIntradayButton.addEventListener('click', () => {
          stockCompanyIntradayManager(company);
        });

        companyDataStreamPickerHistoricalButton.addEventListener('click', () => {
          stockCompanyHistoricalManager(company);
        });
      }

      function submitMutualFundSymbol() {
        let mutualFundSymbolInput = document.getElementById('mutualFundSymbolInput');

        if (mutualFundSymbolInput.value !== '') {
          $http.get(`/mutual_fund_symbol_query/${mutualFundSymbolInput.value}`)
          .then(mutualFundResultData => {
            let mutualFundResult = mutualFundResultData.data.data;
            console.log(mutualFundResult);
            vm.mutualFundSymbolResults = [];
            for (let i = 0; i < mutualFundResult.length; i++) {
              vm.mutualFundSymbolResults[i] = {
                name: mutualFundResult[i].name,
                symbol: mutualFundResult[i].symbol,
                yield_pct: mutualFundResult[i].yield_pct,
                price: mutualFundResult[i].price,
                close_yesterday: mutualFundResult[i].close_yesterday,
                return_ytd: mutualFundResult[i].return_ytd,
                net_assets: mutualFundResult[i].net_assets,
                change_asset_value: mutualFundResult[i].change_asset_value,
                change_pct: mutualFundResult[i].change_pct,
                yield_pct: mutualFundResult[i].yield_pct,
                return_day: mutualFundResult[i].return_day,
                return_1week: mutualFundResult[i].return_1week,
                return_4week: mutualFundResult[i].return_4week,
                return_13week: mutualFundResult[i].return_13week,
                return_52week: mutualFundResult[i].return_52week,
                return_156week: mutualFundResult[i].return_156week,
                return_260week: mutualFundResult[i].return_260week,
                income_dividend: mutualFundResult[i].income_dividend,
                income_dividend_date: mutualFundResult[i].income_dividend_date,
                capital_gain: mutualFundResult[i].capital_gain,
                expense_ratio: mutualFundResult[i].expense_ratio
              }
            }
          });
        }
      }

      function submitStockSymbol() {
        let stockSymbolInput = document.getElementById('stockSymbolInput');

        if (stockSymbolInput.value !== '') {
          $http.get(`/stock_symbol_query/${stockSymbolInput.value}`)
          .then(stockResultsData => {
            let stockResults = stockResultsData.data.data;
            console.log(stockResults);
            vm.stockSymbolResults = [];
            for (let i = 0; i < stockResults.length; i++) {
              vm.stockSymbolResults[i] = {
                symbol: stockResults[i].symbol,
                name: stockResults[i].name,
                stock_exchange_long: stockResults[i].stock_exchange_long,
                currency: stockResults[i].currency,
                price: stockResults[i].price
              }
            }
          });
        } else {
          vm.stockSymbolResults = [];
        }
      }

      function mutualFundsSelectedByUser() {
        let currencySelector = document.getElementById('currencySelector');
        let mutualFundsSelector = document.getElementById('mutualFundsSelector');
        let stocksSelector = document.getElementById('stocksSelector');
        let mutualFundPicker = document.getElementById('mutualFundPicker');
        let mutualFundSymbolInput = document.getElementById('mutualFundSymbolInput');

        currencySelector.setAttribute("style", "opacity: 0; transition: opacity 0.4s linear;");
        setTimeout(() => {
          stocksSelector.setAttribute("style", "opacity: 0; transition: opacity 0.4s linear;");
          setTimeout(() => {
            mutualFundsSelector.setAttribute("style", "opacity: 0; transition: opacity 0.4s linear;");
            setTimeout(() => {
              financialInstrumentSelector.setAttribute("style", "display: none;");
              mutualFundPicker.setAttribute("style", "display: initial;");
              mutualFundSymbolInput.focus();
            }, 400);
          }, 200);
        }, 200);
      }

      function stocksSelectedByUser() {
        let currencySelector = document.getElementById('currencySelector');
        let mutualFundsSelector = document.getElementById('mutualFundsSelector');
        let stocksSelector = document.getElementById('stocksSelector');
        let stockPicker = document.getElementById('stockPicker');
        let stockSymbolInput = document.getElementById('stockSymbolInput');

        currencySelector.setAttribute("style", "opacity: 0; transition: opacity 0.4s linear;");
        setTimeout(() => {
          mutualFundsSelector.setAttribute("style", "opacity: 0; transition: opacity 0.4s linear;");
          setTimeout(() => {
            stocksSelector.setAttribute("style", "opacity: 0; transition: opacity 0.4s linear;");
            setTimeout(() => {
              financialInstrumentSelector.setAttribute("style", "display: none;");
              stockPicker.setAttribute("style", "display: initial;");
              stockSymbolInput.focus();
            }, 400);
          }, 200);
        }, 200);
      }


      function onInit() {
        console.log("Financial Module Test is lit");
        let theBody = document.getElementsByTagName("body")[0];
        theBody.setAttribute("style", "opacity: 1; filter: hue-rotate(0deg);");


      }

    }

}());
