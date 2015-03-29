angular.module('Game', ['myApp', 'Grid']);
angular.module('Game').constant('WHITE_PIECE', '\u26C0')
                      .constant('WHITE_KING', '\u26C1')
                      .constant('BLACK_PIECE', '\u26C2')
                      .constant('BLACK_KING', '\u26C3')
angular.module('Game').service('Game', function(Grid, WHITE_PIECE, WHITE_KING, BLACK_PIECE, BLACK_KING, BOARDSIZE) {
   var ex = {}
     , that = {}

   ex.isBlack = function(square) {
      var x = square.x, y = square.y;
      var k = ( y % 2 === 0 ? 0 : 1 );
      return (((y*BOARDSIZE)+x+k)%2 === 0);
   }

   ex.init = function() {
      Grid.init(BOARDSIZE);      
      return this;
   }

   ex.styleSquares = function( styleFunc ) {
      Grid.forEach( styleFunc );
      return this;
   }

   that.setUpPieces = function() {
      Grid.forEach(function(square) {
         if (square.y < 3) {
            if (!ex.isBlack(square)) {
               square.symbol = WHITE_PIECE
            }
         }
         if (BOARDSIZE - square.y < 4) {
            if (!ex.isBlack(square)) {
               square.symbol = BLACK_PIECE
            }
         }
      });
   }

   ex.getGrid = Grid.getGrid;

   ex.startGame = function() {
      that.setUpPieces();
      // set up pieces
      // wait next player to pick a move
      // figure out result of move
      // if game is not over, repeat this step and prior two.
   }

   return ex;
});
