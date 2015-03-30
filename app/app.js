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

angular.module('myAppControllers', ['Game', 'Logger']);
angular.module('myAppControllers')
   .controller('viewCtrl', function($scope, $sce, Game, Logger, Grid) {

      Game.init()
      Game.styleSquares( function(square) {
         square.background = Game.isBlack( square ) ?
            'black-space' : 'white-space';
      })

      $scope.getSquareBackground = function(square){
         if (Game.pieceIsMoveable(square) && square.isSelected) {
            return 'selected-space';
         }
         if (Game.pieceIsMoveable(square) && square.mouseOver) {
            return 'selectable-space';
         }
         if (Game.squareIsReachable(square) && square.mouseOver) {
            return 'selectable-space';
         }
      }

      $scope.squareClicked = function(square) {
         Logger.log(square.x + ', ' + square.y +  ' was clicked');
         Game.pieceChosen(square);
      }

      Game.startGame();
      $scope.message = 'It is ' + Game.whoseTurn().name + '\'s turn.';

      var roundOverCB = function() {
         $scope.message = 'It is ' + Game.whoseTurn().name + '\'s turn.';
      }

      var gameOverCB = function() {
         $scope.message = 'Game Over! The winner is ' + Game.whoWon().name;
      }

      $scope.grid = Game.getGrid();
      Game.gameLoop();
      $scope.getSymbol = function(square) {
         return $sce.trustAsHtml( square );
      };
   });
