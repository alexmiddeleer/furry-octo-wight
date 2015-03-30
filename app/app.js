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
      $scope.message = 'It is ' + Game.whoseTurn().name + '\'s turn.';

      var roundOverCB = function() {
         $scope.grid = game.getGrid();
         $scope.message = 'It is ' + Game.whoseTurn().name + '\'s turn.';
      }

      var gameOverCB = function() {
         $scope.grid = game.getGrid();
         $scope.message = 'Game Over! The winner is ' + Game.whoWon().name;
      }

      $scope.grid = game.getGrid();
      $scope.getSymbol = function(square) {
         return $sce.trustAsHtml( square );
      };
   });
