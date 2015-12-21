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
          scope.langs.push({lang:lang});
        }

        scope.changeLang = () => {
          console.log("changing",scope.curLang.lang);
          TTS.setLanguage(scope.curLang.lang,(result)=>{console.log("change ok "+result);}, (result)=>{console.log("change ko "+result);});
        }
        // on click on button
        scope.speak = () => {
          console.log("Entered text to speak : "+scope.tts);
          TTS.speak((scope.tts ==""?"Enter a text to speak":scope.tts),()=>{console.log("speak ok");},(result)=>{console.log("speak ko "+result);});
        }
        $ionicPlatform.ready(() => {
          console.log('gzegmihxmilqnsmlxnjukegzhflc', TTS);
          // at start
          TTS.startup((result)=>{
            console.log("start ok "+result);
          }, (result)=>{
            console.log("start ko "+result);
          });
          //scope.curLang = 'fr-FR';
          TTS.isLanguageAvailable("en", function() {
            console.log('ajout en ok');
            scope.addLang("en");
          }, (result)=>{console.log("ajout en ko "+result);});
          TTS.isLanguageAvailable("fr", function() {
            console.log('ajout fr ok');
            scope.addLang("fr");
          }, (result)=>{console.log("ajout fr ko "+result);});
          if (!scope.curLang) {
            TTS.setLanguage(
              "fr",
              (result)=>{
                console.log("set debut ok "+result);
              },
              (result)=>{
                console.log("set debut ko "+result);
              }
            );
            scope.curLang = "fr";
          }
          TTS.speak("The text to speech service is ready",()=>{console.log("speak ok ");},(result)=>{console.log("speak ko "+result);});
          console.log("langue: ",scope.curLang,scope.langs);
        })


      }
    }
  }]);
