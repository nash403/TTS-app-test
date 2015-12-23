angular.module('talkApp.directives',[])
  .controller('optCtrl',['$scope','$ionicPopup', ($scope,$ionicPopup) => {
      $scope.time1 = 0;
      $scope.time2 = 0;
      $scope.time3 = 0;
      $scope.interruptTxt = "";
      $scope.pitch = 5;
      $scope.vitesse = 5;
      $scope.testSP = "";
      var longTxt = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    $scope.whichLang = () => {
      var l;
      var alertPopup;
      TTS.getLanguage( (res) => {
        l = res;
        alertPopup = $ionicPopup.alert({
          title: 'Langue actuelle',
          template: 'La langue est : '+l
        });

        alertPopup.then(function(res) {
          console.log('whichLang ok',res);
        });
      }, (reason) => {
        console.log("whichLang ko",reason);
      });
    };
    $scope.speakSentence = () => {
      // morceau 1
      $scope.play($scope.morceau1);
      if ($scope.time1 > 0)
        TTS.silence($scope.time1*1000,()=>{console.log("silence ok");},(result)=>{console.log("silence ko ",result);});
      // morceau 2
      $scope.play($scope.morceau2);
      if ($scope.time2 > 0)
        TTS.silence($scope.time2*1000,()=>{console.log("silence ok");},(result)=>{console.log("silence ko ",result);});
      // morceau 3
      $scope.play($scope.morceau3);
      if ($scope.time3 > 0)
        TTS.silence($scope.time3*1000,()=>{console.log("silence ok");},(result)=>{console.log("silence ko ",result);});
    };
    $scope.play = (txt) => {
      console.log("play",txt);
      if (typeof text == 'string'){
        TTS.speak((txt==''?longTxt:txt),()=>{console.log("speak ok");},(result)=>{console.log("speak ko "+result);});
      }
      else {
        if (txt.text==''){
          TTS.speak({
            text:longTxt,
            speed:$scope.vitesse*0.2,
            pitch:$scope.pitch*0.2
          },()=>{console.log("speak ok");},(result)=>{console.log("speak ko "+result);});
        }
        else {
          TTS.speak(txt,()=>{console.log("speak ok");},(result)=>{console.log("speak ko "+result);});
        }
      }
    };
    $scope.inter = () => {
      console.log("interruption",$scope.interruptTxt);
      TTS.interrupt($scope.interruptTxt,()=>{console.log("interrupt ok");},(result)=>{console.log("interrupt ko ",result);});
    };
    $scope.stop = () => {
      console.log("stop");
      TTS.stop(()=>{console.log("interrupt ok");},(result)=>{console.log("interrupt ko ",result);});
    };
    $scope.isAvailable = () => {
      console.log("isAvailable",$scope.lg);
      TTS.isLanguageAvailable($scope.lg,(res)=>{
        alertPopup = $ionicPopup.alert({
          title: 'Langue disponible ?',
          template: 'La langue \''+$scope.lg+'\' est '+res?"disponible.":"non disponible."
        });

        alertPopup.then(function(res) {
          console.log('isLanguageAvailable ok',res);
        });
      },(result)=>{console.log("isLanguageAvailable ko ",result);});
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
          TTS.setLanguage(scope.curLang.lang,(result)=>{console.log("change ok ",result);}, (result)=>{console.log("change ko ",result);});
        };
        // on click on button
        scope.speak = () => {
          console.log("texte entré : "+scope.tts);
          TTS.speak((scope.tts ==""?"Entrez un texte à vocaliser":scope.tts),()=>{console.log("speak ok");},(result)=>{console.log("speak ko ",result);});
        };

        $timeout(() => {
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

          TTS.speak("Le service TTS est pret",(res)=>{
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
