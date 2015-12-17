angular.module('talkApp.directives',[])

  .directive('talkWithMe',['$ionicPlatform', ($ionicPlatform) => {
    return {
      link: (scope, element, attrs) => {
        scope.langs = [];
        scope.tts = "";
        function win(result) {
          console.log("Win = " + result);
        }
        function fail(result) {
          console.log("Error = " + result);
        }
        scope.addLang = (lang) => {
          scope.langs.push(lang);
        }

        scope.changeLang = (lang) => {
          console.log("changing");
          window.tts.setLanguage(lang,win, fail);
          scope.curLang = window.tts.getLanguage(win, fail);
          scope.$apply();
        }
        // on click on button
        scope.speak = () => {
          console.log("Entered text to speak : "+scope.tts);
          window.tts.speak(scope.tts ==""?"Enter a text to speak":scope.tts);
        }
        $ionicPlatform.ready(() => {
          scope.curLang = window.tts.getLanguage(win, fail);
          window.tts.isLanguageAvailable("en", function() {
            scope.addLang("en");
          }, fail);
          window.tts.isLanguageAvailable("fr", function() {
            scope.addLang("fr");
          }, fail);
          if (!scope.curLang) {window.tts.setLanguage("fr",win, fail); scope.curLang = "fr";}
          window.tts.speak("The text to speech service is ready");
          console.log("langue: "+scope.curLang,scope.langs);
        })


      }
    }
  }]);


// angular.module('starter.controllers', [])
//
// .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
//
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});
//
//   // Form data for the login modal
//   $scope.loginData = {};
//
//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });
//
//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };
//
//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };
//
//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);
//
//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
// })
//
// .controller('PlaylistsCtrl', function($scope) {
//   $scope.playlists = [
//     { title: 'Reggae', id: 1 },
//     { title: 'Chill', id: 2 },
//     { title: 'Dubstep', id: 3 },
//     { title: 'Indie', id: 4 },
//     { title: 'Rap', id: 5 },
//     { title: 'Cowbell', id: 6 }
//   ];
// })
//
// .controller('PlaylistCtrl', function($scope, $stateParams) {
// });
