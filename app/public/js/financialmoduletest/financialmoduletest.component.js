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
