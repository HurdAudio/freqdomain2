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
       })
      .state({
        name: 'emailconfirm',
        url: '/emailconfirm/:id',
        parent: 'app',
        component: 'emailconfirm'
      })
      .state({
        name: 'passwordreset',
        url: '/passwordreset/:id',
        parent: 'app',
        component: 'passwordreset'
      })
      .state({
        name: 'userhub',
        url: '/userhub/:id',
        parent: 'app',
        component: 'userhub'
      })
      .state({
        name: 'userprofile',
        url: '/userprofile/:id',
        parent: 'app',
        component: 'userprofile'
      })
      .state({
        name: 'info',
        url: '/info/:id',
        parent: 'app',
        component: 'info'
      })
      .state({
        name: 'airlinemoduletest',
        url: '/airlinemoduletest',
        parent: 'app',
        component: 'airlinemoduletest'
      })
      .state({
        name: 'rendertest',
        url: '/rendertest',
        parent: 'app',
        component: 'rendertest'
      })
      .state({
        name: 'mixer',
        url: '/mixer/:id',
        parent: 'app',
        component: 'mixer'
      })
      .state({
        name: 'financialmoduletest',
        url: '/financialmoduletest',
        parent: 'app',
        component: 'financialmoduletest'
      })
      .state({
        name: 'patcheditor',
        url: '/patcheditor/:id',
        parent: 'app',
        component: 'patcheditor'
      })
      .state({
        name: 'signaltestsuite',
        url: '/signaltestsuite/:id',
        parend: 'app',
        component: 'signaltestsuite'
      });
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
