angular.module('talkApp.directives',[])
  .controller('optCtrl',['$scope','$ionicPopup', ($scope,$ionicPopup) => {
    $scope.whichLang = () => {
      var l;
      var alertPopup;
      $scope.time1 = 0;
      $scope.time2 = 0;
      $scope.time3 = 0;
      TTS.getLanguage( (res) => {
        console.log("whichLang",res);
        l = res;
        alertPopup = $ionicPopup.alert({
          title: 'Langue actuelle',
          template: 'La langue est : '+l
        });

        alertPopup.then(function(res) {
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      }, (reason) => {
        console.log("klnfz",reason);
      });
    };
    $scope.speakSentence = () => {
      // morceau 1
      TTS.speak($scope.morceau1,()=>{console.log("speak ok");},(result)=>{console.log("speak ko "+result);});
      if ($scope.time1 > 0)
        TTS.silence($scope.time1*1000,()=>{console.log("silence ok");},(result)=>{console.log("silence ko "+result);});
      // morceau 2
      TTS.speak($scope.morceau2,()=>{console.log("speak ok");},(result)=>{console.log("speak ko "+result);});
      if ($scope.time2 > 0)
        TTS.silence($scope.time2*1000,()=>{console.log("silence ok");},(result)=>{console.log("silence ko "+result);});
      // morceau 3
      TTS.speak($scope.morceau3,()=>{console.log("speak ok");},(result)=>{console.log("speak ko "+result);});
      if ($scope.time3 > 0)
        TTS.silence($scope.time3*1000,()=>{console.log("silence ok");},(result)=>{console.log("silence ko "+result);});
    };
  }])
  .directive('talkWithMe',['$timeout', ($timeout) => {
    return {
      link: (scope, element, attrs) => {
        scope.langs = [
          {
            lang:'en-US'
          },
          {
            lang:"fr-FR"
          }
      ];
        scope.tts = "";
        scope.curLang = {lang:'fr-FR'};
        function win(result) {
          console.log("Win = " + result);
        };

        function fail(result) {
          console.log("Error = " + result);
        };

        scope.addLang = (lang) => {
          scope.langs.push({lang:lang});
        };


        scope.changeLang = () => {
          console.log("changing",scope.curLang.lang);
          TTS.setLanguage(scope.curLang.lang,(result)=>{console.log("change ok "+result);}, (result)=>{console.log("change ko "+result);});
        };
        // on click on button
        scope.speak = () => {
          console.log("Entered text to speak : "+scope.tts);
          TTS.speak((scope.tts ==""?"Enter a text to speak":scope.tts),()=>{console.log("speak ok");},(result)=>{console.log("speak ko "+result);});
        };

        $timeout(() => {
          //console.log('gzegmihxmilqnsmlxnjukegzhflc', TTS);
          // at start
          /*TTS.startup((result)=>{
            console.log("start ok "+result);
          }, (result)=>{
            console.log("start ko "+result);
          });*/

          //scope.curLang = 'fr-FR';
          /*TTS.isLanguageAvailable("en", function(res) {
            console.log('ajout en ok',res);
            scope.addLang("en-US");
          }, (result)=>{
            console.log("ajout en ko "+result);
          });

          TTS.isLanguageAvailable("fr", function(res) {
            console.log('ajout fr ok',res);
            scope.addLang("fr-FR");
          }, (result)=>{
            console.log("ajout fr ko "+result);
          });*/
          if (!scope.curLang.lang) {
            TTS.setLanguage(
              "fr",
              (result)=>{
                console.log("set debut ok "+result);
              },
              (result)=>{
                console.log("set debut ko "+result);
              }
            );
          }

          TTS.speak("The text to speech service is ready",(res)=>{
            console.log("speak ok ",res);
          },(result)=>{
              console.log("speak ko ",result);
            }
          );
          scope.$apply();
          console.log("langue: ",scope.curLang,scope.langs);
        },2000);


      }
    }
  }]);
