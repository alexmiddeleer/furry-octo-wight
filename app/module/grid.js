angular.module('Grid', []);
angular.module('Grid').service('Grid', function() {
   var grid = []
     , exports = {}
   
   exports.init = function(size, squareInit) {
      for (var i = 0; i < size; i++) {
         grid.push([]);
         for (var j = 0; j < size; j++) {
            if (squareInit) {
               grid[i].push(squareInit(j,i));
            } else {
               grid[i].push({});
            }
         }
      }
   }
 
   exports.getGrid = function() {
      return angular.copy(grid);
   }

   return exports;
});


