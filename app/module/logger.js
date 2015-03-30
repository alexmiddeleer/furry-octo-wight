angular.module('Logger', []);
angular.module('Logger').service('Logger',function() {
   return {
      log : function(msg) {
         console.log(msg);
      }
   }
});
