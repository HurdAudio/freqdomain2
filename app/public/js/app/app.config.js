(function() {
  'use strict';

  angular.module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state({
        name: 'app',
        abstract: true,
        component: 'app',
      })
     .state({
        name: 'landing',
        url: '/',
        parent: 'app',
        component: 'landing'
       });
      // .state({
      //   name: 'dayview',
      //   url: '/dayview/:id',
      //   parent: 'app',
      //   component: 'dayview'
      // })
      // .state({
      //   name: 'weekview',
      //   url: '/weekview/:id',
      //   parent: 'app',
      //   component: 'weekview'
      // })
      // .state({
      //   name: 'passwordreset',
      //   url: '/passwordreset/:id',
      //   parent: 'app',
      //   component: 'passwordreset'
      // })
      // .state({
      //   name: 'monthview',
      //   url: '/monthview/:id',
      //   parent: 'app',
      //   component: 'monthview'
      // })
      // .state({
      //   name: 'userprofile',
      //   url: '/userprofile/:id',
      //   parent: 'app',
      //   component: 'userprofile'
      // });



  }

}());
