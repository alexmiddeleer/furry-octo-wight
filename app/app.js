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
;

angular.module('myApp')
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({
         templateUrl: 'app/views/home.html',
         controller: 'viewCtrl'
      });
   }])
;

angular.module('myAppControllers', []);
angular.module('myAppControllers')
   .controller('viewCtrl', function($scope, boardSize, $sce) {
      var grid = [];
      for (var i = 0; i < boardSize; i++) {
         grid.push([]);
         for (var j = 0; j < boardSize; j++) {
            var k = ( i % 2 === 0 ? 0 : 1 );
            var white = (((i*boardSize)+j+k)%2 === 0);
            grid[i].push({
               symbol:  white ? '\u25A0' :'\u25A1' 
            });
         }
      }
      $scope.grid = grid;
      $scope.getSymbol = function(square) {
         return $sce.trustAsHtml( square );
      };
   })

