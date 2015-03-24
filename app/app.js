angular.module('myApp', ['myAppControllers','ngRoute']);

angular.module('myApp')
   .constant('myAppLinks', {
      home: {
         text:'Home',
         href:'#'
      },
      view: {
         text:'A thing',
         href:'#/view/'
   }});

angular.module('myApp')
   .controller('appCtrl', function($scope, myAppLinks) {
      $scope.bannerLinks = myAppLinks;
   });

angular.module('myAppControllers', []);
angular.module('myAppControllers')
   .controller('view1Ctrl', function($scope) {
      $scope.aThing = "something";
      $scope.aTool = "AngularJS, Bootstrap, and Lodash";
   })
   .controller('view2Ctrl', function($scope) {
      $scope.whereAmI = 'I am in the other view';
   })

angular.module('myApp')
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when( '', {
         templateUrl: 'app/views/home.html',
         controller: 'view1Ctrl'
      });
      $routeProvider.when( '/view' ,{
         templateUrl: 'app/views/view.html',
         controller: 'view2Ctrl'
      });
      $routeProvider.otherwise({
         templateUrl: 'app/views/home.html',
         controller: 'view1Ctrl'
      });
   }]);
