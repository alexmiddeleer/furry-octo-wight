angular.module('myApp', ['ngRoute']);

angular.module('myApp')
   .controller('app-ctrl', function($scope) {
      $scope.aThing = "something";
      $scope.aTool = "AngularJS";
   });

angular.module('myApp')
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({
         templateUrl: 'app/views/home.html',
         controller: 'app-ctrl'
      });
   }]);
