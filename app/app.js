angular.module('myApp', ['myAppControllers','ngRoute']);

angular.module('myApp')
   .constant('myAppLinks', {
      home: {
         text:'Home',
         href:'#'
      }
   })
   .constant('boardSize', 8)
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

angular.module('myAppControllers', ['grid']);
angular.module('myAppControllers')
   .controller('viewCtrl', function($scope, boardSize, $sce, grid) {

      grid.init(boardSize, function(x, y) {
         var k = ( y % 2 === 0 ? 0 : 1 );
         var black = (((y*boardSize)+x+k)%2 === 0);
         return {
            x:x,
            y:y,
            background:  black ? 'black-space' : 'white-space'
         };
      });

      $scope.grid = grid.getGrid();
      $scope.getSymbol = function(square) {
         return $sce.trustAsHtml( square );
      };
   })

