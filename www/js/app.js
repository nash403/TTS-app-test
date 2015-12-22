
angular.module('talkApp', ['ionic','talkApp.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    TTS.startup((result)=>{
      console.log("start ok "+result);
    }, (result)=>{
      console.log("start ko "+result);
    });
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.talk', {
    url: '/talk',
    views: {
      'talktome': {
        templateUrl: 'templates/talk.html'
      }
    }
  })
  .state('app.param', {
      url: '/param',
      views: {
        'talktome': {
          templateUrl: 'templates/param.html'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/talk');//'/app/playlists');
});
