// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// "starter" is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of "requires"
// "starter.controllers" is found in controllers.js
angular.module("player", ["ionic", "player.controllers", "player.services", "player.directives", "btford.socket-io", "ngCordova", "720kb.tooltips"])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      console.log("ready")
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state("app", {
        url: "/app",
        abstract: true,
        templateUrl: "views/main/main.html",
        controller: "mainController"
      })
      .state("app.player", {
        url: "/player",
        views: {
          "menuContent": {
            templateUrl: "views/player/player.html",
            controller: "playerController"
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise("/app/player");
  });

angular.module("player.controllers", [])
angular.module("player.services", [])
angular.module("player.directives", [])
