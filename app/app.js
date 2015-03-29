angular.module('myApp', ['myAppControllers','ngRoute']);

angular.module('myApp')
   .constant('myAppLinks', {
      home: {
         text:'Home',
         href:'#'
      }
   })
   .constant('BOARDSIZE', 8)
;

angular.module('myApp')
   .controller('appCtrl', function($scope, myAppLinks) {
      $scope.bannerLinks = myAppLinks;
   })
   .controller('BoardController', function() {})
;

angular.module('myApp')
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({
         templateUrl: 'app/views/home.html',
         controller: 'viewCtrl'
      });
   }])
;

angular.module('myAppControllers', ['Game']);
angular.module('myAppControllers')
   .controller('viewCtrl', function($scope, $sce, Game) {

      var game = Game.init()
      game.styleSquares( function(square) {
         square.background = Game.isBlack( square ) ? 
            'black-space' : 'white-space';
      })

      Game.startGame();
      
      $scope.grid = game.getGrid();
      $scope.getSymbol = function(square) {
         return $sce.trustAsHtml( square );
      };
   });
