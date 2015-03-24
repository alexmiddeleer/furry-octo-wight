angular.module('myApp', ['myAppControllers','ngRoute']);

angular.module('myApp')
   .controller('app-ctrl', function($scope) {
      $scope.aThing = "something";
      $scope.aTool = "AngularJS";
   });

angular.module('myAppControllers', []);
angular.module('myAppControllers')
   .controller('view1-ctrl', function($scope) {
      $scope.whereAmI = 'I am in the other view';
   });

angular.module('myApp')
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/',{
         templateUrl: 'app/views/home.html',
         controller: 'app-ctrl'
      });
      $routeProvider.when('/view1/',{
         templateUrl: 'app/views/view.html',
         controller: 'view1-ctrl'
      });
      $routeProvider.otherwise({
         templateUrl: 'app/views/home.html',
         controller: 'app-ctrl'
      });
   }]);
