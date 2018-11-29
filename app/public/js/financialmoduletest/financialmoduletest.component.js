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

      function randomizeStockSymbol() {
        let stockSymbolInput = document.getElementById('stockSymbolInput');
        let symbolLength = Math.floor(Math.random() * 3) + 2;
        let symbol = '';

        for (let i = 0; i < symbolLength; i++) {
          symbol += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }


        stockSymbolInput.value = symbol;

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

            if (intradayIndex === intradayFeed.length) {
              intradayIndex = 0;
            }
            transactionTime = new Date(intradayFeed[intradayIndex].timestamp);
            outputDisplay.innerHTML = intradayFeed[intradayIndex].open;
            if (parseFloat(intradayFeed[intradayIndex].low) < intradayLow) {
              intradayLow = parseFloat(intradayFeed[intradayIndex].low);
              lowDisplay.innerHTML = intradayLow;
            }
            if (parseFloat(intradayFeed[intradayIndex].high) > intradayHigh) {
              intradayHigh = parseFloat(intradayFeed[intradayIndex].high);
              highDisplay.innerHTML = intradayHigh;
            }
            companyInfoStockIntradayMinuteVolume.innerHTML = 'Volume: ' + intradayFeed[intradayIndex].volume;
            console.log(transactionTime.getHours());
            cleanDate = days[transactionTime.getDay()] + ', ' + transactionTime.getFullYear() + ' ' + months[transactionTime.getMonth()] + ' ' + transactionTime.getDate() + ' - ' + transactionTime.getHours() + ':' + transactionTime.getMinutes();
            companyInfoStockIntradayMinute.innerHTML = cleanDate;
            ++intradayIndex;
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
