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
      vm.selectFund = selectFund;
      vm.realitimeMutualFundToInitial = realitimeMutualFundToInitial;
      vm.intradayMutualToInitial = intradayMutualToInitial;
      vm.historicalMutualFundToInitial = historicalMutualFundToInitial;
      vm.currencySelectedByUser = currencySelectedByUser;
      vm.submitCurrencySymbol = submitCurrencySymbol;
      vm.selectCurrencyCombination = selectCurrencyCombination;
      vm.currencyPickerToBeginning = currencyPickerToBeginning;
      vm.randomizeCurrencySymbol = randomizeCurrencySymbol;
      vm.currencyDisplayToInitial = currencyDisplayToInitial;
      vm.realitimeCurrencyToInitial = realitimeCurrencyToInitial;
      vm.historicalCurrencyToInitial = historicalCurrencyToInitial;

      function historicalCurrencyToInitial() {
        let historicalCurrencyAction = document.getElementById('historicalCurrencyAction');
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

        historicalCurrencyAction.setAttribute("style", "display: none;");
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

      function realitimeCurrencyToInitial() {
        let realtimeCurrencyAction = document.getElementById('realtimeCurrencyAction');
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

        realtimeCurrencyAction.setAttribute("style", "display: none;");
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

      function currencyDisplayToInitial() {
        let currencyDisplayPickDataStream = document.getElementById('currencyDisplayPickDataStream');
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

        currencyDisplayPickDataStream.setAttribute("style", "display: none;");
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

      function currencyPickerToBeginning() {
        let currencyPicker = document.getElementById('currencyPicker');
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

        currencyPicker.setAttribute("style", "display: none;");
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

      function historicalMutualFundToInitial() {
        let historicalMutualFundAction = document.getElementById('historicalMutualFundAction');
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

        historicalMutualFundAction.setAttribute("style", "display: none;");
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

      function intradayMutualToInitial() {
        let intradayMutualFundAction = document.getElementById('intradayMutualFundAction');
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

        intradayMutualFundAction.setAttribute("style", "display: none;");
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

      function realitimeMutualFundToInitial() {
        let realtimeMutualFundAction = document.getElementById('realtimeMutualFundAction');
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

        realtimeMutualFundAction.setAttribute("style", "display: none;");
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

      function randomizeCurrencySymbol() {
        let currencySymbolInput = document.getElementById('currencySymbolInput');
        let symbolLength = 3;
        let symbol = '';

        for (let i = 0; i < symbolLength; i++) {
          symbol += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }

        currencySymbolInput.value = symbol.toUpperCase();
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

      function currencyHistoricalManager() {
        let tracking = false;
        let historicalHigh = 0;
        let historicalLow = 1000000;
        let historicalFeed = [];
        let historicalIndex = 0;
        let currencyDisplayPickDataStream = document.getElementById('currencyDisplayPickDataStream');
        let historicalCurrencyAction = document.getElementById('historicalCurrencyAction');
        let infoCurrencyHistoricalPaneBaseCurrencyCode = document.getElementById('infoCurrencyHistoricalPaneBaseCurrencyCode');
        let infoCurrencyHistoricalPaneBaseCurrencyNameAndSymbol = document.getElementById('infoCurrencyHistoricalPaneBaseCurrencyNameAndSymbol');
        let infoCurrencyHistoricalPaneSecondaryCurrencyCode = document.getElementById('infoCurrencyHistoricalPaneSecondaryCurrencyCode');
        let infoCurrencyHistoricalPaneSecondaryCurrencyNameAndSymbol = document.getElementById('infoCurrencyHistoricalPaneSecondaryCurrencyNameAndSymbol');
        let historicalCurrencyButtonsDiv = document.getElementById('historicalCurrencyButtonsDiv');
        let companyHistoricalCurrencyQuoteStartButton = document.getElementById('companyHistoricalCurrencyQuoteStartButton');
        if (companyHistoricalCurrencyQuoteStartButton) {
          companyHistoricalCurrencyQuoteStartButton.parentNode.removeChild(companyHistoricalCurrencyQuoteStartButton);
          companyHistoricalCurrencyQuoteStartButton = document.createElement('button');
          historicalCurrencyButtonsDiv.appendChild(companyHistoricalCurrencyQuoteStartButton);
          companyHistoricalCurrencyQuoteStartButton.id = 'companyHistoricalCurrencyQuoteStartButton';
          companyHistoricalCurrencyQuoteStartButton.innerHTML = 'start';
          companyHistoricalCurrencyQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
        }
        let companyHistoricalCurrencyQuoteStopButton = document.getElementById('companyHistoricalCurrencyQuoteStopButton');
        if (companyHistoricalCurrencyQuoteStopButton) {
          companyHistoricalCurrencyQuoteStopButton.parentNode.removeChild(companyHistoricalCurrencyQuoteStopButton);
          companyHistoricalCurrencyQuoteStopButton = document.createElement('button');
          historicalCurrencyButtonsDiv.appendChild(companyHistoricalCurrencyQuoteStopButton);
          companyHistoricalCurrencyQuoteStopButton.id = 'companyHistoricalCurrencyQuoteStopButton';
          companyHistoricalCurrencyQuoteStopButton.innerHTML = 'stop';
          companyHistoricalCurrencyQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
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
        let currencyHistoryDate = document.getElementById('currencyHistoryDate');
        let historicalCurrencyInterval = document.getElementById('historicalCurrencyInterval');
        window.clearInterval(displayHistoricalCurrencyValues);
        let currencyHistoricalReturnImg = document.getElementById('currencyHistoricalReturnImg');

        function displayHistoricalCurrencyValues() {
          if (tracking) {
            let quoteDate = new Date(historicalFeed[historicalIndex].timestamp);
            let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
            let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
            let dateString = days[quoteDate.getDay() + 1] + ', ' + quoteDate.getFullYear().toString() + ' ' + months[quoteDate.getMonth()] + ' ' + quoteDate.getDate().toString();

            currencyHistoryDate.innerHTML = dateString;

            outputDisplay.innerHTML = historicalFeed[historicalIndex].price;
            if (historicalHigh < parseFloat(historicalFeed[historicalIndex].price)) {
              historicalHigh = parseFloat(historicalFeed[historicalIndex].price);
              highDisplay.innerHTML = historicalHigh;
            }
            if (historicalLow > parseFloat(historicalFeed[historicalIndex].price)) {
              historicalLow = parseFloat(historicalFeed[historicalIndex].price);
              lowDisplay.innerHTML = historicalLow;
            }

            ++historicalIndex;
            if (historicalIndex === historicalFeed.length) {
              historicalIndex = 0;
            }
          }
        }

        function populateHistoricalFeed() {
          if (tracking) {
            $http.get(`/currency_history/${vm.baseCurrency.code}/${vm.secondaryCurrency.code}`)
            .then(completeCurrencyHistoryData => {
              let completeCurrencyHistory = completeCurrencyHistoryData.data.history;
              historicalFeed = [];
              historicalIndex = 0;
              for (let key in completeCurrencyHistory) {
                historicalFeed[historicalIndex] = {
                  timestamp: key,
                  price: completeCurrencyHistory[key]
                };
                ++historicalIndex;
              }
              historicalIndex = 0;
              historicalHigh = 0;
              historicalLow = 1000000;
              displayHistoricalCurrencyValues();
              setTimeout(() => {
                let qwo = setInterval(displayHistoricalCurrencyValues, (parseFloat(historicalCurrencyInterval.value) * 1000));
              }, (parseFloat(historicalCurrencyInterval.value) * 1000));
            });
          }
        }

        companyHistoricalCurrencyQuoteStartButton.addEventListener('click', () => {
          tracking = true;
          outputLabel.innerHTML = 'Price in ' + vm.secondaryCurrency.symbol;
          highLabel.innerHTML = 'High in ' + vm.secondaryCurrency.symbol;
          lowLabel.innerHTML = 'Low in ' + vm.secondaryCurrency.symbol;
          currencyHistoricalReturnImg.setAttribute("style", "visibility: hidden;");
          companyHistoricalCurrencyQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
          companyHistoricalCurrencyQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: visible;");
          if (historicalFeed.length === 0) {
            historicalIndex = 0;
            populateHistoricalFeed();
          } else {
            let qwote = setInterval(displayHistoricalCurrencyValues, (parseFloat(historicalCurrencyInterval.value) * 1000));
          }
        });

        companyHistoricalCurrencyQuoteStopButton.addEventListener('click', () => {
          tracking = false;
          outputLabel.innerHTML = 'Price';
          highLabel.innerHTML = 'High';
          lowLabel.innerHTML = 'Low';
          currencyHistoricalReturnImg.setAttribute("style", "visibility: visible;");
          companyHistoricalCurrencyQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
          companyHistoricalCurrencyQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
          outputDisplay.innerHTML = '';
          highDisplay.innerHTML = '';
          lowDisplay.innerHTML = '';
        });

        currencyDisplayPickDataStream.setAttribute("style", "display: none;");
        historicalCurrencyAction.setAttribute("style", "display: initial;");
        infoCurrencyHistoricalPaneBaseCurrencyCode.innerHTML = vm.baseCurrency.code;
        infoCurrencyHistoricalPaneBaseCurrencyNameAndSymbol.innerHTML = vm.baseCurrency.name + ' : ' + vm.baseCurrency.symbol;
        infoCurrencyHistoricalPaneSecondaryCurrencyCode.innerHTML = vm.secondaryCurrency.code;
        infoCurrencyHistoricalPaneSecondaryCurrencyNameAndSymbol.innerHTML = vm.secondaryCurrency.name + ' : ' + vm.secondaryCurrency.symbol;
      }

      function mutualFundHistoricalManager(fund) {
        let historicalHigh = 0;
        let historicalLow = 1000000;
        let historicalFeed = [];
        let historicalIndex = 0;
        let tracking = false;
        let historicalMutualFundAction = document.getElementById('historicalMutualFundAction');
        let mutualFundDisplayPickDataStream = document.getElementById('mutualFundDisplayPickDataStream');
        let infoMutualFundHistoricalPaneName = document.getElementById('infoMutualFundHistoricalPaneName');
        let infoMutualFundHistoricalPaneSymbol = document.getElementById('infoMutualFundHistoricalPaneSymbol');
        let infoMutualFundHistoricalNetAssets = document.getElementById('infoMutualFundHistoricalNetAssets');
        let infoMutualFundHistoricalDate = document.getElementById('infoMutualFundHistoricalDate');
        infoMutualFundHistoricalDate.innerHTML = '';
        let historicalMutualFundButtonsDiv = document.getElementById('historicalMutualFundButtonsDiv');
        let companyHistoricalMutualFundQuoteStartButton = document.getElementById('companyHistoricalMutualFundQuoteStartButton');
        if (companyHistoricalMutualFundQuoteStartButton) {
          companyHistoricalMutualFundQuoteStartButton.parentNode.removeChild(companyHistoricalMutualFundQuoteStartButton);
          companyHistoricalMutualFundQuoteStartButton = document.createElement('button');
          historicalMutualFundButtonsDiv.appendChild(companyHistoricalMutualFundQuoteStartButton);
          companyHistoricalMutualFundQuoteStartButton.id = 'companyHistoricalMutualFundQuoteStartButton';
          companyHistoricalMutualFundQuoteStartButton.innerHTML = 'start';
          companyHistoricalMutualFundQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible");
        }
        let companyHistoricalMutualFundQuoteStopButton = document.getElementById('companyHistoricalMutualFundQuoteStopButton');
        if (companyHistoricalMutualFundQuoteStopButton) {
          companyHistoricalMutualFundQuoteStopButton.parentNode.removeChild(companyHistoricalMutualFundQuoteStopButton);
          companyHistoricalMutualFundQuoteStopButton = document.createElement('button');
          historicalMutualFundButtonsDiv.appendChild(companyHistoricalMutualFundQuoteStopButton);
          companyHistoricalMutualFundQuoteStopButton.id = 'companyHistoricalMutualFundQuoteStopButton';
          companyHistoricalMutualFundQuoteStopButton.innerHTML = 'stop';
          companyHistoricalMutualFundQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
        }
        let mutualFundHistoricalReturnImg = document.getElementById('mutualFundHistoricalReturnImg');
        window.clearInterval(displayMutualFundFeed);
        let outputDisplay = document.getElementById('outputDisplay');
        outputDisplay.innerHTML = '';
        let highDisplay = document.getElementById('highDisplay');
        highDisplay.innerHTML = '';
        let lowDisplay = document.getElementById('lowDisplay');
        lowDisplay.innerHTML = '';
        infoMutualFundHistoricalDate.innerHTML = '';
        let historicalMutualFundInterval = document.getElementById('historicalMutualFundInterval');

        function displayMutualFundFeed() {
          if (tracking) {
            let quoteDate = new Date(historicalFeed[historicalIndex].timestamp);
            let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
            let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
            let dateString = days[quoteDate.getDay() + 1] + ', ' + quoteDate.getFullYear().toString() + ' ' + months[quoteDate.getMonth()] + ' ' + quoteDate.getDate().toString();
            infoMutualFundHistoricalDate.innerHTML = dateString;

            outputDisplay.innerHTML = historicalFeed[historicalIndex].close;
            if (historicalHigh < parseFloat(historicalFeed[historicalIndex].close)) {
              historicalHigh = parseFloat(historicalFeed[historicalIndex].close);
              highDisplay.innerHTML = historicalHigh;
            }
            if (historicalLow > parseFloat(historicalFeed[historicalIndex].close)) {
              historicalLow = parseFloat(historicalFeed[historicalIndex].close);
              lowDisplay.innerHTML = historicalLow;
            }
            ++historicalIndex;
            if (historicalIndex === historicalFeed.length) {
              historicalIndex = 0;
            }
          }
        }

        function populateMutualFundHistory() {
          historicalFeed = [];
          historicalIndex = 0;

          $http.get(`/mutual_fund_history/${fund.symbol}`)
          .then(fullMutualFundHistoryData => {
            let fullMutualFundHistory = fullMutualFundHistoryData.data.history;
            for (let key in fullMutualFundHistory) {
              historicalFeed[historicalIndex] = {
                timestamp: key,
                close: fullMutualFundHistory[key].close
              };
              ++historicalIndex;
            }
            historicalIndex = 0;
            displayMutualFundFeed();
            setTimeout(() => {
              let qtqt = setInterval(displayMutualFundFeed, (parseFloat(historicalMutualFundInterval.value) * 1000));
            }, (parseFloat(historicalMutualFundInterval.value) * 1000));
          });
        }

        companyHistoricalMutualFundQuoteStartButton.addEventListener('click', () => {
          tracking = true;
          companyHistoricalMutualFundQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
          companyHistoricalMutualFundQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: visible;");
          mutualFundHistoricalReturnImg.setAttribute("style", "visibility: hidden;");
          if (historicalFeed.length === 0) {
            historicalIndex = 0;
            historicalHigh = 0;
            historicalLow = 1000000;
            populateMutualFundHistory();
          } else {
            let qot = setInterval(displayMutualFundFeed, (parseFloat(historicalMutualFundInterval.value) * 1000));
          }
        });

        companyHistoricalMutualFundQuoteStopButton.addEventListener('click', () => {
          tracking = false;
          companyHistoricalMutualFundQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
          companyHistoricalMutualFundQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
          mutualFundHistoricalReturnImg.setAttribute("style", "visibility: visible;");
          window.clearInterval(displayMutualFundFeed);
        });

        historicalMutualFundAction.setAttribute("style", "display: initial;");
        mutualFundDisplayPickDataStream.setAttribute("style", "display: none;");
        infoMutualFundHistoricalPaneName.innerHTML = fund.name;
        infoMutualFundHistoricalPaneSymbol.innerHTML = fund.symbol;
        infoMutualFundHistoricalNetAssets.innerHTML = 'Net Assets: ' + fund.net_assets;
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

      function mutualFundIntradayManager(fund) {
        let intradayHigh = 0;
        let intradayLow = 1000000;
        let intradayFeed = [];
        let intradayIndex = 0;
        let tracking = false;
        let mutualFundDisplayPickDataStream = document.getElementById('mutualFundDisplayPickDataStream');
        let intradayMutualFundAction = document.getElementById('intradayMutualFundAction');
        let mutualFundInfoIntradayPaneName = document.getElementById('mutualFundInfoIntradayPaneName');
        let mutualFundInfoIntradayPaneSymbol = document.getElementById('mutualFundInfoIntradayPaneSymbol');
        let mutualFundInfoIntradayNetAssets = document.getElementById('mutualFundInfoIntradayNetAssets');
        let mutualFundInfoIntradayDate = document.getElementById('mutualFundInfoIntradayDate');
        mutualFundInfoIntradayDate.innerHTML = '';
        let intradayMutualFundButtonsDiv = document.getElementById('intradayMutualFundButtonsDiv');
        let mutualFundsIntradayQuoteStartButton = document.getElementById('mutualFundsIntradayQuoteStartButton');
        if (mutualFundsIntradayQuoteStartButton) {
          mutualFundsIntradayQuoteStartButton.parentNode.removeChild(mutualFundsIntradayQuoteStartButton);
          mutualFundsIntradayQuoteStartButton = document.createElement('button');
          intradayMutualFundButtonsDiv.appendChild(mutualFundsIntradayQuoteStartButton);
          mutualFundsIntradayQuoteStartButton.id = 'mutualFundsIntradayQuoteStartButton';
          mutualFundsIntradayQuoteStartButton.innerHTML = 'start';
          mutualFundsIntradayQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
        }
        let mutualFundsIntradayQuoteStopButton = document.getElementById('mutualFundsIntradayQuoteStopButton');
        if (mutualFundsIntradayQuoteStopButton) {
          mutualFundsIntradayQuoteStopButton.parentNode.removeChild(mutualFundsIntradayQuoteStopButton);
          mutualFundsIntradayQuoteStopButton = document.createElement('button');
          intradayMutualFundButtonsDiv.appendChild(mutualFundsIntradayQuoteStopButton);
          mutualFundsIntradayQuoteStopButton.id = 'mutualFundsIntradayQuoteStopButton';
          mutualFundsIntradayQuoteStopButton.innerHTML = 'stop';
          mutualFundsIntradayQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
        }
        let mutualFundIntradayReturnImg = document.getElementById('mutualFundIntradayReturnImg');
        let intradayMutualFundInterval = document.getElementById('intradayMutualFundInterval');
        window.clearInterval(displayMutualFundIntras);

        function displayMutualFundIntras() {
          if (tracking) {
            let outputDisplay = document.getElementById('outputDisplay');
            let highDisplay = document.getElementById('highDisplay');
            let lowDisplay = document.getElementById('lowDisplay');
            let mutualFundInfoIntradayDate = document.getElementById('mutualFundInfoIntradayDate');
            let quoteDate = new Date(intradayFeed[intradayIndex].onDay);
            let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
            let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
            let dateString = days[quoteDate.getDay() + 1] + ', ' + quoteDate.getFullYear() + ' ' + months[quoteDate.getMonth()] + ' ' + quoteDate.getDate().toString();

            mutualFundInfoIntradayDate.innerHTML = dateString;

            outputDisplay.innerHTML = intradayFeed[intradayIndex].close;
            if (highDisplay.innerHTML !== '') {
              if (intradayHigh < parseFloat(intradayFeed[intradayIndex].close)) {
                intradayHigh = parseFloat(intradayFeed[intradayIndex].close);
                highDisplay.innerHTML = intradayHigh;
              }
            } else {
              highDisplay.innerHTML = intradayFeed[intradayIndex].close;
            }
            if (lowDisplay.innerHTML !== '') {
              if (intradayLow > parseFloat(intradayFeed[intradayIndex].close)) {
                intradayLow = parseFloat(intradayFeed[intradayIndex].close);
                lowDisplay.innerHTML = intradayLow;
              }
            } else {
              lowDisplay.innerHTML = intradayFeed[intradayIndex].close;

            }
            ++intradayIndex;
            if (intradayIndex === intradayFeed.length) {
              intradayIndex = 0;
            }
          }
        }

        function obtainMutualFundQuote(index, theDate) {
          let quoteDay = new Date(theDate);
          let dateString = quoteDay.getFullYear().toString() + '-';
          let month = quoteDay.getMonth() + 1;
          let day = quoteDay.getDate();

          if (month < 10) {
            dateString += '0' + month.toString() + '-';
          } else {
            dateString += month.toString() + '-';
          }
          if (day < 10) {
            dateString += '0' + day.toString();
          } else {
            dateString += day.toString();
          }

          console.log(fund.symbol + ' ' + dateString);

          $http.get(`/mutual_fund_quote_by_date/${fund.symbol}/${dateString}`)
          .then(fundQuoteData => {
            console.log(fundQuoteData);
            if (!fundQuoteData.data.Message) {
              let fundQuote = fundQuoteData.data.data[fund.symbol.toUpperCase()];
              intradayFeed[index] = {
                onDay: new Date(dateString),
                close: fundQuote.close
              };
              console.log(fundQuote);
            }
          });
        }

        function populateIntradayValues() {
          // /mutual_fund_quote_by_date/:code/:date
          let now = new Date();
          intradayFeed = [];
          intradayIndex = 0;
          let dates = [];
          let indexDate = new Date(now);
          indexDate.setDate(indexDate.getDate() - 30);

          while (indexDate.getTime() !== now.getTime()) {
            if ((indexDate.getDay() !== 0) && (indexDate.getDay() !== 6)) {
              dates[dates.length] = new Date(indexDate);
            }
            indexDate.setDate(indexDate.getDate() + 1);
          }
          if ((now.getDay() !== 0) && (now.getDay() !== 6)) {
            dates[dates.length] = new Date(now);
          }
          console.log(dates);
          for (let i = 0; i < dates.length; i++) {
            obtainMutualFundQuote(intradayIndex, dates[i]);
            ++intradayIndex;
          }
          intradayIndex = 0;
          setTimeout(() => {
            for (let j = 0; j < intradayFeed.length; j++) {
              if(!intradayFeed[j]) {
                intradayFeed.splice(j, 1);
                --j;
              }
            }
            console.log(intradayFeed);
            let quoter = setInterval(displayMutualFundIntras, (parseFloat(intradayMutualFundInterval.value) * 1000));
          }, 5500);
        }

        mutualFundsIntradayQuoteStartButton.addEventListener('click', () => {
          mutualFundsIntradayQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
          mutualFundIntradayReturnImg.setAttribute("style", "visibility: hidden;");
          mutualFundsIntradayQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: visible;");
          tracking = true;
          if (intradayFeed.length === 0) {
            intradayIndex = 0;
            intradayLow = 1000000;
            intradayHigh = 0;
            populateIntradayValues();
          } else {
            let quotes = setInterval(displayMutualFundIntras, (parseFloat(intradayMutualFundInterval.value) * 1000));
          }
        });

        mutualFundsIntradayQuoteStopButton.addEventListener('click', () => {
          mutualFundsIntradayQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
          mutualFundIntradayReturnImg.setAttribute("style", "visibility: visible;");
          mutualFundsIntradayQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
          tracking = false;
          outputDisplay.innerHTML = '';
          highDisplay.innerHTML = '';
          lowDisplay.innerHTML = '';
          mutualFundInfoIntradayDate.innerHTML = '';
          window.clearInterval(displayMutualFundIntras);
        });

        mutualFundDisplayPickDataStream.setAttribute("style", "display: none;");
        intradayMutualFundAction.setAttribute("style", "display: initial;");
        mutualFundInfoIntradayPaneName.innerHTML = fund.name;
        mutualFundInfoIntradayPaneSymbol.innerHTML = fund.symbol;
        mutualFundInfoIntradayNetAssets.innerHTML = 'Net Assets: ' + fund.net_assets;
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

      function currencyRealtimeManager() {
        let tracking = false;
        let currencyDisplayPickDataStream = document.getElementById('currencyDisplayPickDataStream');
        let realtimeCurrencyAction = document.getElementById('realtimeCurrencyAction');
        let currencyInfoRealtimePaneBaseCurrencyCode = document.getElementById('currencyInfoRealtimePaneBaseCurrencyCode');
        let currencyInfoRealtimePaneBaseCurrencyNameAndSymbol = document.getElementById('currencyInfoRealtimePaneBaseCurrencyNameAndSymbol');
        let currencyInfoRealtimePaneSecondaryCurrencyCode = document.getElementById('currencyInfoRealtimePaneSecondaryCurrencyCode');
        let currencyInfoRealtimePaneSecondaryCurrencyNameAndSymbol = document.getElementById('currencyInfoRealtimePaneSecondaryCurrencyNameAndSymbol');
        let realTimeCurrencyButtonsDiv = document.getElementById('realTimeCurrencyButtonsDiv');
        let realtimeCurrencyQuoteStartButton = document.getElementById('realtimeCurrencyQuoteStartButton');
        if (realtimeCurrencyQuoteStartButton) {
          realtimeCurrencyQuoteStartButton.parentNode.removeChild(realtimeCurrencyQuoteStartButton);
          realtimeCurrencyQuoteStartButton = document.createElement('button');
          realTimeCurrencyButtonsDiv.appendChild(realtimeCurrencyQuoteStartButton);
          realtimeCurrencyQuoteStartButton.id = 'realtimeCurrencyQuoteStartButton';
          realtimeCurrencyQuoteStartButton.innerHTML = 'start';
          realtimeCurrencyQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
        }
        let realtimeCurrencyQuoteStopButton = document.getElementById('realtimeCurrencyQuoteStopButton');
        if (realtimeCurrencyQuoteStopButton) {
          realtimeCurrencyQuoteStopButton.parentNode.removeChild(realtimeCurrencyQuoteStopButton);
          realtimeCurrencyQuoteStopButton = document.createElement('button');
          realTimeCurrencyButtonsDiv.appendChild(realtimeCurrencyQuoteStopButton);
          realtimeCurrencyQuoteStopButton.id = 'realtimeCurrencyQuoteStopButton';
          realtimeCurrencyQuoteStopButton.innerHTML = 'stop';
          realtimeCurrencyQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
        }
        let currentQuote = null;
        let currencyRealtimeReturnImg = document.getElementById('currencyRealtimeReturnImg');
        let realtimeHigh = 0;
        let realtimeLow = 1000000;
        let outputLabel = document.getElementById('outputLabel');
        outputLabel.innerHTML = 'Price in ' + vm.secondaryCurrency.symbol;
        let outputDisplay = document.getElementById('outputDisplay');
        outputDisplay.innerHTML = '';
        let highLabel = document.getElementById('highLabel');
        highLabel.innerHTML = 'High in ' + vm.secondaryCurrency.symbol;
        let highDisplay = document.getElementById('highDisplay');
        highDisplay.innerHTML = '';
        let lowLabel = document.getElementById('lowLabel');
        lowLabel.innerHTML = 'Low in ' + vm.secondaryCurrency.symbol;
        let lowDisplay = document.getElementById('lowDisplay');
        lowDisplay.innerHTML = '';
        let realtimeCurrencyInterval = document.getElementById('realtimeCurrencyInterval');

        function displayRealtimeCurrencyExchange() {
          if (tracking) {
            outputDisplay.innerHTML = currentQuote[vm.secondaryCurrency.code.toUpperCase()];
            if (realtimeHigh < parseFloat(currentQuote[vm.secondaryCurrency.code.toUpperCase()])) {
              realtimeHigh = parseFloat(currentQuote[vm.secondaryCurrency.code.toUpperCase()]);
              highDisplay.innerHTML = realtimeHigh;
            }
            if (realtimeLow > parseFloat(currentQuote[vm.secondaryCurrency.code.toUpperCase()])) {
              realtimeLow = parseFloat(currentQuote[vm.secondaryCurrency.code.toUpperCase()]);
              lowDisplay.innerHTML = realtimeLow;
            }
            if (tracking) {
              setTimeout(() => {
                if (tracking) {
                  populateCurrentQuote();
                }
              }, (parseFloat(realtimeCurrencyInterval.value) * 1000));
            }
          }
        }

        function populateCurrenQuote() {
          if (tracking) {
            $http.get(`/currency_exchange_from_base/${vm.baseCurrency.code}`)
            .then(currentQuoteData => {
              currentQuote = currentQuoteData.data.data;
              displayRealtimeCurrencyExchange();
            });
          }
        }

        realtimeCurrencyQuoteStartButton.addEventListener('click', () => {
          tracking = true;
          realtimeCurrencyQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
          realtimeCurrencyQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: visible;");
          currencyRealtimeReturnImg.setAttribute("style", "visibility: hidden;");
          if (currentQuote === null) {
            populateCurrenQuote();
          } else {
            displayRealtimeCurrencyExchange();
          }
        });

        realtimeCurrencyQuoteStopButton.addEventListener('click', () => {
          tracking = false;
          realtimeCurrencyQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
          realtimeCurrencyQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
          currencyRealtimeReturnImg.setAttribute("style", "visibility: visible;");
          outputLabel.innerHTML = 'Price';
          outputDisplay.innerHTML = '';
          highLabel.innerHTML = 'High';
          highDisplay.innerHTML = '';
          lowLabel.innerHTML = 'Low'
          let lowDisplay = document.getElementById('lowDisplay');
          lowDisplay.innerHTML = '';
        });

        currencyDisplayPickDataStream.setAttribute("style", "display: none;");
        realtimeCurrencyAction.setAttribute("style", "display: initial;");
        currencyInfoRealtimePaneBaseCurrencyCode.innerHTML = vm.baseCurrency.code;
        currencyInfoRealtimePaneBaseCurrencyNameAndSymbol.innerHTML = vm.baseCurrency.name + ' : ' + vm.baseCurrency.symbol;
        currencyInfoRealtimePaneSecondaryCurrencyCode.innerHTML = vm.secondaryCurrency.code;
        currencyInfoRealtimePaneSecondaryCurrencyNameAndSymbol.innerHTML = vm.secondaryCurrency.name + ' : ' + vm.secondaryCurrency.symbol;

      }

      function mutualFundRealtimeManager(fund) {
        let tracking = false;
        let mutualFundDisplayPickDataStream = document.getElementById('mutualFundDisplayPickDataStream');
        let realtimeMutualFundAction = document.getElementById('realtimeMutualFundAction');
        let mutualFundInfoRealtimePaneName = document.getElementById('mutualFundInfoRealtimePaneName');
        let mutualFundInfoRealtimePaneSymbol = document.getElementById('mutualFundInfoRealtimePaneSymbol');
        let mutualFundInfoRealtimeNetAssets = document.getElementById('mutualFundInfoRealtimeNetAssets');
        let realTimeMutualFundButtonsDiv = document.getElementById('realTimeMutualFundButtonsDiv');
        let realtimeMutualFundQuoteStartButton = document.getElementById('realtimeMutualFundQuoteStartButton');
        if (realtimeMutualFundQuoteStartButton) {
          realtimeMutualFundQuoteStartButton.parentNode.removeChild(realtimeMutualFundQuoteStartButton);
          realtimeMutualFundQuoteStartButton = document.createElement('button');
          realTimeMutualFundButtonsDiv.appendChild(realtimeMutualFundQuoteStartButton);
          realtimeMutualFundQuoteStartButton.id = 'realtimeMutualFundQuoteStartButton';
          realtimeMutualFundQuoteStartButton.innerHTML = 'start';
          realtimeMutualFundQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
        }
        let realtimeMutualFundQuoteStopButton = document.getElementById('realtimeMutualFundQuoteStopButton');
        if (realtimeMutualFundQuoteStopButton) {
          realtimeMutualFundQuoteStopButton.parentNode.removeChild(realtimeMutualFundQuoteStopButton);
          realtimeMutualFundQuoteStopButton = document.createElement('button');
          realTimeMutualFundButtonsDiv.appendChild(realtimeMutualFundQuoteStopButton);
          realtimeMutualFundQuoteStopButton.id = 'realtimeMutualFundQuoteStopButton';
          realtimeMutualFundQuoteStopButton.innerHTML = 'stop';
          realtimeMutualFundQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
        }
        let outputDisplay = document.getElementById('outputDisplay');
        let highLabel = document.getElementById('highLabel');
        let highDisplay = document.getElementById('highDisplay');
        let lowLabel = document.getElementById('lowLabel');
        let lowDisplay = document.getElementById('lowDisplay');
        let realtimeMutualFundInterval = document.getElementById('realtimeMutualFundInterval');
        window.clearInterval(displayRealtimeMutualFundData);

        function displayRealtimeMutualFundData() {
          if (tracking) {
            $http.get(`/mutual_fund_symbol_query/${fund.symbol}`)
            .then(currentFundQuoteData => {
              let currentFundQuote = currentFundQuoteData.data.data[0];
              console.log(currentFundQuote);
              outputDisplay.innerHTML = currentFundQuote.price;
              highDisplay.innerHTML = currentFundQuote.return_ytd;
              lowDisplay.innerHTML = currentFundQuote.return_52week;
            });
          }
        }

        realtimeMutualFundQuoteStartButton.addEventListener('click', () => {
          tracking = true;
          realtimeMutualFundQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
          realtimeMutualFundQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: visible;");
          highLabel.innerHTML = 'Year To Date Return:';
          lowLabel.innerHTML = '52 Week Return:';
          displayRealtimeMutualFundData();
          setTimeout(() => {
            let quoter = setInterval(displayRealtimeMutualFundData, (parseFloat(realtimeMutualFundInterval.value) * 1000));
          }, (parseFloat(realtimeMutualFundInterval.value) * 1000));
        });

        realtimeMutualFundQuoteStopButton.addEventListener('click', () => {
          tracking = false;
          window.clearInterval(displayRealtimeMutualFundData);
          realtimeMutualFundQuoteStartButton.setAttribute("style", "cursor: pointer; visibility: visible;");
          realtimeMutualFundQuoteStopButton.setAttribute("style", "cursor: pointer; visibility: hidden;");
          highLabel.innerHTML = 'High';
          lowLabel.innerHTML = 'Low:';
        })

        mutualFundDisplayPickDataStream.setAttribute("style", "display: none;");
        realtimeMutualFundAction.setAttribute("style", "display: initial;");
        mutualFundInfoRealtimePaneName.innerHTML = fund.name;
        mutualFundInfoRealtimePaneSymbol.innerHTML = fund.symbol;
        mutualFundInfoRealtimeNetAssets.innerHTML = 'Net Assets: ' + fund.net_assets;
      }

      function selectCurrencyCombination() {
        if ((vm.baseCurrency) && (vm.secondaryCurrency)) {
          let currencyDisplayPickDataStream = document.getElementById('currencyDisplayPickDataStream');
          let currencyPicker = document.getElementById('currencyPicker');
          let currencyInfoPaneBaseCurrencyCode = document.getElementById('currencyInfoPaneBaseCurrencyCode');
          let currencyInfoPaneBaseCurrencyNameAndSymbol = document.getElementById('currencyInfoPaneBaseCurrencyNameAndSymbol');
          let currencyInfoPaneSecondaryCurrencyCode = document.getElementById('currencyInfoPaneSecondaryCurrencyCode');
          let currencyInfoPaneSecondaryCurrencyNameAndSymbol = document.getElementById('currencyInfoPaneSecondaryCurrencyNameAndSymbol');
          let currencyDataStreamPickerButtonDiv = document.getElementById('currencyDataStreamPickerButtonDiv');
          let currencyDataStreamPickerRealTimeButton = document.getElementById('currencyDataStreamPickerRealTimeButton');
          if (currencyDataStreamPickerRealTimeButton) {
            currencyDataStreamPickerRealTimeButton.parentNode.removeChild(currencyDataStreamPickerRealTimeButton);
            currencyDataStreamPickerRealTimeButton = document.createElement('button');
            currencyDataStreamPickerButtonDiv.appendChild(currencyDataStreamPickerRealTimeButton);
            currencyDataStreamPickerRealTimeButton.id = 'currencyDataStreamPickerRealTimeButton';
            currencyDataStreamPickerRealTimeButton.innerHTML = 'Real Time';
            currencyDataStreamPickerRealTimeButton.setAttribute("style", "cursor: pointer;");
          }
          let currencyDataStreamPickerHistoricalButton = document.getElementById('currencyDataStreamPickerHistoricalButton');
          if (currencyDataStreamPickerHistoricalButton) {
            currencyDataStreamPickerHistoricalButton.parentNode.removeChild(currencyDataStreamPickerHistoricalButton);
            currencyDataStreamPickerHistoricalButton = document.createElement('button');
            currencyDataStreamPickerButtonDiv.appendChild(currencyDataStreamPickerHistoricalButton);
            currencyDataStreamPickerHistoricalButton.id = 'currencyDataStreamPickerHistoricalButton';
            currencyDataStreamPickerHistoricalButton.innerHTML = 'Historical';
            currencyDataStreamPickerHistoricalButton.setAttribute("style", "cursor: pointer;");
          }

          currencyDataStreamPickerRealTimeButton.addEventListener('click', () => {
            currencyRealtimeManager();
          });

          currencyDataStreamPickerHistoricalButton.addEventListener('click', () => {
            currencyHistoricalManager();
          });

          currencyDisplayPickDataStream.setAttribute("style", "display: initial;");
          currencyPicker.setAttribute("style", "display: none;");
          currencyInfoPaneBaseCurrencyCode.innerHTML = vm.baseCurrency.code;
          currencyInfoPaneBaseCurrencyNameAndSymbol.innerHTML = vm.baseCurrency.name + ' : ' + vm.baseCurrency.symbol;
          currencyInfoPaneSecondaryCurrencyCode.innerHTML = vm.secondaryCurrency.code;
          currencyInfoPaneSecondaryCurrencyNameAndSymbol.innerHTML = vm.secondaryCurrency.name + ' : ' + vm.secondaryCurrency.symbol;
        }
      }

      function selectFund(fund) {
        let mutualFundPicker = document.getElementById('mutualFundPicker');
        let mutualFundDisplayPickDataStream = document.getElementById('mutualFundDisplayPickDataStream');
        let mutualFundInfoPaneCompanyName = document.getElementById('mutualFundInfoPaneCompanyName');
        let mutualFundInfoPaneSymbol = document.getElementById('mutualFundInfoPaneSymbol');
        let mutualFundInfoPaneNetAssets = document.getElementById('mutualFundInfoPaneNetAssets');
        let mutualFundInfoPaneCurrentPrice = document.getElementById('mutualFundInfoPaneCurrentPrice');
        let mutualFundDataStreamPickerButtonDiv = document.getElementById('mutualFundDataStreamPickerButtonDiv');
        let mutualFundDataStreamPickerRealTimeButton = document.getElementById('mutualFundDataStreamPickerRealTimeButton');
        if (mutualFundDataStreamPickerRealTimeButton) {
          mutualFundDataStreamPickerRealTimeButton.parentNode.removeChild(mutualFundDataStreamPickerRealTimeButton);
          mutualFundDataStreamPickerRealTimeButton = document.createElement('button');
          mutualFundDataStreamPickerButtonDiv.appendChild(mutualFundDataStreamPickerRealTimeButton);
          mutualFundDataStreamPickerRealTimeButton.id = 'mutualFundDataStreamPickerRealTimeButton';
          mutualFundDataStreamPickerRealTimeButton.innerHTML = 'Real Time';
          mutualFundDataStreamPickerRealTimeButton.setAttribute("style", "cursor: pointer;");
        }
        let mutualFundDataStreamPickerIntradayButton = document.getElementById('mutualFundDataStreamPickerIntradayButton');
        if (mutualFundDataStreamPickerIntradayButton) {
          mutualFundDataStreamPickerIntradayButton.parentNode.removeChild(mutualFundDataStreamPickerIntradayButton);
          mutualFundDataStreamPickerIntradayButton = document.createElement('button');
          mutualFundDataStreamPickerButtonDiv.appendChild(mutualFundDataStreamPickerIntradayButton);
          mutualFundDataStreamPickerIntradayButton.id = 'mutualFundDataStreamPickerIntradayButton';
          mutualFundDataStreamPickerIntradayButton.innerHTML = 'Intraday';
          mutualFundDataStreamPickerIntradayButton.setAttribute("style", "cursor: pointer;");
        }
        let mutualFundDataStreamPickerHistoricalButton = document.getElementById('mutualFundDataStreamPickerHistoricalButton');
        if (mutualFundDataStreamPickerHistoricalButton) {
          mutualFundDataStreamPickerHistoricalButton.parentNode.removeChild(mutualFundDataStreamPickerHistoricalButton);
          mutualFundDataStreamPickerHistoricalButton = document.createElement('button');
          mutualFundDataStreamPickerButtonDiv.appendChild(mutualFundDataStreamPickerHistoricalButton);
          mutualFundDataStreamPickerHistoricalButton.id = 'mutualFundDataStreamPickerHistoricalButton';
          mutualFundDataStreamPickerHistoricalButton.innerHTML = 'Historical';
          mutualFundDataStreamPickerHistoricalButton.setAttribute("style", "cursor: pointer;");
        }

        mutualFundDataStreamPickerRealTimeButton.addEventListener('click', () => {
          mutualFundRealtimeManager(fund);
        });

        mutualFundDataStreamPickerIntradayButton.addEventListener('click', () => {
          mutualFundIntradayManager(fund);
        });

        mutualFundDataStreamPickerHistoricalButton.addEventListener('click', () => {
          mutualFundHistoricalManager(fund);
        });

        mutualFundPicker.setAttribute("style", "display: none;");
        mutualFundDisplayPickDataStream.setAttribute("style", "display: initial;");
        mutualFundInfoPaneCompanyName.innerHTML = fund.name;
        mutualFundInfoPaneSymbol.innerHTML = fund.symbol;
        mutualFundInfoPaneNetAssets.innerHTML = 'Net Assets: ' + fund.net_assets;
        mutualFundInfoPaneCurrentPrice.innerHTML = 'Price: ' + fund.price;
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

      function submitCurrencySymbol() {
        let currencySymbolInput = document.getElementById('currencySymbolInput');
        let baseCurrencyNameAndSymbol = document.getElementById('baseCurrencyNameAndSymbol');
        let option;
        let currencySelectorDiv = document.getElementById('currencySelectorDiv');
        let currencySelect = document.getElementById('currencySelect');
        if (currencySelect) {
          currencySelect.parentNode.removeChild(currencySelect);
          currencySelect = document.createElement('select');
          currencySelectorDiv.appendChild(currencySelect);
          currencySelect.id = 'currencySelect';
        }
        let secondaryCurrencyNameAndSymbol = document.getElementById('secondaryCurrencyNameAndSymbol');
        secondaryCurrencyNameAndSymbol.innerHTML = '';
        let currentExchangeRate = document.getElementById('currentExchangeRate');
        currentExchangeRate.innerHTML = '';

        if ((currencySymbolInput.value !== '') && (currencySymbolInput.value.length === 3)) {
          $http.get(`/currency_type_query/${currencySymbolInput.value}`)
          .then(baseCurrencyData => {
            let baseCurrency = baseCurrencyData.data;
            console.log(baseCurrency);
            vm.baseCurrency = {
              code: baseCurrency[0].currencies[0].code,
              name: baseCurrency[0].currencies[0].name,
              symbol: baseCurrency[0].currencies[0].symbol
            };
            baseCurrencyNameAndSymbol.innerHTML = 'Base Currency: ' +  vm.baseCurrency.name + ' : ' + vm.baseCurrency.symbol;
            $http.get(`/currency_exchange_from_base/${currencySymbolInput.value}`)
            .then(exchangeRateData => {
              console.log(exchangeRateData);
              let exchangeRate = exchangeRateData.data.data;
              console.log(exchangeRate);
              option = document.createElement('option');
              currencySelect.appendChild(option);
              option.value = '';
              option.innerHTML = 'exchange currency';
              for (let key in exchangeRate) {
                option = document.createElement('option');
                currencySelect.appendChild(option);
                option.value = key;
                option.innerHTML = key;
              }
              currencySelect.addEventListener('change', () => {
                if (currencySelect.value !== '') {
                  $http.get(`/currency_type_query/${currencySelect.value}`)
                  .then(secondaryCurrencyData => {
                    let secondaryCurrency = secondaryCurrencyData.data;
                    vm.secondaryCurrency = {
                      code: secondaryCurrency[0].currencies[0].code,
                      name: secondaryCurrency[0].currencies[0].name,
                      symbol: secondaryCurrency[0].currencies[0].symbol
                    };
                    secondaryCurrencyNameAndSymbol.innerHTML = 'Exchange Currency: ' + vm.secondaryCurrency.name + ' : ' + vm.secondaryCurrency.symbol;
                    currentExchangeRate.innerHTML = '1 ' + vm.baseCurrency.code + ' = ' + exchangeRate[vm.secondaryCurrency.code] + ' ' + vm.secondaryCurrency.code;
                  });
                }
              });
            });
          });
        }
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

      function currencySelectedByUser() {
        let currencySelector = document.getElementById('currencySelector');
        let mutualFundsSelector = document.getElementById('mutualFundsSelector');
        let stocksSelector = document.getElementById('stocksSelector');
        let currencyPicker = document.getElementById('currencyPicker');
        let currencySymbolInput = document.getElementById('mutualFundSymbolInput');

        stocksSelector.setAttribute("style", "opacity: 0; transition: opacity 0.4s linear;");
        setTimeout(() => {
          mutualFundsSelector.setAttribute("style", "opacity: 0; transition: opacity 0.4s linear;");
          setTimeout(() => {
            currencySelector.setAttribute("style", "opacity: 0; transition: opacity 0.4s linear;");
            setTimeout(() => {
              financialInstrumentSelector.setAttribute("style", "display: none;");
              currencyPicker.setAttribute("style", "display: initial;");
              currencySymbolInput.focus();
            }, 400);
          }, 200);
        }, 200);
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
